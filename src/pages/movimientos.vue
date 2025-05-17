<template>
  <Sidebar />

    <Header>Movimientos</Header>

    <v-list class="bg-transparent">
        <v-list-item
        v-for="(movimiento, index) in movimientos">
            <v-list-item-content style="display: flex; justify-content: center;">
                <v-card class="move-card" color="#FFE9E5" height="20vh" width="25vw" > 
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem;">
                        <v-card-title style="font-size: 2rem; color: black; padding: 0;">
                            {{ movimiento.accion === 'ingreso' ? '+' : '-' }} $ {{ movimiento.monto }}
                        </v-card-title>
                        <img :src="movimiento.accion === 'ingreso' ? '/src/assets/ingereso.png' : '/src/assets/egreso.png'" size="32"></img>
                    </div>
                    <div style="display: flex; justify-content: left; align-items: center; margin-left: 1rem;">
                        <img src="/src/assets/mastercard.png" size="32"></img>
                        <v-card-subtitle style="font-size: 1rem; color: black;">{{movimiento.from}}</v-card-subtitle>           
                        <v-card-subtitle style="font-size: 1rem; color: black;"></v-card-subtitle>    
                    </div>
                     <div style="display: flex; justify-content: right; margin-bottom: 0rem;">
                            <v-card-subtitle style="font-size: 1rem; color: black; justify-content: right; font-weight: bold;">{{ movimiento.fecha }}</v-card-subtitle>         
                        </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0rem; width: 100%;">
                        <v-card-subtitle style="font-size: 1rem; color: black; font-weight: bold;">{{movimiento.descripcion}}</v-card-subtitle>    
                        <v-card-subtitle style="font-size: 1rem; color: black; align-items: right; font-weight: bold;">{{ movimiento.hora }}</v-card-subtitle>         
                    </div>
                </v-card>
            </v-list-item-content>
        </v-list-item>
    </v-list>

</template>


<script setup lang="ts">
  import Sidebar from '@/components/Sidebar.vue';


  const movimientos = ref([
  {
    descripcion: 'Transferencia',
    from: 'Juan Perez',
    fecha: '17 mayo 2025',
    hora: '22:21',
    monto: 1500,
    accion: 'ingreso',
  },
  {
    descripcion: 'Pago',
    from: 'Mercado Libre',
    fecha: '16 mayo 2025',
    hora: '22:22',
    monto: 320,
    accion: 'egreso',
  },
  {
    descripcion: 'Recarga',
    from: 'Terminada en 2344',
    fecha: '15 mayo 2025',
    hora: '22:23',
    monto: 2000,
    accion: 'ingreso',
  },
  {
    descripcion: 'Suscripción',
    from: 'Spotify',
    fecha: '14 mayo 2025',
    hora: '22:22',
    monto: 250,
    accion: 'egreso',
  },
])
</script>

<style scoped>

.move-card {
    background-color: #ffe9e5;
    border: 1px solid #cac4d0;
    border-radius: 0.4rem;
    color: black;
}

</style>