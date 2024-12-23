import { defineNuxtPlugin } from "#app";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { provideApolloClient } from "@vue/apollo-composable";
import { useCookie } from "#app";

export default defineNuxtPlugin(() => {
  const apiUrl = useRuntimeConfig().public.apiUrl;

  const uploadLink = createUploadLink({
    uri: `${apiUrl}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    const tokenCookie = useCookie("apollo:crm.token");
    const token = tokenCookie.value;
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache(),
  });

  provideApolloClient(client);
});
