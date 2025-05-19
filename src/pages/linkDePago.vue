<template>
  <Header>Link de pago</Header>

  <Sidebar />

  <v-container fill-height fluid>
    <v-row>
      <v-col cols="auto" style="margin-left: 27vw;">
        <v-form @submit.prevent style="display: flex; flex-direction: column;">
          <v-col>
            <h2 style="margin-top: 30vh">Generar un link de pago de ...</h2>
            <v-text-field
              label="Monto"
              clearable
              type="monto"
              variant="outlined"
              color="#d28d8d"
              style="margin-top: 0.5vh"
            />
            <v-card-actions>
              <v-btn
                rounded="pill"
                class="text-none"
                style="background-color: #d28d8d; height: 5vh; width:16vw; color: white; font-size: 2vh; margin-left: 8vw; margin-right: 8vw; margin-top: 2vh">
                Generar link de pago
                <v-overlay
                  activator="parent"
                  v-model="overlay"
                  style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                  <v-card
                    class="home-card"
                    style="width: 34vw;
                                        display: flex;
                                        flex-direction: column;
                                        background-color: #fbc8c0;
                                        margin-left: 18vw;
                                        color: black;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <v-card-title style="margin-top: 2vh; margin-left: 0.8vw;">Link de pago</v-card-title>
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
                      label="Link de pago"
                      v-model="link"
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
          </v-col>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <v-bottom-sheet v-model="showBottomSheet" transition="slide-y-reverse-transition">
    <v-card class="link-card" style="display: flex; align-items: center; justify-content: center;">
      <v-card-text style="font-size: 1.2vw; font-weight: 450;">{{ copyMessage }}</v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup>
import { ref } from 'vue'

const link = ref('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
const showBottomSheet = ref(false)
const copyMessage = ref('')
const overlay = ref(false)

const copyToClipboard = () => {
  navigator.clipboard.writeText(link.value)
    .then(() => {
      copyMessage.value = 'Link de pago copiado!'
      showBottomSheet.value = true
      setTimeout(() => {
        showBottomSheet.value = false
      }, 3000)
    })
    .catch(() => {
      copyMessage.value = 'Error al copiar el link de pago'
      showBottomSheet.value = true
    })
}
</script>

<style scoped>
.link-card {
  background-color: #ffe9e5;
  border: 1px solid #cac4d0;
  border-radius: 1.5rem;
  color: black;
}
</style>
