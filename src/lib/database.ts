import { supabase } from './supabase';

export async function getSiteSetting(key: string, fallback: string = ''): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .maybeSingle();

    if (error || !data) {
      return fallback;
    }

    return data.value || fallback;
  } catch (err) {
    console.error(`Error fetching setting ${key}:`, err);
    return fallback;
  }
}

export async function getAllSiteSettings(): Promise<Record<string, string>> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');

    if (error || !data) {
      return {};
    }

    return data.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
  } catch (err) {
    console.error('Error fetching all settings:', err);
    return {};
  }
}

export async function upsertSiteSetting(key: string, value: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });

    if (error) {
      console.error(`Error upserting setting ${key}:`, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`Error upserting setting ${key}:`, err);
    return false;
  }
}

export interface Brand {
  id: string;
  name: string;
  display_title: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  video_url?: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Series {
  id: string;
  brand_id: string;
  name: string;
  short_code?: string;
  description?: string;
  image_url?: string;
  video_url?: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  brand_id?: string;
  series?: string;
  series_id?: string;
  model?: string;
  category: string;
  description: string;
  specifications?: string;
  technical_specs?: string;
  image_url?: string;
  video_url?: string;
  datasheet_url?: string;
  price: string;
  availability?: string;
  in_stock?: boolean;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
  brand_info?: {
    id: string;
    name: string;
    display_title: string;
  };
  series_info?: {
    id: string;
    name: string;
    short_code: string;
  };
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'BOGE S 20 Series',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'High-performance screw compressor for industrial applications',
    price: 'Contact for pricing',
    featured: true,
    in_stock: true
  }
];

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand_info:brands(id, name, display_title),
        series_info:product_series(id, name, short_code)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return FALLBACK_PRODUCTS;
    }

    if (!data || data.length === 0) {
      return FALLBACK_PRODUCTS;
    }

    return data;
  } catch (err) {
    console.error('Error fetching products:', err);
    return FALLBACK_PRODUCTS;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data;
  } catch (err) {
    console.error(`Error fetching product ${id}:`, err);
    return null;
  }
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
  try {
    const { id, created_at, updated_at, brand_info, series_info, ...payload } = product as any;

    const { data, error } = await supabase
      .from('products')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error creating product:', err);
    return null;
  }
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
  try {
    const { id: _id, created_at, updated_at, brand_info, series_info, ...payload } = updates as any;

    const { error } = await supabase
      .from('products')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error(`Error updating product ${id}:`, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`Error updating product ${id}:`, err);
    return false;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting product ${id}:`, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`Error deleting product ${id}:`, err);
    return false;
  }
}

export async function getBrands(): Promise<Brand[]> {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching brands:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching brands:', err);
    return [];
  }
}

export async function getBrand(id: string): Promise<Brand | null> {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data;
  } catch (err) {
    console.error(`Error fetching brand ${id}:`, err);
    return null;
  }
}

export async function createBrand(brand: Omit<Brand, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Brand | null; error: string | null }> {
  try {
    const { id, created_at, updated_at, ...payload } = brand as any;
    const { data, error } = await supabase
      .from('brands')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('[ADMIN] Error creating brand:', error);
      return { data: null, error: `Database error: ${error.message} (Code: ${error.code})` };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error('[ADMIN] Error creating brand:', err);
    return { data: null, error: err?.message || 'Unknown error occurred' };
  }
}

export async function updateBrand(
  id: string,
  updates: Partial<Brand> & { productCount?: number; seriesCount?: number }
): Promise<{ success: boolean; error: string | null }> {
  try {
    // Remove fields that are NOT real DB columns (UI-only)
    const { id: _id, created_at, updated_at, productCount, seriesCount, ...payload } = updates as any;

    const { error } = await supabase
      .from('brands')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error(`[ADMIN] Error updating brand ${id}:`, error);
      return { success: false, error: `Database error: ${error.message} (Code: ${error.code})` };
    }

    return { success: true, error: null };
  } catch (err: any) {
    console.error(`[ADMIN] Error updating brand ${id}:`, err);
    return { success: false, error: err?.message || 'Unknown error occurred' };
  }
}

export async function deleteBrand(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from('brands')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`[ADMIN] Error deleting brand ${id}:`, error);
      return { success: false, error: `Database error: ${error.message} (Code: ${error.code})` };
    }

    return { success: true, error: null };
  } catch (err: any) {
    console.error(`[ADMIN] Error deleting brand ${id}:`, err);
    return { success: false, error: err?.message || 'Unknown error occurred' };
  }
}

export async function getSeries(brandId?: string): Promise<Series[]> {
  try {
    let query = supabase
      .from('product_series')
      .select('*')
      .order('sort_order', { ascending: true });

    if (brandId) {
      query = query.eq('brand_id', brandId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching series:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching series:', err);
    return [];
  }
}

export async function getSeriesById(id: string): Promise<Series | null> {
  try {
    const { data, error } = await supabase
      .from('product_series')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data;
  } catch (err) {
    console.error(`Error fetching series ${id}:`, err);
    return null;
  }
}

export async function createSeries(series: Omit<Series, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Series | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('product_series')
      .insert([series])
      .select()
      .single();

    if (error) {
      console.error('[ADMIN] Error creating series:', error);
      return { data: null, error: `Database error: ${error.message} (Code: ${error.code})` };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error('[ADMIN] Error creating series:', err);
    return { data: null, error: err?.message || 'Unknown error occurred' };
  }
}

export async function updateSeries(id: string, updates: Partial<Series>): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from('product_series')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error(`[ADMIN] Error updating series ${id}:`, error);
      return { success: false, error: `Database error: ${error.message} (Code: ${error.code})` };
    }

    return { success: true, error: null };
  } catch (err: any) {
    console.error(`[ADMIN] Error updating series ${id}:`, err);
    return { success: false, error: err?.message || 'Unknown error occurred' };
  }
}

export async function deleteSeries(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from('product_series')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`[ADMIN] Error deleting series ${id}:`, error);
      return { success: false, error: `Database error: ${error.message} (Code: ${error.code})` };
    }

    return { success: true, error: null };
  } catch (err: any) {
    console.error(`[ADMIN] Error deleting series ${id}:`, err);
    return { success: false, error: err?.message || 'Unknown error occurred' };
  }
}

export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('brand_id', brandId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products by brand:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching products by brand:', err);
    return [];
  }
}

export async function getProductsBySeries(seriesId: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('series_id', seriesId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products by series:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching products by series:', err);
    return [];
  }
}
