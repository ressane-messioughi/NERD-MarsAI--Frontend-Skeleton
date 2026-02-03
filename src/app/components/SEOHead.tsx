import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext.js';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export function SEOHead({
  title,
  description,
  keywords,
  ogType = 'website',
  ogImage = 'https://marsai-festival.com/og-image.jpg',
  canonicalUrl,
  noindex = false
}: SEOHeadProps) {
  const { language } = useLanguage();

  useEffect(() => {
    // Set page title
    if (title) {
      document.title = title;
    }

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    } else if (description) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
      metaKeywords.setAttribute('content', keywords);
    } else if (keywords) {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords;
      document.head.appendChild(meta);
    }

    // Set language
    document.documentElement.lang = language;

    // Set Open Graph meta tags
    const setOGMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    if (title) setOGMeta('og:title', title);
    if (description) setOGMeta('og:description', description);
    setOGMeta('og:type', ogType);
    setOGMeta('og:image', ogImage);
    setOGMeta('og:locale', language === 'fr' ? 'fr_FR' : 'en_US');

    // Set Twitter Card meta tags
    const setTwitterMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    setTwitterMeta('twitter:card', 'summary_large_image');
    if (title) setTwitterMeta('twitter:title', title);
    if (description) setTwitterMeta('twitter:description', description);
    setTwitterMeta('twitter:image', ogImage);

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalUrl) {
      if (canonical) {
        canonical.href = canonicalUrl;
      } else {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = canonicalUrl;
        document.head.appendChild(canonical);
      }
    }

    // Set robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'noindex, nofollow');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
      }
    } else if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow');
    }

    // Set viewport (already in index.html but ensure it's correct)
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(meta);
    }

    // Set theme color
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', '#0A0E1A');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = '#0A0E1A';
      document.head.appendChild(meta);
    }

  }, [title, description, keywords, language, ogType, ogImage, canonicalUrl, noindex]);

  return null;
}

