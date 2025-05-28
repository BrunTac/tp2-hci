<template>
  <v-navigation-drawer
    style="background-color: #fff2ef; border-right: solid black"
  >
    <v-list class="align-start">
      <v-list-item>
        <h1 style="font-size: 2.4rem; color: black; margin-left: 0.5vw">DreamPay</h1>
      </v-list-item>
      <v-list-item style="margin-top: 7vh; margin-bottom: -0.5vh">
        <v-btn
          class="text-h6 justify-start"
          :class="{ 'v-btn--active': isActive('/home') }"
          color="black"
          size="large"
          style="width: 15vw;"
          variant="text"
          @click="navigateTo('/home')"
        >
          <v-icon class="mr-3" color="black" :size="iconSize">mdi-home</v-icon>
          <h3 style="font-weight: 100; font-size: 0.95em;">Inicio</h3>
        </v-btn>
      </v-list-item>

      <v-list-item class="d-flex justify-center">
        <v-divider class="border-opacity-25" color="black" style="width: 14.3vw;" />
      </v-list-item>

      <v-list-item>
        <v-btn
          class="text-h6 justify-start"
          :class="{ 'v-btn--active': isActive('/movimientos') }"
          color="black"
          size="large"
          style="width: 15vw;"
          variant="text"
          @click="navigateTo('/movimientos')"
        >
          <v-icon class="mr-3" color="black" :size="iconSize">mdi-book-account</v-icon>
          <h3 style="font-weight: 100; font-size: 0.95em;">Movimientos</h3>
        </v-btn>
      </v-list-item>

      <v-list-item class="d-flex justify-center">
        <v-divider class="border-opacity-25" color="black" style="width: 14.3vw;" />
      </v-list-item>

      <v-list-item>
        <v-btn
          class="text-h6 justify-start"
          :class="{ 'v-btn--active': isActive('/tarjetas') }"
          color="black"
          size="large"
          style="width: 15vw;"
          variant="text"
          @click="navigateTo('/tarjetas')"
        >
          <v-icon class="mr-3" color="black" :size="iconSize">mdi-credit-card-outline</v-icon>
          <h3 style="font-weight: 100; font-size: 0.95em;">Tarjetas</h3>
        </v-btn>
      </v-list-item>

      <v-list-item class="d-flex justify-center">
        <v-divider class="border-opacity-25" color="black" style="width: 14.3vw;" />
      </v-list-item>

      <v-list-item>
        <v-btn
          class="text-h6 justify-start"
          :class="{ 'v-btn--active': isActive('/datosPersonales') }"
          color="black"
          size="large"
          style="width: 15vw;"
          variant="text"
          @click="navigateTo('/datosPersonales')"
        >
          <v-icon class="mr-3" color="black" :size="iconSize">mdi-account</v-icon>
          <h3 style="font-weight: 100; font-size: 0.95em;">Datos Personales</h3>
        </v-btn>
      </v-list-item>

      <v-list-item class="d-flex justify-center">
        <v-divider class="border-opacity-25" color="black" style="width: 14.3vw;" />
      </v-list-item>

      <v-list-item>
        <v-btn
          class="text-h6 justify-start"
          :class="{ 'v-btn--active': isActive('/servicios') }"
          color="black"
          size="large"
          style="width: 15vw;"
          variant="text"
          @click="navigateTo('/servicios')"
        >
          <v-icon class="mr-3" color="black" :size="iconSize">mdi-list-box-outline</v-icon>
          <h3 style="font-weight: 100; font-size: 0.95em;">Pagar Servicios</h3>
        </v-btn>
      </v-list-item>

      <v-list-item class="d-flex justify-center">
        <v-divider class="border-opacity-25" color="black" style="width: 14.3vw;" />
      </v-list-item>

      <v-list-item>
        <v-btn
          class="text-h6 justify-start"
          :class="{ 'v-btn--active': isActive('/inversiones') }"
          color="black"
          size="large"
          style="width: 15vw;"
          variant="text"
          @click="navigateTo('/inversiones')"
        >
          <v-icon class="mr-3" color="black" :size="iconSize">mdi-trending-up</v-icon>
          <h3 style="font-weight: 100; font-size: 0.95em;">Inversiones</h3>
        </v-btn>
      </v-list-item>

      <v-list-item class="d-flex justify-center">
        <v-divider class="border-opacity-25" color="black" style="width: 14.3vw;" />
      </v-list-item>

      <v-list-item>
        <v-btn
          class="text-h6 justify-start"
          color="black"
          size="large"
          style="width: 15vw;"
          variant="text"
          @click="dialog = true"
        >
          <v-icon class="mr-3" color="black" :size="iconSize">mdi-logout</v-icon>
          <h3 style="font-weight: 100; font-size: 0.95em;">Cerrar Sesión</h3>
        </v-btn>
        <LogoutConfirmationModal
          :is-visible="dialog"
          @close="dialog = false"
          @confirm="cerrarSesion"
        />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useSecurityStore } from '@/stores/securityStore'
  import LogoutConfirmationModal from './LogoutConfirmationModal.vue'

  export default {
    name: 'Sidebar',
    components: {
      LogoutConfirmationModal,
    },
    setup () {
      const router = useRouter()
      const route = useRoute()
      const securityStore = useSecurityStore()
      const dialog = ref(false)

      const iconSize = computed(() => {
        const vw = window.innerWidth
        return Math.max(24, Math.min(30, vw * 0.02))
      })

      const isActive = path => {
        return route.path === path
      }

      const cerrarSesion = async () => {
        try {
          await securityStore.logout()
          router.push('/')
          dialog.value = false // Close the modal after successful logout
        } catch (error) {
          console.error(error)
          dialog.value = false // Close the modal even if there's an error
        }
      }

      const navigateTo = path => {
        router.push(path)
      }

      return {
        router,
        route,
        securityStore,
        dialog,
        iconSize,
        isActive,
        cerrarSesion,
        navigateTo,
      }
    },
  }
</script>

<style scoped>
.v-btn--active {
  color: #d28d8d !important;
}

.v-btn--active .v-icon {
  color: #d28d8d !important;
}
</style>
