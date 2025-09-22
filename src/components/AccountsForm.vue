<template>
  <div>
    <div class="header-row">
      <h5>Управление учетными записями</h5>
      <a class="btn waves-effect" @click="onAdd"
        ><i class="material-icons left">add</i>Добавить</a
      >
    </div>

    <p class="label-small">Подсказка для поля "Метка": ввод через ;</p>

    <div v-if="accounts.length === 0" class="grey-text">
      Список пуст — добавьте запись.
    </div>

    <div v-for="acc in accounts" :key="acc.id" class="account-item">
      <AccountItem :account="acc" @update="onUpdate" @remove="onRemove" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAccountsStore } from '../stores/accounts'
import AccountItem from './AccountItem.vue'
import type { Account } from '../types/account'

export default defineComponent({
  components: { AccountItem },
  setup() {
    const store = useAccountsStore()

    function onAdd() {
      store.addEmpty()
    }

    function onUpdate(updated: Account) {
      store.update(updated)
    }

    function onRemove(id: number) {
      store.remove(Number(id))
    }

    return {
      accounts: store.accounts,
      onAdd,
      onUpdate,
      onRemove,
    }
  },
})
</script>
