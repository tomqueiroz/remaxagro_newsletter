import { IMAGES } from "@/assets/images";

// ── Tipagem ────────────────────────────────────────────────────────────────────

export interface QuotationItem {
  id: number;
  name: string;
  value: string;
  unit: string;
  change: number;
  description: string;
  unitLabel: string;
}

export interface NewsItem {
  id: number;
  date: string;
  dateLabel: string;
  icon: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  url: string;
  image: string;
}

export interface InsightItem {
  id: number;
  title: string;
  description: string;
  date: string;
  urgency: "high" | "medium" | "low";
  icon?: string;
}

export interface BrokerItem {
  id: number;
  name: string;
  role: string;
  region: string;
  whatsapp: string;
  avatar?: string;
}

export interface NewsletterData {
  editionNumber: string;
  editionDate: string;
  lastUpdated: string;
  quotations: QuotationItem[];
  mainNews: NewsItem[];
  secondaryNews: NewsItem[];
  insights: InsightItem[];
  brokers: BrokerItem[];
}

// ── Helpers ────────────────────────────────────────────────────────────────────

export const getMainNews = (): NewsItem[] => allNews.slice(0, 6);
export const getSecondaryNews = (): NewsItem[] => allNews.slice(6);

// ── Todas as notícias (ordenadas por data, mais recente primeiro) ──────────────

