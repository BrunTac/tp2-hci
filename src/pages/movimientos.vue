<template>
  <Sidebar />

  <Header>Movimientos</Header>
  <v-container class="main-move-container">
    <v-card class="move-card-outer" color="#FFE9E5" flat>
      <v-text-field
        v-model="search"
        label="Buscar"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        style="margin-bottom: 0vh; width:40vw; margin-left: auto; margin-right: auto;"
        color="#d28d8d"
      />
      <div style="display: flex; justify-content: center; margin-bottom: 2vh;">
        <v-tabs v-model="tab" align-tabs="center" color="#b55544" style="width: 30vw;">
          <v-tab value="todos" style="color: #b55544; font-weight: bold;">Todos</v-tab>
          <v-tab value="ingreso" style="color: #b55544; font-weight: bold;">Ingresos</v-tab>
          <v-tab value="egreso" style="color: #b55544; font-weight: bold;">Egresos</v-tab>
        </v-tabs>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <MovimientosList v-if="movimientosFiltrados.length > 0" :movimientos="movimientosFiltrados" :curr-user="currUser" />
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
  import Sidebar from '@/components/Sidebar.vue';
  import MovimientosList from '@/components/MovimientosList.vue';
  import { usePaymentStore } from '@/stores/paymentStore'
  import { useAccountStore } from '@/stores/accountStore'
  import { Account } from '@/api/account.js';

  const accountStore = useAccountStore()
  let currUser = ref<Account | null>(null);
  const payments = ref([])


  const paymentStore = usePaymentStore()
  onMounted(async () => {
    await paymentStore.getAll()
    try {
      currUser.value = await accountStore.getAccount()
    } catch (error) {
      console.error('Error loading user account:', error)
    }
    payments.value = paymentStore.payments
  })

  const search = ref('');
  const tab = ref('todos');
  const movimientosFiltrados = computed(() => {

    const term = search.value.trim().toLowerCase();
    let lista = [...payments.value].filter(mov => mov.payer);
    if (tab.value === 'ingreso') {
      lista = lista.filter(mov => mov.receiver.id === currUser.value.id);
    } else if (tab.value === 'egreso') {
      lista = lista.filter(mov => mov.payer.id === currUser.value.id);
    }
    if (!term) return lista;
    return lista.filter(mov => {
      const metodo = mov.method?.toLowerCase() || '';

      // Determinar quién es el "otro" usuario
      const otroUsuario = mov.payer.id === currUser.value.id ? mov.receiver : mov.payer;

      const nombre = `${otroUsuario.firstName} ${otroUsuario.lastName}`.toLowerCase();

      return metodo.includes(term) || nombre.includes(term);
    });
  });

  function formatearFecha(fechaISO: string): string {
    const [año, mes, día] = fechaISO.split('-')
    return `${día}/${mes}/${año}`
  }
</script>

<style scoped>
.main-move-container {
  width: 50vw;
  margin: 0 auto;
  margin-top: 2vh;
  display: flex;
  justify-content: center;
}
.move-card-outer {
  background-color: #ffe9e5;
  border: 1px solid #cac4d0;
  border-radius: 1.5rem;
  color: black;
  width: 100%;
  min-height: 70vh;
  padding: 2vw 2vw 2vw 2vw;
  box-sizing: border-box;
}
</style>
