import { useState, useEffect } from 'react';
import { Search, Plus, Pencil, Trash2, X, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct, Product, getBrands, getSeries, type Brand, type Series } from '../lib/database';
import { uploadImage, uploadVideo, createFilePreview, validateImage, validateVideo } from '../utils/mediaUpload';

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredProducts(
        products.filter(p =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          (p.series && p.series.toLowerCase().includes(term)) ||
          (p.model && p.model.toLowerCase().includes(term))
        )
      );
    }
  }, [searchTerm, products]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setFilteredProducts(data);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const success = await deleteProduct(id);
    if (success) {
      setMessage({ type: 'success', text: 'Product deleted successfully!' });
      loadProducts();
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: 'Failed to delete product.' });
    }
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    if (editingProduct) {
      const success = await updateProduct(editingProduct.id, productData);
      if (success) {
        setMessage({ type: 'success', text: 'Product updated successfully!' });
        setShowModal(false);
        loadProducts();
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to update product.' });
      }
    } else {
      const newProduct = await createProduct(productData as Omit<Product, 'id' | 'created_at' | 'updated_at'>);
      if (newProduct) {
        setMessage({ type: 'success', text: 'Product created successfully!' });
        setShowModal(false);
        loadProducts();
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to create product.' });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Products</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products by name, brand, series, or model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-600">Loading products...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Brand</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Series</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Model</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">In Stock</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Featured</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Price</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{product.brand_info?.display_title || product.brand}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{product.series_info?.short_code || '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{product.model || '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{product.name}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.in_stock ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${product.featured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {product.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{product.price}</td>
                    <td className="py-3 px-4 text-sm text-right">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

interface ProductModalProps {
  product: Product | null;
  onSave: (product: Partial<Product>) => void;
  onClose: () => void;
}

function ProductModal({ product, onSave, onClose }: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      brand: '',
      brand_id: '',
      series: '',
      series_id: '',
      model: '',
      category: 'Air Compressor',
      description: '',
      specifications: '',
      technical_specs: '',
      image_url: '',
      video_url: '',
      datasheet_url: '',
      price: 'Contact for pricing',
      in_stock: true,
      featured: false,
    }
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(formData.image_url || null);
  const [videoPreview, setVideoPreview] = useState<string | null>(formData.video_url || null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [allSeries, setAllSeries] = useState<Series[]>([]);
  const [filteredSeries, setFilteredSeries] = useState<Series[]>([]);

  useEffect(() => {
    loadBrands();
    loadSeries();
  }, []);

  useEffect(() => {
    if (formData.brand_id) {
      setFilteredSeries(allSeries.filter(s => s.brand_id === formData.brand_id));
    } else {
      setFilteredSeries([]);
    }
  }, [formData.brand_id, allSeries]);

  const loadBrands = async () => {
    const brandsData = await getBrands();
    setBrands(brandsData);
  };

  const loadSeries = async () => {
    const seriesData = await getSeries();
    setAllSeries(seriesData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = { ...formData };
    if (!submitData.series_id || submitData.series_id === '') {
      submitData.series_id = null as any;
    }
    onSave(submitData);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.isValid) {
      setUploadError(validation.error);
      return;
    }

    setUploadError(null);
    const preview = await createFilePreview(file);
    setImagePreview(preview);

    setUploadingImage(true);
    const productId = product?.id || 'new';
    const result = await uploadImage(file, 'products', productId);
    setUploadingImage(false);

    if (result.error) {
      setUploadError(result.error);
    } else if (result.url) {
      setFormData(prev => ({ ...prev, image_url: result.url as any }));
      setImagePreview(result.url);
    }
  };

  const handleVideoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateVideo(file);
    if (!validation.isValid) {
      setUploadError(validation.error);
      return;
    }

    setUploadError(null);
    const preview = await createFilePreview(file);
    setVideoPreview(preview);

    setUploadingVideo(true);
    const productId = product?.id || 'new';
    const result = await uploadVideo(file, 'products', productId);
    setUploadingVideo(false);

    if (result.error) {
      setUploadError(result.error);
    } else if (result.url) {
      setFormData(prev => ({ ...prev, video_url: result.url as any }));
      setVideoPreview(result.url);
    }
  };

  const clearImage = () => {
    setFormData(prev => ({ ...prev, image_url: '' as any }));
    setImagePreview(null);
  };

  const clearVideo = () => {
    setFormData(prev => ({ ...prev, video_url: '' as any }));
    setVideoPreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
              <select
                required
                value={formData.brand_id || ''}
                onChange={(e) => {
                  const selectedBrand = brands.find(b => b.id === e.target.value);
                  setFormData(prev => ({
                    ...prev,
                    brand_id: e.target.value,
                    brand: selectedBrand?.name || '',
                    series_id: '',
                    series: ''
                  }));
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select a brand</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.display_title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Series (Optional)
              </label>
              <select
                value={formData.series_id || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    series_id: (value || null) as any
                  }));
                }}
                disabled={!formData.brand_id}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">No series / General</option>
                {filteredSeries.map(series => (
                  <option key={series.id} value={series.id}>
                    {series.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Leave empty if product doesn't belong to a series
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input
                type="text"
                value={formData.model || ''}
                onChange={(e) => handleChange('model', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <input
                type="text"
                required
                value={formData.category || ''}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              required
              rows={3}
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
            <textarea
              rows={3}
              value={formData.specifications || ''}
              onChange={(e) => handleChange('specifications', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technical Specs</label>
            <textarea
              rows={3}
              value={formData.technical_specs || ''}
              onChange={(e) => handleChange('technical_specs', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {imagePreview ? (
                <div className="flex items-start gap-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Current image</p>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleImageSelect}
                        disabled={uploadingImage}
                        className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-300 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                    {uploadingImage && (
                      <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="mx-auto text-gray-400 mb-2" size={48} />
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageSelect}
                    disabled={uploadingImage}
                    className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG, or WebP (max 5MB)</p>
                  {uploadingImage && (
                    <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                  )}
                </div>
              )}
              {uploadError && (
                <p className="text-sm text-red-600 mt-2">{uploadError}</p>
              )}
            </div>
            <input
              type="text"
              value={formData.image_url || ''}
              onChange={(e) => handleChange('image_url', e.target.value)}
              placeholder="Or enter image URL manually"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Video</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {videoPreview ? (
                <div className="flex items-start gap-4">
                  <video
                    src={videoPreview}
                    controls
                    className="w-32 h-32 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Current video</p>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleVideoSelect}
                        disabled={uploadingVideo}
                        className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={clearVideo}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-300 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                    {uploadingVideo && (
                      <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <VideoIcon className="mx-auto text-gray-400 mb-2" size={48} />
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={handleVideoSelect}
                    disabled={uploadingVideo}
                    className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-2">MP4, WebM, or MOV (max 50MB)</p>
                  {uploadingVideo && (
                    <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                  )}
                </div>
              )}
            </div>
            <input
              type="text"
              value={formData.video_url || ''}
              onChange={(e) => handleChange('video_url', e.target.value)}
              placeholder="Or enter video URL manually"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Datasheet URL</label>
            <input
              type="text"
              value={formData.datasheet_url || ''}
              onChange={(e) => handleChange('datasheet_url', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="text"
              value={formData.price || ''}
              onChange={(e) => handleChange('price', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.in_stock || false}
                onChange={(e) => handleChange('in_stock', e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">In Stock</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => handleChange('featured', e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              {product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
