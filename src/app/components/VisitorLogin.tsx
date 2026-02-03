import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';

export function VisitorLogin() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = language === 'fr' ? 'Email requis' : 'Email required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = language === 'fr' ? 'Email invalide' : 'Invalid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = language === 'fr' ? 'Mot de passe requis' : 'Password required';
    } else if (formData.password.length < 6) {
      newErrors.password = language === 'fr' ? 'Minimum 6 caractères' : 'Minimum 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Login:', formData);
      // Redirect to events page after successful login
      navigate('/events');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset requested for:', formData.email);
    alert(language === 'fr' 
      ? 'Un email de réinitialisation a été envoyé à votre adresse.' 
      : 'A password reset email has been sent to your address.');
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-[60px]" role="main">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
              <LogIn className="w-8 h-8 md:w-10 md:h-10 text-accent" aria-hidden="true" />
              {language === 'fr' ? 'Connexion' : 'Login'}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {language === 'fr' 
                ? 'Accédez à votre espace personnel pour réserver vos places aux événements marsAI 2026'
                : 'Access your personal space to reserve your seats for marsAI 2026 events'}
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-primary/30 bg-card/50 backdrop-blur-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl md:text-2xl">
                  {showForgotPassword 
                    ? (language === 'fr' ? 'Mot de passe oublié' : 'Forgot Password')
                    : (language === 'fr' ? 'Se Connecter' : 'Sign In')
                  }
                </CardTitle>
                <CardDescription>
                  {showForgotPassword
                    ? (language === 'fr' 
                        ? 'Entrez votre email pour réinitialiser votre mot de passe' 
                        : 'Enter your email to reset your password')
                    : (language === 'fr'
                        ? 'Connectez-vous à votre compte pour accéder aux événements'
                        : 'Sign in to your account to access events')
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Forgot Password Form */}
                {showForgotPassword ? (
                  <form onSubmit={handleForgotPassword} className="space-y-4" noValidate>
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="forgot-email" className="flex items-center gap-1 text-base">
                        Email
                        <span className="text-destructive" aria-label={language === 'fr' ? 'requis' : 'required'}>*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="forgot-email"
                          type="email"
                          placeholder="contact@example.com"
                          className={`pl-10 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'forgot-email-error' : undefined}
                        />
                      </div>
                      {errors.email && (
                        <p id="forgot-email-error" className="text-sm text-destructive flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3 pt-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        size="lg"
                        aria-label={language === 'fr' ? 'Envoyer le lien de réinitialisation' : 'Send reset link'}
                      >
                        {language === 'fr' ? 'Envoyer le lien' : 'Send Reset Link'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowForgotPassword(false)}
                        aria-label={language === 'fr' ? 'Retour à la connexion' : 'Back to login'}
                      >
                        {language === 'fr' ? 'Retour à la connexion' : 'Back to Login'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  /* Login Form */
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-1 text-base">
                        Email
                        <span className="text-destructive" aria-label={language === 'fr' ? 'requis' : 'required'}>*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="contact@example.com"
                          className={`pl-10 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                      </div>
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="flex items-center gap-1 text-base">
                        {language === 'fr' ? 'Mot de passe' : 'Password'}
                        <span className="text-destructive" aria-label={language === 'fr' ? 'requis' : 'required'}>*</span>
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className={`pl-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          required
                          aria-required="true"
                          aria-invalid={!!errors.password}
                          aria-describedby={errors.password ? 'password-error password-hint' : 'password-hint'}
                        />
                      </div>
                      {errors.password ? (
                        <p id="password-error" className="text-sm text-destructive flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" />
                          {errors.password}
                        </p>
                      ) : (
                        <p id="password-hint" className="text-xs text-muted-foreground">
                          {language === 'fr' ? 'Minimum 6 caractères' : 'Minimum 6 characters'}
                        </p>
                      )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="rememberMe"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                          aria-label={language === 'fr' ? 'Se souvenir de moi' : 'Remember me'}
                        />
                        <Label
                          htmlFor="rememberMe"
                          className="text-sm font-normal cursor-pointer"
                        >
                          {language === 'fr' ? 'Se souvenir de moi' : 'Remember me'}
                        </Label>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-primary hover:text-primary/80 font-medium focus:outline-none focus:underline"
                        aria-label={language === 'fr' ? 'Mot de passe oublié' : 'Forgot password'}
                      >
                        {language === 'fr' ? 'Mot de passe oublié ?' : 'Forgot password?'}
                      </button>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 transition-all"
                      size="lg"
                      aria-label={language === 'fr' ? 'Se connecter' : 'Sign in'}
                    >
                      <LogIn className="w-4 h-4 mr-2" aria-hidden="true" />
                      {language === 'fr' ? 'Se Connecter' : 'Sign In'}
                    </Button>

                    {/* Sign Up Link */}
                    <div className="text-center pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground mb-2">
                        {language === 'fr' ? 'Pas encore de compte ?' : "Don't have an account?"}
                      </p>
                      <Link to="/events">
                        <Button
                          type="button"
                          variant="link"
                          className="text-primary hover:text-primary/80 font-semibold"
                          aria-label={language === 'fr' ? "S'inscrire aux événements" : 'Register for events'}
                        >
                          {language === 'fr' ? "S'inscrire aux Événements" : 'Register for Events'}
                        </Button>
                      </Link>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}