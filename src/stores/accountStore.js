import {defineStore} from 'pinia';
import {Account, AccountApi} from '@/api/account.js';

export const useAccountStore = defineStore('account', () => {

  async function getAccount () {
    const result = await AccountApi.get();
    return Object.assign(new Account(), result);
  }

  async function updateAlias (alias) {
    return await AccountApi.updateAlias(alias);
  }

  async function recharge (amount) {
    return await AccountApi.recharge(amount);
  }

  async function verifyCVU (cvu) {
    return await AccountApi.verifyCVU(cvu);
  }

  async function verifyAlias (alias) {
    return await AccountApi.verifyAlias(alias);
  }

  return { getAccount, updateAlias, recharge, verifyCVU, verifyAlias };

})
