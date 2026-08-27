import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { handleWhatsAppClick } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-28 bg-navy-800 text-white overflow-hidden">
      
      {/* Detalhes de fundo suaves */}
      <div className="absolute inset-0 opacity-10 ecg-line-subtle pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-petroleum/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sage/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sage-light text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
          <Heart className="w-4 h-4 text-sage-light fill-sage-light/20" />
          <span>Saúde &amp; Prevenção Cardiovascular</span>
        </div>

        {/* Título de Alto Impacto */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-3xl mx-auto">
          Dê o próximo passo no cuidado com a sua{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sage-light to-white">
            saúde cardiovascular.
          </span>
        </h2>

        {/* Texto de Apoio */}
        <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Entre em contato com a equipe e consulte os horários disponíveis para atendimento e avaliação com o Dr. Hugo Florêncio.
        </p>

        {/* Botão de Destaque WhatsApp */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleWhatsAppClick('final_whatsapp')}
            id="final-cta-whatsapp"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-base sm:text-lg font-bold shadow-lg hover:shadow-glow-whatsapp transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 text-center"
          >
            <WhatsAppIcon className="w-6 h-6 shrink-0" />
            <span>Falar com a equipe pelo WhatsApp</span>
          </button>
        </div>

        {/* Informações Profissionais Obrigatórias */}
        <div className="pt-6 border-t border-white/10 max-w-xl mx-auto text-xs text-slate-400 space-y-1">
          <p className="font-bold text-slate-200">{siteConfig.doctor.name} • {siteConfig.doctor.fullDesignation}</p>
          <p>{siteConfig.doctor.credentialsShort}</p>
        </div>

        {/* Selo de Garantia Ética */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-sage-light" />
          <span>Atendimento estritamente ético em conformidade com a Resolução CFM nº 2.336/2023</span>
        </div>

      </div>
    </section>
  );
};
