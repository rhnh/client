// import { taxonomies } from './data/taxonomies.json'
// import { rest } from 'msw'
// import * as auth from 'mocks/user-db'
// import { IUser, IUserInfo } from 'utils/types'
// export const handlers = [
//   rest.get(`api/taxonomies`, (req, res, ctx) => {
//     return res(ctx.json(taxonomies))
//   }),

//   rest.post<IUser, IUserInfo>(`api/users/login`, async (req, res, ctx) => {
//     const { username, password } = req.body
//     try {
//       const user: IUserInfo = await auth.create({ username, password })
//       return res(ctx.json(user))
//     } catch (error) {
//       return res(ctx.json({ username: '', token: '' }))
//     }
//   }),
//   rest.post<IUser, IUserInfo | Error>(`api/users`, (req, res, ctx) => {
//     const { username, password } = req.body
//     try {
//       const user: IUserInfo = auth.authenticate({ username, password })
//       return res(ctx.json(user))
//     } catch (error: unknown) {
//       return res(
//         // Send a valid HTTP status code
//         // ctx.status(403),

//         // And a response body, if necessary

//         ctx.json({
//           message: `User '${req.body}' not found`,
//           name: '',
//         }),
//       )
//     }
//   }),
// ]
