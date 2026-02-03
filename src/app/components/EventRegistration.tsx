import { useState } from 'react';
import { Calendar, Users, Award, Mail, User, Phone, Check, Sparkles, Video, GraduationCap, X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.js';
import { Button } from '../components/ui/button.js';
import { Input } from '../components/ui/input.js';
import { Label } from '../components/ui/label.js';
import { Badge } from '../components/ui/badge.js';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog.js';
import { useLanguage } from '../contexts/LanguageContext.js';
import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';

interface EventBooking {
  eventId: string;
  date: Date;
  time: string;
}

export function EventRegistration() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    events: {
      contest: false,
      masterclass: false,
      conferences: false,
      closingCeremony: false
    }
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedEventForBooking, setSelectedEventForBooking] = useState<string | null>(null);
  const [bookings, setBookings] = useState<EventBooking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Track reserved seats per event
  const [reservedSeats, setReservedSeats] = useState<Record<string, number>>({
    contest: 0,
    masterclass: 0,
    conferences: 0,
    closingCeremony: 0
  });

  // Cancel booking state
  const [showCancelBooking, setShowCancelBooking] = useState(false);
  const [cancelEmail, setCancelEmail] = useState('');

  const handleEventChange = (event: keyof typeof formData.events) => {
    setFormData({
      ...formData,
      events: {
        ...formData.events,
        [event]: !formData.events[event]
      }
    });
  };

  const openBookingModal = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEventForBooking(eventId);
    setSelectedDate(null);
    setSelectedTime('');
  };

  const closeBookingModal = () => {
    setSelectedEventForBooking(null);
    setSelectedDate(null);
    setSelectedTime('');
  };

  const confirmBooking = () => {
    if (selectedEventForBooking && selectedDate && selectedTime) {
      const newBooking: EventBooking = {
        eventId: selectedEventForBooking,
        date: selectedDate,
        time: selectedTime
      };
      setBookings([...bookings, newBooking]);
      
      // Increment reserved seats
      setReservedSeats(prev => ({
        ...prev,
        [selectedEventForBooking]: prev[selectedEventForBooking as keyof typeof prev] + 1
      }));
      
      // Auto-select the event
      setFormData({
        ...formData,
        events: {
          ...formData.events,
          [selectedEventForBooking]: true
        }
      });
      
      closeBookingModal();
    }
  };

  const getEventCapacity = (eventId: string): { total: number; reserved: number; available: number } => {
    const capacities: Record<string, number> = {
      contest: 500,
      masterclass: 200,
      conferences: 800,
      closingCeremony: 1000
    };
    const total = capacities[eventId] || 0;
    const reserved = reservedSeats[eventId as keyof typeof reservedSeats] || 0;
    return { total, reserved, available: total - reserved };
  };

  const getAvailableTimeSlots = (eventId: string): string[] => {
    const timeSlots: Record<string, string[]> = {
      contest: ['14:00', '14:30', '15:00', '15:30'],
      masterclass: ['10:00', '10:30', '11:00', '11:30'],
      conferences: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      closingCeremony: ['19:00', '19:30', '20:00']
    };
    return timeSlots[eventId] || [];
  };

  const generateCalendarDays = (): Date[] => {
    const days: Date[] = [];
    const june12 = new Date(2026, 5, 12); // June 12, 2026
    const june13 = new Date(2026, 5, 13); // June 13, 2026
    days.push(june12, june13);
    return days;
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', options);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Event Registration:', formData);
    setSubmitted(true);
  };

  const events = [
    {
      id: 'contest' as const,
      icon: Video,
      title: language === 'fr' ? 'Concours de Films' : 'Film Contest',
      description: language === 'fr' 
        ? 'Assistez à la projection des films finalistes en compétition'
        : 'Attend the screening of finalist films in competition',
      date: language === 'fr' ? '12 Juin 2026 - 14h00' : 'June 12, 2026 - 2:00 PM',
      capacity: '500 places',
      color: 'primary'
    },
    {
      id: 'masterclass' as const,
      icon: GraduationCap,
      title: 'Masterclass',
      description: language === 'fr'
        ? 'Ateliers pratiques avec des experts en IA générative'
        : 'Practical workshops with generative AI experts',
      date: language === 'fr' ? '12 Juin 2026 - 10h00' : 'June 12, 2026 - 10:00 AM',
      capacity: '200 places',
      color: 'accent'
    },
    {
      id: 'conferences' as const,
      icon: Users,
      title: language === 'fr' ? 'Conférences' : 'Conferences',
      description: language === 'fr'
        ? 'Panels et discussions sur le futur du cinéma IA'
        : 'Panels and discussions on the future of AI cinema',
      date: language === 'fr' ? '12-13 Juin 2026' : 'June 12-13, 2026',
      capacity: '800 places',
      color: 'primary'
    },
    {
      id: 'closingCeremony' as const,
      icon: Award,
      title: language === 'fr' ? 'Soirée de Clôture - marsAI Night' : 'Closing Ceremony - marsAI Night',
      description: language === 'fr'
        ? 'Remise du prix du Lauréat de 50 000$ + networking'
        : 'Winner Prize of $50,000 award ceremony + networking',
      date: language === 'fr' ? '13 Juin 2026 - 19h00' : 'June 13, 2026 - 7:00 PM',
      capacity: '1000 places',
      color: 'yellow',
      featured: true
    }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 mt-[60px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="border-green-500/50 bg-green-500/10">
              <CardContent className="p-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {language === 'fr' ? 'Inscription confirmée !' : 'Registration confirmed!'}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {language === 'fr'
                    ? 'Vous recevrez un email de confirmation avec tous les détails de votre inscription.'
                    : 'You will receive a confirmation email with all the details of your registration.'}
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="border-green-500/50"
                >
                  {language === 'fr' ? 'Nouvelle inscription' : 'New registration'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 mt-[60px] max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {language === 'fr' ? 'Inscription aux Événements' : 'Event Registration'}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Festival International marsAI 2026 - 12-13 Juin à Marseille'
              : 'marsAI International Festival 2026 - June 12-13 in Marseille'}
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <Badge className="bg-primary/20 text-primary border-primary/30 text-sm py-1 px-3">
              <Users className="w-4 h-4 mr-2" />
              {language === 'fr' ? '3000 Visiteurs attendus' : '3000 Expected Visitors'}
            </Badge>
            <Badge className="bg-accent/20 text-accent border-accent/30 text-sm py-1 px-3">
              <Calendar className="w-4 h-4 mr-2" />
              {language === 'fr' ? '2 Jours' : '2 Days'}
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold mb-6">
              {language === 'fr' ? 'Sélectionnez vos événements' : 'Select your events'}
            </h2>

            {events.map((event, index) => {
              const Icon = event.icon;
              const isSelected = formData.events[event.id];
              const capacity = getEventCapacity(event.id);
              const hasBooking = bookings.some(b => b.eventId === event.id);
              const booking = bookings.find(b => b.eventId === event.id);

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`transition-all ${
                      hasBooking
                        ? 'border-primary bg-primary/5'
                        : 'border-border/50 hover:border-primary/50'
                    } ${event.featured ? 'ring-2 ring-yellow-500/50' : ''}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            event.color === 'yellow'
                              ? 'bg-yellow-500/10'
                              : event.color === 'accent'
                              ? 'bg-accent/10'
                              : 'bg-primary/10'
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              event.color === 'yellow'
                                ? 'text-yellow-500'
                                : event.color === 'accent'
                                ? 'text-accent'
                                : 'text-primary'
                            }`}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            {event.featured && (
                              <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">
                                <Award className="w-3 h-3 mr-1" aria-hidden="true" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" aria-hidden="true" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" aria-hidden="true" />
                              {capacity.available} / {capacity.total} {language === 'fr' ? 'places disponibles' : 'seats available'}
                            </span>
                          </div>
                          
                          {/* Booking Status & Button */}
                          <div className="flex items-center gap-2 mt-3">
                            {hasBooking && booking ? (
                              <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
                                <Calendar className="w-3 h-3 mr-1" aria-hidden="true" />
                                {formatDate(booking.date)} - {booking.time}
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                onClick={(e) => openBookingModal(event.id, e)}
                                className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30"
                                aria-label={language === 'fr' 
                                  ? `Réserver une place pour ${event.title}` 
                                  : `Book a seat for ${event.title}`}
                              >
                                <Calendar className="w-3 h-3 mr-1" aria-hidden="true" />
                                {language === 'fr' ? 'Réserver une place' : 'Book a seat'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>
                  {language === 'fr' ? 'Vos informations' : 'Your information'}
                </CardTitle>
                <CardDescription>
                  {language === 'fr'
                    ? 'Remplissez le formulaire pour finaliser votre inscription'
                    : 'Fill out the form to finalize your registration'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm">
                      {language === 'fr' ? 'Prénom *' : 'First Name *'}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="pl-10 border-border/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm">
                      {language === 'fr' ? 'Nom *' : 'Last Name *'}
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="border-border/50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">
                      Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 border-border/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm">
                      {language === 'fr' ? 'Téléphone *' : 'Phone *'}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10 border-border/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm">
                      {language === 'fr' ? 'Entreprise (optionnel)' : 'Company (optional)'}
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="border-border/50"
                    />
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-3">
                      {language === 'fr'
                        ? `${Object.values(formData.events).filter(Boolean).length} événement(s) sélectionné(s)`
                        : `${Object.values(formData.events).filter(Boolean).length} event(s) selected`}
                    </p>
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={Object.values(formData.events).every(v => !v)}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Confirmer mon inscription' : 'Confirm my registration'}
                    </Button>
                    
                    {/* Cancel Booking Link */}
                    <div className="text-center mt-3">
                      <button
                        type="button"
                        onClick={() => setShowCancelBooking(true)}
                        className="text-sm text-muted-foreground hover:text-destructive font-medium focus:outline-none focus:underline transition-colors"
                        aria-label={language === 'fr' ? 'Annuler ma réservation' : 'Cancel my booking'}
                      >
                        {language === 'fr' ? 'Annuler ma réservation ?' : 'Cancel my booking?'}
                      </button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Cancel Booking Modal */}
      <Dialog open={showCancelBooking} onOpenChange={setShowCancelBooking}>
        <DialogContent 
          className="sm:max-w-[450px]"
          aria-describedby="cancel-booking-description"
        >
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Annuler ma réservation' : 'Cancel my booking'}
            </DialogTitle>
            <DialogDescription id="cancel-booking-description">
              {language === 'fr'
                ? 'Entrez votre email pour annuler votre réservation'
                : 'Enter your email to cancel your booking'}
            </DialogDescription>
          </DialogHeader>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Cancel booking for:', cancelEmail);
              alert(language === 'fr' 
                ? 'Votre réservation a été annulée avec succès.' 
                : 'Your booking has been cancelled successfully.');
              setCancelEmail('');
              setShowCancelBooking(false);
            }} 
            className="space-y-4 py-4"
          >
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="cancel-email" className="text-base">
                Email
                <span className="text-destructive ml-1" aria-label={language === 'fr' ? 'requis' : 'required'}>*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="cancel-email"
                  type="email"
                  placeholder="contact@example.com"
                  className="pl-10"
                  value={cancelEmail}
                  onChange={(e) => setCancelEmail(e.target.value)}
                  required
                  aria-required="true"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {language === 'fr'
                  ? 'Un email de confirmation d\'annulation vous sera envoyé'
                  : 'A cancellation confirmation email will be sent to you'}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCancelEmail('');
                  setShowCancelBooking(false);
                }}
                className="flex-1"
                aria-label={language === 'fr' ? 'Retour' : 'Back'}
              >
                {language === 'fr' ? 'Retour' : 'Back'}
              </Button>
              <Button
                type="submit"
                variant="destructive"
                className="flex-1"
                aria-label={language === 'fr' ? 'Confirmer l\'annulation' : 'Confirm cancellation'}
              >
                <X className="w-4 h-4 mr-2" aria-hidden="true" />
                {language === 'fr' ? 'Annuler ma réservation' : 'Cancel booking'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}