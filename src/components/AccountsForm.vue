<template>
  <div>
    <div class="header-row">
      <h5>Управление учетными записями</h5>
      <a class="btn waves-effect" @click="onAdd"><i class="material-icons left">add</i>Добавить</a>
    </div>

    <p class="label-small">Подсказка для поля "Метка": ввод через точку с запятой (;)</p>

    <div v-if="accounts.length === 0" class="grey-text">Список пуст</div>

    <div v-for="account in accounts" :key="account.id" class="account-item">
      <AccountItem :account="account" @update="onUpdate" @remove="onRemove"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAccountsStore } from '../stores/accounts'
import AccountItem from './AccountItem.vue'

export default defineComponent({
  components: { AccountItem },
  setup() {
    const store = useAccountsStore()
    return {
      accounts: store.accounts,
      onAdd: store.addEmpty,
      onUpdate: store.update,
      onRemove: store.remove
    }
  }
})
</script>