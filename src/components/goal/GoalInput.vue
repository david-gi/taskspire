<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMainStore } from 'src/store/main'
import DefaultButton from '../base/DefaultButton.vue'
import { msg } from '../../composables/msg'

const goalInput = ref('')
const goalLength = { min: 30, max: 300 }
const goalValid = computed(() => (goalInput.value.length >= goalLength.min && goalInput.value.length <= goalLength.max))

const mainStore = useMainStore()

function submitGoal() {
  if (goalInput.value.length < goalLength.min) msg('Please go in to more detail.', 'warning')
  else if (goalInput.value.length > goalLength.max) msg('Please shorten your goal description.', 'warning')
  else {
    mainStore.createNewBoard(goalInput.value)
    goalInput.value = ''
  }
}
</script>

<template>
  <div class="pb-6 drop-shadow">
    <span
      class="text-green fixed w-10/12 md:w-8/12 text-right pr-1"
      :class="[{ 'text-orange': !goalValid }]"
    >
      {{ goalInput.length }}/{{ goalLength.max }}
    </span>
    <textarea
      id="text-input"
      v-model="goalInput"
      placeholder="Describe a Goal..."
      maxlength="300"
      class="w-10/12 h-48 md:w-8/12
        text-center caret-gray-light/50
        ring-green ring-4 outline-none rounded resize-y
        text-green bg-gray/50 p-4 text-4xl no-scrollbar scroll-my-4
        placeholder-green/75 placeholder:font-bold
        focus:placeholder-gray-light/50 focus:contrast-125"
    ></textarea>
    <default-button
      text="Generate an Action Plan ➜"
      theme="x"
      :active="true"
      class="w-10/12 md:w-8/12 ring-4 ring-green bg-green text-gray-dark text-4xl mt-2 focus:contrast-200"
      :class="[{ 'brightness-90': !goalValid }]"
      @click="submitGoal"
    />
  </div>
</template>

