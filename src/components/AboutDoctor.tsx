import React from 'react';
import {
  Heart,
  Stethoscope,
  Scan,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Award,
  Users,
  CalendarCheck2,
  GraduationCap
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { handleWhatsAppClick } from '../utils/tracking';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useCountUp } from '../hooks/useCountUp';

// Componente de contador individual
const StatCounter: React.FC<{
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: React.ElementType;
  duration?: number;
}> = ({ target, suffix = '', prefix = '', label, icon: Icon, duration = 2000 }) => {
  const { count, ref } = useCountUp(target, duration);
  return (
    <div ref={ref} className="text-center space-y-2 reveal">
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <Icon className="w-5 h-5 text-gold" />
      </div>
      <div className="text-4xl sm:text-5xl font-serif font-bold text-navy-900 tabular-nums">
        {prefix}{count.toLocaleString('pt-BR')}{suffix}
      </div>
      <div className="text-sm font-medium text-slate-500 leading-tight">{label}</div>
    </div>
  );
};

export const AboutDoctor: React.FC = () => {
  const credentials = [
    {
      title: "Médico",
      code: "CRM-PE 26.300",
      desc: "Inscrição no Conselho Regional de Medicina de Pernambuco",
      icon: Stethoscope
    },
    {
      title: "Cardiologista",
      code: "RQE 12.302",
      desc: "Registro de Qualificação de Especialista em Cardiologia",
      icon: Heart
    },
    {
      title: "Ecocardiografista",
      code: "RQE 16.141",
      desc: "Registro de Qualificação de Especialista em Ecocardiografia",
      icon: Scan
    },
    {
      title: "Clínica Médica",
      code: "RQE 16.628",
      desc: "Registro de Qualificação de Especialista em Clínica Médica",
      icon: Building2
    }
  ];

  return (
    <section id="sobre" className="py-20 sm:py-32 bg-white relative overflow-hidden">

      {/* Detalhe decorativo de fundo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-gold/5 via-transparent to-transparent rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-petroleum/3 via-transparent to-transparent rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── BLOCO DE NÚMEROS ANIMADOS ─────────────────────────────── */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center mb-12 reveal">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 text-gold-hover text-xs font-semibold uppercase tracking-wider mb-4">
              Em números
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900">
              Experiência que se traduz em cuidado
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-8 sm:gap-12 max-w-3xl mx-auto">
            <StatCounter
              target={10}
              suffix="+"
              label="Anos de Experiência Clínica"
              icon={CalendarCheck2}
              duration={1500}
            />
            <StatCounter
              target={4}
              label="Especializações Registradas no CFM"
              icon={GraduationCap}
              duration={1200}
            />
            <StatCounter
              target={500}
              suffix="+"
              label="Pacientes Atendidos com Cuidado Humanizado"
              icon={Users}
              duration={2200}
            />
          </div>

          {/* Linha divisória elegante */}
          <div className="mt-16 sm:mt-20 flex items-center gap-6 max-w-3xl mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-200" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-200" />
          </div>
        </div>

        {/* ── BLOCO PRINCIPAL: FOTO + TEXTO ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Foto */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center reveal-left">
            <div className="relative w-full max-w-md">

              {/* Elemento decorativo dourado */}
              <div className="absolute -inset-3 bg-gradient-to-br from-gold/20 via-transparent to-petroleum/10 rounded-[2.5rem] blur-2xl opacity-60" />

              <div className="relative bg-navy-950 rounded-[2rem] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.2)] ring-1 ring-white/10">

                <div className="relative rounded-3xl bg-slate-100 overflow-hidden aspect-[4/5]">
                  <img
                    src={siteConfig.doctor.aboutPhoto}
                    alt="Dr. Hugo Florêncio no Consultório"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950/90 via-navy-900/40 to-transparent pointer-events-none" />

                  {/* Badge topo */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-xs font-bold bg-navy-950/70 backdrop-blur-xl px-3.5 py-2 rounded-xl border border-white/10 text-white">
                    <span className="flex items-center gap-1.5 text-gold">
                      <ShieldCheck className="w-4 h-4" />
                      Qualificações Registradas
                    </span>
                    <span className="text-slate-300 font-semibold">CRM-PE 26.300</span>
                  </div>

                  {/* Badge base */}
                  <div className="absolute bottom-4 left-4 right-4 bg-navy-950/80 backdrop-blur-xl text-white rounded-2xl p-3.5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4 text-gold" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white font-serif">Atendimento Cardiológico Humanizado</div>
                        <div className="text-[11px] text-slate-300">Escuta atenta e conduta individualizada</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-8 text-left reveal-right">

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-petroleum/10 text-petroleum text-xs font-semibold uppercase tracking-wider">
              Sobre o Médico
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 leading-tight">
              {siteConfig.about.headline}
            </h2>

            <p className="text-base sm:text-lg text-slate-500 leading-loose">
              {siteConfig.about.description}
            </p>

            {/* Pilares */}
            <div className="space-y-4 pt-2">
              {siteConfig.about.pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="mt-1 p-1.5 rounded-full bg-gold/10 text-gold shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-navy-900">{pillar.title}: </span>
                    <span className="text-sm text-slate-500">{pillar.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Registros profissionais */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Registros Profissionais Oficiais (CFM / CRM-PE)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {credentials.map((cred, idx) => {
                  const Icon = cred.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-slate-50/80 p-4 rounded-2xl shadow-soft hover:shadow-card transition-all flex items-start gap-3.5"
                    >
                      <div className="p-2.5 rounded-xl bg-white text-petroleum shadow-soft shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy-900">{cred.title}</div>
                        <div className="text-xs font-extrabold text-gold">{cred.code}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{cred.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => handleWhatsAppClick('hero_whatsapp')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-sm hover:shadow-glow-whatsapp transition-all hover:-translate-y-0.5 duration-200"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Solicitar agendamento com Dr. Hugo</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
