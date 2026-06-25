// ─────────────────────────────────────────────────────────────
// 2025 글로벌 식량위기 대응사업 — 국가/사업 단일 데이터 소스 (Single Source of Truth)
// 표(ProjectTable)·지도(ImpactMap)·그래프(DistributionCharts)·국가 그리드(CountryGrid)가
// 모두 이 파일에서 파생됩니다. 국가별 수치는 여기 한 곳에서만 수정하세요.
//   · 금액: USD  · 식량/치료식: 톤  · 환율 $1 = 1,330원
//   · food/ther/cash/val = 실적(한국기여분 누적, 결과보고 Pivot 기준)
//   · beneficiaries(총 수혜자)·korea(한국 기여분 수혜자)·plannedTons = 계획(제안서) 기준
//   · activities: food(일반식량) · cash(현금·교환권) · nutrition(영양치료식) · school(학교급식) · livelihood(생계)
//   · 정렬: 식량 배분량(실적) 내림차순 → 현금 전용국 → 생계 사업
// ─────────────────────────────────────────────────────────────

export const COUNTRIES = [
  {
    ko: '콩고민주공화국', countryEn: 'DR Congo', chartName: 'DR 콩고',
    en: 'DR Congo · S. Kivu, Tanganyika, Kasai', region: '남부키부 · 탕가니카 · 카사이',
    activities: ['food', 'nutrition', 'livelihood'],
    projects: [
      { site: '남부키부 (South Kivu)', siteEn: 'South Kivu', title: 'DRC South Kivu Integrated Food Assistance 2025', lat: -2.50, lng: 28.90, food: 3088.2, ther: 74.9, cash: 0, val: 5050516, beneficiaries: 152882, korea: 37522, plannedTons: 3488, pbas: '223847' }, // val·총사업비 재무보고(WFP REPORT·Korea) 반영
      { site: '탕가니카 (Tanganyika)', siteEn: 'Tanganyika', title: 'DRC Tanganyika General Food Distribution (식량 배분) & Nutrition 2025', lat: -6.00, lng: 29.70, food: 632.6, ther: 0, cash: 0, val: 1093743, beneficiaries: 77122, korea: 15503, plannedTons: 1549, pbas: '223796' },
      { site: '카사이 · 루이자 (Kasai · Luiza)', siteEn: 'Kasai · Luiza', title: 'DRC Kasai Luiza Nutrition 2025', lat: -5.90, lng: 22.40, food: 76.2, ther: 76.2, cash: 0, val: 344228, beneficiaries: 66367, korea: 12207, plannedTons: 37, pbas: '224041' },
    ],
  },
  {
    ko: '수단', countryEn: 'Sudan',
    en: 'Sudan · S. Darfur, S. Kordofan, White Nile', region: '남다르푸르 · 남코르도판 · 백나일',
    activities: ['food', 'cash', 'nutrition'],
    projects: [
      { site: '남다르푸르 (통합 식량지원)', siteEn: 'South Darfur (Integrated Food Assistance)', title: 'South Darfur Integrated Food Assistance Project', lat: 11.00, lng: 24.90, food: 2276.3, ther: 15.3, cash: 0, val: 3121934, beneficiaries: 475967, korea: 40945, plannedTons: 3168, pbas: '223711' },
      { site: '남코르도판', siteEn: 'South Kordofan', title: 'South Kordofan Integrated Food Assistance Project', lat: 12.20, lng: 30.20, food: 1025.7, ther: 16.0, cash: 324428, val: 834107, beneficiaries: 249491, korea: 27339, plannedTons: 1624, pbas: '223710' }, // 식량가치 재무보고(WFP REPORT·Korea) 반영
      { site: '남다르푸르 (영양)', siteEn: 'South Darfur (Nutrition)', title: 'South Darfur Community Nutrition Project', lat: 11.10, lng: 24.95, food: 20.1, ther: 20.1, cash: 0, val: 82059, beneficiaries: 33432, korea: 6636, plannedTons: 80, pbas: '223745' },
      { site: '백나일 (White Nile)', siteEn: 'White Nile', title: 'White Nile Integrated Food Assistance Project', lat: 13.05, lng: 32.55, food: 0, ther: 0, cash: 0, val: 0, beneficiaries: 0, korea: 0, plannedTons: 5320, pbas: '223856', note: '현지 정부 승인 지연으로 사업 미진행' },
    ],
  },
  {
    ko: '아프가니스탄', countryEn: 'Afghanistan',
    en: 'Afghanistan · Ghor, Badghis', region: '고르 · 바드기스',
    activities: ['food', 'cash', 'nutrition'],
    projects: [
      { site: '고르 · 바드기스', siteEn: 'Ghor · Badghis', title: 'General Food and Cash Assistance (Badghis & Ghor)', lat: 34.50, lng: 65.30, food: 829.3, ther: 65.7, cash: 173877, val: 446505, beneficiaries: 377734, korea: 30285, plannedTons: 1284, pbas: '223255' },
    ],
  },
  {
    ko: '에티오피아', countryEn: 'Ethiopia',
    en: 'Ethiopia · Tigray, Afar, Amhara', region: '티그라이 · 아파르 · 암하라',
    activities: ['food', 'nutrition'],
    projects: [
      { site: '티그라이 · 아파르 · 암하라', siteEn: 'Tigray · Afar · Amhara', title: 'Tigray, Afar, Amhara Nutrition Project', lat: 13.50, lng: 39.50, food: 695.8, ther: 695.8, cash: 0, val: 2416084, beneficiaries: 84390, korea: 28556, plannedTons: 524, pbas: '223707' },
    ],
  },
  {
    ko: '우간다', countryEn: 'Uganda',
    en: 'Uganda · Bidibidi, Lobule', region: '비디비디 · 로불레',
    activities: ['food', 'cash', 'nutrition'],
    projects: [
      { site: '비디비디 · 로불레', siteEn: 'Bidibidi · Lobule', title: 'Uganda GFA & Nutrition Project', lat: 3.42, lng: 31.40, food: 505.0, ther: 33.6, cash: 558117, val: 679772, beneficiaries: 483091, korea: 50020, plannedTons: 1598, pbas: '223766' },
    ],
  },
  {
    ko: '베네수엘라', countryEn: 'Venezuela',
    en: 'Venezuela · Zulia, Falcón +2', region: '줄리아 · 팔콘 외',
    activities: ['food', 'school'],
    projects: [
      { site: '줄리아 · 팔콘 외', siteEn: 'Zulia · Falcón +2', title: 'School Feeding Program in Venezuela 2025', lat: 10.40, lng: -72.00, food: 475.5, ther: 0, cash: 0, val: 605800, beneficiaries: 77939, korea: 17004, plannedTons: 1355, pbas: '223806' },
    ],
  },
  {
    ko: '남수단', countryEn: 'South Sudan',
    en: 'South Sudan · Fashoda, Renk, Juba', region: '파쇼다 · 렌크 · 주바',
    activities: ['food', 'cash', 'nutrition', 'school', 'livelihood'],
    projects: [
      { site: '파쇼다 · 파니캉', siteEn: 'Fashoda · Panyikang', title: 'Fashoda and Panyikang FA Project', lat: 10.00, lng: 32.00, food: 301.1, ther: 0.5, cash: 397930, val: 518775, beneficiaries: 63970, korea: 21065, plannedTons: 621, pbas: '223756' },
      { site: '렌크 · 마뇨', siteEn: 'Renk · Manyo', title: 'Renk and Manyo Food Assistance Project', lat: 11.75, lng: 32.80, food: 81.2, ther: 0, cash: 0, val: 136514, beneficiaries: 43370, korea: 4620, plannedTons: 103, pbas: '223758' }, // val·총사업비 재무보고(WFP REPORT·Korea) 반영
      { site: '주바 · 얌비오 (자립형 학교급식)', siteEn: 'Juba · Yambio', title: 'Juba and Yambio School Feeding and Nutrition Project', lat: 4.85, lng: 31.60, food: 29.6, ther: 0, cash: 141103, val: 253929, beneficiaries: 47468, korea: 5678, plannedTons: 33, pbas: '223753' },
    ],
  },
  {
    ko: '차드', countryEn: 'Chad',
    en: 'Chad · Farchana +5 (학교 급식)', region: '파르차나 외 · 학교급식',
    activities: ['food', 'cash', 'school'],
    projects: [
      { site: '파르차나 외 5개 지역 (긴급 학교급식 ESF)', siteEn: 'Farchana +5', title: 'Eastern Chad Emergency School Feeding 2025', lat: 13.60, lng: 22.00, food: 198.5, ther: 0, cash: 15941, val: 278368, beneficiaries: 79140, korea: 23041, plannedTons: 347, pbas: '223850' },
    ],
  },
  {
    ko: '방글라데시', countryEn: 'Bangladesh',
    en: "Bangladesh · Cox's Bazar (현금)", region: '콕스바자르 · 현금 전용',
    activities: ['cash'],
    projects: [
      { site: '콕스바자르 (전자바우처 E-Voucher)', siteEn: "Cox's Bazar", title: "Food Assistance via e-vouchers (Cox's Bazar)", lat: 21.43, lng: 92.00, food: 0, ther: 0, cash: 1885961, val: 17, beneficiaries: 209761, korea: 12880, plannedTons: 2, pbas: '223748' },
    ],
  },
  {
    ko: '콜롬비아', countryEn: 'Colombia',
    en: 'Colombia · Valle del Cauca (현금)', region: '바예델카우카 · 현금 전용',
    activities: ['cash'],
    projects: [
      { site: '바예델카우카', siteEn: 'Valle del Cauca', title: 'Valle Del Cauca Cash Transfer (현금 및 바우처 배분) & Capacity Building', lat: 3.40, lng: -76.50, food: 0, ther: 0, cash: 1456689, val: 0, beneficiaries: 15635, korea: 10132, plannedTons: 0, pbas: '223799' },
    ],
  },
  {
    ko: '중앙아프리카공화국', countryEn: 'CAR', chartName: '중앙아프리카',
    en: 'CAR · Bambari, Bouar (생계)', region: '밤바리 · 부아르 · 생계',
    activities: ['cash', 'livelihood'],
    projects: [
      { site: '밤바리 · 부아르 (생계 역량 강화 및 자산 조성 기회 제공)', siteEn: 'Bambari · Bouar', title: 'CAR Resilience Programme 2025', lat: 5.70, lng: 20.70, food: 0, ther: 0, cash: 87318, val: 0, beneficiaries: 26630, korea: 3277, plannedTons: 0, pbas: '223999' },
    ],
  },
  {
    ko: '미얀마', countryEn: 'Myanmar',
    en: 'Myanmar · Northern Shan (긴급 현금)', region: '북부 샨 · 긴급 현금',
    activities: ['cash'],
    projects: [
      { site: '북부 샨 (긴급 현금)', siteEn: 'Northern Shan', title: 'Northern Shan Emergency Relief Assistance Project', lat: 22.50, lng: 97.50, food: 0, ther: 0, cash: 64616, val: 0, beneficiaries: 7000, korea: 7000, plannedTons: 0, pbas: '223982' },
    ],
  },
  {
    ko: '케냐', countryEn: 'Kenya', livelihood: true,
    en: 'Kenya · Makueni, Kitui', region: '마쿠에니 · 키투이',
    activities: ['livelihood'],
    projects: [
      { site: '마쿠에니 · 키투이 (마을저축그룹 · 작물보험)', siteEn: 'Makueni · Kitui', title: 'Sustainable Food Systems Project', lat: -1.80, lng: 37.60, food: 0, ther: 0, cash: 0, val: 0, beneficiaries: 64080, korea: 64080, plannedTons: 0, pbas: '223864', note: '저축그룹 운영비 및 가축 구입 등 생계 역량 강화 활동 사업비' },
    ],
  },
]

