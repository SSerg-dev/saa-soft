export type AccountType = 'LDAP' | 'LOCAL'

export interface LabelObj {
  text: string
}

export interface Account {
  id: number            // всегда number, для v-for ключей
  labels: LabelObj[]    // массив объектов { text }
  labelsRaw: string     // строка вида "one;two;three"
  type: AccountType     // 'LDAP' | 'LOCAL'
  login: string         // логин
  password: string | null // пароль (null для LDAP)
}
