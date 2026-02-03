import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext.js';

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-[#2A3142] bg-[#1A1F2E] mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo + Tagline */}
          <div className="space-y-3">
            {/* Mini Logo SVG */}
            <svg
              width="120"
              height="32"
              viewBox="0 0 120 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Water waves */}
              <path d="M2 26 Q4 24 6 26 T10 26 T14 26" stroke="#10B981" strokeWidth="1" fill="none" opacity="0.5" />
              
              {/* Neural nodes */}
              <circle cx="6" cy="22" r="1" fill="#10B981" opacity="0.6" />
              <circle cx="8" cy="18" r="1.5" fill="#7C3AED" opacity="0.7" />
              <circle cx="10" cy="22" r="1" fill="#10B981" opacity="0.6" />
              
              {/* Connections */}
              <line x1="6" y1="22" x2="8" y2="18" stroke="#7C3AED" strokeWidth="0.5" opacity="0.3" />
              <line x1="8" y1="18" x2="10" y2="22" stroke="#7C3AED" strokeWidth="0.5" opacity="0.3" />
              
              {/* Basilica icon */}
              <g transform="translate(4, 6)">
                <rect x="4" y="8" width="6" height="4" fill="#7C3AED" opacity="0.6" />
                <rect x="5.5" y="5" width="3" height="3" fill="#7C3AED" opacity="0.7" />
                <circle cx="7" cy="3.5" r="0.8" fill="#10B981" opacity="0.8" />
              </g>
              
              {/* Text */}
              <text x="20" y="12" fill="#9CA3AF" fontSize="6" fontFamily="Inter, sans-serif" fontWeight="500" letterSpacing="0.5">FESTIVAL</text>
              <text x="20" y="24" fill="#7C3AED" fontSize="14" fontFamily="Inter, sans-serif" fontWeight="700">mars<tspan fill="#10B981">AI</tspan></text>
            </svg>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-card-foreground">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.submit')}
                </Link>
              </li>
              <li>
                <Link to="/jury" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.jury')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.about') || (language === 'fr' ? 'À Propos' : 'About')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-card-foreground">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.legal.notice')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.gdpr')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-card-foreground">
              {t('footer.contact') || (language === 'fr' ? 'Contact' : 'Contact')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@marsai.fr" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  contact@marsai.fr
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Marseille, France
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} marsAI. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}