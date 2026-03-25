import { useEffect, useState } from 'react';
import { supabase, type Product } from '../lib/supabase';
import { type Brand, type Series } from '../lib/database';
import { FileDown, Package, ArrowLeft, Search, Video as VideoIcon, X } from 'lucide-react';
import { convertUnits } from '../utils/unitConversions';

type ViewLevel = 'brands' | 'series' | 'models';

export default function Products() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBrandForModal, setSelectedBrandForModal] = useState<Brand | null>(null);
  const [selectedSeriesForModal, setSelectedSeriesForModal] = useState<Series | null>(null);
  const [viewLevel, setViewLevel] = useState<ViewLevel>('brands');
  const [loading, setLoading] = useState(true);
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchBrands();
    fetchAllProducts();
  }, []);


  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setBrands(data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          brand_info:brands(id, name, display_title),
          series_info:product_series(id, name, short_code)
        `)
        .order('featured', { ascending: false })
        .order('brand');

      if (error) throw error;
      setAllProducts(data || []);
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };

  const fetchSeriesForBrand = async (brandId: string): Promise<Series[]> => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('product_series')
        .select('*')
        .eq('brand_id', brandId)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      const seriesData = data || [];
      setSeries(seriesData);
      setLoading(false);
      return seriesData;
    } catch (error) {
      console.error('Error fetching series:', error);
      setSeries([]);
      setLoading(false);
      return [];
    }
  };

  const fetchProductsForBrand = async (brandId: string) => {
    try {
      setLoading(true);
      // Fetch products with series_id IS NULL (brand-only products)
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          brand_info:brands(id, name, display_title),
          series_info:product_series(id, name, short_code)
        `)
        .eq('brand_id', brandId)
        .is('series_id', null)
        .order('featured', { ascending: false })
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsForSeries = async (seriesId: string, brandId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          brand_info:brands(id, name, display_title),
          series_info:product_series(id, name, short_code)
        `)
        .eq('series_id', seriesId)
        .eq('brand_id', brandId)
        .order('featured', { ascending: false })
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandClick = async (brand: Brand) => {
    setSelectedBrandId(brand.id);
    setSelectedBrand(brand.name);
    setSelectedSeriesId(null);
    setSearchQuery('');

    // Fetch series for this brand
    const brandSeries = await fetchSeriesForBrand(brand.id);

    // If brand has no series, go directly to products view
    if (brandSeries.length === 0) {
      setViewLevel('models');
      fetchProductsForBrand(brand.id);
    } else {
      setViewLevel('series');
    }
  };

  const handleBrandFilterSelect = (brandName: string) => {
    setSelectedBrand(brandName);
    setSearchQuery('');
    if (brandName === 'All') {
      setSelectedBrandId(null);
      setViewLevel('brands');
    } else {
      const brand = brands.find(b => b.name === brandName);
      if (brand) {
        handleBrandClick(brand);
      }
    }
  };

  const handleSeriesSelect = (seriesId: string) => {
    if (!selectedBrandId) return;
    setSelectedSeriesId(seriesId);
    setViewLevel('models');
    fetchProductsForSeries(seriesId, selectedBrandId);
  };

  const handleBackToSeries = () => {
    setViewLevel('series');
    setSelectedSeriesId(null);
    setProducts([]);
  };

  const handleBackToBrands = () => {
    setViewLevel('brands');
    setSelectedBrand('All');
    setSelectedBrandId(null);
    setSelectedSeriesId(null);
    setSeries([]);
    setProducts([]);
    setSearchQuery('');
  };

  const normalizeSearchText = (text: string): string => {
    return text.toLowerCase().replace(/[\s\-_]/g, '').replace(/[^\w]/g, '');
  };

  const buildSearchableText = (product: Product): string => {
    const brandName = product.brand_info?.name || product.brand;
    const seriesName = product.series_info?.name || product.series_info?.short_code || '';
    const parts = [brandName, product.name, seriesName, product.category, product.description, product.specifications || ''];
    return parts.join(' ');
  };

  const calculateSearchScore = (product: Product, query: string): number => {
    if (!query.trim()) return 1;
    const searchableText = buildSearchableText(product);
    const normalizedText = normalizeSearchText(searchableText);
    const normalizedName = normalizeSearchText(product.name);
    const queryTerms = query.trim().toLowerCase().split(/\s+/);

    const allTermsMatch = queryTerms.every(term => {
      const normalizedTerm = normalizeSearchText(term);
      return normalizedText.includes(normalizedTerm) || normalizedName.includes(normalizedTerm);
    });

    if (!allTermsMatch) return 0;
    let score = 0;
    const normalizedQuery = normalizeSearchText(query);

    if (normalizedName.includes(normalizedQuery)) score += 10;
    const nameTermMatches = queryTerms.filter(term => {
      const normalizedTerm = normalizeSearchText(term);
      return normalizedName.includes(normalizedTerm);
    }).length;
    score += nameTermMatches * 5;

    const seriesName = product.series_info?.name || product.series_info?.short_code || '';
    const normalizedSeries = normalizeSearchText(seriesName);
    if (normalizedSeries.includes(normalizedQuery)) score += 3;

    const brandName = product.brand_info?.name || product.brand;
    const normalizedBrand = normalizeSearchText(brandName);
    if (normalizedBrand.includes(normalizedQuery)) score += 2;

    if (normalizedText.includes(normalizedQuery)) score += 1;

    const specs = product.specifications || '';
    const specsLower = specs.toLowerCase();
    queryTerms.forEach(term => {
      const lowerTerm = term.toLowerCase();
      if (lowerTerm.match(/\d+\s*(bar|barg|psi|psig)/)) {
        const numberMatch = lowerTerm.match(/(\d+)/);
        if (numberMatch && specsLower.includes(numberMatch[1])) score += 3;
      }
      if (lowerTerm.match(/\d+\s*(kw|hp)/)) {
        const numberMatch = lowerTerm.match(/(\d+)/);
        if (numberMatch && specsLower.includes(numberMatch[1])) score += 3;
      }
      if (lowerTerm.match(/\d+\s*(cfm|l\/min|lmin)/)) {
        const numberMatch = lowerTerm.match(/(\d+)/);
        if (numberMatch && specsLower.includes(numberMatch[1])) score += 3;
      }
    });

    return score;
  };

  const getFilteredProducts = (): Product[] => {
    if (!searchQuery.trim()) {
      return viewLevel === 'models' ? products : [];
    }

    const scoredProducts = allProducts
      .map(product => ({
        product,
        score: calculateSearchScore(product, searchQuery)
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    return scoredProducts.map(item => item.product);
  };

  const getFilteredSeries = (): Series[] => {
    if (!searchQuery.trim()) return series;

    const query = searchQuery.toLowerCase();
    const normalizedQuery = normalizeSearchText(query);

    return series.filter(s => {
      const seriesName = normalizeSearchText(s.name);
      const description = normalizeSearchText(s.description || '');
      const shortCode = normalizeSearchText(s.short_code || '');

      const hasMatchingProducts = allProducts.some(p =>
        p.series_id === s.id && calculateSearchScore(p, searchQuery) > 0
      );

      return (
        seriesName.includes(normalizedQuery) ||
        description.includes(normalizedQuery) ||
        shortCode.includes(normalizedQuery) ||
        hasMatchingProducts
      );
    });
  };

  const getFilteredBrands = (): Brand[] => {
    if (!searchQuery.trim()) return brands;

    const query = searchQuery.toLowerCase();
    const normalizedQuery = normalizeSearchText(query);

    return brands.filter(brand => {
      const brandName = normalizeSearchText(brand.name);
      const displayTitle = normalizeSearchText(brand.display_title);
      const description = normalizeSearchText(brand.description || '');

      const hasMatchingProducts = allProducts.some(p =>
        p.brand_id === brand.id && calculateSearchScore(p, searchQuery) > 0
      );

      return (
        brandName.includes(normalizedQuery) ||
        displayTitle.includes(normalizedQuery) ||
        description.includes(normalizedQuery) ||
        hasMatchingProducts
      );
    });
  };

  const renderProductCardMedia = (product: Product) => {
    const hasImage = product.image_url && product.image_url.trim() !== '';
    const hasVideo = product.video_url && product.video_url.trim() !== '';

    return (
      <div className="h-48 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center overflow-hidden p-4 relative">
        {hasImage ? (
          <>
            <img src={product.image_url} alt={product.name} className="w-full h-full object-contain" />
            {hasVideo && (
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <VideoIcon size={12} />
                Video
              </div>
            )}
          </>
        ) : hasVideo ? (
          <div onClick={(e) => e.stopPropagation()} className="w-full h-full relative">
            <video
              src={product.video_url}
              controls
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center gap-1 pointer-events-none">
              <VideoIcon size={12} />
              Video
            </div>
          </div>
        ) : (
          <Package className="text-brand-500" size={80} />
        )}
      </div>
    );
  };



  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of air compressors and pneumatic equipment
          </p>
        </div>

        {viewLevel === 'brands' && (
          <>
            <div className="max-w-4xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by model, series, kW/HP, pressure (bar/psi), flow, outlet, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-8 flex-wrap">
              {['All', ...brands.map(b => b.name)].map((brandName) => (
                <button
                  key={brandName}
                  onClick={() => handleBrandFilterSelect(brandName)}
                  className={`px-6 py-2 rounded-full font-semibold transition ${
                    selectedBrand === brandName
                      ? 'bg-brand-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-brand-100'
                  }`}
                >
                  {brandName}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
              </div>
            ) : (() => {
              const displayBrands = getFilteredBrands();
              const searchResults = searchQuery.trim() ? getFilteredProducts() : [];

              if (searchQuery.trim() && searchResults.length > 0) {
                return (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Search Results ({searchResults.length} products found)
                      </h3>
                      <p className="text-gray-600">
                        Showing products matching "{searchQuery}"
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                          onClick={() => setSelectedProduct(product)}
                        >
                          {renderProductCardMedia(product)}
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
                                {product.brand_info?.name || product.brand}
                              </span>
                              {product.featured && (
                                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                              {product.series_info?.name || 'General'}
                            </p>
                            <p className="text-gray-500 text-xs mb-4 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-green-600">{product.availability || 'In Stock'}</span>
                              <button className="text-brand-500 hover:text-brand-600 font-semibold text-sm">
                                View Details →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              }

              if (searchQuery.trim() && displayBrands.length === 0) {
                return (
                  <div className="text-center py-12">
                    <div className="inline-block p-8 bg-gray-50 rounded-lg">
                      <Search className="mx-auto mb-4 text-gray-400" size={48} />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                      <p className="text-gray-600 max-w-md">
                        Try a different keyword, brand name, or product specification
                      </p>
                    </div>
                  </div>
                );
              }

              if (displayBrands.length === 0) {
                return (
                  <div className="text-center py-12">
                    <div className="inline-block p-8 bg-gray-50 rounded-lg">
                      <Package className="mx-auto mb-4 text-gray-400" size={48} />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No brands available yet</h3>
                      <p className="text-gray-600">Brands will appear here once added by the administrator.</p>
                    </div>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {displayBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition flex flex-col"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4 relative overflow-hidden">
                      {brand.image_url && brand.image_url.trim() !== '' ? (
                        <>
                          <img src={brand.image_url} alt={brand.name} className="w-full h-full object-contain" />
                          {brand.video_url && brand.video_url.trim() !== '' && (
                            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                              <VideoIcon size={12} />
                              Video
                            </div>
                          )}
                        </>
                      ) : brand.video_url && brand.video_url.trim() !== '' ? (
                        <>
                          <video
                            src={brand.video_url}
                            controls
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                            <VideoIcon size={12} />
                            Video
                          </div>
                        </>
                      ) : (
                        <Package className="text-blue-600" size={80} />
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {brand.name}
                        </span>
                        {brand.name === 'Boge' && (
                          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                            Premium
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{brand.display_title}</h3>
                      {brand.subtitle && (
                        <p className="text-gray-600 text-sm mb-4">{brand.subtitle}</p>
                      )}
                      {!brand.subtitle && brand.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{brand.description}</p>
                      )}
                      <div className="flex items-center justify-between gap-2 mt-auto">
                        <button
                          onClick={() => setSelectedBrandForModal(brand)}
                          className="text-blue-400 hover:text-blue-500 font-semibold text-sm"
                        >
                          View Description
                        </button>
                        <button
                          onClick={() => handleBrandClick(brand)}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                        >
                          View Series →
                        </button>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              );
            })()}
          </>
        )}

        {viewLevel === 'series' && (
          <>
            <div className="max-w-4xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by model, series, kW/HP, pressure (bar/psi), flow, outlet, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={handleBackToBrands}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold"
                >
                  <ArrowLeft size={20} />
                  Back to Brands
                </button>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {brands.find(b => b.id === selectedBrandId)?.display_title || 'Brand'} Product Series
                  </h3>
                  <p className="text-gray-600">Select a series to view available models</p>
                </div>
                {series.length > 0 && (
                  <button
                    onClick={() => {
                      if (selectedBrandId) {
                        fetchProductsForBrand(selectedBrandId);
                        setViewLevel('models');
                        setSelectedSeriesId(null);
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    View All Products
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
              </div>
            ) : (() => {
              const displaySeries = getFilteredSeries();
              const searchResults = searchQuery.trim() ? getFilteredProducts().filter(p => p.brand_id === selectedBrandId) : [];

              if (searchQuery.trim() && searchResults.length > 0) {
                return (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Search Results ({searchResults.length} products found)
                      </h3>
                      <p className="text-gray-600">
                        Showing {brands.find(b => b.id === selectedBrandId)?.name} products matching "{searchQuery}"
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                          onClick={() => setSelectedProduct(product)}
                        >
                          {renderProductCardMedia(product)}
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
                                {product.series_info?.name || 'General'}
                              </span>
                              {product.featured && (
                                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-green-600">{product.availability || 'In Stock'}</span>
                              <button className="text-brand-500 hover:text-brand-600 font-semibold text-sm">
                                View Details →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              }

              if (searchQuery.trim() && displaySeries.length === 0) {
                return (
                  <div className="text-center py-12">
                    <div className="inline-block p-8 bg-gray-50 rounded-lg">
                      <Search className="mx-auto mb-4 text-gray-400" size={48} />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                      <p className="text-gray-600 max-w-md">
                        Try a different keyword or browse the available series
                      </p>
                    </div>
                  </div>
                );
              }

              if (displaySeries.length === 0 && products.length > 0) {
                return (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {brands.find(b => b.id === selectedBrandId)?.display_title} Products
                      </h3>
                      <p className="text-gray-600">
                        This brand has {products.length} products without series
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                          onClick={() => setSelectedProduct(product)}
                        >
                          {renderProductCardMedia(product)}
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
                                {product.brand_info?.name || product.brand}
                              </span>
                              {product.featured && (
                                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-green-600">{product.availability || 'In Stock'}</span>
                              <button className="text-brand-500 hover:text-brand-600 font-semibold text-sm">
                                View Details →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              }

              if (displaySeries.length === 0) {
                return (
                  <div className="text-center py-12">
                    <div className="inline-block p-8 bg-gray-50 rounded-lg">
                      <Package className="mx-auto mb-4 text-gray-400" size={48} />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No series or products available</h3>
                      <p className="text-gray-600">Products and series for this brand will appear here once added.</p>
                    </div>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {displaySeries.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition flex flex-col"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4 relative overflow-hidden">
                      {s.image_url && s.image_url.trim() !== '' ? (
                        <>
                          <img src={s.image_url} alt={s.name} className="w-full h-full object-contain" />
                          {s.video_url && s.video_url.trim() !== '' && (
                            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                              <VideoIcon size={12} />
                              Video
                            </div>
                          )}
                        </>
                      ) : s.video_url && s.video_url.trim() !== '' ? (
                        <>
                          <video
                            src={s.video_url}
                            controls
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                            <VideoIcon size={12} />
                            Video
                          </div>
                        </>
                      ) : (
                        <Package className="text-blue-600" size={80} />
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {brands.find(b => b.id === selectedBrandId)?.name || 'BOGE'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {allProducts.filter(p => p.series_id === s.id).length} models
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{s.name}</h3>
                      {s.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{s.description}</p>
                      )}
                      <div className="flex items-center justify-between gap-2 mt-auto">
                        <button
                          onClick={() => setSelectedSeriesForModal(s)}
                          className="text-blue-400 hover:text-blue-500 font-semibold text-sm"
                        >
                          View Description
                        </button>
                        <button
                          onClick={() => handleSeriesSelect(s.id)}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                        >
                          View Models →
                        </button>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              );
            })()}
          </>
        )}

        {viewLevel === 'models' && (
          <>
            <div className="max-w-4xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by model, series, kW/HP, pressure (bar/psi), flow, outlet, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="mb-8 flex items-center gap-4">
              <button
                onClick={handleBackToSeries}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold"
              >
                <ArrowLeft size={20} />
                Back to Series
              </button>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  {brands.find(b => b.id === selectedBrandId)?.display_title || 'BOGE'}{' '}
                  {selectedSeriesId ? series.find(s => s.id === selectedSeriesId)?.name : 'All Products'}
                </h3>
                <p className="text-gray-600">
                  {searchQuery.trim()
                    ? `Search results (${selectedSeriesId ? getFilteredProducts().filter(p => p.series_id === selectedSeriesId && p.brand_id === selectedBrandId).length : getFilteredProducts().filter(p => p.brand_id === selectedBrandId).length})`
                    : selectedSeriesId ? 'Models sorted by motor power and pressure (highest to lowest)' : `Showing all ${products.length} products for this brand`}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
              </div>
            ) : (() => {
              const displayProducts = searchQuery.trim()
                ? getFilteredProducts().filter(p => {
                    if (selectedSeriesId) {
                      return p.series_id === selectedSeriesId && p.brand_id === selectedBrandId;
                    }
                    return p.brand_id === selectedBrandId;
                  })
                : products;

              if (displayProducts.length === 0) {
                return (
                  <div className="text-center py-12">
                    <div className="inline-block p-8 bg-gray-50 rounded-lg">
                      {searchQuery.trim() ? (
                        <>
                          <Search className="mx-auto mb-4 text-gray-400" size={48} />
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                          <p className="text-gray-600 max-w-md">
                            Try a different keyword or spec (e.g., "10 bar", "15 HP", "SRH 1250", "DS 120")
                          </p>
                        </>
                      ) : (
                        <>
                          <Package className="mx-auto mb-4 text-gray-400" size={48} />
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products available yet</h3>
                          <p className="text-gray-600">Products for this series will appear here once added.</p>
                        </>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div onClick={(e) => {
                      if ((e.target as HTMLElement).tagName === 'VIDEO') {
                        e.stopPropagation();
                      }
                    }}>
                      {renderProductCardMedia(product)}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
                          {product.brand_info?.name || product.brand}
                        </span>
                        {product.featured && (
                          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-green-600">{product.availability || 'In Stock'}</span>
                        <button className="text-brand-500 hover:text-brand-600 font:semibold text-sm">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              );
            })()}
          </>
        )}
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className={`bg-white rounded-lg w-full max-h-[90vh] overflow-y-auto ${
              selectedProduct.is_catalogue ? 'max-w-6xl' : 'max-w-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm font-semibold text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
                    {selectedProduct.brand}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-3">{selectedProduct.name}</h3>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              {(selectedProduct.image_url || selectedProduct.video_url) ? (
                <div className="space-y-4">
                  {selectedProduct.video_url && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <video
                        src={selectedProduct.video_url}
                        controls
                        className="w-full h-auto rounded"
                      />
                    </div>
                  )}
                  {selectedProduct.image_url && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <img src={selectedProduct.image_url} alt={selectedProduct.name} className="w-full h-auto" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center rounded-lg mb-6">
                  <Package className="text-brand-500" size={120} />
                </div>
              )}

              <div className="space-y-4 mt-4">
                {!selectedProduct.is_catalogue && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>
                )}

                {selectedProduct.is_catalogue && (
                  <div className="text-sm text-gray-600">
                    <p>{selectedProduct.description}</p>
                  </div>
                )}

                {selectedProduct.specifications && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technical Specifications</h4>
                    <p className="text-gray-600 whitespace-pre-line">{convertUnits(selectedProduct.specifications)}</p>
                  </div>
                )}

                {!selectedProduct.is_catalogue && (
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-500">Availability</p>
                      <p className="font-semibold text-green-600">{selectedProduct.availability}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-semibold text-gray-900">{selectedProduct.price}</p>
                    </div>
                  </div>
                )}

                {!selectedProduct.is_catalogue && (
                  <div className="flex gap-4 pt-4">
                    {selectedProduct.datasheet_url && (
                      <button className="flex-1 bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition font-semibold flex items-center justify-center gap-2">
                        <FileDown size={20} />
                        Download Datasheet
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-1 bg-white border-2 border-brand-500 text-brand-500 px-6 py-3 rounded-lg hover:bg-brand-50 transition font-semibold"
                    >
                      Request Quote
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showExtensionModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowExtensionModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">C-2 Series - Configuration Options</h3>
                <button onClick={() => setShowExtensionModal(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <img src="/assets/image.png" alt="C-2 Series Configuration Options" className="w-full h-auto" />
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>
                  Detailed dimensions and weight specifications for different C-2 Series configurations including dryer (D),
                  120 gal receiver (R), and combined options (DR).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedBrandForModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBrandForModal(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {selectedBrandForModal.name}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-3">{selectedBrandForModal.display_title}</h3>
                </div>
                <button onClick={() => setSelectedBrandForModal(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              {(selectedBrandForModal.image_url || selectedBrandForModal.video_url) ? (
                <div className="space-y-4">
                  {selectedBrandForModal.video_url && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <video
                        src={selectedBrandForModal.video_url}
                        controls
                        className="w-full h-auto rounded"
                      />
                    </div>
                  )}
                  {selectedBrandForModal.image_url && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <img src={selectedBrandForModal.image_url} alt={selectedBrandForModal.name} className="w-full h-auto" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center rounded-lg mb-6">
                  <Package className="text-blue-600" size={120} />
                </div>
              )}

              {selectedBrandForModal.description && (
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">About {selectedBrandForModal.name}</h4>
                    <p className="text-gray-600">{selectedBrandForModal.description}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4 mt-4 border-t">
                <button
                  onClick={() => {
                    setSelectedBrandForModal(null);
                    handleBrandClick(selectedBrandForModal);
                  }}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  View Products
                </button>
                <button
                  onClick={() => {
                    setSelectedBrandForModal(null);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition font-semibold"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedSeriesForModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSeriesForModal(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {brands.find(b => b.id === selectedBrandId)?.name || 'Series'}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-3">{selectedSeriesForModal.name}</h3>
                </div>
                <button onClick={() => setSelectedSeriesForModal(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              {(selectedSeriesForModal.image_url || selectedSeriesForModal.video_url) ? (
                <div className="space-y-4">
                  {selectedSeriesForModal.video_url && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <video
                        src={selectedSeriesForModal.video_url}
                        controls
                        className="w-full h-auto rounded"
                      />
                    </div>
                  )}
                  {selectedSeriesForModal.image_url && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <img src={selectedSeriesForModal.image_url} alt={selectedSeriesForModal.name} className="w-full h-auto" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center rounded-lg mb-6">
                  <Package className="text-blue-600" size={120} />
                </div>
              )}

              {selectedSeriesForModal.description && (
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">About This Series</h4>
                    <p className="text-gray-600">{selectedSeriesForModal.description}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4 mt-4 border-t">
                <button
                  onClick={() => {
                    setSelectedSeriesForModal(null);
                    handleSeriesSelect(selectedSeriesForModal.id);
                  }}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  View Models
                </button>
                <button
                  onClick={() => {
                    setSelectedSeriesForModal(null);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition font-semibold"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}