// SEO data per page
export const seoData = {
  fr: {
    home: {
      title: 'marsAI 2026 - Festival International de Courts-Métrages IA | Marseille',
      description: 'Premier festival international de courts-métrages générés par IA. 12-13 Juin 2026 à Marseille. 600 vidéos, 120 pays, prix de 50 000$. Soumettez votre film IA dès maintenant.',
      keywords: 'marsAI, festival IA, courts-métrages IA, intelligence artificielle, cinéma IA, Marseille 2026, film IA, vidéo IA, compétition IA, prix 50000',
      canonicalUrl: 'https://marsai-festival.com/'
    },
    submit: {
      title: 'Soumettre un Film | marsAI 2026 Festival',
      description: 'Soumettez votre court-métrage généré par IA au marsAI Festival 2026. Formulaire en 5 étapes. Prix de 50 000$ pour le lauréat. Date limite : 31 Mai 2026.',
      keywords: 'soumettre film IA, soumission court-métrage, concours IA, marsAI soumission, film IA 2026, compétition vidéo IA',
      canonicalUrl: 'https://marsai-festival.com/submit'
    },
    events: {
      title: 'Inscription aux Événements | marsAI 2026 Festival',
      description: 'Inscrivez-vous aux événements marsAI 2026 : concours de films, masterclass IA, conférences, soirée de clôture. 12-13 Juin à Marseille. 3000 visiteurs attendus.',
      keywords: 'événements marsAI, inscription festival, masterclass IA, conférences IA, soirée marsAI, Marseille 2026',
      canonicalUrl: 'https://marsai-festival.com/events'
    },
    login: {
      title: 'Connexion | marsAI 2026 Festival',
      description: 'Connectez-vous à votre espace personnel marsAI pour réserver vos places aux événements du festival international de courts-métrages IA.',
      keywords: 'connexion marsAI, login festival, espace personnel, réservation événements',
      canonicalUrl: 'https://marsai-festival.com/login'
    },
    about: {
      title: 'À Propos | marsAI 2026 Festival',
      description: 'Découvrez marsAI, le premier festival international de courts-métrages générés par IA. Notre mission, notre équipe, notre vision du futur du cinéma IA.',
      keywords: 'à propos marsAI, festival IA Marseille, équipe marsAI, mission festival IA, cinéma IA',
      canonicalUrl: 'https://marsai-festival.com/about'
    },
    admin: {
      title: 'Dashboard Admin | marsAI 2026',
      description: 'Tableau de bord administrateur marsAI 2026 - Gestion des soumissions, statistiques, événements.',
      keywords: '',
      canonicalUrl: 'https://marsai-festival.com/admin'
    },
    superAdmin: {
      title: 'Super Admin CMS | marsAI Platform',
      description: 'Système de gestion multi-festival marsAI - Gestion centralisée des festivals internationaux.',
      keywords: '',
      canonicalUrl: 'https://marsai-festival.com/super-admin'
    },
    jury: {
      title: 'Interface Jury | marsAI 2026',
      description: 'Interface d\'évaluation jury marsAI 2026 - Système Rule of 3 pour l\'évaluation des films.',
      keywords: '',
      canonicalUrl: 'https://marsai-festival.com/jury'
    },
    notFound: {
      title: 'Page Non Trouvée | marsAI 2026',
      description: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
      keywords: '',
      canonicalUrl: ''
    }
  },
  en: {
    home: {
      title: 'marsAI 2026 - International AI Short Film Festival | Marseille',
      description: 'First international AI-generated short film festival. June 12-13, 2026 in Marseille. 600 videos, 120 countries, $50,000 prize. Submit your AI film now.',
      keywords: 'marsAI, AI festival, AI short films, artificial intelligence, AI cinema, Marseille 2026, AI film, AI video, AI competition, 50000 prize',
      canonicalUrl: 'https://marsai-festival.com/en/'
    },
    submit: {
      title: 'Submit a Film | marsAI 2026 Festival',
      description: 'Submit your AI-generated short film to marsAI Festival 2026. 5-step form. $50,000 prize for the winner. Deadline: May 31, 2026.',
      keywords: 'submit AI film, short film submission, AI competition, marsAI submission, AI film 2026, AI video competition',
      canonicalUrl: 'https://marsai-festival.com/en/submit'
    },
    events: {
      title: 'Event Registration | marsAI 2026 Festival',
      description: 'Register for marsAI 2026 events: film contest, AI masterclass, conferences, closing ceremony. June 12-13 in Marseille. 3000 expected visitors.',
      keywords: 'marsAI events, festival registration, AI masterclass, AI conferences, marsAI night, Marseille 2026',
      canonicalUrl: 'https://marsai-festival.com/en/events'
    },
    login: {
      title: 'Login | marsAI 2026 Festival',
      description: 'Login to your marsAI personal space to book your seats for the international AI short film festival events.',
      keywords: 'marsAI login, festival login, personal space, event booking',
      canonicalUrl: 'https://marsai-festival.com/en/login'
    },
    about: {
      title: 'About | marsAI 2026 Festival',
      description: 'Discover marsAI, the first international AI-generated short film festival. Our mission, our team, our vision for the future of AI cinema.',
      keywords: 'about marsAI, AI festival Marseille, marsAI team, AI festival mission, AI cinema',
      canonicalUrl: 'https://marsai-festival.com/en/about'
    },
    admin: {
      title: 'Admin Dashboard | marsAI 2026',
      description: 'marsAI 2026 admin dashboard - Manage submissions, statistics, events.',
      keywords: '',
      canonicalUrl: 'https://marsai-festival.com/en/admin'
    },
    superAdmin: {
      title: 'Super Admin CMS | marsAI Platform',
      description: 'marsAI multi-festival management system - Centralized management of international festivals.',
      keywords: '',
      canonicalUrl: 'https://marsai-festival.com/en/super-admin'
    },
    jury: {
      title: 'Jury Interface | marsAI 2026',
      description: 'marsAI 2026 jury evaluation interface - Rule of 3 system for film evaluation.',
      keywords: '',
      canonicalUrl: 'https://marsai-festival.com/en/jury'
    },
    notFound: {
      title: 'Page Not Found | marsAI 2026',
      description: 'The page you are looking for does not exist or has been moved.',
      keywords: '',
      canonicalUrl: ''
    }
  }
};
