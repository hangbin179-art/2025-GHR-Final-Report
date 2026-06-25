// 2025 사업 정리표 — "실제 집행(결과보고) 기준"
//   월드비전 부담금 = match(USD)         → 원 (×1330)
//   식량            = val(USD, 배분 실적 가액)
//   현금            = cash(USD, 배분 실적)
//   총 사업비       = wfpIncome(USD, 실제 수입 인식액)
//   운송·기타       = 총사업비 − 식량 − 현금   ← 여기서 음수 발생 가능
import { COUNTRIES } from '../src/data/countries.js'

const RATE = 1330
// 정리표 운송·기타 양수 유지용 override.
// countries.js의 val은 결과보고 PIVOT(213억)으로 원복됨. 단 223710은 PIVOT val(1,010,325)이
// 총사업비(wfpIncome)보다 커져 운송·기타가 음수가 되므로, 정리표에서만 재무약정값(WFP REPORT·Korea
// Commodity Value, 834,107)을 식량 가액으로 사용한다. 웹 식량가액(213억)에는 영향 없음.
const FIN_FOOD = { '223710': 834107 }
// countries.js 안의 FINANCE는 export가 아니라 재선언(동일 값)
const FINANCE = {
  '223255': { match: 29805, wfpIncome: 1541046 }, '223748': { match: 10000, wfpIncome: 1908676 },
  '223999': { match: 21477, wfpIncome: 134502 }, '223850': { match: 75000, wfpIncome: 526717 },
  '223799': { match: 71092, wfpIncome: 1498389 }, '223796': { match: 20959, wfpIncome: 1155857 },
  '223847': { match: 152358, wfpIncome: 5216567 }, '224041': { match: 30000, wfpIncome: 419395 },
  '223707': { match: 158468, wfpIncome: 2936901 }, '223864': { match: 23128, wfpIncome: 145554 },
  '223982': { match: 16248, wfpIncome: 72795 }, '223756': { match: 75312, wfpIncome: 1112107 },
  '223758': { match: 12528, wfpIncome: 152335 }, '223753': { match: 38715, wfpIncome: 482356 },
  '223745': { match: 18496, wfpIncome: 151245 }, '223710': { match: 27362, wfpIncome: 1210048 },
  '223711': { match: 22047, wfpIncome: 3163735 }, '223856': { match: 29210, wfpIncome: 0 },
  '223766': { match: 157554, wfpIncome: 1442610 }, '223806': { match: 60000, wfpIncome: 2021955 },
}

const won = (n) => Math.round(n).toLocaleString('en-US')
const rows = []
const byCountry = new Map()
const T = { wv: 0, food: 0, cash: 0, trans: 0, grant: 0 }

for (const c of COUNTRIES) {
  for (const p of c.projects) {
    const f = FINANCE[p.pbas]
    const wv = f.match * RATE
    const food = (FIN_FOOD[p.pbas] ?? p.val) * RATE
    const cash = p.cash * RATE
    const grant = f.wfpIncome * RATE
    const trans = grant - food - cash
    const lev = f.match ? grant / wv : 0
    rows.push({ pbas: p.pbas, ko: c.ko, site: p.site, wv, food, cash, trans, grant, lev, neg: trans < 0 })
    T.wv += wv; T.food += food; T.cash += cash; T.trans += trans; T.grant += grant
    const agg = byCountry.get(c.ko) || { wv: 0, food: 0, cash: 0, trans: 0, grant: 0 }
    agg.wv += wv; agg.food += food; agg.cash += cash; agg.trans += trans; agg.grant += grant
    byCountry.set(c.ko, agg)
  }
}

console.log('\n===== 실제 집행 기준 — 사업(PBAS)별 =====\n')
for (const r of rows) {
  console.log(`${r.neg ? '⚠ ' : '  '}${r.ko} ${r.site} [${r.pbas}]`)
  console.log(`     WV부담금 ${won(r.wv)} | 식량 ${won(r.food)} | 현금 ${won(r.cash)} | 운송·기타 ${won(r.trans)} | 총사업비 ${won(r.grant)} | ${r.lev.toFixed(0)}배`)
}

console.log('\n===== 음수(운송·기타<0) 사업만 — 원 단위 =====\n')
for (const r of rows.filter((x) => x.neg)) {
  console.log(`${r.ko} ${r.site} [${r.pbas}]`)
  console.log(`   총사업비(실수입) ${won(r.grant)}  −  식량 ${won(r.food)}  −  현금 ${won(r.cash)}  =  운송·기타 ${won(r.trans)}`)
  console.log(`   (USD: 수입 ${won(r.grant / RATE)} vs 식량+현금 ${won((r.food + r.cash) / RATE)})\n`)
}

console.log('===== 국가 합계 (음수 여부) =====\n')
for (const [ko, a] of byCountry) {
  console.log(`${a.trans < 0 ? '⚠ ' : '  '}${ko}: 운송·기타 ${won(a.trans)}  (총사업비 ${won(a.grant)} − 식량 ${won(a.food)} − 현금 ${won(a.cash)})`)
}

console.log('\n===== 총합 =====')
console.log(`WV부담금 ${won(T.wv)} | 식량 ${won(T.food)} | 현금 ${won(T.cash)} | 운송·기타 ${won(T.trans)} | 총사업비 ${won(T.grant)}`)
console.log(`총사업비 ${(T.grant / 1e8).toFixed(1)}억 / WV부담금 ${(T.wv / 1e8).toFixed(1)}억 / 음수 사업 ${rows.filter((r) => r.neg).length}개`)

import { writeFileSync } from 'fs'
writeFileSync(new URL('./actuals-final.json', import.meta.url), JSON.stringify({ rows, T }, null, 2))
console.log('WROTE actuals-final.json')
