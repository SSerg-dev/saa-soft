export type AccountType = 'LDAP' | 'LOCAL'

export interface LabelObj {
  text: string
}

export interface Account {
  id: string
  labels: LabelObj[]
  labelsRaw: string
  type: AccountType
  login: string
  password: string | null
}