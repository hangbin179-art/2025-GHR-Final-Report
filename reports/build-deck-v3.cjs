/* 2025 글로벌 식량위기 대응사업 — 최종 결과보고 PPT 덱 v2 (pptxgenjs)
 * v1 대비: 발행물(by-the-book) 디자인 시스템 — 헤더 액센트 레일 + 전 슬라이드 푸터/페이지번호,
 * 정보 밀도를 높인 다요소 카드, 표 옆 데이터 차트, 도넛 커스텀 분해 범례(막대), 활동별 컬러 테마,
 * 사진 오버레이 캡션, WV 호라이즌 아크 브랜드 마감. (원본 build-deck.cjs는 그대로 유지) */
const pptxgen = require('pptxgenjs')
const fs = require('fs')
const ACTUALS = JSON.parse(fs.readFileSync('C:/dev/food-crisis-dashboard/reports/actuals-final.json', 'utf8').replace(/^﻿/, ''))

const PUB = 'C:/dev/food-crisis-dashboard/public'
const MID = '111222', ORANGE = 'FF5515', FIELD = 'F3F2F0', TEAL = '0E7C7B'
const RED = 'C8102E', AMBER = 'C77E0A', GREEN = '2F7D4F', BLUE = '2D6CB6', PURPLE = '7A3E9D'
const G8 = '3A3A3A', G6 = '6B6B6B', G5 = '9A9A9A', WHITE = 'FFFFFF', LINE = 'E3E1DD', TRACK = 'E8E6E2'
const KR = '맑은 고딕', EN = 'Arial'
const W = 13.333, H = 7.5, ML = 0.65, CW = W - ML * 2 // content width 12.033

const shadow = () => ({ type: 'outer', color: '000000', blur: 7, offset: 2, angle: 90, opacity: 0.12 })
const softShadow = () => ({ type: 'outer', color: '6B6B6B', blur: 9, offset: 3, angle: 90, opacity: 0.16 })

const pres = new pptxgen()
pres.layout = 'LAYOUT_WIDE'
pres.author = '월드비전 인도적지원팀'
pres.title = '2025 글로벌 식량위기 대응사업 — 최종 결과보고 (v3)'

// shape 별칭
const RR = pres.shapes.ROUNDED_RECTANGLE, RECT = pres.shapes.RECTANGLE
const OVAL = pres.shapes.OVAL, LN = pres.shapes.LINE

// ---------- 공통 컴포넌트 ----------
// 섹션 헤더: 좌측 컬러 액센트 레일 + 영문 eyebrow + 국문 타이틀
function header(s, eyebrow, title, color) {
  color = color || ORANGE
  s.addShape(RR, { x: ML, y: 0.55, w: 0.12, h: 0.62, fill: { color }, rectRadius: 0.06 })
  s.addText(eyebrow, { x: ML + 0.28, y: 0.5, w: 11.5, h: 0.3, fontFace: KR, fontSize: 11, bold: true, color, charSpacing: 2 })
  s.addText(title, { x: ML + 0.26, y: 0.78, w: 11.6, h: 0.55, fontFace: KR, fontSize: 25, bold: true, color: MID })
}
// 슬라이드 하단 푸터 스트립(워드마크 + 페이지)
function footer(s, page) {
  s.addShape(LN, { x: ML, y: 7.06, w: CW, h: 0, line: { color: LINE, width: 0.75 } })
  s.addText('WORLD VISION  ✕  WFP', { x: ML, y: 7.11, w: 5, h: 0.28, fontFace: KR, fontSize: 9, bold: true, color: G5, charSpacing: 1 })
  s.addText('2025 글로벌 식량위기 대응사업 · 최종 결과보고', { x: 4.1, y: 7.11, w: 5.1, h: 0.28, align: 'center', fontFace: KR, fontSize: 9, color: G5 })
  s.addText(`${String(page).padStart(2, '0')} / 14`, { x: W - ML - 2, y: 7.11, w: 2, h: 0.28, align: 'right', fontFace: EN, fontSize: 9, bold: true, color: G6 })
}
// 가로 진행 막대(트랙 + 채움)
function progress(s, x, y, w, pct, color) {
  s.addShape(RR, { x, y, w, h: 0.16, fill: { color: TRACK }, rectRadius: 0.08 })
  s.addShape(RR, { x, y, w: Math.max(0.16, (w * Math.min(pct, 100)) / 100), h: 0.16, fill: { color }, rectRadius: 0.08 })
}

// ===================================================================
// Slide 1 — 표지
// ===================================================================
{
  const s = pres.addSlide()
  s.background = { color: MID }
  s.addImage({ path: `${PUB}/hero/hero-poster.jpg`, x: 0, y: 0, w: W, h: H, sizing: { type: 'cover', w: W, h: H } })
  // 가독성 오버레이(전체 + 하단 강조)
  s.addShape(RECT, { x: 0, y: 0, w: W, h: H, fill: { color: MID, transparency: 38 } })
  s.addShape(RECT, { x: 0, y: 3.7, w: W, h: 3.8, fill: { color: MID, transparency: 28 } })
  // 상단 워드마크 + 얇은 오렌지 룰
  s.addText('WORLD VISION  ✕  WFP', { x: 0.8, y: 0.62, w: 7, h: 0.32, fontFace: KR, fontSize: 12, bold: true, color: WHITE, charSpacing: 2 })
  s.addShape(LN, { x: 0.82, y: 1.0, w: 1.5, h: 0, line: { color: ORANGE, width: 2 } })
  // 타이틀 블록
  s.addText('다자기구협력사업  ·  HUMANITARIAN RESPONSE 2025', { x: 0.8, y: 4.35, w: 11.5, h: 0.34, fontFace: KR, fontSize: 13, bold: true, color: ORANGE, charSpacing: 2 })
  s.addText('2025 글로벌 식량위기 대응사업', { x: 0.78, y: 4.72, w: 12, h: 0.95, fontFace: KR, fontSize: 41, bold: true, color: WHITE })
  s.addText('최종 결과보고  ·  FINAL REPORT', { x: 0.8, y: 5.74, w: 10, h: 0.42, fontFace: KR, fontSize: 17, color: 'EDEDED' })
  // 하단 KPI 리본
  s.addShape(LN, { x: 0.82, y: 6.42, w: 3.1, h: 0, line: { color: ORANGE, width: 2 } })
  const kpis = [['13개국', '20개 사업'], ['10,235톤', '식량 배분'], ['$5.1M', '현금·교환권'], ['336억원', '총 사업비']]
  const rx = 0.8, rw = 11.3, cw = rw / kpis.length
  kpis.forEach((k, i) => {
    const x = rx + i * cw
    if (i > 0) s.addShape(LN, { x, y: 6.66, w: 0, h: 0.52, line: { color: 'FFFFFF', width: 0.75, transparency: 55 } })
    s.addText(k[0], { x: x + (i ? 0.22 : 0), y: 6.6, w: cw - 0.3, h: 0.42, fontFace: KR, fontSize: 21, bold: true, color: WHITE })
    s.addText(k[1], { x: x + (i ? 0.22 : 0), y: 7.0, w: cw - 0.3, h: 0.3, fontFace: KR, fontSize: 11, color: 'CFCFCF' })
  })
  s.addText('© World Vision / Jon Warren · Ethiopia 2025', { x: 7.3, y: 0.66, w: 5.55, h: 0.3, align: 'right', fontFace: EN, fontSize: 10, color: 'FFFFFF', transparency: 30 })
}

