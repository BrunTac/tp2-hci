<template>
  <v-container fill-height fluid>
    <LoginHeader />
    
    <v-row>
      <v-col cols="auto" style="margin-left: 35vw;">
        <h2 style="margin-top: 10vh">Registro</h2>
        <v-form ref="form" validate-on="input" @submit.prevent style="display: flex; flex-direction: column;">
          
          <v-text-field
            v-model="firstName"
            validate-on="input"
            label="Nombre"
            clearable
            variant="outlined"
            color="#d28d8d"
            width="27vw"
            :rules="[rules.required]"
            style="margin-top: 1.5vw;"
          />

          <v-text-field
            v-model="lastName"
            validate-on="input"
            label="Apellido"
            clearable
            variant="outlined"
            color="#d28d8d"
            width="27vw"
            :rules="[rules.required]"
            style="margin-top: 1vw;"
          />

          <v-text-field
            v-model="birthDate"
            validate-on="input"
            label="Fecha de Nacimiento"
            clearable
            placeholder="DD/MM/YYYY"
            variant="outlined"
            color="#d28d8d"
            width="27vw"
            :rules="[rules.required, rules.date]"
            style="margin-top: 1vw;"
          />

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
            :rules="[rules.required, rules.email]"
            style="margin-top: 1vw;"
          />

          <v-text-field
            v-model="password"
            validate-on="input"
            label="Contraseña"
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
            :to="isFormValid ? '/verificar' : undefined"
            @click="validateForm"
            style="align-self: center; margin-top: 2.3vh; margin-bottom: 1vw"
          >
            Continuar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { User } from '@/api/user.js';
import { useUserStore } from '@/stores/userStore.js';
import LoginHeader from '../components/LoginHeader.vue';

const userStore = useUserStore();

const form = ref(null);
const firstName = ref('');
const lastName = ref('');
const birthDate = ref('');
const email = ref('');
const password = ref('');

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
  date: value => {
    const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return pattern.test(value) || 'Formato de fecha inválido (DD/MM/YYYY)';
  }
}

const isFormValid = computed(() => {
  return rules.email(email.value) === true &&
         rules.password(password.value) === true &&
         rules.date(birthDate.value) === true &&
         firstName.value.length > 0 &&
         lastName.value.length > 0;
});

const validateForm = async () => {
  const { valid } = await form.value.validate();
  if (!valid) {
    return false;
  }
  
  const [day, month, year] = birthDate.value.split('/');
  const formattedDate = `${year}-${month}-${day}`;
  
  const user = new User(firstName.value, lastName.value, formattedDate, email.value, password.value);
  try {
    await userStore.register(user);
  } catch (error) {
  }
};



</script>

<style scoped>
.register-page {
  background-color: white;
}
</style>