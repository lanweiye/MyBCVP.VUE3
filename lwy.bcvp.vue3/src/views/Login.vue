<template>
    <div class="login">
        <h1>登录</h1>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="name">用户名:</label>
                <input v-model="loginForm.name" id="name" type="text" placeholder="请输入用户名" required>
            </div>
            <div>
                <label for="pass">密码:</label>
                <input v-model="loginForm.pass" id="pass" type="password" placeholder="请输入密码" required />
            </div>
            <button type="submit" :disabled="loading">
                {{ loading ? '登录中...' : '登录' }}
            </button>

            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api/loginApi';
import { useAuthStore } from '@/stores/auth'
import type { LoginRequest, BaseResponse, LoginResponse } from '@/api/loginApi';

const router = useRouter()
const authStore = useAuthStore()
const loginForm = ref<LoginRequest>({
    name: '',
    pass: '',
})

const loading = ref(false)
const errorMessage = ref<string | null>(null)

const onSubmit = async () => {
    loading.value = true
    errorMessage.value = null

    try {
        const response: BaseResponse<LoginResponse> = await login(loginForm.value)

        if (response.success) {
            authStore.setToken(response.response.token)
            router.push({ name: 'home' })
        } else {
            errorMessage.value = response.msg
        }
    } catch (error) {
        errorMessage.value = '登录失败，请重试'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
}

.error {
    color: red;
    margin-top: 1rem;
}
</style>
