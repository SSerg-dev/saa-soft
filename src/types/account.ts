export type AccountType = 'LDAP' | 'LOCAL'

export interface LabelObj {
  text: string
}

export interface Account {
  id: number            // always number
  labels: LabelObj[]    // array { text }
  labelsRaw: string     // editable string "one;two;three"
  type: AccountType
  login: string
  password: string | null
}
