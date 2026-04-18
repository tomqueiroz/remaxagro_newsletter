/**
 * NewsletterPDF v3
 * ─────────────────────────────────────────────────────────────────────────────
 * PDF single-scroll, estilo magazine/e-mail, layout longo em uma "página".
 *
 * Estrutura (de cima para baixo):
 *   1. Header       — navy bg, logo branca, título, edição, data
 *   2. Hero         — imagem full-width, overlay escuro, CTA
 *   3. Ticker       — faixa vermelha com cotações em linha
 *   4. Editorial    — carta do CEO + box de stats
 *   5. Cotações     — grid 4 colunas
 *   6. Top Notícias — coluna principal + sidebar blog navy
 *   7. Novidades    — 3 cards horizontais
 *   8. Eventos      — insights + destaque AGRISHOW
 *   9. Propriedades — 3 cards de imóveis rurais
 *  10. Corretores   — selo + grid de corretores + link
 *  11. CTA final    — faixa dourada
 *  12. Footer LGPD  — navy bg, links legais
 */

import {
  Document,
  Page,
  View,
  Text,
  Image,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { NewsletterData } from "@/hooks/useNewsletterData";

// Imagens: passadas como props para suportar URLs absolutas em runtime (necessário para @react-pdf/renderer no browser)

// ── Paleta ────────────────────────────────────────────────────────────────────
const C = {
  navy:      "#0D1F35",
  navyDark:  "#060F1A",
  navyMid:   "#1a2e4a",
  navyLight: "#1E3A5F",
  green:     "#0F2A1A",
  gold:      "#C9A84C",
  goldLight: "#F0D890",
  red:       "#CC0000",
  white:     "#FFFFFF",
  offWhite:  "#FBF6EC",
  bgLight:   "#F4F1EB",
  gray:      "#5A5A5A",
  grayLight: "#9A9A9A",
  success:   "#059669",
  info:      "#0284C7",
  warning:   "#D97706",
  text:      "#1E1E1E",
  border:    "#E4DDD0",
};

// ── Fontes ────────────────────────────────────────────────────────────────────
// Usando Helvetica (built-in) para compatibilidade máxima com react-pdf
Font.registerHyphenationCallback((word) => [word]);

// ── Estilos ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  // Layout
  page: {
    backgroundColor: "#ECEAE4",
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: "Helvetica",
  },
  outer: {
    backgroundColor: "#ECEAE4",
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  inner: {
    backgroundColor: C.white,
    width: "100%",
    borderRadius: 10,
  },

  // ── Header ──
  headerTopBar: {
    backgroundColor: C.gold,
    height: 3,
  },
  headerBg: {
    backgroundColor: C.navy,
    paddingHorizontal: 28,
    paddingVertical: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLogoImg: {
    width: 180,
    height: 59,
    objectFit: "contain",
    objectPositionX: "left",
  },
  headerRight: {
    alignItems: "flex-end",
  },
  headerLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  headerEdition: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  headerDate: {
    fontSize: 9,
    color: "rgba(255,255,255,0.55)",
  },
  headerNavBar: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 28,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
  },
  headerNavLink: {
    fontSize: 9,
    color: "rgba(255,255,255,0.65)",
    marginRight: 14,
  },
  headerNavLinkGold: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
  },

  // ── Hero ──
  heroBg: {
    backgroundColor: C.navy,
    minHeight: 240,
    position: "relative",
  },
  heroImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.35,
  },
  heroOverlay: {
    paddingHorizontal: 32,
    paddingVertical: 36,
  },
  heroEyebrow: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    lineHeight: 1.3,
    marginBottom: 10,
    maxWidth: 360,
  },
  heroSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.78)",
    lineHeight: 1.6,
    marginBottom: 20,
    maxWidth: 320,
  },
  heroCta: {
    backgroundColor: C.gold,
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 10,
    alignSelf: "flex-start",
  },
  heroCtaText: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    letterSpacing: 0.3,
  },

  // ── Ticker ──
  tickerBg: {
    backgroundColor: C.red,
    paddingHorizontal: 28,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  tickerBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 10,
  },
  tickerBadgeText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    letterSpacing: 0.5,
  },
  tickerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  tickerName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginRight: 3,
  },
  tickerUp: { fontSize: 9, color: "#6EE7B7" },
  tickerDown: { fontSize: 9, color: "#FCA5A5" },
  tickerDot: {
    fontSize: 9,
    color: "rgba(255,255,255,0.25)",
    marginHorizontal: 4,
  },

  // ── Section divider ──
  goldBar: { backgroundColor: C.gold, height: 3 },
  navyBar: { backgroundColor: C.navy, height: 3 },
  hr: { borderTopWidth: 1, borderTopColor: C.border, marginVertical: 10 },

  // ── Section pill ──
  pill: {
    backgroundColor: C.gold,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  pillText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    marginTop: 6,
    marginBottom: 14,
    lineHeight: 1.3,
  },
  sectionTitleWhite: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginTop: 6,
    marginBottom: 4,
    lineHeight: 1.3,
  },

  // ── Editorial ──
  editorialBg: {
    backgroundColor: C.green,
    paddingHorizontal: 28,
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  editorialLeft: { flex: 1, marginRight: 14 },
  editorialEyebrow: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  editorialTitle: {
    fontSize: 17,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 10,
    lineHeight: 1.35,
  },
  editorialBody: {
    fontSize: 11,
    color: "rgba(255,255,255,0.78)",
    lineHeight: 1.7,
    marginBottom: 8,
  },
  editorialCeo: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
  },
  editorialStatsBox: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 8,
    borderLeftWidth: 2,
    borderLeftColor: C.gold,
    padding: 12,
    width: 140,
  },
  statLabel: { fontSize: 8, color: "rgba(255,255,255,0.45)", marginBottom: 2 },
  statValue: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    marginBottom: 2,
  },
  statSub: { fontSize: 8, color: "rgba(255,255,255,0.5)", marginBottom: 10 },
  statHr: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    marginBottom: 10,
  },

  // ── Cotações ──
  quotesBg: {
    backgroundColor: C.offWhite,
    paddingHorizontal: 28,
    paddingVertical: 22,
  },
  quotesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  quoteCard: {
    flex: 1,
    minWidth: 120,
    backgroundColor: C.white,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderBottomColor: C.gold,
    padding: 12,
    alignItems: "center",
  },
  quoteName: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.gray,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  quoteValue: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    marginBottom: 2,
  },
  quoteUnit: { fontSize: 8, color: C.grayLight, marginBottom: 4 },
  quoteUp: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#059669" },
  quoteDown: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#DC2626" },
  quoteRegion: { fontSize: 8, color: C.grayLight },
  quotesMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 8,
  },
  quoteMetaText: { fontSize: 9, color: C.grayLight },

  // ── Notícias ──
  newsBg: { backgroundColor: "#F4F1EB", paddingHorizontal: 28, paddingVertical: 22 },
  newsRow: { flexDirection: "row", alignItems: "flex-start" },
  newsMain: { flex: 1, marginRight: 12 },
  newsSidebar: { width: 168, flexShrink: 0 },
  newsCard: {
    backgroundColor: C.white,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: C.gold,
    padding: 14,
    marginBottom: 10,
  },
  newsCategory: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  newsTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    lineHeight: 1.4,
    marginBottom: 7,
  },
  newsSummary: { fontSize: 11, color: C.gray, lineHeight: 1.65, marginBottom: 10 },
  newsMeta: { flexDirection: "row", alignItems: "center" },
  newsDate: { fontSize: 9, color: C.grayLight, marginRight: 10 },
  newsLink: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.gold },

  // Sidebar
  sidebarBg: {
    backgroundColor: C.navyMid,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  sidebarHeader: {
    backgroundColor: C.gold,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sidebarHeaderText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  sidebarItem: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.07)",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  sidebarDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.gold,
    marginTop: 3,
    marginRight: 7,
    flexShrink: 0,
  },
  sidebarItemContent: { flex: 1 },
  sidebarCat: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 2,
  },
  sidebarTitle: { fontSize: 10, color: C.white, lineHeight: 1.45, marginBottom: 2 },
  sidebarDate: { fontSize: 9, color: "rgba(255,255,255,0.38)" },
  sidebarCta: {
    margin: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: "center",
  },
  sidebarCtaText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
  },
  whatsappBox: {
    backgroundColor: C.red,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  whatsappTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 2,
    textAlign: "center",
  },
  whatsappSub: {
    fontSize: 9,
    color: "rgba(255,255,255,0.72)",
    marginBottom: 10,
    textAlign: "center",
  },
  whatsappBtn: {
    backgroundColor: C.white,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 7,
    marginBottom: 6,
  },
  whatsappBtnText: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.red,
  },
  whatsappPhone: { fontSize: 9, color: C.gold },

  // ── Novidades 3 cards ──
  novidadesBg: { backgroundColor: C.white, paddingHorizontal: 28, paddingVertical: 22 },
  novidadesGrid: { flexDirection: "row", gap: 8 },
  novidadeCard: {
    flex: 1,
    backgroundColor: C.bgLight,
    borderRadius: 8,
    overflow: "hidden",
    borderTopWidth: 3,
  },
  novidadeCardBody: { padding: 12 },
  novidadeEmoji: { fontSize: 18, marginBottom: 5 },
  novidadeCat: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 4,
  },
  novidadeTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    lineHeight: 1.4,
    marginBottom: 5,
  },
  novidadeBody: { fontSize: 9, color: C.gray, lineHeight: 1.55, marginBottom: 4 },
  novidadeDate: { fontSize: 9, color: C.grayLight },

  // ── Eventos ──
  eventosBg: { backgroundColor: C.offWhite, paddingHorizontal: 28, paddingVertical: 22 },
  insightCard: {
    backgroundColor: "#FBF6EC",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: C.navy,
    padding: 12,
    marginBottom: 8,
  },
  insightBadgeRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  insightBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  insightBadgeText: { fontSize: 8, fontFamily: "Helvetica-Bold" },
  insightDate: { fontSize: 8, color: C.grayLight },
  insightTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  insightDesc: { fontSize: 10, color: C.gray, lineHeight: 1.6 },
  agrishowBox: {
    backgroundColor: C.navy,
    borderRadius: 8,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  agrishowLeft: { flex: 1 },
  agrishowEye: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  agrishowTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 2,
  },
  agrishowSub: { fontSize: 10, color: "rgba(255,255,255,0.55)" },
  agrishowCta: {
    backgroundColor: C.gold,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  agrishowCtaText: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
  },

  // ── Propriedades ──
  propsBg: { backgroundColor: C.bgLight, paddingHorizontal: 28, paddingVertical: 22 },
  propsRow: { flexDirection: "row", gap: 8 },
  propCardMain: {
    flex: 6,
    backgroundColor: C.white,
    borderRadius: 8,
    overflow: "hidden",
  },
  propCardMainImage: {
    backgroundColor: C.green,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  propCardMainImageText: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "rgba(255,255,255,0.5)",
  },
  propCardMainBody: { padding: 14 },
  propBadge: {
    alignSelf: "flex-start",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 3,
    marginBottom: 8,
  },
  propBadgeText: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.white },
  propTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    marginBottom: 3,
    lineHeight: 1.35,
  },
  propSub: { fontSize: 10, color: C.grayLight, marginBottom: 6 },
  propDesc: { fontSize: 11, color: C.gray, lineHeight: 1.55, marginBottom: 12 },
  propCta: {
    backgroundColor: C.gold,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  propCtaText: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.navy },

  propSideStack: { flex: 4, gap: 8 },
  propCardSmall: {
    flex: 1,
    backgroundColor: C.white,
    borderRadius: 8,
    padding: 12,
  },
  propSmallBadge: {
    alignSelf: "flex-start",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 6,
  },
  propSmallTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    marginBottom: 2,
    lineHeight: 1.35,
  },
  propSmallSub: { fontSize: 9, color: C.grayLight, marginBottom: 4 },
  propSmallDesc: { fontSize: 10, color: C.gray, lineHeight: 1.5, marginBottom: 8 },
  propSmallLink: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
  },
  propsVerTodas: { marginTop: 10, alignItems: "center" },
  propsVerTodasLink: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    textDecoration: "underline",
  },

  // ── Corretores ──
  brokersBg: {
    backgroundColor: C.navyMid,
    paddingHorizontal: 28,
    paddingVertical: 22,
  },
  brokersHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  brokersSeloImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    objectFit: "contain",
  },
  brokersHeaderText: { flex: 1 },
  brokersLink: {
    fontSize: 10,
    color: C.gold,
    textDecoration: "underline",
  },
  brokersGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 },
  brokerCard: {
    flex: 1,
    minWidth: 230,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: C.gold,
    padding: 12,
  },
  brokerName: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 2,
  },
  brokerRole: { fontSize: 10, color: C.gold, marginBottom: 2 },
  brokerRegion: { fontSize: 9, color: "rgba(255,255,255,0.4)", marginBottom: 10 },
  brokerWaBtn: {
    backgroundColor: C.success,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  brokerWaBtnText: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.white },
  brokersCta: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 8,
    borderTopWidth: 2,
    borderTopColor: C.gold,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  brokersCtaLeft: { flex: 1 },
  brokersCtaTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 2,
  },
  brokersCtaSub: { fontSize: 9, color: "rgba(255,255,255,0.45)" },
  brokersCtaBtn: {
    backgroundColor: C.gold,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  brokersCtaBtnText: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.navy },

  // ── CTA final ──
  ctaBg: {
    backgroundColor: C.gold,
    paddingHorizontal: 32,
    paddingVertical: 28,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    textAlign: "center",
    lineHeight: 1.3,
    marginBottom: 8,
  },
  ctaSub: {
    fontSize: 12,
    color: "rgba(13,31,53,0.7)",
    textAlign: "center",
    marginBottom: 18,
  },
  ctaBtns: { flexDirection: "row", gap: 10 },
  ctaBtnPrimary: {
    backgroundColor: C.navy,
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 11,
  },
  ctaBtnPrimaryText: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
  },
  ctaBtnOutline: {
    borderWidth: 2,
    borderColor: C.navy,
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 9,
  },
  ctaBtnOutlineText: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
  },

  // ── Footer ──
  footerBg: {
    backgroundColor: C.navy,
    paddingHorizontal: 28,
    paddingVertical: 22,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  footerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  footerLogoImg: {
    width: 150,
    height: 49,
    objectFit: "contain",
    objectPositionX: "left",
  },
  footerSocials: { flexDirection: "row", gap: 6 },
  footerSocialBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  footerSocialText: { fontSize: 9, color: C.white },
  footerCols: { flexDirection: "row", gap: 16, marginBottom: 16 },
  footerCol: { flex: 1 },
  footerColTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 7,
  },
  footerColLink: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 4,
    textDecoration: "underline",
  },
  footerHr: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
    marginBottom: 12,
  },
  footerLgpdTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    marginBottom: 5,
  },
  footerLgpdText: {
    fontSize: 9,
    color: "rgba(255,255,255,0.48)",
    lineHeight: 1.65,
    marginBottom: 12,
  },
  footerLinksRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  footerOptLink: {
    fontSize: 9,
    color: "rgba(255,255,255,0.6)",
    textDecoration: "underline",
  },
  footerDot: { fontSize: 9, color: "rgba(255,255,255,0.2)" },
  footerCopy: {
    fontSize: 8,
    color: "rgba(255,255,255,0.25)",
    lineHeight: 1.6,
  },
});

