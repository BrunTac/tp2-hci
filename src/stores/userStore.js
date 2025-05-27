import { ref } from 'vue'
import { defineStore } from 'pinia'
import { User, UserApi } from '@/api/user.js'

export const useUserStore = defineStore("user", () => {
    const users = ref([])

    async function register(user) {
        const result = await UserApi.register(user)
        const newUser = Object.assign(new User(), result);
        users.value.push(newUser);
        return newUser;
    }

    async function verify(code) {
        const result = await UserApi.verify(code)
        return result;
    }

    async function resend(email) {
        const result = await UserApi.resendVerification(email)
        return result;
    }

    async function requestPasswordReset(email) {
        const result = await UserApi.resetPassword(email)
        return result;
    }

    async function changePassword(code, password) {
        const result = await UserApi.changePassword(code, password)
        return result;
    }

    async function getCurrentUser() {
        const result = await UserApi.get()
        return result;
    }

    return { users, register, verify, resend, requestPasswordReset, changePassword, getCurrentUser }

})