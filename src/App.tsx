import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './app/contexts/LanguageContext.js';
import { AdminDashboard } from './app/components/AdminDashboard.js';
import { LandingPage } from './app/components/LandingPage.js';
import { SubmissionForm } from './app/components/SubmissionForm.js';
import { JuryInterface } from './app/components/JuryInterface.js';
import { SuperAdminCMS } from './app/components/SuperAdminCMS.js';
import { EventRegistration } from './app/components/EventRegistration.js';
import { VisitorLogin } from './app/components/VisitorLogin.js';
import { AboutPage } from './app/components/AboutPage.js';
import { NotFound } from './app/components/NotFound.js';
import { LanguageDemo } from './app/components/LanguageDemo.js';
import { LogoShowcase } from './app/components/LogoShowcase.js';
import './styles/fonts.css';
import './styles/tailwind.css';
import './styles/theme.css';


export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/super-admin" element={<SuperAdminCMS />} />
            <Route path="/submit" element={<SubmissionForm />} />
            <Route path="/jury" element={<JuryInterface />} />
            <Route path="/login" element={<VisitorLogin />} />
            <Route path="/events" element={<EventRegistration />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/language-demo" element={<LanguageDemo />} />
            <Route path="/logo-showcase" element={<LogoShowcase />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
