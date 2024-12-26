import { useMutation } from "@vue/apollo-composable";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { USER_UPDATE_MUTATION } from "../graphql/useMutationGraphql";

export function useUserUpdate() {
  const router = useRouter();
  const route = useRoute();
  const loading = ref(false);
  const error = ref(null);
  const data = ref(null);

  const {
    mutate: userUpdateMutation,
    onDone,
    onError,
  } = useMutation(USER_UPDATE_MUTATION);

  // Xử lý kết quả mutation
  onDone(({ data: mutationData }) => {
    data.value = mutationData;
    loading.value = false;

    if (data.value?.userUpdate) {
      const redirect = route.query.redirect || "/profile";
      router.push(redirect);
    }
  });

  onError((mutationError) => {
    error.value = mutationError;
    loading.value = false;
    console.error("Mutation error:", mutationError);
  });

  async function userUpdate(id, name, avatar, phone, address, city) {
    loading.value = true;
    error.value = null;

    try {
      await userUpdateMutation({
        input: {
          id,
          name,
          avatar,
          phone,
          address,
          city,
        },
      });
    } catch (e) {
      console.error(e); // Lỗi được xử lý ở onError
    }
  }

  return {
    userUpdate,
    data,
    loading,
    error,
  };
}
