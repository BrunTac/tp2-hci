<template>
  <v-container fill-height fluid>
    <LoginHeader />

    <v-row>
      <v-col cols="auto" style="margin-left: 35vw;">
        <h2 style="margin-top: 10vh">Registro</h2>
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
        <v-form ref="form" style="display: flex; flex-direction: column;" validate-on="input" @submit.prevent>

          <v-text-field
            v-model="firstName"
            clearable
            color="#d28d8d"
            label="Nombre"
            :rules="[rules.required]"
            style="margin-top: 1.5vw;"
            validate-on="input"
            variant="outlined"
            width="27vw"
          />

          <v-text-field
            v-model="lastName"
            clearable
            color="#d28d8d"
            label="Apellido"
            :rules="[rules.required]"
            style="margin-top: 1vw;"
            validate-on="input"
            variant="outlined"
            width="27vw"
          />

          <v-text-field
            clearable
            color="#d28d8d"
            label="Fecha de Nacimiento"
            :model-value="birthDate"
            placeholder="DD/MM/YYYY"
            :rules="[rules.required, rules.date]"
            style="margin-top: 1vw; width: 27vw;"
            variant="outlined"
            @update:model-value="formatDate"
          />

          <v-text-field
            v-model="email"
            clearable
            color="#d28d8d"
            label="Email"
            placeholder="example@gmail.com"
            :rules="[rules.required, rules.email]"
            style="margin-top: 1vw;"
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
            :rules="[rules.required, rules.password]"
            style="margin-top: 1vw;"
            type="password"
            validate-on="input"
            variant="outlined"
            width="27vw"
          />          <v-btn
            color="#d28d8d"
            rounded="lg"
            style="align-self: center; margin-top: 2.3vh; margin-bottom: 1vw"
            width="12vw"
            @click="validateForm"
          >
            Continuar
          </v-btn>

          <v-btn
            color="#90979a"
            size="small"
            style="align-self: center;"
            :to="'/'"
            variant="text"
          > Volver al inicio </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { User } from '@/api/user.js';
  import { useUserStore } from '@/stores/userStore.js';
  import { useRouter } from 'vue-router';
  import LoginHeader from '../components/LoginHeader.vue';

  const userStore = useUserStore();
  const router = useRouter();

  const form = ref(null);
  const firstName = ref('');
  const lastName = ref('');
  const birthDate = ref('');
  const email = ref('');
  const password = ref('');
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
    date: value => {
      const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      return pattern.test(value) || 'Formato de fecha inválido (DD/MM/YYYY)';
    },
  }

  function formatDate (value) {
    const digits = value.replace(/\D/g, '').slice(0, 8)

    let formatted = ''
    if (digits.length > 0) formatted = digits.slice(0, 2)
    if (digits.length > 2) formatted += '/' + digits.slice(2, 4)
    if (digits.length > 4) formatted += '/' + digits.slice(4, 8)

    birthDate.value = formatted
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
      userStore.email = email.value
      router.push('/verificar');
    } catch (error) {
      showAlert.value = true;
      alertMessage.value = 'Este correo ya esta en uso.';
    }
  };


</script>

<style scoped>
.register-page {
  background-color: white;
}
</style>
