import React from 'react';
import { X, FileText, AlertTriangle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface TermsOfUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfUseModal: React.FC<TermsOfUseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] shadow-2xl border border-slate-200 flex flex-col text-left animate-scaleIn">
        
        {/* Topo */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-petroleum/10 text-petroleum">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-900">Termos de Uso e Avisos Legais</h3>
              <p className="text-xs text-slate-500">Resolução CFM nº 2.336/2023</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold">Aviso Fundamental sobre Urgências e Emergências:</p>
              <p>{siteConfig.legal.emergencyWarning}</p>
            </div>
          </div>

          <section className="space-y-2">
            <h4 className="font-bold text-navy-900 text-sm">1. Caráter Informativo e Educativo</h4>
            <p>
              O conteúdo disponibilizado nesta página tem caráter estritamente educativo, de orientação e de esclarecimento sobre a prática cardiológica e preventiva. Nenhuma informação aqui contida substitui a consulta médica presencial, o exame físico ou a avaliação clínica individualizada.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-navy-900 text-sm">2. Ausência de Pré-Diagnóstico ou Promessas</h4>
            <p>
              Em estrita conformidade com o Código de Ética Médica e a Resolução CFM nº 2.336/2023, esta página não realiza consultas a distância, não fornece diagnósticos preliminares e não promete cura ou resultados infalíveis. A medicina é uma atividade de meio, e cada organismo responde de maneira única.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-navy-900 text-sm">3. Agendamento e Confirmação</h4>
            <p>
              O preenchimento do formulário de solicitação de agendamento ou o contato via WhatsApp constitui uma manifestação de interesse em atendimento. A confirmação efetiva do dia, horário, local e modalidades de atendimento depende da análise da disponibilidade da agenda pela equipe do consultório.
            </p>
          </section>

        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-petroleum text-white text-xs font-bold hover:bg-petroleum-hover transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
