/* 2025 글로벌 식량위기 대응사업 — 최종 결과보고 PPT 덱 생성 (pptxgenjs)
 * 웹 대시보드(food-crisis-dashboard)의 섹션을 마케팅 가공용 편집 PPTX로. */
const pptxgen = require('pptxgenjs')

const PUB = 'C:/dev/food-crisis-dashboard/public'
const MID = '111222', ORANGE = 'FF5515', FIELD = 'F3F2F0', TEAL = '0E7C7B'
const RED = 'C8102E', AMBER = 'C77E0A', GREEN = '2F7D4F'
const G8 = '3A3A3A', G6 = '6B6B6B', G5 = '9A9A9A', WHITE = 'FFFFFF', LINE = 'E3E1DD'
const KR = '맑은 고딕'
const shadow = () => ({ type: 'outer', color: '000000', blur: 7, offset: 2, angle: 90, opacity: 0.1 })

const pres = new pptxgen()
pres.layout = 'LAYOUT_WIDE' // 13.333 x 7.5
pres.author = '월드비전 인도적지원팀'
pres.title = '2025 글로벌 식량위기 대응사업 — 최종 결과보고'
const W = 13.333, H = 7.5

// 공통: 슬라이드 상단 섹션 헤더(번호 + 제목 + 영문 eyebrow)
function header(s, eyebrow, title) {
  s.addText(eyebrow, { x: 0.7, y: 0.5, w: 12, h: 0.3, fontFace: KR, fontSize: 11, bold: true, color: ORANGE, charSpacing: 2 })
  s.addText(title, { x: 0.7, y: 0.78, w: 12, h: 0.6, fontFace: KR, fontSize: 26, bold: true, color: MID })
}

// ---------- Slide 1 — 표지 ----------
{
  const s = pres.addSlide()
  s.background = { color: MID }
  s.addImage({ path: `${PUB}/hero/hero-poster.jpg`, x: 0, y: 0, w: W, h: H, sizing: { type: 'cover', w: W, h: H } })
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: H, fill: { color: MID, transparency: 42 } })
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.4, w: W, h: 3.1, fill: { color: MID, transparency: 55 } })
  s.addText('WORLD VISION  ✕  WFP   ·   다자기구협력사업', { x: 0.8, y: 4.55, w: 11.5, h: 0.35, fontFace: KR, fontSize: 13, bold: true, color: ORANGE, charSpacing: 2 })
  s.addText('2025 글로벌 식량위기 대응사업', { x: 0.78, y: 4.95, w: 12, h: 0.95, fontFace: KR, fontSize: 40, bold: true, color: WHITE })
  s.addText('최종 결과보고  ·  FINAL REPORT 2025', { x: 0.8, y: 5.95, w: 10, h: 0.45, fontFace: KR, fontSize: 18, color: 'EDEDED' })
  s.addText('13개국  ·  20개 사업', { x: 0.8, y: 6.5, w: 6, h: 0.4, fontFace: KR, fontSize: 14, bold: true, color: 'D7D7D7' })
  s.addText('© World Vision / Jon Warren · Ethiopia 2025', { x: 6.8, y: 7.0, w: 6.05, h: 0.3, align: 'right', fontFace: 'Arial', fontSize: 10, color: 'FFFFFF', transparency: 35 })
}

