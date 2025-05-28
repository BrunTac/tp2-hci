import { defineStore } from 'pinia'
import { PaymentApi } from '@/api/payment'

export const usePaymentStore = defineStore('payment', () => {
  const payments = ref([])
  const selectedPayment = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getAll = async (params = {}, controller = null) => {
    loading.value = true
    error.value = null
    try {
      const {
        page,
        direction,
        pending,
        method,
        range,
        role,
        cardId,
      } = params

      const response = await PaymentApi.getAll(
        page,
        direction,
        pending,
        method,
        range,
        role,
        cardId,
        controller
      )
      payments.value = response?.results || []
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const getById = async (id, controller = null) => {
    loading.value = true
    error.value = null
    try {
      const response = await PaymentApi.get(id, controller)
      selectedPayment.value = response?.data || null
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const generatePendingPayment = async (description, amount, controller = null) => {
    return await PaymentApi.generatePendingPayment(description, amount, controller)
  }

  const processPendingPayment = async (uuid, cardId, controller = null) => {
    return await PaymentApi.processPendingPayment(uuid, cardId, controller)
  }

  const emailTransfer = async (email, cardId, description, amount, controller = null) => {
    return await PaymentApi.emailTransfer(email, cardId, description, amount, controller)
  }

  const cvuTransfer = async (cvu, cardId, description, amount, controller = null) => {
    return await PaymentApi.cvuTransfer(cvu, cardId, description, amount, controller)
  }

  const aliasTransfer = async (alias, cardId, description, amount, controller = null) => {
    return await PaymentApi.aliasTransfer(alias, cardId, description, amount, controller)
  }

  const clearSelected = () => {
    selectedPayment.value = null
  }

  return {
    payments,
    selectedPayment,
    loading,
    error,
    getAll,
    getById,
    generatePendingPayment,
    processPendingPayment,
    emailTransfer,
    cvuTransfer,
    aliasTransfer,
    clearSelected,
  }
})
