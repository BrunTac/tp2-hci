<template>
  <v-container fill-height fluid>
      <LoginHeader />
      
      <v-row>
        <v-col cols="auto" style="margin-left: 35vw;">          
          <h2 style="margin-top: 7vw"> Recuperar Contraseña </h2>
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
              :rules="[rules.required, rules.email]"
              style="margin-top: 1.2vw;"
            />

            <v-btn
              color="#d28d8d"
              rounded="lg"
              width="12vw"
              @click="validateForm"
              style="align-self: center; margin-top: 2vh; margin-bottom: 1vw"
            > Enviar codigo </v-btn>

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

const rules = {
  required: value => !!value || 'Este campo es obligatorio',
  email: value => {
    const pattern = /@[\w.]+\.com$/;
    return pattern.test(value) || 'El email no es válido';
  }
}

const validateForm = async () => {
  const { valid } = await form.value.validate();
  if (!valid) {
    return false;
  }
  try {
    await userStore.requestPasswordReset(email.value);
    router.push('/cambiarContrasena');
  } catch (error) {
    
  }
};

</script>

<style scoped>
</style>