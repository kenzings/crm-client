import { useQuery } from "@vue/apollo-composable";
import {
  GET_USER_PROFILE,
  PRODUCTS_QUERY,
  PRODUCT_QUERY,
} from "~/graphql/useQueryGraphql";

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
