<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ICustomSettings } from '../../models/interfaces'
import { useAdminStore } from '../../store/admin'
import { useMessageStore } from '../../store/message'
import SaveContainer from './SaveContainer.vue'
import EditableValue from '../base/EditableValue.vue'
import utils from '../../utils/utils'

const emit = defineEmits<{ 'modified': [val: boolean] }>()

const adminStore = useAdminStore()
const { adminData } = storeToRefs(adminStore)
const messageStore = useMessageStore()

const cloneSettings = () => adminData.value ? utils.clone<ICustomSettings>(adminData.value.Settings) : undefined
const settings = ref(cloneSettings())
const formModified = ref(false)
const notReseting = ref(true)

const wasChanged = () => {
  formModified.value = true
  emit('modified', formModified.value)
}

const submitSave = async (passcode: string) => {
  if (!formModified.value || !settings.value) return

  try {
    await adminStore.saveSettings(passcode, settings.value)
    messageStore.show('Saved!', 'success')
    formModified.value = false
    emit('modified', formModified.value)
  } catch {
    messageStore.show('Authetication failed - changes were not saved.', 'error')
  }
}
const resetForm = () => {
  if (adminData.value && confirm('Discard changes since last save?')) {
    settings.value = cloneSettings()
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
    <h1 class="font-bold text-purple/75 uppercase">Settings</h1>
    <div
      v-if="settings && notReseting"
      class="w-full md:w-2/3 lg:w-1/2 grid gap-4 p-4 rounded bg-purple/25"
      @change="wasChanged"
    >

      <editable-value label="AI Persona">
        <template #display>
          <div class="-mt-4 text-sm opacity-50 leading-tight float-left w-3/4">The personality of the Action Plan content.
          </div>
          <span class="float-right">
            {{ settings.Persona }}
          </span>
        </template>
        <template #edit>
          <input
            v-model="settings.Persona"
            class="w-full bg-gray/75 outline-none ring-1 ring-purple"
            maxlength="180"
            placeholder="default: an upbeat & articulate world-famous productivity coach"
          />
        </template>
      </editable-value>
      <editable-value label="OpenAI Model">
        <template #display>
          <div class="-mt-4 text-sm opacity-50 leading-tight float-left w-3/4">Examples: 'gpt-3.5-turbo', 'gpt-4' <a
              class="underline"
              href="https://openai.com/pricing"
            >View possible models and prices here</a>
          </div>
          <span class="float-right">
            {{ settings.Model }}
          </span>
        </template>
        <template #edit>
          <input
            v-model="settings.Model"
            class="w-full bg-gray/75 outline-none ring-1 ring-purple"
            maxlength="240"
            placeholder="default: gpt-3.5-turbo"
          />
        </template>
      </editable-value>
      <editable-value label="AI Temperature">
        <template #display>
          <div class="-mt-4 text-sm opacity-50 leading-tight float-left w-3/4">Lower values for temperature result in more
            consistent outputs, while higher values generate more diverse and creative results. [values: 0.1 - 2]
          </div>
          <span class="float-right">
            {{ settings.Temperature }}
          </span>
        </template>
        <template #edit>
          <input
            v-model="settings.Temperature"
            class="w-full bg-gray/75 outline-none ring-1 ring-purple"
            maxlength="240"
            placeholder="default: 0.4"
          />
        </template>
      </editable-value>
      <editable-value label="AI Max Tokens (Context Length)">
        <template #display>
          <div class="-mt-4 -mb-2 text-sm opacity-50 leading-tight float-left w-3/4">Higher lengths give
            more comprehensive results but are more expensive.
          </div>
          <span class="float-right">
            {{ settings.MaxTokens }}
          </span>
        </template>
        <template #edit>
          <input
            v-model="settings.MaxTokens"
            class="w-full bg-gray/75 outline-none ring-1 ring-purple"
            maxlength="240"
            placeholder="default: 2500"
          />
        </template>
      </editable-value>
      <editable-value label="OpenAI Model for Recommendations">
        <template #display>
          <div class="-mt-4 text-sm opacity-50 leading-tight float-left w-3/4">The model used to pick recommended links.
          </div>
          <span class="float-right">
            {{ settings.RecommendationModel }}
          </span>
        </template>
        <template #edit>
          <input
            v-model="settings.RecommendationModel"
            class="w-full bg-gray/75 outline-none ring-1 ring-purple"
            maxlength="240"
            placeholder="default: gpt-3.5-turbo"
          />
        </template>
      </editable-value>
      <editable-value label="AI Temperature for Recommendations">
        <template #display>
          <div class="-mt-4 text-sm opacity-50 leading-tight float-left w-3/4">See 'AI Temperature'
          </div>
          <span class="float-right">
            {{ settings.RecommendationTemperature }}
          </span>
        </template>
        <template #edit>
          <input
            v-model="settings.RecommendationTemperature"
            class="w-full bg-gray/75 outline-none ring-1 ring-purple"
            maxlength="240"
            placeholder="default: 0.2"
          />
        </template>
      </editable-value>
      <editable-value label="Plans Per Hour (per user)">
        <template #display>
          <div class="-mt-4 text-sm opacity-50 leading-tight float-left w-3/4">Limits how many Action Plans a user can
            create per hour.
          </div>
          <span class="float-right">
            {{ settings.UserPlansPerHour }}
          </span>
        </template>
        <template #edit>
          <input
            v-model="settings.UserPlansPerHour"
            class="w-full bg-gray/75 outline-none ring-1 ring-purple"
            maxlength="240"
            placeholder="default: 3"
          />
        </template>
      </editable-value>

    </div>
  </save-container>
</template>
    
