import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from 'react'

export interface Base {
  _id?: string
  createdAt?: string
}
export interface IUser extends Base {
  username: string
  password: string
  confirmPassword?: string
}
export interface IUserInfo {
  username: string
  token: string
}

export interface ITaxonomy extends Base {
  binomial: string
  englishName: string
  taxonomy: string[]
  parent: string
  image: string
}

export interface IPost extends Base {
  title: string
  image_url: string
  body: string
}
export interface LoginElements {
  username: HTMLInputElement
  password: HTMLInputElement
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
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleBlur: (e: ChangeEvent<HTMLInputElement>) => void
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
  handleBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export interface IList extends Base {
  username: string
  listName: string
  birdIds?: string[]
}
