import { Page, test, } from '@playwright/test'

test('browser testing', async ({ page }, workerInfo) => {
  await page.goto('http://localhost:5173/#demo')
  await page.waitForTimeout(1000)
  await page.setViewportSize({ width: 900, height: 2400 })
  await page.screenshot({ path: 'playwright-report/' + workerInfo.project.name + '.png', fullPage: true })
  await page.pause()
})
