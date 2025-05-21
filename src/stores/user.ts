import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    nombre: 'Antonia',
    apellido: 'Vazquez',
    DNI: '12.345.678',
    tel: '+54 911 1234 5678',
    mail: 'antonia.vazquez@gmail.com',
    alias: 'antonia.vazquez',
    cvu: '12345678901234567890',
  }),
})
