// ~/plugins/apollo.js
import { defineNuxtPlugin } from '#app'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { provideApolloClient } from '@vue/apollo-composable'
import { useCookie } from '#app'

export default defineNuxtPlugin(() => {
  const apiUrl = useRuntimeConfig().public.apiUrl

  const httpLink = createHttpLink({
    uri: `${apiUrl}/graphql`,
  })

  const authLink = setContext((_, { headers }) => {
    const tokenCookie  = useCookie('apollo:crm.token')
    const token = tokenCookie.value
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  provideApolloClient(apolloClient)
})
