import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Navigation items — kept in one array so desktop and mobile share the same source.
const navLinks = [
  { to: '/', label: 'Hjem', end: true },
  { to: '/honning', label: 'Honning' },
  { to: '/om-oss', label: 'Om oss' },
  { to: '/hvor-finner-du-oss', label: 'Hvor finner du oss' },
  { to: '/kontakt', label: 'Kontakt' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Active vs idle classes used by NavLink
  const linkClass = ({ isActive }) =>
    [
      'rounded-xl px-3 py-2 text-sm font-medium transition',
      isActive
        ? 'bg-honey-500 text-wax-900'
        : 'text-wax-800 hover:bg-cream-100 hover:text-wax-900',
    ].join(' ');

  return (
    <header className="sticky top-0 z-40 border-b border-cream-100 bg-cream-50/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        {/* Brand / logo */}
        <NavLink to="/" className="flex items-center gap-2" aria-label="Solhaug Honninggård — gå til forsiden">
          <span aria-hidden="true" className="text-2xl">🍯</span>
          <span className="font-serif text-lg font-bold text-wax-900 sm:text-xl">
            Solhaug Honninggård
          </span>
        </NavLink>

        {/* Desktop navigation */}
        <nav aria-label="Hovedmeny" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="rounded-xl p-2 text-wax-900 hover:bg-cream-100 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Lukk meny' : 'Åpne meny'}
          onClick={() => setOpen((value) => !value)}
        >
          {/* Inline SVG icon — no icon library */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobilmeny"
          className="border-t border-cream-100 bg-cream-50 md:hidden"
        >
          <ul className="container-page flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
