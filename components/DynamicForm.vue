<template>
  <div class="flex items-center justify-center min-h-screen py-8">
    <div class="w-full max-w-md px-6 py-8 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-6">{{ title }}</h1>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <template v-for="field in fields" :key="field.name">
          <!-- Avatar Input -->
          <div v-if="field.type === 'avatar'" class="space-y-2">
            <div class="flex items-center space-x-4">
              <img :src="previewImage || formData[field.name] || '/default-avatar.png'"
                class="w-20 h-20 rounded-full object-cover border-2" alt="Avatar" />
              <div class="flex-1">
                <label
                  class="block px-4 py-2 text-sm text-center text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer">
                  {{ field.placeholder || 'Change Avatar' }}
                  <input type="file" :accept="field.accept || 'image/*'" class="hidden" @change="handleFileChange" />
                </label>
              </div>
            </div>
          </div>

          <!-- Select Input -->
          <div v-else-if="field.type === 'select'" class="space-y-1">
            <label v-if="field.label" class="block text-sm font-medium text-gray-700">
              {{ field.label }}
            </label>
            <select v-model="formData[field.name]"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :required="field.required !== false">
              <option value="" disabled selected>{{ field.placeholder }}</option>
              <option v-for="option in field.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- Text/Email/Password/Tel Inputs -->
          <div v-else class="space-y-1">
            <label v-if="field.label" class="block text-sm font-medium text-gray-700">
              {{ field.label }}
            </label>
            <input v-model="formData[field.name]" :type="field.type" :placeholder="field.placeholder"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :required="field.required !== false" />
          </div>
        </template>

        <button type="submit" :disabled="loading"
          class="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? loadingText : submitText }}
        </button>
      </form>

      <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>

      <!-- Bottom Link -->
      <div v-if="bottomLink" class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          {{ bottomLink.title }}
          <NuxtLink :to="bottomLink.route" class="font-medium text-blue-600 hover:text-blue-500">
            {{ bottomLink.linkText }}
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  fields: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  submitText: {
    type: String,
    default: 'Submit'
  },
  loadingText: {
    type: String,
    default: 'Loading...'
  },
  bottomLink: {
    type: Object,
    default: null
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit', 'file-change'])
const formData = ref({ ...props.initialData })
const previewImage = ref(null)

// Handle file upload for avatar
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Create preview URL
    previewImage.value = URL.createObjectURL(file)
    // Emit file for parent component to handle
    emit('file-change', file)
    // Store file in formData
    formData.value.avatar = file
  }
}

const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>