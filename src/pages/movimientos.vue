<template>
  <Sidebar />

  <Header>Movimientos</Header>

  <v-list class="bg-transparent">
    <v-list-item
      v-for="(movimiento, index) in movimientosStore.movimientosOrdenados"
      :key="index"
    >
      <v-list-item-content style="display: flex; justify-content: center;">
        <v-card class="move-card" color="#FFE9E5" height="20vh" width="25vw">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem;">
            <v-card-title style="font-size: 2rem; color: black; padding: 0;">
              {{ movimiento.accion === 'ingreso' ? '+' : '-' }} $ {{ movimiento.monto }}
            </v-card-title>
            <img size="32" :src="movimiento.accion === 'ingreso' ? '/src/assets/ingereso.png' : '/src/assets/egreso.png'">
          </div>
          <div style="display: flex; justify-content: left; align-items: center; margin-left: 1rem;">
            <img size="32" src="/src/assets/mastercard.png">
            <v-card-subtitle style="font-size: 1rem; color: black;">{{ movimiento.from }}</v-card-subtitle>
            <v-card-subtitle style="font-size: 1rem; color: black;" />
          </div>
          <div style="display: flex; justify-content: right; margin-bottom: 0rem;">
            <v-card-subtitle style="font-size: 1rem; color: black; justify-content: right; font-weight: bold;">{{ formatearFecha(movimiento.fecha) }}</v-card-subtitle>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0rem; width: 100%;">
            <v-card-subtitle style="font-size: 1rem; color: black; font-weight: bold;">{{ movimiento.descripcion }}</v-card-subtitle>
            <v-card-subtitle style="font-size: 1rem; color: black; font-weight: bold;">{{ movimiento.hora }}</v-card-subtitle>
          </div>
        </v-card>
      </v-list-item-content>
    </v-list-item>
  </v-list>

</template>


<script setup lang="ts">
  import Sidebar from '@/components/Sidebar.vue';
  import { useMovimientosStore } from '@/stores/movimientos'
  const movimientosStore = useMovimientosStore()

  function formatearFecha(fechaISO: string): string {
    const [año, mes, día] = fechaISO.split('-')
    return `${día}/${mes}/${año}`
  }

</script>



<style scoped>

.move-card {
    background-color: #ffe9e5;
    border: 1px solid #cac4d0;
    border-radius: 0.4rem;
    color: black;
}

</style>
