<template>
  <div class="container">
    <div class="card">
      <AccountsForm />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AccountsForm from './components/AccountsForm.vue'

export default defineComponent({
  components: { AccountsForm }
})
</script>