export async function main() {
  if (process.env.NODE_ENV === 'development') {
    const { server } = require('mocks/server')
    await server.start()
  }
}
