import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { WhatsAppIcon, TikTokIcon } from './SocialIcons';
import { useState, FormEvent } from 'react';
import { useSiteSettings } from '../contexts/SiteContext';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function Contact() {
  const { settings } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-17951423833/BqBuCNKxjvwbENn68-9C'
          });
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for inquiries, quotes, or service requests
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
            <div className="space-y-6">
              <div id="location" className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-brand-500" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                  <a
                    href="https://maps.app.goo.gl/Pnr5vzysMZ1Avkte6?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-500 hover:text-brand-600 underline"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-brand-500" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">{settings['contact.phone1'] || '+234 708 039 8040'}</p>
                  <p className="text-gray-600">{settings['contact.phone2'] || '+234 707 524 2697'}</p>
                  <p className="text-sm text-gray-500 mt-1">{settings['contact.hoursWeekday'] || 'Mon-Fri: 8:00 AM - 5:00 PM'}</p>
                  <p className="text-sm text-gray-500">{settings['contact.hoursSaturday'] || 'Sat: 8:00 AM - 2:00 PM'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-brand-500" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">{settings['contact.email'] || 'sales@cemix-nigeria.com'}</p>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Follow Us</h4>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.facebook.com/share/1AG4xJMGrP/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center hover:bg-brand-200 transition"
                    title="Facebook"
                  >
                    <Facebook className="text-brand-500" size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com/cemixnigeria?igsh=ODlzcWY0eXV4dnJv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center hover:bg-brand-200 transition"
                    title="Instagram"
                  >
                    <Instagram className="text-brand-500" size={24} />
                  </a>
                  <a
                    href="https://wa.me/2347080398040"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center hover:bg-brand-200 transition"
                    title="WhatsApp 1"
                  >
                    <WhatsAppIcon size={24} />
                  </a>
                  <a
                    href="https://wa.me/2347075242697"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center hover:bg-brand-200 transition"
                    title="WhatsApp 2"
                  >
                    <WhatsAppIcon size={24} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@cemixnigeria?_r=1&_t=ZS-93tj0ovoijx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center hover:bg-brand-200 transition"
                    title="TikTok"
                  >
                    <TikTokIcon size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition"
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition resize-none"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg">
                  Failed to send message. Please try again or email us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
