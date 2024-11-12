// ~/plugins/apollo-config.js
import { defineNuxtPlugin } from '#app'
import { provideApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

export default defineNuxtPlugin(() => {
  // Tạo link HTTP tới GraphQL endpoint
  const httpLink = createHttpLink({
    uri: 'http://shino-dev.local/graphql',
  })

  // Thêm token vào mỗi yêu cầu
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('apollo-token') // Lấy token từ localStorage
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  // Cấu hình Apollo Client với HTTP và Auth link
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  // Cung cấp Apollo Client
  provideApolloClient(apolloClient)
})
