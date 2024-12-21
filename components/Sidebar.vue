<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a v-for="item in navigation" :key="item.name" :href="item.href"
                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" :src="avatarUrl" alt="" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-if="token" v-slot="{ active }">
                <a href="/profile"
                  :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">Your
                  Profile</a>
                </MenuItem>
                <MenuItem v-if="token" v-slot="{ active }">
                <a href="#"
                  :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                </MenuItem>
                <MenuItem v-if="token" v-slot="{ active }">
                <a href="#" @click.prevent="handleLogout" :class="[
                  active ? 'bg-gray-100 outline-none' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                ]">
                  Sign out
                </a>
                </MenuItem>

                <MenuItem v-if="!token" v-slot="{ active }">
                <a href="/login"
                  :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">Login</a>
                </MenuItem>
                <MenuItem v-if="!token" v-slot="{ active }">
                <a href="/register"
                  :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">Register</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined">{{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthUser } from '@/composables/useAuthUser';
import { useQueryGraphql } from '@/composables/useQueryGraphql'
import { useRoute } from 'vue-router'

const tokenCookie = useCookie('apollo:crm.token')
const token = computed(() => tokenCookie.value)
const { fetchUserProfile } = useQueryGraphql()
const { userData, userLoading, userError } = fetchUserProfile()

const { logout, loading, error } = useAuthUser()
function handleLogout() {
  logout()
}
const route = useRoute();

const avatarUrl = computed(() => {
  if (token.value && userData.value && userData.value.me && userData.value.me.userProfile) {
    return userData.value.me.userProfile.avatar || '/none-user.png'
  }
  return '/none-user.png'
})

// Define the navigation data
const navigation = ref([
  { name: 'Dashboard', href: '/', current: false },
  { name: 'Team', href: '/team', current: false },
  { name: 'Products', href: '/products', current: false },
  { name: 'Calendar', href: '/calendar', current: false },
])
const updateNavigationState = () => {
  navigation.value.forEach((item) => {
    if (item.href === '/') {
      // Chỉ đánh dấu Dashboard là active nếu path đúng là '/'
      item.current = route.path === '/';
    } else {
      // Đánh dấu các mục khác nếu route.path bắt đầu bằng href
      item.current = route.path.startsWith(item.href);
    }
  });
};

// Watch for changes in route
watch(() => route.path, updateNavigationState);

// Call the function once to initialize the state
updateNavigationState();
</script>