// ===================================================================
// Slide 2 — 한눈에 보는 성과 (KPI)
// ===================================================================
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, 'AT A GLANCE  ·  요약', '한눈에 보는 2025 성과')
  s.addText('한국의 기여가 13개국 식량위기 현장에서 만들어낸 한 해의 결과입니다.', { x: ML + 0.26, y: 1.34, w: 11.6, h: 0.34, fontFace: KR, fontSize: 13.5, color: G6 })
  const cards = [
    { label: '식량 배분', num: '10,235.1', unit: '톤', c: ORANGE, note: '계획 21,133톤의 48% 집행' },
    { label: '영양 치료식', num: '998.1', unit: '톤', c: RED, note: '식량 배분량에 포함된 치료식' },
    { label: '현금·교환권', num: '$5.1M', unit: '≈ 68억원', c: TEAL, note: '시장 기능 회복 지역 대상' },
    { label: '자금 레버리지', num: '24배', unit: '한국 기여 대비', c: ORANGE, note: '14.0억원 → 336억원으로 확장' },
    { label: '총 사업비', num: '$25.3M', unit: '≈ 336억원', c: MID, note: 'WFP 다자협력으로 집행' },
    { label: '사업 규모', num: '13개국', unit: '20개 사업', c: GREEN, note: '아프리카·중동·아시아 전역' },
  ]
  const gx = 0.36, gy = 0.4, cardW = (CW - gx * 2) / 3, cardH = 2.25, x0 = ML, y0 = 1.92
  cards.forEach((cd, i) => {
    const cx = x0 + (i % 3) * (cardW + gx), cy = y0 + Math.floor(i / 3) * (cardH + gy)
    s.addShape(RR, { x: cx, y: cy, w: cardW, h: cardH, fill: { color: FIELD }, line: { color: LINE, width: 1 }, rectRadius: 0.09, shadow: shadow() })
    s.addShape(OVAL, { x: cx + 0.34, y: cy + 0.36, w: 0.13, h: 0.13, fill: { color: cd.c } })
    s.addText(cd.label, { x: cx + 0.56, y: cy + 0.28, w: cardW - 0.8, h: 0.32, fontFace: KR, fontSize: 13.5, bold: true, color: G6 })
    s.addText(cd.num, { x: cx + 0.33, y: cy + 0.68, w: cardW - 0.6, h: 0.78, fontFace: KR, fontSize: 41, bold: true, color: cd.c })
    s.addText(cd.unit, { x: cx + 0.36, y: cy + 1.48, w: cardW - 0.7, h: 0.3, fontFace: KR, fontSize: 12.5, color: G5 })
    s.addShape(LN, { x: cx + 0.36, y: cy + 1.86, w: cardW - 0.72, h: 0, line: { color: LINE, width: 0.75 } })
    s.addText(cd.note, { x: cx + 0.36, y: cy + 1.9, w: cardW - 0.72, h: 0.3, fontFace: KR, fontSize: 11, color: G6 })
  })
  footer(s, 2)
}

