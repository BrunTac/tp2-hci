<template>
  <Header>Ingresar</Header>

  <Sidebar />

  <v-container fill-height fluid>
    <v-row>
      <v-col cols="auto" style="margin-left: 27vw;">
        <v-form style="display: flex; flex-direction: column;" @submit.prevent>
          <v-col>
            <h2 style="margin-top: 8vh">Ingresar un monto de ...</h2>
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
            <h2 style="margin-top: 3vh">desde ...</h2>
            <v-btn-toggle
              v-model="depositSource"
              class="w-100"
              mandatory
              style="background-color: #ffe9e5; overflow: hidden; margin-top: 1vh;"
            >
              <v-btn
                class="text-none"
                style="width: 50%; justify-content: center;"
                :style="depositSource === 'card'? 'background-color: #d28d8d; color: white;': 'background-color: #ffe9e5; color: #d28d8d;'"
                value="card"
              >
                Tarjeta
              </v-btn>
              <v-btn
                class="text-none"
                style="width: 50%; justify-content: center;"
                :style="depositSource === 'bankAccount'? 'background-color: #d28d8d; color: white;': 'background-color: #ffe9e5; color: #d28d8d;'"
                value="bankAccount"
              >
                Cuenta bancaria
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-card
            class="deposit-card"
            flat
            style="display: flex; flex-direction: column; margin-top: 4vh; width: 30vw; height: auto;"
          >
            <v-col>
              <div v-if="depositSource === 'card'">
                <div
                  style="display: flex; overflow-x: auto; overflow-y: hidden; white-space: nowrap; padding: 1vh; gap: 0.5vw;
                         height: 30vh; scrollbar-width: none; -ms-overflow-style: none; margin-right: 1vw; margin-left: 1vw;"
                >
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
              </div>
              <div v-else>
                <div style="margin: 2vh;">
                  <h3 style="margin-top: 3vh">Ingrese el CBU de la cuenta</h3>
                  <v-text-field
                    v-model="accountCBU"
                    clearable
                    color="#d28d8d"
                    label="CBU"
                    style="margin-top: 1vh;"
                    type="text"
                    variant="outlined"
                  />
                </div>
              </div>
              <v-row class="align-center" style="margin: 0 0 1.5vh;">
                <v-col class="d-flex justify-center align-center">
                  <v-btn
                    class="text-none"
                    :disabled="isDepositDisabled"
                    rounded="pill"
                    style="background-color: #d28d8d; width: 10vw; height: 5vh; color: white; font-size: 2vh; margin-bottom: 0"
                    @click="showDepositConfirm = true"
                  >
                    Ingresar
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
          <v-dialog v-model="showDepositConfirm" width="auto">
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
              <v-card-title style="margin-top: 2vh;">Confirmación del depósito</v-card-title>
              <v-card-text style="font-size: 1.9vh;">
                <h4 style="margin-top: 2vh">Ingresar desde...</h4>
                <div v-if="depositSource === 'card'">
                  <v-text-field
                    color="#d28d8d"
                    :model-value="selectedSource"
                    readonly
                    style="margin-top: 0.5vh;"
                    type="text"
                    variant="outlined"
                  />
                </div>
                <div v-else>
                  <v-text-field
                    v-model="accountCBU"
                    color="#d28d8d"
                    readonly
                    style="margin-top: 0.5vh;"
                    type="text"
                    variant="outlined"
                  />
                </div>
                <h4 style="margin-top: 2vh">un monto de ...</h4>
                <v-text-field
                  v-model="formattedValue"
                  color="#d28d8d"
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
                  @click="showDepositConfirm = false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  class="text-none"
                  rounded="pill"
                  style="background-color: #d28d8d; width: 10vw; height: 5vh; color: white; font-size: 2vh;"
                  @click="confirmDeposit"
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
    <v-card class="deposit-card loading-container" style="display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
      <div
        class="loading-bar"
        :style="{ width: loadingProgress + '%' }"
      />
      <v-card-text style="font-size: 1.2vw; font-weight: 450; z-index: 2; position: relative;">
        {{ loadingText }}
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
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
      <v-card-title class="text-center justify-center" style="margin-top: 2vh;">¡Depósito realizado exitosamente!</v-card-title>
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
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAccountStore } from '@/stores/accountStore.js'
  const accountStore = useAccountStore()
  const router = useRouter()
  const formattedValue = ref('0,00')
  const rawCents = ref('')
  const selectedCardIndex = ref(null)
  const showOverlay = ref(false)
  const showDepositConfirm = ref(false)
  const hovering = ref(false)
  const showBottomSheet = ref(false)
  const showSuccessModal = ref(false)
  const loadingProgress = ref(0)
  const loadingText = ref('Procesando depósito...')
  const depositSource = ref('card')
  const accountCBU = ref('')
  const isDepositDisabled = computed(() => {
    const monto = parseInt(rawCents.value || '0', 10)
    return monto <= 0 || selectedCardIndex.value === null && depositSource.value === 'card' || !accountCBU.value.trim() && depositSource.value === 'bankAccount'
  })
  const confirmDeposit = async () => {
    showDepositConfirm.value = false
    showBottomSheet.value = true
    loadingProgress.value = 0
    loadingText.value = 'Procesando depósito...'

    const value = parseInt(rawCents?.value || '0', 10);
    const amount = Math.abs(value / 100);
    await accountStore.recharge(amount)

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
    rawCents.value = ''
    formattedValue.value = '0,00'
    selectedCardIndex.value = null
    loadingProgress.value = 0
    router.push('/home')
  }
  const selectedSource = computed(() => {
    const card = cards.value[selectedCardIndex.value]
    return card ? `Tarjeta terminada en ${card.cardNumber.slice(-4)}` : ''
  })
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
  const shareReceipt = () => {
    // Función placeholder para compartir comprobante
    console.log('Compartir comprobante - función pendiente de implementar')
  }
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

.deposit-card {
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
