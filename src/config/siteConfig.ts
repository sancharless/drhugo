/**
 * CONFIGURAÇÃO CENTRALIZADA DA LANDING PAGE
 * Dr. Hugo Florêncio - Cardiologia & Ecocardiografia
 * 
 * Permite alteração simples de informações profissionais, telefones, 
 * locais de atendimento, serviços, pixels e rastreamento.
 */

export interface ClinicLocation {
  id: string;
  name: string;
  badge?: string;
  address: string;
  neighborhood: string;
  cityState: string;
  phone: string;
  whatsappNumber: string; // Apenas dígitos (ex: 5581999999999)
  hours: string;
  googleMapsUrl: string;
  embedMapSrc?: string;
}

export interface MedicalService {
  id: string;
  title: string;
  description: string;
  highlightBadge?: string;
  details?: string[];
  rqeRequired?: string;
  iconName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const siteConfig = {
  // Identificação Profissional Obrigatória (Resolução CFM 2.336/2023)
  doctor: {
    name: "Dr. Hugo Florêncio",
    titlePrefix: "Dr.",
    fullDesignation: "Médico Cardiologista e Ecocardiografista",
    crm: "CRM-PE 26.300",
    rqeCardio: "RQE 12.302 (Cardiologia)",
    rqeEco: "RQE 16.141 (Ecocardiografia)",
    rqeClinica: "RQE 16.628 (Clínica Médica)",
    credentialsShort: "CRM-PE 26.300 | RQE 12.302 | RQE 16.141 | RQE 16.628",
    credentialsBadge: "CRM-PE 26.300 | RQE 12.302 | RQE 16.141",
    // Fotografias oficiais
    heroPhoto: "/images/dr-hugo-florencio.png",
    aboutPhoto: "/images/dr-hugo-florencio.png",
    social: {
      instagram: "https://instagram.com/drhugoflorencio", // Editável
      instagramHandle: "@drhugoflorencio"
    }
  },

  // WhatsApp e Atendimento
  whatsapp: {
    // Número oficial com DDI e DDD (Apenas dígitos). 
    // OBS: Substitua pelo número oficial do consultório antes de publicar.
    number: "5581999999999", 
    displayNumber: "(81) 99999-9999",
    // Mensagem padrão inicial
    defaultMessage: "Olá! Encontrei a página do Dr. Hugo Florêncio e gostaria de consultar os horários disponíveis para atendimento cardiológico.",
    // Variações de mensagem conforme o botão de origem
    sourceMessages: {
      hero_whatsapp: "Olá! Gostaria de consultar os horários disponíveis para avaliação cardiológica com o Dr. Hugo Florêncio.",
      services_whatsapp: "Olá! Gostaria de saber mais sobre os atendimentos e exames cardiológicos do Dr. Hugo Florêncio.",
      faq_whatsapp: "Olá! Tenho uma dúvida sobre a consulta cardiológica e gostaria de orientações da equipe.",
      final_whatsapp: "Olá! Gostaria de dar o próximo passo e agendar uma avaliação com o Dr. Hugo Florêncio.",
      floating_whatsapp: "Olá! Encontrei o site do Dr. Hugo Florêncio e gostaria de agendar uma consulta.",
      mobile_bottom_bar: "Olá! Gostaria de verificar os horários de atendimento do Dr. Hugo Florêncio.",
      form_submission: "Olá! Acabei de enviar minha solicitação pelo site e gostaria de agilizar meu agendamento com o Dr. Hugo Florêncio."
    }
  },

  // Conteúdo das Seções Principais
  hero: {
    badge: "Cardiologia • Ecocardiografia • Prevenção",
    headline: "Cuidar do coração é cuidar de cada fase da sua vida.",
    subheadline: "Avaliação cardiológica, prevenção e acompanhamento individualizado para você cuidar da sua saúde com mais segurança e tranquilidade.",
    ctaPrimary: "Agendar avaliação pelo WhatsApp",
    ctaSecondary: "Conhecer o atendimento",
    footnote: "Entre em contato para consultar horários, localização e disponibilidade de atendimento."
  },

  about: {
    headline: "Cuidado cardiológico com escuta, clareza e atenção individualizada.",
    description: "O Dr. Hugo Florêncio atua em Cardiologia, Ecocardiografia e Clínica Médica, oferecendo uma abordagem baseada na avaliação cuidadosa, na prevenção e no acompanhamento individual de cada paciente. Durante o atendimento, histórico, sintomas, hábitos e fatores de risco são considerados para orientar os próximos passos com responsabilidade e clareza.",
    pillars: [
      {
        title: "Escuta atenta e humanizada",
        desc: "Tempo dedicado para compreender sua rotina, histórico e necessidades de saúde."
      },
      {
        title: "Prevenção baseada em evidências",
        desc: "Avaliações precisas para proteger seu coração antes que os sintomas surjam."
      },
      {
        title: "Conduta individualizada",
        desc: "Orientações e acompanhamento desenhados especificamente para o seu perfil."
      }
    ]
  },

  // Situações para Avaliação (Bloco de Identificação)
  situations: [
    {
      id: "checkup",
      title: "Check-up e prevenção cardiovascular",
      description: "Avaliação periódica para manter a saúde do coração em dia e prevenir intercorrências futuras.",
      icon: "ShieldCheck"
    },
    {
      id: "family-history",
      title: "Histórico familiar de doenças cardíacas",
      description: "Pessoas com parentes de primeiro grau com histórico de infarto, hipertensão ou arritmias.",
      icon: "Users"
    },
    {
      id: "risk-factors",
      title: "Pressão alta, diabetes ou colesterol elevado",
      description: "Acompanhamento rigoroso e orientação preventiva para controle desses fatores de risco.",
      icon: "Activity"
    },
    {
      id: "fitness",
      title: "Avaliação antes de iniciar atividades físicas",
      description: "Análise médica de aptidão cardiovascular para prática segura de esportes e exercícios.",
      icon: "Zap"
    },
    {
      id: "monitoring",
      title: "Acompanhamento de condições cardiovasculares",
      description: "Seguimento contínuo para pacientes que já possuem indicação de monitoramento cardiológico.",
      icon: "HeartHandshake"
    },
    {
      id: "symptoms",
      title: "Sintomas que precisam de avaliação médica",
      description: "Cansaço desproporcional, palpitações ou desconfortos que demandam investigação clínica adequada.",
      icon: "Stethoscope"
    }
  ],

  // Serviços e Atendimentos
  services: [
    {
      id: "consulta-cardiologica",
      title: "Consulta Cardiológica",
      description: "Avaliação clínica detalhada com análise de fatores de risco, histórico de saúde e orientação médica individualizada.",
      highlightBadge: "Atendimento Clínico",
      rqeRequired: "RQE 12.302",
      iconName: "Heart"
    },
    {
      id: "ecocardiografia",
      title: "Ecocardiografia",
      description: "Exame de imagem por ultrassom que avalia a estrutura e o funcionamento mecânico do coração em tempo real.",
      highlightBadge: "Especialidade Registrada",
      rqeRequired: "RQE 16.141",
      iconName: "Scan"
    },
    {
      id: "avaliacao-preventiva",
      title: "Avaliação Cardiovascular Preventiva",
      description: "Estratificação de risco e definição de estratégias preventivas personalizadas para preservar sua saúde vascular.",
      highlightBadge: "Prevenção",
      iconName: "Shield"
    },
    {
      id: "acompanhamento-cardiologico",
      title: "Acompanhamento Cardiológico",
      description: "Seguimento regular e responsável para ajuste de hábitos, medicações e estabilização de parâmetros cardíacos.",
      highlightBadge: "Cuidado Contínuo",
      iconName: "FileHeart"
    },
    {
      id: "avaliacao-pre-exercicio",
      title: "Avaliação Pré-Participação em Atividade Física",
      description: "Exame clínico preventivo para liberação segura e consciente da prática de exercícios esportivos e treinos.",
      highlightBadge: "Saúde & Movimento",
      iconName: "Flame"
    },
    {
      id: "investigacao-fatores-risco",
      title: "Investigação de Fatores de Risco",
      description: "Mapeamento cuidadoso de hipertensão, perfil lipídico, glicemia e outros elementos de impacto cardiovascular.",
      highlightBadge: "Diagnóstico Preventivo",
      iconName: "CheckCircle2"
    }
  ] as MedicalService[],

  // Pilares Educativos
  educationalPillars: [
    {
      title: "Avaliação individualizada",
      description: "Cada organismo possui particularidades. A conduta médica deve ser sempre personalizada.",
      icon: "UserCheck"
    },
    {
      title: "Prevenção cardiovascular",
      description: "Cuidar dos fatores de risco precocemente é a melhor forma de proteger sua longevidade.",
      icon: "ShieldAlert"
    },
    {
      title: "Acompanhamento responsável",
      description: "O acompanhamento periódico traz estabilidade e segurança para a sua rotina.",
      icon: "Clock"
    },
    {
      title: "Informação clara para o paciente",
      description: "Você no centro das decisões, entendendo seus exames e os cuidados com clareza.",
      icon: "Sparkles"
    }
  ],

  // Perguntas Frequentes (FAQ)
  faq: [
    {
      id: "faq-1",
      question: "Preciso ter sintomas para procurar um cardiologista?",
      answer: "Não. A consulta também pode ter caráter preventivo, especialmente quando existem fatores de risco ou histórico familiar. A necessidade e a frequência da avaliação devem ser definidas individualmente em consulta."
    },
    {
      id: "faq-2",
      question: "Posso fazer uma avaliação antes de iniciar exercícios?",
      answer: "Sim. O médico poderá avaliar histórico, fatores de risco e condições clínicas, indicando exames específicos quando houver necessidade para garantir a segurança da sua prática."
    },
    {
      id: "faq-3",
      question: "Como saber quais exames preciso realizar?",
      answer: "Os exames são indicados após avaliação médica criteriosa, considerando o histórico de saúde, exame físico e as necessidades reais de cada paciente."
    },
    {
      id: "faq-4",
      question: "O atendimento é particular ou por convênio?",
      answer: "Entre em contato diretamente com a nossa equipe pelo WhatsApp para consultar as modalidades disponíveis de atendimento, opções de convênios ou valores particulares."
    },
    {
      id: "faq-5",
      question: "Onde são realizados os atendimentos?",
      answer: "A localização, os dias e os horários disponíveis serão prontamente informados pela equipe no momento do contato e solicitação de agendamento."
    }
  ] as FaqItem[],

  // Locais de Atendimento (Placeholders editáveis)
  locations: [
    {
      id: "consultorio-recife",
      name: "Consultório Dr. Hugo Florêncio",
      badge: "Atendimento com Hora Marcada",
      address: "Av. Principal do Consultório, 1000 - Sala 501",
      neighborhood: "Bairro Central",
      cityState: "Recife - PE",
      phone: "(81) 99999-9999",
      whatsappNumber: "5581999999999",
      hours: "Segunda a Sexta, conforme agendamento prévio",
      googleMapsUrl: "https://maps.google.com/?q=Recife+PE",
      embedMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.407675123985!2d-34.8966952!3d-8.0594396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18bbd83f2a89%3A0x28976b92f703ad!2sRecife%2C%20PE!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
    }
  ] as ClinicLocation[],

  // Configurações de Rastreamento e Marketing
  tracking: {
    metaPixelId: "SEU_PIXEL_ID_AQUI", // Ex: "123456789012345"
    ga4MeasurementId: "G-XXXXXXXXXX", // Ex: "G-ABC123XYZ"
    gtmContainerId: "GTM-XXXXXXX",   // Ex: "GTM-5ABCD"
    webhookUrl: "",                   // Ex: "https://webhook.site/seu-endpoint-crm"
    enableTestMode: true              // Ativa logs no console quando em desenvolvimento
  },

  // Avisos Legais e Éticos (Resolução CFM 2.336/2023)
  legal: {
    emergencyWarning: "As informações desta página possuem caráter educativo e não substituem consulta ou avaliação médica. Em situações de urgência ou emergência, procure imediatamente um serviço de emergência hospitalar ou ligue para o SAMU – 192.",
    educationalWarning: "Este conteúdo tem caráter estritamente informativo e não substitui consulta, diagnóstico ou orientação médica individualizada.",
    consentFormText: "Autorizo o contato da equipe para tratar exclusivamente da solicitação de agendamento, conforme a Política de Privacidade.",
    privacyPolicyLastUpdated: "2026-08-27"
  }
};
