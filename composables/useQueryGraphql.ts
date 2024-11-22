import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const ME_QUERY = gql`
  query GetCurrentUser {
    me {
      id
      name
      email
      email_verified_at
      __typename
    }
  }
`

// Custom hook for fetching user data
export const useGetUserData = () => {
  const { result: data, loading, error } = useQuery(ME_QUERY)

  return {
    data,
    loading,
    error,
  }
}