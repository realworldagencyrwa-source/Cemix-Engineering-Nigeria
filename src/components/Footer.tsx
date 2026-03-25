export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/assets/files_7623097-2026-02-13T20-39-23-353Z-Screenshot_2026-02-13_222951.png"
                alt="Cemix Pro Nigeria Ltd"
                className="h-16 w-16 object-contain"
              />
              <div>
                <h3 className="text-2xl font-bold">Cemix Pro Nigeria Ltd</h3>
                <p className="text-base text-gray-400"></p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 font-bold text-base">
              Authorized distributor of BOGE, ABAC, and Bestrand. Powering Nigeria and West Africa with high-performance compressed air systems.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-brand-400 transition">Home</button></li>
              <li><button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-brand-400 transition">Products</button></li>
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-brand-400 transition">Services</button></li>
              <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-brand-400 transition">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Our Brands</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">BOGE Compressors</li>
              <li className="text-gray-400">ABAC Compressors</li>
              <li className="text-gray-400">Bestrand</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Cemix Pro Nigeria Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
