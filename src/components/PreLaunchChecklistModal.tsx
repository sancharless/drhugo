import React, { useState } from 'react';
import { X, CheckSquare, Square, ShieldCheck, HelpCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface PreLaunchChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChecklistItem {
  id: string;
  category: 'cfm' | 'contato' | 'marketing' | 'imagens';
  title: string;
  description: string;
  configReference: string;
  defaultChecked?: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'cfm-rqe',
    category: 'cfm',
    title: 'Registros Profissionais Oficiais (CRM e RQEs)',
    description: 'Dr. Hugo Florêncio: CRM-PE 26.300 | RQE 12.302 (Cardio) | RQE 16.141 (Eco) | RQE 16.628 (Clínica).',
    configReference: 'siteConfig.doctor',
    defaultChecked: true
  },
  {
    id: 'cfm-disclaimer',
    category: 'cfm',
    title: 'Avisos Legais e Orientação de Emergência (SAMU 192)',
    description: 'Aviso sobre caráter informativo e orientação para emergências hospitalares visíveis.',
    configReference: 'siteConfig.legal',
    defaultChecked: true
  },
  {
    id: 'cfm-ethics',
    category: 'cfm',
    title: 'Linguagem Ética sem Sensacionalismo',
    description: 'Sem termos como "o melhor", "cura definitiva", sem falsos depoimentos ou contadores de escassez.',
    configReference: 'Todo o conteúdo textual',
    defaultChecked: true
  },
  {
    id: 'contato-whatsapp',
    category: 'contato',
    title: 'Número Oficial de WhatsApp do Consultório',
    description: `Atualmente configurado: ${siteConfig.whatsapp.displayNumber}. Certifique-se de inserir o WhatsApp definitivo com DDI e DDD.`,
    configReference: 'siteConfig.whatsapp.number'
  },
  {
    id: 'contato-endereco',
    category: 'contato',
    title: 'Endereço e Unidades de Atendimento',
    description: 'Confirme o endereço oficial do consultório e a URL do Google Maps.',
    configReference: 'siteConfig.locations'
  },
  {
    id: 'contato-instagram',
    category: 'contato',
    title: 'Link do Perfil do Instagram',
    description: `Configurado como: ${siteConfig.doctor.social.instagramHandle}. Ajuste se necessário.`,
    configReference: 'siteConfig.doctor.social'
  },
  {
    id: 'marketing-pixel',
    category: 'marketing',
    title: 'Meta Pixel ID para Campanhas de Anúncio',
    description: `Configurado: "${siteConfig.tracking.metaPixelId}". Insira o ID numérico gerado no Meta Business Manager.`,
    configReference: 'siteConfig.tracking.metaPixelId'
  },
  {
    id: 'marketing-ga4',
    category: 'marketing',
    title: 'Google Analytics 4 / GTM (Opcional)',
    description: `Configurado: "${siteConfig.tracking.ga4MeasurementId}". Permite métricas de tráfego.`,
    configReference: 'siteConfig.tracking.ga4MeasurementId'
  },
  {
    id: 'marketing-webhook',
    category: 'marketing',
    title: 'Webhook para Envio de Leads (CRM / Make / Zapier)',
    description: 'Insira o endpoint para receber os leads diretamente no seu sistema ou planilha.',
    configReference: 'siteConfig.tracking.webhookUrl'
  },
  {
    id: 'imagens-foto',
    category: 'imagens',
    title: 'Fotografia Profissional Oficial do Dr. Hugo Florêncio',
    description: 'Substitua as imagens demonstrativas em /public/images pelas fotos em alta resolução do médico no consultório.',
    configReference: 'public/images/ e siteConfig.doctor.heroPhoto'
  }
];

export const PreLaunchChecklistModal: React.FC<PreLaunchChecklistModalProps> = ({ isOpen, onClose }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    CHECKLIST_ITEMS.forEach(item => {
      if (item.defaultChecked) initial[item.id] = true;
    });
    return initial;
  });

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = CHECKLIST_ITEMS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] shadow-2xl border border-slate-200 flex flex-col text-left animate-scaleIn">
        
        {/* Topo do Modal */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-petroleum/10 text-petroleum">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-900">Checklist de Publicação & CFM</h3>
              <p className="text-xs text-slate-500">Validação prévia para ativação de campanhas patrocinadas no Meta Ads</p>
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

        {/* Barra de Progresso */}
        <div className="px-6 pt-4 pb-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Progresso de Validação</span>
              <span>{completedCount} de {totalCount} itens ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-petroleum rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lista com Rolagem */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          <div className="bg-petroleum/5 p-4 rounded-2xl border border-petroleum/20 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-petroleum shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Todas as configurações principais podem ser editadas diretamente no arquivo <code>src/config/siteConfig.ts</code> antes de publicar.
            </p>
          </div>

          <div className="space-y-3">
            {CHECKLIST_ITEMS.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="pt-0.5 text-petroleum">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-emerald-900 line-through opacity-80' : 'text-navy-900'}`}>
                        {item.title}
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                    <div className="text-[11px] text-slate-400 font-mono pt-1">
                      Local: {item.configReference}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Rodapé */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 rounded-b-3xl">
          <span className="text-xs text-slate-500">
            {completedCount === totalCount ? '🎉 Tudo pronto para publicação!' : '⚠️ Revise os itens pendentes antes de lançar.'}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-petroleum text-white text-xs font-bold hover:bg-petroleum-hover transition-colors"
          >
            Concluir Revisão
          </button>
        </div>

      </div>
    </div>
  );
};
