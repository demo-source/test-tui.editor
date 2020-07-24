import fastify from 'fastify'
import fastifyCompress from 'fastify-compress'
import fastifyStatic from 'fastify-static'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const productionMode = process.env.NODE_ENV === 'production'
const app = fastify({ logger: !productionMode })
const host = process.env.NODE_HOST || '0.0.0.0'
const port = Number(process.env.NODE_PORT || process.env.PORT || 3000)
const staticRoot = resolve(__dirname, './static')
const connectionString = process.env.DATABASE || `sqlite:${resolve(__dirname, './database.sqlite')}`

app
  .register(fastifyCompress)
  .register(fastifyStatic, { root: staticRoot })
  .register(import('./database.js'), { productionMode, connectionString })
  .register(import('./beckend.js'))

app.listen({ host, port }, (err, address) => {
  if (err) throw err
})
