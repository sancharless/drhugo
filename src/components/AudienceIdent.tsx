import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  Zap, 
  HeartHandshake, 
  Stethoscope,
  Info,
  ArrowRight
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { handleWhatsAppClick } from '../utils/tracking';

// Mapeamento de ícones dinâmicos
const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Users,
  Activity,
  Zap,
  HeartHandshake,
  Stethoscope
};

export const AudienceIdent: React.FC = () => {
  return (
    <section id="quando-procurar" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-petroleum text-xs font-semibold uppercase tracking-wider">
            Orientação e Prevenção
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 leading-tight">
            Em quais situações uma avaliação cardiológica pode ser importante?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A saúde cardiovascular envolve tanto a prevenção precoce quanto o acompanhamento contínuo. Conheça as principais situações de busca por consulta médica:
          </p>
        </div>

        {/* Grade com os 6 Cartões Informativos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {siteConfig.situations.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || HeartHandshake;
            return (
              <div
                key={item.id}
                className="group relative bg-medical-bg hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-petroleum/30 shadow-xs hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-petroleum/10 group-hover:bg-petroleum text-petroleum group-hover:text-white flex items-center justify-center transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 group-hover:text-petroleum/40 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 mb-2.5 group-hover:text-petroleum transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-petroleum group-hover:translate-x-1 transition-transform">
                  <span>Avaliar com o médico</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bloco de Apoio Ético e Responsável (CFM) */}
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left shadow-2xs">
          <div className="p-2.5 rounded-xl bg-petroleum/10 text-petroleum shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-navy-900 uppercase tracking-wider">
              Aviso de Responsabilidade Médica
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sintomas e fatores de risco devem ser avaliados individualmente. Somente uma consulta médica presencial pode definir a investigação, exames e a conduta clínica adequadas.
            </p>
          </div>
          <button
            onClick={() => handleWhatsAppClick('services_whatsapp')}
            className="shrink-0 mt-2 sm:mt-0 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-navy-900 text-xs font-bold transition-colors whitespace-nowrap"
          >
            Tirar dúvidas
          </button>
        </div>

      </div>
    </section>
  );
};
