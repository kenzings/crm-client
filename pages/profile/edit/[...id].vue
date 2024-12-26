<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <div v-if="userLoading" class="flex justify-center items-center min-h-[200px]">
      <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
    </div>

    <template v-else>
      <h1 class="text-2xl font-bold mb-6">Chỉnh Sửa Thông Tin</h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Phần Upload Ảnh Đại Diện -->
        <div class="flex items-center space-x-6 mb-6">
          <img :src="formData.avatar || '/none-user.png'" alt="Ảnh đại diện"
            class="w-20 h-20 rounded-full object-cover">
          <label class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Tải ảnh lên
            <input type="file" class="hidden" accept="image/*" @change="handleAvatarChange">
          </label>
        </div>

        <!-- Các Trường Form -->
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Họ và tên</label>
              <input v-model="formData.name" type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input v-model="formData.email" type="email" disabled
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Số điện thoại</label>
              <input v-model="formData.phone" type="tel"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Địa chỉ</label>
              <input v-model="formData.address" type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Thành phố</label>
              <input v-model="formData.city" type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
          </div>
        </div>

        <!-- Thông Báo Lỗi và Thành Công -->
        <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
        <div v-if="successMessage" class="text-green-500 text-sm mt-2">{{ successMessage }}</div>

        <!-- Nút Submit -->
        <div class="flex justify-end space-x-4">
          <NuxtLink to="/profile" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Huỷ bỏ
          </NuxtLink>
          <button type="submit" :disabled="loading"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50">
            {{ loading ? 'Đang cập nhật...' : 'Cập nhật' }}
          </button>
        </div>
      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useQueryGraphql } from '@/composables/useQueryGraphql'
import { useUserUpdate } from '@/composables/useMutationGraphql'
import { useMutation } from '@vue/apollo-composable';
import { UPLOAD_FILE_MUTATION } from '@/graphql/useMutationGraphql'

const router = useRouter()
// Fetch dữ liệu người dùng
const { fetchUserProfile } = useQueryGraphql()
const { userData, userLoading } = fetchUserProfile()
// Mutation cập nhật
const { userUpdate, loading } = useUserUpdate()
const error = ref('')
// const { uploadFile } = useFileUploader()
const successMessage = ref('')

// Dữ liệu form
const formData = ref({
  id: '',
  name: '',
  email: '',
  avatar: '',
  phone: '',
  address: '',
  city: ''
})

// Khởi tạo form với dữ liệu người dùng
watchEffect(() => {
  if (userData.value?.me) {
    const user = userData.value.me
    formData.value = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.userProfile.avatar,
      phone: user.userProfile.phone,
      address: user.userProfile.address,
      city: user.userProfile.city
    }
  }
})

// Sử dụng useMutation để gửi request
const { mutate } = useMutation(UPLOAD_FILE_MUTATION);
const handleAvatarChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target && target.files && target.files[0]) {
    const file = target.files[0];
    try {
      const result = await mutate({
        input: { image: file },
      });
      if (result && result.data) {
        formData.value.avatar = result.data.fileImageUpload.url;
      }
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  }
};

// Xử lý submit form
const handleSubmit = async () => {
  try {
    await userUpdate(
      formData.value.id,
      formData.value.name,
      formData.value.avatar,
      formData.value.phone,
      formData.value.address,
      formData.value.city
    )

    successMessage.value = 'Cập nhật thông tin thành công!'
    setTimeout(() => {
      router.push('/profile')
    }, 1500)
  } catch (err) {
    error.value = 'Không thể cập nhật thông tin. Vui lòng thử lại.'
  }
}
</script>
