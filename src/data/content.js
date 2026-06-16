// ===========================================================================
// Narrative content — causes of crisis, core interventions, activity metadata.
// Text distilled from the proposal / interim report decks. Icons are
// lucide-react component NAMES (string); components map them via a lookup.
// Colors are hex so they can be used in inline styles, Recharts, and Leaflet.
// ===========================================================================

// --- Shared activity metadata (one source of truth across map + panel) ------
export const ACTIVITY_META = {
  food: {
    key: 'food',
    label: '일반식량 배분',
    labelEn: 'In-kind Food Distribution',
    icon: 'Wheat',
    color: '#F47920',
  },
  cash: {
    key: 'cash',
    label: '현금/교환권 배분',
    labelEn: 'Cash & Voucher Assistance',
    icon: 'Banknote',
    color: '#0E7C7B',
  },
  nutrition: {
    key: 'nutrition',
    label: '영양실조 치료',
    labelEn: 'Nutrition Support (SAM/MAM)',
    icon: 'HeartPulse',
    color: '#C8102E',
  },
  school: {
    key: 'school',
    label: '학교 급식',
    labelEn: 'School Feeding',
    icon: 'GraduationCap',
    color: '#F4B223',
  },
  livelihood: {
    key: 'livelihood',
    label: '생계 회복력 강화',
    labelEn: 'Livelihood & Resilience',
    icon: 'Sprout',
    color: '#3F8F5B',
  },
}

// --- Section 2: Causes of the crisis (3 cards) ------------------------------
export const CAUSES = [
  {
    key: 'conflict',
    title: '분쟁 및 불안정',
    titleEn: 'Conflict & Instability',
    icon: 'Swords',
    color: '#C8102E',
    summary:
      '콩고민주공화국·수단 등 내전이 장기화되며 대규모 난민이 발생합니다. 분쟁은 이주 → 인프라·시장 붕괴 → 지원 불안정 → 식량위기 심화 → 자원 경쟁이라는 악순환을 만듭니다.',
    indicator: { value: '15 / 16', label: '2025 주요 식량위기국 중 분쟁 겪는 국가' },
  },
  {
    key: 'climate',
    title: '기후변화',
    titleEn: 'Climate Change',
    icon: 'CloudRainWind',
    color: '#2D6CB6',
    summary:
      '잦은 가뭄과 홍수, 불규칙한 날씨가 흉작과 농업 피해로 이어집니다. 기후 충격은 취약 지역의 식량 생산성을 직접적으로 떨어뜨립니다.',
    indicator: { value: '가뭄·홍수', label: '흉작과 농업 피해의 주된 원인' },
  },
  {
    key: 'economic',
    title: '경제적 충격',
    titleEn: 'Economic Shocks',
    icon: 'TrendingDown',
    color: '#D85F12',
    summary:
      '고물가와 식량 가격 폭등으로 취약계층의 구매력이 무너집니다. 수요는 늘지만 인도적지원 자금은 줄어, 배급량이 하루 권장 칼로리의 50% 미만까지 축소되기도 합니다.',
    indicator: { value: '< 50%', label: '축소된 배급량 (권장 칼로리 대비)' },
  },
]

// --- Section 3: Core interventions (5 activities) ---------------------------
export const INTERVENTIONS = [
  {
    ...ACTIVITY_META.food,
    summary: '극심한 식량난을 겪는 취약계층에게 정기적으로 현물 식량을 배분합니다.',
    bullets: [
      '1인 최소 필요 열량 2,100kcal 기준, 가족 구성원 수에 따라 지급',
      '사업 지역에 따라 수수·콩·옥수수·식용유 등 식량 종류 상이',
      '운송 → 보관·검수 → 수혜자 확인 → 정기 배분의 표준 절차',
    ],
    stat: { value: '2,100', unit: 'kcal', label: '1인 최소 필요 열량 기준' },
  },
  {
    ...ACTIVITY_META.cash,
    summary: '시장 환경이 갖춰진 지역에서 현금·교환권을 지급해 수혜자가 직접 식량을 구매합니다.',
    bullets: [
      '은행·모바일 계좌 이체 또는 현금 직접 지급',
      '운송·보관비 절감으로 효율적, 수혜자 자존감 향상으로 효과적',
      "'Cash for Work' — 지역사회 복구 참여 대가로 현금 지급",
    ],
    stat: { value: '효율 + 효과', unit: '', label: '비용 절감 · 수혜자 존엄성' },
  },
  {
    ...ACTIVITY_META.nutrition,
    summary: '5세 미만 아동·임산부·수유부를 대상으로 영양실조를 진단하고 치료합니다.',
    bullets: [
      'MUAC 측정 테이프로 SAM/MAM 신속 진단',
      '상태에 따라 입원·외래·영양보충식(플럼피넛 등) 지원',
      '마을 영양 자원봉사자·어머니자조그룹과 함께 모니터링',
    ],
    stat: { value: 'SAM · MAM', unit: '', label: '중증·경증 급성 영양실조 대응' },
  },
  {
    ...ACTIVITY_META.school,
    summary: '학교에 출석하는 아동에게 정기적으로 급식을 제공해 영양과 출석률을 함께 높입니다.',
    bullets: [
      '아동 성장에 필요한 필수 영양소 섭취 지원',
      '교내 텃밭 조성·지역 식재료 조달로 일자리 창출',
      '여아 중등교육 이수 시 조혼 감소 등 사회적 효과',
    ],
    stat: { value: '+9%', unit: '', label: '급식 시행 후 학교 등록률 향상' },
  },
  {
    ...ACTIVITY_META.livelihood,
    summary: '다시 식량위기를 겪지 않도록 주민 주도의 생계 회복력을 강화합니다.',
    bullets: [
      '기후변화 적응 종자 지원 및 농업 기술 훈련',
      '농업보험으로 흉작 시 생계수단 마련',
      '저축 그룹으로 소규모 창업·자본금 형성',
    ],
    stat: { value: '자립', unit: '', label: '주민 주도 · 역량 강화 · 자립 지원' },
  },
]

// Lucide icon names referenced above — components import exactly these:
// Wheat, Banknote, HeartPulse, GraduationCap, Sprout, Swords, CloudRainWind, TrendingDown
