<script setup>

  import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
  <Sidebar />
  <v-card class="w-25 flex justify-center">
    <div class="flex flex-row">
      <v-btn class="mx-4" size="x-large">
        <v-icon>mdi-camera-outline</v-icon>
      </v-btn>
      <v-btn class="mx-4" size="x-large">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>

</style>
