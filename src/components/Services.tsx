import React from 'react';
import { 
  Heart, 
  Scan, 
  Shield, 
  FileHeart, 
  Flame, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { handleWhatsAppClick } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

const serviceIcons: Record<string, React.ElementType> = {
  Heart,
  Scan,
  Shield,
  FileHeart,
  Flame,
  CheckCircle2
};

export const Services: React.FC = () => {
  return (
    <section id="atendimento" className="py-20 sm:py-32 bg-slate-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-petroleum text-xs font-semibold uppercase tracking-wider">
            Atendimentos e Exames
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 leading-tight">
            Como podemos cuidar da sua saúde cardiovascular?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Consultas, exames de imagem e acompanhamento preventivo estruturados com foco na sua saúde e bem-estar.
          </p>
        </div>

        {/* Grade de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {siteConfig.services.map((srv) => {
            const Icon = serviceIcons[srv.iconName] || Heart;
            const isEco = srv.id === 'ecocardiografia';

            return (
              <div
                key={srv.id}
                className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                  isEco 
                    ? 'bg-gradient-to-br from-white to-petroleum/5 border-none ring-1 ring-petroleum/10 shadow-card hover:shadow-card-hover' 
                    : 'bg-white border-none shadow-soft hover:shadow-card'
                }`}
              >
                <div>
                  {/* Topo do Card com Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isEco ? 'bg-petroleum text-white' : 'bg-petroleum/10 text-petroleum'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {srv.highlightBadge && (
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        isEco ? 'bg-petroleum text-white' : 'bg-slate-200/70 text-slate-700'
                      }`}>
                        {srv.highlightBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-navy-900 mb-2">
                    {srv.title}
                  </h3>

                  {srv.rqeRequired && (
                    <div className="inline-block text-xs font-bold text-petroleum bg-petroleum/10 px-2 py-0.5 rounded mb-3">
                      {srv.rqeRequired}
                    </div>
                  )}

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/60">
                  <button
                    onClick={() => handleWhatsAppClick('services_whatsapp', `Olá! Gostaria de consultar informações sobre ${srv.title} com o Dr. Hugo Florêncio.`)}
                    className="w-full inline-flex items-center justify-between text-xs font-bold text-petroleum hover:text-navy-900 transition-colors py-1 group"
                  >
                    <span className="font-semibold">Consultar disponibilidade</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota Informativa sobre Exames Complementares (CFM) */}
        <div className="max-w-3xl mx-auto bg-white shadow-soft rounded-3xl p-6 sm:p-8 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-navy-900">
            <AlertCircle className="w-4 h-4 text-petroleum" />
            <span>Indicação de Exames e Procedimentos</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            A necessidade de exames complementares (como ecocardiograma e outros exames cardiológicos) é definida individualmente pelo médico durante a consulta, após avaliação clínica criteriosa.
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleWhatsAppClick('services_whatsapp')}
              className="inline-flex items-center gap-2 text-xs font-bold text-petroleum hover:text-[#1EBE5D] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Falar com a equipe pelo WhatsApp sobre exames</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
