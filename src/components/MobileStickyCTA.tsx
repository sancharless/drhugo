import React from 'react';
import { handleWhatsAppClick } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const MobileStickyCTA: React.FC = () => {
  return (
    <aside 
      aria-label="Agendamento rápido pelo WhatsApp"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl animate-fadeIn"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          onClick={() => handleWhatsAppClick('mobile_bottom_bar')}
          id="mobile-sticky-whatsapp-btn"
          className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#1CA853] text-white font-extrabold text-sm shadow-md hover:shadow-glow-whatsapp active:scale-[0.98] transition-all"
        >
          <WhatsAppIcon className="w-5 h-5 shrink-0" />
          <span>Agendar pelo WhatsApp</span>
        </button>
      </div>
    </aside>
  );
};
