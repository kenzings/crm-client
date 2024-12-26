<!-- ~/pages/profile.vue -->
<template>
    <div class="max-w-4xl mx-auto p-6">
      <div v-if="userLoading" class="flex justify-center items-center min-h-[200px]">
        <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
      </div>

      <div v-else-if="userError" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p class="font-bold">Error</p>
        <p>{{ userError.message }}</p>
      </div>

      <div v-else-if="userData" class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and information</p>
        </div>

        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Avatar</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <img :src="avatarUrl" alt="Avatar" class="w-16 h-16 rounded-full object-cover">
              </dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Full name</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ userData.me.name }}</dd>
            </div>

            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Email address</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ userData.me.email }}</dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Email verified</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span v-if="userData.me.email_verified_at"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Verified on {{ formatDate(userData.me.email_verified_at) }}
                </span>
                <span v-else
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Not verified
                </span>
              </dd>
            </div>

            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Role</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span :class="roleClass(userData.me.role.name)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ userData.me.role.name }}
                </span>
              </dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Address</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ userData.me.userProfile.address }}</dd>
            </div>

            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Phone</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ userData.me.userProfile.phone }}</dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">City</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ userData.me.userProfile.city }}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="mt-6 flex space-x-4">
        <NuxtLink v-if="userData?.me?.id" :to="`/profile/edit/${userData.me.id}`" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Edit Profile
        </NuxtLink>
      </div>
    </div>
  </template>

  <script setup>
  import { useQueryGraphql } from '@/composables/useQueryGraphql'
  import profileFav from '@/assets/images/profile-fav.png';
  const route = useRoute();

  const { fetchUserProfile } = useQueryGraphql()
  const { userData, userLoading, userError } = fetchUserProfile()

  const avatarUrl = computed(() => {
    if (userData.value.me.userProfile.avatar) {
      return userData.value.me.userProfile.avatar
    }
    return '/none-user.png'
  })

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const roleClass = (role) => {
    switch (role) {
      case 'Administrator':
        return 'bg-red-100 text-red-800'
      case 'Customer':
        return 'bg-blue-100 text-blue-800'
      case 'Staff':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const segments = route.fullPath.split('/').filter(Boolean);
  const title = ref(segments)
  useHead({
    link: [
      { rel: 'icon', type: 'image/png', href: profileFav }, // Cập nhật favicon
    ]
  });
  useSeoMeta({
    title: title.value,
    ogTitle: title.value,
    description: 'This is profile.',
    ogDescription: 'This is profile.',
    ogImage: {
      width: 1200,
      url: profileFav
    },
    twitterCard: 'summary_large_image',
  })
  definePageMeta({
    key: route => route.fullPath,
    title: 'Profile',
    description: 'User profile page.',
    keywords: ['profile', 'user', 'details'],
    pageTransition: { name: 'fade', mode: 'out-in' },
    middleware: 'auth',
    keepalive: true,
    layout: 'default',
    scrollToTop: true
  });
  </script>