// ---------- Slide 2 — 한눈에 보는 성과 ----------
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, 'AT A GLANCE', '한눈에 보는 성과')
  const cards = [
    { label: '식량 배분', num: '10,235.1', unit: '톤', c: ORANGE },
    { label: '영양 치료식', num: '998.1', unit: '톤  (식량 중)', c: RED },
    { label: '현금·교환권', num: '$5.1M', unit: '≈ 68억원', c: TEAL },
    { label: '자금 레버리지', num: '25.6배', unit: '한국 기여 대비', c: ORANGE },
    { label: '총 사업비', num: '$24.8M', unit: '≈ 330억원', c: MID },
    { label: '사업 규모', num: '13개국', unit: '20개 사업', c: GREEN },
  ]
  const x0 = 0.7, y0 = 1.75, cw = 3.78, ch = 2.35, gx = 0.36, gy = 0.42
  cards.forEach((cd, i) => {
    const cx = x0 + (i % 3) * (cw + gx), cy = y0 + Math.floor(i / 3) * (ch + gy)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: cw, h: ch, fill: { color: FIELD }, line: { color: LINE, width: 1 }, rectRadius: 0.1, shadow: shadow() })
    s.addText(cd.label, { x: cx + 0.35, y: cy + 0.32, w: cw - 0.7, h: 0.4, fontFace: KR, fontSize: 14, bold: true, color: G6 })
    s.addText(cd.num, { x: cx + 0.33, y: cy + 0.74, w: cw - 0.6, h: 0.9, fontFace: KR, fontSize: 44, bold: true, color: cd.c })
    s.addText(cd.unit, { x: cx + 0.35, y: cy + 1.68, w: cw - 0.7, h: 0.4, fontFace: KR, fontSize: 13, color: G5 })
  })
}

// ---------- Slide 3 — 01 원인·영향 ----------
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, '01  WHY', '식량위기의 원인 · 영향')
  const colHead = (x, t, c) => s.addText(t, { x, y: 1.7, w: 5.7, h: 0.4, fontFace: KR, fontSize: 15, bold: true, color: c })
  colHead(0.7, '근본 원인', MID)
  colHead(6.95, '아동에게 드리운 그늘', RED)
  const row = (x, y, dot, title, desc) => {
    s.addShape(pres.shapes.OVAL, { x: x, y: y + 0.06, w: 0.22, h: 0.22, fill: { color: dot } })
    s.addText(title, { x: x + 0.4, y: y - 0.08, w: 5.2, h: 0.4, fontFace: KR, fontSize: 14, bold: true, color: MID })
    s.addText(desc, { x: x + 0.4, y: y + 0.32, w: 5.3, h: 0.85, fontFace: KR, fontSize: 12, color: G6, lineSpacingMultiple: 1.05 })
  }
  const causes = [
    [ORANGE, '분쟁 및 불안정', '콩고민주공화국·수단 등 장기 내전으로 대규모 난민 발생. 2025 주요 식량위기국 16개국 중 15개국이 분쟁 영향권.'],
    ['2D6CB6', '기후변화', '잦은 가뭄·홍수와 불규칙한 날씨가 흉작·농업 피해로 이어져 취약 지역의 식량 생산성을 직접 떨어뜨림.'],
    ['D85F12', '경제적 충격', '고물가·식량가격 폭등으로 구매력 붕괴. 배급량이 하루 권장 칼로리의 50% 미만으로 축소되기도 함.'],
  ]
  const impacts = [
    [AMBER, '교육의 중단', '끼니를 위해 학교 대신 노동으로 내몰리며 배움의 기회를 잃음.'],
    [RED, '조혼과 가족 분리', '배급이 삭감된 가구의 아동은 조혼·학업중단·가족분리 위험이 약 2배로 높아짐.'],
    ['7A3E9D', '정신건강의 위기', '굶주림과 불안정한 환경 속에서 불안·우울 등 심리적 고통이 커짐.'],
  ]
  causes.forEach((r, i) => row(0.7, 2.35 + i * 1.45, r[0], r[1], r[2]))
  impacts.forEach((r, i) => row(6.95, 2.35 + i * 1.45, r[0], r[1], r[2]))
  s.addText('출처: WFP × World Vision 공동연구 「In the Shadow of Hunger」 (2026)', { x: 0.7, y: 6.95, w: 12, h: 0.3, fontFace: KR, fontSize: 10, italic: true, color: G5 })
}