// ─── 사업 재무보고 (USD) ──────────────────────────────────────
// match = 한국(WV) 매칭금(자기부담) · wfpIncome = WFP 실제 수입 인식액(Actual Income to WVK)
// 표기 '총 사업비'는 WFP 기여분(wfpIncome) 기준(전체 약 336억). match는 레버리지 매칭 시드(합산하지 않음). 출처: 사업 재무보고 표(2026-06). 배분 실적(food/cash/val)과는 별개.
const FINANCE = {
  '223255': { match: 29805,  wfpIncome: 1541046 },
  '223748': { match: 10000,  wfpIncome: 1908676 },
  '223999': { match: 21477,  wfpIncome: 134502  },
  '223850': { match: 75000,  wfpIncome: 526717  },
  '223799': { match: 71092,  wfpIncome: 1498389 },
  '223796': { match: 20959,  wfpIncome: 1155857 },
  '223847': { match: 152358, wfpIncome: 5216567 }, // 재무보고(WFP REPORT·Korea, Actual PBAS Commitment) 기준
  '224041': { match: 30000,  wfpIncome: 419395  },
  '223707': { match: 158468, wfpIncome: 2936901 },
  '223864': { match: 23128,  wfpIncome: 145554  },
  '223982': { match: 16248,  wfpIncome: 72795   },
  '223756': { match: 75312,  wfpIncome: 1112107 },
  '223758': { match: 12528,  wfpIncome: 152335  }, // 재무보고(WFP REPORT·Korea, Actual PBAS Commitment) 기준
  '223753': { match: 38715,  wfpIncome: 482356  },
  '223745': { match: 18496,  wfpIncome: 151245  },
  '223710': { match: 27362,  wfpIncome: 1210048 },
  '223711': { match: 22047,  wfpIncome: 3163735 },
  '223856': { match: 29210,  wfpIncome: 0       },
  '223766': { match: 157554, wfpIncome: 1442610 },
  '223806': { match: 60000,  wfpIncome: 2021955 },
}

