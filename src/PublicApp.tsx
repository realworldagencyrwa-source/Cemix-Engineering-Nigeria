console.log('✅ PublicApp.tsx loaded');

import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SiteProvider } from './contexts/SiteContext';

export default function PublicApp() {
  console.log('✅ PublicApp component rendering');
  console.log('✅ Public providers mounted');
  return (
    <SiteProvider>
      <Header />
      <Hero />
      <AboutUs />
      <Products />
      <Services />
      <Contact />
      <Footer />
    </SiteProvider>
  );
}