// ---------- Slide 4 — 02 국가별 배분 표 ----------
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, '02  WHERE', '국가별 배분 실적 · 13개국 20개 사업')
  const hc = { fill: { color: MID }, color: WHITE, bold: true, fontFace: KR, fontSize: 12, align: 'center', valign: 'middle' }
  const head = ['국가', '식량 (톤)', '현금·교환권', '치료식 (식량 중)'].map((t, i) => ({ text: t, options: { ...hc, align: i === 0 ? 'left' : 'right' } }))
  const rows = [
    ['콩고민주공화국', '3,797.0', '—', '151.1'],
    ['수단', '3,322.1', '$324K', '52.8'],
    ['아프가니스탄', '829.3', '$174K', '65.7'],
    ['에티오피아', '695.8', '—', '695.8'],
    ['우간다', '505.0', '$558K', '33.6'],
    ['베네수엘라', '475.5', '—', '—'],
    ['남수단', '411.9', '$539K', '0.5'],
    ['차드', '198.5', '$16K', '—'],
    ['방글라데시', '—', '$1.89M', '—'],
    ['콜롬비아', '—', '$1.46M', '—'],
    ['중앙아프리카공화국', '—', '$87K', '—'],
    ['미얀마', '—', '$65K', '—'],
    ['케냐 (생계 역량 강화)', '—', '—', '—'],
  ]
  const body = rows.map((r, ri) => r.map((cell, ci) => ({
    text: cell,
    options: {
      fontFace: KR, fontSize: 11.5, valign: 'middle', align: ci === 0 ? 'left' : 'right',
      color: ci === 0 ? MID : (cell === '—' ? 'C9C7C2' : (ci === 2 ? TEAL : (ci === 3 ? RED : G8))),
      bold: ci === 0, fill: { color: ri % 2 ? FIELD : WHITE },
    },
  })))
  const total = ['합계', '10,235.1', '$5.1M', '998.1'].map((t, i) => ({
    text: t, options: { fontFace: KR, fontSize: 12.5, bold: true, valign: 'middle', align: i === 0 ? 'left' : 'right', color: WHITE, fill: { color: ORANGE } },
  }))
  s.addTable([head, ...body, total], {
    x: 0.7, y: 1.6, w: 11.93, colW: [4.13, 2.6, 2.6, 2.6], rowH: 0.335,
    border: { type: 'solid', pt: 0.5, color: LINE }, margin: [2, 6, 2, 6], autoPage: false,
  })
  s.addText('치료식 무게는 식량 배분량에 포함된 부분집합입니다.  ·  환율 1,330원/USD  ·  월드비전 기여분 누적 기준.', { x: 0.7, y: 6.85, w: 12, h: 0.3, fontFace: KR, fontSize: 10, italic: true, color: G5 })
}

