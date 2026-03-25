import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  brand: string;
  brand_id?: string;
  category: string;
  description: string;
  specifications: string | null;
  image_url: string | null;
  video_url?: string | null;
  datasheet_url: string | null;
  price: string;
  availability: string;
  featured: boolean;
  series: string | null;
  series_id?: string;
  model?: string;
  motor_power: number | null;
  is_catalogue: boolean | null;
  created_at: string;
  updated_at: string;
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
