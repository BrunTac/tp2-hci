<template>
  <Header>Link de pago</Header>

  <Sidebar />

  <v-container fill-height fluid>
    <v-row>
      <v-col cols="auto" style="margin-left: 27vw;">
        <v-form @submit.prevent style="display: flex; flex-direction: column;">
          <v-col>
            <h2 style="margin-top: 25vh">Generar un link de pago de ...</h2>
            <v-text-field
              label="Monto"
              clearable
              type="monto"
              variant="outlined"
              color="#d28d8d"
              style="margin-top: 0.5vh"
            />
            <v-btn
              rounded="pill"
              class="text-none"
              style="background-color: #d28d8d; height: 5vh; color: white; font-size: 2vh; margin-left: 8vw; margin-right: 8vw; margin-top: 2vh">
              Generar link de pago
            </v-btn>
          </v-col>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
</script>

<style scoped>
</style>
