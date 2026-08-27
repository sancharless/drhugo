/**
 * SISTEMA DE RASTREAMENTO E ANALYTICS
 * Suporta Meta Pixel, GA4, GTM, Webhook e Preservação de UTMs
 */

import { siteConfig } from '../config/siteConfig';

// Tipagem para Window estendida
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  gclid: string;
  page_referrer: string;
  landing_timestamp: string;
}

const UTM_STORAGE_KEY = 'dr_hugo_campaign_utms';
const LEAD_FIRED_KEY = 'dr_hugo_lead_event_fired';

/**
 * Captura e armazena os parâmetros UTM da URL na primeira visita
 */
export function captureAndPersistUtms(): UtmParams {
  if (typeof window === 'undefined') {
    return {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      utm_term: '',
      fbclid: '',
      gclid: '',
      page_referrer: '',
      landing_timestamp: ''
    };
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existingRaw = sessionStorage.getItem(UTM_STORAGE_KEY) || localStorage.getItem(UTM_STORAGE_KEY);
    const existing: Partial<UtmParams> = existingRaw ? JSON.parse(existingRaw) : {};

    const utms: UtmParams = {
      utm_source: urlParams.get('utm_source') || existing.utm_source || 'direct',
      utm_medium: urlParams.get('utm_medium') || existing.utm_medium || 'organic',
      utm_campaign: urlParams.get('utm_campaign') || existing.utm_campaign || 'none',
      utm_content: urlParams.get('utm_content') || existing.utm_content || '',
      utm_term: urlParams.get('utm_term') || existing.utm_term || '',
      fbclid: urlParams.get('fbclid') || existing.fbclid || '',
      gclid: urlParams.get('gclid') || existing.gclid || '',
      page_referrer: existing.page_referrer || document.referrer || 'direct',
      landing_timestamp: existing.landing_timestamp || new Date().toISOString()
    };

    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utms));
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utms));
    return utms;
  } catch {
    return {
      utm_source: 'direct',
      utm_medium: 'organic',
      utm_campaign: 'none',
      utm_content: '',
      utm_term: '',
      fbclid: '',
      gclid: '',
      page_referrer: '',
      landing_timestamp: new Date().toISOString()
    };
  }
}

/**
 * Recupera os UTMs salvos
 */
export function getSavedUtms(): UtmParams {
  if (typeof window === 'undefined') return captureAndPersistUtms();
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY) || localStorage.getItem(UTM_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return captureAndPersistUtms();
}

/**
 * Inicializa o Meta Pixel dinamicamente se configurado e com consentimento
 */
export function initMetaPixel(pixelId: string, consentGranted: boolean) {
  if (typeof window === 'undefined' || !pixelId || pixelId === 'SEU_PIXEL_ID_AQUI' || !consentGranted) {
    return;
  }

  if (window.fbq) return; // Já inicializado

  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  const w = window as any;
  if (typeof w.fbq === 'function') {
    w.fbq('init', pixelId);
    w.fbq('track', 'PageView');
    if (siteConfig.tracking.enableTestMode) {
      console.log(`[Tracking] Meta Pixel ${pixelId} inicializado.`);
    }
  }
}

/**
 * Inicializa o Google Analytics 4
 */
export function initGA4(measurementId: string, consentGranted: boolean) {
  if (typeof window === 'undefined' || !measurementId || measurementId === 'G-XXXXXXXXXX' || !consentGranted) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function (...args: any[]) {
    w.dataLayer.push(args);
  };
  w.gtag('js', new Date());
  w.gtag('config', measurementId);

  if (siteConfig.tracking.enableTestMode) {
    console.log(`[Tracking] GA4 ${measurementId} inicializado.`);
  }
}

/**
 * Dispara evento genérico para Meta Pixel, GA4 e GTM
 */
export function trackCustomEvent(eventName: string, params: Record<string, any> = {}) {
  const utms = getSavedUtms();
  const enrichedParams = { ...params, ...utms, timestamp: new Date().toISOString() };

  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, enrichedParams);
  }

  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, enrichedParams);
  }

  // Google Tag Manager / DataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...enrichedParams
    });
  }

  if (siteConfig.tracking.enableTestMode) {
    console.log(`[Tracking Event] ${eventName}:`, enrichedParams);
  }
}

/**
 * Dispara o evento padrão Lead do Meta Pixel (apenas uma vez por sessão/recarga)
 */
export function trackLeadEvent(leadData: Record<string, any> = {}, forceSingleFire = true) {
  if (forceSingleFire && typeof window !== 'undefined') {
    const alreadyFired = sessionStorage.getItem(LEAD_FIRED_KEY);
    if (alreadyFired) {
      if (siteConfig.tracking.enableTestMode) {
        console.log('[Tracking] Evento Lead já disparado nesta sessão. Ignorando duplicação.');
      }
      return;
    }
    sessionStorage.setItem(LEAD_FIRED_KEY, 'true');
  }

  const utms = getSavedUtms();
  const params = {
    content_name: 'Lead Dr. Hugo Florêncio',
    content_category: 'Cardiologia',
    ...leadData,
    ...utms
  };

  // Meta Pixel padrão Lead
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', params);
  }

  // GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', params);
  }

  // DataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'lead_captured',
      ...params
    });
  }

  if (siteConfig.tracking.enableTestMode) {
    console.log('[Tracking Lead]', params);
  }
}

/**
 * Constrói link de WhatsApp com mensagem e rastreia o clique
 */
export type WhatsAppSource =
  | 'hero_whatsapp'
  | 'services_whatsapp'
  | 'faq_whatsapp'
  | 'final_whatsapp'
  | 'floating_whatsapp'
  | 'mobile_bottom_bar'
  | 'form_submission';

export function getWhatsAppLink(source: WhatsAppSource, customMessage?: string): string {
  const phone = siteConfig.whatsapp.number;
  const message =
    customMessage ||
    siteConfig.whatsapp.sourceMessages[source] ||
    siteConfig.whatsapp.defaultMessage;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function handleWhatsAppClick(
  source: WhatsAppSource,
  customMessage?: string,
  extraParams?: Record<string, any>
) {
  // Dispara eventos de Contact e ClickWhatsApp
  trackCustomEvent('WhatsAppClick', {
    source,
    button_label: source,
    ...extraParams
  });

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      source,
      content_name: 'WhatsApp Contact'
    });
  }

  const link = getWhatsAppLink(source, customMessage);
  window.open(link, '_blank', 'noopener,noreferrer');
}

/**
 * Envio assíncrono para Webhook/CRM configurado
 */
export async function sendLeadToWebhook(formData: Record<string, any>): Promise<boolean> {
  const webhookUrl = siteConfig.tracking.webhookUrl;
  if (!webhookUrl) {
    if (siteConfig.tracking.enableTestMode) {
      console.log('[Webhook] URL não configurada. Dados do lead simulados:', formData);
    }
    return true;
  }

  try {
    const utms = getSavedUtms();
    const payload = {
      ...formData,
      utms,
      submittedAt: new Date().toISOString(),
      source: 'landing_page_dr_hugo'
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return response.ok;
  } catch (err) {
    console.error('[Webhook Error]', err);
    return false;
  }
}
