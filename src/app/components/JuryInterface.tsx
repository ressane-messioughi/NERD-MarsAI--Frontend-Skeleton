import { useState } from 'react';
import { Play, Brain, Star, MessageSquare, CheckCircle2, Send, Search, Filter, X, SlidersHorizontal, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Slider } from '@/app/components/ui/slider';
import { Badge } from '@/app/components/ui/badge';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Checkbox } from '@/app/components/ui/checkbox';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Navbar } from '@/app/components/Navbar';

// Mock films for jury evaluation
const mockFilms = [
  {
    id: 1,
    title: 'Rêves Numériques',
    director: 'Marie Dubois',
    duration: 58,
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    youtubeUrl: 'dQw4w9WgXcQ',
    aiTools: {
      script: true,
      image: true,
      video: true,
      sound: false,
    },
    methodology: 'Utilisation de GPT-4 pour le scénario, Midjourney pour les images clés, et Runway Gen-2 pour la génération vidéo.',
    rated: false,
  },
  {
    id: 2,
    title: 'Visions de Silicium',
    director: 'John Smith',
    duration: 60,
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
    youtubeUrl: 'dQw4w9WgXcQ',
    aiTools: {
      script: false,
      image: true,
      video: false,
      sound: true,
    },
    methodology: 'DALL-E 3 pour les visuels, composition sonore avec MuseNet et Suno AI.',
    rated: false,
  },
  {
    id: 3,
    title: 'Narrations Neuronales',
    director: 'Yuki Tanaka',
    duration: 45,
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
    youtubeUrl: 'dQw4w9WgXcQ',
    aiTools: {
      script: true,
      image: false,
      video: true,
      sound: true,
    },
    methodology: 'Pipeline complet IA: Claude pour le script, Pika Labs pour vidéo, ElevenLabs pour voix.',
    rated: false,
  },
  {
    id: 4,
    title: 'Art Algorithmique',
    director: 'Klaus Weber',
    duration: 52,
    thumbnail: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400',
    youtubeUrl: 'dQw4w9WgXcQ',
    aiTools: {
      script: false,
      image: true,
      video: false,
      sound: false,
    },
    methodology: 'Stable Diffusion XL avec fine-tuning personnalisé pour créer un style visuel unique.',
    rated: true,
  },
  {
    id: 5,
    title: 'Mémoires Machines',
    director: 'Emma Thompson',
    duration: 59,
    thumbnail: 'https://images.unsplash.com/photo-1574267432644-f740d15f52d7?w=400',
    youtubeUrl: 'dQw4w9WgXcQ',
    aiTools: {
      script: true,
      image: true,
      video: true,
      sound: true,
    },
    methodology: '100% généré par IA. Stack: GPT-4, Midjourney, Runway, Suno.',
    rated: true,
  },
];

