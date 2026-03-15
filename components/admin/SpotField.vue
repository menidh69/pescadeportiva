<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <textarea
      v-if="type === 'textarea'"
      :value="modelValue as string"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :required="required"
      rows="3"
      class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      v-else
      :type="type || 'text'"
      :value="modelValue"
      :required="required"
      :step="type === 'number' ? 'any' : undefined"
      @input="$emit('update:modelValue', type === 'number'
        ? parseFloat(($event.target as HTMLInputElement).value)
        : ($event.target as HTMLInputElement).value)"
      class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  modelValue: string | number | undefined
  type?: string
  required?: boolean
}>()
defineEmits(['update:modelValue'])
</script>
