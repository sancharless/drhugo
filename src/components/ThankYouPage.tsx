import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  Heart, 
  Clock, 
  Calendar, 
  UserCheck 
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { trackLeadEvent, handleWhatsAppClick } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ThankYouPageProps {
  onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onBackToHome }) => {
  const [leadData, setLeadData] = useState<{
    name?: string;
    phone?: string;
    service?: string;
  }>({});

  useEffect(() => {
    // Rola para o topo ao montar
    window.scrollTo(0, 0);

    // Recupera dados do último lead submetido
    try {
      const stored = sessionStorage.getItem('dr_hugo_last_lead');
      if (stored) {
        setLeadData(JSON.parse(stored));
      }
    } catch {
      // ignore
    }

    // Dispara evento Lead apenas uma vez (com proteção contra F5/recarregamento)
    trackLeadEvent({
      page: 'thank_you_page',
      status: 'converted'
    }, true);
  }, []);

  const customWhatsAppMsg = leadData.name
    ? `Olá! Meu nome é ${leadData.name}. Acabei de preencher o formulário no site e gostaria de agilizar a consulta de horários para avaliação com o Dr. Hugo Florêncio.`
    : siteConfig.whatsapp.sourceMessages.form_submission;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-700">
      
      {/* Topo Simplificado */}
      <header className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-petroleum flex items-center justify-center text-white">
              <Heart className="w-5 h-5 text-sage-light" />
            </div>
            <div>
              <span className="font-bold text-navy-900 text-sm sm:text-base">{siteConfig.doctor.name}</span>
              <span className="hidden sm:inline text-xs text-slate-400 ml-2">• {siteConfig.doctor.credentialsBadge}</span>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-petroleum transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao início</span>
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-8">
          
          {/* Ícone de Sucesso Animado */}
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="absolute -inset-2 rounded-full bg-emerald-100/50 animate-ping pointer-events-none -z-10" />
          </div>

          {/* Títulos Oficiais */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 leading-tight">
              Recebemos sua solicitação!
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              A equipe do <strong className="text-navy-900">{siteConfig.doctor.name}</strong> entrará em contato para informar a disponibilidade e dar continuidade ao agendamento.
            </p>
          </div>

          {/* Recapitulação do Lead (se houver) */}
          {leadData.name && (
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left max-w-md mx-auto space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Dados da Solicitação
              </div>
              <div className="text-sm font-semibold text-navy-900">
                👤 Paciente: <span className="font-normal text-slate-700">{leadData.name}</span>
              </div>
              {leadData.phone && (
                <div className="text-sm font-semibold text-navy-900">
                  📱 WhatsApp: <span className="font-normal text-slate-700">{leadData.phone}</span>
                </div>
              )}
            </div>
          )}

          {/* Próximos Passos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-petroleum">
                <Clock className="w-4 h-4" />
                <span>1. Análise da Agenda</span>
              </div>
              <p className="text-xs text-slate-600">Verificamos os melhores horários para seu atendimento.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-petroleum">
                <Calendar className="w-4 h-4" />
                <span>2. Contato da Equipe</span>
              </div>
              <p className="text-xs text-slate-600">Enviaremos mensagem pelo WhatsApp para confirmação.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-petroleum">
                <UserCheck className="w-4 h-4" />
                <span>3. Sua Avaliação</span>
              </div>
              <p className="text-xs text-slate-600">Consulta cardiológica e exames com cuidado e atenção.</p>
            </div>
          </div>

          {/* CTA Principal: Continuar pelo WhatsApp */}
          <div className="pt-4 space-y-4">
            <p className="text-xs sm:text-sm font-medium text-slate-700">
              Deseja agilizar o atendimento agora mesmo?
            </p>

            <button
              onClick={() => handleWhatsAppClick('form_submission', customWhatsAppMsg)}
              id="thankyou-whatsapp-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-base font-bold shadow-md hover:shadow-glow-whatsapp transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>Continuar pelo WhatsApp</span>
            </button>

            <div>
              <button
                onClick={onBackToHome}
                className="text-xs text-slate-500 hover:text-navy-900 underline font-medium pt-2"
              >
                Retornar à página principal
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* Rodapé da Página de Obrigado */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-petroleum" />
            <span>{siteConfig.doctor.name} • {siteConfig.doctor.credentialsShort}</span>
          </p>
          <p>Atendimento Ético e Conforme Resolução CFM 2.336/2023</p>
        </div>
      </footer>

    </div>
  );
};
