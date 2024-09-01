import Fastify, { FastifyInstance } from 'fastify'
import jwt from '@fastify/jwt'
import { JWT_SECRET, PORT } from './secrets'
import { authRoutes } from './routes/auth'

const app: FastifyInstance = Fastify({})

app.register(jwt, {
  secret: JWT_SECRET,
})

app.register(authRoutes, { prefix: '/api/auth' })

const start = async () => {
  try {
    await app.listen({ port: PORT })

    const address = app.server.address()
    const port = typeof address === 'string' ? address : address?.port

  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()