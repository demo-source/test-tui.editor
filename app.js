import fastify from 'fastify'
import fastifyCompress from 'fastify-compress'
import fastifyStatic from 'fastify-static'
import { fileURLToPath } from 'url'
import { resolve } from 'path'

const productionMode = process.env.NODE_ENV === 'production'
const app = fastify({ logger: !productionMode })
const host = process.env.NODE_HOST || '0.0.0.0'
const port = Number(process.env.NODE_PORT || process.env.PORT || 3000)
const staticRoot = resolve(fileURLToPath(import.meta.url), '../static')

app
  .register(fastifyCompress)
  .register(fastifyStatic, { root: staticRoot })


app.listen({ host, port }, (err, address) => {
  if (err) throw err
})
