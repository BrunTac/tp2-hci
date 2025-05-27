<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <v-infinite-scroll
      v-if="!props.isHome"
      :height="475"
      style="scrollbar-width: none; width: 100%; display: flex; justify-content: center; overflow-y: auto; padding-top: 7rem;"
      @load="load"
      empty-text=""
    >
      <template v-for="(movimiento, index) in movimientosPaginados" :key="`${movimiento.id || index}-${movimiento.date}`">
        <div style="display: flex; flex-direction: column; padding: 0.7vh 0.2vw; width: 30vw; height: 18vh; align-items: center;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.2rem 0; width: 100%;">
            <v-card-title style="font-size: 2rem; color: black; padding: 0;">
              {{ getSigno(movimiento) }} $ {{ Math.abs(movimiento.amount) }}.00
            </v-card-title>
            <img :width="50" :height="60" :src="getIcono(movimiento)">
          </div>
          <div style="display: flex; justify-content: left; align-items: center; margin-left: 0.3rem; width: 100%;">
            <img :width="30" :height="18" src="/src/assets/mastercard.png">
            <v-card-subtitle style="font-size: 1rem; color: black; margin-left: 0.3rem;">
              {{ getFromDisplay(movimiento) }}
            </v-card-subtitle>
          </div>
          <div style="display: flex; justify-content: right; margin-bottom: 0rem; width: 100%;">
            <v-card-subtitle style="font-size: 1rem; color: black; justify-content: right; font-weight: bold;">
              {{ formatearFecha(movimiento.date) }}
            </v-card-subtitle>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0rem; width: 100%;">
            <v-card-subtitle style="font-size: 1rem; color: black; font-weight: bold;">
              {{ movimiento.description }}
            </v-card-subtitle>
            <v-card-subtitle style="font-size: 1rem; color: black; font-weight: bold;">
              {{ movimiento.hour }}
            </v-card-subtitle>
          </div>
        </div>
        <v-divider v-if="index < movimientosPaginados.length - 1" :thickness="3" style="width: 25vw; margin: 0 auto;" />
      </template>
    </v-infinite-scroll>

    <div
      v-else
      style="width: 100%; display: flex; flex-direction: column; align-items: center; padding-top: 1rem;"
    >
      <template v-for="(movimiento, index) in movimientosPaginados" :key="`${movimiento.id || index}-${movimiento.date}`">
        <div style="display: flex; flex-direction: column; padding: 0.7vh 0.2vw; width: 30vw; height: 18vh; align-items: center;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.2rem 0; width: 100%;">
            <v-card-title style="font-size: 2rem; color: black; padding: 0;">
              {{ getSigno(movimiento) }} $ {{ Math.abs(movimiento.amount) }}.00
            </v-card-title>
            <img :width="50" :height="60" :src="getIcono(movimiento)">
          </div>
          <div style="display: flex; justify-content: left; align-items: center; margin-left: 0.3rem; width: 100%;">
            <img :width="30" :height="18" src="/src/assets/mastercard.png">
            <v-card-subtitle style="font-size: 1rem; color: black; margin-left: 0.3rem;">
              {{ getFromDisplay(movimiento) }}
            </v-card-subtitle>
          </div>
          <div style="display: flex; justify-content: right; margin-bottom: 0rem; width: 100%;">
            <v-card-subtitle style="font-size: 1rem; color: black; justify-content: right; font-weight: bold;">
              {{ formatearFecha(movimiento.date) }}
            </v-card-subtitle>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0rem; width: 100%;">
            <v-card-subtitle style="font-size: 1rem; color: black; font-weight: bold;">
              {{ movimiento.description }}
            </v-card-subtitle>
            <v-card-subtitle style="font-size: 1rem; color: black; font-weight: bold;">
              {{ movimiento.hour }}
            </v-card-subtitle>
          </div>
        </div>
        <v-divider v-if="index < movimientosPaginados.length - 1" :thickness="3" style="width: 25vw; margin: 0 auto;" />
      </template>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Payment } from '@/api/payment';
import { Account } from '@/api/account.js';
import { useAccountStore } from '@/stores/accountStore'

const props = defineProps<{
  movimientos: Payment[]
  isHome?: boolean
  maxItems?: number
}>()

const accountStore = useAccountStore()
let currUser = ref<Account | null>(null);

onMounted(async () => {
  try {
    currUser.value = await accountStore.getAccount()
  } catch (error) {
    console.error('Error loading user account:', error)
  }
})

function getSigno(movimiento: Payment): string {
  if (!currUser.value) return '+'
  return movimiento.from?.id === currUser.value.id ? '-' : '+'
}

function getIcono(movimiento: Payment): string {
  if (!currUser.value) return '/src/assets/ingereso.png'
  return movimiento.to?.id === currUser.value.id
    ? '/src/assets/ingereso.png'
    : '/src/assets/egreso.png'
}

function getFromDisplay(movimiento: Payment): string {
  if (typeof movimiento.from === 'object' && movimiento.from !== null) {
    return movimiento.from.alias || movimiento.from.cvu || movimiento.from.id || 'Desconocido'
  }
  return movimiento.from || 'Desconocido'
}

function formatearFecha(fechaISO: string): string {
  if (!fechaISO) return ''
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