// ===================================================================
// Slide 3 — 01 WHY 원인·영향
// ===================================================================
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, '01  ·  WHY', '식량위기의 원인과 그 영향', ORANGE)
  s.addText('분쟁·기후·경제 충격이 겹치며 위기는 깊어지고, 그 그늘은 가장 먼저 아동에게 드리웁니다.', { x: ML + 0.26, y: 1.34, w: 11.6, h: 0.32, fontFace: KR, fontSize: 13, color: G6 })
  // 핵심 수치 리본 (3셀)
  const stats = [
    { big: '15 / 16', lab: '2025 주요 식량위기국 중 분쟁 영향', c: ORANGE },
    { big: '50% 미만', lab: '권장 칼로리 대비 축소된 배급 사례', c: AMBER },
    { big: '약 2배', lab: '배급 삭감 가구 아동의 조혼·이탈 위험', c: RED },
  ]
  const sgx = 0.3, sw = (CW - sgx * 2) / 3, sy = 1.78
  stats.forEach((st, i) => {
    const x = ML + i * (sw + sgx)
    s.addShape(RR, { x, y: sy, w: sw, h: 0.92, fill: { color: FIELD }, rectRadius: 0.08 })
    s.addShape(RR, { x, y: sy, w: 0.1, h: 0.92, fill: { color: st.c }, rectRadius: 0.05 })
    s.addText(st.big, { x: x + 0.28, y: sy + 0.12, w: sw - 0.4, h: 0.42, fontFace: KR, fontSize: 23, bold: true, color: st.c })
    s.addText(st.lab, { x: x + 0.28, y: sy + 0.55, w: sw - 0.45, h: 0.3, fontFace: KR, fontSize: 10.5, color: G6 })
  })
  // 두 칼럼: 근본 원인 / 아동에게 드리운 그늘
  const colY = 3.06, colW = (CW - 0.5) / 2, lx = ML, rx = ML + colW + 0.5
  s.addText('근본 원인', { x: lx, y: colY, w: colW, h: 0.34, fontFace: KR, fontSize: 14, bold: true, color: MID })
  s.addText('아동에게 드리운 그늘', { x: rx, y: colY, w: colW, h: 0.34, fontFace: KR, fontSize: 14, bold: true, color: RED })
  s.addShape(LN, { x: lx, y: colY + 0.38, w: colW, h: 0, line: { color: LINE, width: 1 } })
  s.addShape(LN, { x: rx, y: colY + 0.38, w: colW, h: 0, line: { color: LINE, width: 1 } })
  const causes = [
    [ORANGE, '분쟁 및 불안정', '콩고민주공화국·수단 등 장기 내전으로 대규모 난민이 발생. 위기를 만드는 가장 큰 동인입니다.'],
    [BLUE, '기후변화', '잦은 가뭄·홍수와 불규칙한 날씨가 흉작·농업 피해로 이어져 취약 지역의 식량 생산성을 직접 떨어뜨립니다.'],
    [AMBER, '경제적 충격', '고물가·식량가격 폭등으로 구매력이 무너지고, 배급량이 권장 칼로리의 절반 미만으로 축소되기도 합니다.'],
  ]
  const impacts = [
    [AMBER, '교육의 중단', '끼니를 위해 학교 대신 노동으로 내몰리며 배움의 기회를 잃습니다.'],
    [RED, '조혼과 가족 분리', '배급이 삭감된 가구의 아동은 조혼·학업중단·가족분리 위험이 약 2배로 높아집니다.'],
    [PURPLE, '정신건강의 위기', '굶주림과 불안정한 환경 속에서 불안·우울 등 심리적 고통이 커집니다.'],
  ]
  const itemY = colY + 0.56, itemH = 0.96, gap = 0.12
  const drawItem = (x, i, r) => {
    const y = itemY + i * (itemH + gap)
    s.addShape(RR, { x, y, w: colW, h: itemH, fill: { color: WHITE }, line: { color: LINE, width: 1 }, rectRadius: 0.06 })
    s.addShape(RR, { x, y, w: 0.1, h: itemH, fill: { color: r[0] }, rectRadius: 0.05 })
    s.addText(r[1], { x: x + 0.28, y: y + 0.12, w: colW - 0.45, h: 0.3, fontFace: KR, fontSize: 13, bold: true, color: MID })
    s.addText(r[2], { x: x + 0.28, y: y + 0.42, w: colW - 0.5, h: 0.52, fontFace: KR, fontSize: 11, color: G6, lineSpacingMultiple: 1.02, valign: 'top' })
  }
  causes.forEach((r, i) => drawItem(lx, i, r))
  impacts.forEach((r, i) => drawItem(rx, i, r))
  s.addText('출처: WFP × World Vision 공동연구 「In the Shadow of Hunger」 (2026) · Hunger Hotspots (WFP & FAO, 2025)', { x: ML, y: 6.74, w: 11.7, h: 0.26, fontFace: KR, fontSize: 9.5, italic: true, color: G5 })
  footer(s, 3)
}

// ===================================================================
// Slide 4 — 02 WHERE 국가별 배분 + 상위국 차트
// ===================================================================
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, '02  ·  WHERE', '국가별 배분 실적', ORANGE)
  s.addText('13개국 20개 사업 누적 · 환율 1,330원/USD · 치료식 무게는 식량 배분량에 포함된 부분집합입니다.', { x: ML + 0.26, y: 1.34, w: 11.6, h: 0.3, fontFace: KR, fontSize: 12, color: G6 })
  // ---- 표(좌) ----
  const hc = { fill: { color: MID }, color: WHITE, bold: true, fontFace: KR, fontSize: 11, valign: 'middle' }
  const head = [
    { text: '국가', options: { ...hc, align: 'left' } },
    { text: '식량(톤)', options: { ...hc, align: 'right' } },
    { text: '현금·교환권', options: { ...hc, align: 'right' } },
    { text: '치료식', options: { ...hc, align: 'right' } },
  ]
  const rows = [
    ['콩고민주공화국', '3,797.0', '—', '151.1'],
    ['수단', '3,322.1', '$324K', '51.4'],
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
    ['케냐(생계 강화)', '—', '—', '—'],
  ]
  const body = rows.map((r, ri) => {
    const isMax = ri === 0
    const bg = isMax ? 'FBE3D8' : (ri % 2 ? FIELD : WHITE)
    return r.map((cell, ci) => ({
      text: cell,
      options: {
        fontFace: KR, fontSize: 11, valign: 'middle', align: ci === 0 ? 'left' : 'right',
        color: ci === 0 ? MID : (cell === '—' ? 'C9C7C2' : (ci === 2 ? TEAL : (ci === 3 ? RED : G8))),
        bold: ci === 0 || (isMax && ci === 1), fill: { color: bg },
      },
    }))
  })
  const total = ['합계', '10,235.1', '$5.1M', '998.1'].map((t, i) => ({
    text: t, options: { fontFace: KR, fontSize: 11.5, bold: true, valign: 'middle', align: i === 0 ? 'left' : 'right', color: WHITE, fill: { color: ORANGE } },
  }))
  s.addTable([head, ...body, total], {
    x: ML, y: 1.78, w: 6.7, colW: [2.7, 1.4, 1.4, 1.2], rowH: 0.318,
    border: { type: 'solid', pt: 0.5, color: LINE }, margin: [2, 5, 2, 5], autoPage: false,
  })
  s.addText([
    { text: '■ ', options: { color: 'FBE3D8' } },
    { text: '최다 배분 — 콩고민주공화국 3,797.0톤', options: { color: G6 } },
  ], { x: ML, y: 6.66, w: 6.7, h: 0.26, fontFace: KR, fontSize: 9.5, italic: true })
  // ---- 상위국 식량 배분 차트(우) ----
  s.addText('식량 배분 상위 8개국 (톤)', { x: 7.7, y: 1.78, w: 5.0, h: 0.34, fontFace: KR, fontSize: 13, bold: true, color: MID })
  const foodc = [['콩고민주공화국', 3797.0], ['수단', 3322.1], ['아프가니스탄', 829.3], ['에티오피아', 695.8], ['우간다', 505.0], ['베네수엘라', 475.5], ['남수단', 411.9], ['차드', 198.5]]
  const disp = [...foodc].reverse() // pptx 가로막대는 첫 항목이 하단 → 최대값을 상단에 두려 역순
  const colorsBar = disp.map((d) => (d[1] >= 3000 ? ORANGE : d[1] >= 800 ? 'EC7A52' : 'F4A988'))
  s.addChart(pres.charts.BAR, [{ name: '식량(톤)', labels: disp.map((d) => d[0]), values: disp.map((d) => d[1]) }], {
    x: 7.55, y: 2.18, w: 5.18, h: 4.35, barDir: 'bar', chartColors: colorsBar, barGapWidthPct: 38,
    showValue: true, dataLabelPosition: 'outEnd', dataLabelColor: G8, dataLabelFontFace: KR, dataLabelFontSize: 9.5, dataLabelFormatCode: '#,##0',
    catAxisLabelColor: G8, catAxisLabelFontFace: KR, catAxisLabelFontSize: 10.5,
    valAxisHidden: true, valGridLine: { style: 'none' }, catGridLine: { style: 'none' }, valAxisMaxVal: 4400, valAxisMinVal: 0,
    showLegend: false, showTitle: false, chartArea: { fill: { color: WHITE } }, plotArea: { fill: { color: WHITE } },
  })
  footer(s, 4)
}

