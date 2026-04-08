import { atualizarTarefa } from '../controllers/tarefa.controllers.js'

import { listarTarefas } from '../controllers/tarefa.controllers.js'


server.get('/tarefas', async (request, reply) => {
  // LOG para indicar que a rota foi chamada
  console.log("Routes: GET /tarefas chamada");
  // Chama a função do controlador para processar a requisição
  listarTarefas(request, reply)
})

export default async function tarefaRoutes(server, options) {

  // DADOS utilizados pelas requisições relacionadas às tarefas.
  const tarefas = [
    { id: 1, descricao: "Fazer compras", concluido: false },
    { id: 2, descricao: "Lavar o carro", concluido: false },
    { id: 3, descricao: "Estudar Fastify", concluido: true }
  ]

  // ROTAS e PROCESSAMENTO das requisições relacionadas às tarefas.

  server.get('/tarefas', async (request, reply) => {

    const { busca, concluido } = request.query
    let resultado = tarefas
    if (busca) {
      resultado = resultado.filter(t =>
        t.descricao.toLowerCase().includes(busca.toLowerCase())
      )
    }
    if (concluido !== undefined) {
      const concluidoBool = concluido === 'true'
      resultado = resultado.filter(t => t.concluido === concluidoBool)
    }
    return reply.send(resultado)
  })

  server.post('/tarefas', async (request, reply) => {
    const { descricao } = request.body
    if (!descricao || descricao.trim() === '') {
      return reply.status(400).send({
        status: 'error',
        message: 'A descrição da tarefa é obrigatória'
      })
    }
    const novoId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1
    const novaTarefa = { id: novoId, descricao, concluido: false }

    tarefas.push(novaTarefa)
    return reply.status(201).send(novaTarefa)
  })

  server.get('/tarefas/resumo', async (request, reply) => {
    const total = tarefas.length
    const concluidas = tarefas.filter(t => t.concluido).length
    const pendentes = total - concluidas

    return reply.send({
      total,
      concluidas,
      pendentes
    })
  })

  server.get('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const tarefa = tarefas.find(t => t.id === id)
    if (!tarefa) {
      return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    reply.send(tarefa)
  })

  server.patch('/tarefas/:id', async (request, reply) => {
  console.log('Rota: atualizarTarefa chamada')
  return atualizarTarefa(request, reply)
  } )

  server.patch('/tarefas/:id/concluir', async (request, reply) => {
    const id = Number(request.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
      return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    tarefas[index].concluido = !tarefas[index].concluido
    return reply.send(tarefas[index])
  })

  server.delete('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
      return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    tarefas.splice(index, 1)
    return reply.status(204).send()
  })
}