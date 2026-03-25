console.log('✅ AdminApp.tsx loaded');

import { useLocation } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

export default function AdminApp() {
  console.log('✅ AdminApp component rendering');
  const location = useLocation();
  console.log('📍 Admin route:', location.pathname);

  // Show AdminPanel for /admin/panel route
  if (location.pathname === '/admin/panel') {
    console.log('🔀 Rendering AdminPanel');
    return <AdminPanel />;
  }

  // Show AdminLogin for /admin or any other /admin/* route
  if (location.pathname.startsWith('/admin')) {
    console.log('🔀 Rendering AdminLogin');
    return <AdminLogin />;
  }

  // Fallback (should not happen with current routing)
  console.log('🔀 Rendering AdminLogin (fallback)');
  return <AdminLogin />;
}
