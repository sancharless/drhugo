import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AudienceIdent } from './components/AudienceIdent';
import { AboutDoctor } from './components/AboutDoctor';
import { Services } from './components/Services';
import { HowItWorks } from './components/HowItWorks';
import { EducationalSection } from './components/EducationalSection';
import { FAQ } from './components/FAQ';
import { LeadForm } from './components/LeadForm';
import { Locations } from './components/Locations';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { CookieBanner } from './components/CookieBanner';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsOfUseModal } from './components/TermsOfUseModal';
import { PreLaunchChecklistModal } from './components/PreLaunchChecklistModal';
import { ThankYouPage } from './components/ThankYouPage';
import { ConsentProvider } from './context/ConsentContext';
import { captureAndPersistUtms, trackCustomEvent } from './utils/tracking';

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'obrigado'>('home');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [checklistModalOpen, setChecklistModalOpen] = useState(false);

  useEffect(() => {
    // 1. Captura e persiste UTMs da URL
    captureAndPersistUtms();

    // 2. Rastreia PageView inicial
    trackCustomEvent('PageView_Landing');

    // 3. Suporte a rotas por pathname ou hash
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/obrigado' || hash === '#/obrigado' || hash === '#obrigado') {
        setCurrentPage('obrigado');
      } else {
        setCurrentPage('home');
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const navigateTo = (page: 'home' | 'obrigado') => {
    setCurrentPage(page);
    if (page === 'obrigado') {
      window.history.pushState({}, '', '#/obrigado');
    } else {
      window.history.pushState({}, '', window.location.pathname.replace('/obrigado', '') || '/');
    }
  };

  return (
    <ConsentProvider>
      <div className="min-h-screen bg-medical-bg text-slate-800 flex flex-col selection:bg-petroleum/20 selection:text-navy-900">
        
        {currentPage === 'obrigado' ? (
          <ThankYouPage onBackToHome={() => navigateTo('home')} />
        ) : (
          <>
            {/* Cabeçalho Fixo Minimalista */}
            <Header onOpenChecklist={() => setChecklistModalOpen(true)} />

            <main className="flex-grow">
              {/* 1. Primeira Dobra - Hero */}
              <Hero />

              {/* 2. Bloco de Identificação com o Visitante (Quando Procurar) */}
              <AudienceIdent />

              {/* 3. Seção Sobre o Médico */}
              <AboutDoctor />

              {/* 4. Seção de Atendimentos e Exames */}
              <Services />

              {/* 5. Seção "Como Funciona" */}
              <HowItWorks />

              {/* 6. Seção Educativa de Prevenção */}
              <EducationalSection />

              {/* 7. Perguntas Frequentes (FAQ) */}
              <FAQ />

              {/* 8. Formulário de Captura */}
              <LeadForm
                onSuccessRedirect={() => navigateTo('obrigado')}
                onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
              />

              {/* 9. Localização e Consultório */}
              <Locations />

              {/* 10. Chamada Final */}
              <FinalCTA />
            </main>

            {/* Rodapé Institucional Completo */}
            <Footer
              onOpenPrivacy={() => setPrivacyModalOpen(true)}
              onOpenTerms={() => setTermsModalOpen(true)}
              onOpenChecklist={() => setChecklistModalOpen(true)}
            />

            {/* Recursos de Conversão e Suporte */}
            <FloatingWhatsApp />
            <MobileStickyCTA />
            <CookieBanner />

            {/* Modais de Políticas e Termos */}
            <PrivacyPolicyModal
              isOpen={privacyModalOpen}
              onClose={() => setPrivacyModalOpen(false)}
            />
            <TermsOfUseModal
              isOpen={termsModalOpen}
              onClose={() => setTermsModalOpen(false)}
            />

            {/* Modal de Checklist Pré-Lançamento */}
            <PreLaunchChecklistModal
              isOpen={checklistModalOpen}
              onClose={() => setChecklistModalOpen(false)}
            />
          </>
        )}

      </div>
    </ConsentProvider>
  );
}

export default App;