// ---------- Slides — 03 핵심 활동 (활동별 1장, 중간보고서 설명 반영) ----------
const ACTIVITIES = [
  {
    c: ORANGE, en: 'In-kind Food Distribution', name: '일반식량 배분',
    lead: '극심한 식량난을 겪는 취약계층에게 정기적으로 현물 식량을 배분합니다.',
    points: [
      '1인 최소 필요 열량 2,100kcal 기준으로, 가족 구성원 수에 따라 지급합니다.',
      '사업 지역에 따라 수수·콩·옥수수·식용유 등 배분하는 식량 종류가 달라집니다.',
      '시장 접근이 어렵거나 식량 공급이 끊긴 긴급 상황에 우선 적용하는 방식입니다.',
    ],
    steps: ['식량 운송', '보관·검수', '수혜자 확인', '정기 배분'],
    statBig: '2,100', statUnit: 'kcal', statLabel: '1인 1일 최소 필요 열량 기준',
  },
  {
    c: TEAL, en: 'Cash & Voucher Assistance', name: '현금·교환권 배분',
    lead: '시장 기능이 갖춰진 지역에서 현금·교환권을 지급해 수혜자가 직접 식량을 구매하게 합니다.',
    points: [
      '은행·모바일 계좌 이체 또는 현금으로 직접 지급합니다.',
      '운송·보관비를 줄여 효율적이고, 수혜자가 직접 고르며 자존감도 높아집니다.',
      '현지에 식량을 살 수 있는 시장 환경이 갖춰진 경우에만 활용합니다.',
      "'Cash for Work' — 산림 조성·농경지 개간·도로 보수 등 지역사회 복구에 참여한 대가로 현금을 지급합니다.",
    ],
    steps: ['수혜자 확인', '현금·교환권 수령', '직접 식량 구매'],
    statBig: '효율+효과', statUnit: '', statLabel: '비용 절감 · 수혜자 존엄성',
  },
  {
    c: RED, en: 'Nutrition Treatment', name: '영양 치료식',
    lead: '5세 미만 아동·임산부·수유부를 대상으로 영양실조를 진단하고 치료합니다.',
    points: [
      '상완둘레 측정 등으로 아동·성인의 영양 상태를 진단합니다.',
      '상태에 따라 입원·통원 치료, 영양 보조식(플럼피넛 등)을 지급합니다.',
      '마을 영양 자원봉사자·어머니 자조그룹과 함께 추적 관리합니다.',
    ],
    steps: ['영양 상태 진단', '치료 방식 결정', '치료식·보조식 지급'],
    statBig: '998.1', statUnit: '톤', statLabel: '영양 치료식 누계 배분 (식량 중)',
  },
  {
    c: AMBER, en: 'School Feeding', name: '학교 급식',
    lead: '학교에 출석하는 아동에게 정기적으로 급식을 제공해 영양과 출석률을 함께 높입니다.',
    points: [
      '아동 성장에 필요한 필수 영양소 섭취를 지원합니다.',
      '학교 내 조리시설에서 직접 조리해 학생에게 배식합니다.',
      '교내 텃밭 조성·지역 식재료 조달로 일자리와 지역경제까지 연결됩니다.',
    ],
    steps: ['식사 준비·조리', '학생 배식', '텃밭·식재료 수급'],
    statBig: '+9%', statUnit: '', statLabel: '급식 시행 후 학교 등록률 향상',
  },
  {
    c: GREEN, en: 'Livelihood & Resilience', name: '생계 역량 강화',
    lead: '다시 식량위기를 겪지 않도록 주민 주도의 생계 회복력을 강화합니다.',
    points: [
      '기후변화 적응 종자 지원과 농업 기술 훈련을 제공합니다.',
      '농업보험으로 흉작이 들어도 생계수단을 확보합니다.',
      '저축 그룹 — 낮은 이율·높은 접근성, 이자는 구성원에게 재배분되어 의료·교육·투자에 자유롭게 씁니다.',
    ],
    steps: ['저축 그룹 형성', '종자·기술·보험 지원', '소득·자본 형성'],
    statBig: '자립', statUnit: '', statLabel: '주민 주도 · 역량 강화',
  },
]
ACTIVITIES.forEach((a, idx) => {
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, `03  WHAT  ·  핵심 활동  ${idx + 1} / 5`, a.name)
  s.addText(a.en, { x: 0.7, y: 1.45, w: 9, h: 0.32, fontFace: 'Arial', fontSize: 13, bold: true, color: a.c })
  s.addText(a.lead, { x: 0.7, y: 1.98, w: 7.5, h: 0.85, fontFace: KR, fontSize: 16, bold: true, color: MID, lineSpacingMultiple: 1.15, valign: 'top' })
  s.addText(a.points.map((p) => ({ text: p, options: { bullet: true, breakLine: true, paraSpaceAfter: 9 } })),
    { x: 0.74, y: 3.0, w: 7.5, h: 2.6, fontFace: KR, fontSize: 13.5, color: G6, lineSpacingMultiple: 1.12, valign: 'top' })
  s.addText('사업 형태', { x: 0.7, y: 5.78, w: 3, h: 0.3, fontFace: KR, fontSize: 12, bold: true, color: G6 })
  const sw = 2.5, sgap = 0.5, sy = 6.18, sx0 = 0.7
  a.steps.forEach((st, i) => {
    const sx = sx0 + i * (sw + sgap)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: sx, y: sy, w: sw, h: 0.6, fill: { color: FIELD }, line: { color: LINE, width: 1 }, rectRadius: 0.08 })
    s.addText(st, { x: sx, y: sy, w: sw, h: 0.6, align: 'center', valign: 'middle', fontFace: KR, fontSize: 12, bold: true, color: MID })
    if (i < a.steps.length - 1) s.addText('›', { x: sx + sw - 0.02, y: sy, w: sgap + 0.04, h: 0.6, align: 'center', valign: 'middle', fontFace: 'Arial', fontSize: 18, bold: true, color: a.c })
  })
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.6, y: 1.98, w: 4.03, h: 3.55, fill: { color: a.c }, rectRadius: 0.1, shadow: shadow() })
  const statText = a.statUnit ? `${a.statBig} ${a.statUnit}` : a.statBig
  s.addText(statText, { x: 8.78, y: 2.7, w: 3.67, h: 1.25, align: 'center', valign: 'middle', fontFace: KR, fontSize: statText.length > 6 ? 30 : 48, bold: true, color: WHITE })
  s.addText(a.statLabel, { x: 8.85, y: 4.32, w: 3.53, h: 0.95, align: 'center', fontFace: KR, fontSize: 13, color: 'F7F7F7', lineSpacingMultiple: 1.15 })
})

