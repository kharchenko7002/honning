import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

// Shared page layout: Header on top, page content in <main>, Footer at the bottom.
// Also scrolls to top on every route change so each page starts at the top.
export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      {/* Skip link — visible only when focused, lets keyboard users jump past the nav. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50
                   focus:rounded-xl focus:bg-honey-500 focus:px-4 focus:py-2 focus:font-medium
                   focus:text-wax-900 focus:shadow-md"
      >
        Hopp til innhold
      </a>
      <Header />
      <main id="main" tabIndex="-1" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
