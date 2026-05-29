import { IMAGES } from "@/assets/images";

export interface WeekNewsItem {
  id: number;
  date: string;          // ISO: "2026-05-28"
  dateLabel: string;     // "28 Mai 2026"
  dayGroup: string;      // "25/05", "26/05", "27/05", "28/05"
  icon: string;          // remix icon class
  title: string;
  summary: string;       // parágrafo curto para o card
  content: string;       // conteúdo completo para o pop-up (HTML seguro)
  source: string;
  sourceUrl: string;     // link original
  image: string;
  tags: string[];
}

export const weekNewsItems: WeekNewsItem[] = [

  // ── 25/05 ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    dayGroup: "25/05",
    icon: "ri-gas-station-line",
    title: "CNPE deve discutir aumento da mistura de etanol na gasolina em junho",
    summary: "O governo avalia elevar o percentual de etanol anidro na gasolina de 30% para 32% — medida que pode gerar demanda adicional de 1,2 bilhão de litros/ano para o setor sucroenergético e reduzir emissões de carbono.",
    content: `<p>O Conselho Nacional de Política Energética (CNPE) deve pautar em junho a discussão sobre o aumento da mistura obrigatória de etanol anidro na gasolina, elevando o percentual atual de 30% para 32%. A medida, conhecida como E32, é uma das mais aguardadas pelo setor sucroenergético brasileiro.</p>
<p>Segundo fontes do Ministério de Minas e Energia, a proposta faz parte de uma estratégia mais ampla do governo federal para ampliar o uso de biocombustíveis na matriz energética, reduzindo a dependência de combustíveis fósseis e contribuindo para as metas climáticas do Brasil.</p>
<p>Para a indústria canavieira, a elevação da mistura representaria uma demanda adicional estimada em <strong>1,2 bilhão de litros de etanol por ano</strong>, impulsionando a receita de usinas e destilarias, especialmente em Mato Grosso do Sul, São Paulo e Goiás.</p>
<p>O setor aguarda ainda a definição sobre o E32 de hidratado nos postos, o que ampliaria ainda mais o consumo do biocombustível. A Unica (União da Indústria de Cana-de-Açúcar) e a Orplana acompanham de perto as negociações.</p>
<p>A medida também tem impacto no mercado de açúcar, já que parte da cana pode ser redirecionada para etanol, alterando o mix de produção das usinas.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/sugar-etanol/2/1135738/cnpe-deve-discutir-aumento-da-mistura-de-etanol-na-gasolina-em-junho",
    image: IMAGES.NEWS_BIOFUEL_2,
    tags: ["Etanol", "Biocombustíveis", "CNPE"],
  },
  {
    id: 2,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    dayGroup: "25/05",
    icon: "ri-plant-line",
    title: "Colheita da segunda safra de milho tem início no Mato Grosso",
    summary: "O Imea projeta uma produção de 52,65 milhões de toneladas para a safrinha mato-grossense — volume que representa mais de 30% da colheita nacional de milho de inverno e deve pressionar os preços internos.",
    content: `<p>A colheita da segunda safra de milho — a chamada safrinha — teve início no Mato Grosso na última semana, marcando o começo de um dos períodos mais importantes para o mercado graneleiro brasileiro. O Instituto Mato-Grossense de Economia Agropecuária (Imea) projeta uma produção de <strong>52,65 milhões de toneladas</strong> no estado, volume que representa mais de 30% da colheita nacional.</p>
<p>As condições climáticas de maio foram favoráveis, com boa distribuição de chuvas no início do mês que beneficiaram o enchimento de grãos nas lavouras de plantio mais tardio. O cenário contrasta com a incerteza que havia no início da safra, quando o El Niño ameaçava a produção.</p>
<p>O avanço da colheita deve pressionar os preços do milho no mercado interno, já que o volume a ser ofertado é expressivo. Traders e tradings observam os embarques com atenção, uma vez que o Brasil disputa espaço no mercado global com os Estados Unidos, que ainda não iniciou sua safra de verão.</p>
<p>Para os produtores, a atenção se volta agora para a logística de escoamento — rodovias do Centro-Oeste e a fila nos portos de Santos e Paranaguá serão pontos críticos nas próximas semanas.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/corn/9/1135374/colheita-da-segunda-safra-de-milho-tem-inicio-no-mato-grosso",
    image: IMAGES.NEWS_CORN_2,
    tags: ["Milho", "Safrinha", "Mato Grosso"],
  },
  {
    id: 3,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    dayGroup: "25/05",
    icon: "ri-global-line",
    title: "Abiec: embargo chinês a três frigoríficos tem caráter preventivo e temporário",
    summary: "A Associação Brasileira das Indústrias Exportadoras de Carnes afirma que a medida é pontual e não reflete deficiências sistêmicas no controle sanitário brasileiro, que conta com fiscalização permanente do SIF.",
    content: `<p>A Associação Brasileira das Indústrias Exportadoras de Carnes (Abiec) divulgou nota nesta semana afirmando que o embargo imposto pela China a três plantas frigoríficas brasileiras tem <strong>caráter estritamente preventivo e temporário</strong>, sem reflexo sobre a qualidade e segurança do sistema brasileiro de inspeção de alimentos.</p>
<p>Segundo a entidade, o Brasil possui um dos sistemas de controle sanitário mais rigorosos do mundo, com monitoramento permanente de toda a cadeia produtiva — do campo ao embarque — e fiscalização constante do Serviço de Inspeção Federal (SIF), vinculado ao Ministério da Agricultura, Pecuária e Abastecimento (Mapa).</p>
<p>O embargo, que atingiu três estabelecimentos habilitados a exportar para o mercado chinês, foi motivado por resultados de análises laboratoriais realizadas pelo Customs and Quarantine Bureau da China. As unidades afetadas foram notificadas e já iniciaram os procedimentos de auditoria interna para retomada das exportações.</p>
<p>O mercado reagiu com volatilidade no preço do boi gordo nos principais centros pecuários, mas analistas do setor avaliam que o impacto deve ser passageiro, dado o volume expressivo de outros estabelecimentos habilitados e a solidez da relação comercial bilateral entre Brasil e China.</p>
<p>Em 2025, o Brasil exportou mais de US$ 3,5 bilhões em carne bovina para a China, que é o principal destino das proteínas brasileiras no mundo.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/livestock/5/1135450/abiec-diz-que-embargo-chines-a-tres-plantas-de-frigorificos-tem-carater-preventivo-e-temporario",
    image: IMAGES.NEWS_CATTLE_1,
    tags: ["Carne Bovina", "China", "Exportação"],
  },
  {
    id: 4,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    dayGroup: "25/05",
    icon: "ri-bar-chart-2-line",
    title: "Agroindústria cresce 0,4% no primeiro trimestre",
    summary: "Segundo a FGVAgro, o desempenho positivo do segmento foi decisivo para que a Indústria de Transformação não entrasse em campo negativo no período — sinalizando resiliência do agro mesmo em cenário de juros elevados.",
    content: `<p>A agroindústria brasileira registrou crescimento de <strong>0,4% no primeiro trimestre de 2026</strong> em relação ao mesmo período do ano anterior, segundo levantamento divulgado pela FGVAgro. O resultado positivo foi fundamental para que a Indústria de Transformação como um todo não operasse em campo negativo no período.</p>
<p>O desempenho foi puxado principalmente pelos segmentos de processamento de grãos (soja e milho), abate e frigorificação de bovinos e suínos, além da moagem de cana-de-açúcar, que avançou com o início precoce da safra 2026/27 em algumas regiões do Centro-Sul.</p>
<p>A resiliência do setor contrasta com o ambiente macroeconômico desafiador — juros elevados, câmbio volátil e demanda interna ainda em recuperação. Para os analistas da FGVAgro, o dinamismo do agro continua sendo um dos principais amortecedores da economia brasileira.</p>
<p>Para o segundo trimestre, as perspectivas são ainda mais favoráveis, com a plena entrada da safra de milho safrinha e o avanço da moagem de cana, que deve elevar o índice de produção industrial agroindustrial.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/agribusiness/12/1135605/agroindustria-cresce-04-no-primeiro-trimestre",
    image: IMAGES.NEWS_GDP_1,
    tags: ["Agroindústria", "PIB", "FGVAgro"],
  },
  {
    id: 5,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    dayGroup: "25/05",
    icon: "ri-seedling-line",
    title: "Uso de calcário como corretivo do solo cresce apenas 2,8% nos últimos dois anos",
    summary: "O Brasil mantém níveis preocupantes de defasagem na aplicação de corretivos de solo, o que pode comprometer a produtividade das lavouras no médio prazo, alerta a Abracal.",
    content: `<p>O uso de calcário agrícola como corretivo do solo no Brasil cresceu apenas <strong>2,8% nos últimos dois anos</strong>, volume muito abaixo do necessário para corrigir a acidez dos solos tropicais brasileiros e garantir produtividade sustentável nas lavouras, segundo alerta da Associação Brasileira dos Produtores de Calcário Agrícola (Abracal).</p>
<p>A defasagem acumulada é preocupante: estima-se que o país precisaria aplicar pelo menos 50 milhões de toneladas de calcário por ano para manter a fertilidade do solo em patamares adequados. O consumo atual está bem abaixo dessa marca, o que pode comprometer a produtividade das principais culturas — soja, milho, cana e café — nos próximos anos.</p>
<p>Entre os fatores que explicam o baixo crescimento estão o custo do frete (o calcário é pesado e volumoso), a restrição de crédito rural em algumas linhas específicas e a falta de conscientização de pequenos e médios produtores sobre a importância da calagem.</p>
<p>A Abracal defende a inclusão de incentivos específicos para aquisição de calcário no próximo Plano Safra 2026/27, com subsídios ao frete e linhas de crédito diferenciadas para correto manejo do solo.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/agribusiness/12/1135473/uso-de-calcario-como-corretivo-do-solo-cresce-apenas-28-nos-ultimos-dois-anos",
    image: IMAGES.NEWS_SEEDS_4,
    tags: ["Solo", "Calcário", "Produtividade"],
  },
  {
    id: 6,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    dayGroup: "25/05",
    icon: "ri-ship-line",
    title: "Governo negocia revisão da cota de exportação de carne bovina para a China",
    summary: "A cota atual é de 1,1 milhão de toneladas anuais. Uma ampliação poderia movimentar bilhões de reais adicionais por ano e consolidar o Brasil como o maior fornecedor de proteína bovina para o mercado asiático.",
    content: `<p>O governo brasileiro conduz negociações com as autoridades chinesas para revisão da cota anual de importação de carne bovina brasileira, atualmente fixada em <strong>1,1 milhão de toneladas</strong>. O objetivo é ampliar esse volume, abrindo espaço para mais exportações e consequentemente mais divisas para o setor pecuário nacional.</p>
<p>As tratativas são conduzidas pelo Ministério das Relações Exteriores em conjunto com o Ministério da Agricultura e a Abiec. Segundo fontes próximas às negociações, a China demonstrou abertura para discutir uma ampliação gradual, condicionada à comprovação de eficiência do sistema sanitário brasileiro.</p>
<p>Para o mercado, uma eventual ampliação da cota seria extremamente positiva: cada 100 mil toneladas adicionais representam aproximadamente R$ 1,5 bilhão em receita para frigoríficos e produtores rurais. O Brasil já é o maior exportador de carne bovina do mundo e a China é o seu principal destino.</p>
<p>O contexto de embargo pontual a três plantas tornou mais sensível a negociação, mas analistas avaliam que as tratativas devem prosseguir, dado o interesse mútuo no comércio bilateral. A delegação brasileira deve visitar Pequim no próximo mês para avançar nas conversas.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/livestock/5/1135879/governo-negocia-revisao-da-cota-de-exportacao-de-carne-bovina-brasileira-para-a-china",
    image: IMAGES.NEWS_CATTLE_4,
    tags: ["Carne Bovina", "China", "Comércio Exterior"],
  },
  {
    id: 7,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    dayGroup: "25/05",
    icon: "ri-cup-line",
    title: "Mais da metade dos produtores brasileiros de café são pequenos negócios",
    summary: "Levantamento do Sebrae revela que estados fora do Sudeste concentram maior número de pequenos cafeicultores, indicando oportunidades de expansão em novas fronteiras produtivas.",
    content: `<p>Um levantamento inédito do Sebrae revela que <strong>mais da metade dos produtores brasileiros de café são classificados como pequenos negócios</strong>, com receita bruta anual de até R$ 4,8 milhões. O estudo também aponta que estados fora do eixo tradicional do Sudeste — especialmente Rondônia, Pará e Bahia — concentram o maior número de pequenos cafeicultores.</p>
<p>O resultado reforça a importância do café como cultura de inclusão produtiva no Brasil. Enquanto Minas Gerais e Espírito Santo lideram em volume total, os estados emergentes crescem em número de produtores e diversidade de cultivares, incluindo robusta (conilon) e variedades especiais.</p>
<p>Para o Sebrae, o dado é relevante para direcionar políticas de suporte técnico e acesso a crédito. A entidade lançará em breve uma linha de capacitação específica para pequenos cafeicultores, com foco em sustentabilidade, gestão e acesso a mercados premium.</p>
<p>O Brasil é o maior produtor e exportador de café do mundo, com estimativa de safra 2026 acima de 60 milhões de sacas. O café especial tem ganhado espaço crescente nas exportações, agregando valor e abrindo novos mercados internacionais.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/coffee/3/1135846/mais-da-metade-dos-produtores-brasileiros-de-cafe-sao-pequenos-negocios-aponta-pesquisa",
    image: IMAGES.NEWS_HARVEST_4,
    tags: ["Café", "Pequenos Produtores", "Sebrae"],
  },
  {
    id: 8,
    date: "2026-05-25",
    dateLabel: "25 Mai 2026",
    dayGroup: "25/05",
    icon: "ri-government-line",
    title: "Governo federal lança a quinta rodada do leilão Eco Invest",
    summary: "A expectativa é arrecadar R$ 50 bilhões para fomentar as indústrias de biofertilizantes e biocombustíveis, impulsionando a transição energética e a bioeconomia no campo brasileiro.",
    content: `<p>O governo federal lançou a quinta rodada do leilão Eco Invest, programa de financiamento verde que tem como objetivo capitalizar projetos de bioeconomia no Brasil. A expectativa é arrecadar <strong>R$ 50 bilhões</strong> nesta rodada, com foco especial nas indústrias de biofertilizantes e biocombustíveis.</p>
<p>O programa, vinculado ao Ministério da Fazenda e ao BNDES, oferece condições de financiamento diferenciadas para empresas que comprovem critérios de sustentabilidade ambiental e social. Para o agronegócio, os recursos podem ser destinados a projetos de biodigestão de resíduos, produção de amônia verde e expansão de usinas de etanol de segunda geração (2G).</p>
<p>Segundo o secretário executivo do programa, as rodadas anteriores do Eco Invest já mobilizaram mais de R$ 120 bilhões em investimentos privados, com efeito multiplicador relevante para a economia verde.</p>
<p>Para o setor de biofertilizantes, a notícia é especialmente positiva: o Brasil importa cerca de 80% dos fertilizantes que consome, e a expansão da capacidade doméstica de produção é vista como estratégica para reduzir a dependência e estabilizar os custos de produção agrícola.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/sugar-etanol/2/1135771/governo-federal-lanca-a-quinta-rodada-do-leilao-eco-invest",
    image: IMAGES.NEWS_BIOFUEL_3,
    tags: ["Bioeconomia", "Biocombustíveis", "Financiamento"],
  },

  // ── 26/05 ──────────────────────────────────────────────────────────────────
  {
    id: 9,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    dayGroup: "26/05",
    icon: "ri-plant-line",
    title: "Colheita do milho safrinha começa de forma incipiente no Paraná, aponta Deral",
    summary: "Chuvas recentes ajudaram na manutenção da umidade dos solos e favoreceram o desenvolvimento final das lavouras, criando expectativa de boa produtividade para a safrinha paranaense.",
    content: `<p>A colheita do milho safrinha no Paraná está tendo início de forma incipiente, conforme boletim divulgado pelo Departamento de Economia Rural (Deral). As chuvas registradas nas últimas semanas foram fundamentais para garantir a <strong>umidade adequada dos solos</strong> e favorecer o enchimento final dos grãos nas lavouras de plantio mais tardio.</p>
<p>A expectativa do Deral é de boa produtividade para a safrinha paranaense nesta temporada, com média projetada acima de 7 toneladas por hectare nas regiões de Cascavel, Toledo e Palotina, principais polos de produção no oeste do estado.</p>
<p>O Paraná é o segundo maior produtor de milho safrinha do Brasil, atrás apenas do Mato Grosso. A safra paranaense tem peso relevante no abastecimento interno, especialmente para as indústrias de ração e amido do Sul e Sudeste.</p>
<p>Os produtores já iniciam a programação de armazenagem e venda. O preço do milho no estado oscila em torno de R$ 52 por saca de 60 kg, valor considerado pouco atrativo por parte do setor, que aguarda melhora nas cotações para acelerar as vendas.</p>`,
    source: "UAGro",
    sourceUrl: "https://www.uagro.com.br/agricultura/colheita-do-milho-safrinha-comeca-de-forma-incipiente-no-parana-aponta-o-deral",
    image: IMAGES.NEWS_CORN_1,
    tags: ["Milho", "Paraná", "Safrinha"],
  },
  {
    id: 10,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    dayGroup: "26/05",
    icon: "ri-drops-line",
    title: "Preço pago ao produtor de leite no RS deve fechar maio com queda mensal de 3,38%",
    summary: "O Conseleite projeta que o litro de leite encerrará o mês em R$ 2,4478, pressionado por oferta elevada e recuo na demanda do mercado interno gaúcho.",
    content: `<p>O Conseleite do Rio Grande do Sul projeta que o preço médio pago ao produtor de leite no estado deve encerrar maio de 2026 com <strong>queda mensal de 3,38%</strong>, fechando o mês com o litro a R$ 2,4478. O resultado reflete um cenário de oferta elevada — típico do período de outono, quando as pastagens ainda produzem bem — combinado com retração na demanda do mercado interno.</p>
<p>A queda preocupa as cooperativas gaúchas, que viram os custos de produção aumentar nos últimos meses, especialmente com ração e energia elétrica. A margem dos produtores segue comprimida, e parte dos pequenos produtores já considera a alternativa de diversificação ou encerramento da atividade leiteira.</p>
<p>O RS é o segundo maior estado produtor de leite do Brasil, respondendo por cerca de 14% da produção nacional. O setor lácteo gaúcho ainda se recupera dos impactos das enchentes de 2024, que destruíram infraestrutura de produção em diversas propriedades.</p>
<p>Para o segundo semestre, a expectativa é de recuperação nos preços com a entrada do período seco, que reduz naturalmente a oferta de leite e tende a equilibrar o mercado.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/livestock/5/1137037/preco-pago-ao-produtor-de-leite-no-rs-deve-fechar-maio-com-queda-mensal-de-338",
    image: IMAGES.NEWS_CATTLE_3,
    tags: ["Leite", "Rio Grande do Sul", "Preços"],
  },
  {
    id: 11,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    dayGroup: "26/05",
    icon: "ri-shield-check-line",
    title: "Ministério da Agricultura lança sistema unificado para registro de defensivos agrícolas",
    summary: "O Sispa moderniza os processos regulatórios de insumos, com promessa de reduzir significativamente os prazos de aprovação de novos defensivos e aumentar a transparência do setor.",
    content: `<p>O Ministério da Agricultura, Pecuária e Abastecimento (Mapa) lançou o Sistema Integrado de Solicitações de Produtos Agropecuários (Sispa), uma plataforma digital unificada para o registro e acompanhamento de solicitações de defensivos agrícolas, fertilizantes e outros insumos agropecuários.</p>
<p>O Sispa representa um <strong>avanço significativo na modernização regulatória</strong> do setor. Atualmente, o processo de registro de novos defensivos no Brasil pode levar até 5 anos — um dos prazos mais longos do mundo —, o que atrasa a chegada de tecnologias de proteção de plantas aos produtores e eleva o custo dos insumos.</p>
<p>Com o novo sistema, o objetivo é reduzir o tempo médio de análise para 18 a 24 meses, com rastreabilidade total do processo e comunicação direta entre os requerentes e os técnicos do Mapa. A plataforma também integra as informações da Anvisa e do Ibama, que também participam do processo de registro.</p>
<p>A Associação Brasileira dos Defensivos Genéricos (Aenda) e a CropLife Brasil celebraram o lançamento, que foi acompanhado por representantes da indústria, cooperativas e produtores rurais.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/agribusiness/12/1136962/ministerio-da-agricultura-lanca-sistema-unificado-para-registro-de-defensivos-agricolas",
    image: IMAGES.NEWS_SEEDS_3,
    tags: ["Defensivos", "Regulatório", "Mapa"],
  },
  {
    id: 12,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    dayGroup: "26/05",
    icon: "ri-bank-line",
    title: "Municípios respondem por metade do financiamento dedicado à assistência técnica rural",
    summary: "De 2016 a 2025, o investimento municipal em ATER atingiu R$ 26 bilhões, revelando o papel crescente das prefeituras no suporte ao produtor rural brasileiro.",
    content: `<p>Um estudo inédito da Confederação Nacional de Municípios (CNM) revelou que os municípios brasileiros respondem por <strong>praticamente metade de todo o financiamento público dedicado à Assistência Técnica e Extensão Rural (ATER)</strong> no país. Entre 2016 e 2025, o investimento municipal acumulado nessa área atingiu R$ 26 bilhões.</p>
<p>O dado surpreende, pois a percepção comum é de que o serviço de ATER é responsabilidade preponderante dos governos estaduais e federal — via Emater, Embrapa e o Ministério da Agricultura. Na prática, porém, as prefeituras têm assumido crescente protagonismo, especialmente em municípios de pequeno porte, onde as estruturas estaduais de extensão são mais escassas.</p>
<p>O estudo recomenda maior articulação entre os três entes federados para evitar duplicações e ampliar o alcance do serviço, especialmente junto a agricultores familiares e assentados. A CNM defende a criação de um fundo específico de cofinanciamento para ATER.</p>
<p>O acesso a assistência técnica de qualidade é um dos principais determinantes da produtividade e da adoção de boas práticas agronômicas, especialmente para pequenos e médios produtores.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/agribusiness/12/1136714/municipios-respondem-por-praticamente-metade-do-financiamento-dedicado-a-assistencia-tecnica-e-extensao-rural",
    image: IMAGES.NEWS_CREDIT_2,
    tags: ["ATER", "Municípios", "Crédito Rural"],
  },
  {
    id: 13,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    dayGroup: "26/05",
    icon: "ri-seedling-line",
    title: "Ministério da Agricultura institui Plano Inova Cacau 2030",
    summary: "A iniciativa busca promover o desenvolvimento sustentável do segmento cacaueiro com foco em pesquisa, tecnologia, acesso a novos mercados e fortalecimento da renda dos produtores.",
    content: `<p>O Ministério da Agricultura, Pecuária e Abastecimento lançou o <strong>Plano Inova Cacau 2030</strong>, uma estratégia de longo prazo para modernizar e expandir a cadeia produtiva do cacau no Brasil. O plano contempla ações nas áreas de pesquisa agronômica, transferência de tecnologia, acesso a mercados e fortalecimento das cooperativas cacaueiras.</p>
<p>O Brasil foi por décadas o maior produtor mundial de cacau, mas perdeu essa posição para Costa do Marfim e Gana após a crise da vassoura-de-bruxa nos anos 1990. O Plano Inova Cacau 2030 pretende retomar o protagonismo brasileiro no mercado global, especialmente no segmento de cacau fino e chocolates especiais, onde os preços são significativamente mais elevados.</p>
<p>Bahia, Pará e Rondônia concentram a maior parte da produção nacional. O plano prevê investimentos em sementes resistentes a doenças, sistemas agroflorestais (que combinam cacau com outras espécies), e rastreabilidade para atender às exigências do mercado europeu, que a partir de 2025 exige comprovação de desmatamento zero.</p>
<p>Para os produtores, o plano representa a oportunidade de acessar mercados premium internacionais, com preços até três vezes superiores ao cacau commodity convencional.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/mais-culturas/15/1136690/ministerio-da-agricultura-institui-plano-inova-cacau-2030",
    image: IMAGES.NEWS_HARVEST_2,
    tags: ["Cacau", "Sustentabilidade", "Exportação"],
  },
  {
    id: 14,
    date: "2026-05-26",
    dateLabel: "26 Mai 2026",
    dayGroup: "26/05",
    icon: "ri-wifi-line",
    title: "CNH e TIM investem R$ 77 milhões em conectividade rural em Minas Gerais",
    summary: "Em até 18 meses, 97 torres de telecomunicações devem conectar cerca de 1,5 milhão de hectares no estado, levando internet de qualidade ao campo e viabilizando a agricultura de precisão.",
    content: `<p>A CNH Industrial e a TIM anunciaram um investimento conjunto de <strong>R$ 77 milhões</strong> em uma iniciativa inédita de conectividade rural no estado de Minas Gerais. O projeto prevê a instalação de 97 torres de telecomunicações em áreas rurais, com capacidade para cobrir aproximadamente 1,5 milhão de hectares de terra agrícola.</p>
<p>O prazo de implantação é de até 18 meses. Quando concluído, o projeto deverá beneficiar milhares de produtores rurais, cooperativas e agroindústrias da região, habilitando o uso de tecnologias como agricultura de precisão, monitoramento remoto de lavouras, gestão digital de insumos e maquinário conectado.</p>
<p>Para a CNH, fabricante de máquinas agrícolas como New Holland e Case IH, a conectividade no campo é essencial para viabilizar os sistemas de agricultura 4.0 presentes nos seus equipamentos mais modernos — como piloto automático, telemetria e atualização remota de software.</p>
<p>Para a TIM, o projeto faz parte da estratégia de expansão para o mercado de conectividade rural (AgriTech), que deve crescer significativamente nos próximos anos com a demanda por internet de alta velocidade no interior do Brasil.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/agribusiness/12/1136571/cnh-e-tim-investem-cerca-de-rdollar-77-milhoes-em-nova-iniciativa-de-conectividade-rural",
    image: IMAGES.NEWS_GDP_3,
    tags: ["Tecnologia", "Conectividade", "Agricultura 4.0"],
  },

  // ── 27/05 ──────────────────────────────────────────────────────────────────
  {
    id: 15,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    dayGroup: "27/05",
    icon: "ri-leaf-line",
    title: "Moagem de cana no Centro-Sul dobra na 2ª quinzena de abril, aponta Unica",
    summary: "A produção de etanol avançou mais de 70% no acumulado da safra 2026/27, com crescente destinação da cana ao biocombustível em detrimento do açúcar — reflexo dos incentivos ao E32.",
    content: `<p>A moagem de cana-de-açúcar na região Centro-Sul do Brasil mais que dobrou na segunda quinzena de abril em relação ao mesmo período da safra anterior, segundo dados divulgados pela Unica (União da Indústria de Cana-de-Açúcar e Bioenergia). O avanço reflete o ritmo acelerado de abertura das usinas e condições climáticas favoráveis nas principais regiões produtoras.</p>
<p>O dado mais relevante é o crescimento da <strong>produção de etanol: mais de 70% acima no acumulado da safra 2026/27</strong>. A causa principal é a maior destinação da cana para etanol em detrimento do açúcar, movimento influenciado pelas discussões sobre o E32 e pelos preços do etanol hidratado, que têm se mantido competitivos em relação à gasolina nos postos.</p>
<p>O mix de produção — proporção de cana destinada ao açúcar versus ao etanol — é uma das decisões mais estratégicas das usinas e responde a sinais de preço em tempo real. Em maio de 2026, com o açúcar em queda no mercado internacional e o etanol aquecido internamente, a balança pende claramente para o biocombustível.</p>
<p>Para o campo, o ritmo intenso de moagem representa mais empregos temporários e maior giro econômico nas regiões canavieiras do interior paulista, goiano e sul-mato-grossense.</p>`,
    source: "UAGro",
    sourceUrl: "https://www.uagro.com.br/agricultura/moagem-de-cana-no-centro-sul-dobra-na-2a-quinzena-de-abril-aponta-unica",
    image: IMAGES.NEWS_BIOFUEL_1,
    tags: ["Cana-de-Açúcar", "Etanol", "Unica"],
  },
  {
    id: 16,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    dayGroup: "27/05",
    icon: "ri-gas-station-line",
    title: "Governo avalia renovar subvenção ao diesel na próxima semana, diz Durigan",
    summary: "O ministro da Fazenda sinalizou que o benefício de R$ 0,35 por litro deve ser mantido, mas a decisão final depende da trajetória do petróleo — tema que preocupa produtores pelo impacto no custo de frete.",
    content: `<p>O ministro da Fazenda, Guilherme Durigan, sinalizou que o governo federal deve anunciar na próxima semana a renovação da subvenção ao diesel, mantendo o benefício atual de <strong>R$ 0,35 por litro</strong>. A declaração foi feita à margem de uma conferência econômica em São Paulo e foi bem recebida pelo setor agropecuário.</p>
<p>Para o agronegócio, o preço do diesel é um dos principais componentes do custo de produção — responsável por uma parcela relevante do custo de frete, que por sua vez afeta diretamente a rentabilidade de culturas de alta tonelagem como soja, milho e cana. A renovação do benefício, portanto, representa alívio direto para produtores e cooperativas.</p>
<p>Durigan ressaltou que a decisão final dependerá da evolução do preço do petróleo no mercado internacional, que tem apresentado volatilidade nas últimas semanas em função das negociações comerciais entre EUA e China e das incertezas geopolíticas no Oriente Médio.</p>
<p>A Confederação da Agricultura e Pecuária do Brasil (CNA) e a Organização das Cooperativas Brasileiras (OCB) enviaram carta ao ministério solicitando não apenas a renovação, mas também a ampliação do benefício para R$ 0,50 por litro, o que tornaria o diesel brasileiro mais competitivo frente aos padrões internacionais.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/petroleum/13/1137825/governo-avalia-renovar-subvencao-ao-diesel-na-proxima-semana-diz-durigan",
    image: IMAGES.NEWS_OIL_2,
    tags: ["Diesel", "Subvenção", "Custo de Produção"],
  },
  {
    id: 17,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    dayGroup: "27/05",
    icon: "ri-global-line",
    title: "Alckmin afirma que Brasil retomará habilitação de exportações de proteínas à UE até setembro",
    summary: "O vice-presidente busca comprovar ao bloco europeu a eficiência das medidas sanitárias nas cadeias produtivas de carne bovina, aves e suínos — retomada que pode gerar bilhões em receitas adicionais.",
    content: `<p>O vice-presidente e ministro do Desenvolvimento, Geraldo Alckmin, afirmou que o Brasil deve retomar até setembro a habilitação de exportações de proteínas animais para a União Europeia (UE). A declaração foi feita durante reunião com representantes do setor frigorífico e da Abiec em Brasília.</p>
<p>Parte das habilitações brasileiras para exportar carne bovina, aves e suínos para o bloco europeu foi suspensa nos últimos anos por questões relacionadas ao cumprimento de critérios sanitários e de rastreabilidade exigidos pela legislação europeia. A retomada é considerada <strong>prioritária pelo governo</strong>, dado o potencial de receitas envolvido.</p>
<p>A UE é um dos mercados mais exigentes — e mais lucrativos — do mundo para exportação de proteínas. O acesso pleno ao mercado europeu representaria um incremento estimado de US$ 2 bilhões anuais nas exportações brasileiras de carne, com impacto direto na geração de renda no campo.</p>
<p>Para cumprir os requisitos europeus, o Brasil precisará demonstrar equivalência de seus sistemas de inspeção sanitária, rastreabilidade de animais e controle de uso de hormônios e antimicrobianos. O Mapa já iniciou as adequações necessárias e as primeiras auditorias europeias estão previstas para julho.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/livestock/5/1137675/alckmin-afirma-que-brasil-retomara-habilitacao-de-exportacoes-de-proteinas-a-ue-ate-setembro",
    image: IMAGES.NEWS_CATTLE_2,
    tags: ["Exportação", "União Europeia", "Proteínas"],
  },
  {
    id: 18,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    dayGroup: "27/05",
    icon: "ri-tractor-line",
    title: "Receita da indústria de máquinas recua quase 15% em abril, aponta Abimaq",
    summary: "O setor segue pressionado pela fraqueza da agropecuária e pelos juros elevados, mas as exportações registraram forte alta — sinalizando que a competitividade da indústria nacional segue firme.",
    content: `<p>A Associação Brasileira da Indústria de Máquinas e Equipamentos (Abimaq) divulgou que a receita do setor de máquinas agrícolas <strong>recuou quase 15% em abril de 2026</strong> em comparação ao mesmo mês do ano anterior. O resultado reflete a cautela dos produtores rurais diante de juros elevados, preços de commodities ainda deprimidos e custo de produção alto.</p>
<p>Apesar do desempenho negativo no mercado interno, as exportações de máquinas agrícolas registraram forte alta, sustentadas pela demanda de países da América Latina, África e Ásia. Esse dado indica que a competitividade da indústria brasileira permanece robusta no plano internacional, mesmo com dificuldades domésticas.</p>
<p>As fabricantes John Deere, AGCO e CNH reportaram queda nas emplacamentos de tratores e colhedoras no mercado nacional. A preocupação do setor é com o estoque de financiamentos no Moderfrota, programa que permite a aquisição de máquinas com juros subsidiados, mas que tem encontrado limite de recursos.</p>
<p>A Abimaq defende a ampliação do Moderfrota e a redução dos juros cobrados no programa, como forma de estimular a renovação do parque de máquinas agrícolas brasileiro, que tem média de idade elevada em relação aos padrões internacionais.</p>`,
    source: "UAGro",
    sourceUrl: "https://www.uagro.com.br/agricultura/receita-da-industria-de-maquinas-recua-quase-15-em-abril-aponta-abimaq",
    image: IMAGES.NEWS_MACHINES_2,
    tags: ["Máquinas Agrícolas", "Indústria", "Abimaq"],
  },
  {
    id: 19,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    dayGroup: "27/05",
    icon: "ri-bank-line",
    title: "Senado adia análise de projeto sobre renegociação das dívidas rurais",
    summary: "Parlamentares consideram insuficiente a proposta do governo e defendem solução mais ampla — a indefinição gera incerteza para produtores endividados e pode atrasar decisões de investimento.",
    content: `<p>O Senado Federal adiou a votação do projeto de lei que trata da renegociação de dívidas rurais, após embate entre parlamentares que consideram a proposta do governo federal insuficiente para resolver o problema estrutural do endividamento no campo.</p>
<p>O texto em análise prevê prazo de até 15 anos para pagamento das dívidas renegociadas, com desconto de até 40% nos juros acumulados. Para a bancada ruralista, a proposta é <strong>aquém do necessário</strong> diante da magnitude do endividamento, que supera R$ 120 bilhões no setor.</p>
<p>Os senadores defendem a inclusão de perdão de juros de mora e multas, além de prazo mais longo — de até 20 anos — para financiamentos de longo prazo como infraestrutura e reflorestamento. O governo, por sua vez, teme o impacto fiscal de concessões mais generosas.</p>
<p>A indefinição gera instabilidade para produtores rurais endividados, muitos dos quais aguardam a renegociação para acessar novos créditos e retomar investimentos. O impasse deve se prolongar ao menos até junho, quando o Senado retomará o calendário de votações após o recesso de Corpus Christi.</p>`,
    source: "UAGro",
    sourceUrl: "https://www.uagro.com.br/politica-setorial/senado-adia-analise-de-projeto-sobre-renegociacao-das-dividas-rurais",
    image: IMAGES.NEWS_CREDIT_3,
    tags: ["Dívidas Rurais", "Senado", "Crédito"],
  },
  {
    id: 20,
    date: "2026-05-27",
    dateLabel: "27 Mai 2026",
    dayGroup: "27/05",
    icon: "ri-plant-line",
    title: "Ministério da Agricultura lança campanha de orgânicos",
    summary: "A iniciativa integra governo e redes de produção orgânica na implementação de políticas públicas voltadas à sustentabilidade e à alimentação saudável, com foco em ampliar o acesso e o mercado interno.",
    content: `<p>O Ministério da Agricultura, Pecuária e Abastecimento lançou uma campanha nacional de valorização e promoção dos orgânicos brasileiros. A iniciativa integra o governo federal, cooperativas de agricultores orgânicos, redes de varejo e organizações de consumidores, com o objetivo de ampliar o acesso a alimentos orgânicos e fortalecer o mercado interno.</p>
<p>O Brasil possui a terceira maior área certificada de agricultura orgânica do mundo, com mais de 26 milhões de hectares. No entanto, o mercado interno de orgânicos ainda é incipiente — a maior parte da produção é destinada à exportação.</p>
<p>A campanha prevê ações de educação nutricional nas escolas, incentivo ao consumo via programas de compras governamentais (como o PNAE e o PAA) e apoio à certificação de produtores familiares, cujo processo de transição para o orgânico ainda é financeiramente oneroso.</p>
<p>Para os produtores, o orgânico representa uma oportunidade de <strong>diferenciação e maior rentabilidade</strong>: os preços dos alimentos orgânicos são, em média, 30% a 50% superiores aos convencionais nos mercados varejistas.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/mais-culturas/15/1137683/ministerio-da-agricultura-lanca-campanha-de-organicos",
    image: IMAGES.NEWS_SEEDS_1,
    tags: ["Orgânicos", "Sustentabilidade", "Mercado Interno"],
  },

  // ── 28/05 ──────────────────────────────────────────────────────────────────
  {
    id: 21,
    date: "2026-05-28",
    dateLabel: "28 Mai 2026",
    dayGroup: "28/05",
    icon: "ri-bank-line",
    title: "Câmara aprova projeto que reformula seguro rural",
    summary: "A proposta prevê redução nas taxas de juros e criação de fundo com recursos públicos para cobrir sinistros. A matéria retorna ao Senado e, se aprovada, pode ampliar significativamente a cobertura do setor.",
    content: `<p>A Câmara dos Deputados aprovou o projeto de lei que reformula o modelo de seguro rural brasileiro. A proposta prevê a criação de um <strong>fundo público de garantia de sinistros</strong>, redução nas taxas de juros cobradas nas apólices e ampliação das culturas e regiões elegíveis ao seguro subsidiado.</p>
<p>O texto segue agora para análise do Senado, que deve apreciar a matéria nas próximas semanas. Se aprovado e sancionado, o novo modelo pode ampliar significativamente a cobertura do seguro rural no Brasil — atualmente, apenas cerca de 15% das propriedades agrícolas têm algum tipo de proteção securitária.</p>
<p>Para o setor, a reformulação é urgente: o Brasil é altamente vulnerável a eventos climáticos extremos (secas, geadas, chuvas excessivas), e a baixa cobertura de seguro amplifica o impacto de perdas nas safras. Países como EUA e União Europeia têm cobertura de seguro rural acima de 80%.</p>
<p>A proposta também prevê a criação de um sistema de resseguro rural nacional, o que tornaria o mercado mais sólido e atrairia mais seguradoras privadas para o setor. A expectativa é de que, com o novo modelo, o número de apólices emitidas por ano dobre em 5 anos.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/agribusiness/12/1138436/camara-aprova-projeto-que-reformula-seguro-rural",
    image: IMAGES.NEWS_CREDIT_1,
    tags: ["Seguro Rural", "Câmara", "Política Agrícola"],
  },
  {
    id: 22,
    date: "2026-05-28",
    dateLabel: "28 Mai 2026",
    dayGroup: "28/05",
    icon: "ri-seedling-line",
    title: "Vazio sanitário da soja começa na próxima segunda-feira (1º) em SP",
    summary: "A medida visa prevenir e controlar a ferrugem asiática. Produtores paulistas devem cumprir o calendário oficial e suspender o plantio durante o período determinado, sob risco de multas.",
    content: `<p>O vazio sanitário da soja em São Paulo terá início na próxima segunda-feira, dia 1º de junho, conforme calendário oficial definido pelo Ministério da Agricultura e pela Secretaria de Agricultura e Abastecimento do Estado (SAA-SP). Durante o período de vazio, fica proibido o plantio e a manutenção de plantas voluntárias de soja em todo o território paulista.</p>
<p>O objetivo é <strong>interromper o ciclo biológico da ferrugem asiática</strong> (Phakopsora pachyrhizi), doença que pode causar perdas de até 80% na produção de soja quando não controlada adequadamente. O período sem a presença do hospedeiro (a planta de soja) reduz drasticamente a população do fungo no campo.</p>
<p>São Paulo não é o maior produtor de soja do Brasil — esse título pertence ao Mato Grosso — mas é um estado importante na cadeia de comercialização e processamento da oleaginosa. O cumprimento do vazio sanitário é fiscalizado pelo Instituto Biológico e pela Defesa Agropecuária Estadual (DEMA).</p>
<p>Produtores que descumprirem o vazio sanitário estão sujeitos a multas e podem ter suas propriedades interditadas para plantio na safra seguinte. A Aprosoja-SP recomenda que todos os produtores eliminem plantas voluntárias de soja e resíduos de colheita antes do prazo.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/soy/10/1138883/vazio-sanitario-da-soja-comeca-na-proxima-segunda-feira-1o-em-sp",
    image: IMAGES.NEWS_SOY_CRUSH_1,
    tags: ["Soja", "Sanidade", "São Paulo"],
  },
  {
    id: 23,
    date: "2026-05-28",
    dateLabel: "28 Mai 2026",
    dayGroup: "28/05",
    icon: "ri-leaf-line",
    title: "Citricultura: resolução estabelece novos critérios para controle do greening em SP",
    summary: "As medidas visam reduzir a incidência do HLB nos municípios de maior impacto econômico, reforçando a vigilância fitossanitária e as exigências de manejo integrado nos pomares paulistas.",
    content: `<p>O estado de São Paulo publicou nova resolução estabelecendo critérios mais rigorosos para a prevenção e o controle do greening (HLB — Huanglongbing) nos pomares de citros. A doença, causada pela bactéria Candidatus Liberibacter asiaticus e transmitida pelo psilídeo Diaphorina citri, não tem cura e representa a maior ameaça fitossanitária à citricultura mundial.</p>
<p>A resolução, elaborada em conjunto pelo Instituto Agronômico de Campinas (IAC), pelo Fundecitrus e pela Secretaria de Agricultura do Estado, define <strong>novos protocolos de inspeção e tratamento</strong> para as regiões de Araraquara, Bebedouro e Limeira — os principais polos citrícolas paulistas.</p>
<p>Entre as medidas previstas estão: obrigatoriedade de inspeção trimestral de todos os pomares acima de 5 hectares, aplicação preventiva de inseticidas nos pontos de maior pressão do psilídeo, e remoção imediata de plantas sintomáticas mediante protocolo oficial.</p>
<p>São Paulo é responsável por cerca de 70% da produção nacional de laranjas e é o maior polo exportador de suco de laranja concentrado do mundo. A expansão do greening nos últimos anos tem preocupado o setor, que investe pesado em pesquisa para identificar variedades tolerantes à doença.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/orange/7/1138576/citricultura-resolucao-estabelece-novos-criterios-e-procedimentos-para-prevencao-e-controle-do-greening-em-sp",
    image: IMAGES.NEWS_HARVEST_1,
    tags: ["Citros", "Greening", "Fitossanidade"],
  },
  {
    id: 24,
    date: "2026-05-28",
    dateLabel: "28 Mai 2026",
    dayGroup: "28/05",
    icon: "ri-plant-line",
    title: "Câmara aprova R$ 10 bilhões em subsídios para novas fábricas de fertilizantes",
    summary: "O texto aprovado incentiva a instalação de novas unidades produtoras de fertilizantes no Brasil, estratégia para reduzir a dependência de importações que hoje superam 80% do consumo nacional.",
    content: `<p>A Câmara dos Deputados aprovou projeto de lei que prevê <strong>R$ 10 bilhões em subsídios fiscais</strong> para incentivar a instalação de novas fábricas de fertilizantes no Brasil. O texto foi alterado pelos deputados e retorna ao Senado para apreciação antes de seguir para sanção presidencial.</p>
<p>A iniciativa é considerada estratégica para o agronegócio brasileiro: atualmente, o país importa mais de 80% dos fertilizantes que consome, com forte dependência de Rússia, China e Marrocos. A guerra na Ucrânia e as tensões comerciais globais escancararam a vulnerabilidade dessa dependência, impulsionando os preços dos insumos a patamares recordes em 2022 e 2023.</p>
<p>O projeto prevê benefícios fiscais como isenção de IPI, redução de ICMS estadual (a ser negociado em convênio com os estados) e crédito presumido de PIS/Cofins para empresas que instalarem novas plantas produtoras de amônia, ureia, fosfato e potássio no Brasil.</p>
<p>O impacto esperado é a atração de pelo menos 5 novos complexos fertilizantes nos próximos 10 anos, com investimento total estimado em R$ 80 bilhões e geração de mais de 15.000 empregos diretos nas regiões produtoras de minério e petróleo.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/fertilizers/16/1138439/camara-aprova-rdollar-10-bilhoes-em-subsidios-para-incentivar-novas-fabricas-de-fertilizantes",
    image: IMAGES.NEWS_FERTILIZER_2,
    tags: ["Fertilizantes", "Câmara", "Soberania"],
  },
  {
    id: 25,
    date: "2026-05-28",
    dateLabel: "28 Mai 2026",
    dayGroup: "28/05",
    icon: "ri-user-line",
    title: "Agro fecha abril com corte de 8,3 mil vagas formais, aponta Caged",
    summary: "A desmobilização nas lavouras de soja e laranja puxou o resultado negativo, mas no acumulado de 2026 o setor ainda registra saldo positivo de empregos — sinal de que a retração é sazonal.",
    content: `<p>O agronegócio brasileiro fechou o mês de abril de 2026 com <strong>saldo negativo de 8.305 vagas formais</strong>, segundo dados do Cadastro Geral de Empregados e Desempregados (Caged), divulgados pelo Ministério do Trabalho e Emprego. O resultado reflete a desmobilização típica do pós-colheita de soja e o fim da safra de laranja no estado de São Paulo.</p>
<p>Apesar do dado negativo pontual, o saldo acumulado de 2026 (janeiro a abril) ainda é positivo, com criação líquida de 42.000 empregos formais no setor agrícola e agroindustrial. Isso indica que a retração de abril tem caráter sazonal e não representa deterioração estrutural do emprego no campo.</p>
<p>Os estados com maior redução de vagas em abril foram São Paulo (-3.200), Minas Gerais (-1.800) e Mato Grosso do Sul (-900). Em contrapartida, Mato Grosso e Pará registraram crescimento de empregos, impulsionados pelo início da colheita de milho safrinha e expansão das atividades pecuárias.</p>
<p>Para maio e junho, a expectativa é de retomada na geração de empregos no setor, com o início das safras de cana e café em várias regiões, além da expansão das obras de silos e armazéns rurais para receber a produção de grãos.</p>`,
    source: "UAGro",
    sourceUrl: "https://www.uagro.com.br/politica-setorial/agro-fecha-abril-com-corte-de-83-mil-vagas-formais-aponta-caged",
    image: IMAGES.NEWS_GDP_2,
    tags: ["Emprego", "Caged", "Mercado de Trabalho"],
  },
  {
    id: 26,
    date: "2026-05-28",
    dateLabel: "28 Mai 2026",
    dayGroup: "28/05",
    icon: "ri-bar-chart-line",
    title: "Setor de fertilizantes especiais recua 5,5% em 2025",
    summary: "O segmento encerrou o ano passado com faturamento de R$ 25,4 bilhões, pressionado pela expansão dos genéricos e pela queda nos preços internacionais de matérias-primas.",
    content: `<p>O setor brasileiro de fertilizantes especiais — que inclui bioestimulantes, fertilizantes foliares, organominerais e produtos de eficiência aprimorada — <strong>recuou 5,5% em faturamento em 2025</strong>, encerrando o ano com receita de R$ 25,4 bilhões, segundo balanço setorial divulgado pela Associação Brasileira das Indústrias de Tecnologia em Nutrição Vegetal (Anda).</p>
<p>A queda é atribuída a dois fatores principais: a expansão de produtos genéricos (de menor custo e menor valor agregado) e a redução nos preços internacionais de matérias-primas como o fosfato, que também impactou os preços dos produtos especiais ao longo da cadeia.</p>
<p>Apesar do recuo em 2025, o setor mantém perspectiva de crescimento no médio prazo. A demanda por fertilizantes de maior eficiência — que permitem reduzir doses sem perda de produtividade — tende a crescer com o avanço da agricultura de precisão e as pressões por redução do uso de agroquímicos.</p>
<p>Para 2026, as empresas do setor projetam retomada, com lançamento de novos produtos biológicos e maior integração com plataformas digitais de recomendação nutricional.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://portal.datagro.com/pt/fertilizers/16/1138486/setor-de-fertilizantes-especiais-recua-55-em-2025",
    image: IMAGES.NEWS_FERTILIZER_3,
    tags: ["Fertilizantes", "Insumos", "Mercado"],
  },
  {
    id: 27,
    date: "2026-05-28",
    dateLabel: "28 Mai 2026",
    dayGroup: "28/05",
    icon: "ri-microscope-line",
    title: "24% dos tomadores de decisão do agro desconhecem o conceito de agricultura tropical",
    summary: "Campanha da CropLife busca ampliar a compreensão sobre as especificidades produtivas do agro brasileiro e valorizar as soluções desenvolvidas especificamente para o clima tropical.",
    content: `<p>Uma pesquisa inédita encomendada pela CropLife Brasil revelou que <strong>24% dos tomadores de decisão do agronegócio brasileiro</strong> — incluindo diretores de cooperativas, gestores de fazendas e executivos do agribusiness — desconhecem ou têm conhecimento superficial sobre o conceito de agricultura tropical e suas implicações para o desenvolvimento de tecnologias agropecuárias.</p>
<p>O dado motivou o lançamento da campanha "O que é que só o Brasil tem?", que busca ampliar a compreensão sobre as especificidades do Brasil como potência tropical — solos ácidos, clima diversificado, biodiversidade única e alta incidência de pragas e doenças tropicais — e valorizar as soluções de proteção de plantas e nutrição desenvolvidas especificamente para esse contexto.</p>
<p>A campanha será veiculada em mídias digitais, eventos do agro e veículos especializados durante o segundo semestre de 2026. Um dos focos é desmistificar a ideia de que tecnologias desenvolvidas em países de clima temperado são automaticamente aplicáveis ao Brasil.</p>
<p>Para o setor, investir em pesquisa e desenvolvimento de soluções tropicais é uma das principais vantagens competitivas do agronegócio brasileiro — e um diferencial que precisa ser mais bem comunicado tanto internamente quanto para mercados importadores.</p>`,
    source: "DATAGRO",
    sourceUrl: "https://www.datagro.com",
    image: IMAGES.NEWS_SEEDS_2,
    tags: ["Tecnologia", "Pesquisa", "Agro Tropical"],
  },
];

// Grupos por dia para renderização por data
export const dayGroups = ["28/05", "27/05", "26/05", "25/05"];

export const getNewsByDay = (day: string): WeekNewsItem[] =>
  weekNewsItems.filter((n) => n.dayGroup === day);