// 국가 합계 (사업 단위 합산) — 식량·치료식은 소수 1자리로 정리
export function countryTotals(c) {
  const t = c.projects.reduce(
    (a, p) => ({ food: a.food + p.food, ther: a.ther + p.ther, cash: a.cash + p.cash, foodVal: a.foodVal + p.val }),
    { food: 0, ther: 0, cash: 0, foodVal: 0 }
  )
  return {
    food: Math.round(t.food * 10) / 10,
    ther: Math.round(t.ther * 10) / 10,
    cash: t.cash,
    foodVal: t.foodVal,
  }
}

// 국가 계획치 합산 (제안서 기준) — 수혜자(총/한국)·계획 톤수
export function countryPlanned(c) {
  return c.projects.reduce(
    (a, p) => ({
      beneficiaries: a.beneficiaries + (p.beneficiaries || 0),
      korea: a.korea + (p.korea || 0),
      plannedTons: a.plannedTons + (p.plannedTons || 0),
    }),
    { beneficiaries: 0, korea: 0, plannedTons: 0 }
  )
}

// 국가 재무 합계 — 사업별 match/wfpIncome 합산 → 한국 기여금·WFP 기여금·총 사업비(USD)
export function countryFinance(c) {
  return c.projects.reduce((a, p) => {
    const f = FINANCE[p.pbas] || { match: 0, wfpIncome: 0 }
    return { match: a.match + f.match, wfpIncome: a.wfpIncome + f.wfpIncome, total: a.total + f.match + f.wfpIncome }
  }, { match: 0, wfpIncome: 0, total: 0 })
}

// 전체 사업 평탄화 (지도용) — 각 사업에 국가명 부착
export const ALL_PROJECTS = COUNTRIES.flatMap((c) =>
  c.projects.map((p) => ({ ...p, country: c.ko, countryEn: c.countryEn }))
)

// 배분 실적 공식 합계 (그랜드 토탈 — 보고서 확정 수치)
export const TOTALS = { food: 10235.1, foodVal: 15862351, cash: 5105980, ther: 998.1 }
