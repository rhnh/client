import { taxonomies } from './data/taxonomies.json'
import { rest } from 'msw'
import { SERVER_URL } from 'utils/configs'
export const handlers = [
  rest.get(`${SERVER_URL}/taxonomies`, (req, res, ctx) => {
    return res(ctx.json(taxonomies))
  }),
]
