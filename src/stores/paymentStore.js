import { defineStore } from 'pinia';
import { Payment, PaymentApi } from '@/api/payment.js';

export const usePaymentStore = defineStore('account', () => {

  async function getAccount () {
    const result = await AccountApi.get();
    return Object.assign(new Account(), result);
  }


  return { getAccount, updateAlias, recharge, verifyCVU, verifyAlias };

})
