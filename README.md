# Cemix Nigeria - Industrial Equipment Website

A modern, responsive website for Cemix Nigeria showcasing industrial equipment including compressors, dryers, and related products.

## Features

- Dynamic product catalog with brand hierarchy
- Admin panel for content management
- Contact form with email notifications
- Responsive design optimized for all devices
- Full-featured CMS for managing products, brands, and site content

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and optimized builds
- Tailwind CSS for styling
- Supabase for backend (database, auth, storage)
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/cemix-nigeria.git
cd cemix-nigeria
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

See [DEPLOY-TO-CEMIX-NIGERIA.md](./DEPLOY-TO-CEMIX-NIGERIA.md) for detailed deployment instructions to www.cemix-nigeria.com.

## Project Structure

```
src/
├── components/         # React components
│   ├── Hero.tsx       # Homepage hero section
│   ├── Products.tsx   # Product listing
│   ├── AdminPanel.tsx # Admin dashboard
│   └── ...
├── contexts/          # React context providers
├── lib/               # Utility functions and configurations
│   ├── supabase.ts    # Supabase client
│   └── database.ts    # Database helpers
├── utils/             # Helper utilities
├── App.tsx            # Main public app
├── AdminApp.tsx       # Admin app
└── main.tsx           # Entry point

supabase/
├── migrations/        # Database migrations
└── functions/         # Edge functions
```

## Admin Access

Default admin credentials are set up during database initialization. Use the admin panel at `/admin` to manage:

- Products and specifications
- Brands and series
- Site content (hero text, about us, contact info)
- Contact form submissions

## License

Proprietary - All rights reserved by Cemix Nigeria
