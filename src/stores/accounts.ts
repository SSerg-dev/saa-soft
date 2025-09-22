import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '../types/account'

const STORAGE_KEY = 'accounts_v1'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) accounts.value = JSON.parse(raw)
    } catch {
      accounts.value = []
    }
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value))
  }

  function addEmpty() {
    const id = Date.now().toString()
    accounts.value.push({
      id,
      labels: [],
      labelsRaw: '',
      type: 'LDAP',
      login: '',
      password: null
    })
    persist()
  }

  function update(updated: Account) {
    const idx = accounts.value.findIndex(a => a.id === updated.id)
    if (idx !== -1) {
      accounts.value[idx] = { ...updated }
      persist()
    }
  }

  function remove(id: string) {
    accounts.value = accounts.value.filter(a => a.id !== id)
    persist()
  }

  load()

  return { accounts, addEmpty, update, remove, persist, load }
})