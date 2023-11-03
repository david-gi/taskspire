import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../http/axios-base'
import { Item } from '../models/board'
import { Recommendation } from '../models/recommentation'


export const useMainStore = defineStore('main', () => {
  const recommendations = ref<Recommendation[]>([])

  async function getRecommendations(item: Item) {
    return await api.server
      .post('/get', item)
      .then((res) => {
        const data = res.data //parse response
        recommendations.value = data
      })
      .catch((e) => console.error(e))
  }

  return {
  }
})
