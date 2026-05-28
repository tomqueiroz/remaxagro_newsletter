import { IMAGES } from "@/assets/images";

// ── Tipagem ────────────────────────────────────────────────────────────────────

export interface NewsItem {
  id: number;
  date: string;
  dateLabel: string; // ex: "25 Mai 2026"
  icon: string;       // remix icon class
  title: string;
  summary: string;
  source: string;     // nome da fonte
  url: string;
  image: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

// Retorna as 6 notícias mais recentes como destaques
export const getMainNews = (): NewsItem[] => allNews.slice(0, 6);

// Retorna as demais notícias para a lista secundária
export const getSecondaryNews = (): NewsItem[] => allNews.slice(6);

// ── Todas as notícias — Edição 29/Mai/2026 (ordenadas por data, mais recente primeiro) ──

export const allNews: NewsItem[] = [
  // ── 27/05 ──────────────────────────────────────────────────────────────
  {
    id: 1,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    icon: "ri-leaf-line",
    title: "Moagem de cana no Centro-Sul dobra na 2ª quinzena de abril, aponta Unica",
    summary: "Produção de etanol avança mais de 70% no acumulado da safra 2026/27, com maior destinação da cana ao biocombustível em relação ao açúcar.",
    source: "UAGro",
    url: "https://www.uagro.com.br/agricultura/moagem-de-cana-no-centro-sul-dobra-na-2a-quinzena-de-abril-aponta-unica",
    image: IMAGES.NEWS_SUGARCANE_1,
  },
  {
    id: 2,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    icon: "ri-gas-station-line",
    title: "Governo avalia renovar subvenção ao diesel na próxima semana, diz Durigan",
    summary: "Ministro da Fazenda afirmou que o benefício atual deve ser mantido em R$ 0,35 por litro, mas a decisão dependerá do comportamento do petróleo no mercado internacional.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/petroleum/13/1137825/governo-avalia-renovar-subvencao-ao-diesel-na-proxima-semana-diz-durigan",
    image: IMAGES.NEWS_OIL_2,
  },
  {
    id: 3,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    icon: "ri-scales-line",
    title: "Alckmin afirma que Brasil retomará habilitação de exportações de proteínas à UE até setembro",
    summary: "País busca comprovar ao bloco europeu a eficiência das medidas de segurança sanitárias nas cadeias produtivas de carne bovina, reforçando a posição do agro brasileiro.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/livestock/5/1137675/alckmin-afirma-que-brasil-retomara-habilitacao-de-exportacoes-de-proteinas-a-ue-ate-setembro",
    image: IMAGES.NEWS_MERCOSUL_2,
  },
  {
    id: 4,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    icon: "ri-tractor-line",
    title: "Receita da indústria de máquinas recua quase 15% em abril, aponta Abimaq",
    summary: "Setor segue pressionado pela fraqueza da agropecuária e pelos juros elevados, apesar da forte alta das exportações de equipamentos agrícolas no período.",
    source: "UAGro",
    url: "https://www.uagro.com.br/agricultura/receita-da-industria-de-maquinas-recua-quase-15-em-abril-aponta-abimaq",
    image: IMAGES.NEWS_MACHINES_2,
  },
  {
    id: 5,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    icon: "ri-bank-line",
    title: "Senado adia análise de projeto sobre renegociação das dívidas rurais",
    summary: "Parlamentares consideram insuficiente a proposta do governo e defendem solução mais ampla para o setor, capaz de aliviar o endividamento dos produtores rurais.",
    source: "UAGro",
    url: "https://www.uagro.com.br/politica-setorial/senado-adia-analise-de-projeto-sobre-renegociacao-das-dividas-rurais",
    image: IMAGES.NEWS_CREDIT_3,
  },
  {
    id: 6,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    icon: "ri-plant-line",
    title: "Ministério da Agricultura lança campanha de incentivo aos orgânicos",
    summary: "Iniciativa reforça a integração entre governo e redes de produção orgânica na implementação de políticas públicas voltadas à sustentabilidade e à alimentação saudável.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/mais-culturas/15/1137683/ministro-da-agricultura-lanca-campanha-de-organicos",
    image: IMAGES.NEWS_SEEDS_1,
  },
  // ── 26/05 ──────────────────────────────────────────────────────────────
  {
    id: 7,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    icon: "ri-plant-line",
    title: "Colheita do milho safrinha começa de forma incipiente no Paraná, aponta o Deral",
    summary: "Chuvas recentes ajudaram na manutenção da umidade dos solos e favoreceram o desenvolvimento das lavouras, antecipando o início da colheita no estado.",
    source: "UAGro",
    url: "https://www.uagro.com.br/agricultura/colheita-do-milho-safrinha-comeca-de-forma-incipiente-no-parana-aponta-o-deral",
    image: IMAGES.NEWS_CORN_1,
  },
  {
    id: 8,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    icon: "ri-cup-line",
    title: "Preço pago ao produtor de leite no RS deve fechar maio com queda mensal de 3,38%",
    summary: "Conseleite projeta que o mês encerrará com o valor do litro em R$ 2,4478, refletindo pressão de oferta e ajustes sazonais no setor lácteo gaúcho.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/livestock/5/1137037/preco-pago-ao-produtor-de-leite-no-rs-deve-fechar-maio-com-queda-mensal-de-338",
    image: IMAGES.NEWS_CATTLE_2,
  },
  {
    id: 9,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    icon: "ri-shield-check-line",
    title: "Ministério da Agricultura lança sistema unificado para registro de defensivos agrícolas",
    summary: "O Sispa marca avanço na modernização dos processos regulatórios relacionados a insumos, com objetivo de desburocratizar o setor e agilizar aprovações.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/agribusiness/12/1136962/ministerio-da-agricultura-lanca-sistema-unificado-para-registro-de-defensivos-agricolas",
    image: IMAGES.NEWS_SEEDS_3,
  },
  {
    id: 10,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    icon: "ri-bank-line",
    title: "Municípios respondem por praticamente metade do financiamento de assistência técnica rural",
    summary: "De 2016 a 2025, investimento municipal atingiu R$ 26 bilhões, mostra estudo da Confederação Nacional de Municípios (CNM), reforçando o papel local no agro.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/agribusiness/12/1136714/municipios-respondem-por-praticamente-metade-do-financiamento-dedicado-a-assistencia-tecnica-e-extensao-rural",
    image: IMAGES.NEWS_CREDIT_2,
  },
  {
    id: 11,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    icon: "ri-seedling-line",
    title: "Ministério da Agricultura institui Plano Inova Cacau 2030",
    summary: "Iniciativa tem como objetivo promover o desenvolvimento sustentável do segmento cacaueiro, fortalecendo a cadeia produtiva e ampliando a competitividade brasileira no mercado internacional.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/mais-culturas/15/1136690/ministerio-da-agricultura-institui-plano-inova-cacau-2030",
    image: IMAGES.NEWS_SEEDS_2,
  },
  {
    id: 12,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    icon: "ri-wifi-line",
    title: "CNH e TIM investem R$ 77 milhões em nova iniciativa de conectividade rural em MG",
    summary: "Com previsão de implantação em até 18 meses, 97 torres devem conectar cerca de 1,5 milhão de hectares em Minas Gerais, beneficiando produtores rurais de toda a região.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/agribusiness/12/1136571/cnh-e-tim-investem-cerca-de-rdollar-77-milhoes-em-nova-iniciativa-de-conectividade-rural",
    image: IMAGES.AGRO_TECH_5,
  },
  // ── 25/05 ──────────────────────────────────────────────────────────────
  {
    id: 13,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-gas-station-line",
    title: "CNPE deve discutir aumento da mistura de etanol na gasolina em junho",
    summary: "Governo avalia elevar o percentual de etanol anidro de 30% para 32%, medida que pode impactar diretamente os produtores de cana-de-açúcar e o mercado de biocombustíveis.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/sugar-etanol/2/1135738/cnpe-deve-discutir-aumento-da-mistura-de-etanol-na-gasolina-em-junho",
    image: IMAGES.NEWS_BIOFUEL_2,
  },
  {
    id: 14,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-plant-line",
    title: "Colheita da segunda safra de milho tem início no Mato Grosso",
    summary: "O Imea projeta uma produção de 52,65 milhões de toneladas para a safrinha no estado, consolidando Mato Grosso como maior produtor nacional de milho.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/corn/9/1135374/colheita-da-segunda-safra-de-milho-tem-inicio-no-mato-grosso",
    image: IMAGES.NEWS_CORN_2,
  },
  {
    id: 15,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-global-line",
    title: "Abiec: embargo chinês a três frigoríficos tem caráter preventivo e temporário",
    summary: "Segundo a associação, o Brasil possui um dos sistemas de controle sanitário mais rigorosos do mundo, com monitoramento permanente da cadeia produtiva e fiscalização do SIF.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/livestock/5/1135450/abiec-diz-que-embargo-chines-a-tres-plantas-de-frigorificos-tem-carater-preventivo-e-temporario",
    image: IMAGES.NEWS_CATTLE_1,
  },
  {
    id: 16,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-bar-chart-line",
    title: "Agroindústria cresce 0,4% no primeiro trimestre de 2026, aponta FGVAgro",
    summary: "Desempenho positivo do segmento foi fundamental para que a Indústria de Transformação não operasse em campo negativo no mesmo período, segundo análise da FGVAgro.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/agribusiness/12/1135605/agroindustria-cresce-04-no-primeiro-trimestre",
    image: IMAGES.NEWS_GDP_2,
  },
  {
    id: 17,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-landscape-line",
    title: "Uso de calcário como corretivo do solo cresce apenas 2,8% nos últimos dois anos",
    summary: "Brasil mantém níveis de aplicação de corretivos em patamares preocupantes de defasagem, alerta Abracal. A acidez dos solos representa um dos maiores desafios para a produtividade agrícola.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/agribusiness/12/1135473/uso-de-calcario-como-corretivo-do-solo-cresce-apenas-28-nos-ultimos-dois-anos",
    image: IMAGES.AGRO_TECH_2,
  },
  {
    id: 18,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-scales-line",
    title: "Governo negocia revisão da cota de exportação de carne bovina brasileira para a China",
    summary: "Atualmente, o gigante asiático mantém uma cota anual de 1,1 milhão de toneladas para importação da proteína brasileira. A revisão pode abrir espaço para crescimento das exportações.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/livestock/5/1135879/governo-negocia-revisao-da-cota-de-exportacao-de-carne-bovina-brasileira-para-a-china",
    image: IMAGES.NEWS_CATTLE_3,
  },
  {
    id: 19,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-cup-fill",
    title: "Mais da metade dos produtores brasileiros de café são pequenos negócios, aponta pesquisa",
    summary: "Levantamento do Sebrae revela que estados fora do Sudeste concentram o maior número de pequenos produtores, evidenciando o potencial de desenvolvimento do café em novas regiões.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/coffee/3/1135846/mais-da-metade-dos-produtores-brasileiros-de-cafe-sao-pequenos-negocios-aponta-pesquisa",
    image: IMAGES.NEWS_BIOFUEL_4,
  },
  {
    id: 20,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-recycle-line",
    title: "Governo federal lança quinta rodada do leilão Eco Invest",
    summary: "Expectativa é arrecadar R$ 50 bilhões para fomentar as indústrias de biofertilizantes e biocombustíveis, ampliando a sustentabilidade e competitividade do agronegócio brasileiro.",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/sugar-etanol/2/1135771/governo-federal-lanca-a-quinta-rodada-do-leilao-eco-invest",
    image: IMAGES.NEWS_BIOFUEL_1,
  },
];

// ── Exportações legadas (outros componentes) ───────────────────────────────────

export const quotations = [
  {
    id: 1,
    name: "Algodão",
    icon: "ri-cloud-line",
    value: "1.000",
    unit: "¢/lb",
    change: 0,
    description: "Cotação diária · Mercado futuro (Jul/26)",
    unitLabel: "Centavos de dólar por libra-peso (¢/lb)",
  },
  {
    id: 2,
    name: "Açúcar FOB",
    icon: "ri-leaf-line",
    value: "1.000",
    unit: "¢/lb",
    change: 0,
    description: "Cotação diária · Média nacional (4 regiões)",
    unitLabel: "Centavos de dólar por libra-peso (¢/lb)",
  },
  {
    id: 3,
    name: "Boi Gordo",
    icon: "ri-heart-pulse-line",
    value: "1.000",
    unit: "R$/@",
    change: 0,
    description: "Cotação diária · Média nacional (9 estados)",
    unitLabel: "Reais por arroba (R$/@)",
  },
  {
    id: 4,
    name: "Café Arábica",
    icon: "ri-cup-line",
    value: "1.000",
    unit: "¢/lb",
    change: 0,
    description: "Cotação diária · Mercado futuro (Jul/26)",
    unitLabel: "Centavos de dólar por libra-peso (¢/lb)",
  },
  {
    id: 5,
    name: "Café Robusta",
    icon: "ri-cup-fill",
    value: "1.000",
    unit: "US$/ton",
    change: 0,
    description: "Cotação diária · Mercado futuro (Jul/26)",
    unitLabel: "Dólares por tonelada (US$/ton)",
  },
  {
    id: 6,
    name: "Milho",
    icon: "ri-plant-line",
    value: "1.000",
    unit: "R$/sc",
    change: 0,
    description: "Cotação diária · Média nacional (39 municípios)",
    unitLabel: "Reais por saca de 60kg (R$/sc)",
  },
  {
    id: 7,
    name: "Soja",
    icon: "ri-seedling-line",
    value: "1.000",
    unit: "R$/sc",
    change: 0,
    description: "Cotação diária · Média nacional (36 municípios)",
    unitLabel: "Reais por saca de 60kg (R$/sc)",
  },
  {
    id: 8,
    name: "Trigo",
    icon: "ri-sun-line",
    value: "1.000",
    unit: "R$/ton",
    change: 0,
    description: "Cotação diária · Média nacional (14 municípios)",
    unitLabel: "Reais por tonelada (R$/ton)",
  },
];

export const mainNews = allNews.slice(0, 6);
export const secondaryNews = allNews.slice(6);

export const insights = [
  {
    id: 1,
    icon: "ri-calendar-event-line",
    title: "Decisão do COPOM — Impacto no Crédito Rural",
    description: "Analistas da DATAGRO monitoram de perto as decisões do Banco Central. A Selic afeta diretamente as condições de financiamento para o Plano Safra 2026/27 e os custos de capital dos produtores rurais.",
    date: "Jun 2026",
    urgency: "alta",
  },
  {
    id: 2,
    icon: "ri-global-line",
    title: "Relatório USDA — Soja e Milho em Foco",
    description: "O USDA divulga mensalmente seu relatório de oferta e demanda global. Acompanhe as revisões de produção brasileira, que impactam diretamente os preços das principais culturas no mercado internacional.",
    date: "Jun 2026",
    urgency: "media",
  },
  {
    id: 3,
    icon: "ri-bar-chart-line",
    title: "Janela de Comercialização de Soja: Momento Estratégico",
    description: "Com o câmbio favorável e a soja em Chicago em patamar elevado, especialistas da RE/MAX AGRO recomendam atenção especial às janelas de comercialização das próximas semanas.",
    date: "Jun 2026",
    urgency: "alta",
  },
  {
    id: 4,
    icon: "ri-map-pin-line",
    title: "Mercado de Terras: Perspectivas para o 2º Semestre",
    description: "A valorização das terras agrícolas no Centro-Oeste segue acima da inflação. Corretores especializados da RE/MAX AGRO identificam oportunidades em áreas com potencial de expansão na fronteira agrícola.",
    date: "2º Sem 2026",
    urgency: "evento",
  },
];

export const sidebarHighlights = [
  {
    id: 1,
    label: "PROPRIEDADE EM DESTAQUE",
    title: "Fazenda Santa Luzia — 4.200 ha",
    subtitle: "Soja + Milho · Mato Grosso",
    detail: "Produtividade acima da média regional. Infraestrutura completa. Oportunidade de investimento.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&h=280&q=80",
    badge: "NOVO",
    badgeColor: "bg-emerald-500",
  },
];

export const brokers = [
  {
    id: 1,
    name: "Carlos Mendonça",
    role: "Especialista em Grandes Propriedades",
    region: "Mato Grosso & Pará",
    avatar: "https://images.unsplash.com/photo-1607544836359-7603ef1d3c4c?auto=format&fit=crop&w=120&h=120&q=80",
    whatsapp: "+5565999990001",
  },
  {
    id: 2,
    name: "Ana Paula Ferreira",
    role: "Consultora de Investimentos Rurais",
    region: "Goiás & Tocantins",
    avatar: "https://images.unsplash.com/photo-1664039957602-314a85d60f46?auto=format&fit=crop&w=120&h=120&q=80",
    whatsapp: "+5562999990002",
  },
  {
    id: 3,
    name: "Roberto Alves",
    role: "Especialista em Agronegócio",
    region: "São Paulo & Paraná",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    whatsapp: "+5511999990003",
  },
  {
    id: 4,
    name: "Mariana Costa",
    role: "Analista de Mercado de Terras",
    region: "Bahia & Piauí",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
    whatsapp: "+5571999990004",
  },
];