// ===================================================================
// Slides 5–9 — 03 WHAT 핵심 활동(활동별 1장, 컬러 테마)
// ===================================================================
const ACTIVITIES = [
  {
    c: ORANGE, en: 'In-kind Food Distribution', name: '일반식량 배분',
    lead: '극심한 식량난을 겪는 취약계층에게 정기적으로 현물 식량을 배분합니다.',
    points: [
      '1인 1일 최소 필요 열량 2,100kcal을 기준으로, 가족 구성원 수에 따라 지급합니다.',
      '사업 지역에 따라 수수·콩·옥수수·식용유 등 배분 식량의 종류가 달라집니다.',
      '시장 접근이 어렵거나 식량 공급이 끊긴 긴급 상황에 가장 먼저 적용합니다.',
    ],
    steps: ['식량 운송', '보관·검수', '수혜자 확인', '정기 배분'],
    statBig: '2,100', statUnit: 'kcal', statLabel: '1인 1일 최소 필요 열량 기준',
    panelNote: '시장 접근이 끊긴 분쟁·재난 지역에서 가장 먼저 투입되는 생명선입니다.',
  },
  {
    c: TEAL, en: 'Cash & Voucher Assistance', name: '현금·교환권 배분',
    lead: '시장 기능이 살아있는 지역에서 현금·교환권을 지급해 수혜자가 직접 식량을 구매하게 합니다.',
    points: [
      '은행·모바일 계좌 이체 또는 현금으로 직접 지급합니다.',
      '운송·보관비를 줄여 효율적이고, 수혜자가 직접 고르며 존엄성도 지킵니다.',
      "'Cash for Work' — 산림 조성·농경지 개간·도로 보수 등 지역사회 복구에 참여한 대가로 현금을 지급합니다.",
    ],
    steps: ['수혜자 확인', '현금·교환권 수령', '직접 식량 구매'],
    statBig: '$5.1M', statUnit: '≈ 68억원', statLabel: '현금·교환권 누적 배분액',
    panelNote: '콩고·우간다 등 시장이 살아있는 지역에서 효율과 존엄성을 동시에 높였습니다.',
  },
  {
    c: RED, en: 'Nutrition Treatment', name: '영양 치료식',
    lead: '5세 미만 아동·임산부·수유부를 대상으로 영양실조를 진단하고 치료합니다.',
    points: [
      '상완위 둘레 측정(MUAC) 등으로 아동·성인의 영양 상태를 진단합니다.',
      '상태에 따라 입원·통원 치료, 영양 보충식(플럼피넛 등)을 지급합니다.',
      '마을 영양 자원봉사자·어머니 자조그룹과 함께 회복을 추적 관리합니다.',
    ],
    steps: ['영양 상태 진단', '치료 방식 결정', '치료식 지급', '회복 추적'],
    statBig: '998.1', statUnit: '톤', statLabel: '영양 치료식 누계 (식량에 포함)',
    panelNote: '에티오피아·콩고 영양사업에 집중 — 5세 미만 아동의 생존을 좌우합니다.',
  },
  {
    c: AMBER, en: 'School Feeding', name: '학교 급식',
    lead: '학교에 출석하는 아동에게 정기적으로 급식을 제공해 영양과 출석률을 함께 높입니다.',
    points: [
      '성장에 필요한 필수 영양소 섭취를 지원해 아동의 건강을 지킵니다.',
      '학교 내 조리시설에서 직접 조리해 학생에게 배식합니다.',
      '교내 텃밭 조성·지역 식재료 조달로 일자리와 지역경제까지 연결됩니다.',
    ],
    steps: ['식사 준비·조리', '학생 배식', '텃밭·식재료 수급'],
    statBig: '+9%', statUnit: '', statLabel: '급식 시행 후 학교 등록률 향상',
    panelNote: '급식은 아동을 교실로 불러오고, 텃밭은 지역경제로 이어집니다.',
  },
  {
    c: GREEN, en: 'Livelihood & Resilience', name: '생계 역량 강화',
    lead: '다시 식량위기를 겪지 않도록 주민 주도의 생계 회복력을 길러냅니다.',
    points: [
      '기후변화 적응 종자 지원과 농업 기술 훈련을 제공합니다.',
      '농업보험으로 흉작이 들어도 최소한의 생계수단을 확보합니다.',
      '마을저축그룹(VSLA) — 낮은 이율·높은 접근성, 이자는 구성원에게 재배분되어 의료·교육·투자에 자유롭게 쓰입니다.',
    ],
    steps: ['저축 그룹 형성', '종자·기술·보험 지원', '소득·자본 형성'],
    statBig: '자립', statUnit: '', statLabel: '주민 주도 회복력 강화',
    panelNote: "케냐 등에서 저축 그룹·종자·기술로 '다음 위기'를 견디는 힘을 길렀습니다.",
  },
]
// 활동별 대표 현장 사진 (public/gallery) — 식량/현금/영양/학교/생계 순
const ACT_PHOTOS = ['223847-1', '223748-3', '223707-1', '223806-1', '223864-1']
ACTIVITIES.forEach((a, idx) => {
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, `03  ·  WHAT  —  핵심 활동  ${idx + 1} / 5`, a.name, a.c)
  s.addText(a.en, { x: ML + 0.26, y: 1.36, w: 8, h: 0.3, fontFace: EN, fontSize: 13, bold: true, color: a.c })
  // 리드 + 컬러 룰
  s.addText(a.lead, { x: ML + 0.26, y: 1.82, w: 7.6, h: 0.8, fontFace: KR, fontSize: 16, bold: true, color: MID, lineSpacingMultiple: 1.16, valign: 'top' })
  s.addShape(LN, { x: ML + 0.28, y: 2.66, w: 1.4, h: 0, line: { color: a.c, width: 2.5 } })
  // 불릿
  s.addText(a.points.map((p) => ({ text: p, options: { bullet: { code: '2022', indent: 14 }, breakLine: true, paraSpaceAfter: 11 } })),
    { x: ML + 0.28, y: 2.92, w: 7.5, h: 2.7, fontFace: KR, fontSize: 13.5, color: G6, lineSpacingMultiple: 1.14, valign: 'top' })
  // 우측: 실제 활동 사진 + 컬러 지표 바
  const px = 8.62, pw = 4.06, py = 1.82
  const photoH = 2.28, barY = py + photoH, barH = 1.44
  s.addImage({ path: `${PUB}/gallery/${ACT_PHOTOS[idx]}.jpg`, x: px, y: py, w: pw, h: photoH, sizing: { type: 'cover', w: pw, h: photoH }, shadow: softShadow() })
  s.addShape(RR, { x: px, y: barY, w: pw, h: barH, fill: { color: a.c }, rectRadius: 0.08 })
  s.addText('핵심 지표', { x: px + 0.3, y: barY + 0.16, w: pw - 0.6, h: 0.26, fontFace: KR, fontSize: 10.5, bold: true, color: 'FFFFFF', transparency: 25, charSpacing: 1 })
  const bigSize = /\d/.test(a.statBig) ? 32 : 24
  s.addText([
    { text: a.statBig, options: { fontSize: bigSize, bold: true, color: WHITE } },
    ...(a.statUnit ? [{ text: '  ' + a.statUnit, options: { fontSize: 13, bold: true, color: 'FFE9E0' } }] : []),
  ], { x: px + 0.3, y: barY + 0.44, w: pw - 0.6, h: 0.58, fontFace: KR, valign: 'middle' })
  s.addText(a.statLabel, { x: px + 0.3, y: barY + 1.02, w: pw - 0.6, h: 0.36, fontFace: KR, fontSize: 10.5, color: 'F7F2F0', lineSpacingMultiple: 1.05, valign: 'top' })
  // 하단 '사업 형태' 번호 플로우
  s.addText('사업 형태', { x: ML, y: 5.82, w: 3, h: 0.3, fontFace: KR, fontSize: 12, bold: true, color: G6 })
  const stepN = a.steps.length, flowW = 11.9, segW = flowW / stepN, cyc = 6.36
  a.steps.forEach((st, i) => {
    const sx = ML + i * segW
    if (i < stepN - 1) s.addShape(LN, { x: sx + 0.34, y: cyc + 0.17, w: segW - 0.34, h: 0, line: { color: LINE, width: 1.5 } })
  })
  a.steps.forEach((st, i) => {
    const sx = ML + i * segW
    s.addShape(OVAL, { x: sx, y: cyc, w: 0.34, h: 0.34, fill: { color: a.c }, shadow: shadow() })
    s.addText(String(i + 1), { x: sx, y: cyc, w: 0.34, h: 0.34, align: 'center', valign: 'middle', fontFace: KR, fontSize: 12, bold: true, color: WHITE })
    s.addText(st, { x: sx + 0.44, y: cyc - 0.04, w: segW - 0.5, h: 0.42, valign: 'middle', fontFace: KR, fontSize: 12, bold: true, color: MID })
  })
  footer(s, 5 + idx)
})

