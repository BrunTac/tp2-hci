<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <v-infinite-scroll
      v-if="!props.isHome"
    :height="475"
    style="scrollbar-width: none; width: 100%; display: flex; justify-content: center;  overflow-y: auto;  padding-top: 7rem;"
    @load="load"
    empty-text=""
    >
    <template v-for="(movimiento, index) in movimientosPaginados" :key="`${movimiento.id || index}-${movimiento.fecha}`">
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
    </v-infinite-scroll>

    <div
      v-else
      style="width: 100%; display: flex; flex-direction: column; align-items: center; padding-top: 1rem;"
    >
      <template v-for="(movimiento, index) in movimientosPaginados" :key="`${movimiento.id || index}-${movimiento.fecha}`">
        <div style="display: flex; flex-direction: column; padding: 0.7vh 0.2vw; width: 30vw; height: 18vh; align-items: center;">
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
        <v-divider v-if="index < movimientosPaginados.length - 1" :thickness="3" style="width: 25vw; margin: 0 auto;" />
      </template>
    </div>
    <slot />
    <slot />


  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  movimientos: any[]
  isHome?: boolean
  maxItems?: number
}>()

function formatearFecha(fechaISO: string): string {
  const [año, mes, día] = fechaISO.split('-')
  return `${día}/${mes}/${año}`
}

let currentPage = ref(0);
const pageSize = 5;


const movimientosPaginados = computed(() => {
  if (props.isHome) {
    return props.movimientos.slice(0, 3)
  }

  const endIndex = (currentPage.value + 1) * pageSize
  return props.movimientos.slice(0, endIndex)
})


function load ({ done }) {

  if (props.isHome) {
    done('empty')
    return
  }
  const totalMoves = props.movimientos.length
  const currShowing = movimientosPaginados.value.length

  // Si ya estamos mostrando todos los movimientos disponibles
  if (currShowing >= totalMoves) {
    done('empty')
    return
  }

  // Incrementar la página para mostrar más elementos
  currentPage.value++
  done('ok')
}
</script>
