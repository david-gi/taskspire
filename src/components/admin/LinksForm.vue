<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { IRecommendationLink } from '../../models/interfaces'
import { useAdminStore } from '../../store/admin'
import { useMessageStore } from '../../store/message'
import SaveContainer from './SaveContainer.vue'
import DataTable from './DataTable.vue'
import utils from '../../utils/utils'

const emit = defineEmits<{ 'modified': [val: boolean] }>()

const adminStore = useAdminStore()
const { adminData } = storeToRefs(adminStore)
const messageStore = useMessageStore()

const cloneLinks = () => adminData.value ? utils.clone<IRecommendationLink[]>(adminData.value.Links) : []
const links = ref(cloneLinks())
const headers = ['Affiliate', 'Name', 'Url', 'Description', 'Enabled [true/false]']
const formModified = ref(false)
const notReseting = ref(true)

const wasChanged = () => {
  formModified.value = true
  emit('modified', formModified.value)
}

const submitSave = async (passcode: string) => {
  try {
    if (!formModified.value || !links.value) return

    await adminStore.saveLinks(passcode, links.value)
    messageStore.show('Saved!', 'success')
    formModified.value = false
    emit('modified', formModified.value)
  } catch {
    messageStore.show('Authetication failed - changes were not saved.', 'error')
  }
}

const resetForm = () => {
  if (adminData.value && confirm('Discard changes since last save?')) {
    links.value = cloneLinks()
    notReseting.value = false
    setTimeout(() => notReseting.value = true, 500)
    formModified.value = false
    emit('modified', formModified.value)
  }
}
</script>

<template>
  <save-container
    :unsaved-changes="formModified"
    @save-changes="submitSave"
    @undo-changes="resetForm"
  >
    <div @change="wasChanged">
      <h1 class="font-bold text-purple/75 uppercase">Links</h1>
      <div class="bg-purple/25 p-4 w-fit">
        <data-table
          v-if="notReseting"
          v-model="links"
          :headers="headers"
        />
      </div>
    </div>
  </save-container>
</template>
    
