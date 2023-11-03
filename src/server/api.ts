import { ICustomSettings, IRecommendationLink } from 'src/models/interfaces'
import base from './base'

const buildPlan = async (goal: string, language?: string) => {
  return base.withRetry(() => base.server.post('/build-plan', { goal, language }))
}

const getRecommendation = async (content: string) => {
  return base.withRetry(() => base.server.post('/get-recommendation', { content }))
}

const admin = {
  getAdminData: async (password: string) => {
    return base.withRetry(() => base.server.post('/admin', { password }))
  },
  saveSettings: async (password: string, settings: ICustomSettings) => {
    return base.withRetry(() => base.server.post('/admin/save-settings', { password, settings }))
  },
  saveLinks: async (password: string, links: IRecommendationLink[]) => {
    return base.withRetry(() => base.server.post('/admin/save-links', { password, links }))
  },
}

export default {
  buildPlan,
  getRecommendation,
  admin
}