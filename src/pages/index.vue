<template>
  <v-container fill-height fluid>
    <LoginHeader />

    <v-row>
      <v-col cols="auto" style="margin-left: 35vw;">
        <h2 style="margin-top: 7vw"> Inicio de sesión </h2>
        <v-alert
          v-if="showAlert"
          closable
          style="margin-top: 1vw"
          type="error"
          variant="tonal"
          @click:close="showAlert = false"
        >
          {{ alertMessage }}
        </v-alert>
        <v-form ref="form" style="display: flex; flex-direction: column; padding: 0" validate-on="input" @submit.prevent>

          <v-text-field
            v-model="email"
            clearable
            color="#d28d8d"
            label="Email"
            placeholder="example@gmail.com"
            :rules="[rules.required]"
            style="margin-top: 1.5vw;"
            type="email"
            validate-on="input"
            variant="outlined"
            width="27vw"
          />

          <v-text-field
            v-model="password"
            clearable
            color="#d28d8d"
            label="Contraseña"
            :rules="[rules.required]"
            style="margin-top: 1vw;"
            type="password"
            validate-on="input"
            variant="outlined"
            width="27vw"
          />

          <v-btn
            color="#d28d8d"
            rounded="lg"
            style="align-self: center; margin-top: 2vh; margin-bottom: 1vw"
            width="12vw"
            @click="validateForm"
          > Iniciar sesión </v-btn>

          <v-btn
            color="#90979a"
            router
            size="small"
            style="align-self: center;"
            :to="'/solicitarReset'"
            variant="text"
          > Recuperar contraseña </v-btn>

        </v-form>

      </v-col>
    </v-row>

    <v-row justify="center" style="">
      <v-col cols="auto" style="display: flex; align-items: center; ">
        <v-card-text style="margin-right: 1.5vw; color: #90979a; font-weight: 500"> No tienes cuenta? </v-card-text>
        <v-btn
          color="#d28d8d"
          size="xs"
          to="/registrar"
          variant="text"
        > Registrate </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useSecurityStore } from '@/stores/securityStore.js';

  const securityStore = useSecurityStore();

  const form = ref(null);
  const password = ref('');
  const email = ref('');
  const route = useRoute()
  const router = useRouter();
  const showAlert = ref(false);
  const alertMessage = ref('');

  const rules = {
    required: value => !!value || 'Este campo es obligatorio',
    email: value => {
      const pattern = /@[\w.]+\.com$/;
      return pattern.test(value) || 'El email no es válido';
    },
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

  const isFormValid = computed(() => {
    return rules.email(email.value) === true &&
      rules.password(password.value) === true;
  });

  const validateForm = async () => {
    const { valid } = await form.value.validate();
    if (!valid) {
      return false;
    }
    const credentials = { email: email.value, password: password.value }
    try {
      await securityStore.login(credentials, true);
      const redirect = route.query.redirect || '/home'
      await router.replace(redirect)
    } catch (error) {
      showAlert.value = true;
      alertMessage.value = 'Los datos ingresados son incorrectos.';
    }
  };

</script>

<style scoped>

.login-page {
  background-color: white;
}

</style>
