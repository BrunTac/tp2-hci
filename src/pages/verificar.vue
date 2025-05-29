<template>
  <v-container fill-height fluid>
    <LoginHeader />

    <v-row>
      <v-col cols="auto" style="margin-left: 35vw;">
        <h2 style="margin-top: 7vw">Verificación</h2>
        <p style="color: #90979a; margin-top: 1vw">Ingresa el código que te enviamos por email</p>

        <v-form ref="form" style="display: flex; flex-direction: column;" validate-on="input" @submit.prevent>
          <v-alert
            v-if="showAlert"
            closable
            style="margin-top: 1vw"
            type="error"
            variant="tonal"
            width="27vw"
            @click:close="showAlert = false"
          >
            {{ alertMessage }}
          </v-alert>

          <v-text-field
            v-model="verificationCode"
            clearable
            color="#d28d8d"
            label="Código de verificación"
            :rules="[rules.required]"
            style="margin-top: 1.5vw;"
            validate-on="input"
            variant="outlined"
            width="27vw"
          />

          <v-btn
            class="text-none"
            :loading="buttonLoading"
            rounded="xl"
            style="background-color: #d28d8d; width: 30%; height: 2.7vw; color: white; font-size: 1vw; padding: 0 0.7vw; align-self: center"
            @click="validateForm"
          >
            Verificar
          </v-btn>

          <v-btn
            color="#90979a"
            size="small"
            style="align-self: center;"
            variant="text"
            @click="resend"
          >
            Reenviar código
          </v-btn>
        </v-form>
      </v-col>
    </v-row>

    <v-bottom-sheet v-model="isLoading" persistent transition="slide-y-reverse-transition">
      <v-card class="loading-card loading-container" style="display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
        <div
          class="loading-bar"
          :style="{ width: loadingProgress + '%' }"
        />
        <v-card-text style="font-size: 1.2vw; font-weight: 450; z-index: 2; position: relative;">
          {{ loadingText }}
        </v-card-text>
      </v-card>
    </v-bottom-sheet>

  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { UserApi } from '@/api/user.js';
  import { useUserStore } from '@/stores/userStore.js';
  import LoginHeader from '../components/LoginHeader.vue';

  const userStore = useUserStore();
  const router = useRouter();

  const form = ref(null);
  const verificationCode = ref('');
  const isLoading = ref(false);
  const loadingProgress = ref(0)
  const loadingText = ref('Reenviando código...')
  const showAlert = ref(false);
  const alertMessage = ref('');
  const buttonLoading = ref(false);

  const resend = () => {
    userStore.resend();
    isLoading.value = true;
    loadingProgress.value = 0;
    const progressInterval = setInterval(() => {
      loadingProgress.value += 2;
      if (loadingProgress.value >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          isLoading.value = false;
        }, 500);
      }
    }, 50);
  };

  const rules = {
    required: value => !!value || 'Este campo es obligatorio',
  }

  const isFormValid = computed(() => {
    return rules.required(verificationCode.value) === true;
  });

  async function load () {
    buttonLoading.value = true
    try {
      await userStore.verify(verificationCode.value);
      await new Promise(resolve => setTimeout(resolve, 1500))
      buttonLoading.value = false
      userStore.justVerified = true;
      await router.push('/');
    } catch(error) {
      buttonLoading.value = false
      showAlert.value = true;
      alertMessage.value = 'El codigo ingresado es incorrecto.';
    }
  }

  const validateForm = async () => {
    const { valid } = await form.value.validate();
    if (!valid) {
      return false;
    }
    load();
  }


</script>

<style scoped>
.verify-page {
  background-color: white;
}

.loading-container {
  position: relative;
  height: 80px;
}

.loading-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #d28d8d;
  transition: width 0.1s ease-out;
  border-radius: 1rem;
}

.loading-card {
  background-color: #ffe9e5;
  border: 1px solid #000000;
  border-radius: 1rem;
  color: black;
}
</style>
