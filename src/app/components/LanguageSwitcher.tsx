import { useLanguage } from '../contexts/LanguageContext.js';
import { Button } from '../components/ui/button.js';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-card border border-border rounded-full p-1">
      <Button
        variant={language === 'fr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('fr')}
        className={`rounded-full transition-all duration-300 ${
          language === 'fr'
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30'
            : 'hover:bg-muted'
        }`}
      >
        <Globe className="w-4 h-4 mr-1" />
        FR
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`rounded-full transition-all duration-300 ${
          language === 'en'
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30'
            : 'hover:bg-muted'
        }`}
      >
        <Globe className="w-4 h-4 mr-1" />
        EN
      </Button>
    </div>
  );
}
