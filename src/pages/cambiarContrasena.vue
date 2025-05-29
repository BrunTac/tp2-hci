<template>
  <v-container fill-height fluid>
    <LoginHeader />

    <v-row>
      <v-col cols="auto" style="margin-left: 35vw;">
        <h2 style="margin-top: 7vw"> Cambiar Contraseña </h2>
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
        <v-form ref="form" style="display: flex; flex-direction: column;" validate-on="input" @submit.prevent>

          <v-text-field
            v-model="code"
            clearable
            color="#d28d8d"
            label="Código"
            :rules="[rules.required]"
            style="margin-top: 1.5vw;"
            type="text"
            validate-on="input"
            variant="outlined"
            width="27vw"
          />

          <v-text-field
            v-model="password"
            clearable
            color="#d28d8d"
            label="Nueva Contraseña"
            :rules="[rules.required, rules.password]"
            style="margin-top: 1vw;"
            type="password"
            validate-on="input"
            variant="outlined"
            width="27vw"
          />

          <v-btn
            class="text-none"
            :loading="loading"
            rounded="xl"
            style="background-color: #d28d8d; width: 50%; height: 2.7vw; color: white; font-size: 1vw; padding: 0 0.7vw; align-self: center; margin-bottom: 1em"
            @click="validateForm"
          > Cambiar Contraseña </v-btn>

          <v-btn
            color="#90979a"
            size="small"
            style="align-self: center;"
            :to="'/'"
            variant="text"
          > Volver al inicio</v-btn>

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
  const code = ref('');
  const password = ref('');
  const showAlert = ref(false);
  const alertMessage = ref('');
  const loading = ref(false);

  const rules = {
    required: value => !!value || 'Este campo es obligatorio',
    password: value => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasMinLength = value?.length >= 8;

      if(!hasUpperCase) return 'La contraseña debe tener al menos una mayúscula';
      if(!hasNumber) return 'La contraseña debe tener al menos un número';
      if(!hasMinLength) return 'La contraseña debe tener al menos 8 caracteres';

      return true;
    },
  }

  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function load () {
    loading.value = true
    try {
      await userStore.changePassword(code.value, password.value)
      await new Promise(resolve => setTimeout(resolve, 1500))
      userStore.justReset = true
      loading.value = false
      router.push('/')
    } catch (error) {
      loading.value = false;
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
  };

</script>

<style scoped>
</style>
