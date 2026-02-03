import { useLanguage } from '../contexts/LanguageContext.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.js';
import { Badge } from '../components/ui/badge.js';
import { Check, Globe } from 'lucide-react';

/**
 * Composant de démonstration pour visualiser le système de traduction
 * Ce composant montre comment toutes les clés de traduction changent en temps réel
 */
export function LanguageDemo() {
  const { t, language } = useLanguage();

  const demoKeys = [
    // Navigation
    { category: 'Navigation', keys: ['nav.home', 'nav.admin', 'nav.submit', 'nav.jury', 'nav.gallery'] },
    // Common
    { category: 'Commun', keys: ['common.save', 'common.cancel', 'common.next', 'common.submit', 'common.loading'] },
    // Landing Page
    { category: 'Landing Page', keys: ['landing.title', 'landing.subtitle', 'landing.theme', 'landing.search.placeholder'] },
    // Admin
    { category: 'Admin', keys: ['admin.title', 'admin.stats.films', 'admin.stats.countries', 'admin.branding.title'] },
    // Submission
    { category: 'Soumission', keys: ['submit.title', 'submit.step1.title', 'submit.step2.title', 'submit.step3.title'] },
    // Jury
    { category: 'Jury', keys: ['jury.title', 'jury.video.title', 'jury.rating.title', 'jury.ai.title'] },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Globe className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Système de Traduction marsAI</h1>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Badge variant="outline" className="text-sm">
            {language === 'fr' ? 'Langue Actuelle' : 'Current Language'}: <strong className="ml-2">{language.toUpperCase()}</strong>
          </Badge>
          <Badge variant={language === 'fr' ? 'default' : 'secondary'} className="gap-1">
            {language === 'fr' && <Check className="w-3 h-3" />}
            Français
          </Badge>
          <Badge variant={language === 'en' ? 'default' : 'secondary'} className="gap-1">
            {language === 'en' && <Check className="w-3 h-3" />}
            English
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
          {language === 'fr' 
            ? 'Toutes les traductions ci-dessous changent automatiquement lorsque vous basculez la langue avec le bouton FR/EN dans la navbar.' 
            : 'All translations below change automatically when you toggle the language with the FR/EN button in the navbar.'}
        </p>
      </div>

      {/* Translation Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoKeys.map((section) => (
          <Card key={section.category} className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">{section.category}</CardTitle>
              <CardDescription className="text-xs">
                {section.keys.length} {language === 'fr' ? 'traductions' : 'translations'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {section.keys.map((key) => (
                <div key={key} className="flex flex-col gap-1 p-2 rounded bg-muted/30 border border-border/30">
                  <code className="text-xs text-muted-foreground font-mono">{key}</code>
                  <p className="text-sm text-foreground font-medium">{t(key)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Footer */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            {language === 'fr' ? 'Fonctionnalités Actives' : 'Active Features'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>
              {language === 'fr' 
                ? 'Persistance localStorage : La langue choisie est sauvegardée et restaurée au rechargement' 
                : 'localStorage Persistence: Chosen language is saved and restored on reload'}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>
              {language === 'fr' 
                ? 'Contexte React global : Toutes les pages utilisent le même état de langue' 
                : 'Global React Context: All pages use the same language state'}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>
              {language === 'fr' 
                ? 'Bouton FR/EN dans toutes les Navbar : Disponible sur chaque page' 
                : 'FR/EN Button in all Navbars: Available on every page'}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>
              {language === 'fr' 
                ? 'Attribut HTML lang mis à jour automatiquement pour l\'accessibilité' 
                : 'HTML lang attribute automatically updated for accessibility'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
