<template>
  <Header>Transferir</Header>

  <Sidebar />

  <v-container fill-height fluid>
    <v-row>
      <v-col cols="auto" style="margin-left: 27vw;">
        <v-form style="display: flex; flex-direction: column;" @submit.prevent>
          <v-col>
            <h2 style="margin-top: 8vh">Transferir a ...</h2>
            <v-text-field
              v-model="receiverName"
              color="#d28d8d"
              readonly
              style="margin-top: 1vh;"
              type="text"
              variant="outlined"
            />
            <h2 style="margin-top: 3vh">un monto de ...</h2>
            <v-text-field
              v-model="formattedValue"
              color="#d28d8d"
              readonly
              style="margin-top: 0.5vh;"
              type="text"
              variant="outlined"
            />
          </v-col>
          <v-card
            class="transfer-card"
            flat
            style="display: flex; flex-direction: column; margin-top: 4vh; width: 30vw; height: auto;"
          >
            <v-col>
              <div
                style="display: flex; overflow-x: auto; overflow-y: hidden; white-space: nowrap; padding: 1vh; gap: 0.5vw;
                       height: 30vh; scrollbar-width: none; -ms-overflow-style: none; margin-right: 1vw; margin-left: 1vw;"
              >
                <div
                  :style="{
                    minWidth: '23vw',
                    height: '24vh',
                    backgroundColor: isInsufficientBalance ? '#e8b3b3' : '#d28d8d',
                    borderRadius: '1.2vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.2vh 1vw',
                    color: 'white',
                    position: 'relative',
                    border: selectedCardIndex === 'balance' ? '0.3vh solid black' : '0.3vh solid transparent',
                    boxShadow: selectedCardIndex === 'balance' ? '0 0 1vh white' : 'none',
                    cursor: isInsufficientBalance ? 'not-allowed' : 'pointer',
                    boxSizing: 'border-box',
                  }"
                  @click="!isInsufficientBalance && (selectedCardIndex = 'balance')"
                >
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="font-size: 2.8vh; margin: 0;">DreamPay</h2>
                    <v-icon
                      style="cursor: pointer; font-size: 2.4vh; margin-left: 1vw"
                      @click.stop="hideBalance = !hideBalance"
                    >
                      {{ hideBalance ? 'mdi-eye' : 'mdi-eye-off' }}
                    </v-icon>
                  </div>
                  <span style="font-size: 1.8vh; font-weight: bold; margin-bottom: 13.5vh;">
                    {{ hideBalance ?'$ ***' : '$ ' + formattedBalance }}
                  </span>
                  <div
                    v-if="isInsufficientBalance"
                    style="
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      right: 0;
                      background-color: #d28d8d;
                      padding: 0.8vh;
                      border-radius: 0 0 1.2vh 1.2vh;
                      text-align: center;
                      font-size: 1.4vh;
                      font-weight: bold;
                    "
                  >
                    Saldo insuficiente
                  </div>
                </div>
                <template v-for="(item, index) in cards" :key="index">
                  <div
                    :style="{
                      minWidth: '22vw',
                      height: '24vh',
                      display: 'inline-block',
                      border: selectedCardIndex === index ? '0.3vh solid black' : '0.3vh solid transparent',
                      boxShadow: selectedCardIndex === index ? '0 0 1vh white' : 'none',
                      borderRadius: '1.2vh',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                      overflow: 'hidden'
                    }"
                    @click="selectedCardIndex = index"
                  >
                    <CreditCard
                      :card-holder="item.cardHolder"
                      :card-number="item.cardNumber"
                      :cvv="item.cvv"
                      :disable-flip="true"
                      :expiry-month="item.expiryMonth"
                      :expiry-year="item.expiryYear"
                      style="width: 100%; height: 100%; border-radius: 0.9vh;"
                    />
                  </div>
                </template>
                <div
                  style="min-width: 22vw; height: 24vh; display: flex; justify-content: center; align-items: center;
                  border: 0.2vh dashed #d28d8d; border-radius: 1.2vh; cursor: pointer; box-sizing: border-box;"
                >
                  <div
                    style="display: flex; flex-direction: column; align-items: center; gap: 1vh;"
                  >
                    <v-btn
                      icon
                      style="background-color: #d28d8d; color: white; font-size: 2.5vh; width: 5vh; height: 5vh; transition: transform 0.2s ease;"
                      :style="{ transform: hovering ? 'scale(1.05)' : 'scale(1)' }"
                      @click="showOverlay = true"
                      @mouseleave="hovering = false"
                      @mouseover="hovering = true"
                    >
                      +
                    </v-btn>
                    <p style="margin: 0; font-size: 1.6vh; text-align: center;">Agregar un medio de pago</p>
                  </div>
                </div>
              </div>

              <v-row class="align-center" style="margin: 1.5vh; margin-top: -2vh;">
                <v-text-field
                  v-model="description"
                  readonly
                  color="#d28d8d"
                  label="Motivo"
                  style="margin-right: 0.5vw; height: 5vh;"
                  variant="outlined"
                  width="13vw"
                />
                <v-col class="d-flex justify-center align-center">
                  <v-btn
                    class="text-none"
                    :disabled="isTransferDisabled"
                    rounded="pill"
                    style="background-color: #d28d8d; width: 10vw; height: 5vh; color: white; font-size: 2vh; margin-bottom: 0"
                    @click="checkTransfer"
                  >
                    Transferir
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
          <v-dialog v-model="showOverlay" width="400">
            <v-card>
              <v-card-title>Agregar nueva tarjeta</v-card-title>
              <v-card-text>
                <!-- Por ahora vacío -->
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn text @click="showOverlay = false">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="showTransferConfirm" width="auto">
            <v-card style="
                width: 32vw;
                display: flex;
                flex-direction: column;
                background-color: #ffe9e5;
                margin-left: 13vw;
                color: black;
                padding: 2vh;">
              <v-card-title style="margin-top: 2vh;">Confirmación de la transferencia</v-card-title>
              <v-card-text style="font-size: 1.9vh;">
                <h4 style="margin-top: 2vh">Transferir a ...</h4>
                <v-text-field
                  v-model="receiverName"
                  color="#d28d8d"
                  readonly
                  style="margin-top: 0.5vh;"
                  type="text"
                  variant="outlined"
                />
                <h4 style="margin-top: 2vh">un monto de ...</h4>
                <v-text-field
                  v-model="formattedValue"
                  color="#d28d8d"
                  readonly
                  style="margin-top: 0.5vh;"
                  type="text"
                  variant="outlined"
                />
                <h4 style="margin-top: 2vh">desde ...</h4>
                <v-text-field
                  color="#d28d8d"
                  :model-value="selectedSource"
                  readonly
                  style="margin-top: 0.5vh;"
                  type="text"
                  variant="outlined"
                />
              </v-card-text>
              <v-card-actions class="justify-center" style="margin-bottom: 2vh">
                <v-btn
                  class="text-none"
                  rounded="pill"
                  style="border: 0.2vh solid #d28d8d; width: 10vw; height: 5vh; color: #d28d8d; font-size: 2vh;"
                  @click="showTransferConfirm = false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  class="text-none"
                  rounded="pill"
                  style="background-color: #d28d8d; width: 10vw; height: 5vh; color: white; font-size: 2vh;"
                  @click="confirmTransfer"
                >
                  Confirmar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <v-bottom-sheet v-model="showBottomSheet" persistent transition="slide-y-reverse-transition">
    <v-card class="transfer-card loading-container" style="display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
      <div
        class="loading-bar"
        :style="{ width: loadingProgress + '%' }"
      />
      <v-card-text style="font-size: 1.2vw; font-weight: 450; z-index: 2; position: relative;">
        {{ loadingText }}
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
  <v-dialog v-model="showTransferErrorModal" width="auto">
    <v-card style="
                width: 32vw;
                display: flex;
                flex-direction: column;
                background-color: #d28d8d;
                margin-left: 13vw;
                color: black;
                padding: 2vh;"
    >
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div/>
        <v-btn
          icon
          style="margin-right: 0.8vw;"
          variant="text"
          @click="showTransferErrorModal = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <h2 style="margin-bottom: 3vh; text-align: center">{{ transferError }}</h2>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showSuccessModal" persistent width="auto">
    <v-card
      style="
              width: 32vw;
              display: flex;
              flex-direction: column;
              background-color: #ffe9e5;
              margin-left: 13vw;
              color: black;
              padding: 2vh;"
    >
      <v-card-title class="text-center justify-center" style="margin-top: 2vh;">¡Transferencia realizada exitosamente!</v-card-title>
      <v-card-actions
        class="d-flex flex-column align-center"
        style="margin-top: 2vh; margin-bottom: 1vh; gap: 2.5vh;"
      >
        <v-btn
          class="text-none d-flex align-center"
          rounded="pill"
          style="border: 0.2vh solid #d28d8d; width: auto; height: 5vh; color: #d28d8d; font-size: 2vh; padding: 0 1.5vw;"
          @click="shareReceipt"
        >
          <span style="">Compartir comprobante</span>
          <v-icon style="margin-left: 1vw;">mdi-share-variant</v-icon>
        </v-btn>
        <v-btn
          class="text-none"
          rounded="pill"
          style="background-color: #d28d8d; width: 10vw; height: 5vh; color: white; font-size: 2vh;"
          @click="closeSuccessModal"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useSecurityStore } from '@/stores/securityStore.js'
