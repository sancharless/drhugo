# Landing Page Médica – Dr. Hugo Florêncio
### Cardiologia • Ecocardiografia • Prevenção Cardiovascular

Landing Page de alta conversão desenvolvida para captação de pacientes e tráfego qualificado do **Meta Ads (Instagram & Facebook)**, em conformidade total com a **Resolução CFM nº 2.336/2023** e a **LGPD (Lei nº 13.709/2018)**.

---

## 📋 Identificação Profissional Obrigatória (CFM)
- **Nome:** Dr. Hugo Florêncio
- **Médico:** CRM-PE 26.300
- **Cardiologista:** RQE 12.302
- **Ecocardiografista:** RQE 16.141
- **Clínica Médica:** RQE 16.628

---

## 🚀 Como Executar o Projeto Localmente

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse no navegador: `http://localhost:3000`

3. **Gerar pacote de produção (Build):**
   ```bash
   npm run build
   ```
   Os arquivos otimizados e minificados para deploy serão gerados na pasta `dist/`.

---

## ⚙️ Painel de Configuração Rápida (`src/config/siteConfig.ts`)

Todas as variáveis do site estão centralizadas no arquivo [`src/config/siteConfig.ts`](src/config/siteConfig.ts):

| Parâmetro | Descrição | Onde Editar |
| :--- | :--- | :--- |
| `doctor.name` | Nome do médico | `siteConfig.doctor.name` |
| `doctor.crm` / `rqe...` | Registros CRM e RQEs | `siteConfig.doctor` |
| `whatsapp.number` | Número com DDD (apenas dígitos) | `siteConfig.whatsapp.number` |
| `whatsapp.displayNumber` | Formato visual (81) 99999-9999 | `siteConfig.whatsapp.displayNumber` |
| `tracking.metaPixelId` | ID do Meta Pixel para anúncios | `siteConfig.tracking.metaPixelId` |
| `tracking.ga4MeasurementId` | ID do Google Analytics 4 | `siteConfig.tracking.ga4MeasurementId` |
| `tracking.webhookUrl` | URL para receber leads no CRM | `siteConfig.tracking.webhookUrl` |
| `locations` | Endereços dos consultórios | `siteConfig.locations` |
| `services` | Lista de atendimentos e exames | `siteConfig.services` |

---

## 📊 Rastreamento e Parâmetros UTM

A página captura automaticamente todos os parâmetros de campanha presentes na URL e os repassa nas conversões de formulário e cliques no WhatsApp:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `fbclid` / `gclid`

### Eventos Disparados:
- **`PageView` / `PageView_Landing`**: Ao carregar a página.
- **`Contact` / `WhatsAppClick`**: Ao clicar em qualquer botão de WhatsApp (com identificação da seção de origem).
- **`Lead`**: Ao enviar o formulário de agendamento ou acessar a rota `/obrigado` (com proteção contra disparo duplicado por recarregamento).

---

## ⚖️ Conformidade CFM e LGPD

- **Resolução CFM nº 2.336/2023:** Ausência de promessas de cura, sem sensacionalismo, sem contadores de escassez falsa, exibição clara de CRM e RQEs, aviso para emergências (SAMU 192).
- **LGPD:** Banner de consentimento de cookies com controle granular (Essenciais vs Marketing/Analytics), formulário seguro sem coleta de dados clínicos sensíveis, política de privacidade acessível.
