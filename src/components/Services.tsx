import { Settings, PackageCheck, Headphones, Truck } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <PackageCheck size={40} />,
      title: 'Sales & Trading',
      description: 'Wide range of air compressors and pneumatic equipment from leading brands including Boge, Abac, and Pneumax.'
    },
    {
      icon: <Settings size={40} />,
      title: 'Installation',
      description: 'Professional installation services ensuring optimal performance and efficiency of your compressed air systems.'
    },
    {
      icon: <Headphones size={40} />,
      title: 'Maintenance & Repair',
      description: 'Comprehensive maintenance programs and expert repair services to keep your equipment running at peak performance.'
    },
    {
      icon: <Truck size={40} />,
      title: 'Parts Supply',
      description: 'Genuine spare parts and accessories readily available for all brands we distribute across West Africa.'
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete compressed air solutions from sales to after-sales support
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="w-16 h-16 bg-brand-100 rounded-lg flex items-center justify-center mb-4 text-brand-500">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-brand-500 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need Expert Advice?</h3>
          <p className="text-lg mb-6 opacity-90">
            Our team of certified technicians is ready to help you choose the right compressed air solution for your needs.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-brand-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}
