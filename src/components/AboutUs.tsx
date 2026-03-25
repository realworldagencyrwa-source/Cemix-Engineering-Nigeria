import { useState } from 'react';
import { useSiteSettings } from '../contexts/SiteContext';
import { Play } from 'lucide-react';

export default function AboutUs() {
  const { settings } = useSiteSettings();
  const [showVideo, setShowVideo] = useState(false);

  const title = settings['aboutUs.title'] || 'About Us';
  const subtitle = settings['aboutUs.subtitle'] || '';
  const body = settings['aboutUs.body'] || '';
  const imageUrl = settings['aboutUs.imageUrl'] || '';
  const videoUrl = settings['aboutUs.videoUrl'] || '';
  const ctaText = settings['aboutUs.ctaText'] || 'Contact Us';
  const ctaLink = settings['aboutUs.ctaLink'] || '#contact';

  const hasImage = imageUrl && imageUrl.trim() !== '';
  const hasVideo = videoUrl && videoUrl.trim() !== '';

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaLink.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(ctaLink);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {body}
                </p>
              </div>

              {ctaText && (
                <div className="pt-4">
                  <a
                    href={ctaLink}
                    onClick={handleCtaClick}
                    className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    {ctaText}
                  </a>
                </div>
              )}
            </div>

            <div className="relative">
              {hasVideo ? (
                <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  {!showVideo ? (
                    <div
                      className="relative cursor-pointer group"
                      onClick={() => setShowVideo(true)}
                    >
                      <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                          <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                            <Play size={32} className="text-green-600 ml-1" />
                          </div>
                        </div>
                        {hasImage && (
                          <img
                            src={imageUrl}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded">
                        Click to play video
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video">
                      <video
                        src={videoUrl}
                        controls
                        autoPlay
                        className="w-full h-full"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              ) : hasImage ? (
                <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