import { useAccountStore } from '@/stores/accountStore.js'
import { usePaymentStore } from '@/stores/paymentStore.js'
const securityStore = useSecurityStore()
const accountStore = useAccountStore()
const paymentStore = usePaymentStore()
const route = useRoute()
const router = useRouter()
const uuid = route.params.uuid
const description = decodeURIComponent(route.query.desc || ' ');
const receiverName = decodeURIComponent(route.query.receiver || ' ');
const transferAmount = route.query.amount;
const selectedCardIndex = ref(null)
const accountBalance = ref(0)
const hideBalance = ref(true)
const showOverlay = ref(false)
const showTransferConfirm = ref(false)
const hovering = ref(false)
const showBottomSheet = ref(false)
const showSuccessModal = ref(false)
const showTransferErrorModal = ref(false);
const transferError = ref('');
const loadingProgress = ref(0)
const loadingText = ref('Procesando transferencia...')
onMounted(async () => {
  if (!securityStore.isLoggedIn) {
    router.replace({ name: '/', query: { redirect: route.fullPath } })
  }
  const account = await accountStore.getAccount()
  accountBalance.value = account.balance
})
const isTransferDisabled = computed(() => {
  return selectedCardIndex.value === null
})
const formattedValue = computed(() => {
  const val = parseFloat(transferAmount).toFixed(2)
  return `$ ${val.replace('.', ',')}`
})
const checkTransfer = async () => {
  showTransferConfirm.value = true
}
const confirmTransfer = async () => {
  showTransferConfirm.value = false
  showBottomSheet.value = true
  loadingProgress.value = 0
  loadingText.value = 'Procesando transferencia...'
  const cardId = selectedCardIndex.value === 'balance' ? null : cards.value[selectedCardIndex.value].cvv;
  try {
    await paymentStore.processPendingPayment(uuid, cardId ?? null);
  }catch(err){
    transferError.value = 'Ocurrió un error al procesar la transferencia.';
    showBottomSheet.value = false;
    showTransferErrorModal.value = true;
    return ;
  }

  const progressInterval = setInterval(() => {
    loadingProgress.value += 2
    if (loadingProgress.value >= 100) {
      clearInterval(progressInterval)
      setTimeout(() => {
        showBottomSheet.value = false
        showSuccessModal.value = true
      }, 500)
    }
  }, 50)
}
const closeSuccessModal = () => {
  showSuccessModal.value = false
  loadingProgress.value = 0
  router.push('/home')
}
const selectedSource = computed(() => {
  if (selectedCardIndex.value === 'balance') return 'Saldo en cuenta'
  const card = cards.value[selectedCardIndex.value]
  return card ? `Tarjeta terminada en ${card.cardNumber.slice(-4)}` : ''
})
const formattedBalance = computed(() => {
  const balance = parseFloat(accountBalance.value) || 0
  return balance.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
})
const shareReceipt = () => {
  // Función placeholder para compartir comprobante
  console.log('Compartir comprobante - función pendiente de implementar')
}
const isInsufficientBalance = computed(() => {
  const currentBalance = parseFloat(accountBalance.value) || 0
  return transferAmount > currentBalance
})
const cards = ref(getCardsPage());
function getCardsPage () {
  return [
    {
      cardNumber: '4111111111111111',
      cardHolder: 'JOHN DOE',
      expiryMonth: '12',
      expiryYear: '25',
      cvv: '123',
    },
    {
      cardNumber: '5500000000000004',
      cardHolder: 'JANE SMITH',
      expiryMonth: '06',
      expiryYear: '24',
      cvv: '456',
    },
    {
      cardNumber: '2223000048400011',
      cardHolder: 'ALICE JOHNSON',
      expiryMonth: '09',
      expiryYear: '27',
      cvv: '789',
    },
    {
      cardNumber: '4111222233334444',
      cardHolder: 'BOB BROWN',
      expiryMonth: '01',
      expiryYear: '26',
      cvv: '321',
    },
    {
      cardNumber: '5555555555554444',
      cardHolder: 'CHARLIE DAVIS',
      expiryMonth: '11',
      expiryYear: '28',
      cvv: '654',
    },
  ]
}
</script>

<style scoped>

.transfer-card {
  background-color: #ffe9e5;
  border: 1px solid #000000;
  border-radius: 1rem;
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
