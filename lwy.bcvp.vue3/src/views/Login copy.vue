<template>
    <div>
        <h1>登录页面</h1>
        <div>
            <label for="name">用户名:</label>
            <input v-model="name" id="name" type="text" placeholder="请输入用户名">
        </div>
        <div>
            <label for="pass">密码:</label>
            <input v-model="pass" id="pass" type="password" placeholder="请输入密码" />
        </div>
        <button @click="handleLogin">登录</button>
    </div>

    <div>
        <h2>Token:</h2>
        <p>{{ token }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { login } from '@/api/loginApi';
import type { LoginRequest, LoginResponse } from '@/api/loginApi';

export default defineComponent({
    name: 'Login',
    setup() {
        const name = ref<string>('blogadmin')
        const pass = ref<string>('blogadmin')

        const token = ref<string | null>(null);

        const handleLogin = async () => {
            try {
                const params: LoginRequest = {
                    name: name.value,
                    pass: pass.value,
                }

                const response = await login(params)
                if (response.success && response.response.token) {
                    token.value = response.response.token
                } else {
                    alert('登录失败：' + response.msg)
                }
            } catch (error) {
                console.error('请求错误：', error)
                alert('请求失败');
            }
        };

        return {
            name,
            pass,
            token,
            handleLogin,
        }
    }
})
</script>

<style scoped>
div {
    margin-bottom: 20px;
}

button {
    margin-top: 10px;
}
</style>
