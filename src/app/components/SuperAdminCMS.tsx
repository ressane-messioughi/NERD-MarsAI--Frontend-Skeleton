import { useState } from 'react';
import { Settings, Film, Upload, Users, Calendar, Palette, Plus, Eye, Edit2, Trash2, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.js';
import { Button } from '../components/ui/button.js';
import { Input } from '../components/ui/input.js';
import { Label } from '../components/ui/label.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.js';
import { Badge } from '../components/ui/badge.js';
import { useLanguage } from '../contexts/LanguageContext.js';
import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog.js';

interface FestivalInstance {
  id: string;
  name: string;
  slug: string;
  year: number;
  city: string;
  status: 'active' | 'upcoming' | 'archived';
  logo?: string;
  primaryColor: string;
  youtubeApiKey?: string;
  submissionsCount: number;
  createdAt: string;
}

const mockFestivals: FestivalInstance[] = [
  {
    id: '1',
    name: 'marsAI Marseille 2026',
    slug: 'marseille-2026',
    year: 2026,
    city: 'Marseille',
    status: 'active',
    primaryColor: '#00F2FF',
    submissionsCount: 247,
    createdAt: '2025-01-01',
  },
  {
    id: '2',
    name: 'marsAI Lyon 2027',
    slug: 'lyon-2027',
    year: 2027,
    city: 'Lyon',
    status: 'upcoming',
    primaryColor: '#FF6B9D',
    submissionsCount: 0,
    createdAt: '2026-01-15',
  },
  {
    id: '3',
    name: 'marsAI Paris 2025',
    slug: 'paris-2025',
    year: 2025,
    city: 'Paris',
    status: 'archived',
    primaryColor: '#FFD700',
    submissionsCount: 189,
    createdAt: '2024-01-01',
  },
];

export function SuperAdminCMS() {
  const { t } = useLanguage();
  const [festivals, setFestivals] = useState<FestivalInstance[]>(mockFestivals);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newFestival, setNewFestival] = useState({
    name: '',
    slug: '',
    city: '',
    year: new Date().getFullYear(),
    primaryColor: '#00F2FF',
    youtubeApiKey: '',
  });

  const handleCreateFestival = () => {
    const festival: FestivalInstance = {
      id: String(festivals.length + 1),
      name: newFestival.name,
      slug: newFestival.slug,
      year: newFestival.year,
      city: newFestival.city,
      status: 'upcoming',
      primaryColor: newFestival.primaryColor,
      youtubeApiKey: newFestival.youtubeApiKey,
      submissionsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setFestivals([...festivals, festival]);
    setIsCreateDialogOpen(false);
    setNewFestival({
      name: '',
      slug: '',
      city: '',
      year: new Date().getFullYear(),
      primaryColor: '#00F2FF',
      youtubeApiKey: '',
    });
  };

  const getStatusBadge = (status: FestivalInstance['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50"><CheckCircle2 className="w-3 h-3 mr-1" />Actif</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50"><Clock className="w-3 h-3 mr-1" />À venir</Badge>;
      case 'archived':
        return <Badge variant="secondary" className="bg-muted/50">Archivé</Badge>;
    }
  };

  const stats = [
    { label: 'Festivals Actifs', value: festivals.filter(f => f.status === 'active').length, icon: Film, color: 'text-primary' },
    { label: 'Festivals à Venir', value: festivals.filter(f => f.status === 'upcoming').length, icon: Calendar, color: 'text-blue-400' },
    { label: 'Total Soumissions', value: festivals.reduce((acc, f) => acc + f.submissionsCount, 0), icon: Upload, color: 'text-primary' },
    { label: 'Instances Totales', value: festivals.length, icon: Settings, color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-6 md:py-8 mt-[60px] max-w-7xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-medium mb-2">Super Admin CMS</h1>
          <p className="text-sm md:text-base text-muted-foreground">Centre de contrôle SaaS multi-festivals marsAI</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border/50 hover:border-primary/50 transition-colors overflow-hidden group bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {stat.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl md:text-3xl font-medium text-primary group-hover:scale-105 transition-transform">
                      {stat.value}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="instances" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="instances" className="gap-1 md:gap-2 text-xs md:text-sm py-2">
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Instances de Festivals</span>
              <span className="sm:hidden">Festivals</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="gap-1 md:gap-2 text-xs md:text-sm py-2">
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Créer un Festival</span>
              <span className="sm:hidden">Créer</span>
            </TabsTrigger>
          </TabsList>

          {/* Festival Instances List */}
          <TabsContent value="instances">
            <Card className="border-border/50 bg-card/50">
              <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg md:text-xl">Liste des Festivals</CardTitle>
                    <CardDescription className="text-sm">
                      Gérez toutes les instances de festivals marsAI
                    </CardDescription>
                  </div>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau Festival
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-lg md:text-xl">Créer une Nouvelle Instance</DialogTitle>
                        <DialogDescription className="text-sm">
                          Configurez un nouveau festival marsAI avec sa propre identité et paramètres
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm">Nom du Festival</Label>
                            <Input
                              id="name"
                              placeholder="marsAI Marseille 2026"
                              value={newFestival.name}
                              onChange={(e) => setNewFestival({ ...newFestival, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-sm">Ville</Label>
                            <Input
                              id="city"
                              placeholder="Marseille"
                              value={newFestival.city}
                              onChange={(e) => setNewFestival({ ...newFestival, city: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="slug" className="text-sm">Slug (URL)</Label>
                            <Input
                              id="slug"
                              placeholder="marseille-2026"
                              value={newFestival.slug}
                              onChange={(e) => setNewFestival({ ...newFestival, slug: e.target.value })}
                            />
                            <p className="text-xs text-muted-foreground break-all">URL: marsai.com/{newFestival.slug}</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="year" className="text-sm">Année</Label>
                            <Input
                              id="year"
                              type="number"
                              value={newFestival.year}
                              onChange={(e) => setNewFestival({ ...newFestival, year: Number(e.target.value) })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="color" className="text-sm">Couleur Principale</Label>
                          <div className="flex gap-3 items-center">
                            <Input
                              id="color"
                              type="color"
                              value={newFestival.primaryColor}
                              onChange={(e) => setNewFestival({ ...newFestival, primaryColor: e.target.value })}
                              className="w-16 sm:w-20 h-10 cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={newFestival.primaryColor}
                              onChange={(e) => setNewFestival({ ...newFestival, primaryColor: e.target.value })}
                              className="flex-1"
                              placeholder="#00F2FF"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="youtube" className="text-sm">Clé API YouTube</Label>
                          <Input
                            id="youtube"
                            type="password"
                            placeholder="AIzaSy..."
                            value={newFestival.youtubeApiKey}
                            onChange={(e) => setNewFestival({ ...newFestival, youtubeApiKey: e.target.value })}
                          />
                          <p className="text-xs text-muted-foreground">Optionnel - Pour l'intégration vidéo</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          onClick={handleCreateFestival} 
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                          disabled={!newFestival.name || !newFestival.slug || !newFestival.city}
                        >
                          Créer le Festival
                        </Button>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="sm:w-auto">
                          Annuler
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-3">
                  {festivals.map((festival, index) => (
                    <motion.div
                      key={festival.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="border-border/50 hover:border-primary/30 transition-all bg-muted/30">
                        <CardContent className="p-3 md:p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            {/* Color Indicator */}
                            <div 
                              className="w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-border/50 flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: festival.primaryColor + '20' }}
                            >
                              <div 
                                className="w-5 h-5 md:w-6 md:h-6 rounded-full"
                                style={{ backgroundColor: festival.primaryColor }}
                              />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                <h3 className="font-medium text-sm md:text-base text-card-foreground truncate">{festival.name}</h3>
                                {getStatusBadge(festival.status)}
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground">
                                <span className="truncate">marsai.com/{festival.slug}</span>
                                <span className="hidden sm:inline">·</span>
                                <span className="whitespace-nowrap">{festival.submissionsCount} soumissions</span>
                                <span className="hidden sm:inline">·</span>
                                <span className="whitespace-nowrap">Créé le {new Date(festival.createdAt).toLocaleDateString('fr-FR')}</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 self-end sm:self-auto">
                              <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9">
                                <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9">
                                <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9 text-red-400 hover:text-red-300">
                                <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create New Festival Tab */}
          <TabsContent value="create">
            <Card className="border-border/50 bg-card/50">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">Créer une Nouvelle Instance de Festival</CardTitle>
                <CardDescription className="text-sm">
                  Lancez un nouveau festival marsAI avec sa propre configuration et identité visuelle
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="create-name" className="text-sm">Nom du Festival *</Label>
                    <Input
                      id="create-name"
                      placeholder="marsAI Marseille 2026"
                      value={newFestival.name}
                      onChange={(e) => setNewFestival({ ...newFestival, name: e.target.value })}
                      className="border-border/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="create-city" className="text-sm">Ville *</Label>
                    <Input
                      id="create-city"
                      placeholder="Marseille"
                      value={newFestival.city}
                      onChange={(e) => setNewFestival({ ...newFestival, city: e.target.value })}
                      className="border-border/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="create-slug" className="text-sm">Slug (URL personnalisée) *</Label>
                    <Input
                      id="create-slug"
                      placeholder="marseille-2026"
                      value={newFestival.slug}
                      onChange={(e) => setNewFestival({ ...newFestival, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                      className="border-border/50"
                    />
                    <p className="text-xs text-muted-foreground break-all">
                      Votre festival sera accessible à : <span className="text-primary">marsai.com/{newFestival.slug || 'votre-slug'}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="create-year" className="text-sm">Année</Label>
                    <Input
                      id="create-year"
                      type="number"
                      value={newFestival.year}
                      onChange={(e) => setNewFestival({ ...newFestival, year: Number(e.target.value) })}
                      className="border-border/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="create-logo" className="text-sm">Logo du Festival</Label>
                  <Input
                    id="create-logo"
                    type="file"
                    accept="image/*"
                    className="border-border/50"
                  />
                  <p className="text-xs text-muted-foreground">Format PNG ou SVG recommandé, max 2MB</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="create-color" className="text-sm">Couleur Principale</Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      id="create-color"
                      type="color"
                      value={newFestival.primaryColor}
                      onChange={(e) => setNewFestival({ ...newFestival, primaryColor: e.target.value })}
                      className="w-20 sm:w-24 h-12 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={newFestival.primaryColor}
                      onChange={(e) => setNewFestival({ ...newFestival, primaryColor: e.target.value })}
                      className="flex-1 border-border/50"
                      placeholder="#00F2FF"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="create-youtube" className="text-sm">Clé API YouTube</Label>
                  <Input
                    id="create-youtube"
                    type="password"
                    placeholder="AIzaSy..."
                    value={newFestival.youtubeApiKey}
                    onChange={(e) => setNewFestival({ ...newFestival, youtubeApiKey: e.target.value })}
                    className="border-border/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Clé API dédiée pour les vidéos YouTube de cette instance
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    onClick={handleCreateFestival}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                    disabled={!newFestival.name || !newFestival.slug || !newFestival.city}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Créer le Festival
                  </Button>
                  <Button variant="outline" className="border-border/50 w-full sm:w-auto">
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}