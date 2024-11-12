import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// GraphQL Mutations
const LOGIN_MUTATION = gql`
    mutation login($input: LoginInput!) {
        login(input: $input) {
            tokenType
            expiresIn
            accessToken
            refreshToken
        }
    }
`

const LOGOUT_MUTATION = gql`
    mutation logout {
        logout
    }
`

const REGISTER_MUTATION = gql`
    mutation UserCreate($input: UserCreateInput!) {
        userCreate(input: $input) {
            id
            name
            email
            __typename
        }
    }
`;

export function useAuthUser() {
    const router = useRouter()
    const loading = ref(false)
    const error = ref(null)

    // Login function
    async function login(email, password) {
        const { mutate: loginMutation } = useMutation(LOGIN_MUTATION)
        loading.value = true
        try {
            const result = await loginMutation({
                input: {
                    email,
                    password
                }
            });
            if (result?.data?.login?.accessToken) {
                localStorage.setItem('apollo-token', result.data.login.accessToken)
                router.push('/')
            }
        } catch (err) {
            error.value = err.message
            console.error('Login failed:', err)
        } finally {
            loading.value = false
        }
    }

    //register function
    async function register(name, email, password, phone){
        const {mutate: registerMutation} = useMutation(REGISTER_MUTATION)
        loading.value = true
        try {
            const {data} = await registerMutation({
                input: {
                    name,
                    email,
                    password,
                    phone
                }
            })
            if (data?.userCreate) {
                router.push('/login')
            }
        } catch (err) {
            error.value = err.message
        }
    }


    // Logout function
    async function logout() {
        const { mutate: logoutMutation } = useMutation(LOGOUT_MUTATION)
        loading.value = true
        try {
            const { data } = await logoutMutation()

            if (data?.logout) {
                localStorage.removeItem('apollo-token')
                router.push('/login')
            }
        } catch (err) {
            error.value = err.message
            console.error('Logout failed:', err)
        } finally {
            loading.value = false
        }
    }

    return {
        login,
        register,
        logout,
        loading,
        error,
    }
}
