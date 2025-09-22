import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '../types/account'

const STORAGE_KEY = 'accounts_v1'

function rawToLabels(raw?: string) {
  if (!raw) return []
  return raw
    .split(';')
    .map(s => s.trim())
    .filter(Boolean)
    .map(text => ({ text }))
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        accounts.value = parsed.map((a: any) => ({
          ...a,
          id: Number(a.id), // гарантируем number
        }))
      }
    } catch {
      accounts.value = []
    }
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value))
  }

  function addEmpty() {
    const id = Date.now() // number
    const acc: Account = {
      id,
      labels: [],
      labelsRaw: '',
      type: 'LDAP',
      login: '',
      password: null
    }
    accounts.value.push(acc)
    persist()
  }

  function update(updated: Account) {
    // ensure labels derived from labelsRaw
    const normalized: Account = {
      ...updated,
      id: Number(updated.id),
      labels: Array.isArray(updated.labels) && updated.labels.length > 0
        ? updated.labels
        : rawToLabels(updated.labelsRaw)
    }
    const idx = accounts.value.findIndex(a => a.id === normalized.id)
    if (idx !== -1) {
      // replace the array element so Vue sees the change
      accounts.value[idx] = { ...normalized }
    } else {
      // fallback: push if not found
      accounts.value.push(normalized)
    }
    persist()
  }
  
  function remove(id: number) {
  const idx = accounts.value.findIndex(a => a.id === Number(id));
  if (idx !== -1) {
    accounts.value.splice(idx, 1); // удаляем один элемент
    persist();
  }
}

  load()

  return { accounts, addEmpty, update, remove, persist, load }
})
