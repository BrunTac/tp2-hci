<template>
  <Header>Link de pago</Header>

  <Sidebar />

  <v-container fill-height fluid>
    <v-row>
      <v-col cols="auto" style="margin-left: 27vw;">
        <v-form style="display: flex; flex-direction: column;" @submit.prevent>
          <v-col>
            <h2 style="margin-top: 20vh">Generar un link de pago de ...</h2>
            <v-text-field
              clearable
              color="#d28d8d"
              label="Monto"
              :model-value="formattedValue"
              style="margin-top: 1vh;"
              variant="outlined"
              @click:clear="clearInput"
              @keydown.prevent="handleKeydown"
            />
            <h2 style="margin-top: 3vh">por ...</h2>
            <v-text-field
              v-model="linkDescription"
              clearable
              color="#d28d8d"
              label="Descripción"
              style="margin-top: 1vh;"
              type="text"
              variant="outlined"
            />
            <v-card-actions>
              <v-btn
                class="text-none"
                :disabled="isLinkDisabled"
                rounded="pill"
                style="background-color: #d28d8d; height: 5vh; width:16vw; color: white; font-size: 2vh; margin-left: 8vw; margin-right: 8vw; margin-top: 4vh"
                @click="generateLink"
              >
                Generar link de pago
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="showSuccessModal" persistent width="auto">
    <v-card
      class="link-card"
      style="width: 34vw; display: flex; flex-direction: column; background-color: #ffe9e5; margin-left: 18vw; color: black;"
    >
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <v-card-title style="margin-top: 2vh; margin-left: 0.8vw;">¡Link de pago generado exitosamente!</v-card-title>
        <v-btn
          icon
          style="margin-top: 2vh; margin-right: 0.8vw;"
          variant="text"
          @click="showSuccessModal = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-text-field
        v-model="link"
        label="Link de pago"
        readonly
        style="margin: 4vh 2vw;"
        variant="outlined"
      >
        <template #append-inner>
          <v-btn
            icon
            variant="plain"
            @click="copyToClipboard"
          >
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-card>
  </v-dialog>
  <v-bottom-sheet v-model="showGenerateBottomSheet" persistent transition="slide-y-reverse-transition">
    <v-card class="link-card loading-container" style="display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
      <div
        class="loading-bar"
        :style="{ width: loadingProgress + '%' }"
      />
      <v-card-text style="font-size: 1.2vw; font-weight: 450; z-index: 2; position: relative;">
        {{ loadingText }}
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
  <v-bottom-sheet v-model="showCopyBottomSheet" transition="slide-y-reverse-transition">
    <v-card class="link-card" style="display: flex; align-items: center; justify-content: center;">
      <v-card-text style="font-size: 1.2vw; font-weight: 450;">{{ copyMessage }}</v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup>
  import { ref } from 'vue'
  import { usePaymentStore } from '@/stores/paymentStore.js';
  import { useSecurityStore } from '@/stores/securityStore.js';
  const paymentStore = usePaymentStore()
  const securityStore = useSecurityStore()
  const user = ref(false)
  const link = ref('')
  const showCopyBottomSheet = ref(false)
  const copyMessage = ref('')
  const linkDescription = ref('')
  const showGenerateLink = ref(false)
  const showGenerateBottomSheet = ref(false)
  const showSuccessModal = ref(false)
  const loadingProgress = ref(0)
  const loadingText = ref('Generando link de pago...')
  onMounted(async () => {
    user.value = await securityStore.getCurrentUser()
    console.log('Usuario:', user.value)
  })
  const isLinkDisabled = computed(() => {
    const amount = parseInt(rawCents.value || '0', 10)
    return amount <= 0
  })
  const generateLink = async () => {
    showGenerateLink.value = false
    showGenerateBottomSheet.value = true
    loadingProgress.value = 0
    loadingText.value = 'Generando link de pago...'

    const value = parseInt(rawCents?.value || '0', 10);
    const amount = Math.abs(value / 100);
    const description = linkDescription.value?.trim() || ' ';
    const payment = await paymentStore.generatePendingPayment(description, amount)

    const receiverName = `${user.value?.firstName || ''} ${user.value?.lastName || ''}`
    const BASE_PAYMENT_URL = 'http://localhost:3000/pago';
    const encodedDescription = encodeURIComponent(description);
    const encodedReceiverName = encodeURIComponent(receiverName);
    link.value = `${BASE_PAYMENT_URL}/${payment.uuid}?desc=${encodedDescription}&amount=${amount}&receiver=${encodedReceiverName}`;

    const progressInterval = setInterval(() => {
      loadingProgress.value += 2
      if (loadingProgress.value >= 100) {
        clearInterval(progressInterval)
        setTimeout(() => {
          showGenerateBottomSheet.value = false
          showSuccessModal.value = true
        }, 500)
      }
    }, 50)
  }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link.value)
      .then(() => {
        copyMessage.value = '¡Link de pago copiado!'
        showCopyBottomSheet.value = true
        setTimeout(() => {
          showCopyBottomSheet.value = false
        }, 3000)
      })
      .catch(() => {
        copyMessage.value = 'Error al copiar el link de pago'
        showCopyBottomSheet.value = true
      })
  }
  const formattedValue = ref('0,00')
  const rawCents = ref('')
  const handleKeydown = event => {
    const isDigit = /^[0-9]$/.test(event.key)
    const isBackspace = event.key === 'Backspace'
    if (isDigit) {
      if (rawCents.value.length < 11) {
        rawCents.value += event.key
      }
    } else if (isBackspace) {
      rawCents.value = rawCents.value.slice(0, -1)
    } else {
      return
    }
    updateFormattedValue()
  }
  const updateFormattedValue = () => {
    const numericValue = parseInt(rawCents.value || '0', 10) / 100
    formattedValue.value = numericValue.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
  const clearInput = () => {
    rawCents.value = ''
    formattedValue.value = '0,00'
  }
</script>

<style scoped>
.link-card {
  background-color: #ffe9e5;
  border: 1px solid #cac4d0;
  border-radius: 1.5rem;
  color: black;
}

.v-text-field input {
  text-align: right;
  font-size: 1.2rem;
}


.loading-container {
  position: relative;
  height: 80px;
}

.loading-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #d28d8d;
  transition: width 0.1s ease-out;
  border-radius: 1rem;
}
</style>
