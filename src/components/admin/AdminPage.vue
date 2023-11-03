<script setup lang="ts">
import { ref } from 'vue'
import { useMessageStore } from '../../store/message'
import DefaultButton from '../base/DefaultButton.vue'
import LinksForm from './LinksForm.vue'
import SettingsForm from './SettingsForm.vue'
import { useAdminStore } from 'src/store/admin'
import AuthPrompt from './AuthPrompt.vue'
import LoadingSplash from '../homepage/LoadingSplash.vue'

const adminStore = useAdminStore()
const messageStore = useMessageStore()

const loading = ref(true)
const showAuthPrompt = ref(true)
const tabs = ['Links', 'Settings']
const selectedTab = ref()
selectedTab.value = tabs[0]
const unsavedChanges = ref(false)

const goToSite = () => {
  if (window.confirm('Leave Admin portal?')) {
    window.location.assign(window.location.origin)
  }
}

const authAndLoad = async (passcode: string) => {
  try {
    await adminStore.fetchAdminData(passcode)
    showAuthPrompt.value = false
    messageStore.clear()
    setTimeout(() => { loading.value = false }, 1000)
  } catch {
    messageStore.show('Authentication failed.', 'error')
    showAuthPrompt.value = true
  }
}

const switchTab = (tab: string) => {
  if (!unsavedChanges.value ? true : confirm('You have unsaved changes.')) {
    unsavedChanges.value = false
    selectedTab.value = tab
  }
}

</script>

<template>
  <auth-prompt
    v-if="showAuthPrompt"
    :locked="true"
    @submit="authAndLoad"
    @closed="showAuthPrompt = false"
  />
  <div class="w-screen flex p-2 border-b-2 border-purple">
    <div class="mt-1 w-full">
      <div class="text-xl ml-1 font-bold text-blue saturate-75 contrast-150 float-left">
        {{ $t('website.name') }}✧✧✦
      </div>
      <div class="text-purple uppercase ml-2 font-bold float-left">
        Admin
      </div>
    </div>
    <div
      id="tab-container"
      class="w-full float-right"
    >
      <div
        v-for="tab in tabs"
        :key="tab"
      >
        <default-button
          :text="tab"
          theme="x"
          class="bg-gray/25 w-fit mr-2 py-1 px-4 float-left"
          :class="{ 'contrast-200': selectedTab == tab }"
          :active="selectedTab != tab"
          @click="switchTab(tab)"
        />
      </div>
      <default-button
        text="Exit"
        theme="x"
        class="bg-gray/25 opacity-75 w-fit mr-2 py-1 px-4 float-left"
        @click="goToSite"
      />
    </div>
  </div>
  <keep-alive>
    <div v-if="!loading">
      <links-form
        v-show="selectedTab == 'Links'"
        @modified="x => unsavedChanges = x"
      />
      <settings-form
        v-show="selectedTab == 'Settings'"
        @modified="x => unsavedChanges = x"
      />
    </div>
  </keep-alive>
  <loading-splash
    v-if="!showAuthPrompt && loading"
    :show-text="false"
  />
</template>    