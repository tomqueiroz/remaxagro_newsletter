/**
 * NewsletterPDF
 * Documento PDF gerado com @react-pdf/renderer.
 * Layout próprio — independente da página web.
 * Inclui: cotações, notícias linkáveis, insights, corretores, opt-out, LGPD.
 */

import {
  Document,
  Page,
  Text,
  View,
  Image,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { NewsletterData } from "@/hooks/useNewsletterData";

// Registrar fontes (usa fontes do sistema via PDF padrão)
Font.register({
  family: "Helvetica",
  fonts: [],
});

// ─── Paleta de cores ────────────────────────────────────────────────────────
const C = {
  green:      "#0F2A1A",
  greenMid:   "#1A4A2A",
  gold:       "#C9A84C",
  goldLight:  "#F5F0E8",
  red:        "#CC0000",
  navy:       "#1a2e4a",
  white:      "#FFFFFF",
  gray1:      "#F8F6F2",
  gray2:      "#E8E0D0",
  gray3:      "#9A9A9A",
  gray4:      "#5A5A5A",
  dark:       "#1A1A1A",
  emerald:    "#10B981",
  amber:      "#F59E0B",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: C.white,
    paddingBottom: 60,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  headerBand: {
    backgroundColor: C.green,
    paddingHorizontal: 30,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: { width: 130, height: 44, objectFit: "contain" },
  headerRight: { alignItems: "flex-end" },
  headerEdition: { color: C.gold, fontSize: 8, fontFamily: "Helvetica-Bold", letterSpacing: 1.5, textTransform: "uppercase" },
  headerDate:    { color: "#FFFFFF99", fontSize: 7.5, marginTop: 2 },

  // ── Gold divider bar ────────────────────────────────────────────────────
  goldBar: { height: 4, backgroundColor: C.gold },

  // ── Red ticker-style bar ────────────────────────────────────────────────
  redBar: {
    backgroundColor: C.red,
    paddingHorizontal: 30,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  redBarLabel: { color: C.white, fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 1 },
  redBarText:  { color: "#FFE0E0", fontSize: 7 },

  // ── Body ─────────────────────────────────────────────────────────────────
  body: { paddingHorizontal: 30, paddingTop: 20 },

  // ── Section header ───────────────────────────────────────────────────────
  sectionTag: {
    backgroundColor: C.gold,
    color: C.green,
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.2,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: C.green,
    marginBottom: 12,
  },

  // ── Divider ──────────────────────────────────────────────────────────────
  divider: { height: 1, backgroundColor: C.gray2, marginVertical: 18 },
  thinDivider: { height: 1, backgroundColor: C.gray2, marginVertical: 8 },

  // ── Cotações ─────────────────────────────────────────────────────────────
  quotationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 6,
  },
  quotationCard: {
    width: "23%",
    backgroundColor: C.green,
    borderRadius: 8,
    padding: 10,
  },
  quotationName:   { color: "#FFFFFFAA", fontSize: 7, marginBottom: 2 },
  quotationValue:  { color: C.white, fontSize: 11, fontFamily: "Helvetica-Bold" },
  quotationUnit:   { color: "#FFFFFF66", fontSize: 6.5, marginTop: 1 },
  quotationChange: { fontSize: 7, fontFamily: "Helvetica-Bold", marginTop: 4 },
  quotationUp:     { color: C.emerald },
  quotationDown:   { color: "#F87171" },
  quotationSource: { color: C.gray3, fontSize: 7, marginTop: 6 },

  // ── Notícias ─────────────────────────────────────────────────────────────
  newsCard: {
    backgroundColor: C.gray1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeft: `3pt solid ${C.gold}`,
  },
  newsCat:     { color: C.gold, fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 1, marginBottom: 3, textTransform: "uppercase" },
  newsTitle:   { color: C.green, fontSize: 10, fontFamily: "Helvetica-Bold", lineHeight: 1.4, marginBottom: 4 },
  newsSummary: { color: C.gray4, fontSize: 8, lineHeight: 1.5, marginBottom: 6 },
  newsFooter:  { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  newsDate:    { color: C.gray3, fontSize: 7 },
  newsLink:    { color: C.gold, fontSize: 7, fontFamily: "Helvetica-Bold", textDecoration: "underline" },

  // Notícias secundárias
  secondaryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 7,
    borderBottom: `1pt solid ${C.gray2}`,
    gap: 10,
  },
  secondaryCat:   { color: C.gold, fontSize: 6.5, fontFamily: "Helvetica-Bold", letterSpacing: 0.8, textTransform: "uppercase", width: 80, flexShrink: 0 },
  secondaryTitle: { color: C.green, fontSize: 8.5, fontFamily: "Helvetica-Bold", flex: 1, lineHeight: 1.4 },
  secondaryDate:  { color: C.gray3, fontSize: 7, width: 55, textAlign: "right", flexShrink: 0 },

  // ── Insights ─────────────────────────────────────────────────────────────
  insightCard: {
    backgroundColor: C.goldLight,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeft: `3pt solid ${C.navy}`,
  },
  insightHeader:  { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
  insightTitle:   { color: C.green, fontSize: 9.5, fontFamily: "Helvetica-Bold", flex: 1, lineHeight: 1.4 },
  insightDate:    { color: C.gray3, fontSize: 7, marginLeft: 8 },
  insightDesc:    { color: C.gray4, fontSize: 8, lineHeight: 1.5 },
  insightBadge:   { fontSize: 6.5, fontFamily: "Helvetica-Bold", paddingHorizontal: 7, paddingVertical: 2.5, borderRadius: 10, marginBottom: 5, alignSelf: "flex-start" },
  badgeAlta:      { backgroundColor: "#FEE2E2", color: "#B91C1C" },
  badgeMedia:     { backgroundColor: "#FEF3C7", color: "#B45309" },
  badgeEvento:    { backgroundColor: "#D1FAE5", color: "#065F46" },

  // ── Corretores ───────────────────────────────────────────────────────────
  brokersGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  brokerCard: {
    width: "47.5%",
    backgroundColor: C.green,
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brokerInfo: { flex: 1 },
  brokerName:   { color: C.white, fontSize: 8.5, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  brokerRole:   { color: C.gold, fontSize: 7, marginBottom: 1 },
  brokerRegion: { color: "#FFFFFF66", fontSize: 6.5 },
  brokerWa: {
    backgroundColor: "#10B981",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  brokerWaText: { color: C.white, fontSize: 6.5, fontFamily: "Helvetica-Bold" },

  // ── CTA Banner ───────────────────────────────────────────────────────────
  ctaBanner: {
    backgroundColor: C.navy,
    borderRadius: 10,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 30,
    marginBottom: 20,
  },
  ctaLeft: { flex: 1 },
  ctaTag:   { color: C.gold, fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" },
  ctaTitle: { color: C.white, fontSize: 13, fontFamily: "Helvetica-Bold", lineHeight: 1.4 },
  ctaSub:   { color: "#FFFFFF80", fontSize: 8, marginTop: 4, lineHeight: 1.4 },
  ctaButton: {
    backgroundColor: C.gold,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 16,
  },
  ctaButtonText: { color: C.green, fontSize: 8, fontFamily: "Helvetica-Bold" },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    backgroundColor: C.green,
    paddingHorizontal: 30,
    paddingVertical: 18,
    marginTop: 8,
  },
  footerLogoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  footerLogo: { width: 110, height: 36, objectFit: "contain" },
  footerSocials: { flexDirection: "row", gap: 8 },
  socialBadge: {
    backgroundColor: "#FFFFFF15",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  socialText: { color: C.white, fontSize: 7 },

  footerContactRow: { flexDirection: "row", gap: 20, marginBottom: 14 },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  contactDot:  { width: 4, height: 4, borderRadius: 2, backgroundColor: C.gold },
  contactText: { color: "#FFFFFF99", fontSize: 7.5 },
  contactLink: { color: C.gold, fontSize: 7.5, textDecoration: "underline" },

  footerDivider: { height: 1, backgroundColor: "#FFFFFF20", marginBottom: 12 },

  footerLegal: { color: "#FFFFFF50", fontSize: 6.5, lineHeight: 1.6, marginBottom: 8 },

  footerLinks: { flexDirection: "row", gap: 16, flexWrap: "wrap" },
  footerLinkText: { color: "#FFFFFF70", fontSize: 7, textDecoration: "underline" },
  footerCopy: { color: "#FFFFFF40", fontSize: 6.5, marginTop: 8 },

  // ── Page number ──────────────────────────────────────────────────────────
  pageNumber: {
    position: "absolute",
    bottom: 10,
    right: 30,
    color: C.gray3,
    fontSize: 7,
  },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionTitle({ tag, title }: { tag: string; title: string }) {
  return (
    <View>
      <Text style={styles.sectionTag}>{tag}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

// ─── Documento PDF ───────────────────────────────────────────────────────────

interface Props {
  data: NewsletterData;
}

export default function NewsletterPDF({ data }: Props) {
  const tickerText = data.quotations
    .map((q) => `${q.name}: ${q.value}/${q.unit}  ${q.change >= 0 ? "▲" : "▼"}${Math.abs(q.change)}%`)
    .join("    ·    ");

  return (
    <Document
      title={`RE/MAX AGRO Newsletter · Edição ${data.editionNumber}`}
      author="RE/MAX AGRO powered by DATAGRO"
      subject="Newsletter Semanal de Agronegócio"
      keywords="agronegócio, cotações, fazendas, DATAGRO, RE/MAX AGRO"
      creator="RE/MAX AGRO Newsletter System"
    >
      {/* ════════════════════════════════════════════════ PÁGINA 1 ══ */}
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.headerBand}>
          <Image src="/images/logo-white.png" style={styles.logo} />
          <View style={styles.headerRight}>
            <Text style={styles.headerEdition}>Newsletter Semanal · Edição Nº {data.editionNumber}</Text>
            <Text style={styles.headerDate}>{data.editionDate}</Text>
          </View>
        </View>
        <View style={styles.goldBar} />

        {/* Ticker de cotações */}
        <View style={styles.redBar}>
          <Text style={styles.redBarLabel}>AGRO EM TEMPO REAL</Text>
          <Text style={styles.redBarText}>{tickerText}</Text>
        </View>

        <View style={styles.body}>

          {/* ── COTAÇÕES ─────────────────────────────────────── */}
          <SectionTitle tag="Painel de Cotações · DATAGRO" title="Culturas & Mercado Agro" />

          <View style={styles.quotationsGrid}>
            {data.quotations.map((q) => (
              <View key={q.id} style={styles.quotationCard}>
                <Text style={styles.quotationName}>{q.name}</Text>
                <Text style={styles.quotationValue}>{q.value}</Text>
                <Text style={styles.quotationUnit}>{q.unit} · {q.region}</Text>
                <Text style={[styles.quotationChange, q.change >= 0 ? styles.quotationUp : styles.quotationDown]}>
                  {q.change >= 0 ? "▲" : "▼"} {Math.abs(q.change)}% na semana
                </Text>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6, marginBottom: 4 }}>
            <Text style={styles.quotationSource}>Cotações indicativas. Fonte: DATAGRO · Atualizado em {data.lastUpdated}</Text>
            <Link src="https://portal.datagro.com/pt" style={styles.newsLink}>Ver cotações completas →</Link>
          </View>

          <Divider />

          {/* ── DESTAQUES ────────────────────────────────────── */}
          <SectionTitle tag="Últimos 7 Dias" title="Principais Movimentos do Agro" />

          {data.mainNews.map((news) => (
            <View key={news.id} style={styles.newsCard}>
              <Text style={styles.newsCat}>{news.category}</Text>
              <Text style={styles.newsTitle}>{news.title}</Text>
              {news.summary && (
                <Text style={styles.newsSummary}>{news.summary}</Text>
              )}
              <View style={styles.newsFooter}>
                <Text style={styles.newsDate}>{news.date}{news.readTime ? `  ·  ${news.readTime} de leitura` : ""}</Text>
                {news.url && (
                  <Link src={news.url} style={styles.newsLink}>Leia o artigo completo →</Link>
                )}
              </View>
            </View>
          ))}

          {/* Notícias secundárias */}
          <View style={{ backgroundColor: C.gray1, borderRadius: 8, padding: 10, marginTop: 4 }}>
            <Text style={[styles.sectionTag, { marginBottom: 8 }]}>Mais Notícias da Semana</Text>
            {data.secondaryNews.map((news) => (
              <View key={news.id} style={styles.secondaryRow}>
                <Text style={styles.secondaryCat}>{news.category}</Text>
                {news.url ? (
                  <Link src={news.url} style={[styles.secondaryTitle, { textDecoration: "none" }]}>
                    {news.title}
                  </Link>
                ) : (
                  <Text style={styles.secondaryTitle}>{news.title}</Text>
                )}
                <Text style={styles.secondaryDate}>{news.date}</Text>
              </View>
            ))}
          </View>

        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>

      {/* ════════════════════════════════════════════════ PÁGINA 2 ══ */}
      <Page size="A4" style={styles.page}>

        {/* Header mini */}
        <View style={[styles.headerBand, { paddingVertical: 10 }]}>
          <Image src="/images/logo-white.png" style={[styles.logo, { width: 100, height: 34 }]} />
          <Text style={styles.headerEdition}>Edição Nº {data.editionNumber} · {data.lastUpdated}</Text>
        </View>
        <View style={styles.goldBar} />

        <View style={styles.body}>

          {/* ── INSIGHTS & AGENDA ────────────────────────────── */}
          <SectionTitle tag="Radar da Próxima Semana" title="Insights & O Que Vem Por Aí" />

          {data.insights.map((insight) => {
            const badgeStyle =
              insight.urgency === "alta" ? styles.badgeAlta
              : insight.urgency === "evento" ? styles.badgeEvento
              : styles.badgeMedia;
            const badgeLabel =
              insight.urgency === "alta" ? "Alta Prioridade"
              : insight.urgency === "evento" ? "Evento"
              : "Atenção";
            return (
              <View key={insight.id} style={styles.insightCard}>
                <View style={styles.insightHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.insightBadge, badgeStyle]}>{badgeLabel}</Text>
                    <Text style={styles.insightTitle}>{insight.title}</Text>
                  </View>
                  <Text style={styles.insightDate}>{insight.date}</Text>
                </View>
                <Text style={styles.insightDesc}>{insight.description}</Text>
              </View>
            );
          })}

          <Divider />

          {/* ── CORRETORES ───────────────────────────────────── */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Image src="/images/selo-corretor-certificado.png" style={{ width: 52, height: 52, objectFit: "contain" }} />
            <View>
              <Text style={styles.sectionTag}>Corretores Certificados RE/MAX Commercial</Text>
              <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Especialistas Prontos para Atender</Text>
            </View>
          </View>

          <View style={styles.brokersGrid}>
            {data.brokers.map((broker) => (
              <View key={broker.id} style={styles.brokerCard}>
                <View style={styles.brokerInfo}>
                  <Text style={styles.brokerName}>{broker.name}</Text>
                  <Text style={styles.brokerRole}>{broker.role}</Text>
                  <Text style={styles.brokerRegion}>{broker.region}</Text>
                  <Link
                    src={`https://wa.me/${broker.whatsapp.replace(/\D/g, "")}`}
                    style={styles.brokerWa}
                  >
                    <Text style={styles.brokerWaText}>WhatsApp →</Text>
                  </Link>
                </View>
              </View>
            ))}
          </View>

        </View>

        {/* CTA banner */}
        <View style={styles.ctaBanner}>
          <View style={styles.ctaLeft}>
            <Text style={styles.ctaTag}>Análise Exclusiva DATAGRO</Text>
            <Text style={styles.ctaTitle}>Fale com um Especialista RE/MAX AGRO</Text>
            <Text style={styles.ctaSub}>Central de Atendimento: +55 (11) 91505-1212</Text>
          </View>
          <Link src="https://agro.remax.com.br">
            <View style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Acessar o Site →</Text>
            </View>
          </Link>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLogoRow}>
            <Image src="/images/logo-white.png" style={styles.footerLogo} />
            <View style={styles.footerSocials}>
              {[
                { label: "Instagram", url: "https://www.instagram.com/remaxcommercialdivsaoagro" },
                { label: "LinkedIn",  url: "https://www.linkedin.com/company/remax-agro" },
                { label: "Facebook",  url: "https://www.facebook.com/remaxagro" },
              ].map((s) => (
                <Link key={s.label} src={s.url}>
                  <View style={styles.socialBadge}>
                    <Text style={styles.socialText}>{s.label}</Text>
                  </View>
                </Link>
              ))}
            </View>
          </View>

          <View style={styles.footerContactRow}>
            {[
              { label: "+55 (11) 91505-1212", url: "tel:+5511915051212" },
              { label: "contatoagro@remax.com.br", url: "mailto:contatoagro@remax.com.br" },
              { label: "agro.remax.com.br", url: "https://agro.remax.com.br" },
              { label: "portal.datagro.com", url: "https://portal.datagro.com/pt" },
            ].map((c) => (
              <View key={c.label} style={styles.contactItem}>
                <View style={styles.contactDot} />
                <Link src={c.url} style={styles.contactLink}>{c.label}</Link>
              </View>
            ))}
          </View>

          <View style={styles.footerDivider} />

          <Text style={styles.footerLegal}>
            Esta newsletter foi enviada porque você se inscreveu na lista da RE/MAX AGRO powered by DATAGRO.{"\n"}
            Seus dados são tratados com total confidencialidade, conforme a LGPD — Lei Geral de Proteção de Dados (Lei nº 13.709/2018).{"\n"}
            Não compartilhamos suas informações com terceiros sem seu consentimento.
          </Text>

          <View style={styles.footerLinks}>
            {[
              { label: "Ver Newsletter Online", url: "https://agro.remax.com.br/newsletter" },
              { label: "Descadastrar (Opt-out)", url: "mailto:contatoagro@remax.com.br?subject=Descadastro%20Newsletter&body=Solicito%20o%20descadastro%20da%20newsletter%20RE%2FMAX%20AGRO." },
              { label: "Política de Privacidade", url: "https://agro.remax.com.br/privacidade" },
              { label: "Termos de Uso", url: "https://agro.remax.com.br/termos" },
              { label: "Fale Conosco", url: "mailto:contatoagro@remax.com.br" },
            ].map((l) => (
              <Link key={l.label} src={l.url}>
                <Text style={styles.footerLinkText}>{l.label}</Text>
              </Link>
            ))}
          </View>

          <Text style={styles.footerCopy}>
            © 2026 RE/MAX AGRO · RE/MAX Commercial Divisão Agro · powered by DATAGRO · Todos os direitos reservados.
          </Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
