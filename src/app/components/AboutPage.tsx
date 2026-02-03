import { motion } from 'motion/react';
import { Sparkles, Target, History, Users, Award, Globe, Mail, MapPin, Calendar, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.js';
import { Badge } from '../components/ui/badge.js';
import { Button } from '../components/ui/button.js';
import { useLanguage } from '../contexts/LanguageContext.js';
import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';

export function AboutPage() {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Calendar,
      value: '2025',
      label: language === 'fr' ? 'Année de Création' : 'Year Founded'
    },
    {
      icon: Globe,
      value: '120+',
      label: language === 'fr' ? 'Pays Représentés' : 'Countries Represented'
    },
    {
      icon: Users,
      value: '600+',
      label: language === 'fr' ? 'Films Soumis' : 'Films Submitted'
    },
    {
      icon: Award,
      value: '50 000$',
      label: language === 'fr' ? 'Prix du Lauréat' : 'Winner Prize'
    }
  ];

  const values = [
    {
      icon: Sparkles,
      title: language === 'fr' ? 'Innovation' : 'Innovation',
      description: language === 'fr' 
        ? 'Célébrer les avancées technologiques dans la création cinématographique'
        : 'Celebrate technological advances in filmmaking'
    },
    {
      icon: Heart,
      title: language === 'fr' ? 'Créativité' : 'Creativity',
      description: language === 'fr'
        ? 'Promouvoir l\'expression artistique à travers l\'intelligence artificielle'
        : 'Promote artistic expression through artificial intelligence'
    },
    {
      icon: Users,
      title: language === 'fr' ? 'Communauté' : 'Community',
      description: language === 'fr'
        ? 'Rassembler créateurs, experts et passionnés du monde entier'
        : 'Bring together creators, experts and enthusiasts from around the world'
    },
    {
      icon: Target,
      title: language === 'fr' ? 'Excellence' : 'Excellence',
      description: language === 'fr'
        ? 'Encourager la qualité et l\'originalité dans chaque production'
        : 'Encourage quality and originality in every production'
    }
  ];

  const team = [
    {
      name: 'Jean Dupont',
      role: language === 'fr' ? 'Fondateur & Directeur' : 'Founder & Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: language === 'fr'
        ? 'Passionné de cinéma et d\'IA depuis 15 ans, Jean a fondé marsAI pour créer un pont entre art et technologie.'
        : 'Passionate about cinema and AI for 15 years, Jean founded marsAI to create a bridge between art and technology.'
    },
    {
      name: 'Sophie Martin',
      role: language === 'fr' ? 'Directrice Artistique' : 'Artistic Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: language === 'fr'
        ? 'Réalisatrice primée, Sophie apporte son expertise créative pour sélectionner les meilleures œuvres.'
        : 'Award-winning director, Sophie brings her creative expertise to select the best works.'
    },
    {
      name: 'Thomas Chen',
      role: language === 'fr' ? 'Directeur Technique' : 'Technical Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: language === 'fr'
        ? 'Expert en IA générative, Thomas assure la qualité technique de la plateforme et des évaluations.'
        : 'Expert in generative AI, Thomas ensures the technical quality of the platform and evaluations.'
    }
  ];

  const timeline = [
    {
      year: '2025',
      title: language === 'fr' ? 'Naissance de marsAI' : 'Birth of marsAI',
      description: language === 'fr'
        ? 'Création du premier festival international dédié au cinéma généré par IA'
        : 'Creation of the first international festival dedicated to AI-generated cinema'
    },
    {
      year: '2026',
      title: language === 'fr' ? 'Première Édition' : 'First Edition',
      description: language === 'fr'
        ? 'Lancement à Marseille avec 600+ films de 120 pays'
        : 'Launch in Marseille with 600+ films from 120 countries'
    },
    {
      year: '2027',
      title: language === 'fr' ? 'Expansion Internationale' : 'International Expansion',
      description: language === 'fr'
        ? 'Nouvelles éditions à Lyon et autres villes européennes'
        : 'New editions in Lyon and other European cities'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 mt-[60px]" role="main">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-16 md:py-24">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" aria-hidden="true" />
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/50" aria-label="marsAI Festival">
                <Sparkles className="w-3 h-3 mr-1" aria-hidden="true" />
                marsAI Festival
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {language === 'fr' ? 'À Propos de marsAI' : 'About marsAI'}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {language === 'fr'
                  ? 'Le premier festival international célébrant la créativité et l\'innovation dans le cinéma généré par intelligence artificielle'
                  : 'The first international festival celebrating creativity and innovation in AI-generated cinema'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-16 border-y border-border/50 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" aria-hidden="true" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
                  <Target className="w-8 h-8 text-accent" aria-hidden="true" />
                  {language === 'fr' ? 'Notre Mission' : 'Our Mission'}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {language === 'fr'
                      ? 'marsAI est né d\'une conviction profonde : l\'intelligence artificielle n\'est pas une menace pour la créativité, mais un outil révolutionnaire qui ouvre de nouvelles possibilités artistiques.'
                      : 'marsAI was born from a deep conviction: artificial intelligence is not a threat to creativity, but a revolutionary tool that opens up new artistic possibilities.'}
                  </p>
                  <p>
                    {language === 'fr'
                      ? 'Notre mission est de célébrer, promouvoir et démocratiser le cinéma généré par IA en offrant une plateforme internationale où réalisateurs, experts et passionnés peuvent partager leurs visions du futur du 7ème art.'
                      : 'Our mission is to celebrate, promote and democratize AI-generated cinema by providing an international platform where directors, experts and enthusiasts can share their visions of the future of the 7th art.'}
                  </p>
                  <p>
                    {language === 'fr'
                      ? 'Chaque année, nous réunissons les meilleures créations du monde entier pour inspirer, questionner et imaginer ensemble le cinéma de demain.'
                      : 'Every year, we bring together the best creations from around the world to inspire, question and imagine together the cinema of tomorrow.'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800"
                  alt={language === 'fr' ? 'Festival marsAI' : 'marsAI Festival'}
                  className="rounded-lg shadow-2xl w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-lg" aria-hidden="true" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 md:py-20 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'fr' ? 'Nos Valeurs' : 'Our Values'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'fr'
                  ? 'Les principes qui guident notre festival et notre communauté'
                  : 'The principles that guide our festival and our community'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border-primary/30 bg-background/50 h-full hover:border-primary/50 transition-all">
                      <CardContent className="p-6 text-center">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <Users className="w-8 h-8 text-accent" aria-hidden="true" />
                {language === 'fr' ? 'Notre Équipe' : 'Our Team'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'fr'
                  ? 'Les passionnés qui font vivre marsAI au quotidien'
                  : 'The passionate people who bring marsAI to life every day'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/50 h-full overflow-hidden hover:border-accent/50 transition-all group">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                      <p className="text-sm text-accent font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-background via-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <History className="w-8 h-8 text-primary" aria-hidden="true" />
                {language === 'fr' ? 'Notre Histoire' : 'Our History'}
              </h2>
            </motion.div>

            <div className="space-y-8">
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="border-primary/30 bg-background/50 overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                            <span className="text-lg font-bold text-primary">{event.year}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <p className="text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
              </h2>
              <p className="text-lg text-muted-foreground">
                {language === 'fr'
                  ? 'Une question ? Une suggestion ? N\'hésitez pas à nous contacter'
                  : 'A question? A suggestion? Don\'t hesitate to contact us'}
              </p>
            </motion.div>

            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <a 
                        href="mailto:contact@marsai.fr" 
                        className="text-accent hover:text-accent/80 transition-colors"
                        aria-label={language === 'fr' ? 'Envoyer un email' : 'Send an email'}
                      >
                        contact@marsai.fr
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        {language === 'fr' ? 'Adresse' : 'Address'}
                      </h3>
                      <p className="text-muted-foreground">
                        Marseille, France
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button 
                    size="lg" 
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    asChild
                  >
                    <a href="mailto:contact@marsai.fr">
                      <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                      {language === 'fr' ? 'Nous Écrire' : 'Write to Us'}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
