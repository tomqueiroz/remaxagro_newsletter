/**
 * generateNewsletterHTML v3
 * ─────────────────────────────────────────────────────────────────────────────
 * HTML de email newsletter single-scroll, mobile-first, design moderno.
 *
 * Compatibilidade testada:
 *   Gmail Web · Gmail App · Outlook 2019/365/Web · Apple Mail · Yahoo · Samsung
 *
 * Estrutura:
 *   1. Preheader oculto
 *   2. Header — navy bg, logo, título "NEWSLETTER SEMANAL EXCLUSIVA", edição, data
 *   3. Hero — imagem full, overlay navy, CTA button
 *   4. Ticker — cotações destacadas
 *   5. Editorial — carta do CEO + stats box
 *   6. Cotações — grid 4-col responsivo
 *   7. Top Notícias (2-col: main + sidebar blog)
 *   8. Novidades do Agro (3 cards)
 *   9. Eventos & Agenda
 *  10. Oportunidades em Propriedades Rurais
 *  11. Corretores Certificados (selo + link para a página)
 *  12. CTA final dourada
 *  13. Footer legal LGPD (navy bg)
 */

import type { NewsletterData } from "@/hooks/useNewsletterData";

// Imagens hospedadas no servidor (substituir pela CDN real)
const IMGS = {
  logoWhite:  "https://agro.remax.com.br/images/logo-white.png",
  logoColor:  "https://agro.remax.com.br/images/logo-color.png",
  selo:       "https://agro.remax.com.br/images/selo-corretor-certificado.png",
  hero:       "https://agro.remax.com.br/images/hero-agro-newsletter.jpg",
  prop1:      "https://agro.remax.com.br/images/fazenda-mato-grosso.jpg",
  prop2:      "https://agro.remax.com.br/images/fazenda-goias.jpg",
  prop3:      "https://agro.remax.com.br/images/fazenda-minas.jpg",
};

