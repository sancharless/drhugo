import React from 'react';
import { 
  UserCheck, 
  ShieldAlert, 
  Clock, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const pillarIcons: Record<string, React.ElementType> = {
  UserCheck,
  ShieldAlert,
  Clock,
  Sparkles
};

export const EducationalSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-petroleum text-xs font-semibold uppercase tracking-wider">
            Educação & Saúde
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 leading-tight">
            Prevenção começa com informação e acompanhamento.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Muitas condições cardiovasculares podem evoluir silenciosamente. A avaliação médica ajuda a identificar fatores de risco e a definir, quando necessário, cuidados, exames e acompanhamento adequados para cada pessoa.
          </p>
        </div>

        {/* 4 Pilares Informativos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {siteConfig.educationalPillars.map((pillar, idx) => {
            const Icon = pillarIcons[pillar.icon] || UserCheck;
            return (
              <div
                key={idx}
                className="bg-medical-bg p-6 rounded-2xl border border-slate-200/80 hover:border-petroleum/30 transition-all text-left flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-petroleum/10 text-petroleum flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Aviso Educativo Obrigatório (CFM) */}
        <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 text-left shadow-2xs">
          <AlertCircle className="w-5 h-5 text-slate-500 shrink-0" />
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {siteConfig.legal.educationalWarning}
          </p>
        </div>

      </div>
    </section>
  );
};
