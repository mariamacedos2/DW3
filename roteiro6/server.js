// @file: server.js

import Fastify from 'fastify'
import cors from '@fastify/cors'

import tarefaRoutes from './scr/routes/tarefa.routes.js'

import TarefaRepository from './scr/repositories/tarefa.repository.js'
import TarefaService from './scr/services/tarefa.service.js'
import TarefaController from './scr/controllers/tarefa.controller.js'

const server = Fastify()

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

// CRIA AS DEPENDÊNCIAS

const repository =
  new TarefaRepository()

const service =
  new TarefaService(repository)

const controller =
  new TarefaController(service)

// REGISTRA AS ROTAS

server.register(tarefaRoutes, {
  controller
})

const PORT = 3000

server.listen(
  { port: PORT },
  (err) => {

    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log(
      `Servidor rodando em http://localhost:${PORT}`
    )
  }
)