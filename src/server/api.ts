import base from './base'

const buildPlan = async (goal: string, language?: string) => {
  return base.withRetry(() => base.server.post('/build-plan', { goal, language }))
}

export default {
  buildPlan
}