// @file: server.js

import Fastify from 'fastify'
import cors from '@fastify/cors'

import tarefaRoutes from './scr/routes/tarefa.routes.js'

import TarefaRepository from './scr/repositories/tarefa.repository.js'
import TarefaService from './scr/services/tarefa.service.js'
import TarefaController from './scr/controllers/tarefa.controller.js'

import { AppError } from './scr/errors/AppError.js'

// CRIA O SERVIDOR
const server = Fastify({ logger: true })

// ==========================================
// TRATAMENTO GLOBAL DE ERROS
// ==========================================

server.setErrorHandler((error, request, reply) => {

  // Erros da aplicação
  if (error instanceof AppError) {

    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message
    })
  }

  // Erros inesperados
  console.error('🔥 ERRO INTERNO:', error)

  return reply.status(500).send({
    status: 'error',
    message: 'Internal Server Error'
  })
})

// ==========================================
// CORS
// ==========================================

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

// ==========================================
// INJEÇÃO DE DEPENDÊNCIAS
// ==========================================

const repository =
  new TarefaRepository()

const service =
  new TarefaService(repository)

const controller =
  new TarefaController(service)

// ==========================================
// ROTAS
// ==========================================

server.register(tarefaRoutes, {
  controller
})

// ==========================================
// START SERVIDOR
// ==========================================

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