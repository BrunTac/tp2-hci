import { defineStore } from 'pinia';
import { Account, AccountApi } from '@/api/account.js';

export const useAccountStore = defineStore('account', () => {

  async function getAccount () {
    const result = await AccountApi.get();
    return Object.assign(new Account(), result);
  }

  async function updateAlias (alias) {
    const result = await AccountApi.updateAlias(alias);
    return result;
  }

  async function recharge (amount) {
    const result = await AccountApi.recharge(amount);
    return result;
  }

  async function verifyCVU (cvu) {
    const result = await AccountApi.verifyCVU(cvu);
    return result;
  }

  async function verifyAlias (alias) {
    const result = await AccountApi.verifyAlias(alias);
    return result;
  }

  return { getAccount, updateAlias, recharge, verifyCVU, verifyAlias };

})
