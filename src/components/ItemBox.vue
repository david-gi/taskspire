<script setup lang='ts'>
import { ref, toRefs, watch } from 'vue'
import { Item } from '../models/board'

import ColorSelector from './base/ColorSelector.vue'
import EditableValue from './base/EditableValue.vue'
import DefaultButton from './base/DefaultButton.vue'

const props = defineProps<{ modelValue: Item, index: number, first: boolean, last: boolean }>()
const { modelValue } = toRefs(props)
defineEmits<{
  'update:modelValue': [item: Item],
  reorder: [newIndex: number],
  regress: [],
  progress: [],
  closed: [],
  delete: []
}>()

const deleteActivated = ref<boolean>()
const descHeight = ref<string>()
watch(modelValue, () => updateDate())

function updateDate() {
  modelValue.value.updated = new Date().getTime()
}

function startDelete() {
  setTimeout(() => {
    deleteActivated.value = true
    setTimeout(() => deleteActivated.value = false, 3000)
  },
    600)
}

function setDescHeight() {
  const height = document.getElementById('descDisplay')?.clientHeight ?? 0
  descHeight.value = (height + 10) + 'px'
}

</script>

<template>
  <div
    v-if="props.modelValue"
    class="bg-gray-dark h-1/2 fixed min-w-full bottom-0 left-0 right-0
     border-x-4 ring-2 ring-gray-dark rounded shadow-2xl"
    :style="{
      'border-color': ('rgb(var(--color-' + modelValue.color + '))'),
    }"
  >
    <div class="sticky bg-gray p-2">
      <default-button
        text="⇽Backtrack"
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
        text="✖"
        theme="x"
        class="w-auto px-6 py-1 ml-2 text-2xl float-right"
        :active="true"
        @click="$emit('closed')"
      />
      <default-button
        text="Progress⇾"
        theme="good"
        class="w-fit mx-auto px-2 float-right"
        :active="!last"
        @click="$emit('progress')"
      />
    </div>

    <div class="flex flex-col gap-4 min-w-full h-full bottom-0 left-0 right-0 px-6 pb-12 overflow-y-auto">
      <div>
        <editable-value :label="'Name'">
          <template #display>
            <span class="">{{ modelValue.name }}</span>
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
        <editable-value :label="'Description'">
          <template #display>
            <div
              id="descDisplay"
              class="whitespace-pre-wrap"
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
        <div class="float-left">
          <color-selector v-model="modelValue.color" />
        </div>
        <div class="float-right">
          <default-button
            text="Delete"
            theme="evil"
            class="w-16 bg-opacity-60"
            :class="{ 'hidden': deleteActivated }"
            :active="true"
            @click="startDelete"
          />
          <default-button
            text="Delete?"
            theme="mean"
            class="w-16 animate-pulse"
            :class="{ 'hidden': !deleteActivated }"
            :active="true"
            @click="$emit('delete')"
          />
        </div>
      </div>

      <div class="-mx-6 mb-2 pl-6 opacity-40 text-sm">
        <strong>Created:</strong>
        <span class="pl-2 truncate">{{ new Date(modelValue.created) }}</span>
        <br>
        <strong>Updated:</strong>
        <span class="pl-2 truncate">{{ new Date(modelValue.updated) }}</span>
      </div>
    </div>
  </div>
</template>


