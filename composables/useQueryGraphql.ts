import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const GET_USER_PROFILE = gql`
  query GetCurrentUser {
    me {
      id
      name
      email
      email_verified_at
      role {
        name
      }
      __typename
    }
  }
`;

const PRODUCTS_QUERY = gql`
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

const PRODUCT_QUERY = gql`
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

export const useQueryGraphql = () => {
  const fetchUserProfile = () => {
    const {
      result: userData,
      loading: userLoading,
      error: userError,
    } = useQuery(GET_USER_PROFILE);
    return { userData, userLoading, userError };
  };

  const fetchProducts = () => {
    const {
      result: products,
      loading: productsLoading,
      error: productsError,
    } = useQuery(PRODUCTS_QUERY);
    return { products, productsLoading, productsError };
  };

  const fetchProductById = (id: string) => {
    const {
      result: product,
      loading: productLoading,
      error: productError,
    } = useQuery(PRODUCT_QUERY, { id });
    return { product, productLoading, productError };
  };

  return {
    fetchUserProfile,
    fetchProducts,
    fetchProductById,
  };
};