// ===================================================================
// Slide 10 — 03 WHAT 배분 식량 구성(도넛 + 커스텀 분해 범례)
// ===================================================================
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, '03  ·  WHAT', '배분 식량 구성', ORANGE)
  s.addText('곡물 중심 열량원에 콩(단백질)·치료식(영양)을 더해 균형을 맞췄습니다. 총 10,235.1톤.', { x: ML + 0.26, y: 1.34, w: 11.6, h: 0.3, fontFace: KR, fontSize: 12.5, color: G6 })
  const labels = ['옥수수', '수수', '콩(렌틸 등)', '영양실조 치료식', '밀', '식용유', '쌀', '식량 키트', '기타', '소금']
  const values = [2947.3, 2808.5, 1278.6, 998.1, 828.0, 461.7, 357.1, 349.9, 125.6, 80.3]
  const colors = ['FF5515', 'C2410C', '2F7D4F', 'C8102E', 'E0A92E', 'F4C430', 'B6A98F', '6B7280', 'A8A29E', 'D6D3CD']
  const TOT = 10235.1, maxV = values[0]
  // 도넛(좌)
  s.addChart(pres.charts.DOUGHNUT, [{ name: '식량 구성', labels, values }], {
    x: 0.45, y: 1.85, w: 6.0, h: 4.85, holeSize: 62, chartColors: colors,
    showLegend: false, showValue: false, showPercent: false, showTitle: false,
    chartArea: { fill: { color: WHITE } }, plotArea: { fill: { color: WHITE } },
  })
  // 도넛 가운데 오버레이
  const ccx = 0.45 + 6.0 / 2, ccy = 1.85 + 4.85 / 2
  s.addText([
    { text: '10,235.1', options: { fontSize: 24, bold: true, color: MID, breakLine: true } },
    { text: '톤 · 2025 배분 식량', options: { fontSize: 11, bold: true, color: G6 } },
  ], { x: ccx - 1.25, y: ccy - 0.5, w: 2.5, h: 1.0, align: 'center', valign: 'middle', fontFace: KR })
  // 커스텀 분해 범례(우): 스와치 + 이름 + 막대 + 톤 + %
  const lx = 7.0, lw = 5.7, ly0 = 1.92, rh = 0.345
  s.addText([
    { text: '종류별 배분량', options: { bold: true, color: G6, fontSize: 11 } },
    { text: '          톤 · 비율', options: { color: G5, fontSize: 10 } },
  ], { x: lx, y: ly0 - 0.34, w: lw, h: 0.28, fontFace: KR })
  s.addShape(LN, { x: lx, y: ly0 - 0.04, w: lw, h: 0, line: { color: LINE, width: 0.75 } })
  const barX = lx + 1.6, barMaxW = 1.85
  labels.forEach((nm, i) => {
    const y = ly0 + i * rh
    s.addShape(RR, { x: lx, y: y + 0.07, w: 0.16, h: 0.16, fill: { color: colors[i] }, rectRadius: 0.03 })
    s.addText(nm, { x: lx + 0.26, y: y, w: 1.3, h: 0.3, fontFace: KR, fontSize: 11, color: MID, valign: 'middle' })
    s.addShape(RR, { x: barX, y: y + 0.08, w: barMaxW, h: 0.14, fill: { color: TRACK }, rectRadius: 0.07 })
    s.addShape(RR, { x: barX, y: y + 0.08, w: Math.max(0.05, (values[i] / maxV) * barMaxW), h: 0.14, fill: { color: colors[i] }, rectRadius: 0.07 })
    s.addText(values[i].toLocaleString(), { x: barX + barMaxW + 0.12, y: y, w: 1.0, h: 0.3, align: 'right', fontFace: KR, fontSize: 10.5, bold: true, color: G8, valign: 'middle' })
    s.addText(((values[i] / TOT) * 100).toFixed(1) + '%', { x: lx + lw - 0.75, y: y, w: 0.75, h: 0.3, align: 'right', fontFace: KR, fontSize: 10.5, bold: true, color: colors[i], valign: 'middle' })
  })
  // 전년 대비 박스
  const boxY = ly0 + labels.length * rh + 0.14
  s.addShape(RR, { x: lx, y: boxY, w: lw, h: 0.95, fill: { color: FIELD }, rectRadius: 0.08 })
  s.addShape(RR, { x: lx, y: boxY, w: 0.1, h: 0.95, fill: { color: ORANGE }, rectRadius: 0.05 })
  s.addText([
    { text: '전년 대비 식량 배분량 약 70% 증가', options: { bold: true, fontSize: 13.5, color: ORANGE, breakLine: true, paraSpaceAfter: 4 } },
    { text: '2024년 6,018톤  →  2025년 10,235.1톤  ·  수입 밀을 줄이고 역내 조달이 쉬운 수수·옥수수 중심으로 전환', options: { fontSize: 11, color: G6 } },
  ], { x: lx + 0.3, y: boxY + 0.16, w: lw - 0.55, h: 0.7, fontFace: KR, valign: 'top' })
  footer(s, 10)
}

