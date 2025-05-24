import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Account, AccountApi } from '@/api/account.js'

export const useAccountStore = defineStore("user", () => {
  const account = ref(new Account())
})
