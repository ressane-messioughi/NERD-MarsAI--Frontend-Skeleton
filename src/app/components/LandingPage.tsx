import { useState } from 'react';
import { Film, Search, Upload, Play, X, Filter, SlidersHorizontal, Users, Video, Award, Trophy, Calendar, Presentation, PartyPopper, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button.js';
import { Input } from './ui/input.js';
import { Card, CardContent } from './ui/card.js';
import { Badge } from './ui/badge.js';
import { Checkbox } from './ui/checkbox.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.js';
import { useLanguage } from '../contexts/LanguageContext.js';
import { LandingPageNavbar } from './LandingPageNavbar.js';
import { Footer } from './Footer.js';
import { CountdownTimer } from './CountdownTimer.js';
import { SEOHead, seoData } from './SEOHead.js';
import { Link } from 'react-router-dom';
import { mockFilms } from '../data/mockFilms.js';

const FILMS_PER_PAGE = 20;

export function LandingPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAITools, setSelectedAITools] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOfficialOnly, setShowOfficialOnly] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<typeof mockFilms[0] | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredFilms = mockFilms.filter(film => {
    if (searchQuery && !film.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !film.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !film.director.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedAITools.length > 0 && !selectedAITools.some(tool => film.aiTools.includes(tool))) {
      return false;
    }
    if (selectedCountries.length > 0 && !selectedCountries.includes(film.country)) {
      return false;
    }
    if (selectedCategory !== 'all' && film.category !== selectedCategory) {
      return false;
    }
    if (showOfficialOnly && !film.officialSelection) {
      return false;
    }
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredFilms.length / FILMS_PER_PAGE);
  const startIndex = (currentPage - 1) * FILMS_PER_PAGE;
  const endIndex = startIndex + FILMS_PER_PAGE;
  const paginatedFilms = filteredFilms.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const resetPagination = () => {
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedAITools([]);
    setSelectedCountries([]);
    setSelectedCategory('all');
    setShowOfficialOnly(false);
    setSearchQuery('');
    resetPagination();
  };

  const seo = seoData[language as 'fr' | 'en'].home;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        ogType="website"
      />
      <LandingPageNavbar />

      {/* Hero Section - 60vh with Futuristic Marseille Background */}
      <section className="relative min-h-[70vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden mt-[60px]">
        {/* Futuristic Marseille Night Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Responsive Background Image - Cinematic Marseille at Night */}
          <img
            src="https://images.unsplash.com/photo-1573590393083-6208c9dc5d31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJzZWlsbGUlMjBuaWdodCUyMGZ1dHVyaXN0aWMlMjBjaXR5JTIwbGlnaHRzfGVufDF8fHx8MTc2ODUyNzI4M3ww&ixlib=rb-4.1.0&q=80&w=1920"
            alt="Marseille Futuristic Night"
            className="w-full h-full object-cover object-center"
          />
          
          {/* Futuristic Color Overlays - Deep Violet & Emerald Green Accents */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/15 z-10" />
          
          {/* Dark overlay for perfect text contrast (WCAG 2.1 AA compliant) */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background z-20" />
          
          {/* Subtle tech grid pattern overlay */}
          <div 
            className="absolute inset-0 z-15 opacity-10" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(124, 58, 237, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(124, 58, 237, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl w-full py-6 md:py-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 md:mb-4 leading-tight tracking-tight text-white"
          >
            {language === 'fr' ? (
              <>
                Marseille 2026 : le futur
                <br />
                s'écrit en 60 secondes
              </>
            ) : (
              <>
                Marseille 2026: The future
                <br />
                in 60 seconds
              </>
            )}
          </motion.h1>

          {/* Countdown Timer - Ultra Compact Version */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 md:mb-5 max-w-2xl mx-auto"
          >
            <p className="text-xs md:text-sm text-muted-foreground mb-2 font-medium">
              {language === 'fr' 
                ? 'Date limite : 15 Avril 2026' 
                : 'Deadline: April 15, 2026'}
            </p>
            <CountdownTimer 
              deadline={new Date('2026-04-15T23:59:59')} 
              onExpired={() => console.log('Submissions closed')}
            />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/submit">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 text-sm md:text-base lg:text-lg px-6 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6 font-semibold group"
                aria-label={language === 'fr' ? 'Soumettre mon film au festival marsAI' : 'Submit my film to marsAI festival'}
              >
                <Upload className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                {language === 'fr' ? 'Soumettre mon Film' : 'Submit My Film'}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Stats Bar */}
      <section className="bg-gradient-to-r from-[#1A1F2E]/80 via-[#1A1F2E] to-[#1A1F2E]/80 border-y border-[#2A3142] backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {/* Stat 1: Countries */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">120+</div>
              <div className="text-sm text-muted-foreground font-medium">{language === 'fr' ? 'Pays Représentés' : 'Countries Represented'}</div>
            </div>

            {/* Stat 2: Films */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                <Video className="w-7 h-7 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent mb-1">600+</div>
              <div className="text-sm text-muted-foreground font-medium">{language === 'fr' ? 'Films Soumis' : 'Films Submitted'}</div>
            </div>

            {/* Stat 3: Prix du Lauréat */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center mb-3 group-hover:bg-yellow-500/20 transition-colors">
                <Trophy className="w-7 h-7 text-" />
              </div>
              <div className="text-3xl font-bold text-yellow-500 mb-1">50 000$</div>
              <div className="text-sm text-muted-foreground font-medium">{language === 'fr' ? 'Prix du Lauréat' : 'Winner Prize'}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Festival Info Section - Below Stats */}
      <section className="bg-gradient-to-b from-background via-[#0D1117] to-background py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <PartyPopper className="w-8 h-8 text-accent" />
              {language === 'fr' ? 'Le Festival marsAI 2026' : 'The marsAI Festival 2026'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {language === 'fr' 
                ? 'Festival international sur l\'IA générative - 12-13 Juin 2026 à Marseille'
                : 'International AI Generative Festival - June 12-13, 2026 in Marseille'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Event 1: Film Contest */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="border-primary/30 bg-primary/5 backdrop-blur-sm h-full hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Video className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-base">
                    {language === 'fr' ? 'Concours de Films' : 'Film Contest'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {language === 'fr' 
                      ? 'Projection des films finalistes en compétition'
                      : 'Screening of finalist films in competition'}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Calendar className="w-3 h-3" />
                      {language === 'fr' ? '12 Juin - 14h00' : 'June 12 - 2:00 PM'}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      500 {language === 'fr' ? 'places' : 'seats'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Event 2: Masterclass */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="border-accent/30 bg-accent/5 backdrop-blur-sm h-full hover:border-accent/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Presentation className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2 text-base">
                    Masterclass
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {language === 'fr' 
                      ? 'Ateliers pratiques avec experts IA'
                      : 'Practical workshops with AI experts'}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Calendar className="w-3 h-3" />
                      {language === 'fr' ? '12 Juin - 10h00' : 'June 12 - 10:00 AM'}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      200 {language === 'fr' ? 'places' : 'seats'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Event 3: Conferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="border-primary/30 bg-primary/5 backdrop-blur-sm h-full hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-base">
                    {language === 'fr' ? 'Conférences' : 'Conferences'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {language === 'fr' 
                      ? 'Panels sur le futur du cinéma IA'
                      : 'Panels on the future of AI cinema'}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Calendar className="w-3 h-3" />
                      {language === 'fr' ? '12-13 Juin' : 'June 12-13'}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      800 {language === 'fr' ? 'places' : 'seats'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Event 4: Closing Ceremony - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Card className="border-yellow-500/50 bg-yellow-500/10 backdrop-blur-sm h-full hover:border-yellow-500/70 transition-all relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Badge className="bg-yellow-500/30 text-yellow-300 border-yellow-500/50 text-xs">
                    ⭐ Featured
                  </Badge>
                </div>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                    <Award className="w-7 h-7 text-yellow-500" />
                  </div>
                  <h3 className="font-semibold mb-2 text-base">
                    marsAI Night
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {language === 'fr' 
                      ? 'Soirée de clôture + Remise des prix'
                      : 'Closing ceremony + Awards'}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Calendar className="w-3 h-3" />
                      {language === 'fr' ? '13 Juin - 19h00' : 'June 13 - 7:00 PM'}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      1000 {language === 'fr' ? 'places' : 'seats'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Visitor Stats & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-center"
          >
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-accent" />
                  <h3 className="text-2xl font-semibold">
                    {language === 'fr' ? '3000 Visiteurs Attendus' : '3000 Expected Visitors'}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  {language === 'fr' 
                    ? 'Rejoignez-nous pour 2 jours d\'événements exceptionnels dédiés à l\'IA générative et au cinéma du futur'
                    : 'Join us for 2 days of exceptional events dedicated to generative AI and the cinema of the future'}
                </p>
                <Link to="/events">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30">
                    <Users className="w-5 h-5 mr-2" />
                    {language === 'fr' ? 'S\'inscrire aux Événements' : 'Register for Events'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Bar with Filter Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="search"
                  placeholder={t('landing.search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base border-border/50 bg-card/50 focus:bg-card focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Filter Button */}
              <Button
                variant="outline"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={`h-12 px-6 border-primary/50 hover:bg-primary/10 hover:border-primary transition-colors ${
                  filtersOpen ? 'bg-primary/10 border-primary' : ''
                } ${
                  selectedAITools.length > 0 || selectedCountries.length > 0 || selectedCategory !== 'all' || showOfficialOnly
                    ? 'border-primary bg-primary/5'
                    : ''
                }`}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{t('landing.filters.title')}</span>
                {(selectedAITools.length > 0 || selectedCountries.length > 0 || selectedCategory !== 'all' || showOfficialOnly) && (
                  <Badge className="ml-2 bg-primary text-primary-foreground h-5 px-1.5 text-xs">
                    {selectedAITools.length + selectedCountries.length + (selectedCategory !== 'all' ? 1 : 0) + (showOfficialOnly ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Expandable Filters Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div className="max-w-4xl mx-auto">
                <Card className="bg-card/80 border-primary/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-base">{t('landing.filters.title')}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {(selectedAITools.length > 0 || selectedCountries.length > 0 || selectedCategory !== 'all' || showOfficialOnly) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-xs text-primary hover:text-primary hover:bg-primary/10"
                          >
                            {t('common.clear')}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setFiltersOpen(false)}
                          className="h-8 w-8"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Category Filter */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground" htmlFor="category-select">
                          Catégorie
                        </label>
                        <Select value={selectedCategory} onValueChange={(value) => { setSelectedCategory(value); resetPagination(); }}>
                          <SelectTrigger id="category-select" className="w-full border-border/50" aria-label="Sélectionner une catégorie">
                            <SelectValue placeholder="Toutes les catégories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toutes les catégories</SelectItem>
                            <SelectItem value="Fiction">Fiction</SelectItem>
                            <SelectItem value="Documentaire">Documentaire</SelectItem>
                            <SelectItem value="Animation">Animation</SelectItem>
                            <SelectItem value="Expérimental">Expérimental</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* AI Tools Filter */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground">
                          {t('landing.filters.aitools')}
                        </label>
                        <div className="space-y-2">
                          {['Script', 'Image', 'Video', 'Sound'].map(tool => (
                            <div key={tool} className="flex items-center space-x-2">
                              <Checkbox
                                id={`ai-${tool}`}
                                checked={selectedAITools.includes(tool)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedAITools([...selectedAITools, tool]);
                                  } else {
                                    setSelectedAITools(selectedAITools.filter(t => t !== tool));
                                  }
                                  resetPagination();
                                }}
                              />
                              <label
                                htmlFor={`ai-${tool}`}
                                className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {t(`ai.${tool.toLowerCase()}`)}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Countries Filter */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground">
                          {t('landing.filters.countries')}
                        </label>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {[
                            { code: 'FR', name: 'France' },
                            { code: 'US', name: 'États-Unis' },
                            { code: 'JP', name: 'Japon' },
                            { code: 'DE', name: 'Allemagne' },
                            { code: 'GB', name: 'Royaume-Uni' },
                            { code: 'CA', name: 'Canada' },
                          ].map(country => (
                            <div key={country.code} className="flex items-center space-x-2">
                              <Checkbox
                                id={`country-${country.code}`}
                                checked={selectedCountries.includes(country.code)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedCountries([...selectedCountries, country.code]);
                                  } else {
                                    setSelectedCountries(selectedCountries.filter(c => c !== country.code));
                                  }
                                  resetPagination();
                                }}
                              />
                              <label
                                htmlFor={`country-${country.code}`}
                                className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {country.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Official Selection Filter */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground">
                          {t('landing.filters.selection')}
                        </label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="official-only"
                            checked={showOfficialOnly}
                            onCheckedChange={(checked) => { setShowOfficialOnly(checked as boolean); resetPagination(); }}
                          />
                          <label
                            htmlFor="official-only"
                            className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {t('landing.filters.official')}
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count with Pagination Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
        >
          <div>
            {t('landing.results.showing')} <span className="text-primary font-semibold">{filteredFilms.length}</span> {t('landing.results.of')} {mockFilms.length} {t('landing.results')}
            {totalPages > 1 && (
              <span className="ml-2">
                (Page <span className="text-primary font-semibold">{currentPage}</span> sur {totalPages})
              </span>
            )}
          </div>
          
          {/* Pagination Controls - Top */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2" role="navigation" aria-label="Pagination de la galerie">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="h-8 px-3 gap-1"
                aria-label="Page précédente"
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </Button>
              <span className="text-sm px-2">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentPage(prev => Math.min(totalPages, prev + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="h-8 px-3 gap-1"
                aria-label="Page suivante"
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </motion.div>

        {/* Film Gallery with Narrow Captions - Using paginatedFilms */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {paginatedFilms.map((film, index) => (
              <motion.div
                key={film.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 bg-card/50"
                  onClick={() => setSelectedFilm(film)}
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img
                      src={film.thumbnail}
                      alt={film.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary-foreground fill-current" />
                      </div>
                    </div>
                    
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border border-border/30 text-xs">
                        {film.countryName}
                      </Badge>
                    </div>
                    
                    {film.officialSelection && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-accent text-accent-foreground backdrop-blur-sm text-xs font-semibold shadow-lg shadow-accent/30">
                          {t('badge.official')}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  {/* Narrow Caption Area (max-width 80%) */}
                  <CardContent className="pt-4 pb-3">
                    <div className="max-w-[80%]">
                      <h3 className="font-medium mb-1 text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {film.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{film.director}</p>
                      <div className="flex flex-wrap gap-1">
                        {film.aiTools.slice(0, 3).map(tool => (
                          <Badge key={tool} variant="outline" className="text-xs border-primary/30 px-1.5 py-0">
                            {t(`ai.${tool.toLowerCase()}`)}
                          </Badge>
                        ))}
                        {film.aiTools.length > 3 && (
                          <Badge variant="outline" className="text-xs border-primary/30 px-1.5 py-0">
                            +{film.aiTools.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls - Bottom */}
        {totalPages > 1 && filteredFilms.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="outline"
              size="default"
              onClick={() => {
                setCurrentPage(prev => Math.max(1, prev - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="gap-2 min-w-[120px]"
              aria-label="Page précédente"
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </Button>
            
            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-10 h-10 ${currentPage === pageNum ? 'bg-primary text-primary-foreground' : ''}`}
                    aria-label={`Aller à la page ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="default"
              onClick={() => {
                setCurrentPage(prev => Math.min(totalPages, prev + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === totalPages}
              className="gap-2 min-w-[120px]"
              aria-label="Page suivante"
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* No Results */}
        {filteredFilms.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Film className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-base">{t('landing.results.none')}</p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              {t('common.clear')} {t('landing.filters.title')}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Film Detail Modal */}
      <AnimatePresence>
        {selectedFilm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFilm(null)}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <Card className="border-primary/30 bg-card">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-medium text-primary mb-2">{selectedFilm.title}</h2>
                      <p className="text-muted-foreground mb-2">{selectedFilm.director}</p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{selectedFilm.countryName}</Badge>
                        {selectedFilm.officialSelection && (
                          <Badge className="bg-accent text-accent-foreground font-semibold">
                            {t('badge.official')}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedFilm(null)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="aspect-video bg-muted rounded-lg mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
                      title={selectedFilm.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedFilm.aiTools.map(tool => (
                      <Badge key={tool} variant="secondary" className="bg-primary/10 border-primary/30">
                        {t(`ai.${tool.toLowerCase()}`)}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}