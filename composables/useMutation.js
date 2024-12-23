import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";

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

const FILE_IMAGE_UPLOAD_MUTATION = gql`
mutation fileImageUpload($file: Upload!){
  fileImageUpload(input: {image: $file}) {
    url
    originalFilename
  }
}
`

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
      const redirect = route.query.redirect || "/";
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
