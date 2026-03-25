# Media Upload Implementation Guide

## Overview
Added image and video upload functionality for Brands and Series in the admin panel, following the same pattern as existing Product image uploads.

## Changes Made

### 1. Database Schema Changes

**SQL Migration File**: `/tmp/add_video_columns.sql`

Added `video_url` columns to three tables:
- `brands.video_url` (text, nullable)
- `series.video_url` (text, nullable)
- `products.video_url` (text, nullable)

**To Apply Migration**:
You need to manually run the SQL migration in your Supabase SQL Editor:
1. Go to your Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `/tmp/add_video_columns.sql`
3. Execute the query

### 2. New Files Created

#### `/src/utils/mediaUpload.ts`
Centralized media upload utility with:
- `validateImage(file)` - Validates PNG/JPG/WebP, max 5MB
- `validateVideo(file)` - Validates MP4/WebM/MOV, max 50MB
- `uploadImage(file, entityType, entityId)` - Uploads to Supabase Storage
- `uploadVideo(file, entityType, entityId)` - Uploads to Supabase Storage
- `createFilePreview(file)` - Creates local preview before upload

**Storage Structure**:
- Images/Videos stored in `media` bucket (public)
- Path format: `{entityType}/{entityId}/{timestamp}-{filename}`
  - Example: `brands/abc123/1708531200000-logo.png`
  - Example: `series/def456/1708531200000-overview.mp4`

### 3. Updated Files

#### `/src/lib/database.ts`
- Added `video_url?: string` to `Brand` interface (line 67)
- Added `video_url?: string` to `Series` interface (line 79)
- Added `video_url?: string` to `Product` interface (line 99)

#### `/src/lib/supabase.ts`
- Added `video_url?: string | null` to `Product` interface (line 17)

#### `/src/components/BrandsManager.tsx`
**Major Changes**:
- Extracted Brand modal into separate `BrandModal` component
- Extracted Series modal into separate `SeriesModal` component
- Both modals now include:
  - Image upload section with file picker, preview, and remove button
  - Video upload section with file picker, preview, and remove button
  - Manual URL input fields (backward compatible)
  - Upload progress indicators
  - Validation error messages

**New Component Functions**:
- `BrandModal`: Handles brand editing with image/video uploads
- `SeriesModal`: Handles series editing with image/video uploads

**Upload Features**:
- File validation before upload
- Local preview while uploading
- Automatic URL storage after successful upload
- Clear/remove buttons to reset media
- Disabled state during upload
- Error display for validation/upload failures

### 4. Supabase Storage Setup Required

**IMPORTANT**: You need to create a storage bucket in Supabase:

1. Go to Supabase Dashboard → Storage
2. Create a new bucket named `media`
3. Set it to **Public** (allow public access)
4. Set RLS policies (or disable RLS for this bucket if public)

**Alternative**: The code is configured to use a single `media` bucket. If you prefer separate buckets, modify the upload functions in `/src/utils/mediaUpload.ts`:
- Change `from('media')` to `from('brand-media')`, `from('series-media')`, etc.

### 5. Public Site Display

The public Products page already displays uploaded images correctly:
- Brand cards (line 370-374 in Products.tsx): Shows uploaded `brand.image_url` if available
- Series cards (line 460-464 in Products.tsx): Shows uploaded `series.image_url` if available
- Both fall back to Package icon if no image

**No changes needed** for displaying images - existing code already handles it!

**Video Display**: Currently videos are uploaded and stored but NOT displayed on public site. To add video display:
- Add video player or modal on brand/series cards
- Use `brand.video_url` or `series.video_url`
- Recommend: Show video icon, open modal with video player on click

## Testing Instructions

### Test Brand Image Upload
1. Log into admin panel
2. Go to Brand Management section
3. Click "Add Brand" or "Edit" on existing brand
4. In the modal, find "Brand Image" section
5. Click "Choose File" and select a PNG/JPG/WebP image (under 5MB)
6. Image preview should appear immediately
7. Upload happens automatically
8. Save the brand
9. Go to public Products page → brand card should show the uploaded image

### Test Series Image Upload
1. In Brand Management, expand a brand (click the chevron)
2. Click "Add Series" or edit existing series
3. In the modal, find "Series Image" section
4. Click "Choose File" and select an image
5. Image preview appears
6. Upload happens automatically
7. Save the series
8. Go to public Products page → click brand → series card should show uploaded image

### Test Brand Video Upload
1. Edit a brand
2. In "Brand Video (Optional)" section
3. Click "Choose File" and select MP4/WebM/MOV (under 50MB)
4. Video preview with controls should appear
5. Upload happens automatically
6. Video URL is saved to database (check Supabase table)
7. Currently NOT displayed on public site (future enhancement)

### Test Series Video Upload
1. Edit a series
2. Follow same steps as brand video
3. Video uploads to `media/series/{id}/` path

### Test Manual URL Input
1. Edit brand or series
2. Paste image/video URL directly into text input below upload area
3. Save - URL is stored without upload
4. Backward compatible with existing workflow

### Test Validation
1. Try uploading wrong file type (e.g., PDF) → Should show error
2. Try uploading too large file → Should show error
3. Try uploading during another upload → Button disabled

### Test Remove/Clear
1. Upload an image
2. Click "Remove image" button
3. Preview should disappear
4. Field is cleared (empty string, not null)
5. Can upload new image

## File Size Limits

- **Images**: 5MB max (enforced in `mediaUpload.ts`)
- **Videos**: 50MB max (enforced in `mediaUpload.ts`)

To change limits, edit constants in `/src/utils/mediaUpload.ts`:
```typescript
const MAX_IMAGE_SIZE = 5242880; // 5MB in bytes
const MAX_VIDEO_SIZE = 52428800; // 50MB in bytes
```

## Accepted File Types

**Images**:
- image/png
- image/jpeg
- image/jpg
- image/webp

**Videos**:
- video/mp4
- video/webm
- video/quicktime (MOV)

## Storage Costs

Be aware:
- Supabase Storage has free tier (1GB)
- Videos can consume storage quickly (50MB per video)
- Monitor usage in Supabase Dashboard → Storage

## Troubleshooting

### Upload Fails with "Invalid Bucket"
- Create the `media` bucket in Supabase Storage
- Make sure it's set to Public

### Upload Fails with RLS Error
- Either disable RLS for storage bucket
- Or add policy: Allow authenticated users to INSERT

### Image/Video Not Displaying
- Check browser console for URL errors
- Verify bucket is public
- Check if URL in database is correct format

### File Size Error
- Compress images before upload (use online tools)
- Convert videos to lower bitrate (use ffmpeg or online converter)

## Future Enhancements

1. **Product Video Upload**: Already supported in database, just need to add UI in ProductsManager.tsx (copy BrandModal pattern)

2. **Video Player on Public Site**: Add video modal/player when user clicks brand/series card with video

3. **Image Compression**: Auto-compress large images before upload

4. **Direct Upload to Storage**: Currently uploads then gets URL. Could use Storage upload directly from form.

5. **Multiple Images**: Support image galleries for brands/series

6. **Video Thumbnails**: Generate and display video thumbnails

## Code Quality Notes

- Reused existing ProductsManager upload pattern
- No changes to public Products page layout/styling (per requirements)
- Backward compatible - manual URL input still works
- TypeScript interfaces updated consistently
- Validation happens before upload (better UX)
- Error handling at all levels
