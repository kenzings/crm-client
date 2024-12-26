import { gql } from "@apollo/client/core";

export const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      tokenType
      expiresIn
      accessToken
      refreshToken
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

export const REGISTER_MUTATION = gql`
  mutation UserCreate($input: UserCreateInput!) {
    userCreate(input: $input) {
      id
      name
      email
      __typename
    }
  }
`;

export const UPLOAD_FILE_MUTATION = gql`
  mutation fileImageUpload($input: FileImageUploadInput!) {
    fileImageUpload(input: $input) {
      url
      originalFilename
    }
  }
`;

export const USER_UPDATE_MUTATION = gql`
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
