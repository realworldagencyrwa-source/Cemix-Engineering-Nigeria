import { Menu, X, Facebook, Instagram } from 'lucide-react';
import { useState } from 'react';
import { WhatsAppIcon, TikTokIcon } from './SocialIcons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src="/assets/files_7623097-2026-02-13T20-39-23-353Z-Screenshot_2026-02-13_222951.png"
              alt="Cemix Pro Nigeria Ltd"
              className="h-12 w-12 md:h-10 md:w-14 object-contain"
            />
            <div>
              <h1 className="text-1xl md:text-2xl font-bold text-gray-800">Cemix Pro Nigeria Ltd</h1>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6 items-center">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-brand-500 transition">Home</button>
            <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-brand-500 transition">Products</button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-brand-500 transition">Services</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-brand-500 transition">Contact</button>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/share/1AG4xJMGrP/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600 transition" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/cemixnigeria?igsh=ODlzcWY0eXV4dnJv" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600 transition" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/2347080398040" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600 transition" title="WhatsApp 1">
                <WhatsAppIcon size={20} />
              </a>
              <a href="https://wa.me/2347075242697" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600 transition" title="WhatsApp 2">
                <WhatsAppIcon size={20} />
              </a>
              <a href="https://www.tiktok.com/@cemixnigeria?_r=1&_t=ZS-93tj0ovoijx" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600 transition" title="TikTok">
                <TikTokIcon size={20} />
              </a>
            </div>
          </nav>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <button onClick={() => scrollToSection('home')} className="block text-gray-700 hover:text-brand-500 transition">Home</button>
            <button onClick={() => scrollToSection('products')} className="block text-gray-700 hover:text-brand-500 transition">Products</button>
            <button onClick={() => scrollToSection('services')} className="block text-gray-700 hover:text-brand-500 transition">Services</button>
            <button onClick={() => scrollToSection('contact')} className="block text-gray-700 hover:text-brand-500 transition">Contact</button>
            <div className="flex space-x-3 pt-2">
              <a href="https://www.facebook.com/share/1AG4xJMGrP/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600 transition" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/cemixnigeria?igsh=ODlzcWY0eXV4dnJv" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600 transition" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/2347080398040" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600 transition" title="WhatsApp 1">
                <WhatsAppIcon size={20} />
              </a>
              <a href="https://wa.me/2347075242697" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600 transition" title="WhatsApp 2">
                <WhatsAppIcon size={20} />
              </a>
              <a href="https://www.tiktok.com/@cemixnigeria?_r=1&_t=ZS-93tj0ovoijx" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600 transition" title="TikTok">
                <TikTokIcon size={20} />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
