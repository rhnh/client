export interface Base {
  _id?: string
  createdAt?: string
}
export interface User extends Base {
  username: string
  password: string
  confirmPassword?: string
}
export interface UserInfo {
  username: string
  token: string
}

export interface Taxonomy extends Base {
  binomial: string
  englishName: string
  taxonomy: string[]
  parent: string
  image: string
}
