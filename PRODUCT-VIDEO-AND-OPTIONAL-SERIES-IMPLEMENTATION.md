# Product Video Upload and Optional Series Implementation

## Overview
This implementation adds two critical features to the product management system:
1. **Product Video Upload**: Products can now have videos uploaded (matching brand/series capabilities)
2. **Optional Series**: Products can exist without being assigned to a series

## Changes Made

### 1. Database Schema
The following changes were made to the products table:
- Added `video_url` column (text, nullable) for storing product video URLs
- Ensured `series_id` is nullable (products can exist without a series)
- Ensured `brand_id` is NOT NULL (products must always belong to a brand)

### 2. TypeScript Interfaces
Updated `Product` interface in both `supabase.ts` and `database.ts`:
- Added `video_url?: string | null` field

### 3. Admin Panel - ProductsManager Component
Enhanced product creation/editing form with:
- **Video Upload Section**:
  - File input accepting MP4, WebM, MOV formats (max 50MB)
  - Video preview with controls
  - Manual URL input option
  - Remove/clear video functionality
  - Upload progress indicators
- **Image Upload Section** (refactored):
  - Uses mediaUpload utilities for consistency
  - Better preview and error handling
- **Series Selection**:
  - Marked as "Optional" in the UI
  - Dropdown allows "No series / General" option
  - Help text clarifies it's optional
  - Properly handles null value submission

### 4. Public Products View Component
Enhanced navigation and display logic:
- **Brand Click Behavior**:
  - If brand has series → shows series view
  - If brand has NO series but HAS products → shows products directly
  - If brand has neither → shows friendly empty state
- **Series View Enhancements**:
  - Added "View All Products" button to show all brand products (not just series products)
  - Shows products directly when no series exist
- **Models View Updates**:
  - Header indicates "All Products" when viewing all brand products
  - Properly filters products when selectedSeriesId is null
  - Search works across all products regardless of series assignment

### 5. Media Upload Utilities
Leveraged existing `mediaUpload.ts` utilities:
- `uploadImage()` - handles image upload to Supabase storage
- `uploadVideo()` - handles video upload to Supabase storage
- `validateImage()` - validates image file type and size
- `validateVideo()` - validates video file type and size (MP4, WebM, MOV, max 50MB)
- `createFilePreview()` - generates preview URLs for selected files

## Storage Structure
Videos and images are stored in Supabase storage with paths:
- Images: `products/{productId}/{timestamp}-{filename}`
- Videos: `products/{productId}/{timestamp}-{filename}`

## Test Checklist

### Admin Panel Tests
- [ ] **Create product WITH series**
  - Select a brand
  - Select a series from dropdown
  - Upload product image (PNG/JPG/WebP, <5MB)
  - Upload product video (MP4/WebM/MOV, <50MB)
  - Fill in other required fields
  - Submit and verify creation
  - Verify product appears under correct series

- [ ] **Create product WITHOUT series**
  - Select a brand
  - Leave series dropdown as "No series / General"
  - Upload product image
  - Upload product video
  - Fill in other required fields
  - Submit and verify creation
  - Verify product appears under brand (not in any series)

- [ ] **Upload product video**
  - Select video file → verify preview shows video player
  - Verify upload progress indicator
  - Verify public URL is saved
  - Verify video can be removed/cleared
  - Test manual URL paste option

- [ ] **Upload product image**
  - Select image file → verify preview shows thumbnail
  - Verify upload progress indicator
  - Verify public URL is saved
  - Verify image can be removed/cleared
  - Test manual URL paste option

- [ ] **Edit existing product**
  - Edit product with series → verify series is selected
  - Edit product without series → verify "No series / General" is selected
  - Change series assignment
  - Update video/image
  - Verify changes persist

### Public Side Tests
- [ ] **Brand with series navigation**
  - Click brand → should show series view
  - Click series → should show products for that series
  - Use "View All Products" button → should show all brand products
  - Back navigation should work correctly

- [ ] **Brand without series navigation**
  - Click brand with no series but has products → should show products directly
  - Verify products display correctly
  - Back to brands should work

- [ ] **Brand with no series and no products**
  - Click brand → should show friendly empty state
  - Message should indicate no series or products available

- [ ] **Search functionality**
  - Search for product by name → should find products regardless of series
  - Search for product without series → should appear in results
  - Search should work from brands, series, and models views

- [ ] **Product modal/details**
  - Click product → modal should open
  - Image should display if available
  - Video should display if available (with controls)
  - Product info should be complete
  - Brand and series info should display correctly (or "General" if no series)

### Edge Cases
- [ ] Product with video but no image
- [ ] Product with image but no video
- [ ] Product with neither video nor image
- [ ] Brand with mix of series products and non-series products
- [ ] Large video file (approaching 50MB limit)
- [ ] Invalid video format (should show error)
- [ ] Invalid image format (should show error)

## API Behavior
- `series_id` is sent as `null` (not undefined or empty string) when no series selected
- `brand_id` is always required and validated
- Video and image uploads return public URLs from Supabase storage
- File uploads are validated on both client and server side

## Notes
- Existing products remain unchanged
- Brand → Series → Products navigation is preserved
- Search functionality works across all levels
- No breaking changes to existing features
- UI/styling matches existing brand/series patterns
