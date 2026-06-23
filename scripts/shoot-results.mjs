import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const URL = 'http://localhost:5180/'
const OUT = 'C:\\dev\\food-crisis-dashboard\\screenshots'
mkdirSync(OUT, { recursive: true })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const errs = []
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox','--disable-gpu','--hide-scrollbars','--force-color-profile=srgb'] })
try {
  const page = await browser.newPage()
  page.on('pageerror', (e) => errs.push(String(e)))
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 })
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 45000 })
  await sleep(2500)
  // ProgressBanner
  const banner = await page.$('section.bg-paper-sub')
  if (banner) await banner.screenshot({ path: `${OUT}\\R1-progress-banner.png` })
  // Results section
  const results = await page.$('#results')
  if (results) await results.screenshot({ path: `${OUT}\\R2-results-charts.png` })
  console.log(JSON.stringify({ ok: true, banner: !!banner, results: !!results, errs }))
} catch (e) { console.log(JSON.stringify({ fatal: String(e) })) }
await browser.close()
