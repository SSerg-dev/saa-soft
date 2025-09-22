<template>
  <div class="card account-card">
    <div class="card-content">
      <div class="row valign-wrapper" style="margin-bottom: 0">
        <div class="col s10"><strong>ID:</strong> {{ account.id }}</div>
        <div class="col s2 right-align">
          <a class="btn-flat" @click="onRemove">
            <i class="material-icons red-text">delete</i>
          </a>
        </div>
      </div>

      <div class="row" style="margin-top: 12px">
        <!-- Labels -->
        <div class="input-field col s12">
          <input
            :id="`labels-${account.id}`"
            v-model="labelsRawLocal"
            @blur="emitUpdate"
            maxlength="200"
          />
          <label :for="`labels-${account.id}`" class="active"
            >Метка (через ;)</label
          >
        </div>

        <!-- Type -->
        <div class="input-field col s6">
          <select
            :id="`type-${account.id}`"
            v-model="typeLocal"
            @change="emitUpdate"
          >
            <option value="LDAP">LDAP</option>
            <option value="LOCAL">Локальная</option>
          </select>
          <label :for="`type-${account.id}`" class="active">Тип</label>
        </div>

        <!-- Login -->
        <div class="input-field col s6">
          <input
            :id="`login-${account.id}`"
            v-model="loginLocal"
            @blur="emitUpdate"
            maxlength="100"
          />
          <label :for="`login-${account.id}`" class="active">Логин</label>
        </div>

        <!-- Password -->
        <div v-if="typeLocal === 'LOCAL'" class="input-field col s12">
          <input
            :id="`password-${account.id}`"
            type="password"
            v-model="passwordLocal"
            @blur="emitUpdate"
            maxlength="100"
          />
          <label :for="`password-${account.id}`" class="active">Пароль</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, nextTick } from 'vue'
import type { Account } from '../types/account'

export default defineComponent({
  name: 'AccountItem',
  props: {
    account: { type: Object as () => Account, required: true },
  },
  emits: ['update', 'remove'],
  setup(
    props: {
      account: {
        labelsRaw: any
        labels: any[]
        type: any
        login: any
        password: any
        id: any
      }
    },
    { emit }: any
  ) {
    // local copies — do NOT mutate props directly
    const labelsRawLocal = ref<string>(
      props.account.labelsRaw ??
        props.account.labels?.map((l) => l.text).join(';') ??
        ''
    )
    const typeLocal = ref<Account['type']>(props.account.type ?? 'LDAP')
    const loginLocal = ref<string>(props.account.login ?? '')
    const passwordLocal = ref<string>(props.account.password ?? '')

    // if parent / store updates props externally, keep locals in sync
    watch(
      () => props.account,
      (newA: {
        labelsRaw: any
        labels: any[]
        type: any
        login: any
        password: string
      }) => {
        labelsRawLocal.value =
          newA.labelsRaw ??
          (Array.isArray(newA.labels)
            ? newA.labels.map((l) => l.text).join(';')
            : '')
        typeLocal.value = newA.type
        loginLocal.value = newA.login
        passwordLocal.value = newA.password ?? ''
      },
      { deep: true }
    )

    function labelsFromRaw(raw: string) {
      return raw
        .split(';')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((text) => ({ text }))
    }

    const labelsRaw = ref(props.account.labelsRaw)
    const type = ref(props.account.type)
    const login = ref(props.account.login)
    const password = ref(props.account.password ?? '')

    function emitUpdate() {
      emit('update', {
        ...props.account,
        labelsRaw: labelsRaw.value,
        type: type.value,
        login: login.value,
        password: type.value === 'LOCAL' ? password.value : null,
      })
    }
    function remove() {
      emit('remove', props.account.id)
    }

    function onRemove() {
      emit('remove', Number(props.account.id))
    }

    onMounted(() => {
      // init materialize select
      nextTick(() => {
        const el = document.getElementById(
          `type-${props.account.id}`
        ) as HTMLSelectElement | null
        // @ts-ignore
        if (window.M && el) {
          // @ts-ignore
          window.M.FormSelect.init(el)
        }
      })
    })

    return {
      labelsRawLocal,
      typeLocal,
      loginLocal,
      passwordLocal,
      emitUpdate,
      onRemove,
    }
  },
})
</script>

<style scoped>
.account-card {
  margin-bottom: 20px;
}
</style>
