console.log('🚀 App.tsx loaded - App start');

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import PublicApp from './PublicApp';
import AdminApp from './AdminApp';

function AppRouter() {
  console.log('✅ AppRouter rendering');
  const location = useLocation();
  console.log('📍 Current route:', location.pathname);

  const isAdminRoute = location.pathname.startsWith('/admin');
  console.log('🔍 Is admin route:', isAdminRoute);

  if (isAdminRoute) {
    console.log('🔀 Rendering AdminApp');
    return <AdminApp />;
  }

  console.log('🔀 Rendering PublicApp');
  return <PublicApp />;
}

function App() {
  console.log('✅ App component rendering');
  console.log('✅ Router mounted');

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen">
          <Routes>
            <Route path="/*" element={<AppRouter />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
