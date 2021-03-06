import { ChangeEvent, Dispatch, SetStateAction } from 'react'

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
  avatar?: string
}

export interface IUserInfo extends Base {
  username: string
  token: string
  isValidToken?: boolean
  role?: IRole
  avatar?: string
}

export type IRank =
  | 'species'
  | 'subspecies'
  | 'genus'
  | 'subgenus'
  | 'family'
  | 'subfamily'
  | 'suborder'
  | 'order'
  | 'none'

export type IGender = 'female' | 'male' | 'unknown'

export interface ITaxonomy extends Base {
  englishName?: string // only species can have it.
  taxonomyName: string
  rank: IRank
  image: string
  parent?: string
  isApproved: boolean
  username: string
  slug?: string
  info?: string
  sex?: IGender | undefined
  ancestors: string[]
  credit?: string
  seen?: string
}

export interface IPost extends Base {
  title: string
  image_url: string
  body: string
  featured?: boolean
  username?: string
}
export interface LoginElements {
  username: HTMLInputElement
  password: HTMLInputElement
}

export interface IList extends Base {
  username: string
  listName: string
  birds?: ITaxonomy[]
  slug?: string
}

export interface IListTaxonomy extends IList, ITaxonomy {
  listName: string
  username: string
  seen: string
  location: string
  taxonomyName: string
  englishName: string
  birdId: string
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
  createdAt: string
  totalLists: number
  _id: string
  avatar: string
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
  getLocalToken: () => string | undefined | null
  isError: boolean
  isLogin: boolean
  error: Error
  isLoading: boolean
  isSuccess: boolean
  setLogin: (state: 'idle' | 'loading' | 'success' | 'error') => void
  state: 'success' | 'error' | 'loading' | 'idle'
}

export const isAuthorized = (role = 'user'): boolean => {
  if (role === 'mod' || role === 'admin') {
    return true
  }
  return false
}
/**
 * - a type for notification's message
 */
export type IMessageType =
  | 'announcement'
  | 'info'
  | 'warning'
  | 'suggestion'
  | 'none'
/**
 *
 */
export type IAudience = 'mod' | 'user' | 'all' | 'unregistered'

export interface INotification extends Base {
  message: string
  audience: IAudience
  isActive: boolean
  time: number
  messageType: IMessageType
}
