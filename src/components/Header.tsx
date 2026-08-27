import React, { useState } from 'react';
import { HeartPulse, Menu, X, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { handleWhatsAppClick } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface HeaderProps {
  onOpenChecklist?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenChecklist }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logotipo / Assinatura Médica */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-petroleum/30 rounded-xl p-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-navy-800 to-petroleum flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0">
              <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-sage-light" />
            </div>
            <div>
              <div className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-navy-900 leading-tight">
                {siteConfig.doctor.name}
              </div>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-petroleum">
                <span>Cardiologia</span>
                <span className="text-slate-300">•</span>
                <span>Ecocardiografia</span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="hidden sm:inline text-slate-500 font-medium">{siteConfig.doctor.crm}</span>
              </div>
            </div>
          </a>

          {/* Links de Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => scrollTo('sobre')}
              className="px-3 py-2 rounded-lg hover:text-navy-900 hover:bg-slate-100/60 transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollTo('quando-procurar')}
              className="px-3 py-2 rounded-lg hover:text-navy-900 hover:bg-slate-100/60 transition-colors"
            >
              Quando Procurar
            </button>
            <button
              onClick={() => scrollTo('atendimento')}
              className="px-3 py-2 rounded-lg hover:text-navy-900 hover:bg-slate-100/60 transition-colors"
            >
              Atendimento
            </button>
            <button
              onClick={() => scrollTo('localizacao')}
              className="px-3 py-2 rounded-lg hover:text-navy-900 hover:bg-slate-100/60 transition-colors"
            >
              Localização
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="px-3 py-2 rounded-lg hover:text-navy-900 hover:bg-slate-100/60 transition-colors"
            >
              Dúvidas
            </button>
          </nav>

          {/* Botão CTA Principal Header Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenChecklist && (
              <button
                onClick={onOpenChecklist}
                title="Checklist Pré-Lançamento"
                className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-petroleum bg-slate-100 hover:bg-petroleum/10 px-3 py-2 rounded-lg transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-petroleum" />
                <span>Checklist CFM</span>
              </button>
            )}

            <button
              onClick={() => handleWhatsAppClick('hero_whatsapp')}
              id="header-cta-button"
              className="inline-flex items-center justify-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-glow-whatsapp transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <WhatsAppIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span>Agendar consulta</span>
            </button>
          </div>

          {/* Botão Mobile Hamburger & Quick WhatsApp */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={() => handleWhatsAppClick('hero_whatsapp')}
              aria-label="WhatsApp"
              className="p-2 rounded-xl bg-[#25D366] text-white shadow-xs active:scale-95 transition-transform"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Retrátil */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-1 gap-1 text-sm font-semibold text-slate-700">
            <button
              onClick={() => scrollTo('sobre')}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              Sobre o Dr. Hugo
            </button>
            <button
              onClick={() => scrollTo('quando-procurar')}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              Quando Procurar
            </button>
            <button
              onClick={() => scrollTo('atendimento')}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              Atendimento e Exames
            </button>
            <button
              onClick={() => scrollTo('localizacao')}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              Localização
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              Perguntas Frequentes
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick('hero_whatsapp');
              }}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-md"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Agendar pelo WhatsApp</span>
            </button>

            {onOpenChecklist && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChecklist();
                }}
                className="w-full text-center text-xs text-slate-500 hover:text-petroleum py-2 font-medium"
              >
                Abrir Checklist de Conformidade CFM
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
