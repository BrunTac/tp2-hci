<template>
  <v-row justify="center" class="login-header">
    <v-col cols="auto" class="text-center">
      <div style="display: flex; flex-direction: column;">
        <h1 class="login-title">DreamPay</h1>
        <h1 class="login-subtitle">La billetera virtual de tus sueños</h1>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
// No script needed for now
</script>

<style scoped>
.login-title {
  font-size: 2rem;
  line-height: 1.1;
  font-weight: bold;
  color: black;
}

.login-subtitle {
  font-size: 0.75rem;
  margin-top: 0.4rem;
  font-weight: 600;
  color: black;
}

.login-header {
  background-color: #d28d8d;
}

@media (min-width: 600px) {
  .login-title {
    font-size: 2.5rem;
  }
  .login-subtitle {
    font-size: 1rem;
  }
}

@media (min-width: 960px) {
  .login-title {
    font-size: 3.5rem;
  }
  .login-subtitle {
    font-size: 1.25rem;
  }
}

@media (min-width: 1501px) {
  .login-subtitle {
    font-size: 1.5rem;
  }
}
</style>
