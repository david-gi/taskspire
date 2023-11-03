import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../server/api'
import { IAdminData, IRecommendationLink, ICustomSettings } from '../models/interfaces'
import H from './helpers'

export const useAdminStore = defineStore('admin', () => {
  const adminData = ref<IAdminData>()

  async function fetchAdminData(passcode: string) {
    return H.wrapAttempt(async () => {
      const res = await api.admin.getAdminData(passcode)
      if (res.status != 200) throw 'failed'
      adminData.value = res.data
    })
  }

  async function saveLinks(passcode: string, links: IRecommendationLink[]) {
    return H.wrapAttempt(async () => {
      await api.admin.saveLinks(passcode, links ?? [])
    })
  }

  async function saveSettings(passcode: string, settings: ICustomSettings) {
    return H.wrapAttempt(async () => {
      if (!settings) return
      await api.admin.saveSettings(passcode, settings)
    })
  }

  return {
    adminData,

    fetchAdminData,
    saveLinks,
    saveSettings,
  }
})
