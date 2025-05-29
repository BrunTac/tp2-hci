<template v-if="props.currUser">
  <div style="display: flex; flex-direction: column; align-items: flex-start;">

    <v-infinite-scroll
      v-if="!props.isHome && movimientosPaginados.length > 0"
      :height="475"
      style="scrollbar-width: none; width: 100%; display: flex; flex-direction: column; align-items: stretch; overflow-y: auto;"
      @load="load"
      empty-text=""
    >
      <template v-for="(movimiento, index) in movimientosPaginados" :key="`${movimiento.id || index}`">
        <div style="display: flex; flex-direction: column; padding: 0.7vh 0.2vw; width: 30vw; height: 15vh; align-items: center;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.2rem 0; width: 100%;">
            <v-card-title style="font-size: 2rem; color: black; padding: 0;">
              $ {{ movimiento.amount }}.00
            </v-card-title>
            <img :width="50" :height="60" :src="getIcono(movimiento)">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-left: 0.3rem; width: 100%;">
            <v-card-subtitle style="font-size: 1rem; color: black;">
              <v-icon size="30">
                {{ movimiento.method === 'ACCOUNT' ? 'mdi-account-outline' : 'mdi-credit-card-outline' }}
              </v-icon>
            </v-card-subtitle>
            <v-card-subtitle style="font-size: 1rem; color: black; justify-content: right; font-weight: bold;">
              {{
                movimiento.payer.id === props.currUser?.id
                  ? 'a ' + movimiento.receiver.firstName + ' ' + movimiento.receiver.lastName
                  : 'de ' + movimiento.payer.firstName + ' ' + movimiento.payer.lastName
              }}
            </v-card-subtitle>
          </div>
        </div>
        <v-divider v-if="index < movimientosPaginados.length - 1" :thickness="3" style="width: 25vw; margin: 0 auto;" />
      </template>
    </v-infinite-scroll>
    <v-sheet
      v-if="!props.isHome && movimientosPaginados.length === 0"
      class="centrado-vh"
      style="background-color: transparent; color: black;"
    >
      <v-icon size="2.4vw">mdi-emoticon-sad-outline</v-icon>
      <v-card-text style="text-align: center; font-size: 1vw">
        {{ props.tipo === 'ingreso' ? 'No hay ingresos' : props.tipo === 'egreso' ? 'No hay egresos' : 'No hay movimientos' }}
      </v-card-text>
    </v-sheet>

    <div
      v-else-if="props.isHome && movimientosPaginados.length > 0"
      style="width: 100%; display: flex; flex-direction: column; align-items: center; padding-top: 1rem;"
    >
      <template v-for="(movimiento, index) in movimientosPaginados" :key="`${movimiento.id || index}`">
        <div style="display: flex; flex-direction: column; padding: 0.7vh 0.2vw; width: 30vw; height: 15vh; align-items: center;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.2rem 0; width: 100%;">
            <v-card-title style="font-size: 2rem; color: black; padding: 0;">
              $ {{ movimiento.amount }}.00
            </v-card-title>
            <img :width="50" :height="60" :src="getIcono(movimiento)">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-left: 0.3rem; width: 100%;">
            <v-card-subtitle style="font-size: 1rem; color: black;">
              <v-icon size="30">
                {{ movimiento.method === 'ACCOUNT' ? 'mdi-account-outline' : 'mdi-credit-card-outline' }}
              </v-icon>
            </v-card-subtitle>
            <v-card-subtitle style="font-size: 1rem; color: black; justify-content: right; font-weight: bold;">
              {{
                movimiento.payer.id === props.currUser?.id
                  ? 'a ' + movimiento.receiver.firstName + ' ' + movimiento.receiver.lastName
                  : 'de ' + movimiento.payer.firstName + ' ' + movimiento.payer.lastName
              }}
            </v-card-subtitle>
          </div>
        </div>
        <v-divider v-if="index < movimientosPaginados.length - 1" :thickness="3" style="width: 25vw; margin: 0 auto;" />
      </template>
    </div>
    <v-sheet
      v-if="props.isHome && movimientosPaginados.length === 0"
      class="centrado-vh"
      style="background-color: transparent; color: black;"
    >
      <v-icon size="2.4vw">mdi-emoticon-sad-outline</v-icon>
      <v-card-text style="text-align: center; font-size: 1vw">
        No hay movimientos!
      </v-card-text>
    </v-sheet>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Payment } from '@/api/payment';
import { Account } from '@/api/account.js';

const props = defineProps<{
  movimientos: Payment[]
  isHome?: boolean
  maxItems?: number
  currUser?: Account | null
  tipo?: string
}>()

function getIcono(movimiento: Payment): string {
  if (!props.currUser) return '/src/assets/ingereso.png'
  return movimiento.receiver.id === props.currUser.id
    ? '/src/assets/ingereso.png'
    : '/src/assets/egreso.png'
}

let currentPage = ref(0);
const pageSize = 5;

const movimientosPaginados = computed(() => {
  if (props.isHome) {
    return props.movimientos.slice(0, 4)
  }

  const endIndex = (currentPage.value + 1) * pageSize
  return props.movimientos.slice(0, endIndex)
})

function load({ done }) {
  if (props.isHome) {
    done('empty')
    return
  }

  const totalMoves = props.movimientos.length
  const currShowing = movimientosPaginados.value.length

  if (currShowing >= totalMoves) {
    done('empty')
    return
  }

  currentPage.value++
  done('ok')
}
</script>

<style scoped>
.centrado-vh {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 15vh;
}
</style>
