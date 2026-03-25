import { useState, useEffect } from 'react';
import { getAllSiteSettings, upsertSiteSetting } from '../lib/database';

const SITE_CONTENT_FIELDS = [
  { key: 'hero.title', label: 'Hero Title', defaultValue: 'Your Trusted Partner for Compressed Air Solutions', type: 'text' },
  { key: 'hero.subtitle', label: 'Hero Subtitle', defaultValue: 'Authorized distributor of BOGE, ABAC, and Bestrand. Powering Nigeria and West Africa with high-performance compressed air systems.', type: 'textarea' },
  { key: 'hero.primaryButtonText', label: 'Hero Primary Button', defaultValue: 'Browse Products', type: 'text' },
  { key: 'hero.secondaryButtonText', label: 'Hero Secondary Button', defaultValue: 'Contact Us', type: 'text' },
  { key: 'aboutUs.title', label: 'About Us Title', defaultValue: 'About Us', type: 'text', section: 'About Us' },
  { key: 'aboutUs.subtitle', label: 'About Us Subtitle', defaultValue: 'Your Partner in Compressed Air Solutions', type: 'text', section: 'About Us' },
  { key: 'aboutUs.body', label: 'About Us Body', defaultValue: 'Cemix Pro Nigeria Limited is a leading provider of industrial compressed air systems and solutions across Nigeria and West Africa. As authorized distributors of premium brands including BOGE, ABAC, and Bestrand, we deliver high-performance equipment backed by expert technical support and comprehensive after-sales service. Our commitment to quality, reliability, and customer satisfaction has made us the trusted choice for businesses seeking dependable compressed air solutions.', type: 'textarea-large', section: 'About Us' },
  { key: 'aboutUs.imageUrl', label: 'About Us Image URL', defaultValue: '', type: 'text', section: 'About Us' },
  { key: 'aboutUs.videoUrl', label: 'About Us Video URL', defaultValue: '', type: 'text', section: 'About Us' },
  { key: 'aboutUs.ctaText', label: 'About Us Button Text', defaultValue: 'Contact Us', type: 'text', section: 'About Us' },
  { key: 'aboutUs.ctaLink', label: 'About Us Button Link', defaultValue: '#contact', type: 'text', section: 'About Us' },
  { key: 'contact.address', label: 'Address', defaultValue: 'Lagos, Nigeria', type: 'textarea' },
  { key: 'contact.phone1', label: 'Phone 1', defaultValue: '+234 708 039 8040', type: 'text' },
  { key: 'contact.phone2', label: 'Phone 2', defaultValue: '+234 707 524 2697', type: 'text' },
  { key: 'contact.email', label: 'Email', defaultValue: 'sales@cemix-nigeria.com', type: 'text' },
  { key: 'contact.hoursWeekday', label: 'Hours Weekday', defaultValue: 'Mon-Fri: 8:00 AM - 5:00 PM', type: 'text' },
  { key: 'contact.hoursSaturday', label: 'Hours Saturday', defaultValue: 'Sat: 8:00 AM - 2:00 PM', type: 'text' },
  { key: 'socials.facebook', label: 'Facebook URL', defaultValue: 'https://www.facebook.com/share/1AG4xJMGrP/?mibextid=wwXIfr', type: 'text' },
  { key: 'socials.instagram', label: 'Instagram URL', defaultValue: 'https://www.instagram.com/cemixnigeria?igsh=ODlzcWY0eXV4dnJv', type: 'text' },
  { key: 'socials.whatsapp', label: 'WhatsApp Number', defaultValue: '+2347080398040', type: 'text' },
  { key: 'socials.tiktok', label: 'TikTok URL', defaultValue: 'https://www.tiktok.com/@cemixnigeria?_r=1&_t=ZS-93tj0ovoijx', type: 'text' },
];

export default function SiteContentEditor() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const settings = await getAllSiteSettings();

    const initialValues: Record<string, string> = {};
    SITE_CONTENT_FIELDS.forEach(field => {
      initialValues[field.key] = settings[field.key] || field.defaultValue;
    });

    setValues(initialValues);
    setLoading(false);
  };

  const handleChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const promises = Object.entries(values).map(([key, value]) =>
        upsertSiteSetting(key, value)
      );

      const results = await Promise.all(promises);
      const allSucceeded = results.every(r => r === true);

      if (allSucceeded) {
        setMessage({ type: 'success', text: 'Site content saved successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Some settings failed to save. Please try again.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading site content...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Site Content</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        {(() => {
          const sections: Record<string, typeof SITE_CONTENT_FIELDS> = {};
          SITE_CONTENT_FIELDS.forEach(field => {
            const section = field.section || 'General';
            if (!sections[section]) {
              sections[section] = [];
            }
            sections[section].push(field);
          });

          return Object.entries(sections).map(([sectionName, fields]) => (
            <div key={sectionName} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {sectionName}
              </h3>
              <div className="grid gap-6">
                {fields.map(field => (
                  <div key={field.key}>
                    <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.key}
                        value={values[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : field.type === 'textarea-large' ? (
                      <textarea
                        id={field.key}
                        value={values[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <input
                        id={field.key}
                        type="text"
                        value={values[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ));
        })()}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
