import { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../components/ui/card.js';
import { useLanguage } from '../contexts/LanguageContext.js';
interface CountdownTimerProps {
  deadline: Date;
  onExpired?: () => void;
}

export function CountdownTimer({ deadline, onExpired }: CountdownTimerProps) {
  const { language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const deadlineTime = deadline.getTime();
      const difference = deadlineTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        if (onExpired) onExpired();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [deadline, onExpired]);

  if (timeLeft.expired) {
    return (
      <Card className="bg-red-500/10 border-red-500/50">
        <CardContent className="p-6 text-center">
          <Clock className="w-12 h-12 mx-auto mb-3 text-red-400" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-red-400 mb-2">
            {language === 'fr' ? 'Période de soumission terminée' : 'Submission period ended'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'fr' 
              ? 'Les soumissions sont maintenant fermées. Rendez-vous l\'année prochaine !' 
              : 'Submissions are now closed. See you next year!'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 backdrop-blur-sm">
      <CardContent className="p-3 md:p-4">
        <div 
          className="grid grid-cols-4 gap-1.5 md:gap-2"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
          aria-label={language === 'fr' 
            ? `Temps restant : ${timeLeft.days} jours, ${timeLeft.hours} heures, ${timeLeft.minutes} minutes, ${timeLeft.seconds} secondes`
            : `Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`
          }
        >
          {/* Days */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="bg-background/50 backdrop-blur-sm rounded-md p-1.5 md:p-2 border border-primary/20">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary leading-none mb-0.5" aria-hidden="true">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide leading-none">
                {language === 'fr' ? 'Jours' : 'Days'}
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-background/50 backdrop-blur-sm rounded-md p-1.5 md:p-2 border border-primary/20">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary leading-none mb-0.5" aria-hidden="true">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide leading-none">
                {language === 'fr' ? 'Heures' : 'Hours'}
              </div>
            </div>
          </motion.div>

          {/* Minutes */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-background/50 backdrop-blur-sm rounded-md p-1.5 md:p-2 border border-primary/20">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-accent leading-none mb-0.5" aria-hidden="true">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide leading-none">
                {language === 'fr' ? 'Min' : 'Min'}
              </div>
            </div>
          </motion.div>

          {/* Seconds */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-background/50 backdrop-blur-sm rounded-md p-1.5 md:p-2 border border-accent/20">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-accent leading-none mb-0.5" aria-hidden="true">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide leading-none">
                {language === 'fr' ? 'Sec' : 'Sec'}
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}