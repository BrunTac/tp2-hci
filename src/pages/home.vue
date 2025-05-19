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
                        style="margin-right: 1vw; background-color: #dba4a4; width: auto; height: 2.7vw; color: white; font-size: 1vw; padding: 0 0.7vw;">
                            Ver información
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
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>
