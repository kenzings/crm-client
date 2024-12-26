import { gql } from "@apollo/client/core";

export const GET_USER_PROFILE = gql`
  query GetCurrentUser {
    me {
      id
      name
      email
      email_verified_at
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
        address
        phone
        city
      }
      __typename
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query GetProducts {
    products(
      where: {}
      orderBy: [{ column: createdAt, order: ASC }]
      first: 10
      page: 1
    ) {
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
      data {
        id
        images
        slugEn
        slugVi
        titleEn
        titleVi
        descriptionEn
        descriptionVi
        contentEn
        contentVi
        types {
          titleEn
          slugEn
          titleVi
          slugVi
        }
        sizes
        price
      }
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query product($id: ID!) {
    product(id: $id) {
      id
      images
      slugEn
      slugVi
      titleEn
      titleVi
      descriptionEn
      descriptionVi
      contentEn
      contentVi
      types {
        id
        titleEn
        slugEn
        titleVi
        slugVi
        createdAt
        updatedAt
      }
      sizes
      price
    }
  }
`;
