<script setup lang='ts'>
import { ref, toRefs, watch } from 'vue'
import { IItem } from '../../models/interfaces'

import ColorSelector from '../common/ColorSelector.vue'
import EditableValue from '../base/EditableValue.vue'
import DefaultButton from '../base/DefaultButton.vue'
import SafetyButton from '../base/SafetyButton.vue'
import PomodoroTracker from '../pomodoro/PomodoroTracker.vue'

const props = defineProps<{ modelValue: IItem, index: number, first: boolean, last: boolean }>()
const { modelValue } = toRefs(props)
defineEmits<{
  'update:modelValue': [val: IItem],
  reorder: [newIndex: number],
  regress: [],
  progress: [],
  closed: [],
  delete: []
}>()

const descHeight = ref<string>()

function updateDate() {
  modelValue.value.updated = new Date().getTime()
}

function setDescHeight() {
  const height = document.getElementById('descDisplay')?.clientHeight ?? 0
  descHeight.value = (height + 10) + 'px'
}

watch(() => props.modelValue, () => {
  updateDate()
}, { deep: true })

</script>

<template>
  <div
    v-if="props.modelValue"
    class="bg-gray-dark h-1/2 fixed bottom-0 pb-6 left-0 right-0
     border-x-4 ring-2 ring-gray-dark rounded shadow"
    :style="{
      'border-color': ('rgb(var(--color-' + modelValue.color + '))'),
    }"
  >
    <div class="sticky bg-gray p-2">
      <default-button
        :text="'⇽' + $t('button.regress')"
        theme="neutral"
        class="w-fit mr-2 px-2"
        :active="!first"
        @click="$emit('regress')"
      />
      <default-button
        text="⇡"
        theme="x"
        class="w-fit mr-2 px-4"
        :active="true"
        @click="$emit('reorder', index != 0 ? index - 1 : index)"
      />
      <default-button
        text="⇣"
        theme="x"
        class="w-fit mr-2 px-4"
        :active="true"
        @click="$emit('reorder', index + 1)"
      />
      <default-button
        :text="$t('button.progress') + '⇾'"
        theme="good"
        class="w-fit mx-auto px-2"
        :active="!last"
        @click="$emit('progress')"
      />
      <default-button
        text="✖"
        theme="x"
        class="w-auto px-6 py-1 ml-2 text-2xl float-right"
        :active="true"
        @click="$emit('closed')"
      />
    </div>

    <div class="flex flex-col gap-4 h-full bottom-0 left-0 right-0 px-6 pb-12 overflow-y-auto">

      <pomodoro-tracker
        :item="modelValue"
        :buttonless="last"
        class="float-left"
      />

      <div>
        <editable-value :label="$t('input.labelName')">
          <template #display>
            <span class="break-all">
              {{ modelValue.name }}
            </span>
          </template>
          <template #edit>
            <input
              v-model="modelValue.name"
              class="w-full bg-gray/75 outline-none ring-1 ring-purple"
              maxlength="240"
            />
          </template>
        </editable-value>
      </div>

      <div>
        <editable-value :label="$t('input.labelDescription')">
          <template #display>
            <div
              id="descDisplay"
              class="w-full"
              @click="setDescHeight"
            >
              {{ modelValue.desc }}
            </div>
          </template>
          <template #edit>
            <textarea
              id="descEdit"
              v-model="modelValue.desc"
              class="w-full bg-gray/75 outline-none ring-1 ring-purple"
              :style="{ 'height': descHeight, 'min-height': '10rem' }"
            ></textarea>
          </template>
        </editable-value>
      </div>

      <div>
        <div class="text-center">
          <safety-button
            class="float-right inline"
            :text="$t('button.delete')"
            @fired="$emit('delete')"
          />
          <color-selector
            v-model="modelValue.color"
            class="float-left"
          />
        </div>
      </div>

      <div class="break-normal -mx-6 mb-4 pl-6 opacity-40 text-sm">
        <strong>{{ $t('input.labelCreated') }}:</strong>
        <span class="pl-2">{{ new Date(modelValue.created) }}</span>
        <br>
        <strong>{{ $t('input.labelUpdated') }}:</strong>
        <span class="pl-2">{{ new Date(modelValue.updated) }}</span>
      </div>
    </div>
  </div>
</template>


