import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { handleWhatsAppClick } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Primeiro item aberto por padrão

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-14 sm:py-24 bg-slate-50/70 relative border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 rounded-full bg-petroleum/10 text-petroleum text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
            Esclarecimentos
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 leading-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
            Tire suas dúvidas sobre o atendimento cardiológico, prevenção e consultas.
          </p>
        </div>

        {/* Lista de Acordeão */}
        <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-12">
          {siteConfig.faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-3 focus:outline-none focus:bg-slate-50/80"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-navy-900 flex items-center gap-2.5 sm:gap-3 leading-snug">
                    <HelpCircle className="w-5 h-5 text-petroleum shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  <div className={`p-1.5 rounded-full bg-slate-100 text-slate-500 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-petroleum/10 text-petroleum' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-slate-600 text-xs sm:text-sm sm:leading-relaxed border-t border-slate-100 animate-fadeIn">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA complementar pós-FAQ */}
        <div className="text-center bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-navy-900">Ainda tem alguma dúvida?</h4>
            <p className="text-xs sm:text-sm text-slate-600">Nossa equipe está disponível para orientar você pelo WhatsApp.</p>
          </div>
          <button
            onClick={() => handleWhatsAppClick('faq_whatsapp')}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-glow-whatsapp transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Falar com a equipe</span>
          </button>
        </div>

      </div>
    </section>
  );
};
