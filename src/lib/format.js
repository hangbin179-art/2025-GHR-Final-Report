// ---------------------------------------------------------------------------
// Formatting helpers. Monetary source values are stored in 천원 (thousand KRW)
// unless noted. FX rate derived from the report: WV 1,289,391 천원 = USD 969,468.
// ---------------------------------------------------------------------------

export const FX_KRW_PER_USD = 1330

const nf = new Intl.NumberFormat('ko-KR')

/** Plain grouped integer, e.g. 464295 -> "464,295" */
export function num(value) {
  if (value == null || Number.isNaN(value)) return '—'
  return nf.format(Math.round(value))
}

/** Compact Korean number: 464295 -> "46.4만", 12000000 -> "1,200만" */
export function numKo(value) {
  if (value == null || Number.isNaN(value)) return '—'
  const v = Math.abs(value)
  if (v >= 1e8) return `${(value / 1e8).toFixed(value / 1e8 >= 10 ? 0 : 1)}억`
  if (v >= 1e4) return `${nf.format(Math.round(value / 1e4))}만`
  return nf.format(Math.round(value))
}

/** thousand-KRW (천원) -> 억원 string, e.g. 1289391 -> "12.9억원" */
export function krwThousandToEok(value) {
  if (value == null || Number.isNaN(value)) return '—'
  const eok = (value * 1000) / 1e8
  return `${eok.toFixed(eok >= 100 ? 0 : 1)}억원`
}

/** thousand-KRW (천원) -> full 원 string, e.g. 204277 -> "204,277,000원" */
export function krwThousandToWon(value) {
  if (value == null || Number.isNaN(value)) return '—'
  return `${nf.format(value * 1000)}원`
}

/** thousand-KRW (천원) -> USD, e.g. 53025844 -> "$39.9M" */
export function krwThousandToUsd(value) {
  if (value == null || Number.isNaN(value)) return '—'
  const usd = (value * 1000) / FX_KRW_PER_USD
  if (usd >= 1e6) return `$${(usd / 1e6).toFixed(1)}M`
  if (usd >= 1e3) return `$${(usd / 1e3).toFixed(0)}K`
  return `$${nf.format(Math.round(usd))}`
}

/** raw USD compact, e.g. 16038579 -> "$16.0M", 558117 -> "$558K" */
export function usd(value) {
  if (value == null || Number.isNaN(value)) return '—'
  const v = Math.abs(value)
  if (v >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
  if (v >= 1e3) return `$${(value / 1e3).toFixed(0)}K`
  return `$${nf.format(Math.round(value))}`
}

/** raw 원(KRW) -> 억원 string, e.g. 6790954000 -> "67.9억원" */
export function wonToEok(value) {
  if (value == null || Number.isNaN(value)) return '—'
  const eok = value / 1e8
  return `${eok.toFixed(eok >= 100 ? 0 : 1)}억원`
}

/** raw USD -> 한화 라벨 ($1=1,330원). 5.1e6 -> "68억원", 446505 -> "5.9억원", 15941 -> "2,121만원" */
export function usdToKrwLabel(value) {
  if (value == null || Number.isNaN(value) || value === 0) return null
  const won = value * FX_KRW_PER_USD
  const eok = won / 1e8
  if (eok >= 10) return `${Math.round(eok)}억원`
  if (eok >= 1) return `${eok.toFixed(1)}억원`
  return `${nf.format(Math.round(won / 1e4))}만원`
}

/** tonnes, e.g. 21133 -> "21,133톤", 1.72 -> "1.72톤" */
export function tons(value) {
  if (value == null || Number.isNaN(value)) return '—'
  if (value > 0 && value < 10) return `${value}톤`
  return `${nf.format(Math.round(value))}톤`
}

/** kilograms, e.g. 525803.26 -> "525,803kg" */
export function kg(value) {
  if (value == null || Number.isNaN(value)) return '—'
  return `${nf.format(Math.round(value))}kg`
}

/** percentage with one decimal, clamped label */
export function pct(value) {
  if (value == null || Number.isNaN(value)) return '—'
  return `${value.toFixed(1)}%`
}

/** leverage multiple, e.g. 41 -> "41배" */
export function multiple(value) {
  if (value == null || Number.isNaN(value)) return '—'
  return `${nf.format(Math.round(value))}배`
}