export function JuryInterface() {
  const { t, language } = useLanguage();
  const [selectedFilmId, setSelectedFilmId] = useState(mockFilms[0].id);
  const [ratings, setRatings] = useState<Record<number, { creativity: number; technical: number; narrative: number }>>({});
  const [comments, setComments] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showRatedOnly, setShowRatedOnly] = useState(false);
  const [showUnratedOnly, setShowUnratedOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredFilms = mockFilms.filter(film => {
    if (searchQuery && !film.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !film.director.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (showRatedOnly && !submitted[film.id]) {
      return false;
    }
    if (showUnratedOnly && submitted[film.id]) {
      return false;
    }
    return true;
  });

  const selectedFilm = mockFilms.find(f => f.id === selectedFilmId)!;
  const currentRating = ratings[selectedFilmId] || { creativity: 5, technical: 5, narrative: 5 };
  const currentComment = comments[selectedFilmId] || '';
  const isSubmitted = submitted[selectedFilmId];

  // Calculate average score (Rule of 3)
  const averageScore = Math.round((currentRating.creativity + currentRating.technical + currentRating.narrative) / 3);

  const ratedCount = Object.keys(submitted).length;
  const totalFilms = mockFilms.length;

  const handleCreativityChange = (value: number[]) => {
    setRatings({ ...ratings, [selectedFilmId]: { ...currentRating, creativity: value[0] } });
  };

  const handleTechnicalChange = (value: number[]) => {
    setRatings({ ...ratings, [selectedFilmId]: { ...currentRating, technical: value[0] } });
  };

  const handleNarrativeChange = (value: number[]) => {
    setRatings({ ...ratings, [selectedFilmId]: { ...currentRating, narrative: value[0] } });
  };

  const handleCommentChange = (value: string) => {
    setComments({ ...comments, [selectedFilmId]: value });
  };

  const handleSubmit = () => {
    setSubmitted({ ...submitted, [selectedFilmId]: true });
  };

  const getRatingLabel = (value: number) => {
    if (value <= 3) return t('jury.rating.poor');
    if (value <= 7) return t('jury.rating.average');
    return t('jury.rating.excellent');
  };

  const clearFilters = () => {
    setShowRatedOnly(false);
    setShowUnratedOnly(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-col lg:flex-row mt-[60px] min-h-[calc(100vh-60px)]">
        {/* Mobile Toggle Button */}
        <div className="lg:hidden sticky top-[60px] z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-card-foreground text-sm">{t('jury.title')}</h3>
            <p className="text-xs text-muted-foreground">
              {ratedCount}/{totalFilms} {t('jury.progress.films')}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="border-primary/30"
          >
            <Menu className="w-4 h-4 mr-2" />
            Films
          </Button>
        </div>

        {/* Left Sidebar - Responsive */}
        <aside className={`
          ${sidebarOpen ? 'fixed' : 'hidden lg:flex'} 
          lg:relative top-[120px] lg:top-0 left-0 
          w-80 lg:w-1/4 min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-60px)]
          border-r border-border bg-background lg:bg-card/30 
          overflow-hidden flex-col z-30
          ${sidebarOpen ? 'shadow-2xl' : ''}
        `}>
          {/* Close button for mobile */}
          <div className="lg:hidden absolute top-2 right-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-card-foreground mb-1 hidden lg:block">{t('jury.title')}</h3>
            <p className="text-xs text-primary/80 mb-3 hidden lg:block">
              {language === 'fr' ? 'L\'excellence au bout du curseur' : 'Excellence at your fingertips'}
            </p>
            <p className="text-xs text-muted-foreground mb-4 hidden lg:block">
              {ratedCount}/{totalFilms} {t('jury.progress.films')}
            </p>

            {/* Search Bar */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm border-border/50"
              />
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              onClick={() => setFiltersOpen(!filtersOpen)}
              size="sm"
              className={`w-full border-border/50 hover:bg-primary/10 hover:border-primary transition-colors ${
                filtersOpen ? 'bg-primary/10 border-primary' : ''
              } ${
                showRatedOnly || showUnratedOnly
                  ? 'border-primary bg-primary/5'
                  : ''
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Filtres</span>
              {(showRatedOnly || showUnratedOnly) && (
                <Badge className="ml-auto h-5 min-w-5 px-1 bg-primary text-primary-foreground text-xs">
                  {(showRatedOnly ? 1 : 0) + (showUnratedOnly ? 1 : 0)}
                </Badge>
              )}
            </Button>

            {/* Expandable Filters Panel */}
            <AnimatePresence>
              {filtersOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3"
                >
                  <Card className="bg-card/80 border-primary/30 backdrop-blur-sm">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <SlidersHorizontal className="w-3 h-3 text-primary" />
                          <h4 className="font-medium text-xs">Filtrer par statut</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          {(showRatedOnly || showUnratedOnly) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={clearFilters}
                              className="text-xs text-primary hover:text-primary hover:bg-primary/10 h-6 px-2"
                            >
                              Effacer
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setFiltersOpen(false)}
                            className="h-6 w-6"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="rated-only"
                            checked={showRatedOnly}
                            onCheckedChange={(checked) => {
                              setShowRatedOnly(checked as boolean);
                              if (checked) setShowUnratedOnly(false);
                            }}
                          />
                          <label htmlFor="rated-only" className="text-xs cursor-pointer">
                            Notés seulement
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="unrated-only"
                            checked={showUnratedOnly}
                            onCheckedChange={(checked) => {
                              setShowUnratedOnly(checked as boolean);
                              if (checked) setShowRatedOnly(false);
                            }}
                          />
                          <label htmlFor="unrated-only" className="text-xs cursor-pointer">
                            Non notés seulement
                          </label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-1.5">
              {filteredFilms.map((film) => (
                <button
                  key={film.id}
                  onClick={() => {
                    setSelectedFilmId(film.id);
                    setSidebarOpen(false); // Close sidebar on mobile after selection
                  }}
                  className={`w-full text-left rounded-lg p-3 transition-all border ${
                    selectedFilmId === film.id
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-transparent hover:border-border/50 hover:bg-card/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-1 mb-1">{film.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">{film.director}</p>
                    </div>
                    {submitted[film.id] && (
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}

              {filteredFilms.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">Aucun film trouvé</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-20 top-[120px]"
          />
        )}

        {/* Right Main Content - Responsive */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Video Player Section */}
            <AnimatePresence>
              <motion.div
                key={selectedFilmId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-4 md:mb-6 border-primary/20 bg-card/50">
                  <CardHeader className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-xl md:text-2xl mb-2">{selectedFilm.title}</CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm md:text-base">
                          <span>{t('jury.video.director')}: {selectedFilm.director}</span>
                          <span className="hidden sm:inline">·</span>
                          <span>{t('jury.video.duration')}: {selectedFilm.duration}s</span>
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={isSubmitted ? 'default' : 'secondary'} 
                        className={`${isSubmitted ? 'bg-green-500/20 text-green-400 border-green-500/50' : ''} flex-shrink-0 self-start sm:self-auto`}
                      >
                        {isSubmitted ? t('jury.rating.submitted') : t('common.pending')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    {/* YouTube Player */}
                    <div className="w-full flex justify-center mb-4">
                      <div className="aspect-video bg-muted rounded-lg relative overflow-hidden w-full max-w-4xl">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${selectedFilm.youtubeUrl}`}
                          title={selectedFilm.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Stack Card */}
                <Card className="mb-4 md:mb-6 border-border/50 bg-card/50">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <Brain className="w-5 h-5 text-primary" />
                      {t('jury.ai.title')}
                    </CardTitle>
                    <CardDescription className="text-sm">{t('jury.ai.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
                      <div className={`p-3 rounded-lg border ${selectedFilm.aiTools.script ? 'border-primary/50 bg-primary/5' : 'border-border/30 bg-muted/30'}`}>
                        <div className="text-xs text-muted-foreground mb-1">{t('jury.ai.script')}</div>
                        <div className="text-xs md:text-sm font-medium">{selectedFilm.aiTools.script ? t('ai.script') : t('jury.ai.notused')}</div>
                      </div>
                      <div className={`p-3 rounded-lg border ${selectedFilm.aiTools.image ? 'border-primary/50 bg-primary/5' : 'border-border/30 bg-muted/30'}`}>
                        <div className="text-xs text-muted-foreground mb-1">{t('jury.ai.image')}</div>
                        <div className="text-xs md:text-sm font-medium">{selectedFilm.aiTools.image ? t('ai.image') : t('jury.ai.notused')}</div>
                      </div>
                      <div className={`p-3 rounded-lg border ${selectedFilm.aiTools.video ? 'border-primary/50 bg-primary/5' : 'border-border/30 bg-muted/30'}`}>
                        <div className="text-xs text-muted-foreground mb-1">{t('jury.ai.video')}</div>
                        <div className="text-xs md:text-sm font-medium">{selectedFilm.aiTools.video ? t('ai.video') : t('jury.ai.notused')}</div>
                      </div>
                      <div className={`p-3 rounded-lg border ${selectedFilm.aiTools.sound ? 'border-primary/50 bg-primary/5' : 'border-border/30 bg-muted/30'}`}>
                        <div className="text-xs text-muted-foreground mb-1">{t('jury.ai.sound')}</div>
                        <div className="text-xs md:text-sm font-medium">{selectedFilm.aiTools.sound ? t('ai.sound') : t('jury.ai.notused')}</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                      <h4 className="text-sm font-medium mb-2 text-muted-foreground">{t('jury.ai.methodology')}</h4>
                      <p className="text-sm">{selectedFilm.methodology}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Rule of 3 Rating System */}
                <Card className="border-primary/30 bg-card/50">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <Star className="w-5 h-5 text-primary" />
                      {t('jury.rating.title')}
                    </CardTitle>
                    <CardDescription className="text-sm">{t('jury.rating.subtitle')}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    {!isSubmitted ? (
                      <div className="space-y-6">
                        {/* Rule of 3: Average Score Display */}
                        <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/30">
                          <div className="text-sm text-muted-foreground mb-2">
                            {language === 'fr' ? 'Note Moyenne (Rule of 3)' : 'Average Score (Rule of 3)'}
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-4xl font-bold text-primary">{averageScore}</span>
                            <span className="text-lg text-muted-foreground">/10</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {language === 'fr' 
                              ? `Créativité: ${currentRating.creativity} | Technique: ${currentRating.technical} | Narration: ${currentRating.narrative}`
                              : `Creativity: ${currentRating.creativity} | Technical: ${currentRating.technical} | Narrative: ${currentRating.narrative}`
                            }
                          </div>
                        </div>

                        {/* Slider 1: Creativity */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-foreground">
                              {language === 'fr' ? '1. Créativité & Innovation' : '1. Creativity & Innovation'}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-primary">{currentRating.creativity}</span>
                              <span className="text-sm text-muted-foreground">/10</span>
                            </div>
                          </div>
                          <Slider
                            value={[currentRating.creativity]}
                            onValueChange={handleCreativityChange}
                            min={1}
                            max={10}
                            step={1}
                            className="mb-2"
                            aria-label={language === 'fr' ? 'Curseur de créativité' : 'Creativity slider'}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>1 - {t('jury.rating.poor')}</span>
                            <span className="font-medium text-primary hidden sm:inline">{getRatingLabel(currentRating.creativity)}</span>
                            <span>10 - {t('jury.rating.excellent')}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {language === 'fr' 
                              ? 'Originalité du concept, usage innovant de l\'IA'
                              : 'Concept originality, innovative AI usage'}
                          </p>
                        </div>

                        {/* Slider 2: Technical Quality */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-foreground">
                              {language === 'fr' ? '2. Qualité Technique' : '2. Technical Quality'}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-accent">{currentRating.technical}</span>
                              <span className="text-sm text-muted-foreground">/10</span>
                            </div>
                          </div>
                          <Slider
                            value={[currentRating.technical]}
                            onValueChange={handleTechnicalChange}
                            min={1}
                            max={10}
                            step={1}
                            className="mb-2"
                            aria-label={language === 'fr' ? 'Curseur de qualité technique' : 'Technical quality slider'}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>1 - {t('jury.rating.poor')}</span>
                            <span className="font-medium text-accent hidden sm:inline">{getRatingLabel(currentRating.technical)}</span>
                            <span>10 - {t('jury.rating.excellent')}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {language === 'fr' 
                              ? 'Maîtrise des outils IA, qualité visuelle et sonore'
                              : 'AI tools mastery, visual and sound quality'}
                          </p>
                        </div>

                        {/* Slider 3: Narrative Impact */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-foreground">
                              {language === 'fr' ? '3. Impact Narratif' : '3. Narrative Impact'}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-primary">{currentRating.narrative}</span>
                              <span className="text-sm text-muted-foreground">/10</span>
                            </div>
                          </div>
                          <Slider
                            value={[currentRating.narrative]}
                            onValueChange={handleNarrativeChange}
                            min={1}
                            max={10}
                            step={1}
                            className="mb-2"
                            aria-label={language === 'fr' ? 'Curseur d\'impact narratif' : 'Narrative impact slider'}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>1 - {t('jury.rating.poor')}</span>
                            <span className="font-medium text-primary hidden sm:inline">{getRatingLabel(currentRating.narrative)}</span>
                            <span>10 - {t('jury.rating.excellent')}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {language === 'fr' 
                              ? 'Cohérence du récit, émotion, message'
                              : 'Story coherence, emotion, message'}
                          </p>
                        </div>

                        {/* Comments */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                            <span className="text-sm font-medium">{t('jury.rating.comments')}</span>
                          </div>
                          <Textarea
                            placeholder={t('jury.rating.comments.placeholder')}
                            value={currentComment}
                            onChange={(e) => handleCommentChange(e.target.value)}
                            rows={6}
                            className="resize-none border-border/50"
                            aria-label={language === 'fr' ? 'Commentaires détaillés' : 'Detailed comments'}
                          />
                          <p className="text-xs text-muted-foreground mt-2">{t('jury.rating.comments.hint')}</p>
                        </div>

                        {/* Submit Button */}
                        <Button
                          onClick={handleSubmit}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                          size="lg"
                          aria-label={language === 'fr' ? 'Soumettre l\'évaluation' : 'Submit evaluation'}
                        >
                          <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                          {t('jury.rating.submit')}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle2 className="w-12 md:w-16 h-12 md:h-16 text-green-400 mx-auto mb-4" aria-hidden="true" />
                        <h3 className="text-base md:text-lg font-medium mb-2">{t('jury.rating.submitted')}</h3>
                        <div className="mb-4">
                          <p className="text-muted-foreground mb-2 text-sm md:text-base">
                            {t('jury.rating.score')}: <span className="text-primary font-bold text-xl">{averageScore}/10</span>
                          </p>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>{language === 'fr' ? 'Créativité' : 'Creativity'}: <span className="text-primary font-medium">{currentRating.creativity}/10</span></p>
                            <p>{language === 'fr' ? 'Technique' : 'Technical'}: <span className="text-accent font-medium">{currentRating.technical}/10</span></p>
                            <p>{language === 'fr' ? 'Narration' : 'Narrative'}: <span className="text-primary font-medium">{currentRating.narrative}/10</span></p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            const newSubmitted = { ...submitted };
                            delete newSubmitted[selectedFilmId];
                            setSubmitted(newSubmitted);
                          }}
                          aria-label={language === 'fr' ? 'Modifier l\'évaluation' : 'Edit evaluation'}
                        >
                          {t('common.edit')}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}