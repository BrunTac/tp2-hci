<template>
  <v-card
    class="rounded-0"
    color="#fff2ef"
    elevation="0"
    height="8vh"
    style="display: flex; align-items: center; border-bottom: solid black;"
    width="100vw"
  >
    <div
      style="display: flex; align-items: center; justify-content: space-between; height: 100%; width: 82%;"
    >
      <div style="display: flex; align-items: center; margin-left: 1vw">
        <v-sheet
          v-if="route.path !== '/home'"
          style="display: flex; align-items: center; background-color: transparent; color: black;"
        >
          <v-btn
            class="button"
            style="height: auto"
            @click="navigateTo('/home')"
          >
            <v-icon size="2.3vw" color="white" style="padding: 2.5vh;">mdi-arrow-left</v-icon>
          </v-btn>
        </v-sheet>

        <v-card-title style="font-size: 1.8rem; margin-left: 0.5vw">
          <slot />
        </v-card-title>
      </div>

      <v-btn
        class="text-none"
        rounded="xl"
        style="background: #fff2ef; border: 0.2vh solid #d28d8d; width: auto; height: 2.7vw; color: #d28d8d; font-size: 1vw;"
      >
        <v-icon left size="1.5vw" style="margin-right: 0.3vw">mdi-help-circle-outline</v-icon>
        Ayuda
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const navigateTo = path => {
    router.push(path);
  };
</script>

<style>
.button {
  background-color: #d28d8d !important;
  color: white !important;
  min-width: 0;
  width: 3.5vw;
  height: 6vh;
  padding: 0;
  border-radius: 20px !important;
}
</style>
