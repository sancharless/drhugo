import React from 'react';
import { X, ShieldCheck, Lock } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] shadow-2xl border border-slate-200 flex flex-col text-left animate-scaleIn">
        
        {/* Topo */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-petroleum/10 text-petroleum">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-900">Política de Privacidade e Proteção de Dados</h3>
              <p className="text-xs text-slate-500">Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD)</p>
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
          
          <section className="space-y-2">
            <h4 className="font-bold text-navy-900 text-sm">1. Controlador dos Dados</h4>
            <p>
              Esta página é mantida pelo <strong>{siteConfig.doctor.name}</strong> ({siteConfig.doctor.crm}, {siteConfig.doctor.rqeCardio}, {siteConfig.doctor.rqeEco}), que atua como Controlador dos dados pessoais coletados neste ambiente digital.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-navy-900 text-sm">2. Finalidade e Dados Coletados</h4>
            <p>
              Coletamos exclusivamente os dados estritamente necessários para a prestação de informações e pré-agendamento de consultas médicas:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Nome completo:</strong> para identificação no contato.</li>
              <li><strong>Número de WhatsApp:</strong> para envio de orientações sobre horários, localização e agendamento.</li>
              <li><strong>Cidade:</strong> para direcionamento à unidade de atendimento mais conveniente.</li>
              <li><strong>Preferência de período e tipo de atendimento:</strong> para facilitar o atendimento pela equipe.</li>
            </ul>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700 font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-petroleum shrink-0" />
              <span>Não coletamos dados de saúde sensíveis, histórico detalhado de doenças, exames ou CPF através deste formulário.</span>
            </div>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-navy-900 text-sm">3. Base Legal para o Tratamento</h4>
            <p>
              O tratamento dos dados baseia-se no <strong>Consentimento do Titular</strong> (art. 7º, I da LGPD) e em procedimentos preliminares relacionados à solicitação de atendimento médico pelo próprio paciente (art. 7º, V da LGPD).
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-navy-900 text-sm">4. Compartilhamento e Segurança</h4>
            <p>
              Seus dados pessoais não são vendidos, alugados ou compartilhados com terceiros para fins comerciais estranhos ao agendamento. Utilizamos medidas técnicas e organizacionais de segurança para proteger suas informações contra acessos não autorizados.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-navy-900 text-sm">5. Direitos do Titular (Art. 18 da LGPD)</h4>
            <p>
              Você tem direito a solicitar, a qualquer momento, confirmação da existência de tratamento, acesso aos dados, correção de dados incompletos ou a exclusão definitiva das suas informações de contato. Para exercer seus direitos, basta solicitar diretamente pelo nosso canal oficial de WhatsApp.
            </p>
          </section>

        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-petroleum text-white text-xs font-bold hover:bg-petroleum-hover transition-colors"
          >
            Entendido e fechar
          </button>
        </div>

      </div>
    </div>
  );
};
