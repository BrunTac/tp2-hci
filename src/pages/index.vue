<template>
  <v-container fill-height fluid>
      <LoginHeader />
      
      <v-row>
        <v-col cols="auto" style="margin-left: 35vw;">
          <h2 style="margin-top: 7vw"> Log In </h2>
          <v-form ref="form" validate-on="input" @submit.prevent style="display: flex; flex-direction: column;">

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
            style="margin-top: 1.5vw;"
            />

            <v-text-field
            v-model="password"
            validate-on="input"
            label="Password"
            clearable
            type="password"
            variant="outlined"
            color="#d28d8d"
            width="27vw"
            :rules="[rules.required]"
            style="margin-top: 1vw;"
            />

            <v-btn
              color="#d28d8d"
              rounded="lg"
              width="12vw"
              @click="validateForm"
              style="align-self: center; margin-top: 2vh; margin-bottom: 1vw"
            > Iniciar sesión </v-btn>

            <v-btn
              color="#90979a"
              variant="text"
              size="small"
              style="align-self: center;"
              router
              :to="'/solicitarReset'"
            > Recuperar contraseña </v-btn>

          </v-form>
          
        </v-col>
      </v-row>

      <v-row align="end" justify="center" style="height: 32vh;">
        <v-col cols="auto" style="display: flex; align-items: center; ;">
          <h3 style="margin-right: 1.5vw; color: #90979a;"> No tienes cuenta? </h3>
          <v-btn
            variant="text"
            color="#d28d8d"
            size="xs"
            to="/registrar"
          > Registrate </v-btn>
        </v-col>
      </v-row>
      
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSecurityStore } from '@/stores/securityStore.js';

const securityStore = useSecurityStore();

const form = ref(null);
const password = ref('');
const email = ref('');
const router = useRouter();

const rules = {
  required: value => !!value || 'Este campo es obligatorio'
}

const isFormValid = computed(() => {
  return rules.required(email.value) === true &&
         rules.required(password.value) === true;
});

const validateForm = async () => {
  const { valid } = await form.value.validate();
  if (!valid) {
    return false;
  }
  
  try {
    const credentials = { email: email.value, password: password.value }
    await securityStore.login(credentials, true);
    await router.push('/home');
  } catch (error) {
    console.log(error);
  }
};

</script>

<style scoped>

.login-page {
  background-color: white;
}

</style>