import { supabase } from '../lib/supabase';

export interface UploadResult {
  url: string | null;
  error: string | null;
}

export interface FileValidation {
  isValid: boolean;
  error: string | null;
}

const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
const MAX_IMAGE_SIZE = 5242880; // 5MB
const MAX_VIDEO_SIZE = 52428800; // 50MB

/**
 * Validate image file before upload
 */
export function validateImage(file: File): FileValidation {
  if (!IMAGE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please select a PNG, JPG, or WebP image'
    };
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return {
      isValid: false,
      error: 'Image must be less than 5MB'
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validate video file before upload
 */
export function validateVideo(file: File): FileValidation {
  if (!VIDEO_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please select an MP4, WebM, or MOV video'
    };
  }

  if (file.size > MAX_VIDEO_SIZE) {
    return {
      isValid: false,
      error: 'Video must be less than 50MB'
    };
  }

  return { isValid: true, error: null };
}

/**
 * Upload image to Supabase Storage
 */
export async function uploadImage(
  file: File,
  entityType: 'brands' | 'series' | 'products',
  entityId?: string
): Promise<UploadResult> {
  try {
    const validation = validateImage(file);
    if (!validation.isValid) {
      return { url: null, error: validation.error };
    }

    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = entityId
      ? `${entityType}/${entityId}/${timestamp}-${sanitizedName}`
      : `${entityType}/${timestamp}-${sanitizedName}`;

    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('media')
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl, error: null };
  } catch (err: any) {
    console.error('Image upload error:', err);
    return { url: null, error: err.message || 'Failed to upload image' };
  }
}

/**
 * Upload video to Supabase Storage
 */
export async function uploadVideo(
  file: File,
  entityType: 'brands' | 'series' | 'products',
  entityId?: string
): Promise<UploadResult> {
  try {
    const validation = validateVideo(file);
    if (!validation.isValid) {
      return { url: null, error: validation.error };
    }

    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = entityId
      ? `${entityType}/${entityId}/${timestamp}-${sanitizedName}`
      : `${entityType}/${timestamp}-${sanitizedName}`;

    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('media')
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl, error: null };
  } catch (err: any) {
    console.error('Video upload error:', err);
    return { url: null, error: err.message || 'Failed to upload video' };
  }
}

/**
 * Create a preview URL for a file (for local preview before upload)
 */
export function createFilePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
