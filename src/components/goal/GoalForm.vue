<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHomeStore } from 'src/store/home'
import { useMessageStore } from '../../store/message'
import DefaultButton from '../base/DefaultButton.vue'
import { useGtag, } from 'vue-gtag-next'
import { useI18n } from 'vue-i18n'

const gtag = useGtag()
const { t } = useI18n()
const goalInput = ref('')
const goalLength = { min: 30, max: 300 }
const goalValid = computed(() => (goalInput.value.length >= goalLength.min && goalInput.value.length <= goalLength.max))
const loading = ref<boolean>(false)

const homeStore = useHomeStore()
const messageStore = useMessageStore()

async function toggleLoading() { loading.value = !loading.value }

async function submitGoal() {
  await toggleLoading()
  if (homeStore.boards.length >= 5) messageStore.show(t('message.reachedMax'), 'warning')
  else if (goalInput.value.length < goalLength.min) messageStore.show(t('message.moreDetail'), 'warning')
  else if (goalInput.value.length > goalLength.max) messageStore.show(t('message.lessCharacters'), 'warning')
  else {
    try {
      const stageNames = [t('stage.a'), t('stage.b'), t('stage.c')]
      await homeStore.createNewBoard(goalInput.value, stageNames)
      gtag.event('new-goal')
    } catch (e) {
      messageStore.show(t('message.submitGoalError'), 'error')
      gtag.event('new-goal-error')
    }
  }
  toggleLoading()
}
</script>

<template>
  <div class="pb-12 drop-shadow">
    <span
      class="text-green fixed w-10/12 md:w-8/12 text-right pr-1"
      :class="[{ 'text-orange': !goalValid }]"
    >
      {{ goalInput.length }}/{{ goalLength.max }}
    </span>
    <textarea
      id="text-input"
      v-model="goalInput"
      :placeholder="$t('input.placeholderGoal')"
      maxlength="300"
      class="w-10/12 h-48 md:w-8/12 text-green
        text-center caret-gray-light/50 sm:text-2xl text-lg 
        ring-green ring-4 outline-none rounded resize-y
        bg-gray/50 p-4 no-scrollbar scroll-my-4
        placeholder-green/75 placeholder:font-bold
        focus:placeholder-gray-light/50 focus:contrast-125 focus:caret-green"
    ></textarea>
    <default-button
      :text="$t('button.submitGoal') + ' ➜'"
      theme="x"
      :active="!loading"
      class="w-10/12 md:w-8/12 ring-4 ring-green bg-green text-gray-dark md:text-4xl text-2xl mt-2 focus:contrast-200"
      :class="[{ 'brightness-90': !goalValid }]"
      @click="submitGoal"
    />
  </div>
</template>

