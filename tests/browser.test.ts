import { test } from '@playwright/test'

test('browser testing', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.pause()
})