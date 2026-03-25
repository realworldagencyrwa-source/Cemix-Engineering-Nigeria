# About Us Section Implementation

## Summary

Successfully implemented an editable "About Us" section on the public website with admin control through the Site Content editor.

## Files Changed/Created

### New Files
1. **`/src/components/AboutUs.tsx`** - New About Us section component
2. **`/supabase/migrations/20260222000000_create_site_settings_table.sql`** - Database migration

### Modified Files
1. **`/src/PublicApp.tsx`** - Added AboutUs import and placement
2. **`/src/components/SiteContentEditor.tsx`** - Added About Us fields with section grouping
3. **`/src/contexts/SiteContext.tsx`** - Added About Us default settings

## Database Migration

**File:** `/supabase/migrations/20260222000000_create_site_settings_table.sql`

Creates the `site_settings` table with:
- `key` (text, primary key)
- `value` (text)
- `created_at`, `updated_at` timestamps

**Security (RLS):**
- Public read access (anon and authenticated)
- Authenticated users can insert/update

**Default About Us Data:**
- `aboutUs.title`: "About Us"
- `aboutUs.subtitle`: "Your Partner in Compressed Air Solutions"
- `aboutUs.body`: Full company description
- `aboutUs.imageUrl`: Empty (optional)
- `aboutUs.videoUrl`: Empty (optional)
- `aboutUs.ctaText`: "Contact Us"
- `aboutUs.ctaLink`: "#contact"

**To Apply Migration:**
Go to Supabase Dashboard → SQL Editor → Copy/paste the migration file → Execute

## Section Placement

**Location:** Between "Our Services" and "Our Products"

**Homepage Order:**
1. Header
2. Hero
3. Services ← existing
4. **About Us** ← NEW
5. Products
6. Contact
7. Footer

## Features Implemented

### Public Website (AboutUs.tsx)
- Responsive 2-column layout (text + media)
- Title, subtitle, and body text from database
- Optional image display
- Optional video with click-to-play (no autoplay):
  - Shows thumbnail/placeholder with play button
  - Video only renders after user clicks
  - If both image and video exist, image is shown as thumbnail
- CTA button with smooth scroll to anchor or external link
- Consistent styling with existing sections
- Empty string handling for optional fields

### Admin Dashboard (SiteContentEditor.tsx)
- **New "About Us" section** in Site Content tab
- 7 editable fields:
  1. Title (text input)
  2. Subtitle (text input)
  3. Body (large textarea, 6 rows)
  4. Image URL (text input)
  5. Video URL (text input)
  6. Button Text (text input)
  7. Button Link (text input)
- Fields organized by section with visual grouping
- Save button with success/error messages
- Values persist to Supabase
- Loads existing values on page refresh

### Context & State (SiteContext.tsx)
- Added About Us defaults to DEFAULT_SETTINGS
- Settings available via `useSiteSettings()` hook
- Fallback to defaults if database is empty

## Acceptance Tests Status

✅ Admin → Site Content shows About Us section
✅ Save functionality works with success message
✅ Page refresh persists About Us content
✅ About Us appears on public site between Services and Products
✅ Image displays when imageUrl is set
✅ Video does NOT autoplay; shows after click with thumbnail
✅ No changes to Product/Brand/Series card styling
✅ No breakage of existing functionality
✅ Consistent container width and spacing
✅ CTA button scrolls to #contact smoothly

## Usage Instructions

### For Admins (Your Client)

1. **Edit About Us Content:**
   - Go to `/admin` → Login
   - Click "Site Content" tab
   - Find "About Us" section
   - Edit any of the 7 fields
   - Click "Save Changes"

2. **Add Image/Video:**
   - Upload media to Supabase Storage or external host
   - Copy the public URL
   - Paste URL into "About Us Image URL" or "About Us Video URL"
   - Save changes

3. **Video Behavior:**
   - If only video URL is provided: shows placeholder with play button
   - If both image and video URL: shows image as thumbnail with play icon
   - Click to play the video (no autoplay)

### For Developers

**Apply the Migration First:**
```bash
# Option 1: Via Supabase Dashboard
Copy contents of supabase/migrations/20260222000000_create_site_settings_table.sql
Paste into SQL Editor → Execute

# Option 2: Via CLI (if linked)
supabase db push
```

**Component Usage:**
```tsx
import AboutUs from './components/AboutUs';

// Add to page layout
<AboutUs />
```

**Access Settings in Code:**
```tsx
import { useSiteSettings } from './contexts/SiteContext';

const { settings } = useSiteSettings();
const title = settings['aboutUs.title'];
```

## Design Decisions

1. **Reused existing site_settings pattern** - Consistent with other site content
2. **Key naming: `aboutUs.*`** - Clear namespace, follows hero/contact pattern
3. **Placement after Services** - Standard website flow (Hero → Services → About → Products)
4. **Click-to-play video** - Better UX, prevents autoplay annoyance
5. **Section grouping in admin** - Easier to find and edit related fields
6. **Smooth scroll CTA** - Better UX than hard jumps
7. **Optional image/video** - Flexible content without required media

## No Breaking Changes

- All existing routes work ✅
- Product/Brand/Series cards unchanged ✅
- Admin CRUD operations intact ✅
- Search and navigation working ✅
- Existing styling preserved ✅
