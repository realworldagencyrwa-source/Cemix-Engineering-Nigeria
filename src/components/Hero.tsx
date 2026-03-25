import { Wind, Award, Wrench, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSiteSettings } from '../contexts/SiteContext';

export default function Hero() {
  const { settings } = useSiteSettings();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ top: 0, left: 0, alignRight: false });
  const brand1Ref = useRef<HTMLDivElement>(null);
  const brand2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!previewImage) return;

    const updatePosition = () => {
      const targetRef = previewImage === '/assets/brand-1.jpg' ? brand1Ref : brand2Ref;
      if (!targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      const previewWidth = 520;
      const padding = 16;
      const viewportWidth = window.innerWidth;

      let left = rect.right + padding;
      let alignRight = false;

      if (left + previewWidth > viewportWidth - padding) {
        left = rect.left - previewWidth - padding;
        alignRight = true;
      }

      if (left < padding) {
        left = padding;
        alignRight = false;
      }

      setPreviewPosition({
        top: rect.top,
        left: Math.max(padding, Math.min(left, viewportWidth - previewWidth - padding)),
        alignRight
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [previewImage]);

  return (
    <section id="home" className="pt-24 pb-16" style={{ backgroundColor: '#2C8FC4' }}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {settings['hero.title'] || 'Your Trusted Partner for Compressed Air Solutions'}
          </h1>
          <p className="text-xl md:text-1xl text-gray-900 mb-8 font-bold">
            {settings['hero.subtitle'] || 'Authorized distributor of BOGE, ABAC, and Bestrand. Powering Nigeria and West Africa with high-performance compressed air systems.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-500 text-white px-8 py-3 rounded-lg hover:bg-brand-600 transition font-semibold"
            >
              {settings['hero.primaryButtonText'] || 'Browse Products'}
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-brand-500 px-8 py-3 rounded-lg hover:bg-gray-50 transition font-semibold border-2 border-brand-500"
            >
              {settings['hero.secondaryButtonText'] || 'Contact Us'}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all overflow-visible">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Brands</h3>

            <div className="flex justify-center items-center gap-6 pt-2">
              <div
                ref={brand1Ref}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white shadow-sm border border-gray-300 flex items-center justify-center p-3 cursor-pointer hover:shadow-lg transition-shadow"
                onMouseEnter={() => setPreviewImage('/assets/brand-1.jpg')}
                onMouseLeave={() => setPreviewImage(null)}
                onClick={() => setPreviewImage(previewImage === '/assets/brand-1.jpg' ? null : '/assets/brand-1.jpg')}
              >
                <img
                  src="/assets/brand-1.jpg"
                  alt="Brand 1"
                  className="w-full h-full object-contain"
                />
              </div>

              <div
                ref={brand2Ref}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white shadow-sm border border-gray-300 flex items-center justify-center p-3 cursor-pointer hover:shadow-lg transition-shadow"
                onMouseEnter={() => setPreviewImage('/assets/brand-2.jpg')}
                onMouseLeave={() => setPreviewImage(null)}
                onClick={() => setPreviewImage(previewImage === '/assets/brand-2.jpg' ? null : '/assets/brand-2.jpg')}
              >
                <img
                  src="/assets/brand-2.jpg"
                  alt="Brand 2"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu hover:-translate-y-4 hover:scale-[1.03] hover:shadow-2xl">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-brand-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Authorized Distributor</h3>
            <p className="text-gray-600">Official partner for BOGE, ABAC, and Bestrand in Nigeria and West Africa</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu hover:-translate-y-4 hover:scale-[1.03] hover:shadow-2xl">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wind className="text-brand-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Products</h3>
            <p className="text-gray-600">Premium air compressors and fittings from leading European manufacturers</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu hover:-translate-y-4 hover:scale-[1.03] hover:shadow-2xl">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="text-brand-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Service</h3>
            <p className="text-gray-600">Professional installation, maintenance, and repair services</p>
          </div>
        </div>
      </div>

      {previewImage && createPortal(
        <div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            top: 0,
            left: 0,
          }}
        >
          <div
            className="absolute pointer-events-auto opacity-0 scale-95 translate-y-4"
            style={{
              top: `${previewPosition.top}px`,
              left: `${previewPosition.left}px`,
              animation: 'materialize 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
              filter: 'blur(8px)',
            }}
          >
            <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-3 relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewImage(null);
                }}
                className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full p-1.5 hover:bg-gray-700 transition-colors lg:hidden z-10"
                aria-label="Close preview"
              >
                <X size={16} />
              </button>
              <img
                src={previewImage}
                alt="Brand Preview"
                className="w-[520px] max-w-[85vw] h-auto rounded-lg"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
