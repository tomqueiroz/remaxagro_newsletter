/**
 * generateNewsletterHTML
 * Gera o HTML completo da newsletter compatível com:
 *  - Gmail, Outlook (2019/365/Web), Apple Mail, Yahoo Mail
 *  - Tabelas aninhadas (MSO compat) + media queries para mobile
 *  - Texto alternativo em todos os elementos
 *  - Preheader oculto
 *  - Dark mode via prefers-color-scheme
 *
 * Retorna string HTML que pode ser:
 *  1. Copiado para qualquer ESP (Mailchimp, RD Station, SendGrid)
 *  2. Baixado como .html
 *  3. Enviado diretamente via API de email
 */

import type { NewsletterData } from "@/hooks/useNewsletterData";

export function generateNewsletterHTML(data: NewsletterData): string {
  const { editionNumber, editionDate, lastUpdated, quotations, mainNews, secondaryNews, insights, brokers } = data;

  // Preheader (snippet que aparece no preview do email)
  const preheader = `📈 Safra recorde de soja, decisão do COPOM e janelas de comercialização — tudo que importa para o agro desta semana.`;

  // Ticker de cotações (linha de texto)
  const tickerItems = quotations.slice(0, 5)
    .map(q => `${q.name}: R$ ${q.value} (${q.change >= 0 ? "▲" : "▼"}${Math.abs(q.change)}%)`)
    .join("  &nbsp;·&nbsp;  ");

  // Cotações destaque (4 principais)
  const featuredQuotes = quotations.slice(0, 4).map(q => `
    <td align="center" width="25%" style="padding:0 4px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:8px;border-top:3px solid #C9A84C;">
        <tr><td align="center" style="padding:10px 8px 8px;">
          <p style="margin:0 0 2px;font-size:10px;font-weight:700;color:#5A5A5A;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,sans-serif;">${q.name}</p>
          <p style="margin:0;font-size:18px;font-weight:700;color:#0F2A1A;font-family:Arial,sans-serif;">R$ ${q.value}</p>
          <p style="margin:2px 0 0;font-size:9px;color:#9A9A9A;font-family:Arial,sans-serif;">${q.unit}</p>
          <p style="margin:6px 0 0;font-size:11px;font-weight:700;color:${q.change >= 0 ? "#059669" : "#DC2626"};font-family:Arial,sans-serif;">
            ${q.change >= 0 ? "▲" : "▼"} ${Math.abs(q.change)}%
          </p>
        </td></tr>
      </table>
    </td>`).join("");

  // Notícias principais
  const mainNewsHTML = mainNews.map(n => `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;background:#F3F0EA;border-radius:8px;border-left:4px solid #C9A84C;">
      <tr><td style="padding:14px 16px;">
        <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#C9A84C;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">${n.category}</p>
        <h3 style="margin:0 0 8px;font-size:16px;color:#0F2A1A;line-height:1.4;font-family:Georgia,'Times New Roman',serif;">${n.title}</h3>
        ${n.summary ? `<p style="margin:0 0 10px;font-size:13px;color:#5A5A5A;line-height:1.6;font-family:Arial,sans-serif;">${n.summary}</p>` : ""}
        <table cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="font-size:11px;color:#9A9A9A;font-family:Arial,sans-serif;">${n.date}${n.readTime ? ` · ${n.readTime} de leitura` : ""}</td>
          ${n.url ? `<td style="padding-left:12px;"><a href="${n.url}" style="font-size:11px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;text-decoration:underline;">Leia o artigo completo →</a></td>` : ""}
        </tr></table>
      </td></tr>
    </table>`).join("");

  // Notícias secundárias
  const secondaryNewsHTML = secondaryNews.map(n => `
    <tr style="border-bottom:1px solid #E4DDD0;">
      <td style="padding:10px 14px;">
        <p style="margin:0 0 2px;font-size:9px;font-weight:700;color:#C9A84C;text-transform:uppercase;letter-spacing:0.8px;font-family:Arial,sans-serif;">${n.category}</p>
        ${n.url
          ? `<a href="${n.url}" style="font-size:12px;color:#2A2A2A;text-decoration:none;line-height:1.4;font-family:Arial,sans-serif;">${n.title}</a>`
          : `<p style="margin:0;font-size:12px;color:#2A2A2A;line-height:1.4;font-family:Arial,sans-serif;">${n.title}</p>`
        }
        <p style="margin:3px 0 0;font-size:10px;color:#9A9A9A;font-family:Arial,sans-serif;">${n.date}</p>
      </td>
    </tr>`).join("");

  // Insights
  const insightsHTML = insights.map(i => {
    const badgeColor  = i.urgency === "alta" ? "#DC2626" : i.urgency === "evento" ? "#059669" : "#D97706";
    const badgeBg     = i.urgency === "alta" ? "#FEE2E2" : i.urgency === "evento" ? "#D1FAE5" : "#FEF3C7";
    const badgeLabel  = i.urgency === "alta" ? "⚠ Alta Prioridade" : i.urgency === "evento" ? "📅 Evento" : "👁 Atenção";
    return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;background:#F5F0E8;border-radius:8px;border-left:3px solid #1a2e4a;">
      <tr><td style="padding:12px 14px;">
        <table cellpadding="0" cellspacing="0" border="0"><tr>
          <td><span style="background:${badgeBg};color:${badgeColor};font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px;font-family:Arial,sans-serif;">${badgeLabel}</span></td>
          <td style="padding-left:8px;font-size:10px;color:#9A9A9A;font-family:Arial,sans-serif;">${i.date}</td>
        </tr></table>
        <h4 style="margin:6px 0 4px;font-size:13px;color:#0F2A1A;line-height:1.4;font-family:Arial,sans-serif;">${i.title}</h4>
        <p style="margin:0;font-size:12px;color:#5A5A5A;line-height:1.55;font-family:Arial,sans-serif;">${i.description}</p>
      </td></tr>
    </table>`;
  }).join("");

  // Corretores
  const brokersHTML = brokers.map(b => `
    <td width="50%" valign="top" style="padding:4px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0F2A1A;border-radius:8px;">
        <tr><td style="padding:12px 14px;">
          <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">${b.name}</p>
          <p style="margin:0 0 1px;font-size:11px;color:#C9A84C;font-family:Arial,sans-serif;">${b.role}</p>
          <p style="margin:0 0 10px;font-size:10px;color:rgba(255,255,255,0.5);font-family:Arial,sans-serif;">${b.region}</p>
          <a href="https://wa.me/${b.whatsapp.replace(/\D/g, "")}"
             style="display:inline-block;background:#059669;color:#ffffff;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;text-decoration:none;font-family:Arial,sans-serif;">
            WhatsApp →
          </a>
        </td></tr>
      </table>
    </td>`).join("");

  return `<!DOCTYPE html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>RE/MAX AGRO Newsletter · Edição Nº ${editionNumber}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style type="text/css">
    /* ─ Reset ─ */
    body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
    table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}
    img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
    body{margin:0;padding:0;background-color:#F0EDE6;}
    a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;}
    #MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit;}
    /* ─ Força largura máxima nos clientes MSO ─ */
    .ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%;}
    /* ─ Mobile ─ */
    @media screen and (max-width:620px){
      .email-wrapper{width:100%!important;max-width:100%!important;}
      .mobile-block{display:block!important;width:100%!important;}
      .mobile-hide{display:none!important;}
      .mobile-stack{display:block!important;width:100%!important;padding:0!important;}
      .mobile-pad{padding-left:16px!important;padding-right:16px!important;}
      .mobile-text-center{text-align:center!important;}
      .broker-col{display:block!important;width:100%!important;padding:4px 0!important;}
      .quote-card{width:50%!important;}
    }
    /* ─ Dark mode ─ */
    @media (prefers-color-scheme:dark){
      body,.email-bg{background-color:#1A1A18!important;}
      .main-bg{background-color:#242420!important;}
      .card-bg{background-color:#2A2A26!important;}
      .text-dark{color:#E5E5E0!important;}
      .text-muted{color:#9A9A88!important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F0EDE6;" class="email-bg">

  <!-- Preheader oculto -->
  <div style="display:none;font-size:1px;color:#F0EDE6;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${preheader}&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌
  </div>

  <!-- Wrapper externo -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F0EDE6;">
  <tr><td align="center" style="padding:20px 0;">

    <!-- Container principal 600px -->
    <table role="presentation" class="email-wrapper" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;">

      <!-- ══════════════ HEADER VERDE ══════════════ -->
      <tr><td style="background-color:#0F2A1A;border-radius:12px 12px 0 0;">
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr><td style="padding:20px 28px 10px;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="middle">
                  <!-- Logo branca -->
                  <img src="https://agro.remax.com.br/images/logo-white.png" alt="RE/MAX AGRO" width="180" height="60" style="display:block;max-height:60px;object-fit:contain;" />
                </td>
                <td align="right" valign="middle">
                  <p style="margin:0;font-size:10px;font-weight:700;color:#C9A84C;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,sans-serif;">Newsletter Semanal</p>
                  <p style="margin:3px 0 0;font-size:10px;font-weight:700;color:#C9A84C;letter-spacing:1px;font-family:Arial,sans-serif;">Edição Nº ${editionNumber}</p>
                  <p style="margin:2px 0 0;font-size:10px;color:rgba(255,255,255,0.5);font-family:Arial,sans-serif;">${editionDate}</p>
                </td>
              </tr>
            </table>
          </td></tr>
          <!-- Linha dourada -->
          <tr><td height="3" style="background-color:#C9A84C;line-height:3px;font-size:3px;">&nbsp;</td></tr>
          <!-- Ticker vermelho -->
          <tr><td style="background-color:#CC0000;padding:7px 28px;">
            <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.85);font-family:Arial,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              <strong style="color:#ffffff;letter-spacing:1px;">⚡ AGRO EM TEMPO REAL</strong>&nbsp;&nbsp;${tickerItems}
            </p>
          </td></tr>
        </table>
      </td></tr>

      <!-- ══════════════ CARTA EDITORIAL ══════════════ -->
      <tr><td style="background-color:#0F2A1A;border-bottom:3px solid #C9A84C;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <!-- Texto editorial -->
            <td valign="top" style="padding:18px 28px;">
              <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#C9A84C;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,sans-serif;">✦ Carta Editorial · Edição ${editionNumber}</p>
              <h1 style="margin:0 0 10px;font-size:22px;color:#ffffff;line-height:1.3;font-family:Georgia,'Times New Roman',serif;">O Agro Estratégico na Palma da Sua Mão</h1>
              <p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.8);line-height:1.65;font-family:Arial,sans-serif;">
                Bem-vindo à primeira edição da newsletter semanal mais relevante do agronegócio brasileiro. Com curadoria exclusiva da <strong>RE/MAX AGRO powered by DATAGRO</strong> — referência em inteligência agrícola há mais de 35 anos —, você recebe toda segunda-feira o que realmente importa para tomar as melhores decisões no campo.
              </p>
              <p style="margin:0 0 6px;font-size:13px;color:rgba(255,255,255,0.8);line-height:1.65;font-family:Arial,sans-serif;">
                Esta semana: safra recorde de soja, decisão do COPOM e janela estratégica de comercialização. Boa leitura.
              </p>
              <p style="margin:0;font-size:12px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;">Gabriel Pesciallo <span style="color:rgba(255,255,255,0.4);font-weight:400;">— CEO · RE/MAX AGRO</span></p>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- ══════════════ COTAÇÕES DESTAQUE ══════════════ -->
      <tr><td style="background-color:#F5F0E8;padding:16px 20px 0;">
        <p style="margin:0 0 10px;font-size:10px;font-weight:700;color:#5A5A5A;letter-spacing:1.2px;text-transform:uppercase;font-family:Arial,sans-serif;padding:0 8px;">📊 Painel de Cotações · DATAGRO</p>
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>${featuredQuotes}</tr>
        </table>
      </td></tr>
      <tr><td style="background-color:#F5F0E8;padding:6px 28px 14px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-size:10px;color:#9A9A9A;font-family:Arial,sans-serif;">Fonte: DATAGRO · Cotações indicativas · Atualizado em ${lastUpdated}</td>
            <td align="right"><a href="https://portal.datagro.com/pt" style="font-size:10px;font-weight:700;color:#C9A84C;font-family:Arial,sans-serif;text-decoration:underline;">Painel completo →</a></td>
          </tr>
        </table>
      </td></tr>

      <!-- Divisor -->
      <tr><td height="1" style="background-color:#E4DDD0;line-height:1px;font-size:1px;">&nbsp;</td></tr>

      <!-- ══════════════ CORPO PRINCIPAL (2 colunas) ══════════════ -->
      <tr><td style="background-color:#FAFAF8;" class="main-bg">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr valign="top">

            <!-- COLUNA PRINCIPAL -->
            <td class="mobile-stack" width="380" style="padding:22px 14px 22px 24px;vertical-align:top;">

              <!-- Tag + Título seção -->
              <table border="0" cellpadding="0" cellspacing="0"><tr><td>
                <span style="background:#C9A84C;color:#0F2A1A;font-size:9px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:1.2px;text-transform:uppercase;font-family:Arial,sans-serif;">Últimos 7 Dias</span>
              </td></tr></table>
              <h2 style="margin:8px 0 16px;font-size:20px;color:#0F2A1A;line-height:1.3;font-family:Georgia,'Times New Roman',serif;">Principais Movimentos do Agro</h2>

              ${mainNewsHTML}

              <!-- Mais notícias da semana -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;margin-top:4px;">
                <tr><td style="background-color:#0F2A1A;padding:8px 14px;">
                  <p style="margin:0;font-size:10px;font-weight:700;color:#C9A84C;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Mais Notícias da Semana</p>
                </td></tr>
                ${secondaryNewsHTML}
              </table>

            </td>

            <!-- SIDEBAR -->
            <td class="mobile-stack" width="196" style="padding:22px 20px 22px 8px;vertical-align:top;background-color:#FAFAF8;" class="main-bg">

              <!-- Propriedade em Destaque -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background:#1a2e4a;border-radius:10px;overflow:hidden;margin-bottom:14px;">
                <tr><td style="background:#C9A84C;padding:8px 12px;">
                  <p style="margin:0;font-size:9px;font-weight:700;color:#0F2A1A;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">🏡 Propriedade em Destaque</p>
                </td></tr>
                <tr><td style="padding:12px 14px;">
                  <span style="background:#059669;color:#fff;font-size:8px;font-weight:700;padding:2px 7px;border-radius:10px;font-family:Arial,sans-serif;">NOVO</span>
                  <p style="margin:7px 0 2px;font-size:13px;font-weight:700;color:#ffffff;line-height:1.4;font-family:Arial,sans-serif;">Fazenda Santa Luzia — 4.200 ha</p>
                  <p style="margin:0 0 3px;font-size:10px;color:#C9A84C;font-family:Arial,sans-serif;">Soja + Milho · Mato Grosso</p>
                  <p style="margin:0 0 10px;font-size:11px;color:rgba(255,255,255,0.7);line-height:1.5;font-family:Arial,sans-serif;">Produtividade acima da média. Infraestrutura completa. Oportunidade única.</p>
                  <a href="https://agro.remax.com.br" style="display:inline-block;background:#C9A84C;color:#0F2A1A;font-size:10px;font-weight:700;padding:6px 14px;border-radius:20px;text-decoration:none;font-family:Arial,sans-serif;">Ver Detalhes →</a>
                </td></tr>
              </table>

              <!-- Dica da Semana -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background:#1a2e4a;border-radius:10px;overflow:hidden;margin-bottom:14px;">
                <tr><td style="background:#C9A84C;padding:8px 12px;">
                  <p style="margin:0;font-size:9px;font-weight:700;color:#0F2A1A;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">💡 Dica da Semana</p>
                </td></tr>
                <tr><td style="padding:12px 14px;">
                  <p style="margin:0 0 3px;font-size:9px;color:rgba(255,255,255,0.5);letter-spacing:0.8px;text-transform:uppercase;font-family:Arial,sans-serif;">Mercado de Terras</p>
                  <p style="margin:0 0 10px;font-size:12px;color:#ffffff;line-height:1.55;font-family:Arial,sans-serif;">Propriedades com certificação ESG estão valorizando até <strong style="color:#C9A84C;">25% acima</strong> da média de mercado.</p>
                  <a href="https://agro.remax.com.br/blog" style="display:inline-block;background:rgba(255,255,255,0.1);color:#ffffff;font-size:10px;font-weight:700;padding:5px 12px;border-radius:20px;text-decoration:none;font-family:Arial,sans-serif;">Ler Análise →</a>
                </td></tr>
              </table>

              <!-- CTA WhatsApp -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background:#CC0000;border-radius:10px;overflow:hidden;margin-bottom:14px;">
                <tr><td style="padding:14px;text-align:center;">
                  <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">Fale com um Especialista</p>
                  <p style="margin:0 0 10px;font-size:10px;color:rgba(255,255,255,0.7);font-family:Arial,sans-serif;">Atendimento em todo o Brasil</p>
                  <a href="https://wa.me/5511915051212" style="display:inline-block;background:#ffffff;color:#CC0000;font-size:11px;font-weight:700;padding:7px 18px;border-radius:20px;text-decoration:none;font-family:Arial,sans-serif;">WhatsApp →</a>
                  <p style="margin:7px 0 0;font-size:10px;color:#C9A84C;font-family:Arial,sans-serif;">+55 (11) 91505-1212</p>
                </td></tr>
              </table>

              <!-- Redes sociais -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background:#1a2e4a;border-radius:10px;overflow:hidden;">
                <tr><td style="background:#C9A84C;padding:7px 12px;text-align:center;">
                  <p style="margin:0;font-size:9px;font-weight:700;color:#0F2A1A;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Siga a RE/MAX AGRO</p>
                </td></tr>
                <tr><td style="padding:10px 12px;">
                  <table width="100%" border="0" cellpadding="0" cellspacing="2">
                    <tr>
                      <td><a href="https://www.instagram.com/remaxcommercialdivsaoagro" style="display:block;background:rgba(255,255,255,0.1);color:#fff;font-size:10px;padding:5px;border-radius:5px;text-decoration:none;text-align:center;font-family:Arial,sans-serif;">Instagram</a></td>
                      <td width="4">&nbsp;</td>
                      <td><a href="https://www.linkedin.com/company/remax-agro" style="display:block;background:rgba(255,255,255,0.1);color:#fff;font-size:10px;padding:5px;border-radius:5px;text-decoration:none;text-align:center;font-family:Arial,sans-serif;">LinkedIn</a></td>
                    </tr>
                    <tr><td colspan="3" height="4">&nbsp;</td></tr>
                    <tr><td colspan="3">
                      <a href="https://agro.remax.com.br/newsletter" style="display:block;background:#C9A84C;color:#0F2A1A;font-size:10px;font-weight:700;padding:6px;border-radius:5px;text-decoration:none;text-align:center;font-family:Arial,sans-serif;">Newsletter Online →</a>
                    </td></tr>
                  </table>
                </td></tr>
              </table>

            </td>
          </tr>
        </table>
      </td></tr>

      <!-- Divisor dourado -->
      <tr><td height="3" style="background-color:#C9A84C;line-height:3px;font-size:3px;">&nbsp;</td></tr>

      <!-- ══════════════ INSIGHTS ══════════════ -->
      <tr><td style="background-color:#FAFAF8;padding:22px 24px;">
        <table border="0" cellpadding="0" cellspacing="0"><tr><td>
          <span style="background:#C9A84C;color:#0F2A1A;font-size:9px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:1.2px;text-transform:uppercase;font-family:Arial,sans-serif;">Radar da Próxima Semana</span>
        </td></tr></table>
        <h2 style="margin:8px 0 16px;font-size:20px;color:#0F2A1A;line-height:1.3;font-family:Georgia,'Times New Roman',serif;">Insights & O Que Vem Por Aí</h2>
        ${insightsHTML}
      </td></tr>

      <!-- ══════════════ CORRETORES ══════════════ -->
      <tr><td style="background-color:#F5F0E8;padding:22px 24px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr valign="top">
            <td width="64" valign="top" style="padding-right:14px;">
              <img src="https://agro.remax.com.br/images/selo-corretor-certificado.png" alt="Corretor Certificado" width="60" height="60" style="display:block;" />
            </td>
            <td>
              <span style="background:#C9A84C;color:#0F2A1A;font-size:9px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:1.2px;text-transform:uppercase;font-family:Arial,sans-serif;">Certificados</span>
              <h2 style="margin:6px 0 14px;font-size:20px;color:#0F2A1A;line-height:1.3;font-family:Georgia,'Times New Roman',serif;">Corretores Especializados</h2>
            </td>
          </tr>
        </table>
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>${brokersHTML}</tr>
        </table>
      </td></tr>

      <!-- ══════════════ CTA BANNER ══════════════ -->
      <tr><td style="background-color:#1a2e4a;padding:22px 24px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr valign="middle">
            <td>
              <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#C9A84C;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Central de Atendimento RE/MAX AGRO</p>
              <h2 style="margin:0 0 6px;font-size:18px;color:#ffffff;line-height:1.4;font-family:Georgia,'Times New Roman',serif;">Transforme informação em oportunidade no campo</h2>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.6);font-family:Arial,sans-serif;">+55 (11) 91505-1212 · contatoagro@remax.com.br</p>
            </td>
            <td align="right" width="160" style="padding-left:16px;">
              <a href="https://agro.remax.com.br" style="display:inline-block;background:#C9A84C;color:#0F2A1A;font-size:11px;font-weight:700;padding:10px 20px;border-radius:25px;text-decoration:none;font-family:Arial,sans-serif;white-space:nowrap;">Falar com Especialista →</a>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- Divisor dourado -->
      <tr><td height="3" style="background-color:#C9A84C;line-height:3px;font-size:3px;">&nbsp;</td></tr>

      <!-- ══════════════ FOOTER LEGAL (verde-escuro) ══════════════ -->
      <tr><td style="background-color:#0F2A1A;padding:24px 28px 16px;border-radius:0 0 12px 12px;">

        <!-- Logo + redes -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
          <tr>
            <td valign="middle">
              <img src="https://agro.remax.com.br/images/logo-white.png" alt="RE/MAX AGRO" width="140" height="46" style="display:block;max-height:46px;" />
            </td>
            <td align="right" valign="middle">
              <table border="0" cellpadding="0" cellspacing="4">
                <tr>
                  <td><a href="https://www.instagram.com/remaxcommercialdivsaoagro" style="display:inline-block;background:rgba(255,255,255,0.12);color:#fff;font-size:10px;padding:5px 10px;border-radius:5px;text-decoration:none;font-family:Arial,sans-serif;">Instagram</a></td>
                  <td><a href="https://www.linkedin.com/company/remax-agro" style="display:inline-block;background:rgba(255,255,255,0.12);color:#fff;font-size:10px;padding:5px 10px;border-radius:5px;text-decoration:none;font-family:Arial,sans-serif;">LinkedIn</a></td>
                  <td><a href="https://www.facebook.com/remaxagro" style="display:inline-block;background:rgba(255,255,255,0.12);color:#fff;font-size:10px;padding:5px 10px;border-radius:5px;text-decoration:none;font-family:Arial,sans-serif;">Facebook</a></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Divisor -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td height="1" style="background:rgba(255,255,255,0.15);line-height:1px;font-size:1px;">&nbsp;</td></tr></table>

        <!-- LGPD -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin:14px 0;">
          <tr><td>
            <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#C9A84C;letter-spacing:0.8px;font-family:Arial,sans-serif;">🔒 Privacidade & LGPD</p>
            <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.6);line-height:1.7;font-family:Arial,sans-serif;">
              Esta newsletter foi enviada porque você se inscreveu voluntariamente na lista da RE/MAX AGRO powered by DATAGRO. Seus dados são tratados com total confidencialidade, conforme a <strong style="color:rgba(255,255,255,0.85);">LGPD — Lei nº 13.709/2018</strong>. Não compartilhamos suas informações sem consentimento. Você pode revogar seu consentimento a qualquer momento.
            </p>
          </td></tr>
        </table>

        <!-- Links opt-out -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
          <tr>
            <td style="font-size:9px;font-family:Arial,sans-serif;">
              <a href="https://agro.remax.com.br/newsletter" style="color:rgba(255,255,255,0.7);text-decoration:underline;">Ver Online</a>
              <span style="color:rgba(255,255,255,0.25);margin:0 6px;">·</span>
              <a href="mailto:contatoagro@remax.com.br?subject=Descadastro%20Newsletter" style="color:rgba(255,255,255,0.7);text-decoration:underline;">🚫 Descadastrar</a>
              <span style="color:rgba(255,255,255,0.25);margin:0 6px;">·</span>
              <a href="https://agro.remax.com.br/privacidade" style="color:rgba(255,255,255,0.7);text-decoration:underline;">Política de Privacidade</a>
              <span style="color:rgba(255,255,255,0.25);margin:0 6px;">·</span>
              <a href="https://agro.remax.com.br/termos" style="color:rgba(255,255,255,0.7);text-decoration:underline;">Termos de Uso</a>
              <span style="color:rgba(255,255,255,0.25);margin:0 6px;">·</span>
              <a href="mailto:contatoagro@remax.com.br" style="color:rgba(255,255,255,0.7);text-decoration:underline;">Fale Conosco</a>
            </td>
          </tr>
        </table>

        <!-- Copyright -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td height="1" style="background:rgba(255,255,255,0.15);line-height:1px;font-size:1px;">&nbsp;</td></tr></table>
        <p style="margin:10px 0 0;font-size:9px;color:rgba(255,255,255,0.3);line-height:1.5;font-family:Arial,sans-serif;">
          © 2026 RE/MAX AGRO · RE/MAX Commercial Divisão Agro · powered by DATAGRO · Todos os direitos reservados.<br/>
          Esta comunicação é de caráter informativo e não constitui recomendação de investimento. CRECI válido em todo o território nacional.
        </p>

      </td></tr>
      <!-- Espaço abaixo do email -->
      <tr><td height="20">&nbsp;</td></tr>

    </table>
  </td></tr>
  </table>

</body>
</html>`;
}
