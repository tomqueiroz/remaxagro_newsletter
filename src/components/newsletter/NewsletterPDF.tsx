/**
 * NewsletterPDF — v2
 * Layout magazine-style com sidebar, carta editorial, cotações, notícias,
 * insights, corretores, CTAs e rodapé LGPD completo.
 *
 * Estrutura de páginas:
 *  Página 1 — Capa (header full-color + editorial + cotações destacadas)
 *  Página 2 — Destaques (2 colunas: notícias principal + sidebar)
 *  Página 3 — Insights / Agenda + Corretores (2 colunas)
 *  Página 4 — Rodapé legal, CTAs, links, opt-out
 */

import {
  Document,
  Page,
  Text,
  View,
  Image,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import type { NewsletterData } from "@/hooks/useNewsletterData";

// ─── Paleta ──────────────────────────────────────────────────────────────────
const C = {
  green:     "#0F2A1A",
  greenMid:  "#1A4A2A",
  gold:      "#C9A84C",
  goldBg:    "#F5F0E8",
  goldLight: "#FBF7EE",
  red:       "#CC0000",
  navy:      "#1a2e4a",
  navyLight: "#243d5c",
  white:     "#FFFFFF",
  offWhite:  "#FAFAF8",
  gray1:     "#F3F0EA",
  gray2:     "#E4DDD0",
  gray3:     "#9A9A9A",
  gray4:     "#5A5A5A",
  gray5:     "#2A2A2A",
  emerald:   "#059669",
  rose:      "#DC2626",
  amber:     "#D97706",
};

// ─── Margens & métricas ───────────────────────────────────────────────────────
const M = { h: 26, v: 22, gutter: 10 };

// ─── Estilos ─────────────────────────────────────────────────────────────────
const s = StyleSheet.create({

  // Páginas
  page: { fontFamily: "Helvetica", backgroundColor: C.white },
  pagePad: { paddingHorizontal: M.h, paddingBottom: 36 },

  // ── CAPA header verde-escuro ─────────────────────────────────────────────
  coverHeader: {
    backgroundColor: C.green,
    paddingHorizontal: M.h,
    paddingTop: 18,
    paddingBottom: 14,
  },
  coverTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  coverLogo: { width: 150, height: 50, objectFit: "contain" },
  coverEditionBox: { alignItems: "flex-end" },
  coverEditionNum: { color: C.gold, fontSize: 9, fontFamily: "Helvetica-Bold", letterSpacing: 1.5, textTransform: "uppercase" },
  coverDate: { color: "#FFFFFFAA", fontSize: 8, marginTop: 2 },

  // Linha dourada divisória
  goldLine: { height: 3, backgroundColor: C.gold },

  // Ticker vermelho
  ticker: {
    backgroundColor: C.red,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: M.h,
  },
  tickerLabel: { color: C.white, fontSize: 6.5, fontFamily: "Helvetica-Bold", letterSpacing: 1.2, marginRight: 8, textTransform: "uppercase" },
  tickerText:  { color: "#FFD0D0", fontSize: 6.5, flex: 1 },

  // ── CARTA EDITORIAL (capa) ────────────────────────────────────────────────
  editorialBox: {
    backgroundColor: C.green,
    paddingHorizontal: M.h,
    paddingVertical: 16,
    borderBottom: `3pt solid ${C.gold}`,
  },
  editorialInner: {
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-start",
  },
  editorialSeloCol: { width: 70, alignItems: "center", flexShrink: 0 },
  editorialSelo: { width: 68, height: 68, objectFit: "contain" },
  editorialSeloLabel: { color: C.gold, fontSize: 6, textAlign: "center", marginTop: 4, letterSpacing: 0.5 },
  editorialTextCol: { flex: 1 },
  editorialTag:   { color: C.gold, fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 },
  editorialTitle: { color: C.white, fontSize: 15, fontFamily: "Helvetica-Bold", lineHeight: 1.35, marginBottom: 6 },
  editorialBody:  { color: "#FFFFFFCC", fontSize: 8, lineHeight: 1.65 },
  editorialSign:  { color: C.gold, fontSize: 7.5, fontFamily: "Helvetica-Bold", marginTop: 8 },
  editorialRole:  { color: "#FFFFFF80", fontSize: 7, marginTop: 1 },

  // ── COTAÇÕES DESTAQUE (capa, row) ─────────────────────────────────────────
  quoteRow: {
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: M.h,
    paddingVertical: 12,
    backgroundColor: C.goldBg,
  },
  quoteCard: {
    flex: 1,
    backgroundColor: C.white,
    borderRadius: 6,
    padding: 9,
    borderTop: `3pt solid ${C.gold}`,
    alignItems: "center",
  },
  quoteName:   { color: C.gray4, fontSize: 6.5, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 },
  quoteValue:  { color: C.green, fontSize: 12, fontFamily: "Helvetica-Bold", lineHeight: 1 },
  quoteUnit:   { color: C.gray3, fontSize: 6, marginTop: 1 },
  quoteUp:     { color: C.emerald, fontSize: 7, fontFamily: "Helvetica-Bold", marginTop: 4 },
  quoteDown:   { color: C.rose,    fontSize: 7, fontFamily: "Helvetica-Bold", marginTop: 4 },
  quoteSource: { color: C.gray3, fontSize: 6.5, paddingHorizontal: M.h, paddingBottom: 6, paddingTop: 2, backgroundColor: C.goldBg },

  // ── 2 COLUNAS (main + sidebar) ────────────────────────────────────────────
  twoCol: { flexDirection: "row", gap: M.gutter, marginTop: M.v },
  mainCol: { flex: 62 },
  sideCol: { flex: 34 },

  // ── Section title ─────────────────────────────────────────────────────────
  secTag: {
    backgroundColor: C.gold,
    color: C.green,
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.2,
    paddingHorizontal: 9,
    paddingVertical: 2.5,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  secTitle: { color: C.green, fontSize: 15, fontFamily: "Helvetica-Bold", lineHeight: 1.3, marginBottom: 10 },
  secTitleWhite: { color: C.white, fontSize: 15, fontFamily: "Helvetica-Bold", lineHeight: 1.3, marginBottom: 10 },

  // ── Notícia principal ─────────────────────────────────────────────────────
  newsCardMain: {
    backgroundColor: C.gray1,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
    borderLeft: `4pt solid ${C.gold}`,
  },
  newsCardMainBody: { padding: 11 },
  newsMainCat:     { color: C.gold, fontSize: 6.5, fontFamily: "Helvetica-Bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 },
  newsMainTitle:   { color: C.green, fontSize: 10.5, fontFamily: "Helvetica-Bold", lineHeight: 1.4, marginBottom: 5 },
  newsMainSummary: { color: C.gray4, fontSize: 8, lineHeight: 1.55, marginBottom: 7 },
  newsMainFooter:  { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  newsDate:        { color: C.gray3, fontSize: 7 },
  newsReadLink:    { color: C.gold, fontSize: 7, fontFamily: "Helvetica-Bold", textDecoration: "underline" },

  // ── Notícias secundárias ─────────────────────────────────────────────────
  secNewsBox: { backgroundColor: C.gray1, borderRadius: 8, overflow: "hidden" },
  secNewsHeader: { backgroundColor: C.green, paddingHorizontal: 10, paddingVertical: 5 },
  secNewsHeaderText: { color: C.gold, fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 1, textTransform: "uppercase" },
  secNewsRow: { flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 10, paddingVertical: 7, borderBottom: `1pt solid ${C.gray2}`, gap: 6 },
  secNewsBullet: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.gold, marginTop: 3, flexShrink: 0 },
  secNewsCat:    { color: C.gold, fontSize: 6, fontFamily: "Helvetica-Bold", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 2 },
  secNewsTitle:  { color: C.gray5, fontSize: 7.5, lineHeight: 1.4 },
  secNewsDate:   { color: C.gray3, fontSize: 6.5, marginTop: 2 },

  // ── SIDEBAR ───────────────────────────────────────────────────────────────
  sidebarBox: {
    backgroundColor: C.navy,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  sidebarHeader: {
    backgroundColor: C.gold,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  sidebarHeaderIcon: { color: C.green, fontSize: 8 },
  sidebarHeaderText: { color: C.green, fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 1, textTransform: "uppercase" },
  sidebarBody: { padding: 10 },

  // Propriedade em destaque (sidebar)
  propCard: {
    backgroundColor: "#FFFFFF12",
    borderRadius: 6,
    padding: 9,
    marginBottom: 8,
    borderLeft: `3pt solid ${C.gold}`,
  },
  propLabel:  { color: C.gold, fontSize: 6, fontFamily: "Helvetica-Bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 },
  propTitle:  { color: C.white, fontSize: 8.5, fontFamily: "Helvetica-Bold", lineHeight: 1.4, marginBottom: 2 },
  propSub:    { color: "#FFFFFF80", fontSize: 7, marginBottom: 4 },
  propDetail: { color: "#FFFFFFCC", fontSize: 7, lineHeight: 1.5 },
  propBadge:  { backgroundColor: C.emerald, alignSelf: "flex-start", borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, marginBottom: 5 },
  propBadgeText: { color: C.white, fontSize: 6, fontFamily: "Helvetica-Bold" },

  // Dica rápida (sidebar)
  tipBox: {
    backgroundColor: "#FFFFFF0D",
    borderRadius: 6,
    padding: 9,
    marginBottom: 8,
  },
  tipLabel: { color: "#FFFFFFAA", fontSize: 6, fontFamily: "Helvetica-Bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 },
  tipText:  { color: C.white, fontSize: 7.5, lineHeight: 1.55 },

  // CTA sidebar (botão grande)
  sidebarCTA: {
    backgroundColor: C.red,
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
    marginBottom: 6,
  },
  sidebarCTATitle: { color: C.white, fontSize: 8, fontFamily: "Helvetica-Bold", textAlign: "center", marginBottom: 3 },
  sidebarCTASub:   { color: "#FFFFFF99", fontSize: 6.5, textAlign: "center", marginBottom: 7 },
  sidebarCTABtn:   { backgroundColor: C.white, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  sidebarCTABtnText: { color: C.red, fontSize: 7, fontFamily: "Helvetica-Bold" },

  // Redes (sidebar)
  socialRow: { flexDirection: "row", gap: 5, marginTop: 5 },
  socialChip: { backgroundColor: "#FFFFFF15", borderRadius: 4, paddingHorizontal: 7, paddingVertical: 3, flex: 1, alignItems: "center" },
  socialChipText: { color: C.white, fontSize: 6.5 },

  // ── INSIGHTS ─────────────────────────────────────────────────────────────
  insightCard: {
    borderRadius: 7,
    padding: 10,
    marginBottom: 8,
    backgroundColor: C.goldBg,
    borderLeft: `3pt solid ${C.navy}`,
  },
  insightHead: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 3 },
  insightTitle: { color: C.green, fontSize: 9, fontFamily: "Helvetica-Bold", lineHeight: 1.4, flex: 1, marginRight: 8 },
  insightDate:  { color: C.gray3, fontSize: 6.5, flexShrink: 0 },
  insightDesc:  { color: C.gray4, fontSize: 7.5, lineHeight: 1.55 },
  badgeRow: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 4 },
  badgeAlta:    { backgroundColor: "#FEE2E2", color: "#B91C1C", fontSize: 6, fontFamily: "Helvetica-Bold", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  badgeMedia:   { backgroundColor: "#FEF3C7", color: "#92400E", fontSize: 6, fontFamily: "Helvetica-Bold", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  badgeEvento:  { backgroundColor: "#D1FAE5", color: "#065F46", fontSize: 6, fontFamily: "Helvetica-Bold", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },

  // ── CORRETORES ────────────────────────────────────────────────────────────
  brokerGrid: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 8 },
  brokerCard: {
    width: "47.8%",
    backgroundColor: C.green,
    borderRadius: 7,
    padding: 9,
  },
  brokerName:   { color: C.white, fontSize: 8.5, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  brokerRole:   { color: C.gold, fontSize: 7, marginBottom: 1 },
  brokerRegion: { color: "#FFFFFF66", fontSize: 6.5, marginBottom: 6 },
  brokerWaBtn:  { backgroundColor: C.emerald, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3, alignSelf: "flex-start" },
  brokerWaText: { color: C.white, fontSize: 6.5, fontFamily: "Helvetica-Bold" },

  // ── CTA BANNER (página 3) ─────────────────────────────────────────────────
  ctaBanner: {
    backgroundColor: C.navy,
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  ctaLeft: { flex: 1 },
  ctaTag:   { color: C.gold, fontSize: 6.5, fontFamily: "Helvetica-Bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 },
  ctaTitle: { color: C.white, fontSize: 12, fontFamily: "Helvetica-Bold", lineHeight: 1.4 },
  ctaSub:   { color: "#FFFFFF70", fontSize: 7.5, marginTop: 3 },
  ctaBtn:   { backgroundColor: C.gold, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, marginLeft: 14 },
  ctaBtnText: { color: C.green, fontSize: 8, fontFamily: "Helvetica-Bold" },

  // ── FOOTER PAGE (página 4) ────────────────────────────────────────────────
  footerPage: { backgroundColor: C.green, flex: 1 },
  footerTop: { paddingHorizontal: M.h, paddingTop: 20, paddingBottom: 14 },
  footerLogoRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  footerLogo: { width: 130, height: 44, objectFit: "contain" },
  footerSocials: { flexDirection: "row", gap: 6 },
  footerSocialChip: { backgroundColor: "#FFFFFF18", borderRadius: 5, paddingHorizontal: 9, paddingVertical: 4 },
  footerSocialText: { color: C.white, fontSize: 7 },

  footerGrid: { flexDirection: "row", gap: 16, marginBottom: 16 },
  footerCol: { flex: 1 },
  footerColTitle: { color: C.gold, fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 7 },
  footerItem: { flexDirection: "row", alignItems: "flex-start", gap: 5, marginBottom: 5 },
  footerDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: C.gold, marginTop: 2.5, flexShrink: 0 },
  footerLink: { color: "#FFFFFFCC", fontSize: 7.5, textDecoration: "underline" },
  footerText: { color: "#FFFFFFCC", fontSize: 7.5 },

  footerDivider: { height: 1, backgroundColor: "#FFFFFF20", marginHorizontal: M.h, marginBottom: 12 },

  legalBox: { paddingHorizontal: M.h, marginBottom: 12 },
  legalTitle: { color: C.gold, fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 0.8, marginBottom: 5 },
  legalText:  { color: "#FFFFFF70", fontSize: 6.5, lineHeight: 1.7 },

  optOutRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, paddingHorizontal: M.h, marginBottom: 14 },
  optOutLink: { color: "#FFFFFFBB", fontSize: 7, textDecoration: "underline" },
  optOutSep:  { color: "#FFFFFF30", fontSize: 7 },

  footerCopy: { color: "#FFFFFF40", fontSize: 6.5, paddingHorizontal: M.h, paddingBottom: 14 },

  // ── Page number ───────────────────────────────────────────────────────────
  pageNum: {
    position: "absolute",
    bottom: 10,
    right: M.h,
    color: C.gray3,
    fontSize: 7,
  },
  divider: { height: 1, backgroundColor: C.gray2, marginVertical: 12 },
  dividerGold: { height: 2, backgroundColor: C.gold, marginVertical: 12 },
});

// ─── Componentes auxiliares ───────────────────────────────────────────────────

function SecHead({ tag, title, white = false }: { tag: string; title: string; white?: boolean }) {
  return (
    <View>
      <Text style={s.secTag}>{tag}</Text>
      <Text style={white ? s.secTitleWhite : s.secTitle}>{title}</Text>
    </View>
  );
}

function PageNum() {
  return (
    <Text
      style={s.pageNum}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      fixed
    />
  );
}

// ─── Componente principal ────────────────────────────────────────────────────

interface Props { data: NewsletterData }

export default function NewsletterPDF({ data }: Props) {

  const tickerStr = data.quotations
    .map(q => `${q.name}: ${q.value}/${q.unit} ${q.change >= 0 ? "▲" : "▼"}${Math.abs(q.change)}%`)
    .join("    ·    ");

  // Cotações destaque: apenas as 4 principais para a capa
  const featuredQuotes = data.quotations.slice(0, 4);

  return (
    <Document
      title={`RE/MAX AGRO Newsletter · Edição ${data.editionNumber}`}
      author="RE/MAX AGRO powered by DATAGRO"
      subject="Newsletter Semanal de Agronegócio"
      keywords="agronegócio, cotações, fazendas, DATAGRO, RE/MAX AGRO"
      creator="RE/MAX AGRO Newsletter System"
    >

      {/* ═══════════════════════════ PÁGINA 1 — CAPA ═══════════════════════ */}
      <Page size="A4" style={s.page}>

        {/* Header verde completo */}
        <View style={s.coverHeader}>
          <View style={s.coverTopRow}>
            <Image src="/images/logo-white.png" style={s.coverLogo} />
            <View style={s.coverEditionBox}>
              <Text style={s.coverEditionNum}>Newsletter Semanal · Edição Nº {data.editionNumber}</Text>
              <Text style={s.coverDate}>{data.editionDate}</Text>
            </View>
          </View>
        </View>
        <View style={s.goldLine} />

        {/* Ticker */}
        <View style={s.ticker}>
          <Text style={s.tickerLabel}>⚡ AGRO EM TEMPO REAL</Text>
          <Text style={s.tickerText}>{tickerStr}</Text>
        </View>

        {/* Carta editorial */}
        <View style={s.editorialBox}>
          <View style={s.editorialInner}>
            <View style={s.editorialTextCol}>
              <Text style={s.editorialTag}>✦  Carta Editorial · Edição {data.editionNumber}</Text>
              <Text style={s.editorialTitle}>
                O Agro Estratégico na Palma da Sua Mão
              </Text>
              <Text style={s.editorialBody}>
                Bem-vindo à primeira edição da newsletter semanal mais relevante do agronegócio brasileiro. Com curadoria exclusiva da RE/MAX AGRO powered by DATAGRO — referência em inteligência agrícola há mais de 35 anos —, você recebe toda segunda-feira o que realmente importa para tomar as melhores decisões no campo.{"\n\n"}
                Esta semana: safra recorde de soja, decisão do COPOM e janela estratégica de comercialização. Boa leitura.
              </Text>
              <Text style={s.editorialSign}>Gabriel Pesciallo</Text>
              <Text style={s.editorialRole}>CEO · RE/MAX AGRO</Text>
            </View>
          </View>
        </View>

        {/* Cotações destaque */}
        <View style={s.quoteRow}>
          {featuredQuotes.map(q => (
            <View key={q.id} style={s.quoteCard}>
              <Text style={s.quoteName}>{q.name}</Text>
              <Text style={s.quoteValue}>{q.value}</Text>
              <Text style={s.quoteUnit}>{q.unit}</Text>
              <Text style={q.change >= 0 ? s.quoteUp : s.quoteDown}>
                {q.change >= 0 ? "▲" : "▼"} {Math.abs(q.change)}%
              </Text>
            </View>
          ))}
        </View>
        <View style={{ backgroundColor: C.goldBg }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: M.h, paddingBottom: 8 }}>
            <Text style={s.quoteSource}>Fonte: DATAGRO · Atualizado em {data.lastUpdated} · Cotações indicativas</Text>
            <Link src="https://portal.datagro.com/pt" style={{ color: C.gold, fontSize: 7, fontFamily: "Helvetica-Bold", textDecoration: "underline" }}>
              Painel completo →
            </Link>
          </View>
        </View>

        {/* Todas as cotações — tabela compacta */}
        <View style={[s.pagePad, { marginTop: 12 }]}>
          <SecHead tag="Painel Completo de Cotações · DATAGRO" title="Culturas & Commodities" />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {data.quotations.map(q => (
              <View key={q.id} style={{ width: "23.5%", backgroundColor: C.green, borderRadius: 6, padding: 8 }}>
                <Text style={{ color: "#FFFFFFAA", fontSize: 6.5, marginBottom: 1 }}>{q.name}</Text>
                <Text style={{ color: C.white, fontSize: 10.5, fontFamily: "Helvetica-Bold" }}>{q.value}</Text>
                <Text style={{ color: "#FFFFFF55", fontSize: 6 }}>{q.unit} · {q.region}</Text>
                <Text style={{ color: q.change >= 0 ? C.emerald : "#F87171", fontSize: 7, fontFamily: "Helvetica-Bold", marginTop: 3 }}>
                  {q.change >= 0 ? "▲" : "▼"} {Math.abs(q.change)}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        <PageNum />
      </Page>

      {/* ═════════════════════════ PÁGINA 2 — NOTÍCIAS + SIDEBAR ══════════ */}
      <Page size="A4" style={s.page}>
        <View style={s.coverHeader}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Image src="/images/logo-white.png" style={[s.coverLogo, { width: 110, height: 36 }]} />
            <Text style={s.coverEditionNum}>Edição Nº {data.editionNumber} · {data.lastUpdated}</Text>
          </View>
        </View>
        <View style={s.goldLine} />

        <View style={[s.pagePad, { flex: 1 }]}>
          <View style={s.twoCol}>

            {/* COLUNA PRINCIPAL */}
            <View style={s.mainCol}>
              <SecHead tag="Últimos 7 Dias" title="Principais Movimentos do Agro" />

              {data.mainNews.map(news => (
                <View key={news.id} style={s.newsCardMain}>
                  <View style={s.newsCardMainBody}>
                    <Text style={s.newsMainCat}>{news.category}</Text>
                    <Text style={s.newsMainTitle}>{news.title}</Text>
                    {news.summary && <Text style={s.newsMainSummary}>{news.summary}</Text>}
                    <View style={s.newsMainFooter}>
                      <Text style={s.newsDate}>{news.date}{news.readTime ? `  ·  ${news.readTime} de leitura` : ""}</Text>
                      {news.url && (
                        <Link src={news.url} style={s.newsReadLink}>Leia o artigo completo →</Link>
                      )}
                    </View>
                  </View>
                </View>
              ))}

              {/* Notícias secundárias */}
              <View style={s.secNewsBox}>
                <View style={s.secNewsHeader}>
                  <Text style={s.secNewsHeaderText}>Mais Notícias da Semana</Text>
                </View>
                {data.secondaryNews.map(news => (
                  <View key={news.id} style={s.secNewsRow}>
                    <View style={s.secNewsBullet} />
                    <View style={{ flex: 1 }}>
                      <Text style={s.secNewsCat}>{news.category}</Text>
                      {news.url
                        ? <Link src={news.url} style={[s.secNewsTitle, { textDecoration: "none" }]}>{news.title}</Link>
                        : <Text style={s.secNewsTitle}>{news.title}</Text>
                      }
                      <Text style={s.secNewsDate}>{news.date}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* SIDEBAR */}
            <View style={s.sideCol}>

              {/* Propriedade em Destaque */}
              <View style={s.sidebarBox}>
                <View style={s.sidebarHeader}>
                  <Text style={s.sidebarHeaderText}>🏡 Propriedade em Destaque</Text>
                </View>
                <View style={s.sidebarBody}>
                  <View style={s.propCard}>
                    <View style={s.propBadge}><Text style={s.propBadgeText}>NOVO</Text></View>
                    <Text style={s.propLabel}>Fazenda Exclusiva</Text>
                    <Text style={s.propTitle}>Fazenda Santa Luzia — 4.200 ha</Text>
                    <Text style={s.propSub}>Soja + Milho · Mato Grosso</Text>
                    <Text style={s.propDetail}>Produtividade acima da média regional. Infraestrutura completa. Oportunidade única de investimento.</Text>
                  </View>
                  <Link src="https://agro.remax.com.br">
                    <View style={{ backgroundColor: C.gold, borderRadius: 20, paddingVertical: 6, alignItems: "center", marginTop: 4 }}>
                      <Text style={{ color: C.green, fontSize: 7.5, fontFamily: "Helvetica-Bold" }}>Ver Detalhes →</Text>
                    </View>
                  </Link>
                </View>
              </View>

              {/* Dica da Semana */}
              <View style={s.sidebarBox}>
                <View style={s.sidebarHeader}>
                  <Text style={s.sidebarHeaderText}>💡 Dica da Semana</Text>
                </View>
                <View style={s.sidebarBody}>
                  <View style={s.tipBox}>
                    <Text style={s.tipLabel}>Mercado de Terras</Text>
                    <Text style={s.tipText}>
                      Propriedades com certificação ESG estão valorizando até <Text style={{ color: C.gold, fontFamily: "Helvetica-Bold" }}>25% acima</Text> da média de mercado. Saiba como adequar sua fazenda.
                    </Text>
                  </View>
                  <Link src="https://agro.remax.com.br/blog">
                    <View style={{ backgroundColor: "#FFFFFF15", borderRadius: 20, paddingVertical: 5, alignItems: "center" }}>
                      <Text style={{ color: C.white, fontSize: 7, fontFamily: "Helvetica-Bold" }}>Ler Análise Completa →</Text>
                    </View>
                  </Link>
                </View>
              </View>

              {/* CTA Especialista */}
              <View style={s.sidebarBox}>
                <View style={s.sidebarBody}>
                  <View style={s.sidebarCTA}>
                    <Text style={s.sidebarCTATitle}>Fale com um{"\n"}Especialista Agora</Text>
                    <Text style={s.sidebarCTASub}>Atendimento em todo o Brasil</Text>
                    <Link src="https://wa.me/5511915051212">
                      <View style={s.sidebarCTABtn}>
                        <Text style={s.sidebarCTABtnText}>WhatsApp →</Text>
                      </View>
                    </Link>
                  </View>
                  <Text style={{ color: C.gold, fontSize: 7, textAlign: "center" }}>+55 (11) 91505-1212</Text>
                </View>
              </View>

              {/* Redes sociais */}
              <View style={s.sidebarBox}>
                <View style={[s.sidebarHeader, { justifyContent: "center" }]}>
                  <Text style={s.sidebarHeaderText}>Siga a RE/MAX AGRO</Text>
                </View>
                <View style={[s.sidebarBody, { paddingTop: 8 }]}>
                  {[
                    { label: "Instagram", url: "https://www.instagram.com/remaxcommercialdivsaoagro" },
                    { label: "LinkedIn",  url: "https://www.linkedin.com/company/remax-agro" },
                    { label: "Facebook",  url: "https://www.facebook.com/remaxagro" },
                  ].map(soc => (
                    <Link key={soc.label} src={soc.url}>
                      <View style={{ backgroundColor: "#FFFFFF12", borderRadius: 5, padding: 6, marginBottom: 5, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4 }}>
                        <Text style={{ color: C.white, fontSize: 7.5 }}>{soc.label} →</Text>
                      </View>
                    </Link>
                  ))}
                  <Link src="https://agro.remax.com.br/newsletter">
                    <View style={{ backgroundColor: C.gold, borderRadius: 5, padding: 6, alignItems: "center" }}>
                      <Text style={{ color: C.green, fontSize: 7.5, fontFamily: "Helvetica-Bold" }}>Ver Newsletter Online →</Text>
                    </View>
                  </Link>
                </View>
              </View>

            </View>
          </View>
        </View>

        <PageNum />
      </Page>

      {/* ═════════════════════ PÁGINA 3 — INSIGHTS + CORRETORES ═══════════ */}
      <Page size="A4" style={s.page}>
        <View style={s.coverHeader}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Image src="/images/logo-white.png" style={[s.coverLogo, { width: 110, height: 36 }]} />
            <Text style={s.coverEditionNum}>Edição Nº {data.editionNumber} · {data.lastUpdated}</Text>
          </View>
        </View>
        <View style={s.goldLine} />

        <View style={[s.pagePad, { flex: 1 }]}>
          <View style={s.twoCol}>

            {/* Coluna insights */}
            <View style={s.mainCol}>
              <SecHead tag="Radar da Próxima Semana" title="Insights & O Que Vem Por Aí" />
              {data.insights.map(insight => {
                const badge =
                  insight.urgency === "alta" ? s.badgeAlta
                  : insight.urgency === "evento" ? s.badgeEvento
                  : s.badgeMedia;
                const badgeLabel =
                  insight.urgency === "alta" ? "⚠ Alta Prioridade"
                  : insight.urgency === "evento" ? "📅 Evento"
                  : "👁 Atenção";
                return (
                  <View key={insight.id} style={s.insightCard}>
                    <View style={s.badgeRow}>
                      <Text style={badge}>{badgeLabel}</Text>
                      <Text style={s.insightDate}>{insight.date}</Text>
                    </View>
                    <Text style={s.insightTitle}>{insight.title}</Text>
                    <Text style={s.insightDesc}>{insight.description}</Text>
                  </View>
                );
              })}
            </View>

            {/* Coluna corretores */}
            <View style={s.sideCol}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Image src="/images/selo-corretor-certificado.png" style={{ width: 48, height: 48, objectFit: "contain" }} />
                <View>
                  <Text style={[s.secTag, { marginBottom: 2 }]}>Certificados</Text>
                  <Text style={{ color: C.green, fontSize: 9, fontFamily: "Helvetica-Bold", lineHeight: 1.3 }}>Corretores{"\n"}Especializados</Text>
                </View>
              </View>
              {data.brokers.map(broker => (
                <View key={broker.id} style={[s.brokerCard, { marginBottom: 7 }]}>
                  <Text style={s.brokerName}>{broker.name}</Text>
                  <Text style={s.brokerRole}>{broker.role}</Text>
                  <Text style={s.brokerRegion}>{broker.region}</Text>
                  <Link src={`https://wa.me/${broker.whatsapp.replace(/\D/g, "")}`}>
                    <View style={s.brokerWaBtn}>
                      <Text style={s.brokerWaText}>WhatsApp →</Text>
                    </View>
                  </Link>
                </View>
              ))}

              {/* Mini CTA análise DATAGRO */}
              <View style={{ backgroundColor: C.goldBg, borderRadius: 8, padding: 10, marginTop: 2, borderTop: `3pt solid ${C.gold}` }}>
                <Text style={{ color: C.gold, fontSize: 6.5, fontFamily: "Helvetica-Bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>Análise Exclusiva</Text>
                <Text style={{ color: C.green, fontSize: 8.5, fontFamily: "Helvetica-Bold", lineHeight: 1.4, marginBottom: 5 }}>
                  Relatório DATAGRO: Perspectivas Q2 2026
                </Text>
                <Link src="https://portal.datagro.com/pt">
                  <View style={{ backgroundColor: C.green, borderRadius: 20, paddingVertical: 5, alignItems: "center" }}>
                    <Text style={{ color: C.gold, fontSize: 7, fontFamily: "Helvetica-Bold" }}>Acessar Relatório →</Text>
                  </View>
                </Link>
              </View>
            </View>
          </View>

          {/* CTA Banner */}
          <View style={s.ctaBanner}>
            <View style={s.ctaLeft}>
              <Text style={s.ctaTag}>Central de Atendimento RE/MAX AGRO</Text>
              <Text style={s.ctaTitle}>Transforme informação em oportunidade no campo</Text>
              <Text style={s.ctaSub}>+55 (11) 91505-1212  ·  contatoagro@remax.com.br  ·  agro.remax.com.br</Text>
            </View>
            <Link src="https://agro.remax.com.br">
              <View style={s.ctaBtn}>
                <Text style={s.ctaBtnText}>Fale com Especialista →</Text>
              </View>
            </Link>
          </View>
        </View>

        <PageNum />
      </Page>

      {/* ════════════════════════ PÁGINA 4 — RODAPÉ LEGAL ═════════════════ */}
      <Page size="A4" style={s.page}>
        <View style={s.footerPage}>

          {/* Header mini */}
          <View style={[s.coverHeader, { paddingVertical: 12 }]}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Image src="/images/logo-white.png" style={[s.coverLogo, { width: 110, height: 36 }]} />
              <Text style={s.coverEditionNum}>Edição Nº {data.editionNumber} · {data.lastUpdated}</Text>
            </View>
          </View>
          <View style={s.goldLine} />

          <View style={s.footerTop}>

            {/* Logo + redes */}
            <View style={s.footerLogoRow}>
              <Image src="/images/logo-white.png" style={s.footerLogo} />
              <View style={s.footerSocials}>
                {[
                  { label: "Instagram", url: "https://www.instagram.com/remaxcommercialdivsaoagro" },
                  { label: "LinkedIn",  url: "https://www.linkedin.com/company/remax-agro" },
                  { label: "Facebook",  url: "https://www.facebook.com/remaxagro" },
                ].map(soc => (
                  <Link key={soc.label} src={soc.url}>
                    <View style={s.footerSocialChip}>
                      <Text style={s.footerSocialText}>{soc.label}</Text>
                    </View>
                  </Link>
                ))}
              </View>
            </View>

            {/* Grid de contatos */}
            <View style={s.footerGrid}>
              <View style={s.footerCol}>
                <Text style={s.footerColTitle}>Contato</Text>
                {[
                  { label: "+55 (11) 91505-1212", url: "tel:+5511915051212" },
                  { label: "contatoagro@remax.com.br", url: "mailto:contatoagro@remax.com.br" },
                ].map(item => (
                  <View key={item.label} style={s.footerItem}>
                    <View style={s.footerDot} />
                    <Link src={item.url} style={s.footerLink}>{item.label}</Link>
                  </View>
                ))}
              </View>
              <View style={s.footerCol}>
                <Text style={s.footerColTitle}>Sites</Text>
                {[
                  { label: "agro.remax.com.br", url: "https://agro.remax.com.br" },
                  { label: "portal.datagro.com", url: "https://portal.datagro.com/pt" },
                ].map(item => (
                  <View key={item.label} style={s.footerItem}>
                    <View style={s.footerDot} />
                    <Link src={item.url} style={s.footerLink}>{item.label}</Link>
                  </View>
                ))}
              </View>
              <View style={s.footerCol}>
                <Text style={s.footerColTitle}>Edições Anteriores</Text>
                <View style={s.footerItem}>
                  <View style={s.footerDot} />
                  <Link src="https://agro.remax.com.br/newsletter" style={s.footerLink}>Ver todas as edições</Link>
                </View>
              </View>
            </View>

          </View>

          <View style={s.footerDivider} />

          {/* LGPD Legal */}
          <View style={s.legalBox}>
            <Text style={s.legalTitle}>🔒 Privacidade & LGPD</Text>
            <Text style={s.legalText}>
              Esta newsletter foi enviada porque você se inscreveu voluntariamente na lista da RE/MAX AGRO powered by DATAGRO.
              Seus dados pessoais são tratados com total confidencialidade, conforme a <Text style={{ fontFamily: "Helvetica-Bold", color: C.gold }}>LGPD — Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</Text>.
              {"\n"}Não compartilhamos suas informações com terceiros sem seu consentimento explícito.
              Você pode revogar seu consentimento e solicitar a exclusão dos seus dados a qualquer momento clicando em "Descadastrar" abaixo ou enviando e-mail para contatoagro@remax.com.br.
            </Text>
          </View>

          {/* Links opt-out */}
          <View style={s.optOutRow}>
            {[
              { label: "🌐 Ver Newsletter Online", url: "https://agro.remax.com.br/newsletter" },
              { label: "🚫 Descadastrar (Opt-out)", url: "mailto:contatoagro@remax.com.br?subject=Descadastro%20Newsletter%20RE/MAX%20AGRO" },
              { label: "📄 Política de Privacidade", url: "https://agro.remax.com.br/privacidade" },
              { label: "📋 Termos de Uso", url: "https://agro.remax.com.br/termos" },
              { label: "✉ Fale Conosco", url: "mailto:contatoagro@remax.com.br" },
            ].map((l, i, arr) => (
              <View key={l.label} style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Link src={l.url} style={s.optOutLink}>{l.label}</Link>
                {i < arr.length - 1 && <Text style={s.optOutSep}>·</Text>}
              </View>
            ))}
          </View>

          <View style={s.footerDivider} />
          <Text style={s.footerCopy}>
            © 2026 RE/MAX AGRO · RE/MAX Commercial Divisão Agro · powered by DATAGRO · Todos os direitos reservados.
            {"\n"}Esta comunicação é de caráter informativo e não constitui recomendação de investimento. CRECI válido em todo o território nacional.
          </Text>

        </View>

        <PageNum />
      </Page>

    </Document>
  );
}
