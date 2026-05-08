import { NavLink } from 'react-router-dom';

// Footer with three columns: brand, navigation, contact info.
export default function Footer() {
  const year = new Date().getFullYear();

  // Highlight the current page in the footer nav too — small cue, helps orientation.
  const footerLinkClass = ({ isActive }) =>
    isActive ? 'font-semibold text-honey-900 underline' : 'hover:text-honey-900';

  return (
    <footer className="mt-16 border-t border-cream-100 bg-cream-100 text-wax-900">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        {/* Brand column */}
        <div>
          <p className="font-serif text-xl font-bold">Solhaug Honninggård</p>
          <p className="mt-2 max-w-prose text-sm text-wax-800">
            Lokal honning fra Innlandet. Vi steller bikubene selv og høster
            kun det biene kan unnvære.
          </p>
        </div>

        {/* Navigation column */}
        <nav aria-label="Sider i bunnen">
          <p className="font-medium">Sider</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><NavLink to="/" end className={footerLinkClass}>Hjem</NavLink></li>
            <li><NavLink to="/honning" className={footerLinkClass}>Honning</NavLink></li>
            <li><NavLink to="/om-oss" className={footerLinkClass}>Om oss</NavLink></li>
            <li><NavLink to="/hvor-finner-du-oss" className={footerLinkClass}>Hvor finner du oss</NavLink></li>
            <li><NavLink to="/kontakt" className={footerLinkClass}>Kontakt</NavLink></li>
          </ul>
        </nav>

        {/* Contact column */}
        <address className="not-italic">
          <p className="font-medium">Kontakt</p>
          <ul className="mt-2 space-y-1 text-sm text-wax-800">
            <li>Solhaugvegen 12, 2670 Innlandet</li>
            <li>
              <a href="tel:+4790000000" className="hover:text-honey-900">
                +47 900 00 000
              </a>
            </li>
            <li>
              <a href="mailto:post@solhaug-honning.no" className="hover:text-honey-900">
                post@solhaug-honning.no
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-cream-200">
        <p className="container-page py-4 text-center text-xs text-wax-800">
          © {year} Solhaug Honninggård. Et fiktivt skoleprosjekt.
        </p>
      </div>
    </footer>
  );
}
