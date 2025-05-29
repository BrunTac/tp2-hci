<template>
  <v-dialog
    max-width="450"
    :model-value="isVisible"
    persistent
    @update:model-value="handleDialogUpdate"
  >
    <v-card
      elevation="24"
      style="background-color: #ffe9e5; border-radius: 16px;"
    >
      <!-- Header -->
      <v-card-title class="d-flex justify-space-between align-center pa-6" style="border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
        <span style="color: black; font-size: 20px; font-weight: 600;">Confirmar cierre de sesión</span>
        <v-btn
          icon
          size="small"
          style="color: black;"
          variant="text"
          @click="closeModal"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Content -->
      <v-card-text class="pa-6">
        <div class="d-flex align-center mb-6">
          <!-- Icon container -->
          <div
            class="d-flex align-center justify-center mr-4"
            style="width: 48px; height: 48px; border-radius: 50%; background-color: rgba(181, 85, 68, 0.1);"
          >
            <v-icon size="24" style="color: #d28d8d;">mdi-logout</v-icon>
          </div>

          <!-- Text content -->
          <div>
            <h3 style="color: black; font-weight: 500; margin: 0 0 4px 0;">¿Estás seguro?</h3>
            <p style="color: rgba(0, 0, 0, 0.7); font-size: 14px; margin: 0;">
              Se cerrará tu sesión actual y tendrás que volver a iniciar sesión.
            </p>
          </div>
        </div>
        <!-- Action buttons -->
        <div class="d-flex justify-space-around ga-3">
          <v-btn
            class="text-none"
            rounded="xl"
            style="width: auto; height: 2.7vw;
               font-size: 1vw;
              padding: 0 0.7vw;
              border: 2px solid #d28d8d !important;
              color: black !important;
              background: transparent !important;
              border-radius: 8px;"
            @click="closeModal"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="text-none"
            rounded="xl"
            style="background-color: #d28d8d; width: auto; height: 2.7vw; color: white; font-size: 1vw; padding: 0 0.7vw; border-radius: 8px;"
            @click="confirmLogout"
          >
            Cerrar Sesión
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'LogoutConfirmationModal',
    props: {
      isVisible: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['close', 'confirm'],
    methods: {
      closeModal () {
        this.$emit('close')
      },
      confirmLogout () {
        this.$emit('confirm')
      },
      handleDialogUpdate (value) {
        if (!value) {
          this.closeModal()
        }
      },
    },
  }
</script>

<style scoped>
/* Override Vuetify button hover effects to match your design */
.v-btn:hover {
  opacity: 0.9 !important;
}

/* Ensure the dialog backdrop matches your design */
:deep(.v-overlay__scrim) {
  background-color: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(2px) !important;
}
</style>
