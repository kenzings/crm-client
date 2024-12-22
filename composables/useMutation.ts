import { gql, useMutation } from '@apollo/client';

const USER_UPDATE_MUTATION = gql`
  mutation userUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      id
      name
      email
      role {
        id
        name
      }
      permissions {
        id
        name
      }
      userProfile {
        avatar
        phone
        address
        city
      }
    }
  }
`;

export function useUserUpdate() {
    const [userUpdate, { data, loading, error }] = useMutation(USER_UPDATE_MUTATION);

    return {
        userUpdate,
        data,
        loading,
        error,
    };
}