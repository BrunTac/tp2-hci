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
        <MovimientosList :movimientos="movimientosFiltrados" />
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import Sidebar from '@/components/Sidebar.vue';
  import MovimientosList from '@/components/MovimientosList.vue';
  import { useMovimientosStore } from '@/stores/movimientos'
  const movimientosStore = useMovimientosStore()

  const search = ref('');
  const tab = ref('todos');

  const movimientosFiltrados = computed(() => {
    const term = search.value.trim().toLowerCase();
    let lista = movimientosStore.movimientosOrdenados;
    if (tab.value === 'ingreso') {
      lista = lista.filter(mov => mov.accion === 'ingreso');
    } else if (tab.value === 'egreso') {
      lista = lista.filter(mov => mov.accion === 'egreso');
    }
    if (!term) return lista;
    return lista.filter(mov =>
      mov.from.toLowerCase().includes(term) ||
      mov.descripcion.toLowerCase().includes(term)
    );
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
