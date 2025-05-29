<template>
  <v-container fill-height fluid>
      <LoginHeader />

      <v-row style="display:flex;">
        <v-col cols="auto" style="margin-left: 35vw;">
          <h2 style="margin-top: 7vw"> Recuperar Contraseña </h2>

          <v-form ref="form" validate-on="input" @submit.prevent style="display: flex; flex-direction: column; align-items: center;">
            <v-alert
              v-if="showAlert"
              type="error"
              variant="tonal"
              closable
              @click:close="showAlert = false"
              style="margin-top: 1vw;"
              width="27vw"
            >
              {{ alertMessage }}
            </v-alert>

            <v-text-field
              v-model="email"
              validate-on="input"
              label="Email"
              clearable
              type="email"
              placeholder="example@gmail.com"
              variant="outlined"
              color="#d28d8d"
              width="27vw"
              :rules="[rules.required]"
              style="margin-top: 1.2vw;"
            />

            <v-btn
              color="#d28d8d"
              rounded="lg"
              width="12vw"
              @click="validateForm"
              style="align-self: center; margin-top: 2vh; margin-bottom: 1vw"
              :loading="loading"
            > Enviar codigo</v-btn>

            <v-btn
              color="#90979a"
              variant="text"
              size="small"
              style="align-self: center;"
              :to="'/'"
            > Volver al inicio </v-btn>

          </v-form>

        </v-col>
      </v-row>

  </v-container>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/userStore';

  const router = useRouter();
  const userStore = useUserStore();

  const form = ref(null);
  const email = ref('');
  const showAlert = ref(false);
  const alertMessage = ref('');
  const loading = ref(false);

  const rules = {
    required: value => !!value || 'Este campo es obligatorio'
  }

  async function load() {
    loading.value = true
    try {
      await userStore.requestPasswordReset(email.value);
      await new Promise(resolve => setTimeout(resolve, 1500))
      loading.value = false
      router.push('/cambiarContrasena');
    } catch(error) {
      loading.value = false
      showAlert.value = true;
      alertMessage.value = 'El mail ingresado no esta asociado a ninguna cuenta.';
    }
  }

  const validateForm = async () => {
    const { valid } = await form.value.validate();
    if (!valid) {
      return false;
    }
    await load();
  };

</script>

<style scoped>
</style>
