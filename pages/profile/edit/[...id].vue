<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-6">Edit Profile</h1>
        <DynamicForm :fields="fields" submitButtonText="Update" :onSubmit="handleSubmit" :loading="loading" />
        <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
        <div v-if="successMessage" class="mt-4 text-green-500">{{ successMessage }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import DynamicForm from '@/components/DynamicForm.vue';

const route = useRoute();

const fields = ref([
    { name: 'name', type: 'text', label: 'Name', placeholder: 'Enter your name' },
    { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email' },
    { name: 'phone', type: 'tel', label: 'Phone', placeholder: 'Enter your phone' },
    { name: 'address', type: 'text', label: 'Address', placeholder: 'Enter your address' },
    // Add more fields as needed
]);

const formData = ref({
    id: route.params.id || '',
    name: '',
    email: '',
    // Add more fields as needed
});

const loading = ref(false);
const error = ref('');
const successMessage = ref('');

const handleSubmit = async (formValues: any) => {
    loading.value = true;
    error.value = '';
    successMessage.value = '';

    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        successMessage.value = 'Update successful!';
    } catch (e) {
        error.value = 'An error occurred.';
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>