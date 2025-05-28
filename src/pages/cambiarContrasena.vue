<template>
  <v-container fill-height fluid>
      <LoginHeader />
      
      <v-row>
        <v-col cols="auto" style="margin-left: 35vw;">
          <h2 style="margin-top: 7vw"> Cambiar Contraseña </h2>
          <v-alert
            v-if="showAlert"
            type="error"
            variant="tonal"
            closable
            @click:close="showAlert = false"
            style="margin-top: 1vw"
          >
            {{ alertMessage }}
          </v-alert>
          <v-form ref="form" validate-on="input" @submit.prevent style="display: flex; flex-direction: column;">

            <v-text-field
              v-model="code"
              validate-on="input"
              label="Código"
              clearable
              type="text"
              variant="outlined"
              color="#d28d8d"
              width="27vw"
              :rules="[rules.required]"
              style="margin-top: 1.5vw;"
            />

            <v-text-field
              v-model="password"
              validate-on="input"
              label="Nueva Contraseña"
              clearable
              type="password"
              variant="outlined"
              color="#d28d8d"
              width="27vw"
              :rules="[rules.required, rules.password]"
              style="margin-top: 1vw;"
            />

            <v-btn
              color="#d28d8d"
              rounded="lg"
              width="12vw"
              @click="validateForm"
              style="align-self: center; margin-top: 2vh; margin-bottom: 1vw"
            > Cambiar Contraseña </v-btn>

            <v-btn
              color="#90979a"
              variant="text"
              size="small"
              style="align-self: center;"
              :to="'/'"
            > Volver al inicio de sesión </v-btn>

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
  }
}

const validateForm = async () => {
  const { valid } = await form.value.validate();
  if (!valid) {
    return false;
  }  try {
    await userStore.changePassword(code.value, password.value);
    router.push('/');
  } catch (error) {
    showAlert.value = true;
    alertMessage.value = 'El codigo ingresado es incorrecto.';
  }
};

</script>

<style scoped>
</style>