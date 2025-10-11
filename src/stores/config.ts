// stores/counter.js
import { defineStore } from 'pinia'
const isDev = import.meta.env.DEV

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      isDev: isDev,
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    toggleDev() {
      this.isDev = !this.isDev
    },
  },
})