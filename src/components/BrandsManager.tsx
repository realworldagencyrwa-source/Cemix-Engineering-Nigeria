import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Package, ChevronRight, ChevronDown, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import {
  getBrands,
  getSeries,
  getProductsByBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  createSeries,
  updateSeries,
  deleteSeries,
  type Brand,
  type Series
} from '../lib/database';
import { uploadImage, uploadVideo, createFilePreview, validateImage, validateVideo } from '../utils/mediaUpload';

interface BrandWithCounts extends Brand {
  seriesCount: number;
  productCount: number;
}

export default function BrandsManager() {
  const [brands, setBrands] = useState<BrandWithCounts[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [expandedBrandId, setExpandedBrandId] = useState<string | null>(null);
  const [brandSeries, setBrandSeries] = useState<Record<string, Series[]>>({});
  const [editingSeries, setEditingSeries] = useState<Series | null>(null);
  const [showSeriesModal, setShowSeriesModal] = useState(false);
  const [selectedBrandForSeries, setSelectedBrandForSeries] = useState<string | null>(null);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    setLoading(true);
    try {
      const brandsData = await getBrands();
      const brandsWithCounts = await Promise.all(
        brandsData.map(async (brand) => {
          const series = await getSeries(brand.id);
          const products = await getProductsByBrand(brand.id);
          return {
            ...brand,
            seriesCount: series.length,
            productCount: products.length
          };
        })
      );
      setBrands(brandsWithCounts);
    } catch (error) {
      console.error('Error loading brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSeriesForBrand = async (brandId: string) => {
    try {
      const series = await getSeries(brandId);
      setBrandSeries(prev => ({ ...prev, [brandId]: series }));
    } catch (error) {
      console.error('Error loading series:', error);
    }
  };

  const handleExpandBrand = async (brandId: string) => {
    if (expandedBrandId === brandId) {
      setExpandedBrandId(null);
    } else {
      setExpandedBrandId(brandId);
      if (!brandSeries[brandId]) {
        await loadSeriesForBrand(brandId);
      }
    }
  };

  const handleAddBrand = () => {
  setEditingBrand({
    // id removed
    name: '',
    display_title: '',
    subtitle: '',
    description: '',
    image_url: '',
    sort_order: brands.length
  } as any);
  setShowBrandModal(true);
};

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
    setShowBrandModal(true);
  };

  const handleSaveBrand = async () => {
    if (!editingBrand) return;

    try {
      if (editingBrand.id) {
        const result = await updateBrand(editingBrand.id, editingBrand);
        if (!result.success) {
          console.error('[ADMIN] Brand update failed:', result.error);
          alert(`Failed to update brand: ${result.error}`);
          return;
        }
      } else {
        const result = await createBrand(editingBrand);
        if (!result.data) {
          console.error('[ADMIN] Brand creation failed:', result.error);
          alert(`Failed to create brand: ${result.error}`);
          return;
        }
      }
      setShowBrandModal(false);
      setEditingBrand(null);
      loadBrands();
    } catch (error: any) {
      console.error('[ADMIN] Error saving brand:', error);
      alert(`Failed to save brand: ${error?.message || 'Unknown error'}`);
    }
  };

  const handleDeleteBrand = async (brandId: string) => {
    if (!confirm('Are you sure you want to delete this brand? This will also delete all associated series and unlink products.')) {
      return;
    }

    try {
      const result = await deleteBrand(brandId);
      if (!result.success) {
        console.error('[ADMIN] Brand deletion failed:', result.error);
        alert(`Failed to delete brand: ${result.error}`);
        return;
      }
      loadBrands();
    } catch (error: any) {
      console.error('[ADMIN] Error deleting brand:', error);
      alert(`Failed to delete brand: ${error?.message || 'Unknown error'}`);
    }
  };

  const handleAddSeries = (brandId: string) => {
    setSelectedBrandForSeries(brandId);
    setEditingSeries({
  brand_id: brandId,
  name: '',
  short_code: '',
  description: '',
  image_url: '',
  sort_order: brandSeries[brandId]?.length || 0
} as any);
    setShowSeriesModal(true);
  };

  const handleEditSeries = (series: Series) => {
    setSelectedBrandForSeries(series.brand_id);
    setEditingSeries(series);
    setShowSeriesModal(true);
  };

  const handleSaveSeries = async () => {
    if (!editingSeries) return;

    try {
      if (editingSeries.id) {
        const result = await updateSeries(editingSeries.id, editingSeries);
        if (!result.success) {
          console.error('[ADMIN] Series update failed:', result.error);
          alert(`Failed to update series: ${result.error}`);
          return;
        }
      } else {
        const result = await createSeries(editingSeries);
        if (!result.data) {
          console.error('[ADMIN] Series creation failed:', result.error);
          alert(`Failed to create series: ${result.error}`);
          return;
        }
      }
      setShowSeriesModal(false);
      setEditingSeries(null);
      loadBrands();
      if (selectedBrandForSeries) {
        loadSeriesForBrand(selectedBrandForSeries);
      }
    } catch (error: any) {
      console.error('[ADMIN] Error saving series:', error);
      alert(`Failed to save series: ${error?.message || 'Unknown error'}`);
    }
  };

  const handleDeleteSeries = async (seriesId: string, brandId: string) => {
    if (!confirm('Are you sure you want to delete this series? Products will be unlinked.')) {
      return;
    }

    try {
      const result = await deleteSeries(seriesId);
      if (!result.success) {
        console.error('[ADMIN] Series deletion failed:', result.error);
        alert(`Failed to delete series: ${result.error}`);
        return;
      }
      loadSeriesForBrand(brandId);
      loadBrands();
    } catch (error: any) {
      console.error('[ADMIN] Error deleting series:', error);
      alert(`Failed to delete series: ${error?.message || 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading brands...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Brand Management</h2>
        <button
          onClick={handleAddBrand}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <Plus size={20} />
          Add Brand
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Display Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Series
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {brands.map((brand) => (
              <>
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleExpandBrand(brand.id)}
                      className="flex items-center gap-2 text-sm font-medium text-gray-900"
                    >
                      {expandedBrandId === brand.id ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                      {brand.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {brand.display_title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {brand.seriesCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {brand.productCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditBrand(brand)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit brand"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteBrand(brand.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete brand"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedBrandId === brand.id && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-semibold text-gray-700">Series Management</h3>
                          <button
                            onClick={() => handleAddSeries(brand.id)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            <Plus size={16} />
                            Add Series
                          </button>
                        </div>
                        {brandSeries[brand.id] && brandSeries[brand.id].length > 0 ? (
                          <div className="grid gap-2">
                            {brandSeries[brand.id].map((series) => (
                              <div
                                key={series.id}
                                className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-200"
                              >
                                <div className="flex items-center gap-3">
                                  <Package size={16} className="text-gray-400" />
                                  <div>
                                    <div className="font-medium text-sm text-gray-900">
                                      {series.name}
                                      {series.short_code && (
                                        <span className="ml-2 text-xs text-gray-500">({series.short_code})</span>
                                      )}
                                    </div>
                                    {series.description && (
                                      <div className="text-xs text-gray-600">{series.description}</div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleEditSeries(series)}
                                    className="text-blue-600 hover:text-blue-900"
                                    title="Edit series"
                                  >
                                    <Edit2 size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSeries(series.id, brand.id)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete series"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 italic">No series yet. Click "Add Series" to create one.</div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {showBrandModal && editingBrand && (
        <BrandModal
          brand={editingBrand}
          onSave={handleSaveBrand}
          onClose={() => setShowBrandModal(false)}
          onChange={setEditingBrand}
        />
      )}

      {showSeriesModal && editingSeries && (
        <SeriesModal
          series={editingSeries}
          onSave={handleSaveSeries}
          onClose={() => setShowSeriesModal(false)}
          onChange={setEditingSeries}
        />
      )}
    </div>
  );
}

interface BrandModalProps {
  brand: Brand;
  onSave: () => void;
  onClose: () => void;
  onChange: (brand: Brand) => void;
}

function BrandModal({ brand, onSave, onClose, onChange }: BrandModalProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(brand.image_url || null);
  const [videoPreview, setVideoPreview] = useState<string | null>(brand.video_url || null);

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
    const result = await uploadImage(file, 'brands', brand.id);
    setUploadingImage(false);

    if (result.error) {
      setUploadError(result.error);
    } else if (result.url) {
      onChange({ ...brand, image_url: result.url });
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
    const result = await uploadVideo(file, 'brands', brand.id);
    setUploadingVideo(false);

    if (result.error) {
      setUploadError(result.error);
    } else if (result.url) {
      onChange({ ...brand, video_url: result.url });
      setVideoPreview(result.url);
    }
  };

  const clearImage = () => {
    onChange({ ...brand, image_url: '' });
    setImagePreview(null);
  };

  const clearVideo = () => {
    onChange({ ...brand, video_url: '' });
    setVideoPreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {brand.id ? 'Edit Brand' : 'Add New Brand'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand Name *
            </label>
            <input
              type="text"
              value={brand.name}
              onChange={(e) => onChange({ ...brand, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Boge"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Title *
            </label>
            <input
              type="text"
              value={brand.display_title}
              onChange={(e) => onChange({ ...brand, display_title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., BOGE Industrial Compressors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              value={brand.subtitle || ''}
              onChange={(e) => onChange({ ...brand, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Premium German Engineering"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={brand.description || ''}
              onChange={(e) => onChange({ ...brand, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={4}
              placeholder="Brand description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Image</label>
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
                      className="mt-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove image
                    </button>
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
                    className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:bg-green-700 disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG, or WebP (max 5MB)</p>
                </div>
              )}
              {uploadingImage && <p className="text-sm text-blue-600 mt-2">Uploading image...</p>}
            </div>
            <input
              type="text"
              value={brand.image_url || ''}
              onChange={(e) => onChange({ ...brand, image_url: e.target.value })}
              placeholder="Or enter image URL manually"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Video (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {videoPreview ? (
                <div className="flex items-start gap-4">
                  <video
                    src={videoPreview}
                    controls
                    className="w-48 h-32 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Current video</p>
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
                      className="mt-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove video
                    </button>
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
                    className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:bg-green-700 disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-2">MP4, WebM, or MOV (max 50MB)</p>
                </div>
              )}
              {uploadingVideo && <p className="text-sm text-blue-600 mt-2">Uploading video...</p>}
            </div>
            <input
              type="text"
              value={brand.video_url || ''}
              onChange={(e) => onChange({ ...brand, video_url: e.target.value })}
              placeholder="Or enter video URL manually"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mt-2 text-sm"
            />
          </div>

          {uploadError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {uploadError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Order
            </label>
            <input
              type="number"
              value={brand.sort_order}
              onChange={(e) => onChange({ ...brand, sort_order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Save size={18} />
              Save Brand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SeriesModalProps {
  series: Series;
  onSave: () => void;
  onClose: () => void;
  onChange: (series: Series) => void;
}

function SeriesModal({ series, onSave, onClose, onChange }: SeriesModalProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(series.image_url || null);
  const [videoPreview, setVideoPreview] = useState<string | null>(series.video_url || null);

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
    const result = await uploadImage(file, 'series', series.id);
    setUploadingImage(false);

    if (result.error) {
      setUploadError(result.error);
    } else if (result.url) {
      onChange({ ...series, image_url: result.url });
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
    const result = await uploadVideo(file, 'series', series.id);
    setUploadingVideo(false);

    if (result.error) {
      setUploadError(result.error);
    } else if (result.url) {
      onChange({ ...series, video_url: result.url });
      setVideoPreview(result.url);
    }
  };

  const clearImage = () => {
    onChange({ ...series, image_url: '' });
    setImagePreview(null);
  };

  const clearVideo = () => {
    onChange({ ...series, video_url: '' });
    setVideoPreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {series.id ? 'Edit Series' : 'Add New Series'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Series Name *
            </label>
            <input
              type="text"
              value={series.name}
              onChange={(e) => onChange({ ...series, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., C-2 Series"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Code
            </label>
            <input
              type="text"
              value={series.short_code || ''}
              onChange={(e) => onChange({ ...series, short_code: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., C-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={series.description || ''}
              onChange={(e) => onChange({ ...series, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Series description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Series Image</label>
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
                      className="mt-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove image
                    </button>
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
                </div>
              )}
              {uploadingImage && <p className="text-sm text-blue-600 mt-2">Uploading image...</p>}
            </div>
            <input
              type="text"
              value={series.image_url || ''}
              onChange={(e) => onChange({ ...series, image_url: e.target.value })}
              placeholder="Or enter image URL manually"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Series Video (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {videoPreview ? (
                <div className="flex items-start gap-4">
                  <video
                    src={videoPreview}
                    controls
                    className="w-48 h-32 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Current video</p>
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
                      className="mt-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove video
                    </button>
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
                </div>
              )}
              {uploadingVideo && <p className="text-sm text-blue-600 mt-2">Uploading video...</p>}
            </div>
            <input
              type="text"
              value={series.video_url || ''}
              onChange={(e) => onChange({ ...series, video_url: e.target.value })}
              placeholder="Or enter video URL manually"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2 text-sm"
            />
          </div>

          {uploadError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {uploadError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Order
            </label>
            <input
              type="number"
              value={series.sort_order}
              onChange={(e) => onChange({ ...series, sort_order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Save size={18} />
              Save Series
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
