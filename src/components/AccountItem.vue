<template>
  <div>
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div><strong>ID:</strong> {{ account.id }}</div>
      <a class="btn-flat" @click="remove"><i class="material-icons red-text">delete</i></a>
    </div>

    <div class="row" style="margin-top:12px;">
      <div class="input-field col s12">
        <input id="labels" v-model="labelsRaw" @blur="onLabelsBlur"/>
        <label>Метка (через ;)</label>
      </div>
      <div class="input-field col s6">
        <select v-model="type" @change="onTypeChange">
          <option value="LDAP">LDAP</option>
          <option value="LOCAL">Локальная</option>
        </select>
        <label>Тип</label>
      </div>
      <div class="input-field col s6">
        <input id="login" v-model="login" @blur="onLoginBlur"/>
        <label>Логин</label>
      </div>
      <div v-if="type==='LOCAL'" class="input-field col s12">
        <input id="password" type="password" v-model="password" @blur="onPasswordBlur"/>
        <label>Пароль</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Account } from '../types/account'

export default defineComponent({
  props: { account: { type: Object as () => Account, required: true } },
  emits: ['update','remove'],
  setup(props, {emit}) {
    const labelsRaw = ref(props.account.labelsRaw)
    const type = ref(props.account.type)
    const login = ref(props.account.login)
    const password = ref(props.account.password ?? '')

    function emitUpdate() {
      emit('update', { ...props.account, labelsRaw: labelsRaw.value, type:type.value, login:login.value, password:type.value==='LOCAL'?password.value:null })
    }
    function onLabelsBlur(){ emitUpdate() }
    function onTypeChange(){ emitUpdate() }
    function onLoginBlur(){ emitUpdate() }
    function onPasswordBlur(){ emitUpdate() }
    function remove(){ emit('remove', props.account.id) }

    return { labelsRaw, type, login, password, onLabelsBlur, onTypeChange, onLoginBlur, onPasswordBlur, remove }
  }
})
</script>