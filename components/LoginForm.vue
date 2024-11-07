<template>
  <div>
    <h1>Đăng nhập</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mật khẩu" required />
      <button type="submit" :disabled="loading">Đăng nhập</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRouter } from 'vue-router';

// GraphQL mutation để đăng nhập
const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      tokenType
      expiresIn
      accessToken
      refreshToken
    }
  }
`;

// Dữ liệu form đăng nhập
const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);  // Biến để theo dõi trạng thái loading
const router = useRouter();

// Sử dụng hook useMutation để thực thi mutation đăng nhập
// Sử dụng hook useMutation mà không cần truyền variables
const { mutate: executeLogin } = useMutation(LOGIN_MUTATION, {
  onError(err) {
    console.log('error')
    error.value = err.message;
  },
  onCompleted(data) {
    console.log('luu token')
    localStorage.setItem('token', data.login.accessToken);
    router.push('/');
  },
});

// Hàm xử lý khi người dùng gửi form đăng nhập
function handleLogin() {
  loading.value = true;

  // Gọi mutation với biến được truyền vào tại đây
  executeLogin({ input: { email: email.value, password: password.value } });

  console.log('login'); // Để kiểm tra xem handleLogin có được thực thi không
}

</script>
