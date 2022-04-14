import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from 'react'

export interface Base {
  _id?: string
  createdAt?: string
}
export type IRole = 'mod' | 'admin' | 'user'
export interface IUser extends Base {
  username: string
  password: string
  confirmPassword?: string
  role?: IRole
}

export interface IUserInfo extends Base {
  username: string
  token: string
  isValidToken?: boolean
  role?: IRole
}
export type ICategories = 'species' | 'genus' | 'family' | 'order'
export type IGender = 'female' | 'male' | 'unknown'

export interface ITaxonomy extends Base {
  englishName?: string // only species can have it.
  taxonomy: string // It is a must for species: It should container binomial name
  category: ICategories
  image: string
  parent?: string
  approved: boolean
  username: string
  slug?: string
  info?: string
  sex?: IGender | undefined
  ancestors?: string[]
}

export interface IPost extends Base {
  title: string
  image_url: string
  body: string
  featured?: boolean
}
export interface LoginElements {
  username: HTMLInputElement
  password: HTMLInputElement
}
export interface IList extends Base {
  username: string
  listName: string
  birdIds?: string[]
  slug?: string
}
export interface IListBirds extends Base {
  taxonomy: string
  seen: string
  englishName: string
}
export interface IHintDisplay {
  inputName: string
  placeholder: string
  text: string
  hint: string
  tabbed: boolean
  customClass?: string
  customStyle?: {
    [x: string]: string
  }
  suggestions: string[]
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  setSuggestions: Dispatch<SetStateAction<string[]>>
  setText: Dispatch<SetStateAction<string>>
}

export interface IHintput {
  name: string
  placeholder?: string
  items: string[]
  className?: string
  numberOfSuggestions?: number
  style?: {
    [x: string]: string
  }
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IProfile {
  username: string
  createAt: string
  totalLists: number
  _id: string
}
export interface Authorization {
  token: string
  userInfo: IUserInfo | null | undefined
  username: string
  login: (user: IUser) => void
  register: (user: IUser) => Promise<boolean>
  logout: () => void
  passRecovery: () => void
  usernameRecovery: () => void
  getLocalToken: () => string | null
  isError: boolean
  isLogin: boolean
  error: Error
  isLoading: boolean
  isSuccess: boolean
  setState: Dispatch<'success' | 'error' | 'loading' | 'idle'>
  state: 'success' | 'error' | 'loading' | 'idle'
}

export const isAuthorized = (role = 'user'): boolean => {
  if (role === 'mod' || role === 'admin') {
    return true
  }
  return false
}
