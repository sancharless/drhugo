import React, { useState } from 'react';
import { ShieldCheck, Cookie, X, Check, Lock } from 'lucide-react';
import { useConsent } from '../context/ConsentContext';

export const CookieBanner: React.FC = () => {
  const {
    showBanner,
    showPreferencesModal,
    setShowPreferencesModal,
    acceptAll,
    acceptEssentialOnly,
    saveCustomConsent,
    consent
  } = useConsent();

  const [marketing, setMarketing] = useState(consent.marketing);
  const [analytics, setAnalytics] = useState(consent.analytics);

  const handleSavePreferences = () => {
    saveCustomConsent({ marketing, analytics });
  };

  return (
    <>
      {/* Banner Flutuante Inferior */}
      {showBanner && (
        <div className="fixed bottom-0 sm:bottom-4 left-0 sm:left-4 right-0 sm:right-4 max-w-2xl mx-auto z-50 p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-t-2xl sm:rounded-2xl border border-slate-200 shadow-2xl animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            
            <div className="p-2.5 rounded-xl bg-petroleum/10 text-petroleum shrink-0">
              <Cookie className="w-6 h-6" />
            </div>

            <div className="space-y-3 flex-1 text-left">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
                  <span>Privacidade e Cookies</span>
                  <ShieldCheck className="w-4 h-4 text-petroleum" />
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Utilizamos cookies e tecnologias semelhantes para aprimorar sua experiência de navegação e analisar o tráfego do site de forma segura, conforme nossa Política de Privacidade e a LGPD.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 rounded-xl bg-petroleum hover:bg-petroleum-hover text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Aceitar todos
                </button>
                <button
                  onClick={acceptEssentialOnly}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Apenas essenciais
                </button>
                <button
                  onClick={() => setShowPreferencesModal(true)}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-petroleum underline"
                >
                  Preferências
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modal de Preferências Granulares de Cookies */}
      {showPreferencesModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 text-left relative animate-scaleIn max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setShowPreferencesModal(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-navy-900 flex items-center gap-2">
                <Cookie className="w-5 h-5 text-petroleum" />
                Preferências de Privacidade e Cookies
              </h3>
              <p className="text-xs text-slate-600">
                Gerencie como suas informações de navegação são utilizadas neste site conforme a LGPD.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              
              {/* Cookies Essenciais */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
                    <span>Cookies Essenciais</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">Obrigatório</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Necessários para o funcionamento básico, segurança e navegação estável da página.
                  </p>
                </div>
                <div className="p-1 text-petroleum shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
              </div>

              {/* Cookies de Métricas e Análise */}
              <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-navy-900">
                    Cookies de Análise e Métricas (GA4 / GTM)
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Permitem entender de forma anônima como os visitantes navegam para melhorar a velocidade e conteúdos.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-petroleum focus:ring-petroleum/30 shrink-0 cursor-pointer"
                />
              </div>

              {/* Cookies de Marketing e Conversão */}
              <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-navy-900">
                    Cookies de Marketing e Redes Sociais (Meta Pixel)
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Permitem mensurar o alcance de campanhas patrocinadas no Instagram e Facebook.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-petroleum focus:ring-petroleum/30 shrink-0 cursor-pointer"
                />
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleSavePreferences}
                className="flex-1 py-3 px-5 rounded-xl bg-petroleum hover:bg-petroleum-hover text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Salvar preferências</span>
              </button>
              <button
                onClick={acceptAll}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                Aceitar todos
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
