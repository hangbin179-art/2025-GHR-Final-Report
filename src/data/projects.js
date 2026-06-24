// ===========================================================================
// 2025 World Vision x WFP — Global Food Crisis Response
// Project dataset (13 countries / 20 projects)
//
// SOURCE: "2025 글로벌 식량위기 대응사업(WFP 협력사업)" 제안서(2025.03) +
//         중간보고서(2025.12). Figures below are the planning + interim-report
//         numbers from those decks.
//
// EDITING NOTES (for when finalized actuals arrive):
//   • Monetary fields (wvSupport, wfpGrant, foodValue, cashValue) are in 천원
//     (thousand KRW), matching the report tables. Helpers in lib/format.js
//     convert to 억원 / 원 / USD.
//   • `pbas` numbers are PLACEHOLDERS — replace with the real PBAS codes.
//   • `activities` flags for food/cash/nutrition are taken from the interim
//     report activity slides; school/livelihood are inferred and should be
//     confirmed. Flip booleans freely.
//   • `progress` holds CUMULATIVE RESULT actuals (결과보고 누적, 2026.06):
//     foodActualTons/foodPct, cashActualKRW(원)/cashPct, cashActualUSD,
//     foodActualUSD, nutritionKg — all WV-contribution share. Source: the
//     "결과보고 누적" Excel sheet. % can exceed 100 (honest overshoot).
//   • `photos: []` — drop field-photo URLs/paths here; the gallery renders
//     graceful placeholders while empty. Shape: { src, caption } or a string.
//   • `coords` are approximate region centroids [lat, lng] for map markers.
// ===========================================================================

export const ACTIVITY_KEYS = ['food', 'cash', 'nutrition', 'school', 'livelihood']

