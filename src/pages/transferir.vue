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
              clearable
              color="#d28d8d"
              label="CBU, CVU o alias"
              style="margin-top: 0.5vh;"
              type="cbu"
              variant="outlined"
            />

            <h2 style="margin-top: 3vh">un monto de ...</h2>
            <v-text-field
              clearable
              color="#d28d8d"
              label="Monto"
              :model-value="formattedValue"
              style="margin-top: 0.5vh;"
              variant="outlined"
              @click:clear="clearInput"
              @keydown.prevent="handleKeydown"
            />
          </v-col>
          <v-card
            class="transfer-card"
            flat
            style="display: flex; flex-direction: column; margin-top: 4vh; width: auto; height: auto;"
          >
            <v-col>
              <v-card
                class="transfer-card"
                style="align-self: center; height: 24vh; width: 25.4vw; margin: 1.5vh;"
              />
              <v-row class="align-center" style="margin: 1.5vh;">
                <v-text-field
                  clearable
                  color="#d28d8d"
                  label="Motivo"
                  style="margin-right: 0.5vw; height: 5vh;"
                  variant="outlined"
                  width="18vw"
                />
                <v-col class="d-flex justify-center align-center">
                  <v-btn
                    class="text-none"
                    rounded="pill"
                    style="background-color: #d28d8d; width: 10vw; height: 5vh; color: white; font-size: 2vh; margin-bottom: 0"
                  >
                    Transferir
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
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
      return // Ignorar otras teclas
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
</style>
