import { useState } from 'react';
import { Upload, Check, AlertCircle, ChevronLeft, ChevronRight, Film, User, FileText, Sparkles, Send, Users, Plus, X, CheckCircle2, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button.js';
import { Input } from '../components/ui/input.js';
import { Label } from '../components/ui/label.js';
import { Textarea } from '../components/ui/textarea.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.js';
import { Badge } from '../components/ui/badge.js';
import { Checkbox } from '../components/ui/checkbox.js';
import { Progress } from '../components/ui/progress.js';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.js';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog.js';
import { useLanguage } from '../contexts/LanguageContext.js';
import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { SEOHead, seoData } from '../components/SEOHead.js';

type Step = 1 | 2 | 3 | 4 | 5;

interface Collaborator {
  civility: string;
  firstName: string;
  lastName: string;
  profession: string;
  email: string;
}

export function SubmissionForm() {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1 - Informations sur le Réalisateur
    civility: 'M',
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    mobile: '',
    street: '',
    postalCode: '',
    city: '',
    country: '',
    profession: '',
    youtubeUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    facebookUrl: '',
    xUrl: '',
    discoverySource: '',
    newsletter: false,
    
    // Step 2 - Métadonnées du Film
    titleOriginal: '',
    titleEnglish: '',
    duration: '',
    mainLanguage: '',
    tags: '',
    synopsisOriginal: '',
    synopsisEnglish: '',
    
    // Step 3 - Déclaration d'Usage de l'IA
    aiClassification: 'full',
    techStack: '',
    methodology: '',
    
    // Step 4 - Livrables Multimédias
    youtubeVideoUrl: '',
    hasSubtitles: false,
    subtitlesFile: null as File | null,
    posterFile: null as File | null,
    stillsFiles: [] as File[],
    
    // Step 5 - Équipe
    collaborators: [] as Collaborator[],
  });

  const steps = [
    { number: 1, title: t('submit.step1.title'), icon: User },
    { number: 2, title: t('submit.step2.title'), icon: FileText },
    { number: 3, title: t('submit.step3.title'), icon: Sparkles },
    { number: 4, title: t('submit.step4.title'), icon: Upload },
    { number: 5, title: t('submit.step5.title'), icon: Users },
  ];

  const progress = (currentStep / steps.length) * 100;

  // Calculer l'âge à partir de la date de naissance
  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const isAgeValid = (): boolean => {
    const age = calculateAge(formData.birthDate);
    return age >= 18;
  };

  const addCollaborator = () => {
    setFormData({
      ...formData,
      collaborators: [...formData.collaborators, {
        civility: 'M',
        firstName: '',
        lastName: '',
        profession: '',
        email: '',
      }],
    });
  };

  const removeCollaborator = (index: number) => {
    setFormData({
      ...formData,
      collaborators: formData.collaborators.filter((_, i) => i !== index),
    });
  };

  const updateCollaborator = (index: number, field: keyof Collaborator, value: string) => {
    const updated = [...formData.collaborators];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, collaborators: updated });
  };

  const handleStillsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 3);
    setFormData({ ...formData, stillsFiles: files });
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.civility &&
          formData.firstName &&
          formData.lastName &&
          formData.birthDate &&
          isAgeValid() &&
          formData.email &&
          formData.mobile &&
          formData.street &&
          formData.postalCode &&
          formData.city &&
          formData.country &&
          formData.profession &&
          formData.discoverySource
        );
      case 2:
        return !!(
          formData.titleOriginal &&
          formData.titleEnglish &&
          formData.duration &&
          parseInt(formData.duration) <= 60 &&
          formData.mainLanguage &&
          formData.tags &&
          formData.synopsisOriginal &&
          formData.synopsisOriginal.length <= 300 &&
          formData.synopsisEnglish &&
          formData.synopsisEnglish.length <= 300
        );
      case 3:
        return !!(
          formData.aiClassification &&
          formData.techStack &&
          formData.techStack.length <= 500 &&
          formData.methodology &&
          formData.methodology.length <= 500
        );
      case 4:
        const subtitlesValid = !formData.hasSubtitles || (formData.hasSubtitles && formData.subtitlesFile);
        return !!(
          formData.youtubeVideoUrl &&
          formData.posterFile &&
          subtitlesValid
        );
      case 5:
        return true; // L'équipe est optionnelle
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 5 && validateStep(currentStep)) {
      setCurrentStep((currentStep + 1) as Step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) {
      alert(t('submit.validation.error'));
      return;
    }
    console.log('Form submitted:', formData);
    setShowSuccessDialog(true);
  };

  const seo = seoData[language as 'fr' | 'en'].submit;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        ogType="website"
      />
      
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl mt-[60px]">
        {/* Hero Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-medium mb-3 text-primary">
            {t('submit.hero.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('submit.title')}
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between mb-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              
              return (
                <div
                  key={step.number}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    isCurrent ? 'scale-110' : ''
                  }`}
                >
                  <motion.div
                    animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-300 ${
                      isCurrent
                        ? 'border-primary bg-primary/20 shadow-lg shadow-primary/50'
                        : isCompleted
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted bg-background'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </motion.div>
                  <span className={`text-xs text-center font-medium hidden sm:block ${
                    isCurrent ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="absolute w-full h-0.5 bg-border top-7 left-1/2 hidden md:block" style={{ zIndex: -1 }} />
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-center text-sm text-muted-foreground mt-2">
            {t('submit.step')} {currentStep}/5 - {Math.round(progress)}% {t('submit.progress').toLowerCase()}
          </p>
        </motion.div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-primary/20 shadow-xl shadow-primary/10">
              <CardHeader className="bg-gradient-to-r from-card to-card/50">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <span className="text-primary">{t('submit.step')} {currentStep}:</span>
                  <span>{steps[currentStep - 1].title}</span>
                </CardTitle>
                <CardDescription className="text-base">
                  {t(`submit.step${currentStep}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Step 1: Informations sur le Réalisateur */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Civilité */}
                    <div className="space-y-2">
                      <Label className="text-base">
                        Civilité <span className="text-primary">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.civility}
                        onValueChange={(value) => setFormData({ ...formData, civility: value })}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="M" id="m" />
                          <Label htmlFor="m">M.</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Mme" id="mme" />
                          <Label htmlFor="mme">Mme</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Prénom & Nom */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-base">
                          Prénom <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Jean"
                          className="border-primary/30 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-base">
                          Nom <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Dupont"
                          className="border-primary/30 focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Date de naissance */}
                    <div className="space-y-2">
                      <Label htmlFor="birthDate" className="text-base">
                        Date de naissance <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="border-primary/30 focus:border-primary"
                      />
                      {formData.birthDate && !isAgeValid() && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle className="w-4 h-4" />
                          Vous devez avoir au moins 18 ans pour participer
                        </div>
                      )}
                      {formData.birthDate && isAgeValid() && (
                        <p className="text-sm text-muted-foreground">
                          Âge : {calculateAge(formData.birthDate)} ans ✓
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">
                        Email <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jean.dupont@example.com"
                        className="border-primary/30 focus:border-primary"
                      />
                    </div>

                    {/* Mobile */}
                    <div className="space-y-2">
                      <Label htmlFor="mobile" className="text-base">
                        Mobile <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="+33 6 12 34 56 78"
                        className="border-primary/30 focus:border-primary"
                      />
                    </div>

                    {/* Adresse complète */}
                    <div className="space-y-2">
                      <Label htmlFor="street" className="text-base">
                        Adresse <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="street"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        placeholder="123 Rue de la République"
                        className="border-primary/30 focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-base">
                          Code Postal <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          placeholder="75001"
                          className="border-primary/30 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-base">
                          Ville <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Paris"
                          className="border-primary/30 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-base">
                          Pays <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          placeholder="France"
                          className="border-primary/30 focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Métier actuel */}
                    <div className="space-y-2">
                      <Label htmlFor="profession" className="text-base">
                        Métier actuel <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="profession"
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        placeholder="Réalisateur, Designer, Développeur..."
                        className="border-primary/30 focus:border-primary"
                      />
                    </div>

                    {/* Réseaux sociaux (optionnels) */}
                    <div className="space-y-4 pt-4 border-t border-border">
                      <Label className="text-base">E-réputation & Réseaux (Optionnel)</Label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="youtubeUrl" className="text-sm">YouTube</Label>
                          <Input
                            id="youtubeUrl"
                            value={formData.youtubeUrl}
                            onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                            placeholder="https://youtube.com/@..."
                            className="border-primary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="instagramUrl" className="text-sm">Instagram</Label>
                          <Input
                            id="instagramUrl"
                            value={formData.instagramUrl}
                            onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                            placeholder="https://instagram.com/..."
                            className="border-primary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedinUrl" className="text-sm">LinkedIn</Label>
                          <Input
                            id="linkedinUrl"
                            value={formData.linkedinUrl}
                            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                            placeholder="https://linkedin.com/in/..."
                            className="border-primary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="facebookUrl" className="text-sm">Facebook</Label>
                          <Input
                            id="facebookUrl"
                            value={formData.facebookUrl}
                            onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                            placeholder="https://facebook.com/..."
                            className="border-primary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="xUrl" className="text-sm">X (Twitter)</Label>
                          <Input
                            id="xUrl"
                            value={formData.xUrl}
                            onChange={(e) => setFormData({ ...formData, xUrl: e.target.value })}
                            placeholder="https://x.com/..."
                            className="border-primary/30"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Comment avez-vous connu marsAI */}
                    <div className="space-y-2">
                      <Label htmlFor="discoverySource" className="text-base">
                        Comment avez-vous connu marsAI ? <span className="text-primary">*</span>
                      </Label>
                      <Select
                        value={formData.discoverySource}
                        onValueChange={(value) => setFormData({ ...formData, discoverySource: value })}
                      >
                        <SelectTrigger className="border-primary/30">
                          <SelectValue placeholder="Sélectionnez une option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social-media">Réseaux sociaux</SelectItem>
                          <SelectItem value="search-engine">Moteur de recherche</SelectItem>
                          <SelectItem value="word-of-mouth">Bouche-à-oreille</SelectItem>
                          <SelectItem value="press">Presse / Média</SelectItem>
                          <SelectItem value="festival">Autre festival</SelectItem>
                          <SelectItem value="partner">Partenaire</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Newsletter */}
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => setFormData({ ...formData, newsletter: !!checked })}
                      />
                      <Label htmlFor="newsletter" className="text-sm cursor-pointer">
                        Je souhaite recevoir la newsletter marsAI
                      </Label>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Métadonnées du Film */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Titres */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="titleOriginal" className="text-base">
                          Titre original <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="titleOriginal"
                          value={formData.titleOriginal}
                          onChange={(e) => setFormData({ ...formData, titleOriginal: e.target.value })}
                          placeholder="Le titre de votre film"
                          className="border-primary/30 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="titleEnglish" className="text-base">
                          Traduction anglaise <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="titleEnglish"
                          value={formData.titleEnglish}
                          onChange={(e) => setFormData({ ...formData, titleEnglish: e.target.value })}
                          placeholder="English title"
                          className="border-primary/30 focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Durée */}
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-base">
                        Durée exacte (en secondes) <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="duration"
                        type="number"
                        max="60"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="60"
                        className="border-primary/30 focus:border-primary"
                      />
                      {formData.duration && parseInt(formData.duration) > 60 && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle className="w-4 h-4" />
                          La durée doit être de 60 secondes maximum
                        </div>
                      )}
                      {formData.duration && parseInt(formData.duration) <= 60 && (
                        <p className="text-sm text-muted-foreground">
                          {formData.duration} secondes ({Math.floor(parseInt(formData.duration) / 60)}:{(parseInt(formData.duration) % 60).toString().padStart(2, '0')}) ✓
                        </p>
                      )}
                    </div>

                    {/* Langue principale */}
                    <div className="space-y-2">
                      <Label htmlFor="mainLanguage" className="text-base">
                        Langue parlée/principale du film <span className="text-primary">*</span>
                      </Label>
                      <Select
                        value={formData.mainLanguage}
                        onValueChange={(value) => setFormData({ ...formData, mainLanguage: value })}
                      >
                        <SelectTrigger className="border-primary/30">
                          <SelectValue placeholder="Sélectionnez une langue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">Anglais</SelectItem>
                          <SelectItem value="es">Espagnol</SelectItem>
                          <SelectItem value="de">Allemand</SelectItem>
                          <SelectItem value="it">Italien</SelectItem>
                          <SelectItem value="pt">Portugais</SelectItem>
                          <SelectItem value="zh">Chinois</SelectItem>
                          <SelectItem value="ja">Japonais</SelectItem>
                          <SelectItem value="ko">Coréen</SelectItem>
                          <SelectItem value="ar">Arabe</SelectItem>
                          <SelectItem value="none">Sans dialogue</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tags thématiques */}
                    <div className="space-y-2">
                      <Label htmlFor="tags" className="text-base">
                        Tags sémantiques "Futurs souhaitables" <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="Écologie, Technologie, Humanisme, Innovation..."
                        className="border-primary/30 focus:border-primary"
                      />
                      <p className="text-xs text-muted-foreground">
                        Séparez les tags par des virgules
                      </p>
                    </div>

                    {/* Synopsis langue originale */}
                    <div className="space-y-2">
                      <Label htmlFor="synopsisOriginal" className="text-base">
                        Synopsis langue originale <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="synopsisOriginal"
                        value={formData.synopsisOriginal}
                        onChange={(e) => setFormData({ ...formData, synopsisOriginal: e.target.value })}
                        placeholder="Décrivez votre film en quelques phrases..."
                        maxLength={300}
                        rows={4}
                        className="border-primary/30 focus:border-primary resize-none"
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {formData.synopsisOriginal.length}/300 caractères
                      </p>
                    </div>

                    {/* Synopsis anglais */}
                    <div className="space-y-2">
                      <Label htmlFor="synopsisEnglish" className="text-base">
                        Synopsis anglais <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="synopsisEnglish"
                        value={formData.synopsisEnglish}
                        onChange={(e) => setFormData({ ...formData, synopsisEnglish: e.target.value })}
                        placeholder="Describe your film in a few sentences..."
                        maxLength={300}
                        rows={4}
                        className="border-primary/30 focus:border-primary resize-none"
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {formData.synopsisEnglish.length}/300 caractères
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Déclaration d'Usage de l'IA */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Classification de l'œuvre */}
                    <div className="space-y-4">
                      <Label className="text-base">
                        Classification de l'Œuvre <span className="text-primary">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.aiClassification}
                        onValueChange={(value) => setFormData({ ...formData, aiClassification: value })}
                        className="space-y-3"
                      >
                        <div className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:border-primary transition-colors">
                          <RadioGroupItem value="full" id="full" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="full" className="cursor-pointer">
                              <span className="font-medium">Génération intégrale (100% IA)</span>
                              <p className="text-sm text-muted-foreground mt-1">
                                Le film est entièrement créé par des outils d'intelligence artificielle
                              </p>
                            </Label>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:border-primary transition-colors">
                          <RadioGroupItem value="hybrid" id="hybrid" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="hybrid" className="cursor-pointer">
                              <span className="font-medium">Production hybride (Prises de vues réelles + apports IA)</span>
                              <p className="text-sm text-muted-foreground mt-1">
                                Le film combine des éléments filmés en conditions réelles avec des contributions IA
                              </p>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Stack Technologique */}
                    <div className="space-y-2">
                      <Label htmlFor="techStack" className="text-base">
                        Stack Technologique <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="techStack"
                        value={formData.techStack}
                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                        placeholder="Liste détaillée des outils utilisés : Script (ChatGPT, Claude...), Image (Midjourney, Stable Diffusion...), Animation (Runway, Pika...), Audio (ElevenLabs, Suno...)..."
                        maxLength={500}
                        rows={5}
                        className="border-primary/30 focus:border-primary resize-none"
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {formData.techStack.length}/500 caractères
                      </p>
                    </div>

                    {/* Méthodologie Créative */}
                    <div className="space-y-2">
                      <Label htmlFor="methodology" className="text-base">
                        Méthodologie Créative <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="methodology"
                        value={formData.methodology}
                        onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                        placeholder="Note de production décrivant l'interaction entre l'humain et la machine : processus créatif, prompts utilisés, itérations, choix artistiques..."
                        maxLength={500}
                        rows={6}
                        className="border-primary/30 focus:border-primary resize-none"
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {formData.methodology.length}/500 caractères
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Livrables Multimédias */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* URL YouTube */}
                    <div className="space-y-2">
                      <Label htmlFor="youtubeVideoUrl" className="text-base">
                        URL YouTube du film <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="youtubeVideoUrl"
                        type="url"
                        value={formData.youtubeVideoUrl}
                        onChange={(e) => setFormData({ ...formData, youtubeVideoUrl: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                        className="border-primary/30 focus:border-primary"
                      />
                      <p className="text-xs text-muted-foreground">
                        Format : Public ou Non-répertorié
                      </p>
                    </div>

                    {/* Sous-titres */}
                    <div className="space-y-4 p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasSubtitles"
                          checked={formData.hasSubtitles}
                          onCheckedChange={(checked) => setFormData({ ...formData, hasSubtitles: !!checked })}
                        />
                        <Label htmlFor="hasSubtitles" className="cursor-pointer">
                          Présence de voix ou de textes nécessitant des sous-titres
                        </Label>
                      </div>

                      {formData.hasSubtitles && (
                        <div className="space-y-2 pl-6">
                          <Label htmlFor="subtitlesFile" className="text-base">
                            Fichier de sous-titres (.srt) <span className="text-primary">*</span>
                          </Label>
                          <Input
                            id="subtitlesFile"
                            type="file"
                            accept=".srt"
                            onChange={(e) => setFormData({ ...formData, subtitlesFile: e.target.files?.[0] || null })}
                            className="border-primary/30 focus:border-primary"
                          />
                          {formData.subtitlesFile && (
                            <p className="text-sm text-muted-foreground">
                              Fichier : {formData.subtitlesFile.name} ✓
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Vignette officielle */}
                    <div className="space-y-2">
                      <Label htmlFor="posterFile" className="text-base">
                        Vignette Officielle (16:9) <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="posterFile"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, posterFile: e.target.files?.[0] || null })}
                        className="border-primary/30 focus:border-primary"
                      />
                      {formData.posterFile && (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Fichier : {formData.posterFile.name} ✓
                          </p>
                          <img
                            src={URL.createObjectURL(formData.posterFile)}
                            alt="Aperçu"
                            className="w-full max-w-md rounded-lg border border-border"
                          />
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Format recommandé : 1920x1080px, JPG ou PNG
                      </p>
                    </div>

                    {/* Galerie de captures (stills) */}
                    <div className="space-y-2">
                      <Label htmlFor="stillsFiles" className="text-base">
                        Galerie Médias (jusqu'à 3 captures d'écran)
                      </Label>
                      <Input
                        id="stillsFiles"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleStillsUpload}
                        className="border-primary/30 focus:border-primary"
                      />
                      {formData.stillsFiles.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            {formData.stillsFiles.length} image{formData.stillsFiles.length > 1 ? 's' : ''} sélectionnée{formData.stillsFiles.length > 1 ? 's' : ''} ✓
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {formData.stillsFiles.map((file, index) => (
                              <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt={`Still ${index + 1}`}
                                className="w-full aspect-video object-cover rounded border border-border"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Optionnel - Maximum 3 images
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Composition de l'Équipe */}
                {currentStep === 5 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base">
                          Crédits de l'équipe (Optionnel)
                        </Label>
                        <Button
                          type="button"
                          onClick={addCollaborator}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Ajouter un membre
                        </Button>
                      </div>

                      {formData.collaborators.length === 0 && (
                        <div className="text-center py-8 border border-dashed border-border rounded-lg">
                          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">
                            Aucun collaborateur ajouté
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Cliquez sur "Ajouter un membre" pour commencer
                          </p>
                        </div>
                      )}

                      {formData.collaborators.map((collaborator, index) => (
                        <Card key={index} className="border-primary/20">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">
                                Collaborateur #{index + 1}
                              </CardTitle>
                              <Button
                                type="button"
                                onClick={() => removeCollaborator(index)}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Civilité */}
                            <div className="space-y-2">
                              <Label className="text-sm">Civilité</Label>
                              <RadioGroup
                                value={collaborator.civility}
                                onValueChange={(value) => updateCollaborator(index, 'civility', value)}
                                className="flex gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="M" id={`m-${index}`} />
                                  <Label htmlFor={`m-${index}`} className="text-sm">M.</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Mme" id={`mme-${index}`} />
                                  <Label htmlFor={`mme-${index}`} className="text-sm">Mme</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`collab-firstName-${index}`} className="text-sm">
                                  Prénom
                                </Label>
                                <Input
                                  id={`collab-firstName-${index}`}
                                  value={collaborator.firstName}
                                  onChange={(e) => updateCollaborator(index, 'firstName', e.target.value)}
                                  placeholder="Prénom"
                                  className="border-primary/30"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`collab-lastName-${index}`} className="text-sm">
                                  Nom
                                </Label>
                                <Input
                                  id={`collab-lastName-${index}`}
                                  value={collaborator.lastName}
                                  onChange={(e) => updateCollaborator(index, 'lastName', e.target.value)}
                                  placeholder="Nom"
                                  className="border-primary/30"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`collab-profession-${index}`} className="text-sm">
                                Profession / Fonction
                              </Label>
                              <Input
                                id={`collab-profession-${index}`}
                                value={collaborator.profession}
                                onChange={(e) => updateCollaborator(index, 'profession', e.target.value)}
                                placeholder="Scénariste, Monteur, Sound Designer..."
                                className="border-primary/30"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`collab-email-${index}`} className="text-sm">
                                Email
                              </Label>
                              <Input
                                id={`collab-email-${index}`}
                                type="email"
                                value={collaborator.email}
                                onChange={(e) => updateCollaborator(index, 'email', e.target.value)}
                                placeholder="email@example.com"
                                className="border-primary/30"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-border">
                  <Button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    variant="outline"
                    size="lg"
                    className="gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    {t('submit.previous')}
                  </Button>

                  {currentStep < 5 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateStep(currentStep)}
                      size="lg"
                      className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {t('submit.next')}
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      size="lg"
                      className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/50"
                    >
                      <Check className="w-5 h-5" />
                      {t('submit.submit')}
                    </Button>
                  )}
                </div>

                {/* Validation Warning */}
                {currentStep < 5 && !validateStep(currentStep) && (
                  <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    Veuillez remplir tous les champs obligatoires (*) pour continuer
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[500px] border-primary/20">
          <div className="text-center space-y-6 py-4">
            {/* Animated Success Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-full">
                  <CheckCircle2 className="w-16 h-16 text-primary-foreground" />
                </div>
              </div>
            </motion.div>

            {/* Success Title */}
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Soumission réussie ! 🎉
              </h2>
              <p className="text-muted-foreground">
                Votre film <span className="font-semibold text-foreground">{formData.titleOriginal}</span> a été soumis avec succès
              </p>
            </div>

            {/* Film Details Card */}
            <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Réalisateur</span>
                  <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Titre</span>
                  <span className="font-medium">{formData.titleOriginal}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Durée</span>
                  <span className="font-medium">{formData.duration} secondes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Classification</span>
                  <Badge variant={formData.aiClassification === 'full' ? 'default' : 'secondary'}>
                    {formData.aiClassification === 'full' ? '100% IA' : 'Hybride'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="bg-accent/10 rounded-lg p-4 space-y-2 text-left">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Prochaines étapes
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                <li>• Vous recevrez un email de confirmation à <span className="text-foreground font-medium">{formData.email}</span></li>
                <li>• L'équipe marsAI examinera votre soumission</li>
                <li>• Résultats annoncés le <span className="text-primary font-medium">31 Mai 2026</span></li>
                <li>• Festival : <span className="text-primary font-medium">12-13 Juin 2026</span> à Marseille</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                onClick={() => {
                  setShowSuccessDialog(false);
                  window.location.href = '/';
                }}
                size="lg"
                className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/50"
              >
                <Film className="w-5 h-5" />
                Retour à l'accueil
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowSuccessDialog(false);
                  setCurrentStep(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                size="lg"
                variant="outline"
                className="flex-1 gap-2"
              >
                <Plus className="w-5 h-5" />
                Soumettre un autre film
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}