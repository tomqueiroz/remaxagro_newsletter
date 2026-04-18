export type Commodity = {
  symbol: string;
  name: string;
  price: string;
  unit: string;
  change: string;
  positive: boolean;
};

export type NewsItem = {
  id: number;
  category: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
};

export type Insight = {
  id: number;
  icon: string;
  title: string;
  body: string;
  tag: string;
};

export type Broker = {
  id: number;
  name: string;
  region: string;
  phone: string;
  imageUrl: string;
};

export const commodities: Commodity[] = [
  { symbol: "SOJ", name: "Soja", price: "R$ 142,50", unit: "sc 60kg", change: "+1,2%", positive: true },
  { symbol: "MIL", name: "Milho", price: "R$ 58,30", unit: "sc 60kg", change: "+0,8%", positive: true },
  { symbol: "BOI", name: "Boi Gordo", price: "R$ 298,00", unit: "arroba", change: "-0,3%", positive: false },
  { symbol: "CAF", name: "Café", price: "R$ 1.420,00", unit: "sc 60kg", change: "+2,1%", positive: true },
  { symbol: "ALG", name: "Algodão", price: "R$ 108,50", unit: "sc 15kg", change: "-0,5%", positive: false },
  { symbol: "TRI", name: "Trigo", price: "R$ 82,00", unit: "sc 60kg", change: "+0,6%", positive: true },
];

export const newsItems: NewsItem[] = [
  {
    id: 1,
    category: "Mercado",
    title: "Soja atinge máximo histórico no Mato Grosso",
    summary: "Preços da soja no MT registraram alta de 2,3% na semana, impulsionados pela demanda chinesa e estoques apertados.",
    date: "16 Mai 2025",
    imageUrl: "https://images.unsplash.com/photo-1562702076-c719c8796b8d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    category: "Investimentos",
    title: "Terras no Matopiba valorizam 18% em 12 meses",
    summary: "Região concentra maior parte dos negócios de terras agrícolas do Brasil, com demanda aquecida.",
    date: "15 Mai 2025",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    category: "Política",
    title: "Nova política de crédito rural favorece produtores",
    summary: "Ministério da Agricultura anuncia linhas de crédito com taxas especiais para safra 2025/26.",
    date: "14 Mai 2025",
    imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    category: "Exportação",
    title: "Brasil bate recorde de exportação no primeiro trimestre",
    summary: "Agronegócio brasileiro exportou US$ 120bi no Q1 2025, alta de 13% sobre o mesmo período do ano anterior.",
    date: "13 Mai 2025",
    imageUrl: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=800&q=80",
  },
];

export const insights: Insight[] = [
  {
    id: 1,
    icon: "TrendingUp",
    title: "Ciclo de alta em soja: análise do segundo semestre",
    body: "Dados DATAGRO indicam patamar sustentado acima de R$ 140/sc até setembro, com revisão de alta para outubro.",
    tag: "DATAGRO Análise",
  },
  {
    id: 2,
    icon: "MapPin",
    title: "Regiões com maior potencial de valorização em 2025",
    body: "Cerrado baiano e Piauí se destacam como fronteiras agrícolas de alto retorno para investidores.",
    tag: "Análise Regional",
  },
  {
    id: 3,
    icon: "CloudRain",
    title: "El Niño e o impacto na safra 2025/26",
    body: "Previsões climáticas sugerem excesso de chuvas no Sul e seca no Centro-Oeste. Monitoramento essencial.",
    tag: "Clima",
  },
  {
    id: 4,
    icon: "DollarSign",
    title: "Dólar a R$ 5,20: impacto no custo de produção",
    body: "Alta do câmbio encarece insumos importados, mas favorece exportações de grãos e proteína animal.",
    tag: "Câmbio",
  },
];

export const brokers: Broker[] = [
  {
    id: 1,
    name: "Carlos Mendonça",
    region: "MT / PA",
    phone: "+55 65 99123-4567",
    imageUrl: "https://images.unsplash.com/photo-1607544836359-7603ef1d3c4c?auto=format&fit=crop&w=120&h=120",
  },
  {
    id: 2,
    name: "Ana Paula Rocha",
    region: "GO / DF",
    phone: "+55 62 98876-1234",
    imageUrl: "https://images.unsplash.com/photo-1664039957602-314a85d60f46?auto=format&fit=crop&w=120&h=120",
  },
  {
    id: 3,
    name: "Roberto Alves",
    region: "BA / PI",
    phone: "+55 71 97654-3210",
    imageUrl: "https://images.unsplash.com/photo-1648406062026-88d6ab60c431?auto=format&fit=crop&w=120&h=120",
  },
];

export const editorial = {
  greeting: "Prezado parceiro do agronegócio",
  body: "Bem-vindo à primeira edição da nossa newsletter semanal exclusiva. Este é um canal direto entre a RE/MAX AGRO powered by DATAGRO e você, proprietário rural, investidor e profissional do setor. A cada segunda-feira você receberá análises exclusivas, cotações atualizadas e oportunidades de investimento selecionadas.",
  signature: "Equipe RE/MAX AGRO powered by DATAGRO",
};