export const PROJECTS = [
  {
    id: 'afghanistan-ghor',
    pbas: 'PBAS-AFG-01',
    pbasNum: 223255,
    country: '아프가니스탄',
    countryEn: 'Afghanistan',
    region: '고르, 바드기스',
    regionEn: 'Ghor, Badghis',
    coords: [34.5, 64.8],
    beneficiaries: 30285,
    wvSupport: 39641,
    wfpGrant: 1509927,
    foodTons: 1284,
    foodValue: 1154693,
    cashValue: 204277,
    activities: { food: true, cash: true, nutrition: true, school: false, livelihood: false },
    progress: { foodActualTons: 829.3, foodPct: 64.6, cashActualKRW: 231256000, cashPct: 113.2, cashActualUSD: 173877, foodActualUSD: 446505, nutritionKg: 65714.5 },
    photos: [],
  },
  {
    id: 'bangladesh-coxsbazar',
    pbas: 'PBAS-BGD-01',
    pbasNum: 223748,
    country: '방글라데시',
    countryEn: 'Bangladesh',
    region: '콕스바자르 (로힝야 난민캠프)',
    regionEn: "Cox's Bazar (Rohingya camp)",
    coords: [21.45, 92.0],
    beneficiaries: 12880,
    wvSupport: 13300,
    wfpGrant: 2732210,
    foodTons: 1.72,
    foodValue: 1838,
    cashValue: 2696474,
    activities: { food: true, cash: true, nutrition: true, school: false, livelihood: false },
    progress: { foodActualTons: 0.02, foodPct: 1.0, cashActualKRW: 2508328000, cashPct: 93.0, cashActualUSD: 1885961, foodActualUSD: 17, nutritionKg: 17.5 },
    note: '2025년 USAID 폐지로 사업 규모 축소 및 진행 차질',
    photos: [],
  },
  {
    id: 'car-bambari',
    pbas: 'PBAS-CAF-01',
    pbasNum: 223999,
    country: '중앙아프리카공화국',
    countryEn: 'Central African Republic',
    region: '밤바리, 부아르',
    regionEn: 'Bambari, Bouar',
    coords: [5.8, 18.0],
    beneficiaries: 3277,
    wvSupport: 28564,
    wfpGrant: 239003,
    foodTons: 0,
    foodValue: 0,
    cashValue: 128192,
    activities: { food: false, cash: true, nutrition: false, school: false, livelihood: true },
    progress: { cashActualKRW: 116133000, cashPct: 90.6, cashActualUSD: 87318 },
    note: '하반기 본격 배분 — 누적 현금지원 90.6% 달성',
    photos: [],
  },
  {
    id: 'chad-farchana',
    pbas: 'PBAS-TCD-01',
    pbasNum: 223850,
    country: '차드',
    countryEn: 'Chad',
    region: '파르차나, 게레다 외 4개 지역',
    regionEn: 'Farchana, Guéréda +4',
    coords: [13.5, 21.8],
    beneficiaries: 23041,
    wvSupport: 99750,
    wfpGrant: 643870,
    foodTons: 347,
    foodValue: 321449,
    cashValue: 22067,
    activities: { food: true, cash: true, nutrition: false, school: true, livelihood: true },
    progress: { foodActualTons: 198.5, foodPct: 57.2, cashActualKRW: 21202000, cashPct: 96.1, cashActualUSD: 15941, foodActualUSD: 278368 },
    photos: [],
  },
  {
    id: 'colombia-valledelcauca',
    pbas: 'PBAS-COL-01',
    pbasNum: 223799,
    country: '콜롬비아',
    countryEn: 'Colombia',
    region: '바예 데 카우카',
    regionEn: 'Valle del Cauca',
    coords: [3.8, -76.5],
    beneficiaries: 10132,
    wvSupport: 94552,
    wfpGrant: 1352716,
    foodTons: 0,
    foodValue: 0,
    cashValue: 1189182,
    activities: { food: false, cash: true, nutrition: false, school: false, livelihood: true },
    progress: { cashActualKRW: 1937397000, cashPct: 162.9, cashActualUSD: 1456689 },
    note: '계획 대비 현금지원 162.9% — 대상 확대로 초과 달성',
    photos: [],
  },
  {
    id: 'drc-tanganyika',
    pbas: 'PBAS-COD-01',
    pbasNum: 223796,
    country: '콩고민주공화국',
    countryEn: 'DR Congo',
    region: '탕가니카',
    regionEn: 'Tanganyika',
    coords: [-6.0, 28.5],
    beneficiaries: 15503,
    wvSupport: 27875,
    wfpGrant: 2964386,
    foodTons: 1549,
    foodValue: 2893475,
    cashValue: 0,
    activities: { food: true, cash: false, nutrition: false, school: false, livelihood: false },
    progress: { foodActualTons: 632.6, foodPct: 40.8, foodActualUSD: 1093743 },
    photos: [],
  },
  {
    id: 'drc-southkivu',
    pbas: 'PBAS-COD-02',
    pbasNum: 223847,
    country: '콩고민주공화국',
    countryEn: 'DR Congo',
    region: '남부 키부',
    regionEn: 'South Kivu',
    coords: [-2.5, 28.8],
    beneficiaries: 37522,
    wvSupport: 95849,
    wfpGrant: 8306807,
    foodTons: 3488,
    foodValue: 8050918,
    cashValue: 0,
    activities: { food: true, cash: false, nutrition: true, school: false, livelihood: false },
    progress: { foodActualTons: 3088.2, foodPct: 88.5, foodActualUSD: 5050526, nutritionKg: 74866.7 },
    photos: [],
  },
  {
    id: 'drc-kasai',
    pbas: 'PBAS-COD-03',
    pbasNum: 224041,
    country: '콩고민주공화국',
    countryEn: 'DR Congo',
    region: '카사이',
    regionEn: 'Kasai',
    coords: [-5.0, 22.4],
    beneficiaries: 12207,
    wvSupport: 39900,
    wfpGrant: 528702,
    foodTons: 37,
    foodValue: 221123,
    cashValue: 0,
    activities: { food: true, cash: false, nutrition: true, school: false, livelihood: true },
    progress: { foodActualTons: 76.2, foodPct: 205.8, foodActualUSD: 344228, nutritionKg: 76166.6 },
    note: '계획 대비 식량배분 205.8% — 영양·텃밭 통합 사업 확대',
    photos: [],
  },
  {
    id: 'ethiopia-tigray',
    pbas: 'PBAS-ETH-01',
    pbasNum: 223707,
    country: '에티오피아',
    countryEn: 'Ethiopia',
    region: '티그레이, 아파, 암하라',
    regionEn: 'Tigray, Afar, Amhara',
    coords: [13.0, 39.0],
    beneficiaries: 28556,
    wvSupport: 210762,
    wfpGrant: 3103998,
    foodTons: 524,
    foodValue: 2272354,
    cashValue: 0,
    activities: { food: true, cash: false, nutrition: true, school: false, livelihood: false },
    progress: { foodActualTons: 695.8, foodPct: 132.8, foodActualUSD: 2416084, nutritionKg: 695752.0 },
    note: '계획 대비 식량(영양식)배분 132.8% — 분쟁지역 영양 위기 대응 확대',
    photos: [],
  },
  {
    id: 'kenya-makueni',
    pbas: 'PBAS-KEN-01',
    pbasNum: 223864,
    country: '케냐',
    countryEn: 'Kenya',
    region: '마쿠에니, 키투이',
    regionEn: 'Makueni, Kitui',
    coords: [-1.6, 37.8],
    beneficiaries: 64080,
    wvSupport: 30760,
    wfpGrant: 211761,
    foodTons: 0,
    foodValue: 0,
    cashValue: 0,
    activities: { food: false, cash: false, nutrition: false, school: false, livelihood: true },
    progress: {},
    note: '소득증대(생계) 사업으로 직접적인 식량·현금 배분 금액 없음 (0 표기)',
    photos: [],
  },
  {
    id: 'myanmar-northernshan',
    pbas: 'PBAS-MMR-01',
    pbasNum: 223982,
    country: '미얀마',
    countryEn: 'Myanmar',
    region: '북부 샨',
    regionEn: 'Northern Shan',
    coords: [23.0, 97.7],
    beneficiaries: 7000,
    wvSupport: 21610,
    wfpGrant: 719505,
    foodTons: 0,
    foodValue: 0,
    cashValue: 652130,
    activities: { food: false, cash: true, nutrition: false, school: false, livelihood: false },
    progress: { cashActualKRW: 85940000, cashPct: 13.2, cashActualUSD: 64616 },
    note: 'USAID 폐지로 사업 규모 축소 및 진행 차질',
    photos: [],
  },
  {
    id: 'southsudan-fashoda',
    pbas: 'PBAS-SSD-01',
    pbasNum: 223756,
    country: '남수단',
    countryEn: 'South Sudan',
    region: '파쇼다, 파니이캉',
    regionEn: 'Fashoda, Panyikang',
    coords: [9.9, 32.0],
    beneficiaries: 21065,
    wvSupport: 100165,
    wfpGrant: 2253825,
    foodTons: 621,
    foodValue: 1581769,
    cashValue: 335244,
    activities: { food: true, cash: true, nutrition: true, school: true, livelihood: true },
    progress: { foodActualTons: 301.1, foodPct: 48.5, cashActualKRW: 529247000, cashPct: 157.9, cashActualUSD: 397930, foodActualUSD: 518775, nutritionKg: 503.8 },
    photos: [],
  },
  {
    id: 'southsudan-renk',
    pbas: 'PBAS-SSD-02',
    pbasNum: 223758,
    country: '남수단',
    countryEn: 'South Sudan',
    region: '렝크, 만요',
    regionEn: 'Renk, Manyo',
    coords: [11.7, 32.7],
    beneficiaries: 4620,
    wvSupport: 16662,
    wfpGrant: 786937,
    foodTons: 103,
    foodValue: 269973,
    cashValue: 464155,
    activities: { food: true, cash: true, nutrition: false, school: false, livelihood: false },
    progress: { foodActualTons: 81.2, foodPct: 78.8, cashActualKRW: 0, cashPct: 0.0, foodActualUSD: 136515 },
    note: 'USAID 폐지·자금 삭감으로 현금(CBT) 미진행, 식량배분 누적 78.8% 달성',
    photos: [],
  },
  {
    id: 'southsudan-juba',
    pbas: 'PBAS-SSD-03',
    pbasNum: 223753,
    country: '남수단',
    countryEn: 'South Sudan',
    region: '주바, 얌비오',
    regionEn: 'Juba, Yambio',
    coords: [4.7, 30.0],
    beneficiaries: 5678,
    wvSupport: 51491,
    wfpGrant: 446235,
    foodTons: 33,
    foodValue: 85040,
    cashValue: 216795,
    activities: { food: true, cash: true, nutrition: false, school: true, livelihood: false },
    progress: { foodActualTons: 29.6, foodPct: 89.8, cashActualKRW: 187666000, cashPct: 86.6, cashActualUSD: 141103, foodActualUSD: 253929 },
    photos: [],
  },
  {
    id: 'sudan-darfur-nutrition',
    pbas: 'PBAS-SDN-01',
    pbasNum: 223745,
    country: '수단',
    countryEn: 'Sudan',
    region: '남부 다르푸르 (영양)',
    regionEn: 'South Darfur (Nutrition)',
    coords: [11.5, 24.9],
    beneficiaries: 6636,
    wvSupport: 24600,
    wfpGrant: 530187,
    foodTons: 80,
    foodValue: 428751,
    cashValue: 0,
    activities: { food: true, cash: false, nutrition: true, school: false, livelihood: false },
    progress: { foodActualTons: 20.1, foodPct: 25.1, foodActualUSD: 82059, nutritionKg: 20110.6 },
    photos: [],
  },
  {
    id: 'sudan-kordofan',
    pbas: 'PBAS-SDN-02',
    pbasNum: 223710,
    country: '수단',
    countryEn: 'Sudan',
    region: '남부 코르도판',
    regionEn: 'South Kordofan',
    coords: [11.5, 29.5],
    beneficiaries: 27339,
    wvSupport: 36391,
    wfpGrant: 4095094,
    foodTons: 1624,
    foodValue: 2298952,
    cashValue: 1691320,
    activities: { food: true, cash: true, nutrition: true, school: false, livelihood: false },
    progress: { foodActualTons: 1025.7, foodPct: 63.2, cashActualKRW: 431490000, cashPct: 25.5, cashActualUSD: 324429, foodActualUSD: 1010325, nutritionKg: 17442.9 },
    photos: [],
  },
  {
    id: 'sudan-darfur-food',
    pbas: 'PBAS-SDN-03',
    pbasNum: 223711,
    country: '수단',
    countryEn: 'Sudan',
    region: '남부 다르푸르 (식량)',
    regionEn: 'South Darfur (Food)',
    coords: [12.2, 24.5],
    beneficiaries: 40945,
    wvSupport: 29323,
    wfpGrant: 7790818,
    foodTons: 3168,
    foodValue: 6272760,
    cashValue: 1453202,
    activities: { food: true, cash: true, nutrition: true, school: false, livelihood: false },
    progress: { foodActualTons: 2276.3, foodPct: 71.9, cashActualKRW: 0, cashPct: 0.0, foodActualUSD: 3121934, nutritionKg: 15269.9 },
    note: 'WFP 공급업체 선정 지연으로 현금(CBT) 미진행, 식량배분 누적 71.9% 달성',
    photos: [],
  },
  {
    id: 'sudan-whitenile',
    pbas: 'PBAS-SDN-04',
    pbasNum: 223856,
    country: '수단',
    countryEn: 'Sudan',
    region: '백나일강 일대',
    regionEn: 'White Nile',
    coords: [13.2, 32.5],
    beneficiaries: 46505,
    wvSupport: 38849,
    wfpGrant: 5783791,
    foodTons: 5320,
    foodValue: 5647703,
    cashValue: 0,
    activities: { food: true, cash: false, nutrition: false, school: false, livelihood: false },
    progress: { foodActualTons: 0, foodPct: 0.0 },
    note: '정부 승인 지연으로 연중 배분 미진행 (누적 실적 0)',
    photos: [],
  },
  {
    id: 'uganda-bidibidi',
    pbas: 'PBAS-UGA-01',
    pbasNum: 223766,
    country: '우간다',
    countryEn: 'Uganda',
    region: '비디비디, 로불레',
    regionEn: 'Bidibidi, Lobule',
    coords: [3.4, 31.3],
    beneficiaries: 50020,
    wvSupport: 209547,
    wfpGrant: 5048510,
    foodTons: 1598,
    foodValue: 3009507,
    cashValue: 1652502,
    activities: { food: true, cash: true, nutrition: true, school: false, livelihood: false },
    progress: { foodActualTons: 505.0, foodPct: 31.6, cashActualKRW: 742295000, cashPct: 44.9, cashActualUSD: 558117, foodActualUSD: 679772, nutritionKg: 33625.8 },
    photos: [],
  },
  {
    id: 'venezuela-zulia',
    pbas: 'PBAS-VEN-01',
    pbasNum: 223806,
    country: '베네수엘라',
    countryEn: 'Venezuela',
    region: '술리아, 모나가스 외 2개 지역',
    regionEn: 'Zulia, Monagas +2',
    coords: [10.0, -68.0],
    beneficiaries: 17004,
    wvSupport: 79800,
    wfpGrant: 3977563,
    foodTons: 1355,
    foodValue: 3139663,
    cashValue: 0,
    activities: { food: true, cash: false, nutrition: false, school: true, livelihood: true },
    progress: { foodActualTons: 475.5, foodPct: 35.1, foodActualUSD: 605800 },
    photos: [],
  },
]

