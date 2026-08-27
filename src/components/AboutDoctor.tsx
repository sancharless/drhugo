import React from 'react';
import { 
  Heart, 
  Stethoscope, 
  Scan, 
  Building2, 
  CheckCircle2, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { handleWhatsAppClick } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const AboutDoctor: React.FC = () => {
  const credentials = [
    {
      title: "Médico",
      code: "CRM-PE 26.300",
      desc: "Inscrição no Conselho Regional de Medicina de Pernambuco",
      icon: Stethoscope
    },
    {
      title: "Cardiologista",
      code: "RQE 12.302",
      desc: "Registro de Qualificação de Especialista em Cardiologia",
      icon: Heart
    },
    {
      title: "Ecocardiografista",
      code: "RQE 16.141",
      desc: "Registro de Qualificação de Especialista em Ecocardiografia",
      icon: Scan
    },
    {
      title: "Clínica Médica",
      code: "RQE 16.628",
      desc: "Registro de Qualificação de Especialista em Clínica Médica",
      icon: Building2
    }
  ];

  return (
    <section id="sobre" className="py-16 sm:py-24 bg-slate-50/70 relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Coluna da Foto / Ilustração do Consultório (5 Colunas no Desktop) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Elemento Decorativo */}
              <div className="absolute -inset-2 bg-gradient-to-br from-petroleum/15 to-sage/20 rounded-3xl blur-lg" />

              <div className="relative bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-card">
                
                {/* Fotografia Oficial do Consultório */}
                <div className="relative rounded-2xl bg-slate-100 overflow-hidden aspect-[4/5] flex flex-col justify-between">
                  <img
                    src={siteConfig.doctor.aboutPhoto}
                    alt="Dr. Hugo Florêncio no Consultório"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  
                  {/* Gradiente de proteção */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy-950/80 via-navy-900/40 to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-xs font-bold text-navy-900 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/70 shadow-sm">
                    <span className="flex items-center gap-1.5 text-petroleum">
                      <ShieldCheck className="w-4 h-4 text-petroleum" />
                      Qualificações Registradas
                    </span>
                    <span className="text-slate-500 font-semibold">CRM-PE 26.300</span>
                  </div>

                  {/* Card Informativo Base */}
                  <div className="absolute bottom-4 left-4 right-4 bg-navy-900/95 backdrop-blur-md text-white rounded-xl p-3.5 shadow-md border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-petroleum flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">Atendimento Cardiológico Humanizado</div>
                        <div className="text-[11px] text-slate-300">Escuta atenta e conduta individualizada</div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Coluna de Texto e Registros Oficiais (7 Colunas no Desktop) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-7 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-petroleum/10 text-petroleum text-xs font-semibold uppercase tracking-wider">
              Sobre o Médico
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 leading-tight">
              {siteConfig.about.headline}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {siteConfig.about.description}
            </p>

            {/* Pilares do Atendimento */}
            <div className="space-y-3 pt-2">
              {siteConfig.about.pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-sage/20 text-petroleum shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-navy-900">{pillar.title}: </span>
                    <span className="text-sm text-slate-600">{pillar.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Grade com os 4 Cartões de Qualificações Oficiais (CRM e RQEs) */}
            <div className="pt-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Registros Profissionais Oficiais (CRM-PE)
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {credentials.map((cred, idx) => {
                  const Icon = cred.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-xl border border-slate-200 hover:border-petroleum/30 shadow-2xs hover:shadow-xs transition-all flex items-start gap-3.5"
                    >
                      <div className="p-2.5 rounded-lg bg-slate-100 text-petroleum shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy-900">{cred.title}</div>
                        <div className="text-xs font-extrabold text-petroleum">{cred.code}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{cred.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botão de Contato */}
            <div className="pt-2">
              <button
                onClick={() => handleWhatsAppClick('hero_whatsapp')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-sm hover:shadow-glow-whatsapp transition-all"
              >
                <WhatsAppIcon className="w-4.5 h-4.5" />
                <span>Solicitar agendamento com Dr. Hugo</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
