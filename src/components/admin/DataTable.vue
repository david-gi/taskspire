<script setup>
import { HotTable } from '@handsontable/vue3'
import { registerAllModules } from 'handsontable/registry'

registerAllModules()

defineProps({ modelValue: { type: Array, default: () => [] }, headers: { type: Array, default: () => [] } })
defineEmits(['update:modelValue'])

</script>

<template>
  <hot-table
    v-if="modelValue"
    class="opacity-75"
    :settings="{ licenseKey: 'non-commercial-and-evaluation' }"
    :data="modelValue"
    :row-heights="16"
    :auto-column-size="true"
    :auto-row-size="true"
    :manual-column-resize="true"
    :col-headers="headers"
    :row-headers="true"
    :dropdown-menu="false"
    :context-menu="['row_above', 'row_below', 'remove_row', 'undo', 'redo']"
    :multi-column-sorting="true"
    :filters="false"
    :manual-row-move="true"
  ></hot-table>
</template>

<style src="handsontable/dist/handsontable.full.css"></style>
