<template>
  <Header>Inicio</Header>

  <Sidebar />

  <v-container style="max-width: 81vw; margin-top: 1vh;">

    <!-- CARD BIENVENIDA -->
    <v-row>
      <v-col cols="12">
        <v-card
          class="home-card"
          flat
          style="display: flex; align-items: center;"
        >
          <v-card-text style="font-size: 1.5rem; font-weight: 500;">
            Hola, {{ currentUser?.firstName }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="text-none"
              rounded="xl"
              style="margin-right: 1vw; background-color: #d28d8d; width: auto; height: 2.7vw; color: white; font-size: 1vw; padding: 0 0.7vw;"
            >
              Ver información

              <!-- POPUP CVU Y ALIAS -->

              <v-overlay
                v-model="overlay"
                activator="parent"
                style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"
              >
                <v-card
                  class="home-card"
                  style="width: 34vw;
                  display: flex;
                  flex-direction: column;
                  background-color: #fbc8c0;"
                >
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <v-card-title style="margin-top: 2vh; margin-left: 0.8vw;">Información</v-card-title>
                    <v-btn
                      icon
                      style="margin-top: 2vh; margin-right: 0.8vw;"
                      variant="text"
                      @click="overlay = false"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                  <v-text-field
                    label="CVU"
                    :model-value="currentAccount?.cvu"
                    readonly
                    style="margin-top: 4vh; margin-left: 2vw; margin-right: 2vw;"
                    variant="outlined"
                  >
                    <template #append-inner>
                      <v-btn
                        icon
                        variant="plain"
                        @click="copyToClipboard(true)"
                      >
                        <v-icon>mdi-content-copy</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>

                <v-text-field
                  label="Alias"
                  :model-value="currentAccount?.alias"
                  variant="outlined"
                  style="margin-left: 2vw; margin-right: 2vw; margin-bottom: 1vh; margin-top: 1vh"
                >
                  <template #append-inner>
                    <v-btn
                      icon
                      variant="plain"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      variant="plain"
                      @click="copyToClipboard(false)"
                    >
                      <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
      
                </v-text-field>

                </v-card>
              </v-overlay>

            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">

        <!-- CARD SALDO -->

        <v-card
          class="home-card"
          flat
          style="display: flex; flex-direction: column; margin-top: 1.5vh; width: auto; height: auto;"
        >
          <v-card-subtitle style="margin-top: 1.8vh; color: black; padding-left: 1.5vw; font-size: 1.2rem; font-weight: 450;">
            Saldo en cuenta
          </v-card-subtitle>
          <v-sheet style="padding-left: 0.2vw; display:flex; align-items: center; background-color: transparent;">
            <v-card-title v-if="!hideBalance" style="font-size: 3.5rem; color: black">
              $ {{ currentAccount?.balance }}
            </v-card-title>
            <v-card-title v-if="hideBalance" style="font-size: 3.5rem; color: black">
              $ ***
            </v-card-title>
            <v-btn
              class="rounded-circle grey-button"
              size="small"
              style="width: 2vw; min-width: auto; height: 2vw"
              @click="hideBalance = !hideBalance"
            >
              <v-icon
                size="1.2vw"
              >mdi-eye</v-icon>
            </v-btn>
          </v-sheet>
          <v-container
            style="display: flex; align-items: center; background-color: transparent; padding-top: 0.5vh;"
          >
            <v-row style="margin-bottom: 0.2vh;">
              <v-col cols="4">
                <v-sheet style="display: flex; flex-direction:column; align-items: center; background-color: transparent; color: black;">
                  <v-btn
                    class="grey-button"
                    rounded="lg"
                    @click="navigateTo('/ingresar')"
                  >
                    <v-icon size="2.8vw">mdi-arrow-up</v-icon>
                  </v-btn>
                  <v-card-text style="font-size: 1.2vw; font-weight: 450; padding-top: 1.5vh; padding-bottom: 0vh;">Ingresar</v-card-text>
                </v-sheet>
              </v-col>
              <v-col cols="4">
                <v-sheet style="display: flex; flex-direction:column; align-items: center; background-color: transparent; color: black;">
                  <v-btn
                    class="grey-button"
                    rounded="lg"
                    @click="navigateTo('/transferir')"
                  >
                    <v-icon size="2.8vw">mdi-transfer</v-icon>
                  </v-btn>
                  <v-card-text style="font-size: 1.2vw; font-weight: 450; padding-top: 1.5vh; padding-bottom: 0vh;">
                    Transferir
                  </v-card-text>
                </v-sheet>
              </v-col>
              <v-col cols="4">
                <v-sheet style="display: flex; flex-direction:column; align-items: center; background-color: transparent; color: black;">
                  <v-btn
                    class="grey-button"
                    rounded="lg"
                    @click="navigateTo('/linkDePago')"
                  >
                    <v-icon size="2.8vw">mdi-link</v-icon>
                  </v-btn>
                  <v-card-text style="font-size: 1.2vw; font-weight: 450; padding-top: 1.5vh; padding-bottom: 0vh;">Link de Pago</v-card-text>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <!-- CARD TARJETAS -->

        <v-card
          class="home-card"
          flat
          style="display: flex; flex-direction: column; margin-top: 3vh; width: auto; height: 40vh"
        >
          <v-sheet style="display: flex; align-items: center; background-color: transparent; color: black; margin-bottom: 2vh;">
            <v-card-title style="font-size: 1.5rem; margin-top: 0.5vh; margin-left: 0.5vw">
              Tarjetas
            </v-card-title>
            <v-spacer />
            <v-btn
              class="grey-button"
              elevation="2"
              rounded="lg"
              style="margin-top: 1vh; margin-right: 1.5vw; width: 3vw; height: 5vh;"
            >
              <v-icon size="2.3vw">mdi-arrow-right</v-icon>
            </v-btn>
          </v-sheet>
          <v-card
            v-if="currentCards.length > 0"
            class="home-card"
            style="align-self: center; height: 16vw; width: 25.4vw; margin-bottom: 3vh;"
          > Tarjeta </v-card>
          <v-sheet 
            v-if="currentCards.length === 0"
            style="display: flex; flex-direction: column; align-items: center; background-color: transparent; color: black; margin-top: 7vh">
            <v-icon size="2.4vw">mdi-emoticon-sad</v-icon>
            <v-card-text style="text-align: center; font-size: 1vw">
              No hay tarjetas!<br>
              Agregalas en el sector 'Tarjetas'
            </v-card-text>
          </v-sheet>
        </v-card>

      </v-col>

      <!-- CARD MOV RECIENTES -->

      <v-col cols="6">
        <v-card
          class="home-card"
          flat
          style="display: flex; flex-direction: column; margin-top: 1.5vh; width: auto; height: 98.15%; margin-bottom: 3vh;"
        >
          <v-card-title style="font-size: 1.5rem; margin-top: 0.5vh; margin-left: 0.5vw">
            Movimientos recientes {{ currentPayments.length }}
          </v-card-title>
          <MovimientosList
            :isHome="true"
            :maxItems="3"
            :movimientos="movimientos"
          />
          <v-sheet style="display: flex; align-items: center; align-self: end; background-color: transparent; color: black; margin-top: 2.6vh;">
            <v-card-text style="font-size: 1.2vw; font-weight: 450;">Ver más</v-card-text>
            <v-btn
              class="grey-button"
              style="align-self: end; margin-right: 1.5vw;"
              @click="navigateTo('/movimientos')"
            >
              <v-icon size="2.3vw">mdi-arrow-right</v-icon>
            </v-btn>
          </v-sheet>

        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- POPUP CVU -->
  <v-bottom-sheet v-model="showBottomSheet" transition="slide-y-reverse-transition">
    <v-card class="home-card" style="display: flex; align-items: center; justify-content: center;">
      <v-card-text style="font-size: 1.2vw; font-weight: 450;">{{ copyMessage }}</v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup>
  import MovimientosList from '@/components/MovimientosList.vue';
  import { ref, onMounted, computed } from 'vue'
  import { useCardStore } from '@/stores/cardStore.js'
  import { useUserStore } from '@/stores/userStore.js'
  import { useAccountStore } from '@/stores/accountStore.js'
  import { usePaymentStore } from '@/stores/paymentStore'
  import { useRouter } from 'vue-router'
  
  const accountStore = useAccountStore()
  const userStore = useUserStore()
  const cardStore = useCardStore()
  const router = useRouter()
  const paymentStore = usePaymentStore()

  const showBottomSheet = ref(false)
  const copyMessage = ref('')
  const overlay = ref(false)
  const currentUser = ref(null)
  const currentAccount = ref(null)
  const currentCards = ref([])
  const currentPayments = ref([])
  const hideBalance = ref(false)
  

  const movimientos = computed(() => {
    const lista = [...paymentStore.payments];
    lista.slice(0,3)
    return lista
  });

  onMounted(async () => {
    try {
      currentUser.value = await userStore.getCurrentUser()
      currentAccount.value = await accountStore.getAccount()
      await cardStore.getAll()
      currentCards.value = cardStore.cards
      await paymentStore.getAll()
      currentPayments.value = paymentStore.payments
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
    await paymentStore.getAll()
    console.log(currentAccount.value)
  })

  const copyToClipboard = (isCVU) => {
    navigator.clipboard.writeText(isCVU ? currentAccount.value.cvu : currentAccount.value.alias)
      .then(() => {
        copyMessage.value = isCVU ? 'CVU copiado!' : 'Alias copiado!'
        showBottomSheet.value = true
        setTimeout(() => {
          showBottomSheet.value = false
        }, 1500)
      })
      .catch(() => {
        copyMessage.value = isCVU ? 'Error al copiar el CVU' : 'Error al copiar el alias'
        showBottomSheet.value = true
      })
  }

  const navigateTo = path => {
    router.push(path)
  }
</script>

<style scoped>

.home-card {
    background-color: #ffe9e5;
    border: 1px solid #cac4d0;
    border-radius: 1.5rem;
    color: black;
}

.grey-button {
    background-color: #ece6f0;
    color: #4d4d4d;
    min-width: 0;
    width: 3.5vw;
    height: 6vh;
    padding: 0;
}


</style>
