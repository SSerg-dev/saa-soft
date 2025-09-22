<template>
  <div class="card account-card">
    <div class="card-content">
      <div class="row valign-wrapper" style="margin-bottom: 0;">
        <div class="col s10">
          <strong>ID:</strong> {{ account.id }}
        </div>
        <div class="col s2 right-align">
          <a class="btn-flat" @click="remove">
            <i class="material-icons red-text">delete</i>
          </a>
        </div>
      </div>

      <div class="row" style="margin-top:12px;">
        <!-- Метка -->
        <div class="input-field col s12">
          <input v-model="labelsRaw" @blur="emitUpdate" maxlength="50" />
          <label class="active">Метка (через ;)</label>
        </div>

        <!-- Тип -->
        <div class="input-field col s6">
          <select v-model="type" @change="emitUpdate">
            <option value="LDAP">LDAP</option>
            <option value="LOCAL">Локальная</option>
          </select>
          <label class="active">Тип</label>
        </div>

        <!-- Логин -->
        <div class="input-field col s6">
          <input v-model="login" @blur="emitUpdate" maxlength="100" />
          <label class="active">Логин</label>
        </div>

        <!-- Пароль -->
        <div v-if="type === 'LOCAL'" class="input-field col s12">
          <input type="password" v-model="password" @blur="emitUpdate" maxlength="100" />
          <label class="active">Пароль</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import type { Account } from '../types/account'

export default defineComponent({
  props: { account: { type: Object as () => Account, required: true } },
  emits: ['update', 'remove'],
  setup(props: { account: { labelsRaw: string; type: string; login: string; password: string | null; id: any } }, { emit }: any) {
    // computed вместо локальных ref — сохраняем реактивность
    const labelsRaw = computed({
      get: () => props.account.labelsRaw,
      set: (val: string) => (props.account.labelsRaw = val)
    })

    const type = computed({
      get: () => props.account.type,
      set: (val: string) => (props.account.type = val as 'LDAP' | 'LOCAL')
    })

    const login = computed({
      get: () => props.account.login,
      set: (val: string) => (props.account.login = val)
    })

    const password = computed({
      get: () => props.account.password ?? '',
      set: (val: string) => (props.account.password = type.value === 'LOCAL' ? val : null)
    })

    function emitUpdate() {
      emit('update', { ...props.account })
    }

    function remove() {
      emit('remove', props.account.id)
    }

    // инициализация materialize select
    onMounted(() => {
      const elems = document.querySelectorAll('select')
      // @ts-ignore
      M.FormSelect.init(elems)
    })

    return { labelsRaw, type, login, password, emitUpdate, remove }
  }
})
</script>

<style scoped>
.account-card {
  margin-bottom: 20px;
}
</style>
