// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  use: {
    headless: true,
  },
  projects: [
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'safari',
      use: {
        browserName: 'webkit'
      },
    },
  ]
}
export default config