export function generateNewsletterHTML(data: NewsletterData): string {
  const { editionNumber, editionDate, lastUpdated, quotations, mainNews, secondaryNews, insights, brokers } = data;

  const preheader = `📈 Safra recorde de soja, COPOM e janelas estratégicas — tudo que importa para o agro desta semana · Edição ${editionNumber}`;

  // ── Ticker text ──────────────────────────────────────────────────────────
  const tickerHTML = quotations.slice(0, 5).map(q =>
    `<span style="color:#ffffff;font-weight:700;">${q.name}</span>&nbsp;<span style="color:${q.change >= 0 ? "#6EE7B7" : "#FCA5A5"};">R$&nbsp;${q.value}&nbsp;${q.change >= 0 ? "▲" : "▼"}${Math.abs(q.change)}%</span>`
  ).join(`<span style="color:rgba(255,255,255,0.3);margin:0 10px;">·</span>`);

  // ── Cotações cards ───────────────────────────────────────────────────────
  const quoteCards = quotations.slice(0, 4).map(q => `
  <!--[if mso]><td width="140" valign="top"><![endif]-->
  <div style="display:inline-block;vertical-align:top;width:100%;max-width:132px;margin:4px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff;border-radius:10px;border-bottom:3px solid #C9A84C;">
      <tr><td style="padding:14px 12px 12px;text-align:center;">
        <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:#5A5A5A;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,sans-serif;">${q.name}</p>
        <p style="margin:0;font-size:20px;font-weight:700;color:#1E1E1E;font-family:Arial,sans-serif;line-height:1;">R$ ${q.value}</p>
        <p style="margin:2px 0 6px;font-size:9px;color:#9A9A9A;font-family:Arial,sans-serif;">${q.unit}</p>
        <p style="margin:0 0 3px;font-size:12px;font-weight:700;color:${q.change >= 0 ? "#059669" : "#DC2626"};font-family:Arial,sans-serif;">
          ${q.change >= 0 ? "▲" : "▼"} ${Math.abs(q.change)}%
        </p>
        <p style="margin:0;font-size:9px;color:#9A9A9A;font-family:Arial,sans-serif;">${q.region}</p>
      </td></tr>
    </table>
  </div>
  <!--[if mso]></td><![endif]-->`).join("");

  // ── Notícias principais ──────────────────────────────────────────────────
  const mainNewsHTML = mainNews.map(n => `
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:14px;background:#ffffff;border-radius:10px;border-left:4px solid #C9A84C;">
    <tr><td style="padding:16px 18px;">
      <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:#C9A84C;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">${n.category}</p>
      <h3 style="margin:0 0 9px;font-size:17px;color:#1E1E1E;line-height:1.4;font-family:Georgia,'Times New Roman',serif;">${n.title}</h3>
      ${n.summary ? `<p style="margin:0 0 12px;font-size:13px;color:#5A5A5A;line-height:1.65;font-family:Arial,sans-serif;">${n.summary}</p>` : ""}
      <table cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="font-size:11px;color:#9A9A9A;font-family:Arial,sans-serif;">${n.date}${n.readTime ? ` · ${n.readTime}` : ""}</td>
        ${n.url ? `<td style="padding-left:14px;"><a href="${n.url}" style="font-size:11px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;">Leia o artigo →</a></td>` : ""}
      </tr></table>
    </td></tr>
  </table>`).join("");

  // ── Sidebar blog ─────────────────────────────────────────────────────────
  const sideNewsHTML = secondaryNews.map(n => `
  <tr>
    <td style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.08);">
      <table cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="8" valign="top" style="padding-top:4px;">
          <div style="width:5px;height:5px;border-radius:50%;background:#C9A84C;display:inline-block;">&nbsp;</div>
        </td>
        <td style="padding-left:6px;">
          <p style="margin:0 0 2px;font-size:9px;font-weight:700;color:#C9A84C;text-transform:uppercase;letter-spacing:0.8px;font-family:Arial,sans-serif;">${n.category}</p>
          ${n.url
            ? `<a href="${n.url}" style="font-size:12px;color:#ffffff;text-decoration:none;line-height:1.45;font-family:Arial,sans-serif;display:block;">${n.title}</a>`
            : `<p style="margin:0;font-size:12px;color:#ffffff;line-height:1.45;font-family:Arial,sans-serif;">${n.title}</p>`
          }
          <p style="margin:3px 0 0;font-size:10px;color:rgba(255,255,255,0.4);font-family:Arial,sans-serif;">${n.date}</p>
        </td>
      </tr></table>
    </td>
  </tr>`).join("");

  // ── Insights ─────────────────────────────────────────────────────────────
  const insightsHTML = insights.map(i => {
    const bg    = i.urgency === "alta" ? "#FEE2E2" : i.urgency === "evento" ? "#D1FAE5" : "#FEF3C7";
    const col   = i.urgency === "alta" ? "#B91C1C" : i.urgency === "evento" ? "#065F46"  : "#92400E";
    const label = i.urgency === "alta" ? "⚠ Alta Prioridade" : i.urgency === "evento" ? "📅 Evento" : "👁 Atenção";
    return `
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:10px;background:#FBF6EC;border-radius:8px;border-left:3px solid #1a2e4a;">
    <tr><td style="padding:13px 15px;">
      <table cellpadding="0" cellspacing="0" border="0"><tr>
        <td><span style="background:${bg};color:${col};font-size:9px;font-weight:700;padding:2px 9px;border-radius:10px;font-family:Arial,sans-serif;">${label}</span></td>
        <td style="padding-left:8px;font-size:10px;color:#9A9A9A;font-family:Arial,sans-serif;">${i.date}</td>
      </tr></table>
      <h4 style="margin:7px 0 5px;font-size:14px;color:#1E1E1E;line-height:1.4;font-family:Arial,sans-serif;">${i.title}</h4>
      <p style="margin:0;font-size:12px;color:#5A5A5A;line-height:1.6;font-family:Arial,sans-serif;">${i.description}</p>
    </td></tr>
  </table>`;
  }).join("");

  // ── Corretores ───────────────────────────────────────────────────────────
  const brokersHTML = brokers.map(b => `
  <!--[if mso]><td width="50%" valign="top"><![endif]-->
  <div style="display:inline-block;vertical-align:top;width:100%;max-width:256px;padding:5px;box-sizing:border-box;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:rgba(255,255,255,0.06);border-radius:8px;border-left:3px solid #C9A84C;">
      <tr><td style="padding:13px 15px;">
        <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">${b.name}</p>
        <p style="margin:0 0 2px;font-size:11px;color:#C9A84C;font-family:Arial,sans-serif;">${b.role}</p>
        <p style="margin:0 0 10px;font-size:10px;color:rgba(255,255,255,0.45);font-family:Arial,sans-serif;">${b.region}</p>
        <a href="https://wa.me/${b.whatsapp.replace(/\D/g,"")}"
           style="display:inline-block;background:#059669;color:#ffffff;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;text-decoration:none;font-family:Arial,sans-serif;">
          WhatsApp →
        </a>
      </td></tr>
    </table>
  </div>
  <!--[if mso]></td><![endif]-->`).join("");

  return `<!DOCTYPE html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="format-detection" content="telephone=no,date=no,address=no,email=no"/>
  <meta name="color-scheme" content="light"/>
  <meta name="supported-color-schemes" content="light"/>
  <title>RE/MAX AGRO · Newsletter Semanal Exclusiva · Edição ${editionNumber}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    /* ── Reset ── */
    *,*::before,*::after{box-sizing:border-box;}
    body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
    table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;}
    img{border:0;outline:none;text-decoration:none;display:block;-ms-interpolation-mode:bicubic;}
    a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;}
    body{margin:0;padding:0;background:#ECEAE4;font-family:Arial,Helvetica,sans-serif;}

    /* ── Wrapper ── */
    .email-outer{background:#ECEAE4;padding:20px 0;}
    .email-inner{width:600px;max-width:600px;margin:0 auto;}

    /* ── Section utility ── */
    .sec-pad{padding:28px 32px;}
    .sec-pad-sm{padding:20px 32px;}

    /* ── Typography ── */
    .section-pill{display:inline-block;background:#C9A84C;color:#0D1F35;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 12px;border-radius:20px;font-family:Arial,sans-serif;mso-line-height-rule:exactly;}
    .section-title{font-size:22px;font-weight:700;color:#1E1E1E;line-height:1.3;margin:10px 0 18px;font-family:Georgia,'Times New Roman',serif;}
    .section-title-white{font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;margin:10px 0 18px;font-family:Georgia,'Times New Roman',serif;}

    /* ── Mobile ── */
    @media screen and (max-width:620px){
      .email-inner{width:100%!important;max-width:100%!important;}
      .sec-pad{padding:22px 18px!important;}
      .sec-pad-sm{padding:16px 18px!important;}
      .mobile-full{display:block!important;width:100%!important;max-width:100%!important;}
      .mobile-stack{display:block!important;width:100%!important;}
      .mobile-center{text-align:center!important;}
      .mobile-hide{display:none!important;}
      .hero-title{font-size:26px!important;}
      .main-col{width:100%!important;display:block!important;}
      .side-col{width:100%!important;display:block!important;padding-left:0!important;padding-top:12px!important;}
      .broker-item{display:block!important;width:100%!important;max-width:100%!important;}
      .quote-item{display:inline-block!important;width:45%!important;}
      .three-col{display:block!important;width:100%!important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#ECEAE4;">

<!-- Preheader invisible -->
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;font-family:Arial,sans-serif;">
  ${preheader}&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;
</div>

<div class="email-outer">
<table class="email-inner" cellpadding="0" cellspacing="0" border="0" align="center" role="presentation">

<!-- ══════════════════════════════════════════════════════════
     1. HEADER — navy bg
════════════════════════════════════════════════════════════ -->
<tr><td style="background:#0D1F35;border-radius:12px 12px 0 0;padding:0;">
  <!-- Top bar dourada mini -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td height="3" style="background:#C9A84C;font-size:3px;line-height:3px;">&nbsp;</td></tr>
  </table>
  <!-- Header content -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding:22px 32px 18px;" valign="middle">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr valign="middle">
            <!-- Logo -->
            <td valign="middle">
              <img src="${IMGS.logoWhite}" alt="RE/MAX AGRO" width="200" height="66" style="display:block;max-height:66px;width:auto;" />
            </td>
            <!-- Título + edição -->
            <td align="right" valign="middle" style="padding-left:16px;">
              <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#C9A84C;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;mso-line-height-rule:exactly;">Newsletter Semanal Exclusiva</p>
              <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#ffffff;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;mso-line-height-rule:exactly;">Edição&nbsp;Nº&nbsp;${editionNumber}</p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);font-family:Arial,sans-serif;mso-line-height-rule:exactly;">${editionDate}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!-- Nav links mini -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="background:rgba(255,255,255,0.05);padding:8px 32px;border-top:1px solid rgba(255,255,255,0.1);">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${["#cotacoes:Cotações","#noticias:Notícias","#novidades:Novidades","#eventos:Eventos","#propriedades:Propriedades"].map(item => {
            const [href, label] = item.split(":");
            return `<td style="padding-right:18px;"><a href="${href}" style="font-size:10px;color:rgba(255,255,255,0.65);text-decoration:none;font-family:Arial,sans-serif;">${label}</a></td>`;
          }).join("")}
          <td><a href="https://agro.remax.com.br/newsletter" style="font-size:10px;color:#C9A84C;font-weight:700;text-decoration:none;font-family:Arial,sans-serif;">Ver Online →</a></td>
        </tr>
      </table>
    </td></tr>
  </table>
</td></tr>

<!-- ══════════════════════════════════════════════════════════
     2. HERO — full-width com overlay e CTA
════════════════════════════════════════════════════════════ -->
<tr><td style="padding:0;position:relative;">
  <div style="position:relative;line-height:0;font-size:0;">
    <img src="${IMGS.hero}" alt="Agronegócio Brasileiro — RE/MAX AGRO" width="600" style="display:block;width:100%;max-height:320px;object-fit:cover;border:0;" />
    <!-- Overlay table posicionada sobre a imagem -->
  </div>
  <!-- VML overlay para Outlook -->
  <!--[if mso]>
  <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600pt;height:320pt;position:absolute;top:0;left:0;z-index:1;">
    <v:fill type="gradient" color="#0D1F35" color2="transparent" angle="90" opacity="0.75"/>
    <v:textbox inset="0,0,0,0">
  <![endif]-->
  <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(to right, rgba(13,31,53,0.88) 0%, rgba(13,31,53,0.45) 100%);margin-top:-320px;position:relative;z-index:2;">
    <tr><td style="padding:40px 36px;height:320px;vertical-align:middle;">
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#C9A84C;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">✦ Safra 2025/26 · Inteligência Agro</p>
      <h1 class="hero-title" style="margin:0 0 12px;font-size:32px;color:#ffffff;line-height:1.25;max-width:380px;font-family:Georgia,'Times New Roman',serif;">O Agro que Transforma Propriedades em Patrimônio</h1>
      <p style="margin:0 0 22px;font-size:14px;color:rgba(255,255,255,0.8);line-height:1.6;max-width:340px;font-family:Arial,sans-serif;">Cotações em tempo real, oportunidades exclusivas e análises DATAGRO toda segunda-feira.</p>
      <a href="https://agro.remax.com.br" style="display:inline-block;background:#C9A84C;color:#0D1F35;font-size:13px;font-weight:700;padding:13px 26px;border-radius:30px;text-decoration:none;font-family:Arial,sans-serif;letter-spacing:0.5px;">Saiba Mais →</a>
    </td></tr>
  </table>
  <!--[if mso]>
    </v:textbox>
  </v:rect>
  <![endif]-->
</td></tr>

<!-- ══════════════════════════════════════════════════════════
     3. TICKER — faixa vermelha com cotações
════════════════════════════════════════════════════════════ -->
<tr><td style="background:#CC0000;padding:10px 32px;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr valign="middle">
    <td valign="middle" style="white-space:nowrap;padding-right:12px;">
      <span style="display:inline-block;background:rgba(255,255,255,0.2);color:#ffffff;font-size:9px;font-weight:700;padding:3px 9px;border-radius:3px;letter-spacing:1px;font-family:Arial,sans-serif;">⚡ AGRO AO VIVO</span>
    </td>
    <td valign="middle" style="overflow:hidden;">
      <p style="margin:0;font-size:11px;font-family:Arial,sans-serif;line-height:1.4;">${tickerHTML}</p>
    </td>
    <td align="right" valign="middle" style="white-space:nowrap;padding-left:12px;">
      <a href="https://portal.datagro.com/pt" style="font-size:10px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;text-decoration:underline;white-space:nowrap;">Ver tudo →</a>
    </td>
  </tr></table>
</td></tr>

<!-- ══════════════════════════════════════════════════════════
     4. EDITORIAL — carta do CEO + stats
════════════════════════════════════════════════════════════ -->
<tr><td style="background:#0F2A1A;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr valign="top">
      <!-- Texto editorial -->
      <td class="main-col" style="padding:28px 24px 28px 32px;vertical-align:top;">
        <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:#C9A84C;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">✦ Carta Editorial · Edição ${editionNumber}</p>
        <h2 style="margin:0 0 12px;font-size:20px;color:#ffffff;line-height:1.35;font-family:Georgia,'Times New Roman',serif;">O Agro Estratégico na Palma da Sua Mão</h2>
        <p style="margin:0 0 10px;font-size:13px;color:rgba(255,255,255,0.78);line-height:1.7;font-family:Arial,sans-serif;">
          Bem-vindo à newsletter semanal mais relevante do agronegócio brasileiro. Com curadoria exclusiva da <strong style="color:#ffffff;">RE/MAX AGRO powered by DATAGRO</strong> — referência em inteligência agrícola há mais de 35 anos —, você recebe toda segunda-feira o que realmente importa.
        </p>
        <p style="margin:0 0 14px;font-size:13px;color:rgba(255,255,255,0.78);line-height:1.7;font-family:Arial,sans-serif;">
          Esta semana: safra recorde de soja atinge <strong style="color:#C9A84C;">162 Mi de toneladas</strong>, decisão do COPOM impactando crédito rural e janela estratégica de comercialização. Boa leitura.
        </p>
        <p style="margin:0;font-size:13px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;">Gabriel Pesciallo <span style="color:rgba(255,255,255,0.4);font-weight:400;font-size:11px;">— CEO · RE/MAX AGRO</span></p>
      </td>
      <!-- Stats box -->
      <td class="side-col mobile-hide" width="160" valign="top" style="padding:24px 28px 24px 8px;vertical-align:top;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(255,255,255,0.06);border-radius:8px;border-left:2px solid #C9A84C;">
          <tr><td style="padding:14px 14px 6px;">
            <p style="margin:0 0 2px;font-size:9px;color:rgba(255,255,255,0.5);font-family:Arial,sans-serif;">SAFRA 2025/26</p>
            <p style="margin:0;font-size:20px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;">162Mi</p>
            <p style="margin:0 0 10px;font-size:9px;color:rgba(255,255,255,0.6);font-family:Arial,sans-serif;">ton. de soja</p>
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:0 0 10px;"/>
            <p style="margin:0 0 2px;font-size:9px;color:rgba(255,255,255,0.5);font-family:Arial,sans-serif;">VALORIZAÇÃO TERRAS</p>
            <p style="margin:0;font-size:20px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;">+18%</p>
            <p style="margin:0 0 10px;font-size:9px;color:rgba(255,255,255,0.6);font-family:Arial,sans-serif;">Centro-Oeste · 12m</p>
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:0 0 10px;"/>
            <p style="margin:0 0 2px;font-size:9px;color:rgba(255,255,255,0.5);font-family:Arial,sans-serif;">ESG PREMIUM</p>
            <p style="margin:0;font-size:20px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;">+25%</p>
            <p style="margin:0;font-size:9px;color:rgba(255,255,255,0.6);font-family:Arial,sans-serif;">valorização média</p>
          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</td></tr>
<!-- Barra dourada divisória -->
<tr><td height="3" style="background:#C9A84C;font-size:3px;line-height:3px;">&nbsp;</td></tr>

<!-- ══════════════════════════════════════════════════════════
     5. COTAÇÕES — grid 4 colunas
════════════════════════════════════════════════════════════ -->
<tr id="cotacoes"><td style="background:#FBF6EC;padding:28px 32px 20px;">
  <span class="section-pill">📊 Painel de Cotações · DATAGRO</span>
  <h2 class="section-title">Culturas & Commodities</h2>
  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0"><tr><![endif]-->
  <div style="text-align:center;font-size:0;line-height:0;">
    ${quoteCards}
  </div>
  <!--[if mso]></tr></table><![endif]-->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;border-top:1px solid #E4DDD0;padding-top:10px;">
    <tr>
      <td style="font-size:10px;color:#9A9A9A;font-family:Arial,sans-serif;">Fonte: DATAGRO · Cotações indicativas · ${lastUpdated}</td>
      <td align="right"><a href="https://portal.datagro.com/pt" style="font-size:11px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;">Painel completo →</a></td>
    </tr>
  </table>
</td></tr>

<!-- ══════════════════════════════════════════════════════════
     6. TOP NOTÍCIAS + SIDEBAR BLOG (2 colunas)
════════════════════════════════════════════════════════════ -->
<tr id="noticias"><td style="background:#F4F1EB;padding:28px 32px;">
  <span class="section-pill">📰 Top Notícias Agro da Semana</span>
  <h2 class="section-title">Principais Movimentos do Agro</h2>
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr valign="top">
      <!-- Coluna notícias principais -->
      <td class="main-col" width="360" valign="top" style="padding-right:14px;">
        ${mainNewsHTML}
      </td>
      <!-- Sidebar blog -->
      <td class="side-col" width="186" valign="top">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1a2e4a;border-radius:10px;overflow:hidden;margin-bottom:12px;">
          <tr><td style="background:#C9A84C;padding:9px 14px;">
            <p style="margin:0;font-size:9px;font-weight:700;color:#0D1F35;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">📰 Destaques do Blog</p>
          </td></tr>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            ${sideNewsHTML}
          </table>
          <tr><td style="padding:10px 14px;">
            <a href="https://agro.remax.com.br/blog" style="display:block;background:rgba(255,255,255,0.1);color:#C9A84C;font-size:10px;font-weight:700;padding:8px;border-radius:5px;text-decoration:none;text-align:center;font-family:Arial,sans-serif;">Ver todos os posts →</a>
          </td></tr>
        </table>

        <!-- CTA WhatsApp sidebar -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#CC0000;border-radius:10px;overflow:hidden;">
          <tr><td style="padding:16px 14px;text-align:center;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">Fale com um Especialista</p>
            <p style="margin:0 0 12px;font-size:11px;color:rgba(255,255,255,0.75);font-family:Arial,sans-serif;">Atendimento em todo o Brasil</p>
            <a href="https://wa.me/5511915051212" style="display:inline-block;background:#ffffff;color:#CC0000;font-size:12px;font-weight:700;padding:8px 20px;border-radius:25px;text-decoration:none;font-family:Arial,sans-serif;">WhatsApp →</a>
            <p style="margin:8px 0 0;font-size:10px;color:#C9A84C;font-family:Arial,sans-serif;">+55 (11) 91505-1212</p>
          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</td></tr>

<!-- ══════════════════════════════════════════════════════════
     7. NOVIDADES DO AGRO — 3 cards
════════════════════════════════════════════════════════════ -->
<tr id="novidades"><td style="background:#ffffff;padding:28px 32px;">
  <span class="section-pill">✨ Novidades do Agro</span>
  <h2 class="section-title">Tendências & Destaques da Semana</h2>
  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0"><tr><![endif]-->
  <div style="font-size:0;line-height:0;text-align:center;">
    <!-- Card 1 -->
    <!--[if mso]><td width="180" valign="top"><![endif]-->
    <div class="three-col" style="display:inline-block;vertical-align:top;width:32%;max-width:175px;margin:2px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F4F1EB;border-radius:10px;border-top:3px solid #059669;">
        <tr><td style="padding:16px 14px;">
          <p style="margin:0 0 6px;font-size:22px;line-height:1;">🌱</p>
          <p style="margin:0 0 5px;font-size:9px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;font-family:Arial,sans-serif;">Sustentabilidade</p>
          <p style="margin:0 0 7px;font-size:13px;font-weight:700;color:#1E1E1E;line-height:1.4;font-family:Arial,sans-serif;">Certificação ESG Valoriza Fazendas em até 25%</p>
          <p style="margin:0 0 8px;font-size:11px;color:#5A5A5A;line-height:1.55;font-family:Arial,sans-serif;">Adequação ESG vira diferencial no mercado de terras.</p>
          <p style="margin:0;font-size:10px;color:#9A9A9A;font-family:Arial,sans-serif;">09 Abr 2026</p>
        </td></tr>
      </table>
    </div>
    <!--[if mso]></td><td width="180" valign="top"><![endif]-->
    <!-- Card 2 -->
    <div class="three-col" style="display:inline-block;vertical-align:top;width:32%;max-width:175px;margin:2px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F4F1EB;border-radius:10px;border-top:3px solid #0284C7;">
        <tr><td style="padding:16px 14px;">
          <p style="margin:0 0 6px;font-size:22px;line-height:1;">🤖</p>
          <p style="margin:0 0 5px;font-size:9px;font-weight:700;color:#0284C7;text-transform:uppercase;letter-spacing:0.8px;font-family:Arial,sans-serif;">Tecnologia</p>
          <p style="margin:0 0 7px;font-size:13px;font-weight:700;color:#1E1E1E;line-height:1.4;font-family:Arial,sans-serif;">IA e Drones Lideram Transformação do Agro</p>
          <p style="margin:0 0 8px;font-size:11px;color:#5A5A5A;line-height:1.55;font-family:Arial,sans-serif;">Agricultura de precisão cresce 34% no Brasil.</p>
          <p style="margin:0;font-size:10px;color:#9A9A9A;font-family:Arial,sans-serif;">11 Abr 2026</p>
        </td></tr>
      </table>
    </div>
    <!--[if mso]></td><td width="180" valign="top"><![endif]-->
    <!-- Card 3 -->
    <div class="three-col" style="display:inline-block;vertical-align:top;width:32%;max-width:175px;margin:2px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F4F1EB;border-radius:10px;border-top:3px solid #D97706;">
        <tr><td style="padding:16px 14px;">
          <p style="margin:0 0 6px;font-size:22px;line-height:1;">📦</p>
          <p style="margin:0 0 5px;font-size:9px;font-weight:700;color:#D97706;text-transform:uppercase;letter-spacing:0.8px;font-family:Arial,sans-serif;">Exportações</p>
          <p style="margin:0 0 7px;font-size:13px;font-weight:700;color:#1E1E1E;line-height:1.4;font-family:Arial,sans-serif;">China Amplia Compras: Carne Bovina +22%</p>
          <p style="margin:0 0 8px;font-size:11px;color:#5A5A5A;line-height:1.55;font-family:Arial,sans-serif;">Demanda asiática aquecida impulsiona o agro.</p>
          <p style="margin:0;font-size:10px;color:#9A9A9A;font-family:Arial,sans-serif;">10 Abr 2026</p>
        </td></tr>
      </table>
    </div>
    <!--[if mso]></td><![endif]-->
  </div>
  <!--[if mso]></tr></table><![endif]-->
</td></tr>

<!-- ══════════════════════════════════════════════════════════
     8. EVENTOS & AGENDA
════════════════════════════════════════════════════════════ -->
<tr id="eventos"><td style="background:#FBF6EC;padding:28px 32px;">
  <span class="section-pill">📅 Eventos & Agenda Agro</span>
  <h2 class="section-title">O Que Vem Por Aí</h2>
  ${insightsHTML}
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
    <tr><td style="background:#0D1F35;border-radius:10px;padding:16px 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr valign="middle">
        <td>
          <p style="margin:0 0 3px;font-size:11px;font-weight:700;color:#C9A84C;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">AGRISHOW 2026</p>
          <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">RE/MAX AGRO Estará Presente!</p>
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.6);font-family:Arial,sans-serif;">Ribeirão Preto · Maio 2026 · Estande exclusivo</p>
        </td>
        <td align="right" style="padding-left:16px;white-space:nowrap;">
          <a href="https://agro.remax.com.br" style="display:inline-block;background:#C9A84C;color:#0D1F35;font-size:12px;font-weight:700;padding:10px 20px;border-radius:25px;text-decoration:none;font-family:Arial,sans-serif;">Agendar Reunião →</a>
        </td>
      </tr></table>
    </td></tr>
  </table>
</td></tr>

<!-- Divisor dourado -->
<tr><td height="3" style="background:#C9A84C;font-size:3px;line-height:3px;">&nbsp;</td></tr>

<!-- ══════════════════════════════════════════════════════════
     9. PROPRIEDADES RURAIS DE GRANDE PORTE
════════════════════════════════════════════════════════════ -->
<tr id="propriedades"><td style="background:#F4F1EB;padding:28px 32px;">
  <span class="section-pill">🏡 Oportunidades em Propriedades Rurais</span>
  <h2 class="section-title">Grandes Propriedades em Destaque</h2>
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr valign="top">
      <!-- Prop 1 - maior destaque -->
      <td width="56%" valign="top" style="padding-right:8px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:10px;overflow:hidden;">
          <tr><td>
            <div style="background:linear-gradient(135deg,#0F2A1A,#1B4332);padding:60px 20px;text-align:center;position:relative;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#C9A84C;letter-spacing:1px;font-family:Arial,sans-serif;">✦ DESTAQUE DA SEMANA</p>
              <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.7);font-family:Arial,sans-serif;">Fazenda Santa Luzia</p>
            </div>
          </td></tr>
          <tr><td style="padding:16px 18px;">
            <span style="display:inline-block;background:#059669;color:#fff;font-size:9px;font-weight:700;padding:3px 9px;border-radius:10px;font-family:Arial,sans-serif;margin-bottom:8px;">DESTAQUE</span>
            <h3 style="margin:0 0 4px;font-size:16px;color:#1E1E1E;font-family:Arial,sans-serif;">Fazenda Santa Luzia — 4.200 ha</h3>
            <p style="margin:0 0 8px;font-size:11px;color:#9A9A9A;font-family:Arial,sans-serif;">Soja + Milho · Mato Grosso</p>
            <p style="margin:0 0 14px;font-size:12px;color:#5A5A5A;line-height:1.6;font-family:Arial,sans-serif;">Produtividade acima da média regional. Infraestrutura completa para soja e milho. Alto potencial de valorização.</p>
            <a href="https://agro.remax.com.br" style="display:inline-block;background:#C9A84C;color:#0D1F35;font-size:11px;font-weight:700;padding:9px 18px;border-radius:20px;text-decoration:none;font-family:Arial,sans-serif;">Ver Detalhes →</a>
          </td></tr>
        </table>
      </td>
      <!-- Props 2 e 3 empilhadas -->
      <td width="44%" valign="top" style="padding-left:8px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:10px;margin-bottom:8px;">
          <tr><td style="padding:14px 16px;">
            <span style="display:inline-block;background:#0D1F35;color:#C9A84C;font-size:9px;font-weight:700;padding:3px 9px;border-radius:10px;font-family:Arial,sans-serif;margin-bottom:6px;">NOVO</span>
            <h4 style="margin:0 0 3px;font-size:13px;color:#1E1E1E;font-family:Arial,sans-serif;">Fazenda Boa Esperança — 2.800 ha</h4>
            <p style="margin:0 0 6px;font-size:10px;color:#9A9A9A;font-family:Arial,sans-serif;">Pecuária + Soja · Goiás</p>
            <p style="margin:0 0 10px;font-size:11px;color:#5A5A5A;line-height:1.55;font-family:Arial,sans-serif;">Pivô central, escritura regularizada. Ideal para investidores.</p>
            <a href="https://agro.remax.com.br" style="font-size:11px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;">Ver Detalhes →</a>
          </td></tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:10px;">
          <tr><td style="padding:14px 16px;">
            <span style="display:inline-block;background:#0284C7;color:#fff;font-size:9px;font-weight:700;padding:3px 9px;border-radius:10px;font-family:Arial,sans-serif;margin-bottom:6px;">EXCLUSIVO</span>
            <h4 style="margin:0 0 3px;font-size:13px;color:#1E1E1E;font-family:Arial,sans-serif;">Sítio Recanto Verde — 980 ha</h4>
            <p style="margin:0 0 6px;font-size:10px;color:#9A9A9A;font-family:Arial,sans-serif;">Café Especial · Minas Gerais</p>
            <p style="margin:0 0 10px;font-size:11px;color:#5A5A5A;line-height:1.55;font-family:Arial,sans-serif;">Café premiado, altitude ideal, certificação de origem.</p>
            <a href="https://agro.remax.com.br" style="font-size:11px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;">Ver Detalhes →</a>
          </td></tr>
        </table>
        <!-- Ver todas -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
          <tr><td style="text-align:center;padding:10px 0;">
            <a href="https://agro.remax.com.br" style="font-size:12px;font-weight:700;color:#0D1F35;font-family:Arial,sans-serif;text-decoration:underline;">Ver todas as propriedades →</a>
          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</td></tr>

<!-- Divisor dourado -->
<tr><td height="3" style="background:#C9A84C;font-size:3px;line-height:3px;">&nbsp;</td></tr>

<!-- ══════════════════════════════════════════════════════════
     10. CORRETORES CERTIFICADOS
════════════════════════════════════════════════════════════ -->
<tr><td style="background:#1a2e4a;padding:28px 32px;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr valign="middle">
      <!-- Selo -->
      <td width="90" valign="middle" style="padding-right:18px;">
        <a href="https://agro.remax.com.br/corretores-especializados/">
          <img src="${IMGS.selo}" alt="Corretor Certificado RE/MAX Commercial Divisão Agro" width="76" height="76" style="display:block;border:0;"/>
        </a>
      </td>
      <!-- Título + link -->
      <td valign="middle">
        <span class="section-pill" style="background:#C9A84C;color:#0D1F35;">Corretores Certificados</span>
        <h2 class="section-title-white" style="margin-bottom:4px;">Especialistas RE/MAX AGRO</h2>
        <a href="https://agro.remax.com.br/corretores-especializados/" style="font-size:12px;color:#C9A84C;font-family:Arial,sans-serif;text-decoration:underline;">Ver todos os corretores especializados →</a>
      </td>
    </tr>
  </table>
  <!-- Grid de corretores -->
  <div style="margin-top:18px;font-size:0;line-height:0;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0"><tr><![endif]-->
    ${brokersHTML}
    <!--[if mso]></tr></table><![endif]-->
  </div>
  <!-- CTA todos corretores -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;background:rgba(255,255,255,0.07);border-radius:8px;border-top:2px solid #C9A84C;">
    <tr valign="middle">
      <td style="padding:14px 18px;">
        <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">Conheça todos os nossos especialistas</p>
        <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);font-family:Arial,sans-serif;">Atendimento em todo o território nacional</p>
      </td>
      <td align="right" style="padding:14px 18px;white-space:nowrap;">
        <a href="https://agro.remax.com.br/corretores-especializados/" style="display:inline-block;background:#C9A84C;color:#0D1F35;font-size:12px;font-weight:700;padding:10px 20px;border-radius:25px;text-decoration:none;font-family:Arial,sans-serif;">Ver Corretores →</a>
      </td>
    </tr>
  </table>
</td></tr>

<!-- ══════════════════════════════════════════════════════════
     11. CTA FINAL DOURADA
════════════════════════════════════════════════════════════ -->
<tr><td style="background:#C9A84C;padding:34px 32px;text-align:center;">
  <h2 style="margin:0 0 8px;font-size:24px;color:#0D1F35;line-height:1.3;font-family:Georgia,'Times New Roman',serif;">Transforme Informação em Oportunidade no Campo</h2>
  <p style="margin:0 0 22px;font-size:14px;color:rgba(13,31,53,0.7);font-family:Arial,sans-serif;">Fale com um especialista ou acesse o site para ver oportunidades exclusivas</p>
  <table cellpadding="0" cellspacing="0" border="0" align="center">
    <tr>
      <td style="padding-right:8px;">
        <a href="https://wa.me/5511915051212" style="display:inline-block;background:#0D1F35;color:#C9A84C;font-size:13px;font-weight:700;padding:13px 24px;border-radius:30px;text-decoration:none;font-family:Arial,sans-serif;">WhatsApp →</a>
      </td>
      <td>
        <a href="https://agro.remax.com.br" style="display:inline-block;background:transparent;border:2px solid #0D1F35;color:#0D1F35;font-size:13px;font-weight:700;padding:11px 24px;border-radius:30px;text-decoration:none;font-family:Arial,sans-serif;">Visitar Site →</a>
      </td>
    </tr>
  </table>
</td></tr>

<!-- ══════════════════════════════════════════════════════════
     12. FOOTER LEGAL — navy bg
════════════════════════════════════════════════════════════ -->
<tr><td style="background:#0D1F35;padding:28px 32px 20px;border-radius:0 0 12px 12px;">
  <!-- Logo + redes -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
    <tr valign="middle">
      <td valign="middle">
        <img src="${IMGS.logoWhite}" alt="RE/MAX AGRO" width="160" height="53" style="display:block;max-height:53px;width:auto;"/>
      </td>
      <td align="right" valign="middle">
        <table cellpadding="0" cellspacing="4" border="0"><tr>
          <td><a href="https://www.instagram.com/remaxcommercialdivsaoagro" style="display:inline-block;background:rgba(255,255,255,0.1);color:#fff;font-size:10px;padding:6px 12px;border-radius:5px;text-decoration:none;font-family:Arial,sans-serif;">Instagram</a></td>
          <td><a href="https://www.linkedin.com/company/remax-agro" style="display:inline-block;background:rgba(255,255,255,0.1);color:#fff;font-size:10px;padding:6px 12px;border-radius:5px;text-decoration:none;font-family:Arial,sans-serif;">LinkedIn</a></td>
          <td><a href="https://www.facebook.com/remaxagro" style="display:inline-block;background:rgba(255,255,255,0.1);color:#fff;font-size:10px;padding:6px 12px;border-radius:5px;text-decoration:none;font-family:Arial,sans-serif;">Facebook</a></td>
        </tr></table>
      </td>
    </tr>
  </table>
  <!-- 3 colunas de info -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
    <tr valign="top">
      <td width="34%" valign="top" style="padding-right:14px;">
        <p style="margin:0 0 8px;font-size:9px;font-weight:700;color:#C9A84C;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Contato</p>
        <p style="margin:0 0 4px;font-family:Arial,sans-serif;"><a href="tel:+5511915051212" style="font-size:11px;color:rgba(255,255,255,0.65);text-decoration:underline;font-family:Arial,sans-serif;">+55 (11) 91505-1212</a></p>
        <p style="margin:0 0 4px;font-family:Arial,sans-serif;"><a href="mailto:contatoagro@remax.com.br" style="font-size:11px;color:rgba(255,255,255,0.65);text-decoration:underline;font-family:Arial,sans-serif;">contatoagro@remax.com.br</a></p>
        <p style="margin:0;font-family:Arial,sans-serif;"><a href="https://agro.remax.com.br" style="font-size:11px;color:rgba(255,255,255,0.65);text-decoration:underline;font-family:Arial,sans-serif;">agro.remax.com.br</a></p>
      </td>
      <td width="33%" valign="top" style="padding-right:14px;">
        <p style="margin:0 0 8px;font-size:9px;font-weight:700;color:#C9A84C;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Sites</p>
        <p style="margin:0 0 4px;font-family:Arial,sans-serif;"><a href="https://portal.datagro.com/pt" style="font-size:11px;color:rgba(255,255,255,0.65);text-decoration:underline;font-family:Arial,sans-serif;">portal.datagro.com</a></p>
        <p style="margin:0;font-family:Arial,sans-serif;"><a href="https://agro.remax.com.br/newsletter" style="font-size:11px;color:rgba(255,255,255,0.65);text-decoration:underline;font-family:Arial,sans-serif;">Ver edições anteriores</a></p>
      </td>
      <td width="33%" valign="top">
        <p style="margin:0 0 8px;font-size:9px;font-weight:700;color:#C9A84C;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Especialistas</p>
        <p style="margin:0;font-family:Arial,sans-serif;"><a href="https://agro.remax.com.br/corretores-especializados/" style="font-size:11px;color:rgba(255,255,255,0.65);text-decoration:underline;font-family:Arial,sans-serif;">Corretores Certificados</a></p>
      </td>
    </tr>
  </table>
  <!-- Divisor -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="1" style="background:rgba(255,255,255,0.12);font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
  <!-- LGPD -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:14px 0;">
    <tr><td>
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;">🔒 Privacidade & LGPD</p>
      <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.5);line-height:1.7;font-family:Arial,sans-serif;">
        Esta newsletter foi enviada porque você se inscreveu voluntariamente na lista da RE/MAX AGRO powered by DATAGRO. Seus dados são tratados conforme a <strong style="color:rgba(255,255,255,0.75);">LGPD — Lei nº 13.709/2018</strong>. Não compartilhamos suas informações sem consentimento.
      </p>
    </td></tr>
  </table>
  <!-- Links opt-out -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
    <tr><td style="font-size:10px;font-family:Arial,sans-serif;line-height:2;">
      <a href="https://agro.remax.com.br/newsletter" style="color:rgba(255,255,255,0.65);text-decoration:underline;">🌐 Ver Online</a>&nbsp;
      <span style="color:rgba(255,255,255,0.2);">·</span>&nbsp;
      <a href="mailto:contatoagro@remax.com.br?subject=Descadastro%20Newsletter%20RE/MAX%20AGRO" style="color:rgba(255,255,255,0.65);text-decoration:underline;">🚫 Descadastrar</a>&nbsp;
      <span style="color:rgba(255,255,255,0.2);">·</span>&nbsp;
      <a href="https://agro.remax.com.br/privacidade" style="color:rgba(255,255,255,0.65);text-decoration:underline;">📄 Política de Privacidade</a>&nbsp;
      <span style="color:rgba(255,255,255,0.2);">·</span>&nbsp;
      <a href="https://agro.remax.com.br/termos" style="color:rgba(255,255,255,0.65);text-decoration:underline;">📋 Termos de Uso</a>&nbsp;
      <span style="color:rgba(255,255,255,0.2);">·</span>&nbsp;
      <a href="mailto:contatoagro@remax.com.br" style="color:rgba(255,255,255,0.65);text-decoration:underline;">✉ Fale Conosco</a>
    </td></tr>
  </table>
  <!-- Divisor -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="1" style="background:rgba(255,255,255,0.12);font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
  <!-- Copyright -->
  <p style="margin:12px 0 0;font-size:9px;color:rgba(255,255,255,0.28);line-height:1.6;font-family:Arial,sans-serif;">
    © 2026 RE/MAX AGRO · RE/MAX Commercial Divisão Agro · powered by DATAGRO · Todos os direitos reservados.<br/>
    Esta comunicação é de caráter informativo e não constitui recomendação de investimento. CRECI válido em todo o território nacional.
  </p>
</td></tr>

<!-- Espaço final -->
<tr><td height="24" style="background:#ECEAE4;">&nbsp;</td></tr>

</table><!-- /email-inner -->
</div><!-- /email-outer -->

</body>
</html>`;
}