// ===================================================================
// Slide 11 — 04 RESULT 성과(집행률 다이얼 + 레버리지 + 각주)
// ===================================================================
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, '04  ·  RESULT', '사업 성과', ORANGE)
  s.addText('한국의 작은 기여가 WFP 다자협력을 통해 13개국 식탁 위 결과로 확장되었습니다.', { x: ML + 0.26, y: 1.34, w: 11.6, h: 0.3, fontFace: KR, fontSize: 13, color: G6 })
  // 3개 성과 카드
  const dials = [
    { title: '식량 배분', val: '10,235.1', unit: '톤', pct: 48.4, sub: '계획 21,133톤 中 48.4%', c: ORANGE },
    { title: '현금·교환권', val: '$5.1M', unit: '≈68억원', pct: 63.4, sub: '계획 $8.05M 中 63.4%', c: TEAL },
    { title: '영양 치료식', val: '998.1', unit: '톤', pct: 100, sub: '급성 영양실조 치료식 누계', c: RED, noPct: true },
  ]
  const gx = 0.34, cardW = (CW - gx * 2) / 3, cardH = 1.72, y0 = 1.78
  dials.forEach((d, i) => {
    const cx = ML + i * (cardW + gx)
    s.addShape(RR, { x: cx, y: y0, w: cardW, h: cardH, fill: { color: WHITE }, line: { color: LINE, width: 1 }, rectRadius: 0.09, shadow: shadow() })
    s.addShape(RR, { x: cx, y: y0, w: cardW, h: 0.09, fill: { color: d.c }, rectRadius: 0.04 })
    s.addText(d.title, { x: cx + 0.3, y: y0 + 0.22, w: cardW - 0.6, h: 0.3, fontFace: KR, fontSize: 12.5, bold: true, color: G6 })
    s.addText([
      { text: d.val, options: { fontSize: 27, bold: true, color: MID } },
      { text: '  ' + d.unit, options: { fontSize: 12, bold: true, color: G5 } },
    ], { x: cx + 0.28, y: y0 + 0.5, w: cardW - 0.5, h: 0.5, fontFace: KR, valign: 'middle' })
    progress(s, cx + 0.3, y0 + 1.12, cardW - 0.6, d.pct, d.c)
    s.addText(d.noPct ? d.sub : `${d.sub}`, { x: cx + 0.3, y: y0 + 1.34, w: cardW - 0.6, h: 0.3, fontFace: KR, fontSize: 10.5, color: G6 })
  })
  // 레버리지 밴드(다크)
  const by = 3.74, bh = 1.62
  s.addShape(RR, { x: ML, y: by, w: CW, h: bh, fill: { color: MID }, rectRadius: 0.1, shadow: softShadow() })
  s.addText('자금 레버리지', { x: ML + 0.4, y: by + 0.26, w: 3.4, h: 0.3, fontFace: KR, fontSize: 13, bold: true, color: 'C9C9D2' })
  s.addText('24×', { x: ML + 0.36, y: by + 0.5, w: 3.2, h: 0.95, fontFace: KR, fontSize: 56, bold: true, color: ORANGE })
  // 흐름: 14.0억 → 336억
  const fx = ML + 4.0
  s.addShape(RR, { x: fx, y: by + 0.42, w: 2.7, h: 0.78, fill: { color: 'FFFFFF', transparency: 86 }, rectRadius: 0.08 })
  s.addText([
    { text: '한국 기여 (매칭)', options: { fontSize: 10, color: 'B9B9C4', breakLine: true } },
    { text: '14.0억원', options: { fontSize: 19, bold: true, color: WHITE } },
  ], { x: fx + 0.2, y: by + 0.5, w: 2.3, h: 0.62, fontFace: KR, valign: 'middle' })
  s.addText('→', { x: fx + 2.7, y: by + 0.42, w: 0.9, h: 0.78, align: 'center', valign: 'middle', fontFace: EN, fontSize: 30, bold: true, color: ORANGE })
  s.addShape(RR, { x: fx + 3.6, y: by + 0.42, w: 4.05, h: 0.78, fill: { color: ORANGE }, rectRadius: 0.08 })
  s.addText([
    { text: 'WFP 다자협력 총 사업비', options: { fontSize: 10, color: 'FFE0D4', breakLine: true } },
    { text: '336억원  ', options: { fontSize: 22, bold: true, color: WHITE } },
    { text: '($25.3M)', options: { fontSize: 13, bold: true, color: 'FFE9E0' } },
  ], { x: fx + 3.82, y: by + 0.48, w: 3.7, h: 0.66, fontFace: KR, valign: 'middle' })
  // 각주
  s.addText([
    { text: '*  다자기구협력사업 특성상 사업 규모·일정은 글로벌 인도적지원 필요 상황, 도너(WFP) 자금 상황 및 식량 수급에 따라 변동될 수 있습니다.', options: { breakLine: true, paraSpaceAfter: 5 } },
    { text: '**  식량·현금 배분 집행률이 계획 목표에 미치지 못한 주요 사유 — ① 미국 USAID(국제개발처) 폐지에 따른 사업 축소·중단, ② 수단·콩고민주공화국 등 분쟁 심화, ③ 수단 화이트나일(White Nile) 사업의 현지 정부 승인 지연.', options: {} },
  ], { x: ML, y: 5.62, w: CW, h: 1.25, fontFace: KR, fontSize: 10.5, color: G6, lineSpacingMultiple: 1.08, valign: 'top' })
  footer(s, 11)
}

