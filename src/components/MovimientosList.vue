<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <template v-for="(movimiento, index) in movimientos" :key="index">
      <div style="display: flex; flex-direction: column; padding: 0.7vh 0.2vw; width: 30vw; height: 18vh ; align-items: center;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.2rem 0; width: 100%;">
          <v-card-title style="font-size: 2rem; color: black; padding: 0;">
            {{ movimiento.accion === 'ingreso' ? '+' : '-' }} $ {{ movimiento.monto }}.00
          </v-card-title>
          <img :width="50" :height="60" :src="movimiento.accion === 'ingreso' ? '/src/assets/ingereso.png' : '/src/assets/egreso.png'">
        </div>
        <div style="display: flex; justify-content: left; align-items: center; margin-left: 0.3rem; width: 100%;">
          <img :width="30" :height="18" src="/src/assets/mastercard.png">
          <v-card-subtitle style="font-size: 1rem; color: black; margin-left: 0.3rem;">{{ movimiento.from }}</v-card-subtitle>
        </div>
        <div style="display: flex; justify-content: right; margin-bottom: 0rem; width: 100%;">
          <v-card-subtitle style="font-size: 1rem; color: black; justify-content: right; font-weight: bold;">{{ formatearFecha(movimiento.fecha) }}</v-card-subtitle>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0rem; width: 100%;">
          <v-card-subtitle style="font-size: 1rem; color: black; font-weight: bold;">{{ movimiento.descripcion }}</v-card-subtitle>
          <v-card-subtitle style="font-size: 1rem; color: black; font-weight: bold;">{{ movimiento.hora }}</v-card-subtitle>
        </div>
      </div>
      <v-divider v-if="index < movimientos.length - 1" :thickness="3" style="width: 25vw; margin: 0 auto;" />
    </template>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ movimientos: any[] }>();

function formatearFecha(fechaISO: string): string {
  const [año, mes, día] = fechaISO.split('-')
  return `${día}/${mes}/${año}`
}
</script>