export const allNews: NewsItem[] = [
  // ── 27/05 ──────────────────────────────────────────────────────────────
  {
    id: 1,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    icon: "ri-leaf-line",
    title: "Moagem de cana no Centro-Sul dobra na 2ª quinzena de abril, aponta Unica",
    summary: "Produção de etanol avança mais de 70% no acumulado da safra 2026/27, com maior destinação da cana ao biocombustível.",
    content: "<p>A moagem de cana-de-açúcar na região Centro-Sul do Brasil registrou um salto expressivo na segunda quinzena de abril, praticamente dobrando em relação ao mesmo período do ano anterior, segundo dados divulgados pela União da Indústria de Cana-de-Açúcar e Bioenergia (Unica).</p><p>Esse avanço reflete as condições climáticas favoráveis que permitiram a aceleração dos trabalhos de colheita. Com isso, a produção de etanol também apresentou um crescimento robusto, avançando mais de 70% no acumulado da safra 2026/27. As usinas têm priorizado a destinação da matéria-prima para a fabricação do biocombustível, em resposta à forte demanda interna e aos preços atrativos no mercado.</p>",
    source: "UAGRO",
    url: "https://www.uagro.com.br/agricultura/moagem-de-cana-no-centro-sul-dobra-na-2a-quinzena-de-abril-aponta-unica",
    image: IMAGES.NEWS_SUGARCANE_1,
  },
  {
    id: 2,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    icon: "ri-gas-station-line",
    title: "Governo avalia renovar subvenção ao diesel na próxima semana, diz Durigan",
    summary: "Ministro da Fazenda afirmou que benefício atual deve ser mantido em R$ 0,35 por litro, mas decisão dependerá do petróleo.",
    content: "<p>O governo federal está em fase final de avaliação para a renovação da subvenção econômica ao óleo diesel, medida que visa conter o impacto dos custos de frete na inflação. Segundo o secretário-executivo do Ministério da Fazenda, Dario Durigan, a expectativa é que o benefício atual de R$ 0,35 por litro seja mantido.</p><p>No entanto, Durigan ressaltou que a decisão final, prevista para a próxima semana, dependerá do comportamento das cotações internacionais do petróleo e da taxa de câmbio. A equipe econômica busca equilibrar o alívio aos caminhoneiros e ao setor produtivo com a responsabilidade fiscal, monitorando de perto a volatilidade do mercado externo.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/petroleum/13/1137825/governo-avalia-renovar-subvencao-ao-diesel-na-proxima-semana-diz-durigan",
    image: IMAGES.NEWS_BIOFUEL_1,
  },
  {
    id: 3,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    icon: "ri-global-line",
    title: "Alckmin afirma que Brasil retomará habilitação de exportações de proteínas à UE até setembro",
    summary: "País busca comprovar ao bloco europeu a eficiência das medidas de segurança sanitárias nas cadeias produtivas de carne bovina.",
    content: "<p>O vice-presidente e ministro do Desenvolvimento, Indústria, Comércio e Serviços, Geraldo Alckmin, declarou que o Brasil está em negociações avançadas para retomar a habilitação de novas plantas frigoríficas para exportação de proteínas à União Europeia até setembro deste ano.</p><p>O esforço do governo brasileiro concentra-se em comprovar aos auditores europeus a robustez e a eficiência do sistema de defesa agropecuária nacional. As autoridades têm apresentado relatórios detalhados sobre as medidas de segurança sanitária e rastreabilidade implementadas nas cadeias produtivas, visando reabrir um dos mercados mais exigentes e rentáveis para a carne bovina brasileira.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/livestock/5/1137675/alckmin-afirma-que-brasil-retomara-habilitacao-de-exportacoes-de-proteinas-a-ue-ate-setembro",
    image: IMAGES.NEWS_SWINE_1,
  },
  {
    id: 4,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    icon: "ri-tractor-line",
    title: "Receita da indústria de máquinas recua quase 15% em abril, aponta Abimaq",
    summary: "Setor segue pressionado pela fraqueza da agropecuária e pelos juros elevados, apesar da forte alta das exportações.",
    content: "<p>A indústria brasileira de máquinas e equipamentos registrou uma queda de quase 15% em sua receita líquida no mês de abril, na comparação interanual, de acordo com balanço divulgado pela Associação Brasileira da Indústria de Máquinas e Equipamentos (Abimaq).</p><p>O recuo é atribuído principalmente à retração nos investimentos do setor agropecuário, que enfrenta margens mais apertadas devido à queda nos preços das commodities, e ao patamar ainda elevado das taxas de juros, que encarece o crédito. Apesar do cenário interno desafiador, a Abimaq destacou o desempenho positivo das exportações, que apresentaram forte alta e ajudaram a mitigar parte das perdas no mercado doméstico.</p>",
    source: "UAGRO",
    url: "https://www.uagro.com.br/agricultura/receita-da-industria-de-maquinas-recua-quase-15-em-abril-aponta-abimaq",
    image: IMAGES.NEWS_MACHINES_1,
  },
  {
    id: 5,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    icon: "ri-bank-card-line",
    title: "Senado adia análise de projeto sobre renegociação das dívidas rurais",
    summary: "Parlamentares consideram insuficiente proposta do governo e defendem solução mais ampla para o setor.",
    content: "<p>A votação do projeto de lei que trata da renegociação das dívidas dos produtores rurais foi adiada no Senado Federal. A decisão ocorreu após parlamentares ligados à bancada do agronegócio considerarem a proposta apresentada pelo governo como insuficiente para atender às necessidades do setor.</p><p>Os senadores argumentam que as condições climáticas adversas das últimas safras e a queda na rentabilidade exigem uma solução mais abrangente, que inclua prazos de carência maiores e taxas de juros mais acessíveis. As lideranças do setor produtivo continuam em articulação com o Ministério da Fazenda e o Ministério da Agricultura para construir um texto de consenso antes de levar a matéria ao plenário.</p>",
    source: "UAGRO",
    url: "https://www.uagro.com.br/politica-setorial/senado-adia-analise-de-projeto-sobre-renegociacao-das-dividas-rurais",
    image: IMAGES.AGRO_TECH_1,
  },
  {
    id: 6,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    icon: "ri-plant-line",
    title: "Ministério da Agricultura lança campanha de orgânicos",
    summary: "Iniciativa reforça a integração entre governo e redes de produção orgânica na implementação de políticas públicas voltadas à sustentabilidade.",
    content: "<p>O Ministério da Agricultura e Pecuária (Mapa) lançou oficialmente a nova campanha nacional de incentivo ao consumo e à produção de alimentos orgânicos. A iniciativa visa conscientizar a população sobre os benefícios desses produtos para a saúde e para o meio ambiente.</p><p>Além do foco no consumidor, a campanha reforça a integração entre o governo federal e as redes de produtores orgânicos para a formulação e implementação de políticas públicas. O objetivo é facilitar o acesso ao crédito, simplificar os processos de certificação e promover a sustentabilidade em toda a cadeia produtiva, fortalecendo um segmento que apresenta taxas de crescimento consistentes no país.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/mais-culturas/15/1137683/ministerio-da-agricultura-lanca-campanha-de-organicos",
    image: IMAGES.HERO_FIELD_1,
  },
  // ── 26/05 ──────────────────────────────────────────────────────────────
  {
    id: 7,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    icon: "ri-seedling-line",
    title: "Colheita do milho safrinha começa de forma incipiente no Paraná, aponta o Deral",
    summary: "Chuvas recentes ajudaram na manutenção da umidade dos solos e favoreceram o desenvolvimento das lavouras.",
    content: "<p>O Departamento de Economia Rural (Deral), vinculado à Secretaria de Agricultura do Paraná, informou que a colheita do milho safrinha (segunda safra) teve início no estado, ainda que de forma incipiente. Os trabalhos de campo estão concentrados nas áreas plantadas mais cedo, principalmente nas regiões oeste e norte.</p><p>Segundo os técnicos do Deral, as chuvas registradas nas últimas semanas foram fundamentais para a manutenção da umidade dos solos, favorecendo o desenvolvimento das lavouras que se encontram em fases críticas de enchimento de grãos. A expectativa é de uma safra com boa produtividade, consolidando o Paraná como um dos principais produtores do cereal no país.</p>",
    source: "UAGRO",
    url: "https://www.uagro.com.br/agricultura/colheita-do-milho-safrinha-comeca-de-forma-incipiente-no-parana-aponta-o-deral",
    image: "",
  },
  {
    id: 8,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    icon: "ri-drop-line",
    title: "Preço pago ao produtor de leite no RS deve fechar maio com queda mensal de 3,38%",
    summary: "Conseleite projeta que o mês encerrará com o valor do litro em R$ 2,4478.",
    content: "<p>O Conselho Paritário Produtores/Indústrias de Leite do Estado do Rio Grande do Sul (Conseleite-RS) divulgou sua projeção para o fechamento do mês de maio, indicando uma queda de 3,38% no preço de referência pago ao produtor. Com esse recuo, o valor do litro deve encerrar o período cotado a R$ 2,4478.</p><p>A retração nos preços reflete o aumento sazonal da captação de leite na região Sul, impulsionado pela melhoria das pastagens de inverno, aliado a um consumo interno que ainda patina. O setor produtivo manifesta preocupação com o estreitamento das margens, uma vez que os custos de produção, especialmente com suplementação animal, permanecem em patamares elevados.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/livestock/5/1137037/preco-pago-ao-produtor-de-leite-no-rs-deve-fechar-maio-com-queda-mensal-de-338",
    image: "",
  },
  {
    id: 9,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    icon: "ri-flask-line",
    title: "Ministério da Agricultura lança sistema unificado para registro de defensivos agrícolas",
    summary: "Sispa marca avanço na modernização dos processos regulatórios relacionados à categoria de insumos.",
    content: "<p>Em um passo importante para a desburocratização do setor, o Ministério da Agricultura e Pecuária lançou o Sistema de Informações sobre Agrotóxicos (Sispa). A nova plataforma unifica e digitaliza o processo de registro e controle de defensivos agrícolas no Brasil.</p><p>O Sispa integrará as bases de dados do Mapa, da Anvisa e do Ibama, órgãos responsáveis pela avaliação agronômica, toxicológica e ambiental dos produtos. A expectativa é que a modernização confira maior transparência, agilidade e segurança jurídica aos processos regulatórios, atendendo a uma demanda histórica da indústria de insumos e do setor produtivo por maior eficiência na aprovação de novas tecnologias.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/agribusiness/12/1136962/ministerio-da-agricultura-lanca-sistema-unificado-para-registro-de-defensivos-agricolas",
    image: "",
  },
  {
    id: 10,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    icon: "ri-government-line",
    title: "Municípios respondem por praticamente metade do financiamento dedicado à assistência técnica e extensão rural",
    summary: "De 2016 a 2025, investimento municipal atingiu R$ 26 bilhões, mostra estudo da Confederação Nacional de Municípios (CNM).",
    content: "<p>Um estudo inédito divulgado pela Confederação Nacional de Municípios (CNM) revelou o protagonismo das prefeituras no apoio ao pequeno produtor. Segundo o levantamento, os governos municipais foram responsáveis por quase 50% de todo o financiamento destinado à assistência técnica e extensão rural (Ater) no Brasil na última década.</p><p>Entre 2016 e 2025, os investimentos municipais nessa área somaram aproximadamente R$ 26 bilhões. Os dados evidenciam a importância das políticas locais para a difusão de tecnologias, melhoria da gestão das propriedades e aumento da renda na agricultura familiar, suprindo, muitas vezes, as lacunas deixadas pela retração dos orçamentos estaduais e federais para o setor.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/agribusiness/12/1136714/municipios-respondem-por-praticamente-metade-do-financiamento-dedicado-a-assistencia-tecnica-e-extensao-rural",
    image: "",
  },
  {
    id: 11,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    icon: "ri-leaf-fill",
    title: "Ministério da Agricultura institui Plano Inova Cacau 2030",
    summary: "Iniciativa tem como objetivo promover desenvolvimento sustentável do segmento.",
    content: "<p>O Ministério da Agricultura publicou a portaria que institui o Plano Inova Cacau 2030, uma estratégia nacional voltada para a revitalização e o desenvolvimento sustentável da cacauicultura brasileira. O plano foi construído em parceria com a Comissão Executiva do Plano da Lavoura Cacaueira (Ceplac) e representantes da cadeia produtiva.</p><p>As metas do Inova Cacau 2030 incluem o aumento da produtividade, a melhoria da qualidade das amêndoas, a expansão do cultivo em sistemas agroflorestais e a ampliação do acesso a crédito e assistência técnica. A iniciativa busca reposicionar o Brasil como um dos principais players globais no mercado de cacau e chocolate de alta qualidade, gerando emprego e renda nas regiões produtoras.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/mais-culturas/15/1136690/ministerio-da-agricultura-institui-plano-inova-cacau-2030",
    image: "",
  },
  {
    id: 12,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    icon: "ri-wifi-line",
    title: "CNH e TIM investem cerca de R$ 77 milhões em nova iniciativa de conectividade rural",
    summary: "Com previsão de implantação em até 18 meses, 97 torres devem conectar cerca de 1,5 milhão de hectares em Minas Gerais.",
    content: "<p>A CNH Industrial e a operadora TIM anunciaram uma parceria estratégica para expandir a conectividade no campo. O projeto prevê investimentos da ordem de R$ 77 milhões para a instalação de infraestrutura de telecomunicações em áreas rurais do estado de Minas Gerais.</p><p>O cronograma estabelece a implantação de 97 novas torres de transmissão (tecnologia 4G) em um prazo de até 18 meses. A expectativa é que a rede cubra aproximadamente 1,5 milhão de hectares, beneficiando milhares de produtores. A conectividade é considerada o pilar fundamental para a adoção em larga escala da agricultura de precisão, telemetria de máquinas e gestão digital das propriedades.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/agribusiness/12/1136571/cnh-e-tim-investem-cerca-de-rdollar-77-milhoes-em-nova-iniciativa-de-conectividade-rural",
    image: "",
  },
  // ── 25/05 ──────────────────────────────────────────────────────────────
  {
    id: 13,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-gas-station-fill",
    title: "CNPE deve discutir aumento da mistura de etanol na gasolina em junho",
    summary: "Governo avalia elevar percentual de etanol anidro de 30% para 32%.",
    content: "<p>O Conselho Nacional de Política Energética (CNPE) incluiu na pauta de sua próxima reunião, prevista para junho, a discussão sobre o aumento da mistura obrigatória de etanol anidro na gasolina. A proposta em análise pelo governo federal prevê a elevação do percentual atual de 30% (E30) para 32% (E32).</p><p>A medida é defendida pelo setor sucroenergético como uma forma de estimular a produção nacional de biocombustíveis, reduzir a dependência de importações de combustíveis fósseis e contribuir para as metas de descarbonização da matriz de transportes. Estudos técnicos estão sendo finalizados para atestar a viabilidade técnica do E32 na frota atual de veículos.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/sugar-etanol/2/1135738/cnpe-deve-discutir-aumento-da-mistura-de-etanol-na-gasolina-em-junho",
    image: "",
  },
  {
    id: 14,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-plant-fill",
    title: "Colheita da segunda safra de milho tem início no Mato Grosso",
    summary: "Imea projeta uma produção de 52,65 milhões de toneladas.",
    content: "<p>As colheitadeiras começaram a entrar em campo no Mato Grosso, marcando o início oficial da colheita da segunda safra de milho no maior estado produtor do país. Os trabalhos ainda estão na fase inicial, concentrados nas áreas semeadas logo após a colheita da soja precoce.</p><p>O Instituto Mato-grossense de Economia Agropecuária (Imea) mantém uma perspectiva otimista para o ciclo, projetando uma produção total de 52,65 milhões de toneladas. Apesar de alguns desafios climáticos pontuais durante o desenvolvimento das lavouras, o volume esperado consolida a importância da safrinha mato-grossense para o abastecimento interno e para as exportações brasileiras do cereal.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/corn/9/1135374/colheita-da-segunda-safra-de-milho-tem-inicio-no-mato-grosso",
    image: "",
  },
  {
    id: 15,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-shield-check-line",
    title: "Abiec diz que embargo chinês a três frigoríficos tem caráter preventivo e temporário",
    summary: "Segundo a associação, Brasil possui um dos sistemas de controle sanitário mais rigorosos do mundo.",
    content: "<p>A Associação Brasileira das Indústrias Exportadoras de Carnes (Abiec) manifestou-se sobre a recente suspensão das exportações de três plantas frigoríficas brasileiras para a China. A entidade esclareceu que a medida adotada pelas autoridades aduaneiras chinesas tem caráter estritamente preventivo e temporário, não refletindo problemas sistêmicos.</p><p>A Abiec ressaltou que o Brasil possui um dos sistemas de controle sanitário mais rigorosos e transparentes do mundo, com monitoramento permanente de toda a cadeia produtiva e fiscalização in loco pelo Serviço de Inspeção Federal (SIF). O Ministério da Agricultura já enviou as informações técnicas solicitadas por Pequim e trabalha para a rápida reversão dos embargos.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/livestock/5/1135450/abiec-diz-que-embargo-chines-a-tres-plantas-de-frigorificos-tem-carater-preventivo-e-temporario",
    image: "",
  },
  {
    id: 16,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-bar-chart-grouped-line",
    title: "Agroindústria cresce 0,4% no primeiro trimestre",
    summary: "Segundo a FGVAgro, desempenho positivo do segmento foi fundamental para a Indústria de Transformação.",
    content: "<p>A produção da agroindústria brasileira registrou um crescimento de 0,4% no primeiro trimestre do ano, segundo levantamento do Centro de Estudos do Agronegócio da Fundação Getulio Vargas (FGVAgro). O resultado reflete a resiliência do setor de processamento de matérias-primas agropecuárias.</p><p>O estudo destaca que o desempenho positivo da agroindústria foi o principal fator que impediu a Indústria de Transformação como um todo de operar em campo negativo no período. Os segmentos de produtos alimentícios e biocombustíveis foram os principais motores desse crescimento, compensando as quedas observadas em outros ramos industriais.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/agribusiness/12/1135605/agroindustria-cresce-04-no-primeiro-trimestre",
    image: "",
  },
  {
    id: 17,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-earth-line",
    title: "Uso de calcário como corretivo do solo cresce apenas 2,8% nos últimos dois anos",
    summary: "Brasil mantém níveis de aplicação de corretivos em patamares preocupantes de defasagem, alerta Abracal.",
    content: "<p>O consumo de calcário agrícola no Brasil apresentou um crescimento tímido de apenas 2,8% no acumulado dos últimos dois anos, segundo dados da Associação Brasileira dos Produtores de Calcário Agrícola (Abracal). O volume aplicado está muito aquém do potencial e da necessidade dos solos tropicais brasileiros.</p><p>A entidade alerta que a defasagem na correção da acidez do solo compromete a eficiência dos fertilizantes e limita o potencial produtivo das lavouras. A Abracal defende a criação de linhas de crédito específicas e campanhas de conscientização para incentivar a prática da calagem, considerada o primeiro e mais importante passo para a construção da fertilidade do solo.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/agribusiness/12/1135473/uso-de-calcario-como-corretivo-do-solo-cresce-apenas-28-nos-ultimos-dois-anos",
    image: "",
  },
  {
    id: 18,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-exchange-dollar-line",
    title: "Governo negocia revisão da cota de exportação de carne bovina brasileira para a China",
    summary: "Atualmente, o gigante asiático mantém uma cota anual de 1,1 milhão de toneladas para importação da proteína brasileira.",
    content: "<p>O governo brasileiro iniciou tratativas diplomáticas com a China visando a revisão e ampliação da cota de exportação de carne bovina. Atualmente, o acordo bilateral estabelece um limite anual de 1,1 milhão de toneladas para a entrada da proteína brasileira no mercado chinês sob condições tarifárias favorecidas.</p><p>Com o aumento da capacidade produtiva do Brasil e a crescente demanda chinesa por proteína animal, o Ministério da Agricultura e o Itamaraty argumentam que a cota atual encontra-se defasada. A expectativa é que as negociações avancem durante as próximas reuniões da comissão sino-brasileira, abrindo espaço para um incremento significativo nas receitas de exportação do setor pecuário.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/livestock/5/1135879/governo-negocia-revisao-da-cota-de-exportacao-de-carne-bovina-brasileira-para-a-china",
    image: "",
  },
  {
    id: 19,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-cup-line",
    title: "Mais da metade dos produtores brasileiros de café são pequenos negócios, aponta pesquisa",
    summary: "Levantamento do Sebrae revela que estados fora do Sudeste concentram maior número de pequenos produtores.",
    content: "<p>Uma pesquisa recente divulgada pelo Sebrae traçou o perfil da cafeicultura nacional, revelando que mais de 50% dos produtores de café no Brasil são classificados como pequenos negócios ou agricultura familiar. O dado reforça a importância social e econômica da cultura para a fixação do homem no campo.</p><p>O levantamento também trouxe um dado surpreendente: embora o Sudeste seja o maior produtor em volume, a maior concentração de pequenos produtores de café encontra-se em estados fora dessa região, como Rondônia e Bahia (fortes no café robusta). O Sebrae destaca a necessidade de políticas públicas focadas em gestão, sucessão familiar e agregação de valor (cafés especiais) para garantir a sustentabilidade desses pequenos negócios.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/coffee/3/1135846/mais-da-metade-dos-produtores-brasileiros-de-cafe-sao-pequenos-negocios-aponta-pesquisa",
    image: "",
  },
  {
    id: 20,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    icon: "ri-auction-line",
    title: "Governo federal lança a quinta rodada do leilão Eco Invest",
    summary: "Expectativa é arrecadar R$ 50 bilhões para fomentar as indústrias de biofertilizantes e biocombustíveis.",
    content: "<p>O governo federal anunciou o lançamento da quinta rodada do programa Eco Invest, uma iniciativa voltada para a atração de capital privado para projetos de economia verde. O foco desta nova etapa são as indústrias de biofertilizantes, biogás e biocombustíveis avançados.</p><p>A expectativa dos ministérios envolvidos é alavancar cerca de R$ 50 bilhões em investimentos nos próximos anos. Os recursos serão direcionados para a construção de novas biorrefinarias e plantas de fertilizantes organominerais, reduzindo a dependência externa de insumos agrícolas e consolidando a posição do Brasil como líder global na transição energética e na agricultura de baixo carbono.</p>",
    source: "DATAGRO",
    url: "https://portal.datagro.com/pt/sugar-etanol/2/1135771/governo-federal-lanca-a-quinta-rodada-do-leilao-eco-invest",
    image: "",
  }
];

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

