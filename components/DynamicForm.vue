<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div v-for="field in fields" :key="field.name" class="flex flex-col">
      <label :for="field.name" class="mb-2 text-sm font-medium text-gray-700">{{ field.label }}</label>
      <input
        v-if="field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'tel'"
        :type="field.type"
        :name="field.name"
        v-model="formData[field.name]"
        :placeholder="field.placeholder"
        :pattern="field.type === 'tel' ? '(\\+84|0)[0-9]{9}' : undefined"
        :minlength="field.type === 'password' ? 6 : undefined"
        class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <!-- Add more input types as needed -->
    </div>
    <button :class="buttonClasses" type="submit" :disabled="loading">
      <svg v-if="loading" class="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span v-else>{{ submitButtonText }}</span>
    </button>
  </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  submitButtonText: {
    type: String,
    default: 'Submit',
  },
  onSubmit: {
    type: Function,
    required: true,
  },
  buttonClasses: {
    type: String,
    default: 'w-full px-6 py-3 font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const formData = ref({})

watchEffect(() => {
  props.fields.forEach(field => {
    formData.value[field.name] = ''
  })
})

const handleSubmit = () => {
  props.onSubmit(formData.value)
}
</script>

<style scoped>
/* Add any additional scoped styles if needed */
</style>