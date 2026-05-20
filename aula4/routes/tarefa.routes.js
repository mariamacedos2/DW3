import {
  listarTarefas,
  criarTarefa,
  obterResumo,
  obterTarefa,
  atualizarTarefa,
  concluirTarefa,
  removerTarefa,
  listarTarefasPendentes
} from '../controllers/tarefa.controller.js'

export default async function tarefaRoutes(server, options) {

  server.get('/tarefas', async (request, reply) => {
    console.log("Routes: GET /tarefas chamada")
    listarTarefas(request, reply)
  })

  server.post('/tarefas', async (request, reply) => {
    console.log("Routes: POST /tarefas chamada")
    criarTarefa(request, reply)
  })

  // ⚠️ antes do :id
  server.get('/tarefas/resumo', async (request, reply) => {
    console.log("Routes: GET /tarefas/resumo chamada")
    obterResumo(request, reply)
  })

  server.get('/tarefas/:id', async (request, reply) => {
    console.log("Routes: GET /tarefas/:id chamada")
    obterTarefa(request, reply)
  })

  server.patch('/tarefas/:id', async (request, reply) => {
    console.log("Routes: PATCH /tarefas/:id chamada")
    atualizarTarefa(request, reply)
  })

  server.patch('/tarefas/:id/concluir', async (request, reply) => {
    console.log("Routes: PATCH /tarefas/:id/concluir chamada")
    concluirTarefa(request, reply)
  })

  server.delete('/tarefas/:id', async (request, reply) => {
    console.log("Routes: DELETE /tarefas/:id chamada")
    removerTarefa(request, reply)
  })

  server.get('/tarefas/pendentes', async (request, reply) => {
    console.log("Routes: GET /tarefas/pendentes chamada")
    listarTarefasPendentes(request, reply)
  })
}