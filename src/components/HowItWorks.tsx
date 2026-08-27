import React from 'react';
import { MessageSquare, CalendarCheck2, Stethoscope, ArrowRight } from 'lucide-react';
import { handleWhatsAppClick } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Entre em contato",
      desc: "Fale com a equipe pelo WhatsApp e informe sua preferência de horário e tipo de atendimento desejado.",
      icon: MessageSquare
    },
    {
      number: "02",
      title: "Confirme o atendimento",
      desc: "A equipe orientará sobre disponibilidade de agenda, localização do consultório, convênios e modalidades particulares.",
      icon: CalendarCheck2
    },
    {
      number: "03",
      title: "Realize sua avaliação",
      desc: "Na consulta, suas necessidades, hábitos e histórico de saúde serão avaliados com cuidado e atenção individualizada.",
      icon: Stethoscope
    }
  ];

  return (
    <section className="py-16 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 rounded-full bg-petroleum/10 text-petroleum text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
            Passo a Passo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 leading-tight">
            Como funciona o agendamento da sua consulta?
          </h2>
          <p className="text-slate-500 text-sm sm:text-base lg:text-lg">
            Um processo direto, humanizado e sem burocracia para você cuidar do seu coração.
          </p>
        </div>

        {/* 3 Passos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-14 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                {/* Linha conectora no Desktop */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 translate-y-[-50%] z-10 text-slate-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 text-petroleum flex items-center justify-center">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-navy-900 mb-2 sm:mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-petroleum">
                  <span>Etapa {idx + 1} de 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Central */}
        <div className="text-center">
          <button
            onClick={() => handleWhatsAppClick('hero_whatsapp')}
            id="how-it-works-cta"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm sm:text-base font-bold shadow-md hover:shadow-glow-whatsapp transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            <span>Quero solicitar um agendamento</span>
          </button>
        </div>

      </div>
    </section>
  );
};
