// Headless verification + screenshots using the system Chrome via puppeteer-core.
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const URL = process.env.URL || 'http://localhost:5180/'
const OUT = 'C:\\dev\\food-crisis-dashboard\\screenshots'
mkdirSync(OUT, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const consoleMsgs = []
const pageErrors = []
let checks = {}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--force-color-profile=srgb'],
})

try {
  const page = await browser.newPage()
  page.on('console', (m) => consoleMsgs.push(`[${m.type()}] ${m.text()}`))
  page.on('pageerror', (e) => pageErrors.push(String(e)))

  // ---------- Desktop ----------
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 1 })
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 45000 })
  await sleep(2500) // fonts + leaflet tiles + entrance animations

  checks = await page.evaluate(() => {
    const text = document.body.innerText
    const has = (s) => text.includes(s)
    return {
      title: document.title,
      h1: document.querySelector('h1')?.innerText ?? null,
      hasBeneficiaries: has('464,295'),
      hasLeverage: has('41배'),
      hasMapTitle: has('대화형 성과 지도'),
      hasCauses: has('분쟁') && has('기후변화') && has('경제적 충격'),
      hasInterventions: has('학교 급식') && has('영양실조'),
      leafletTilesLoaded: document.querySelectorAll('.leaflet-tile-loaded').length,
      markers: document.querySelectorAll('.leaflet-marker-icon').length,
      regionChips: document.querySelectorAll('button[aria-pressed]').length,
      scrollH: document.documentElement.scrollHeight,
    }
  })

  await page.screenshot({ path: `${OUT}\\01-desktop-full.png`, fullPage: true })

  // map section element shot (crisper)
  const mapSection = await page.$('#impact-map')
  if (mapSection) {
    await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 })
    await sleep(800)
    await mapSection.screenshot({ path: `${OUT}\\02-map-section.png` })
  }

  // hero viewport shot (crisp)
  await page.evaluate(() => window.scrollTo(0, 0))
  await sleep(400)
  await page.screenshot({ path: `${OUT}\\03-hero.png` })

  // ---------- Mobile ----------
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true })
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 45000 })
  await sleep(2000)
  await page.screenshot({ path: `${OUT}\\04-mobile-full.png`, fullPage: true })
} catch (e) {
  pageErrors.push('FATAL: ' + String(e))
}

await browser.close()
console.log(JSON.stringify({ checks, errorCount: pageErrors.length, pageErrors, consoleErrors: consoleMsgs.filter((m) => m.startsWith('[error]')) }, null, 2))
