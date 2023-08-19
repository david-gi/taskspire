<script setup lang="ts">
import { useMainStore } from 'src/store/main'
import { onMounted, ref } from 'vue'
import TheHeader from './TheHeader.vue'
import MobileWarning from './base/MobileWarning.vue'
import DefaultButton from './base/DefaultButton.vue'
import { alert } from 'src/composables/alert'
import SavedContainer from './SavedContainer.vue'

const mainStore = useMainStore()
onMounted(() => mainStore.fetchBoards())

const goalInput = ref('')

function submitGoal() {
  if (goalInput.value.length > 60) {
    mainStore.createNewBoard(goalInput.value)
    goalInput.value = ''
  } else {
    alert('Please go in to more detail.', 'warning')
  }

}
</script>

<template>
  <div
    style=""
    class="flex flex-col w-full h-screen subpixel-antialiased
          overflow-y-scroll text-center no-scrollbar select-none"
  >
    <mobile-warning />
    <the-header :big="true" />
    <div
      id="the-tagline"
      class="w-100 scroll-my-4 mt-2 pt-6 md:pt-20
            bg-gradient-to-b from-blue/30 to-gray-transparent to-80%"
    >
      <div
        style=""
        class="text-yellow text-xl font-semibold -skew-x-6 -skew-y-3 -mt-2 pb-2 drop-shadow"
      >
        Goals are good for motivation...
      </div>
      <span
        style=""
        class="text-4xl p-2 text-gray-dark font-black before:rounded
        before:bg-yellow before:saturate-150 before:block before:absolute before:-inset-1 
        before:-skew-x-6 before:-skew-y-3 relative inline-block"
      >
        <span class="relative">
          Systems Get You There
        </span>
      </span>
      <div class="text-yellow text-4xl hidden md:block mt-9 rotate-90">
        ➜
      </div>
    </div>

    <h2
      style=""
      class="text-yellow brightness-200 contrast-125 text-2xl -ml-8 pt-6 pb-0 md:pb-6"
    >
      <pre class="font-sans text-center">
          Simple goal management utilizing
          Kanban and the Porodomo technique.
          Supercharged by advanced AI.
        </pre>
    </h2>

    <div class="pb-6 drop-shadow">
      <span class="text-orange fixed w-10/12 md:w-8/12 text-right pr-1">{{ goalInput.length
      }}/300</span>
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
        @click="submitGoal()"
      />
    </div>

    <saved-container />
  </div>
</template>

