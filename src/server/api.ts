import { ICustomSettings, IRecommendationLink } from 'src/models/interfaces'
import base from './base'

const buildPlan = async (goal: string, language?: string) => {
  return base.withRetry(() => base.server.post('/build-plan', { goal, language }))
}

const getRecommendation = async (content: string) => {
  return base.withRetry(() => base.server.post('/get-recommendation', { content }))
}

const admin = {
  getAdminData: async (passcode: string) => {
    return base.withRetry(() => base.server.post('/admin', { passcode }))
  },
  saveSettings: async (passcode: string, settings: ICustomSettings) => {
    return base.withRetry(() => base.server.post('/admin/save-settings', { passcode, settings }))
  },
  saveLinks: async (passcode: string, links: IRecommendationLink[]) => {
    return base.withRetry(() => base.server.post('/admin/save-links', { passcode, links }))
  },
}

export default {
  buildPlan,
  getRecommendation,
  admin
}