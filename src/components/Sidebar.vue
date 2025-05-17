<style scoped>
.v-btn--active {
    color: #b55544 !important;
}

.v-btn--active .v-icon {
    color: #b55544 !important;
}
</style>   

<template>
    <v-navigation-drawer
    style="background-color: #fff2ef; border-right: solid black">
        <v-list class="align-start">
            <v-list-item>
                <h1 style="font-size: 2.5vw; color: black; margin-left: 0.5vw">DreamPay</h1>
            </v-list-item>
            <v-list-item style="margin-top: 7vh; margin-bottom: -0.5vh">
                <v-btn
                variant="text"
                color="black"
                class="text-h6 justify-start"
                size="large"
                style="width: 14vw;"
                :class="{ 'v-btn--active': isActive('/home') }"
                @click="navigateTo('/home')">
                    <v-icon :size="iconSize" color="black" class="mr-3">mdi-home</v-icon>
                    <h3 style="font-weight: 100; font-size: 0.95em;">Inicio</h3>
                </v-btn>
            </v-list-item>
            
            <v-list-item class="d-flex justify-center">
                <v-divider style="width: 14.3vw;" color="black" class="border-opacity-25"></v-divider>
            </v-list-item>

            <v-list-item >
                <v-btn 
                variant="text"
                color="black"
                class="text-h6 justify-start"
                size="large"
                style="width: 14vw;"
                :class="{ 'v-btn--active': isActive('/movimientos') }"
                @click="navigateTo('/movimientos')">
                    <v-icon :size="iconSize" color="black" class="mr-3">mdi-book-account</v-icon>
                    <h3 style="font-weight: 100; font-size: 0.95em;">Movimientos</h3>
                </v-btn>
            </v-list-item>

            <v-list-item class="d-flex justify-center">
                <v-divider style="width: 14.3vw;" color="black" class="border-opacity-25"></v-divider>
            </v-list-item>

            <v-list-item>
                <v-btn 
                variant="text"
                color="black"
                class="text-h6 justify-start"
                size="large"
                style="width: 14vw;"
                :class="{ 'v-btn--active': isActive('/tarjetas') }"
                @click="navigateTo('/tarjetas')">
                    <v-icon :size="iconSize" color="black" class="mr-3">mdi-credit-card-outline</v-icon>
                    <h3 style="font-weight: 100; font-size: 0.95em;">Tarjetas</h3>
                </v-btn>
            </v-list-item>

            <v-list-item class="d-flex justify-center">
                <v-divider style="width: 14.3vw;" color="black" class="border-opacity-25"></v-divider>
            </v-list-item>
            
            <v-list-item>
                <v-btn 
                variant="text"
                color="black"
                class="text-h6 justify-start"
                size="large"
                style="width: 14vw;"
                :class="{ 'v-btn--active': isActive('/perfil') }"
                @click="navigateTo('/perfil')">
                    <v-icon :size="iconSize" color="black" class="mr-3">mdi-account</v-icon>
                    <h3 style="font-weight: 100; font-size: 0.95em;">Perfil</h3>
                </v-btn>
            </v-list-item>
            
            <v-list-item class="d-flex justify-center">
                <v-divider style="width: 14.3vw;" color="black" class="border-opacity-25"></v-divider>
            </v-list-item>
            
            <v-list-item>
                <v-btn 
                variant="text"
                color="black"
                class="text-h6 justify-start"
                size="large"
                style="width: 14vw;"
                :class="{ 'v-btn--active': isActive('/servicios') }"
                @click="navigateTo('/servicios')">
                    <v-icon :size="iconSize" color="black" class="mr-3">mdi-list-box-outline</v-icon>
                    <h3 style="font-weight: 100; font-size: 0.95em;">Pagar Servicios</h3>
                </v-btn>
            </v-list-item>

            <v-list-item class="d-flex justify-center">
                <v-divider style="width: 14.3vw;" color="black" class="border-opacity-25"></v-divider>
            </v-list-item>

            <v-list-item>
                <v-btn 
                variant="text"
                color="black"
                class="text-h6 justify-start"
                size="large"
                style="width: 14vw;"
                :class="{ 'v-btn--active': isActive('/inversiones') }"
                @click="navigateTo('/inversiones')">
                    <v-icon :size="iconSize" color="black" class="mr-3">mdi-trending-up</v-icon>
                    <h3 style="font-weight: 100; font-size: 0.95em;">Inversiones</h3>
                </v-btn>
            </v-list-item>

            <v-list-item class="d-flex justify-center">
                <v-divider style="width: 14.3vw;" color="black" class="border-opacity-25"></v-divider>
            </v-list-item>

            <v-list-item>
                <v-btn 
                variant="text"
                color="black"
                class="text-h6 justify-start"
                size="large"
                style="width: 14vw;"
                @click="navigateTo('/')">
                    <v-icon :size="iconSize" color="black" class="mr-3">mdi-logout</v-icon>
                    <h3 style="font-weight: 100; font-size: 0.95em;">Cerrar Sesión</h3>
                </v-btn>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const iconSize = computed(() => {
    const vw = window.innerWidth
    return Math.max(24, Math.min(30, vw * 0.02))
})

const isActive = (path) => {
    return route.path === path
}

const navigateTo = (path) => {
    router.push(path)
}
</script>

 