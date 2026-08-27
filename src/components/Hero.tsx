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
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800 pt-12 pb-20 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-36">
      {/* Elementos visuais de fundo sutis (Linhas cardiológicas suaves) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] ecg-line-subtle" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-petroleum/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Coluna de Conteúdo e Conversão (7 colunas no Desktop) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-left reveal-left">
            
            {/* Tag de Especialidades e Confiança */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[11px] sm:text-sm font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-gold-light shrink-0" />
              <span>{siteConfig.hero.badge}</span>
            </div>

            {/* Headline Principal */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.15] tracking-tight">
              Cuidar do coração é cuidar de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light font-style-italic">
                cada fase da sua vida.
              </span>
            </h1>

            {/* Subheadline Clara e Acolhedora */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-loose max-w-2xl font-normal">
              {siteConfig.hero.subheadline}
            </p>

            {/* Card de Identificação Médica Oficial (Obrigatório CFM 2.336/2023) */}
            <div className="bg-navy-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-6 shadow-soft max-w-xl">
              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-gold/10 text-gold shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-base sm:text-lg font-bold text-white leading-tight font-serif">
                    {siteConfig.doctor.name}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-gold">
                    {siteConfig.doctor.fullDesignation}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] sm:text-xs text-slate-400 font-medium">
                    <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-300 font-semibold">{siteConfig.doctor.crm}</span>
                    <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-300 font-semibold">{siteConfig.doctor.rqeCardio}</span>
                    <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-300 font-semibold">{siteConfig.doctor.rqeEco}</span>
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
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-transparent hover:bg-white/5 border border-white/20 text-white text-sm sm:text-base font-semibold transition-all duration-200 text-center"
                >
                  <span>{siteConfig.hero.ctaSecondary}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>

              {/* Frase Ética sem Escassez Artificial */}
              <p className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1.5 leading-tight">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>{siteConfig.hero.footnote}</span>
              </p>
            </div>

            {/* Micro-Badges de Confiança */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10 max-w-xl opacity-90">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-slate-300 leading-tight">Atendimento Ético</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-slate-300 leading-tight">Ecocardiografia</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-slate-300 leading-tight">Cuidado Humanizado</span>
              </div>
            </div>

          </div>

          {/* Coluna da Imagem Profissional (5 colunas no Desktop) */}
          <div className="lg:col-span-5 relative flex justify-center reveal-right">
            
            {/* Moldura Profissional com Efeito Visual de Camadas */}
            <div className="relative w-full max-w-md">
              
              {/* Backing Card Decorativo */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-gold/20 via-transparent to-petroleum/30 blur-2xl opacity-50" />

              <div className="relative rounded-[2rem] overflow-hidden bg-navy-900 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                
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
                  <div className="absolute top-5 left-5 right-5 flex justify-between items-center text-xs font-semibold bg-navy-950/70 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 shadow-lg text-white">
                    <span className="flex items-center gap-1.5 text-gold font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Dr. Hugo Florêncio
                    </span>
                    <span className="text-[11px] font-semibold text-slate-300">CRM-PE 26.300</span>
                  </div>

                  {/* Card Flutuante Inferior com RQE */}
                  <div className="absolute bottom-5 left-5 right-5 bg-navy-950/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg flex items-center justify-between gap-3 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white leading-tight font-serif">Cardiologia &amp; Ecocardiografia</div>
                        <div className="text-[11px] text-slate-300 font-medium">RQE 12.302 • RQE 16.141</div>
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