// ISO-3166 alpha-3 codes for the 13 project countries — used to highlight
// them on the GeoJSON world map. (matches feature.id in data/world-110m.json)
export const PROJECT_ISO3 = [
  'AFG', // Afghanistan
  'BGD', // Bangladesh
  'CAF', // Central African Republic
  'TCD', // Chad
  'COL', // Colombia
  'COD', // DR Congo
  'ETH', // Ethiopia
  'KEN', // Kenya
  'MMR', // Myanmar
  'SSD', // South Sudan
  'SDN', // Sudan
  'UGA', // Uganda
  'VEN', // Venezuela
]

// --- Official totals from the report (use these for headline KPIs so they
//     match the source decks exactly, independent of row rounding). ----------
export const GLOBAL_KPIS = {
  countries: 13,
  projects: 20,
  beneficiaries: 464295,
  wvSupport: 1289391, // 천원  (≈ USD 969,468) — 한국(WV) 매칭금
  wfpGrant: 53025844, // 천원  (≈ USD 39,869,056) — 계획/기대수입
  wfpActualIncome: 33043129, // 천원 (≈ USD 24,844,458) — 실제 수입 인식액
  leverage: 25.6, // 실제 수입(24.8M) ÷ 매칭(0.97M). 계획(기대수입) 기준은 41배.
  foodTons: 21133, // 계획 식량 (WV 기여분, 톤)
  foodValue: 37649968, // 천원 (계획)
  cashValue: 10705540, // 천원 (계획)
  // ── 결과보고 누적 실적 (2026.06 기준, 출처: 결과보고 누적 시트) ──
  // 월드비전 기여분 기준. 환율 1,330원/USD.
  result: {
    foodActualTons: 10235, // 식량 배분 실적 (톤, WV 기여분)
    foodPct: 48.4, // 계획 21,133톤 대비
    foodActualUSD: 16038579, // 식량 상품가치 (USD)
    cashActualKRW: 6790954000, // 현금/교환권 실적 (원)
    cashPct: 63.4, // 계획 대비
    cashActualUSD: 5105980, // 현금/교환권 실적 (USD)
    nutritionKg: 998110, // 영양실조 치료식 (kg)
  },
  // 월드비전이 WFP 협력 파트너로서 전달·운영한 사업 전체 규모 (USD)
  wfpDelivered: {
    foodUSD: 101802761,
    foodTons: 74130,
    cashUSD: 46698411,
    totalValueUSD: 148501172, // 식량+현금 전체 가치
  },
}

