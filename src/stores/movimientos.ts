// src/stores/movimientos.ts
import { defineStore } from 'pinia'

export const useMovimientosStore = defineStore('movimientos', {
  state: () => ({
    items: [
      {
        descripcion: 'Transferencia',
        from: 'Juan Perez',
        fecha: '2025-05-17',
        hora: '22:21',
        monto: 1500,
        accion: 'ingreso',
      },
      {
        descripcion: 'Pago',
        from: 'Mercado Libre',
        fecha: '2025-05-16',
        hora: '22:22',
        monto: 320,
        accion: 'egreso',
      },
      {
        descripcion: 'Recarga',
        from: 'Terminada en 2344',
        fecha: '2025-05-15',
        hora: '22:23',
        monto: 2000,
        accion: 'ingreso',
      },
      {
        descripcion: 'Suscripción',
        from: 'Spotify',
        fecha: '2025-05-14',
        hora: '22:22',
        monto: 250,
        accion: 'egreso',
      },
    ],
  }),
  getters: {
    movimientosOrdenados: state =>
      [...state.items].sort((a, b) => {
        const fechaA = new Date(`${a.fecha} ${a.hora}`)
        const fechaB = new Date(`${b.fecha} ${b.hora}`)
        return fechaB.getTime() - fechaA.getTime()
      }),
  },
})
