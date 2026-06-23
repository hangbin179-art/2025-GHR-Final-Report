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
  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 2 })
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 45000 })
  await sleep(2500)
  // select DRC South Kivu (rich narrative) via the project index chip
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button[aria-pressed]')]
    const t = btns.find((b) => b.textContent.includes('남부 키부') || b.textContent.includes('콩고'))
    if (t) t.click()
  })
  await sleep(900)
  const panel = await page.$('#detail-panel')
  if (panel) await panel.screenshot({ path: `${OUT}\\P1-detail-narrative.png` })
  console.log(JSON.stringify({ ok: true, panel: !!panel, errs }))
} catch (e) { console.log(JSON.stringify({ fatal: String(e) })) }
await browser.close()
