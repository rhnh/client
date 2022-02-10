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

export interface IArticle extends Base {
  title: string
  image_url: string
  body: string
}
export interface LoginElements {
  username: HTMLInputElement
  password: HTMLInputElement
}