// ===========================================================================
// Field narrative per project — distilled from the 2025 GHR result-report
// documents (EOP / Quarterly / Success Story .docx, read 2026-06).
//   • context : why the situation is critical (1–2 sentences)
//   • result  : what was done / notable outcome / challenge (1–2 sentences)
// Projects with no narrative source (Myanmar / White Nile / Venezuela) are
// intentionally omitted — DetailPanel renders the section only when present.
// ===========================================================================
export const PROJECT_NARRATIVES = {
  'afghanistan-ghor': {
    context:
      'Badghis·Ghor 두 주는 주민의 약 80%가 천수(雨水)농업에 의존하나, 연속된 가뭄으로 인구의 75%가 IPC 3단계 이상의 식량위기에 처해 있습니다.',
    result:
      '356명으로 구성된 지역식량지원위원회(CFAC)가 수혜자 선별과 투명성을 담당했고, 수혜자 만족도는 99.8%에 달했습니다. WFP 자금 고갈로 6~7월 배분이 일시 중단됐습니다.',
  },
  'bangladesh-coxsbazar': {
    context:
      '미얀마의 폭력을 피해 온 로힝야 난민은 캠프 내 취업이 제한돼 식량 지원이 사실상 유일한 생존 수단입니다.',
    result:
      '현물 배분에서 전자바우처(E-Voucher)로 전환해 수혜자가 식품을 직접 선택하도록 했고, 최취약 여성가구주에게는 신선식품 바우처를 추가 지급했습니다.',
  },
  'car-bambari': {
    context:
      '반복된 위기로 농업 그룹이 0.5헥타르 경작까지 위축되며 식량 생산이 급감했습니다.',
    result:
      '조건부 현금(Cash for Work)과 농기구·자재 지원으로 농업 접근로를 복구하고, 일부 그룹은 경작 규모를 3헥타르까지 확대했습니다.',
  },
  'chad-farchana': {
    context:
      '차드 동부 6개 주의 학생 영양을 지원하는 긴급학교급식(ESF) 현금이체 사업입니다.',
    result:
      '2024~2025 학년도 현금이체를 누적 93.7% 집행했습니다(계획 6개월 중 현장 5개월 실시).',
  },
  'colombia-valledelcauca': {
    context:
      'Valle del Cauca는 다수 무장단체가 마약 경로를 두고 충돌하는 콜롬비아 최대 분쟁지 중 하나로, 베네수엘라 이주민과 취약 주민이 주 대상입니다.',
    result:
      '직접 현금이체와 함께 가족경제·보호·영양·성평등을 다루는 지역사회 워크숍(CwC)을 병행했습니다. 연락처 변경으로 미수령한 3%는 대체 연락처 등록·아웃리치로 해소했습니다.',
  },
  'drc-tanganyika': {
    context:
      '탕가니카 주에는 약 180만 명이 IPC 3단계 이상이며, 2016~2017년 반투-트와 부족 분쟁의 피해자들이 여전히 귀환하지 못하고 있습니다.',
    result:
      'SCOPE 디지털 시스템으로 이중 등록 수혜자를 추적·정정했고, 314건의 민원을 처리했습니다. 식량 지원이 농업 종자 구매 등 자립의 발판이 된 사례가 보고됐습니다.',
  },
  'drc-southkivu': {
    context:
      '2025년 초 M23 반군의 진격으로 3개월간 배분이 중단됐고, 일부 지역은 호수 수상운송으로만 접근이 가능했습니다.',
    result:
      '극심한 접근 제약에도 FLA 연장과 신규 귀환민 통합으로 목표(141,300명)의 301%인 425,263명에게 지원을 전달했습니다. "인도주의 원칙 준수가 현 권력 당국과의 협력을 가능하게 했다"고 보고됐습니다.',
  },
  'drc-kasai': {
    context:
      'KOICA 지원으로 만성 영양불량의 세대 간 악순환 차단을 목표한 영양·텃밭·토끼사육 통합 사업입니다.',
    result:
      '6~23개월 아동 68,963명에게 영양보충식(PPDOZ)을 제공하고, 텃밭에서 200만kg 이상의 채소를 생산해 80% 이상을 가구에서 소비했습니다.',
  },
  'ethiopia-tigray': {
    context:
      '암하라 4개 사업지구의 급성 영양불량률(GAM)이 15.86%에 달하고, 티그레이는 2년 봉쇄와 사막 메뚜기로 식량위기가 심각합니다.',
    result:
      '5세 미만 아동 완치율 99%로 국가 기준(75%)을 크게 초과했습니다. 일부 지구는 3개월 식량 공급 중단으로 일부 수혜자가 탈락했습니다.',
  },
  'kenya-makueni': {
    context:
      '마쿠에니·키투이는 연중 4~10개월 식량불안을 겪는 건조지역으로, 빈곤율이 국가 평균을 크게 웃돕니다.',
    result:
      '긴급 배분이 아닌 회복력 강화 사업으로 VSLA(마을저축조합)·기후스마트농업·소액보험을 지원했습니다. 여성이 수혜자의 90% 이상을 차지합니다.',
  },
  'southsudan-fashoda': {
    context:
      '2025년 대홍수로 Fashoda County 마을들이 침수돼 주민이 고지대로 대피했고, Panyikang County는 분쟁으로 접근이 불가했습니다.',
    result:
      '긴급 식량 배분으로 시장을 안정시키는 한편, 텃밭·어업그룹·VSLA 등 장기 생계 회복을 병행했습니다.',
  },
  'southsudan-renk': {
    context:
      '수단 내전으로 발생한 대규모 귀환민이 Renk에 집중됐습니다. 2025년 3월 충돌로 2개월간 배분이 중단됐습니다.',
    result:
      'PDM 결과 55.9%가 "식량이 충분해졌다"고 응답했으나, 여성가구주 가구의 극심한 굶주림 비율(63.8%)이 남성가구주(15.4%)보다 현저히 높았습니다.',
  },
  'southsudan-juba': {
    context:
      '주바·얌비오 59개 학교를 대상으로 한 자체생산 학교급식(HGSF) 사업으로, 현물 급식과 지역조달 바우처를 병행했습니다.',
    result:
      '소농 협동조합을 급식 시장과 연결했고, 학교 텃밭 교육이 가정으로 확산됐습니다. 여학생 위생키트 배포로 생리로 인한 결석을 줄였습니다.',
  },
  'sudan-darfur-nutrition': {
    context:
      'SAF-RSF 분쟁으로 1,160만 명이 강제 이주한 가운데, 남다르푸르가 전국 IDP의 18%를 수용하고 있습니다.',
    result:
      '식량 파이프라인의 반복 중단으로 RUSF 배분이 계획의 23.6%에 그쳤으나, 돌봄제공자 대상 영양교육 세션을 10만 건 이상 진행하며 예방 활동에 집중했습니다.',
  },
  'sudan-kordofan': {
    context:
      '남코르도판은 2011년부터 분쟁 지역으로, 누바산맥의 험준한 지형에 수혜자가 분산돼 물류가 복잡합니다.',
    result:
      '항구로부터의 트럭 이동이 치안 문제로 제한돼 식량 집행률이 낮았습니다. 식량 지원이 일부 수혜자에게 비누 제조 등 소규모 창업의 발판이 됐습니다.',
  },
  'sudan-darfur-food': {
    context:
      '2025년 11월 IPC가 수단 일부 지역의 기근 발생을 공식 확인했고, 남다르푸르 일부 지역의 GAM은 28~34%에 달했습니다.',
    result:
      '치안 평가에 따라 안전 경로로만 식량을 전달했으며, 4분기 들어 새 IDP 캠프로 배분을 확대했습니다. 현금(CBT)은 WFP 공급업체 선정 지연으로 미실시됐습니다.',
  },
  'uganda-bidibidi': {
    context:
      '비디비디·로불레 등 난민정착지에서 현금배분 방식이 모바일머니로 전환되는 과정에 있습니다.',
    result:
      'SCOPE·모바일머니 시스템 간 이름 불일치와 거래 실패로 일부 수혜자가 여러 사이클을 미수령했습니다. EDG(기업개발보조금)로 버섯재배·양계 등 생계 그룹을 지원했습니다.',
  },
}

// Helper: derived per-project leverage multiple (WFP grant / WV support).
export function leverageOf(project) {
  if (!project?.wvSupport) return null
  return project.wfpGrant / project.wvSupport
}

// Helper: count of active interventions for a project.
export function activeCount(project) {
  return ACTIVITY_KEYS.filter((k) => project.activities?.[k]).length
}
