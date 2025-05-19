<template>
    <Header>Transferir</Header>

    <Sidebar />

  <v-container fill-height fluid>
    <v-row>
      <v-col cols="auto" style="margin-left: 27vw;">
        <v-form @submit.prevent style="display: flex; flex-direction: column;">
          <v-col>
            <h2 style="margin-top: 8vh">Transferir a ...</h2>
            <v-text-field
              label="CBU, CVU o alias"
              clearable
              type="cbu"
              variant="outlined"
              color="#d28d8d"
              style="margin-top: 0.5vh;"
            />

            <h2 style="margin-top: 3vh">un monto de ...</h2>
            <v-text-field
              label="Monto"
              clearable
              type="monto"
              variant="outlined"
              color="#d28d8d"
              style="margin-top: 0.5vh;"
            />
          </v-col>
          <v-card
            class="transfer-card"
            flat
            style="display: flex; flex-direction: column; margin-top: 8vh; width: auto; height: auto">
            <v-col>
              <v-card
                class="transfer-card"
                style="align-self: center; height: 24vh; width: 25.4vw; margin: 1.5vh;">
              </v-card>
              <v-row class="align-center" style="margin: 1.5vh;">
                <v-text-field
                  label="Motivo"
                  clearable
                  variant="outlined"
                  color="#d28d8d"
                  width="18vw"
                  style="margin-right: 0.5vw; height: 5vh;"/>
                <v-col class="d-flex justify-center align-center">
                  <v-btn
                    rounded="pill"
                    class="text-none"
                    style="background-color: #d28d8d; width: 10vw; height: 5vh; color: white; font-size: 2vh; margin-bottom: 0vh">
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

<script>
export default {
  name: 'Transfer',
  data() {
    return {
      transferData: {
        to: '',
        amount: '',
        reason: '',
      },
    };
  },
  methods: {
    submitTransfer() {
      // Por ahora solo mostramos los datos por consola
      console.log('Transfiriendo:', this.transferData);
    },
  },
};
</script>

<style scoped>

.transfer-card {
 background-color: #ffe9e5;
 border: 1px solid #000000;
 border-radius: 1rem;
 color: black;
}
</style>
