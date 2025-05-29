import { ref } from 'vue'
import { defineStore } from 'pinia'
import { User, UserApi } from '@/api/user.js'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const email = ref(null)
  const justVerified = ref(false)
  const justReset = ref(false)

  async function register (user) {
    const result = await UserApi.register(user)
    const newUser = Object.assign(new User(), result);
    users.value.push(newUser);
    return newUser;
  }

  async function verify (code) {
    const result = await UserApi.verify(code)
    if (result.email) {
      email.value = result.email;
    }
    return result;
  }

  async function resend () {
    const result = await UserApi.resendVerification(email.value)
    return result;
  }

  async function requestPasswordReset (email) {
    const result = await UserApi.resetPassword(email)
    return result;
  }

  async function changePassword (code, password) {
    const result = await UserApi.changePassword(code, password)
    return result;
  }

    async function getCurrentUser() {
        const result = await UserApi.get()
        return result;
    }

    return { users, email, justVerified, justReset, register, verify, resend, requestPasswordReset, changePassword, getCurrentUser }

})
