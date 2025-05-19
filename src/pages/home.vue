<template>
    <Header>Inicio</Header>

    <Sidebar/>

    <v-container style="max-width: 81vw; margin-top: 1vh;">

        <!-- CARD BIENVENIDA -->
        <v-row>
            <v-col cols="12">
                <v-card
                class="home-card"
                flat
                style="display: flex; align-items: center;">
                    <v-card-text style="font-size: 1.5rem; font-weight: 500;">
                        Hola, Usuario
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                        rounded="xl"
                        class="text-none"
                        style="margin-right: 1vw; background-color: #d28d8d; width: auto; height: 2.7vw; color: white; font-size: 1vw; padding: 0 0.7vw;">
                            Ver información
                            <v-overlay
                            activator="parent"
                            v-model="overlay"
                            style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                                <v-card
                                    class="home-card"
                                    style="width: 34vw;
                                        display: flex;
                                        flex-direction: column;
                                        background-color: #fbc8c0;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <v-card-title style="margin-top: 2vh; margin-left: 0.8vw;">Información</v-card-title>
                                        <v-btn
                                            icon
                                            variant="text"
                                            style="margin-top: 2vh; margin-right: 0.8vw;"
                                            @click="overlay = false"
                                        >
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </div>
                                    <v-text-field
                                    label="CVU"
                                    v-model="cvu"
                                    readonly
                                    variant="outlined"
                                    style="margin: 4vh 2vw;"
                                    >
                                    <template v-slot:append-inner>
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
                style="display: flex; flex-direction: column; margin-top: 1.5vh; width: auto; height: auto;">
                    <v-card-subtitle style="margin-top: 1.8vh; color: black; padding-left: 1.5vw; font-size: 1.2rem; font-weight: 450;">
                        Saldo en cuenta
                    </v-card-subtitle>
                    <v-sheet style="padding-left: 0.2vw; display:flex; align-items: center; background-color: transparent;">
                        <v-card-title
                        style="font-size: 3.5rem; color: black;">
                        $100,000
                        </v-card-title>
                        <v-btn
                        class="rounded-circle grey-button"
                        size="small"
                        style="width: 2vw; min-width: auto; height: 2vw">
                            <v-icon
                            size="1.2vw">mdi-eye</v-icon>
                        </v-btn>
                    </v-sheet>
                    <v-container
                    style="display: flex; align-items: center; background-color: transparent; padding-top: 0.5vh;">
                        <v-row style="margin-bottom: 0.2vh;">
                            <v-col cols="4">
                                <v-sheet style="display: flex; flex-direction:column; align-items: center; background-color: transparent; color: black;">
                                    <v-btn
                                    rounded="lg"
                                    class="grey-button"
                                    @click="navigateTo('/ingresar')">>
                                    <v-icon size="2.8vw">mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-card-text style="font-size: 1.2vw; font-weight: 450; padding-top: 1.5vh; padding-bottom: 0vh;">Ingresar</v-card-text>
                                </v-sheet>
                            </v-col>
                            <v-col cols="4">
                                <v-sheet style="display: flex; flex-direction:column; align-items: center; background-color: transparent; color: black;">
                                    <v-btn
                                    rounded="lg"
                                    class="grey-button"
                                    @click="navigateTo('/transferir')">
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
                                    rounded="lg"
                                    class="grey-button"
                                    @click="navigateTo('/linkDePago')">
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
                style="display: flex; flex-direction: column; margin-top: 3vh; width: auto; height: auto">
                    <v-sheet style="display: flex; align-items: center; background-color: transparent; color: black; margin-bottom: 2vh;">
                        <v-card-title style="font-size: 1.5rem; margin-top: 0.5vh; margin-left: 0.5vw">Tarjetas</v-card-title>
                        <v-spacer/>
                        <v-btn
                        class="grey-button"
                        rounded="lg"
                        elevation="2"
                        style="margin-top: 1vh; margin-right: 1.5vw; width: 3vw; height: 5vh;">
                        <v-icon size="2.3vw">mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-sheet>
                    <v-card
                    class="home-card"
                    style="align-self: center; height: 16vw; width: 25.4vw; margin-bottom: 3vh;"> Tarjeta </v-card>
                </v-card>

            </v-col>

            <!-- CARD MOV RECIENTES -->

            <v-col cols="6">
                <v-card
                class="home-card"
                flat
                style="display: flex; flex-direction: column; margin-top: 1.5vh; width: auto; height: 98.15%; margin-bottom: 3vh;">
                    <v-card-title style="font-size: 1.5rem; margin-top: 0.5vh; margin-left: 0.5vw">Movimientos recientes</v-card-title>
                    <v-card
                    class="home-card"
                    style="align-self: center; height: 20%; width: 70%; margin-top: 4vh;"> Movimiento 1 </v-card>
                    <v-card
                    class="home-card"
                    style="align-self: center; height: 20%; width: 70%; margin-top: 4vh;"> Movimiento 2 </v-card>
                    <v-card
                    class="home-card"
                    style="align-self: center; height: 20%; width: 70%; margin-top: 4vh;"> Movimiento 3 </v-card>
                    <v-sheet style="display: flex; align-items: center; align-self: end; background-color: transparent; color: black; margin-top: 2.6vh;">
                        <v-card-text style="font-size: 1.2vw; font-weight: 450;">Ver más</v-card-text>
                        <v-btn
                        class="grey-button"
                        style="align-self: end; margin-right: 1.5vw;">
                            <v-icon size="2.3vw">mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-sheet>

                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <!-- Bottom sheet notification -->
    <v-bottom-sheet v-model="showBottomSheet" transition="slide-y-reverse-transition">
      <v-card class="home-card" style="display: flex; align-items: center; justify-content: center;">
        <v-card-text style="font-size: 1.2vw; font-weight: 450;">{{ copyMessage }}</v-card-text>
      </v-card>
    </v-bottom-sheet>
</template>

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

<script setup>
import { ref } from 'vue'

const cvu = ref('12345678901234567890')
const showBottomSheet = ref(false)
const copyMessage = ref('')
const overlay = ref(false)

const copyToClipboard = () => {
  navigator.clipboard.writeText(cvu.value)
    .then(() => {
      copyMessage.value = 'CVU copiado!'
      showBottomSheet.value = true
      setTimeout(() => {
        showBottomSheet.value = false
      }, 3000)
    })
    .catch(() => {
      copyMessage.value = 'Error al copiar el CVU'
      showBottomSheet.value = true
    })
}

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>
