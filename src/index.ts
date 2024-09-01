import Fastify, { FastifyInstance } from 'fastify'

const app: FastifyInstance = Fastify({})

app.get('/', async (req, res) => {
  return res.send("HEllow")
})

const start = async () => {
  try {
    await app.listen({ port: 3000 })

    const address = app.server.address()
    const port = typeof address === 'string' ? address : address?.port

  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()