<script setup lang='ts'>
import { ref, toRefs, watch } from 'vue'
import { Item } from '../models/board'

import ColorSelector from './base/ColorSelector.vue'
import EditableValue from './base/EditableValue.vue'
import DefaultButton from './base/DefaultButton.vue'
import DeleteButton from './base/DeleteButton.vue'

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

const descHeight = ref<string>()
watch(modelValue, () => updateDate())

function updateDate() {
  modelValue.value.updated = new Date().getTime()
}

function setDescHeight() {
  const height = document.getElementById('descDisplay')?.clientHeight ?? 0
  descHeight.value = (height + 10) + 'px'
}

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

    <div class="flex flex-col gap-4 h-full bottom-0 left-0 right-0 px-6 pb-12 overflow-y-auto">
      <div>
        <editable-value :label="'Name'">
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
        <editable-value :label="'Description'">
          <template #display>
            <div
              id="descDisplay"
              class="whitespace-pre-wrap break-all"
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
        <div>
          <color-selector v-model="modelValue.color" />
          <delete-button
            class="float-right inline"
            @delete="$emit('delete')"
          />
        </div>
      </div>

      <div class="break-normal -mx-6 mb-2 pl-6 opacity-40 text-sm">
        <strong>Created:</strong>
        <span class="pl-2">{{ new Date(modelValue.created) }}</span>
        <br>
        <strong>Updated:</strong>
        <span class="pl-2">{{ new Date(modelValue.updated) }}</span>
      </div>
    </div>
  </div>
</template>


