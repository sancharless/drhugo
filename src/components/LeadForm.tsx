import React, { useState } from 'react';
import { 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Clock, 
  HeartHandshake 
} from 'lucide-react';
import { formatBrazilianPhone, isValidBrazilianPhone } from '../utils/masks';
import { sendLeadToWebhook, trackLeadEvent, trackCustomEvent } from '../utils/tracking';

interface LeadFormProps {
  onSuccessRedirect?: (leadData: { name: string; phone: string; service: string }) => void;
  onOpenPrivacyModal?: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ 
  onSuccessRedirect,
  onOpenPrivacyModal 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    shiftPreference: 'indiferente',
    serviceType: 'consulta-cardiologica',
    consent: false,
    // Honeypot anti-spam (deve permanecer vazio)
    website_address_fake: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isChecked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    if (name === 'phone') {
      setFormData(prev => ({
        ...prev,
        phone: formatBrazilianPhone(value)
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: isChecked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpa erro do campo alterado
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = 'Por favor, informe seu nome completo.';
    }

    if (!formData.phone || !isValidBrazilianPhone(formData.phone)) {
      newErrors.phone = 'Informe um WhatsApp válido com DDD (ex: 81 99999-9999).';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Por favor, informe sua cidade.';
    }

    if (!formData.consent) {
      newErrors.consent = 'É necessário autorizar o contato para prosseguir.';
    }

    // Se o honeypot foi preenchido por bot, bloqueia silenciosamente
    if (formData.website_address_fake) {
      newErrors.name = 'Erro de validação.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone,
        city: formData.city.trim(),
        shiftPreference: formData.shiftPreference,
        serviceType: formData.serviceType,
        consentGranted: true,
        source: 'landing_page_lead_form'
      };

      // Dispara evento Lead para Meta Pixel, GA4 e GTM
      trackLeadEvent({
        form_name: 'agendamento_principal',
        service_type: formData.serviceType,
        city: formData.city
      }, true);

      trackCustomEvent('FormSubmitSuccess', {
        service_type: formData.serviceType
      });

      // Salva no sessionStorage para a página de obrigado
      sessionStorage.setItem('dr_hugo_last_lead', JSON.stringify({
        name: formData.name.trim(),
        phone: formData.phone,
        service: formData.serviceType,
        timestamp: new Date().toISOString()
      }));

      // Envia para o Webhook configurado
      await sendLeadToWebhook(payload);

      setSubmitted(true);

      if (onSuccessRedirect) {
        onSuccessRedirect({
          name: formData.name.trim(),
          phone: formData.phone,
          service: formData.serviceType
        });
      }
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="formulario" className="py-20 sm:py-32 bg-slate-50/50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 lg:p-16 shadow-card max-w-3xl mx-auto">
          
          {/* Cabeçalho do Formulário */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-petroleum/10 text-petroleum text-xs font-semibold uppercase tracking-wider">
              <Lock className="w-3 h-3" />
              Solicitação Segura
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 leading-tight">
              Solicite seu agendamento
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Preencha seus dados e a equipe entrará em contato para informar os horários disponíveis e tirar suas dúvidas.
            </p>
          </div>

          {/* Estado de Sucesso Inline (Caso não redirecione imediatamente) */}
          {submitted ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-emerald-200 shadow-xs space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-navy-900">Solicitação enviada com sucesso!</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Recebemos seus dados. Nossa equipe entrará em contato pelo WhatsApp informado para dar continuidade ao seu agendamento.
              </p>
            </div>
          ) : (
            /* Formulário de Captura */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Campo Honeypot Oculto (Anti-Spam) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_address_fake"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_address_fake}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Nome Completo */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Nome Completo <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Seu nome e sobrenome"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-4 rounded-xl border bg-slate-50/50 text-slate-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                        errors.name ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:border-petroleum focus:ring-petroleum/20'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* WhatsApp com DDD */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    WhatsApp com DDD <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="(81) 99999-9999"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={15}
                      className={`w-full pl-10 pr-4 py-4 rounded-xl border bg-slate-50/50 text-slate-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                        errors.phone ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:border-petroleum focus:ring-petroleum/20'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Cidade */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="city" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Cidade <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      placeholder="Ex: Recife, Olinda, Jaboatão..."
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-4 rounded-xl border bg-slate-50/50 text-slate-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                        errors.city ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:border-petroleum focus:ring-petroleum/20'
                      }`}
                    />
                  </div>
                  {errors.city && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.city}
                    </p>
                  )}
                </div>

                {/* Preferência de Período */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="shiftPreference" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Preferência de Período
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <select
                      id="shiftPreference"
                      name="shiftPreference"
                      value={formData.shiftPreference}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-base sm:text-sm focus:outline-none focus:border-petroleum focus:ring-2 focus:ring-petroleum/20 focus:bg-white transition-all"
                    >
                      <option value="indiferente">Indiferente / Qualquer horário</option>
                      <option value="manha">Manhã</option>
                      <option value="tarde">Tarde</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Tipo de Atendimento Desejado */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="serviceType" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Tipo de Atendimento de Interesse
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-base sm:text-sm focus:outline-none focus:border-petroleum focus:ring-2 focus:ring-petroleum/20 focus:bg-white transition-all"
                  >
                    <option value="consulta-cardiologica">Consulta Cardiológica (Avaliação e Prevenção)</option>
                    <option value="ecocardiografia">Ecocardiografia (Exame RQE 16.141)</option>
                    <option value="acompanhamento">Acompanhamento de Condição Cardiovascular</option>
                    <option value="avaliacao-fisica">Avaliação para Atividade Física</option>
                    <option value="orientacao">Quero orientação da equipe sobre qual agendar</option>
                  </select>
                </div>
              </div>

              {/* Checkbox de Consentimento LGPD */}
              <div className="pt-2 text-left">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-petroleum focus:ring-petroleum/30 shrink-0"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed font-normal">
                    Autorizo o contato da equipe para tratar exclusivamente da solicitação de agendamento, conforme a{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyModal}
                      className="text-petroleum underline hover:text-navy-900 font-semibold"
                    >
                      Política de Privacidade
                    </button>
                    .
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 mt-1.5 pl-7">
                    <AlertCircle className="w-3 h-3" /> {errors.consent}
                  </p>
                )}
              </div>

              {/* Botão de Envio */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-petroleum hover:bg-petroleum-hover active:bg-petroleum-hover text-white text-base font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Enviando solicitação...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Solicitar contato</span>
                    </>
                  )}
                </button>
              </div>

              {/* Garantias de Privacidade LGPD */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                  Dados protegidos (LGPD)
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-sage" />
                  Sem envio de spam
                </span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
