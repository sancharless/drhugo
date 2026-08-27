import React, { createContext, useContext, useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { initGA4, initMetaPixel } from '../utils/tracking';

export interface ConsentState {
  essential: boolean; // Sempre true
  marketing: boolean; // Meta Pixel
  analytics: boolean; // GA4 / GTM
  hasUserResponded: boolean;
}

interface ConsentContextType {
  consent: ConsentState;
  showBanner: boolean;
  showPreferencesModal: boolean;
  setShowBanner: (show: boolean) => void;
  setShowPreferencesModal: (show: boolean) => void;
  acceptAll: () => void;
  acceptEssentialOnly: () => void;
  saveCustomConsent: (preferences: { marketing: boolean; analytics: boolean }) => void;
  reopenModal: () => void;
}

const CONSENT_STORAGE_KEY = 'dr_hugo_lgpd_consent_v1';

const defaultConsent: ConsentState = {
  essential: true,
  marketing: false,
  analytics: false,
  hasUserResponded: false,
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed: ConsentState = JSON.parse(stored);
        setConsent({ ...parsed, hasUserResponded: true });
        setShowBanner(false);

        // Inicializa pixels autorizados
        if (parsed.marketing) {
          initMetaPixel(siteConfig.tracking.metaPixelId, true);
        }
        if (parsed.analytics) {
          initGA4(siteConfig.tracking.ga4MeasurementId, true);
        }
      } else {
        // Primeira visita: exibe banner
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  const saveAndApply = (newState: ConsentState) => {
    setConsent(newState);
    setShowBanner(false);
    setShowPreferencesModal(false);
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newState));
    } catch {
      // ignore
    }

    if (newState.marketing) {
      initMetaPixel(siteConfig.tracking.metaPixelId, true);
    }
    if (newState.analytics) {
      initGA4(siteConfig.tracking.ga4MeasurementId, true);
    }
  };

  const acceptAll = () => {
    saveAndApply({
      essential: true,
      marketing: true,
      analytics: true,
      hasUserResponded: true,
    });
  };

  const acceptEssentialOnly = () => {
    saveAndApply({
      essential: true,
      marketing: false,
      analytics: false,
      hasUserResponded: true,
    });
  };

  const saveCustomConsent = ({
    marketing,
    analytics,
  }: {
    marketing: boolean;
    analytics: boolean;
  }) => {
    saveAndApply({
      essential: true,
      marketing,
      analytics,
      hasUserResponded: true,
    });
  };

  const reopenModal = () => {
    setShowPreferencesModal(true);
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        showBanner,
        showPreferencesModal,
        setShowBanner,
        setShowPreferencesModal,
        acceptAll,
        acceptEssentialOnly,
        saveCustomConsent,
        reopenModal,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export function useConsent(): ConsentContextType {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent deve ser utilizado dentro de um ConsentProvider');
  }
  return context;
}
