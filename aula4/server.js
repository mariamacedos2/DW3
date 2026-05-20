import Fastify from 'fastify'
import cors from '@fastify/cors'

import produtoRoutes from './routes/produto.routes.js'
import ProdutoController from './controllers/produto.controller.js'

const server = Fastify()

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

const produtoController = new ProdutoController()

server.register(produtoRoutes, {
  prefix: '/produtos',
  controller: produtoController
})

server.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    status: 'error',
    message: 'O recurso solicitado não existe nesta API.',
  })
})

const PORT = 3000

const start = async () => {
  try {
    await server.listen({ port: PORT })
    console.log(`Servidor rodando em http://localhost:${PORT}`)
  } catch (erro) {
    console.error(erro)
    process.exit(1)
  }
}

start()