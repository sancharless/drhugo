import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Heart, Award, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { handleWhatsAppClick } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
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
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-medical-bg pt-6 pb-12 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-24">
      {/* Elementos visuais de fundo sutis (Linhas cardiológicas suaves) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] ecg-line-subtle" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-petroleum/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Coluna de Conteúdo e Conversão (7 colunas no Desktop) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-left">
            
            {/* Tag de Especialidades e Confiança */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-petroleum/10 border border-petroleum/20 text-petroleum text-[11px] sm:text-sm font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-sage shrink-0" />
              <span>{siteConfig.hero.badge}</span>
            </div>

            {/* Headline Principal */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 leading-[1.2] tracking-tight">
              Cuidar do coração é cuidar de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-petroleum to-sage">
                cada fase da sua vida.
              </span>
            </h1>

            {/* Subheadline Clara e Acolhedora */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {siteConfig.hero.subheadline}
            </p>

            {/* Card de Identificação Médica Oficial (Obrigatório CFM 2.336/2023) */}
            <div className="bg-white/90 border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs max-w-xl">
              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-navy-800 text-white shrink-0">
                  <Heart className="w-5 h-5 text-sage-light" />
                </div>
                <div className="space-y-1">
                  <div className="text-base sm:text-lg font-bold text-navy-900 leading-tight">
                    {siteConfig.doctor.name}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-petroleum">
                    {siteConfig.doctor.fullDesignation}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] sm:text-xs text-slate-500 font-medium">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">{siteConfig.doctor.crm}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">{siteConfig.doctor.rqeCardio}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">{siteConfig.doctor.rqeEco}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações de Conversão */}
            <div className="space-y-3.5 pt-1 sm:pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                
                {/* CTA Principal WhatsApp com Logo Oficial */}
                <button
                  onClick={() => handleWhatsAppClick('hero_whatsapp')}
                  id="hero-primary-cta"
                  className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm sm:text-base font-bold shadow-md hover:shadow-glow-whatsapp transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  <WhatsAppIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 shrink-0" />
                  <span>{siteConfig.hero.ctaPrimary}</span>
                </button>

                {/* CTA Secundário */}
                <button
                  onClick={() => scrollTo('atendimento')}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-sm sm:text-base font-semibold transition-all duration-200 text-center shadow-2xs"
                >
                  <span>{siteConfig.hero.ctaSecondary}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Frase Ética sem Escassez Artificial */}
              <p className="text-[11px] sm:text-xs text-slate-500 flex items-center gap-1.5 leading-tight">
                <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                <span>{siteConfig.hero.footnote}</span>
              </p>
            </div>

            {/* Micro-Badges de Confiança */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-200/80 max-w-xl">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-petroleum shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-slate-700 leading-tight">Atendimento Ético</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-petroleum shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-slate-700 leading-tight">Ecocardiografia</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-petroleum shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-slate-700 leading-tight">Cuidado Humanizado</span>
              </div>
            </div>

          </div>

          {/* Coluna da Imagem Profissional (5 colunas no Desktop) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Moldura Profissional com Efeito Visual de Camadas */}
            <div className="relative w-full max-w-md">
              
              {/* Backing Card Decorativo */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-petroleum/20 via-sage/20 to-navy-800/10 blur-xl opacity-70" />

              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-card">
                
                {/* Imagem Oficial do Dr. Hugo Florêncio */}
                <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={siteConfig.doctor.heroPhoto}
                    alt="Dr. Hugo Florêncio - Médico Cardiologista e Ecocardiografista"
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                    loading="eager"
                  />
                  
                  {/* Gradiente sutil inferior para legibilidade */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950/80 via-navy-900/30 to-transparent pointer-events-none" />

                  {/* Badge de Identificação no Topo */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-xs font-semibold bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/60 shadow-sm">
                    <span className="flex items-center gap-1.5 text-petroleum font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Dr. Hugo Florêncio
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600">CRM-PE 26.300</span>
                  </div>

                  {/* Card Flutuante Inferior com RQE */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-white/80 shadow-lg flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-petroleum text-white flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-navy-900 leading-tight">Cardiologia &amp; Ecocardiografia</div>
                        <div className="text-[11px] text-slate-500 font-medium">RQE 12.302 • RQE 16.141</div>
                      </div>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" title="Atendimento Ativo" />
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