// ---------- Slide 6 — 배분 식량 구성 (도넛) ----------
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, '03  WHAT', '배분 식량 구성 · 총 10,235.1톤')
  const labels = ['옥수수', '수수', '콩', '영양실조 치료식', '밀', '식용유', '쌀', '식량 키트', '기타', '소금']
  const values = [2947.3, 2808.5, 1278.6, 998.1, 828.0, 461.7, 357.1, 349.9, 125.6, 80.3]
  const colors = ['FF5515', 'C2410C', '2F7D4F', 'C8102E', 'E0A92E', 'F4C430', 'B6A98F', '6B7280', 'A8A29E', 'D6D3CD']
  s.addChart(pres.charts.DOUGHNUT, [{ name: '식량 구성', labels, values }], {
    x: 0.5, y: 1.7, w: 6.6, h: 5.2, holeSize: 55, chartColors: colors,
    showLegend: true, legendPos: 'r', legendFontFace: KR, legendFontSize: 11, legendColor: G8,
    showValue: false, dataLabelColor: WHITE, dataLabelFontFace: KR, dataLabelFontSize: 9,
    showTitle: false, chartArea: { fill: { color: WHITE } },
  })
  s.addText([
    { text: '식탁에 오른 것들', options: { bold: true, fontSize: 16, color: MID, breakLine: true, paraSpaceAfter: 8 } },
    { text: '옥수수·수수 등 곡물이 주력 열량원, 콩으로 단백질을 보충하고 영양실조 치료식으로 5세 미만·임산부를 집중 지원했습니다.', options: { fontSize: 12.5, color: G6, breakLine: true, paraSpaceAfter: 10 } },
    { text: '수입 의존도가 큰 밀 비중을 줄이고, 가뭄에 강하고 역내 조달이 쉬운 수수·옥수수 중심으로 전환했습니다.', options: { fontSize: 12.5, color: G6 } },
  ], { x: 7.7, y: 1.95, w: 4.95, h: 3.0, fontFace: KR, valign: 'top' })
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.7, y: 5.25, w: 4.95, h: 1.4, fill: { color: FIELD }, line: { color: LINE, width: 1 }, rectRadius: 0.08 })
  s.addText([
    { text: '전년 대비 식량 배분량 약 70% 증가', options: { bold: true, fontSize: 14, color: ORANGE, breakLine: true, paraSpaceAfter: 5 } },
    { text: '2024년 6,018톤  →  2025년 10,235.1톤', options: { fontSize: 13, color: MID } },
  ], { x: 7.95, y: 5.5, w: 4.5, h: 1.0, fontFace: KR, valign: 'top' })
}

