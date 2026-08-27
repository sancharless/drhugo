import React from 'react';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { handleWhatsAppClick, trackCustomEvent } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const Locations: React.FC = () => {
  const handleRouteClick = (mapsUrl: string, locationName: string) => {
    trackCustomEvent('ViewLocationRoute', { location_name: locationName });
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="localizacao" className="py-20 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-petroleum/10 text-petroleum text-xs font-semibold uppercase tracking-wider">
            Atendimento Presencial
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 leading-tight">
            Onde são realizados os atendimentos?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Consultórios com estrutura acolhedora e localização de fácil acesso para a sua comodidade.
          </p>
        </div>

        {/* Grade de Locais */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cartão de Informações dos Locais (5 Colunas no Desktop) */}
          <div className="lg:col-span-5 space-y-6 reveal-left">
            {siteConfig.locations.map((loc) => (
              <div
                key={loc.id}
                className="bg-slate-50/50 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-100 space-y-5 text-left"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-navy-900">{loc.name}</h3>
                    <p className="text-xs text-petroleum font-semibold mt-0.5">{loc.cityState}</p>
                  </div>
                  {loc.badge && (
                    <span className="text-[11px] font-semibold bg-petroleum/10 text-petroleum px-2.5 py-1 rounded-full shrink-0">
                      {loc.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-3.5 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-petroleum shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-800">{loc.address}</div>
                      <div className="text-xs text-slate-500">{loc.neighborhood}, {loc.cityState}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-petroleum shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-800">Horários de Atendimento</div>
                      <div className="text-xs text-slate-500">{loc.hours}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-petroleum shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-800">Contato para Agendamento</div>
                      <div className="text-xs text-slate-500">{siteConfig.whatsapp.displayNumber}</div>
                    </div>
                  </div>
                </div>

                {/* Ações do Card */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleRouteClick(loc.googleMapsUrl, loc.name)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                  >
                    <Navigation className="w-4 h-4 text-petroleum" />
                    <span>Ver rota no Maps</span>
                  </button>

                  <button
                    onClick={() => handleWhatsAppClick('services_whatsapp', `Olá! Gostaria de consultar a disponibilidade de atendimento na unidade: ${loc.name}`)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-xs hover:shadow-glow-whatsapp transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Consultar agenda</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Caixa Informativa de Confirmação */}
            <div className="bg-white/80 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 leading-relaxed">
              <p className="font-medium text-slate-700 mb-1">ℹ️ Agendamento com hora marcada</p>
              Para garantir pontualidade e atenção plena ao seu atendimento, as consultas e ecocardiogramas são realizados exclusivamente mediante agendamento prévio.
            </div>
          </div>

          {/* Mapa Interativo / Embed (7 Colunas no Desktop) */}
          <div className="lg:col-span-7 reveal-right">
            <div className="rounded-3xl overflow-hidden shadow-soft bg-slate-50 h-[380px] sm:h-[420px] relative border border-slate-100">
              {siteConfig.locations[0]?.embedMapSrc ? (
                <iframe
                  title="Localização do Consultório"
                  src={siteConfig.locations[0].embedMapSrc}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-100">
                  <MapPin className="w-12 h-12 text-petroleum mb-3" />
                  <p className="text-sm font-bold text-navy-900">Mapa de Localização</p>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">
                    O mapa detalhado será exibido após a confirmação do endereço oficial.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
