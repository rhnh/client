// /**
//  * globals
//  */

// import { IUser, IUserInfo } from 'utils/types'

// const usersKey = '__safarilive_users__'
// let users: IUser[] = []
// //save users in localStorage
// const persist = () =>
//   window.localStorage.setItem(usersKey, JSON.stringify(users))

// // assign users from localStorage to variable
// const load = () =>
//   Object.assign(users, JSON.parse(window.localStorage.getItem(usersKey) || ''))

// const findUser = (id: string) => users.find(user => user._id === id)

// // initialize
// try {
//   load()
// } catch (error) {
//   persist()
//   // ignore json parse error
// }

// window.safarilive = window.safarilive || {}

// window.safarilive.purgeUsers = (users: any) => {
//   Object.keys(users).forEach((key: string) => {
//     if (users[key]) delete users[key]
//   })
//   persist()
// }

// function validateUserForm({ username, password }: IUser) {
//   if (!username) {
//     const error = new Error('A username is required')
//     error.status = 400
//     throw error
//   }
//   if (!password) {
//     const error = new Error('A password is required')
//     error.status = 400
//     throw error
//   }
// }

// async function create({ username, password }: IUser) {
//   validateUserForm({ username, password })
//   const id = hash(username)
//   const passwordHash = hash(password)
//   if (findUser(id)) {
//     const error = new Error(
//       `Cannot create a new user with the username "${username}"`,
//     )
//     error.status = 400
//     throw error
//   }
//   users.push({ _id: id, username, password: passwordHash })
//   persist()
//   return await read(id)
// }
// export function authenticate({ username, password }: IUser) {
//   validateUserForm({ username, password })

//   const user = users.find(user => user.username === username)

//   if (user?.password === hash(password)) {
//     return { ...sanitizeUser(user), token: btoa(user?._id || '') } as IUserInfo
//   }
//   const error = new Error('Invalid username or password')
//   error.status = 400
//   throw error
// }
// async function read(id: string): Promise<IUserInfo> {
//   validateUser(id)
//   return (await sanitizeUser(findUser(id))) as IUserInfo
// }

// function sanitizeUser(user?: IUser) {
//   if (user) {
//     const { password, ...rest } = user
//     return rest
//   } else
//     return {
//       username: '',
//       token: '',
//     }
// }

// async function update({ id, updates }: { id: string; updates: IUser }) {
//   validateUser(id)
//   Object.assign(findUser(id), updates)
//   persist()
//   return read(id)
// }

// // this would be called `delete` except that's a reserved word in JS :-(
// async function remove(id: string) {
//   validateUser(id)
//   users.filter(user => user._id !== id)
//   persist()
// }

// function validateUser(id: string) {
//   load()
//   if (!findUser(id)) {
//     const error = new Error(`No user with the id "${id}"`)
//     error.status = 404
//     throw error
//   }
// }

// function hash(str: string) {
//   var hash = 5381,
//     i = str.length

//   while (i) {
//     hash = (hash * 33) ^ str.charCodeAt(--i)
//   }
//   return String(hash >>> 0)
// }

// async function reset() {
//   users = []
//   persist()
// }

// export { create, read, update, remove, reset }
