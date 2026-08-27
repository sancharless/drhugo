import React, { useState } from 'react';
import { X } from 'lucide-react';
import { handleWhatsAppClick } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside 
      aria-label="Atendimento rápido pelo WhatsApp"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2"
    >
      
      {/* Tooltip Acolhedor (Pode ser fechado pelo usuário) */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-navy-900 px-3.5 py-2 rounded-2xl shadow-card border border-slate-200 text-xs font-semibold animate-bounce duration-1000">
          <span>Tire suas dúvidas com a equipe</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Botão Flutuante com Logo Oficial */}
      <button
        onClick={() => handleWhatsAppClick('floating_whatsapp')}
        id="floating-whatsapp-btn"
        className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-glow-whatsapp transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Falar no WhatsApp com o Dr. Hugo Florêncio"
      >
        {/* Anel pulsante */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />
        
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

    </aside>
  );
};
