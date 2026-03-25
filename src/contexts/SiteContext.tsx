import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAllSiteSettings } from '../lib/database';

interface SiteContextType {
  settings: Record<string, string>;
  loading: boolean;
}

const SiteContext = createContext<SiteContextType>({ settings: {}, loading: true });

export const useSiteSettings = () => useContext(SiteContext);

const DEFAULT_SETTINGS = {
  'hero.title': 'Your Trusted Partner for Compressed Air Solutions',
  'hero.subtitle': 'Authorized distributor of BOGE, ABAC, and Bestrand. Powering Nigeria and West Africa with high-performance compressed air systems.',
  'hero.primaryButtonText': 'Browse Products',
  'hero.secondaryButtonText': 'Contact Us',
  'aboutUs.title': 'About Us',
  'aboutUs.subtitle': 'Your Partner in Compressed Air Solutions',
  'aboutUs.body': 'Cemix Pro Nigeria Limited is a leading provider of industrial compressed air systems and solutions across Nigeria and West Africa. As authorized distributors of premium brands including BOGE, ABAC, and Bestrand, we deliver high-performance equipment backed by expert technical support and comprehensive after-sales service. Our commitment to quality, reliability, and customer satisfaction has made us the trusted choice for businesses seeking dependable compressed air solutions.',
  'aboutUs.imageUrl': '',
  'aboutUs.videoUrl': '',
  'aboutUs.ctaText': 'Contact Us',
  'aboutUs.ctaLink': '#contact',
  'contact.address': 'Lagos, Nigeria',
  'contact.phone1': '+234 708 039 8040',
  'contact.phone2': '+234 707 524 2697',
  'contact.email': 'sales@cemix-nigeria.com',
  'contact.hoursWeekday': 'Mon-Fri: 8:00 AM - 5:00 PM',
  'contact.hoursSaturday': 'Sat: 8:00 AM - 2:00 PM',
  'socials.facebook': 'https://www.facebook.com/share/1AG4xJMGrP/?mibextid=wwXIfr',
  'socials.instagram': 'https://www.instagram.com/cemixnigeria?igsh=ODlzcWY0eXV4dnJv',
  'socials.whatsapp': '+2347080398040',
  'socials.tiktok': 'https://www.tiktok.com/@cemixnigeria?_r=1&_t=ZS-93tj0ovoijx',
};

export function SiteProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Record<string, string>>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const dbSettings = await getAllSiteSettings();

        setSettings({ ...DEFAULT_SETTINGS, ...dbSettings });
      } catch (err) {
        console.error('Failed to load site settings:', err);
        setSettings(DEFAULT_SETTINGS);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  return (
    <SiteContext.Provider value={{ settings, loading }}>
      {children}
    </SiteContext.Provider>
  );
}