export const insights: InsightItem[] = [
  {
    id: 1,
    title: "Janela de Comercialização da Soja",
    description: "Antecipe tendências e se prepare para os movimentos de alta volatilidade esperados para a próxima semana.",
    date: "Maio 2026",
    urgency: "high",
    icon: "ri-seedling-line",
  },
  {
    id: 2,
    title: "Decisão do COPOM",
    description: "Impactos diretos no crédito rural e financiamento de maquinário para a safra 2026/27.",
    date: "Maio 2026",
    urgency: "medium",
    icon: "ri-bank-line",
  },
  {
    id: 3,
    title: "Agrishow 2026",
    description: "Principais lançamentos em tecnologia e agricultura de precisão apresentados na feira.",
    date: "Maio 2026",
    urgency: "low",
    icon: "ri-tractor-line",
  },
];

export const brokers: BrokerItem[] = [
  { id: 1, name: "Carlos Mendes", role: "Especialista em Grãos", region: "Mato Grosso", whatsapp: "5511999999999" },
  { id: 2, name: "Ana Paula Silva", role: "Especialista em Pecuária", region: "Goiás", whatsapp: "5511999999999" },
  { id: 3, name: "Roberto Alves", role: "Especialista em Cana", region: "São Paulo", whatsapp: "5511999999999" },
  { id: 4, name: "Mariana Costa", role: "Especialista em Café", region: "Minas Gerais", whatsapp: "5511999999999" },
];