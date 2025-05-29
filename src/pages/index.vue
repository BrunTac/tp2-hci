<template>
  <v-container fill-height fluid>
    <LoginHeader />

    <v-row>
      <v-col cols="auto" style="margin-left: 35vw;">
        <h2 style="margin-top: 7vw"> Inicio de sesión </h2>
        <div style="width: 27vw; margin-bottom: 1vw;">
          <v-alert
            v-if="showAlert"
            closable
            type="error"
            variant="tonal"
            width="27vw"
            @click:close="showAlert = false"
          >
            Los datos ingresados son incorrectos. Por favor, intente nuevamente.
          </v-alert>

          <v-alert
            v-if="userStore.justVerified"
            closable
            type="success"
            variant="tonal"
            width="27vw"
            @click:close="userStore.justVerified = false"
          >
          El usuario se verificó correctamente. Bienvenido!
          </v-alert>

          <v-alert
            v-if="userStore.justReset"
            closable
            type="success"
            variant="tonal"
            width="27vw"
            @click:close="userStore.justReset = false"
          >
            La contraseña se cambio correctamente.
          </v-alert>

        </div>
        <v-form ref="form" style="display: flex; flex-direction: column; padding: 0" validate-on="input" @submit.prevent>

          <v-text-field
            v-model="email"
            clearable
            color="#d28d8d"
            label="Email"
            placeholder="example@gmail.com"
            :rules="[rules.required]"
            style="margin-top: 0.5vh;"
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
            class="text-none"
            rounded="xl"
            style="align-self: center; background-color: #d28d8d; width: auto; height: 2.7vw; color: white; font-size: 1vw; padding: 0 0.7vw; margin-bottom: 1em"
            @click="validateForm"
            :loading="loading"
          >
            Iniciar sesión </v-btn>

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
  import { useUserStore } from "@/stores/userStore.js";

  const userStore = useUserStore();
  const securityStore = useSecurityStore();

  const form = ref(null);
  const password = ref('');
  const email = ref('');
  const route = useRoute()
  const router = useRouter();
  const showAlert = ref(false);
  const alertMessage = ref('');
  const loading = ref(false);

  const rules = {
    required: value => !!value || 'Este campo es obligatorio'
  }

  async function load() {
    loading.value = true
    try {
      const credentials = { email: email.value, password: password.value }
      await securityStore.login(credentials, true);
      await new Promise(resolve => setTimeout(resolve, 1500))
      loading.value = false
      userStore.justReset = false
      userStore.justVerified = false
      const redirect = route.query.redirect || '/home'
      await router.replace(redirect)
    } catch (error) {
      loading.value = false;
      showAlert.value = true;
    }
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
    load();
  };

</script>

<style scoped>

.login-page {
  background-color: white;
}

</style>
