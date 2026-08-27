import React from 'react';
import { 
  HeartPulse, 
  Instagram, 
  AlertTriangle, 
  ShieldCheck, 
  Cookie,
  ExternalLink 
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useConsent } from '../context/ConsentContext';
import { handleWhatsAppClick } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenChecklist?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenPrivacy, 
  onOpenTerms,
  onOpenChecklist 
}) => {
  const { reopenModal } = useConsent();

  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-slate-800 text-xs sm:text-sm">
      
      {/* Alerta Obrigatório de Emergência SAMU 192 (CFM) */}
      <div className="bg-navy-900 border-b border-white/5 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center text-xs text-amber-300 font-medium">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            {siteConfig.legal.emergencyWarning}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Coluna 1: Identificação Profissional Completa (5 Colunas) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-petroleum flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5 text-sage-light" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{siteConfig.doctor.name}</h3>
                <p className="text-xs text-petroleum font-semibold">{siteConfig.doctor.fullDesignation}</p>
              </div>
            </div>

            {/* Credenciais Detalhadas */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-1.5 text-xs text-slate-300 font-medium">
              <div className="text-white font-bold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sage" />
                Registros Oficiais no CFM / CRM-PE:
              </div>
              <p>• {siteConfig.doctor.crm}</p>
              <p>• {siteConfig.doctor.rqeCardio}</p>
              <p>• {siteConfig.doctor.rqeEco}</p>
              <p>• {siteConfig.doctor.rqeClinica}</p>
            </div>
          </div>

          {/* Coluna 2: Navegação e Informações (3 Colunas) */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">Sobre o Dr. Hugo</a>
              </li>
              <li>
                <a href="#quando-procurar" className="hover:text-white transition-colors">Quando Procurar</a>
              </li>
              <li>
                <a href="#atendimento" className="hover:text-white transition-colors">Atendimentos e Ecocardiografia</a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-white transition-colors">Localização e Consultório</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento e Redes Sociais (4 Colunas) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contato & Agendamento
            </h4>
            
            <div className="space-y-2 text-xs">
              <button
                onClick={() => handleWhatsAppClick('final_whatsapp')}
                className="flex items-center gap-2 text-slate-300 hover:text-[#25D366] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: {siteConfig.whatsapp.displayNumber}</span>
              </button>

              <a
                href={siteConfig.doctor.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-petroleum" />
                <span>Instagram: {siteConfig.doctor.social.instagramHandle}</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => reopenModal()}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white underline"
              >
                <Cookie className="w-3.5 h-3.5" />
                <span>Gerenciar preferências de cookies</span>
              </button>
            </div>

            {onOpenChecklist && (
              <div className="pt-1">
                <button
                  onClick={onOpenChecklist}
                  className="text-xs text-petroleum hover:underline font-semibold"
                >
                  ✓ Checklist de Validação Pré-Lançamento
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Linha Final de Copyright e Links Jurídicos */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.doctor.name}. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-300 underline transition-colors"
            >
              Política de Privacidade
            </button>
            <span>•</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-slate-300 underline transition-colors"
            >
              Termos de Uso
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
