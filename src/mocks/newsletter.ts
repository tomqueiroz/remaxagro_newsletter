import { IMAGES } from "@/assets/images";

// ── Tipagem ────────────────────────────────────────────────────────────────────

export interface NewsItem {
  id: number;
  date: string;
  dateLabel: string;
  icon: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  image: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

export const getMainNews = (): NewsItem[] => allNews.slice(0, 6);
export const getSecondaryNews = (): NewsItem[] => allNews.slice(6);

// ── Todas as notícias — sem notícias antigas ────────────────────────────────────
// As notícias da semana são gerenciadas em src/mocks/weekNews.ts

export const allNews: NewsItem[] = [];

export const mainNews = allNews.slice(0, 6);
export const secondaryNews = allNews.slice(6);

// ── Cotações ───────────────────────────────────────────────────────────────────

export const quotations = [
  {
    id: 1,
    name: "Algodão",
    icon: "ri-cloud-line",
    value: "150,00",
    unit: "¢/lb",
    change: 0,
    description: "Cotação diária · Mercado futuro (Jul/26)",
    unitLabel: "Centavos de dólar por libra-peso (¢/lb)",
  },
  {
    id: 2,
    name: "Açúcar FOB",
    icon: "ri-leaf-line",
    value: "225,00",
    unit: "¢/lb",
    change: 0,
    description: "Cotação diária · Média nacional (4 regiões)",
    unitLabel: "Centavos de dólar por libra-peso (¢/lb)",
  },
  {
    id: 3,
    name: "Boi Gordo",
    icon: "ri-heart-pulse-line",
    value: "168,39",
    unit: "R$/@",
    change: 0,
    description: "Cotação diária · Média nacional (9 estados)",
    unitLabel: "Reais por arroba (R$/@)",
  },
  {
    id: 4,
    name: "Café Arábica",
    icon: "ri-cup-line",
    value: "47,00",
    unit: "¢/lb",
    change: 0,
    description: "Cotação diária · Mercado futuro (Jul/26)",
    unitLabel: "Centavos de dólar por libra-peso (¢/lb)",
  },
  {
    id: 5,
    name: "Café Robusta",
    icon: "ri-cup-fill",
    value: "49,00",
    unit: "US$/ton",
    change: 0,
    description: "Cotação diária · Mercado futuro (Jul/26)",
    unitLabel: "Dólares por tonelada (US$/ton)",
  },
  {
    id: 6,
    name: "Milho",
    icon: "ri-plant-line",
    value: "44,31",
    unit: "R$/sc",
    change: 0,
    description: "Cotação diária · Média nacional (39 municípios)",
    unitLabel: "Reais por saca de 60kg (R$/sc)",
  },
  {
    id: 7,
    name: "Soja",
    icon: "ri-seedling-line",
    value: "54,11",
    unit: "R$/sc",
    change: 0,
    description: "Cotação diária · Média nacional (36 municípios)",
    unitLabel: "Reais por saca de 60kg (R$/sc)",
  },
  {
    id: 8,
    name: "Trigo",
    icon: "ri-sun-line",
    value: "65,50",
    unit: "R$/ton",
    change: 0,
    description: "Cotação diária · Média nacional (14 municípios)",
    unitLabel: "Reais por tonelada (R$/ton)",
  },
];

// ── Insights ───────────────────────────────────────────────────────────────────

export const insights = [
  {
    id: 1,
    icon: "ri-calendar-event-line",
    title: "Semana de Decisão do COPOM — Impacto no Crédito Rural",
    description:
      "Na próxima quarta-feira, o Banco Central decide sobre a Selic. Analistas da DATAGRO projetam manutenção da taxa, o que pode estabilizar as condições de financiamento para o Plano Safra 2025/26.",
    date: "Previsto: Jun 2026",
    urgency: "alta",
  },
  {
    id: 2,
    icon: "ri-global-line",
    title: "Relatório USDA de Oferta e Demanda Global — Soja e Milho em Foco",
    description:
      "O USDA divulga seu relatório mensal de oferta e demanda. A expectativa é de revisão para cima nas projeções de produção brasileira, o que pode pressionar preços no curto prazo.",
    date: "Previsto: Jun 2026",
    urgency: "media",
  },
  {
    id: 3,
    icon: "ri-bar-chart-line",
    title: "Janela de Comercialização de Soja: Momento Estratégico para Fixação de Preços",
    description:
      "Com o real em desvalorização frente ao dólar e a soja em Chicago em patamar elevado, especialistas da RE/MAX AGRO recomendam atenção especial à janela de comercialização das próximas semanas.",
    date: "Próximas 2 semanas",
    urgency: "alta",
  },
  {
    id: 4,
    icon: "ri-map-pin-line",
    title: "Agrishow 2026 — Maior Feira de Tecnologia Agrícola das Américas",
    description:
      "A Agrishow acontece em Ribeirão Preto. A RE/MAX AGRO estará presente com estande exclusivo. Confirme sua presença e agende uma reunião com nossos especialistas.",
    date: "Mai–Jun 2026",
    urgency: "evento",
  },
];

// ── Corretores ─────────────────────────────────────────────────────────────────

export const brokers = [
  {
    id: 1,
    name: "Carlos Mendonça",
    role: "Especialista em Grandes Propriedades",
    region: "Mato Grosso & Pará",
    whatsapp: "+5565999990001",
  },
  {
    id: 2,
    name: "Ana Paula Ferreira",
    role: "Consultora de Investimentos Rurais",
    region: "Goiás & Tocantins",
    whatsapp: "+5562999990002",
  },
  {
    id: 3,
    name: "Roberto Alves",
    role: "Especialista em Agronegócio",
    region: "São Paulo & Paraná",
    whatsapp: "+5511999990003",
  },
  {
    id: 4,
    name: "Mariana Costa",
    role: "Analista de Mercado de Terras",
    region: "Bahia & Piauí",
    whatsapp: "+5571999990004",
  },
];