// ===================================================================
// Slide 12 — PBAS 사업별 재무 정리표 (실제 집행 기준)
// ===================================================================
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, 'PBAS FINANCE  ·  사업별 재무', '사업별 재무 정리표 (실제 집행 기준)')
  s.addText('WFP REPORT · Korea · Actual PBAS Commitment 기준 · 단위 원 · 환율 $1=1,330원 · 유엔 WFP 지원금 = 식량 + 현금 + 운송·보관·기타', { x: ML + 0.26, y: 1.3, w: 11.9, h: 0.3, fontFace: KR, fontSize: 10, color: G6 })

  const won = (n) => n ? Math.round(n).toLocaleString('en-US') : '–'
  const H0 = { fill: { color: MID }, color: WHITE, bold: true, fontSize: 8.5, align: 'center', valign: 'middle' }
  const head = [
    { text: '2025 사업 (국가·지역)', options: { ...H0, align: 'left' } },
    { text: '월드비전 부담금', options: H0 },
    { text: '식량', options: H0 },
    { text: '현금', options: H0 },
    { text: '운송·보관·기타', options: H0 },
    { text: '총 사업비', options: H0 },
    { text: '배', options: H0 },
  ]
  const body = ACTUALS.rows.map((r, i) => {
    const bg = i % 2 ? 'FBF7F2' : 'FFFFFF'
    const region = r.site.replace(/\s*\(.*\)\s*/, '').trim()
    const wn = r.grant === 0
    const c = (text, extra) => ({ text, options: { fontSize: 8, valign: 'middle', fill: { color: bg }, ...extra } })
    return [
      c(`${r.ko} ${region}${wn ? ' (미진행)' : ''}`, { align: 'left', color: G8 }),
      c(won(r.wv), { align: 'right', color: ORANGE, bold: true }),
      c(won(r.food), { align: 'right', color: G8 }),
      c(won(r.cash), { align: 'right', color: TEAL }),
      c(won(r.trans), { align: 'right', color: BLUE }),
      c(won(r.grant), { align: 'right', color: MID, bold: true }),
      c(r.lev >= 1 ? Math.round(r.lev) + '배' : '–', { align: 'center', color: G8 }),
    ]
  })
  const T = ACTUALS.T
  const live = ACTUALS.rows.filter((r) => r.lev >= 1)
  const avg = Math.round(live.reduce((a, r) => a + r.lev, 0) / live.length)
  const tc = (text, fillc, extra) => ({ text, options: { fontSize: 8.5, bold: true, valign: 'middle', color: WHITE, fill: { color: fillc }, ...extra } })
  const totRow = [
    tc('총 합', MID, { align: 'center' }),
    tc(won(T.wv), ORANGE, { align: 'right' }),
    tc(won(T.food), BLUE, { align: 'right' }),
    tc(won(T.cash), BLUE, { align: 'right' }),
    tc(won(T.trans), BLUE, { align: 'right' }),
    tc(won(T.grant), '0E1626', { align: 'right' }),
    tc('평균 ' + avg + '배', GREEN, { align: 'center' }),
  ]
  s.addTable([head, ...body, totRow], {
    x: ML, y: 1.66, w: CW,
    colW: [3.3, 1.55, 1.72, 1.55, 1.55, 1.76, 0.6],
    rowH: 0.2, fontFace: KR, valign: 'middle',
    border: { type: 'solid', color: LINE, pt: 0.5 }, margin: 0.03, autoPage: false,
  })
  s.addText('총 사업비 합계 약 336억원 = 식량 211.0억 + 현금 67.9억 + 운송·기타 57.5억   ·   월드비전 부담금 약 14.0억원   ·   사업별 보고 시점 차이로 총액은 시점별 차이가 있을 수 있음 · 백나일(223856) 미진행', { x: ML, y: 6.76, w: CW, h: 0.3, fontFace: KR, fontSize: 9, color: G6 })
  footer(s, 12)
}

