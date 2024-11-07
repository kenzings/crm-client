<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
    }
  }
`;

const email = ref('');
const password = ref('');
const error = ref(null);

const { mutate: register } = useMutation(REGISTER_MUTATION, {
  variables: { email, password },
  onError(err) {
    error.value = err.message;
  },
  onCompleted(data) {
    localStorage.setItem('token', data.register.token);
    // Redirect to home page or wherever
  }
});

function handleRegister() {
  register();
}
</script>