// ── Componentes menores ────────────────────────────────────────────────────────

function GoldBar() {
  return <View style={S.goldBar} />;
}

function SectionPill({ children }: { children: string }) {
  return (
    <View style={S.pill}>
      <Text style={S.pillText}>{children}</Text>
    </View>
  );
}

// ── NewsletterPDF (componente principal) ─────────────────────────────────────

export interface PDFImageUrls {
  logoWhite: string;
  hero: string;
  selo: string;
}

interface Props {
  data: NewsletterData;
  images: PDFImageUrls;
}

export function NewsletterPDF({ data, images }: Props) {
  const {
    editionNumber,
    editionDate,
    lastUpdated,
    quotations,
    mainNews,
    secondaryNews,
    insights,
    brokers,
  } = data;

  const tickerItems = quotations.slice(0, 5);

  return (
    <Document
      title={`RE/MAX AGRO · Newsletter Semanal · Edição ${editionNumber}`}
      author="RE/MAX AGRO powered by DATAGRO"
      subject="Newsletter Semanal Exclusiva do Agronegócio Brasileiro"
      creator="RE/MAX AGRO"
      producer="RE/MAX AGRO Digital"
      language="pt-BR"
    >
      <Page
        size="A4"
        style={S.page}
        wrap={true}
      >
        <View style={S.outer}>
          <View style={S.inner}>

            {/* ─── 1. HEADER ─────────────────────────────────────────── */}
            <View style={S.headerTopBar} />
            <View style={S.headerBg}>
              <View style={S.headerRow}>
                <Image
                  src={images.logoWhite}
                  style={S.headerLogoImg}
                />
                <View style={S.headerRight}>
                  <Text style={S.headerLabel}>Newsletter Semanal Exclusiva</Text>
                  <Text style={S.headerEdition}>Edição Nº {editionNumber}</Text>
                  <Text style={S.headerDate}>{editionDate}</Text>
                </View>
              </View>
            </View>
            <View style={S.headerNavBar}>
              {["Cotações", "Notícias", "Novidades", "Eventos", "Propriedades"].map((item) => (
                <Text key={item} style={S.headerNavLink}>{item}</Text>
              ))}
              <Link src="https://agro.remax.com.br/newsletter" style={S.headerNavLinkGold}>Ver Online →</Link>
            </View>

            {/* ─── 2. HERO ───────────────────────────────────────────── */}
            <View style={S.heroBg}>
              <Image src={images.hero} style={S.heroImage} />
              <View style={S.heroOverlay}>
                <Text style={S.heroEyebrow}>✦ Safra 2025/26 · Inteligência Agro</Text>
                <Text style={S.heroTitle}>O Agro que Transforma Propriedades em Patrimônio</Text>
                <Text style={S.heroSubtitle}>
                  Cotações em tempo real, oportunidades exclusivas e análises DATAGRO toda segunda-feira.
                </Text>
                <Link src="https://agro.remax.com.br">
                  <View style={S.heroCta}>
                    <Text style={S.heroCtaText}>Saiba Mais →</Text>
                  </View>
                </Link>
              </View>
            </View>

            {/* ─── 3. TICKER ─────────────────────────────────────────── */}
            <View style={S.tickerBg}>
              <View style={S.tickerBadge}>
                <Text style={S.tickerBadgeText}>⚡ AGRO AO VIVO</Text>
              </View>
              <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
                {tickerItems.map((q, i) => (
                  <View key={q.id} style={{ flexDirection: "row", alignItems: "center" }}>
                    {i > 0 && <Text style={S.tickerDot}>·</Text>}
                    <Text style={S.tickerName}>{q.name}</Text>
                    <Text style={q.change >= 0 ? S.tickerUp : S.tickerDown}>
                      {" "}R$ {q.value} {q.change >= 0 ? "▲" : "▼"}{Math.abs(q.change)}%
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* ─── 4. EDITORIAL ─────────────────────────────────────── */}
            <View style={S.editorialBg}>
              <View style={S.editorialLeft}>
                <Text style={S.editorialEyebrow}>✦ Carta Editorial · Edição {editionNumber}</Text>
                <Text style={S.editorialTitle}>O Agro Estratégico na Palma da Sua Mão</Text>
                <Text style={S.editorialBody}>
                  Bem-vindo à newsletter semanal mais relevante do agronegócio brasileiro. Com curadoria exclusiva da RE/MAX AGRO powered by DATAGRO — referência em inteligência agrícola há mais de 35 anos —, você recebe toda segunda-feira o que realmente importa para o mercado de terras e commodities.
                </Text>
                <Text style={S.editorialBody}>
                  Esta semana: safra recorde de soja atinge 162 Mi de toneladas, decisão do COPOM impactando o crédito rural e janela estratégica de comercialização para produtores do Centro-Oeste. Boa leitura.
                </Text>
                <Text style={S.editorialCeo}>
                  Gabriel Pesciallo{" "}
                  <Text style={{ fontFamily: "Helvetica", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                    — CEO · RE/MAX AGRO
                  </Text>
                </Text>
              </View>
              <View style={S.editorialStatsBox}>
                <Text style={S.statLabel}>SAFRA 2025/26</Text>
                <Text style={S.statValue}>162Mi</Text>
                <Text style={S.statSub}>ton. de soja</Text>
                <View style={S.statHr} />
                <Text style={S.statLabel}>VALORIZAÇÃO TERRAS</Text>
                <Text style={S.statValue}>+18%</Text>
                <Text style={S.statSub}>Centro-Oeste · 12m</Text>
                <View style={S.statHr} />
                <Text style={S.statLabel}>ESG PREMIUM</Text>
                <Text style={S.statValue}>+25%</Text>
                <Text style={S.statSub}>valorização média</Text>
              </View>
            </View>
            <GoldBar />

            {/* ─── 5. COTAÇÕES ───────────────────────────────────────── */}
            <View style={S.quotesBg}>
              <SectionPill>📊 Painel de Cotações · DATAGRO</SectionPill>
              <Text style={S.sectionTitle}>Culturas & Commodities</Text>
              <View style={S.quotesGrid}>
                {quotations.slice(0, 4).map((q) => (
                  <View key={q.id} style={S.quoteCard}>
                    <Text style={S.quoteName}>{q.name}</Text>
                    <Text style={S.quoteValue}>R$ {q.value}</Text>
                    <Text style={S.quoteUnit}>{q.unit}</Text>
                    <Text style={q.change >= 0 ? S.quoteUp : S.quoteDown}>
                      {q.change >= 0 ? "▲" : "▼"} {Math.abs(q.change)}%
                    </Text>
                    <Text style={S.quoteRegion}>{q.region}</Text>
                  </View>
                ))}
              </View>
              <View style={S.quotesMeta}>
                <Text style={S.quoteMetaText}>Fonte: DATAGRO · {lastUpdated}</Text>
                <Link src="https://portal.datagro.com/pt" style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: C.gold, textDecoration: "underline" }}>
                  Painel completo →
                </Link>
              </View>
            </View>

            {/* ─── 6. TOP NOTÍCIAS + SIDEBAR ─────────────────────────── */}
            <View style={S.newsBg}>
              <SectionPill>📰 Top Notícias Agro da Semana</SectionPill>
              <Text style={S.sectionTitle}>Principais Movimentos do Agro</Text>
              <View style={S.newsRow}>
                {/* Coluna principal */}
                <View style={S.newsMain}>
                  {mainNews.map((n) => (
                    <View key={n.id} style={S.newsCard}>
                      <Text style={S.newsCategory}>{n.category}</Text>
                      <Text style={S.newsTitle}>{n.title}</Text>
                      {n.summary ? (
                        <Text style={S.newsSummary}>{n.summary}</Text>
                      ) : null}
                      <View style={S.newsMeta}>
                        <Text style={S.newsDate}>{n.date}{n.readTime ? ` · ${n.readTime}` : ""}</Text>
                        {n.url ? (
                          <Link src={n.url} style={S.newsLink}>Leia o artigo →</Link>
                        ) : null}
                      </View>
                    </View>
                  ))}
                </View>

                {/* Sidebar blog */}
                <View style={S.newsSidebar}>
                  <View style={S.sidebarBg}>
                    <View style={S.sidebarHeader}>
                      <Text style={S.sidebarHeaderText}>📰 Destaques do Blog</Text>
                    </View>
                    {secondaryNews.map((n) => (
                      <View key={n.id} style={S.sidebarItem}>
                        <View style={S.sidebarDot} />
                        <View style={S.sidebarItemContent}>
                          <Text style={S.sidebarCat}>{n.category}</Text>
                          {n.url ? (
                            <Link src={n.url} style={S.sidebarTitle}>{n.title}</Link>
                          ) : (
                            <Text style={S.sidebarTitle}>{n.title}</Text>
                          )}
                          <Text style={S.sidebarDate}>{n.date}</Text>
                        </View>
                      </View>
                    ))}
                    <View style={S.sidebarCta}>
                      <Link src="https://agro.remax.com.br/blog" style={S.sidebarCtaText}>
                        Ver todos os posts →
                      </Link>
                    </View>
                  </View>

                  {/* CTA WhatsApp */}
                  <View style={S.whatsappBox}>
                    <Text style={S.whatsappTitle}>Fale com um Especialista</Text>
                    <Text style={S.whatsappSub}>Atendimento em todo o Brasil</Text>
                    <Link src="https://wa.me/5511915051212">
                      <View style={S.whatsappBtn}>
                        <Text style={S.whatsappBtnText}>WhatsApp →</Text>
                      </View>
                    </Link>
                    <Text style={S.whatsappPhone}>+55 (11) 91505-1212</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* ─── 7. NOVIDADES DO AGRO ──────────────────────────────── */}
            <View style={S.novidadesBg}>
              <SectionPill>✨ Novidades do Agro</SectionPill>
              <Text style={S.sectionTitle}>Tendências & Destaques da Semana</Text>
              <View style={S.novidadesGrid}>
                {[
                  { emoji: "🌱", color: "#059669", cat: "Sustentabilidade", title: "Certificação ESG Valoriza Fazendas em até 25%", body: "Adequação ESG vira diferencial no mercado de terras.", date: "09 Abr 2026" },
                  { emoji: "🤖", color: "#0284C7", cat: "Tecnologia", title: "IA e Drones Lideram Transformação do Agro", body: "Agricultura de precisão cresce 34% no Brasil.", date: "11 Abr 2026" },
                  { emoji: "📦", color: "#D97706", cat: "Exportações", title: "China Amplia Compras: Carne Bovina +22%", body: "Demanda asiática aquecida impulsiona o agro.", date: "10 Abr 2026" },
                ].map((item, idx) => (
                  <View key={idx} style={[S.novidadeCard, { borderTopColor: item.color }]}>
                    <View style={S.novidadeCardBody}>
                      <Text style={S.novidadeEmoji}>{item.emoji}</Text>
                      <Text style={[S.novidadeCat, { color: item.color }]}>{item.cat}</Text>
                      <Text style={S.novidadeTitle}>{item.title}</Text>
                      <Text style={S.novidadeBody}>{item.body}</Text>
                      <Text style={S.novidadeDate}>{item.date}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* ─── 8. EVENTOS & AGENDA ───────────────────────────────── */}
            <View style={S.eventosBg}>
              <SectionPill>📅 Eventos & Agenda Agro</SectionPill>
              <Text style={S.sectionTitle}>O Que Vem Por Aí</Text>
              {insights.map((ins) => {
                const badgeBg = ins.urgency === "alta" ? "#FEE2E2" : ins.urgency === "evento" ? "#D1FAE5" : "#FEF3C7";
                const badgeColor = ins.urgency === "alta" ? "#B91C1C" : ins.urgency === "evento" ? "#065F46" : "#92400E";
                const label = ins.urgency === "alta" ? "⚠ Alta Prioridade" : ins.urgency === "evento" ? "📅 Evento" : "👁 Atenção";
                return (
                  <View key={ins.id} style={S.insightCard}>
                    <View style={S.insightBadgeRow}>
                      <View style={[S.insightBadge, { backgroundColor: badgeBg }]}>
                        <Text style={[S.insightBadgeText, { color: badgeColor }]}>{label}</Text>
                      </View>
                      <Text style={S.insightDate}>{ins.date}</Text>
                    </View>
                    <Text style={S.insightTitle}>{ins.title}</Text>
                    <Text style={S.insightDesc}>{ins.description}</Text>
                  </View>
                );
              })}
              <View style={S.agrishowBox}>
                <View style={S.agrishowLeft}>
                  <Text style={S.agrishowEye}>AGRISHOW 2026</Text>
                  <Text style={S.agrishowTitle}>RE/MAX AGRO Estará Presente!</Text>
                  <Text style={S.agrishowSub}>Ribeirão Preto · Maio 2026 · Estande exclusivo</Text>
                </View>
                <Link src="https://agro.remax.com.br">
                  <View style={S.agrishowCta}>
                    <Text style={S.agrishowCtaText}>Agendar Reunião →</Text>
                  </View>
                </Link>
              </View>
            </View>
            <GoldBar />

            {/* ─── 9. PROPRIEDADES RURAIS ────────────────────────────── */}
            <View style={S.propsBg}>
              <SectionPill>🏡 Oportunidades em Propriedades Rurais</SectionPill>
              <Text style={S.sectionTitle}>Grandes Propriedades em Destaque</Text>
              <View style={S.propsRow}>
                {/* Card principal */}
                <View style={S.propCardMain}>
                  <View style={S.propCardMainImage}>
                    <Text style={S.propCardMainImageText}>✦ DESTAQUE DA SEMANA</Text>
                  </View>
                  <View style={S.propCardMainBody}>
                    <View style={[S.propBadge, { backgroundColor: C.success }]}>
                      <Text style={S.propBadgeText}>DESTAQUE</Text>
                    </View>
                    <Text style={S.propTitle}>Fazenda Santa Luzia — 4.200 ha</Text>
                    <Text style={S.propSub}>Soja + Milho · Mato Grosso</Text>
                    <Text style={S.propDesc}>
                      Produtividade acima da média regional. Infraestrutura completa para soja e milho. Alto potencial de valorização com lavouras estabelecidas.
                    </Text>
                    <Link src="https://agro.remax.com.br">
                      <View style={S.propCta}>
                        <Text style={S.propCtaText}>Ver Detalhes →</Text>
                      </View>
                    </Link>
                  </View>
                </View>

                {/* Cards menores empilhados */}
                <View style={S.propSideStack}>
                  <View style={S.propCardSmall}>
                    <View style={[S.propSmallBadge, { backgroundColor: C.navy }]}>
                      <Text style={[S.propBadgeText, { color: C.gold }]}>NOVO</Text>
                    </View>
                    <Text style={S.propSmallTitle}>Fazenda Boa Esperança — 2.800 ha</Text>
                    <Text style={S.propSmallSub}>Pecuária + Soja · Goiás</Text>
                    <Text style={S.propSmallDesc}>Pivô central, escritura regularizada. Ideal para investidores.</Text>
                    <Link src="https://agro.remax.com.br" style={S.propSmallLink}>Ver Detalhes →</Link>
                  </View>
                  <View style={S.propCardSmall}>
                    <View style={[S.propSmallBadge, { backgroundColor: C.info }]}>
                      <Text style={S.propBadgeText}>EXCLUSIVO</Text>
                    </View>
                    <Text style={S.propSmallTitle}>Sítio Recanto Verde — 980 ha</Text>
                    <Text style={S.propSmallSub}>Café Especial · Minas Gerais</Text>
                    <Text style={S.propSmallDesc}>Café premiado, altitude ideal, certificação de origem.</Text>
                    <Link src="https://agro.remax.com.br" style={S.propSmallLink}>Ver Detalhes →</Link>
                  </View>
                </View>
              </View>
              <View style={S.propsVerTodas}>
                <Link src="https://agro.remax.com.br" style={S.propsVerTodasLink}>
                  Ver todas as propriedades →
                </Link>
              </View>
            </View>
            <GoldBar />

            {/* ─── 10. CORRETORES CERTIFICADOS ───────────────────────── */}
            <View style={S.brokersBg}>
              <View style={S.brokersHeaderRow}>
                <Link src="https://agro.remax.com.br/corretores-especializados/">
                  <Image src={images.selo} style={S.brokersSeloImg} />
                </Link>
                <View style={S.brokersHeaderText}>
                  <SectionPill>Corretores Certificados</SectionPill>
                  <Text style={S.sectionTitleWhite}>Especialistas RE/MAX AGRO</Text>
                  <Link src="https://agro.remax.com.br/corretores-especializados/" style={S.brokersLink}>
                    Ver todos os corretores especializados →
                  </Link>
                </View>
              </View>
              <View style={S.brokersGrid}>
                {brokers.map((b) => (
                  <View key={b.id} style={S.brokerCard}>
                    <Text style={S.brokerName}>{b.name}</Text>
                    <Text style={S.brokerRole}>{b.role}</Text>
                    <Text style={S.brokerRegion}>{b.region}</Text>
                    <Link src={`https://wa.me/${b.whatsapp.replace(/\D/g, "")}`}>
                      <View style={S.brokerWaBtn}>
                        <Text style={S.brokerWaBtnText}>WhatsApp →</Text>
                      </View>
                    </Link>
                  </View>
                ))}
              </View>
              <View style={S.brokersCta}>
                <View style={S.brokersCtaLeft}>
                  <Text style={S.brokersCtaTitle}>Conheça todos os nossos especialistas</Text>
                  <Text style={S.brokersCtaSub}>Atendimento em todo o território nacional</Text>
                </View>
                <Link src="https://agro.remax.com.br/corretores-especializados/">
                  <View style={S.brokersCtaBtn}>
                    <Text style={S.brokersCtaBtnText}>Ver Corretores →</Text>
                  </View>
                </Link>
              </View>
            </View>

            {/* ─── 11. CTA FINAL ─────────────────────────────────────── */}
            <View style={S.ctaBg}>
              <Text style={S.ctaTitle}>Transforme Informação em{"\n"}Oportunidade no Campo</Text>
              <Text style={S.ctaSub}>Fale com um especialista ou acesse o site para ver oportunidades exclusivas</Text>
              <View style={S.ctaBtns}>
                <Link src="https://wa.me/5511915051212">
                  <View style={S.ctaBtnPrimary}>
                    <Text style={S.ctaBtnPrimaryText}>WhatsApp →</Text>
                  </View>
                </Link>
                <Link src="https://agro.remax.com.br">
                  <View style={S.ctaBtnOutline}>
                    <Text style={S.ctaBtnOutlineText}>Visitar Site →</Text>
                  </View>
                </Link>
              </View>
            </View>

            {/* ─── 12. FOOTER LGPD ───────────────────────────────────── */}
            <View style={S.footerBg}>
              <View style={S.footerTopRow}>
                <Image src={images.logoWhite} style={S.footerLogoImg} />
                <View style={S.footerSocials}>
                  {[
                    { label: "Instagram", url: "https://www.instagram.com/remaxcommercialdivsaoagro" },
                    { label: "LinkedIn",  url: "https://www.linkedin.com/company/remax-agro" },
                    { label: "Facebook",  url: "https://www.facebook.com/remaxagro" },
                  ].map((s) => (
                    <Link key={s.label} src={s.url}>
                      <View style={S.footerSocialBtn}>
                        <Text style={S.footerSocialText}>{s.label}</Text>
                      </View>
                    </Link>
                  ))}
                </View>
              </View>

              <View style={S.footerCols}>
                <View style={S.footerCol}>
                  <Text style={S.footerColTitle}>Contato</Text>
                  <Link src="tel:+5511915051212" style={S.footerColLink}>+55 (11) 91505-1212</Link>
                  <Link src="mailto:contatoagro@remax.com.br" style={S.footerColLink}>contatoagro@remax.com.br</Link>
                  <Link src="https://agro.remax.com.br" style={S.footerColLink}>agro.remax.com.br</Link>
                </View>
                <View style={S.footerCol}>
                  <Text style={S.footerColTitle}>Sites</Text>
                  <Link src="https://portal.datagro.com/pt" style={S.footerColLink}>portal.datagro.com</Link>
                  <Link src="https://agro.remax.com.br/newsletter" style={S.footerColLink}>Edições anteriores</Link>
                </View>
                <View style={S.footerCol}>
                  <Text style={S.footerColTitle}>Especialistas</Text>
                  <Link src="https://agro.remax.com.br/corretores-especializados/" style={S.footerColLink}>
                    Corretores Certificados
                  </Link>
                </View>
              </View>

              <View style={S.footerHr} />

              <Text style={S.footerLgpdTitle}>🔒 Privacidade & LGPD</Text>
              <Text style={S.footerLgpdText}>
                Esta newsletter foi enviada porque você se inscreveu voluntariamente na lista da RE/MAX AGRO powered by DATAGRO. Seus dados são tratados conforme a LGPD — Lei nº 13.709/2018. Não compartilhamos suas informações sem consentimento explícito.
              </Text>

              <View style={S.footerLinksRow}>
                <Link src="https://agro.remax.com.br/newsletter" style={S.footerOptLink}>🌐 Ver Online</Link>
                <Text style={S.footerDot}>·</Text>
                <Link src="mailto:contatoagro@remax.com.br?subject=Descadastro%20Newsletter" style={S.footerOptLink}>🚫 Descadastrar</Link>
                <Text style={S.footerDot}>·</Text>
                <Link src="https://agro.remax.com.br/privacidade" style={S.footerOptLink}>📄 Privacidade</Link>
                <Text style={S.footerDot}>·</Text>
                <Link src="https://agro.remax.com.br/termos" style={S.footerOptLink}>📋 Termos</Link>
                <Text style={S.footerDot}>·</Text>
                <Link src="mailto:contatoagro@remax.com.br" style={S.footerOptLink}>✉ Fale Conosco</Link>
              </View>

              <View style={S.footerHr} />
              <Text style={S.footerCopy}>
                © 2026 RE/MAX AGRO · RE/MAX Commercial Divisão Agro · powered by DATAGRO · Todos os direitos reservados.{"\n"}
                Esta comunicação é de caráter informativo e não constitui recomendação de investimento. CRECI válido em todo o território nacional.
              </Text>
            </View>

          </View>
        </View>
      </Page>
    </Document>
  );
}