// ---------- Slide 7 — 04 성과 (레버리지 + 집행률) ----------
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, '04  RESULT', '사업 성과')
  // 레버리지 카드
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 1.8, w: 5.7, h: 4.0, fill: { color: MID }, rectRadius: 0.1, shadow: shadow() })
  s.addText('자금 레버리지', { x: 1.05, y: 2.2, w: 5, h: 0.4, fontFace: KR, fontSize: 15, bold: true, color: 'D7D7D7' })
  s.addText('25.6배', { x: 1.0, y: 2.7, w: 5.1, h: 1.4, fontFace: KR, fontSize: 80, bold: true, color: ORANGE })
  s.addText([
    { text: '한국 기여 12.9억원이', options: { breakLine: true } },
    { text: 'WFP 다자협력 총 사업비 $24.8M (≈330억원)', options: { breakLine: true, bold: true, color: WHITE } },
    { text: '으로 확장되었습니다.', options: {} },
  ], { x: 1.05, y: 4.35, w: 5.0, h: 1.2, fontFace: KR, fontSize: 13, color: 'CFCFCF', lineSpacingMultiple: 1.1 })
  // 집행률 막대
  s.addText('계획 대비 배분 집행률', { x: 7.0, y: 1.95, w: 5.6, h: 0.4, fontFace: KR, fontSize: 15, bold: true, color: MID })
  s.addChart(pres.charts.BAR, [{ name: '집행률', labels: ['식량 배분', '현금·교환권'], values: [48.4, 47.7] }], {
    x: 6.85, y: 2.4, w: 5.9, h: 2.7, barDir: 'col', chartColors: [ORANGE, TEAL],
    valAxisMinVal: 0, valAxisMaxVal: 100, valAxisLabelColor: G6, catAxisLabelColor: G8, catAxisLabelFontFace: KR, catAxisLabelFontSize: 12,
    valGridLine: { color: 'EEECE8', size: 0.5 }, catGridLine: { style: 'none' },
    showValue: true, dataLabelPosition: 'outEnd', dataLabelColor: MID, dataLabelFontFace: KR, dataLabelFontSize: 13, dataLabelFormatCode: '0.0"%"',
    showLegend: false, chartArea: { fill: { color: WHITE } },
  })
  s.addText('영양 치료식은 누계 998.1톤 배분 (계획 목표 도달).', { x: 7.0, y: 5.15, w: 5.6, h: 0.4, fontFace: KR, fontSize: 12, color: G6 })
  s.addText([
    { text: '* 다자기구협력사업 특성상 사업 규모·일정은 글로벌 인도적지원 필요 상황, 도너(WFP) 자금 상황 및 식량 수급에 따라 변동될 수 있습니다.', options: { breakLine: true, paraSpaceAfter: 4 } },
    { text: '** 식량·현금 집행률이 약 50% 수준인 주요 사유 — ① 미국 USAID 폐지에 따른 사업 축소·중단, ② 수단·콩고민주공화국 등 분쟁 심화, ③ 수단 화이트나일 사업의 현지 정부 승인 지연.', options: {} },
  ], { x: 0.7, y: 6.05, w: 11.95, h: 1.2, fontFace: KR, fontSize: 10.5, color: G6, lineSpacingMultiple: 1.05 })
}