// ===================================================================
// Slide 13 — 05 GALLERY 현장의 기록 (1 + 3 에디토리얼)
// ===================================================================
{
  const s = pres.addSlide(); s.background = { color: WHITE }
  header(s, '05  ·  GALLERY', '현장의 기록', ORANGE)
  s.addText('10개국 현장 사진 — 식량·현금·영양·학교·생계 전 활동의 기록', { x: ML + 0.26, y: 1.34, w: 11.6, h: 0.3, fontFace: KR, fontSize: 12, color: G6 })
  // 사진 + 오버레이 캡션
  const cap = (x, y, w, h, tag, place, credit) => {
    const strip = 0.56
    s.addShape(RECT, { x, y: y + h - strip, w, h: strip, fill: { color: MID, transparency: 12 } })
    s.addText([
      { text: tag + '   ', options: { color: ORANGE, bold: true, fontSize: 10 } },
      { text: place, options: { color: WHITE, bold: true, fontSize: 11.5 } },
    ], { x: x + 0.16, y: y + h - strip + 0.06, w: w - 0.3, h: 0.26, fontFace: KR, valign: 'middle' })
    s.addText(credit, { x: x + 0.16, y: y + h - 0.2, w: w - 0.3, h: 0.16, fontFace: EN, fontSize: 7, color: 'D9D9D9' })
  }
  const galleryPhotos = [
    ['223756-1', '생계 역량 강화', '남수단 · 파쇼다', 'South Sudan'],
    ['223999-1', '현금 배분', '중앙아프리카 · 부아르', 'CAR'],
    ['223255-1', '일반식량 배분', '아프가니스탄 · 고르', 'Afghanistan'],
    ['223766-1', '일반식량 배분', '우간다 · 비디비디', 'Uganda'],
    ['223745-2', '영양 치료식', '수단 · 남다르푸르', 'Sudan'],
    ['223806-2', '학교 급식', '베네수엘라 · 줄리아', 'Venezuela'],
  ]
  const cols = 3, gpx = 0.3, gpy = 0.32, gy0 = 1.72, gph = 2.3
  const gpw = (CW - gpx * (cols - 1)) / cols
  galleryPhotos.forEach((p, i) => {
    const x = ML + (i % cols) * (gpw + gpx), y = gy0 + Math.floor(i / cols) * (gph + gpy)
    s.addImage({ path: `${PUB}/gallery/${p[0]}.jpg`, x, y, w: gpw, h: gph, sizing: { type: 'cover', w: gpw, h: gph }, shadow: shadow() })
    cap(x, y, gpw, gph, p[1], p[2], `© World Vision · ${p[3]} 2025`)
  })
  footer(s, 13)
}

// ===================================================================
// Slide 14 — 출처 · 안내 (다크 + 호라이즌 아크)
// ===================================================================
{
  const s = pres.addSlide(); s.background = { color: MID }
  // WV 호라이즌 아크(우하단 브랜드 마감)
  s.addImage({ path: `${PUB}/brand/horizon-br.png`, x: 6.5, y: 3.66, w: 6.83, h: 3.84 })
  s.addShape(RR, { x: 0.8, y: 0.7, w: 0.12, h: 0.6, fill: { color: ORANGE }, rectRadius: 0.06 })
  s.addText('SOURCES & NOTICE', { x: 1.06, y: 0.66, w: 8, h: 0.3, fontFace: KR, fontSize: 11, bold: true, color: ORANGE, charSpacing: 2 })
  s.addText('출처 · 안내', { x: 1.04, y: 0.94, w: 8, h: 0.6, fontFace: KR, fontSize: 26, bold: true, color: WHITE })
  const block = (y, label, lines) => {
    s.addText(label, { x: 0.85, y, w: 5.5, h: 0.3, fontFace: KR, fontSize: 12, bold: true, color: ORANGE, charSpacing: 1 })
    s.addText(lines.map((t, i) => ({ text: t, options: { breakLine: true, paraSpaceAfter: i < lines.length - 1 ? 3 : 0 } })),
      { x: 0.85, y: y + 0.32, w: 6.4, h: 1.0, fontFace: KR, fontSize: 13, color: 'D7D7DE', lineSpacingMultiple: 1.18, valign: 'top' })
  }
  block(2.0, '출처', ['Hunger Hotspots (WFP & FAO, 2025)', '「In the Shadow of Hunger」 (WFP & World Vision, 2026)'])
  block(3.35, '기준', ['계획 수치는 제안서(2025.03), 배분 실적은 2025.1~12 누적', '환율 1,330원/USD · 월드비전 기여분 기준'])
  block(4.7, '문의', ['월드비전 인도적지원팀 조항빈', 'hangbin_cho@worldvision.or.kr'])
  // 하단 카피라이트 + 워드마크
  s.addShape(LN, { x: 0.85, y: 6.45, w: 7.0, h: 0, line: { color: '3A3A4A', width: 1 } })
  s.addText('© World Vision · 본 보고서 내 담긴 사진 및 영상에 대한 모든 저작권은 월드비전에 있으며, 무단 도용 및 배포를 금합니다.', { x: 0.85, y: 6.58, w: 7.4, h: 0.5, fontFace: KR, fontSize: 10.5, color: '9A9AA8', lineSpacingMultiple: 1.1 })
  s.addText('WORLD VISION  ✕  WFP   ·   2025 글로벌 식량위기 대응사업', { x: 0.85, y: 7.12, w: 8, h: 0.3, fontFace: KR, fontSize: 10.5, bold: true, color: ORANGE, charSpacing: 1 })
}

// ---------- 저장 (v3 파일명, 잠금 시 _v3b) ----------
const OUT = 'C:/dev/food-crisis-dashboard/reports/2025_글로벌식량위기대응_결과보고_v3.pptx'
pres.writeFile({ fileName: OUT })
  .then((f) => console.log('WROTE', f))
  .catch(() => {
    const ALT = OUT.replace(/\.pptx$/, 'b.pptx')
    pres.writeFile({ fileName: ALT }).then((f) => console.log('WROTE_ALT', f)).catch((e2) => { console.error('ERR', e2); process.exit(1) })
  })
