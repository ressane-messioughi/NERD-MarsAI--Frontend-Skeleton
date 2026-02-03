import { MarsAILogo } from '../components/MarsAILogo.js';

/**
 * Composant de démonstration du logo Festival MarsAI
 * Affiche toutes les variantes et utilisations possibles
 */
export function LogoShowcase() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            Logo Festival MarsAI
          </h1>
          <p className="text-muted-foreground">
            Toutes les versions et variantes du logo
          </p>
        </div>

        {/* Logo Complet - Version Interactive */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            1. Logo Complet (Composant React)
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center">
            <MarsAILogo />
          </div>
          <div className="text-sm text-muted-foreground">
            <strong>Usage :</strong> Navbar, headers  
            <strong className="ml-4">Fichier :</strong> <code>/src/app/components/MarsAILogo.tsx</code>
          </div>
        </section>

        {/* Logo Complet - Version SVG Statique */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            2. Logo Complet (SVG Statique)
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center">
            <img 
              src="/logo-marsai.svg" 
              alt="Festival MarsAI Logo" 
              width="180" 
              height="48"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <strong>Usage :</strong> Email, documents, exports  
            <strong className="ml-4">Fichier :</strong> <code>/public/logo-marsai.svg</code>
          </div>
        </section>

        {/* Icône Seule */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            3. Icône Seule (48×48px)
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center">
            <img 
              src="/logo-marsai-icon-only.svg" 
              alt="marsAI Icon" 
              width="48" 
              height="48"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <strong>Usage :</strong> Favicon, app icon, réseaux sociaux  
            <strong className="ml-4">Fichier :</strong> <code>/public/logo-marsai-icon-only.svg</code>
          </div>
        </section>

        {/* Tailles Multiples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            4. Différentes Tailles (Scalabilité)
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            {/* Grande */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-20">Grande</span>
              <img 
                src="/logo-marsai.svg" 
                alt="Logo Large" 
                width="240" 
                height="64"
                className="border border-border/30 rounded p-2"
              />
            </div>
            
            {/* Normale */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-20">Normale</span>
              <img 
                src="/logo-marsai.svg" 
                alt="Logo Normal" 
                width="180" 
                height="48"
                className="border border-border/30 rounded p-2"
              />
            </div>
            
            {/* Petite */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-20">Petite</span>
              <img 
                src="/logo-marsai.svg" 
                alt="Logo Small" 
                width="120" 
                height="32"
                className="border border-border/30 rounded p-2"
              />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Le logo SVG est <strong>vectoriel</strong> et s'adapte à toutes les tailles sans perte de qualité
          </div>
        </section>

        {/* Palette de Couleurs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            5. Palette de Couleurs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Violet Profond */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-2">
              <div 
                className="w-full h-20 rounded" 
                style={{ backgroundColor: '#7C3AED' }}
              />
              <div className="text-sm">
                <div className="font-medium text-foreground">Violet Profond</div>
                <div className="text-muted-foreground font-mono">#7C3AED</div>
              </div>
            </div>

            {/* Vert Émeraude */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-2">
              <div 
                className="w-full h-20 rounded" 
                style={{ backgroundColor: '#10B981' }}
              />
              <div className="text-sm">
                <div className="font-medium text-foreground">Vert Émeraude</div>
                <div className="text-muted-foreground font-mono">#10B981</div>
              </div>
            </div>

            {/* Gris Moyen */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-2">
              <div 
                className="w-full h-20 rounded" 
                style={{ backgroundColor: '#9CA3AF' }}
              />
              <div className="text-sm">
                <div className="font-medium text-foreground">Gris Moyen</div>
                <div className="text-muted-foreground font-mono">#9CA3AF</div>
              </div>
            </div>

            {/* Gris Foncé */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-2">
              <div 
                className="w-full h-20 rounded" 
                style={{ backgroundColor: '#6B7280' }}
              />
              <div className="text-sm">
                <div className="font-medium text-foreground">Gris Foncé</div>
                <div className="text-muted-foreground font-mono">#6B7280</div>
              </div>
            </div>
          </div>
        </section>

        {/* Symbolisme */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            6. Symbolisme du Logo
          </h2>
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏛️</span>
                  <span className="font-medium text-foreground">Notre-Dame de la Garde</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Patrimoine marseillais, identité locale, protectrice de la ville
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌊</span>
                  <span className="font-medium text-foreground">Eau Méditerranéenne</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Marseille, innovation maritime, flux créatif
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧠</span>
                  <span className="font-medium text-foreground">Réseaux Neuronaux</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Intelligence Artificielle, connexions, innovation technologique
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  <span className="font-medium text-foreground">Gradient Vert → Violet</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Fusion de la nature et de la technologie, transformation créative
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <div className="text-center space-y-2 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Logo créé pour <strong className="text-primary">Festival MarsAI</strong> - Marseille 2026
          </p>
          <p className="text-xs text-muted-foreground">
            Version 1.0 - Production Ready | SVG Vectoriel | WCAG 2.1 AA Compliant
          </p>
        </div>
      </div>
    </div>
  );
}