// ---------- Slide 8 — 05 현장 사진 ----------
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, '05  GALLERY', '현장의 기록')
  const photos = [
    [`${PUB}/gallery/drc-southkivu.jpg`, '콩고민주공화국 · 남부 키부', '일반식량 배분', '© World Vision · DR Congo 2025'],
    [`${PUB}/gallery/afghanistan-ghor.jpg`, '아프가니스탄 · 고르·바드기스', '식량 배분', '© World Vision · Afghanistan 2025'],
    [`${PUB}/gallery/ethiopia-tigray.jpg`, '에티오피아 · 티그라이', '영양 치료식', '© World Vision · Ethiopia 2025'],
    [`${PUB}/gallery/bangladesh-coxsbazar.jpg`, '방글라데시 · 콕스바자르', '현금·교환권', '© World Vision · Bangladesh 2025'],
  ]
  const x0 = 0.7, y0 = 1.62, pw = 5.85, ph = 2.05, gx = 0.43, pitch = 2.9
  photos.forEach((p, i) => {
    const px = x0 + (i % 2) * (pw + gx), py = y0 + Math.floor(i / 2) * pitch
    s.addImage({ path: p[0], x: px, y: py, w: pw, h: ph, sizing: { type: 'cover', w: pw, h: ph } })
    s.addText([
      { text: p[2] + '   ', options: { color: ORANGE, bold: true } },
      { text: p[1], options: { color: MID, bold: true } },
    ], { x: px, y: py + ph + 0.07, w: pw, h: 0.3, fontFace: KR, fontSize: 12.5 })
    s.addText(p[3], { x: px, y: py + ph + 0.4, w: pw, h: 0.24, fontFace: 'Arial', fontSize: 9.5, color: G5 })
  })
}

// ---------- Slide 9 — 출처 · 문의 ----------
{
  const s = pres.addSlide(); s.background = { color: MID }
  s.addText('SOURCES & NOTICE', { x: 0.8, y: 0.7, w: 11, h: 0.35, fontFace: KR, fontSize: 12, bold: true, color: ORANGE, charSpacing: 2 })
  s.addText('출처 · 안내', { x: 0.8, y: 1.05, w: 11, h: 0.6, fontFace: KR, fontSize: 26, bold: true, color: WHITE })
  s.addText([
    { text: '출처', options: { bold: true, color: ORANGE, breakLine: true, paraSpaceAfter: 4 } },
    { text: 'Hunger Hotspots (WFP & FAO, 2025)', options: { breakLine: true } },
    { text: '「In the Shadow of Hunger」 (WFP & World Vision, 2026)', options: { breakLine: true, paraSpaceAfter: 14 } },
    { text: '기준', options: { bold: true, color: ORANGE, breakLine: true, paraSpaceAfter: 4 } },
    { text: '계획 수치는 제안서(2025.03), 배분 실적은 2025.1~12 누적 기준 · 환율 1,330원/USD · 월드비전 기여분 기준', options: { breakLine: true, paraSpaceAfter: 14 } },
    { text: '문의', options: { bold: true, color: ORANGE, breakLine: true, paraSpaceAfter: 4 } },
    { text: '월드비전 인도적지원팀 조항빈 · hangbin_cho@worldvision.or.kr', options: {} },
  ], { x: 0.8, y: 1.9, w: 11.7, h: 3.4, fontFace: KR, fontSize: 14, color: 'DADADA', lineSpacingMultiple: 1.15 })
  s.addShape(pres.shapes.LINE, { x: 0.8, y: 6.15, w: 11.7, h: 0, line: { color: '3A3A4A', width: 1 } })
  s.addText('© World Vision · 본 보고서 내 담긴 사진 및 영상에 대한 모든 저작권은 월드비전에 있으며, 무단 도용 및 배포를 금합니다.', { x: 0.8, y: 6.3, w: 11.7, h: 0.5, fontFace: KR, fontSize: 11, color: '9A9AA8' })
  s.addText('WORLD VISION  ✕  WFP   ·   2025 글로벌 식량위기 대응사업', { x: 0.8, y: 6.95, w: 11.7, h: 0.35, fontFace: KR, fontSize: 11, bold: true, color: ORANGE, charSpacing: 1 })
}

const OUT = 'C:/dev/food-crisis-dashboard/reports/2025_글로벌식량위기대응_결과보고.pptx'
pres.writeFile({ fileName: OUT })
  .then((f) => console.log('WROTE', f))
  .catch(() => {
    // 기존 파일이 PowerPoint에 열려 있어 잠긴 경우 _v2 로 저장
    const ALT = OUT.replace(/\.pptx$/, '_v2.pptx')
    pres.writeFile({ fileName: ALT }).then((f) => console.log('WROTE_ALT', f)).catch((e2) => { console.error('ERR', e2); process.exit(1) })
  })
