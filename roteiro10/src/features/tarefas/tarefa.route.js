import TarefaController from './tarefa.controller.js'

const controller = new TarefaController()

async function tarefaRoutes(server) {
  server.get('/tarefas', controller.listar)

  server.get(
    '/tarefas/resumo',
    controller.resumo
  )

  server.get(
    '/tarefas/:id',
    controller.buscarPorId
  )

  server.post(
    '/tarefas',
    controller.criar
  )

  server.get(
  '/tarefas/projeto/:projetoId',
  controller.buscarPorProjeto
)

  server.patch(
    '/tarefas/:id',
    controller.atualizar
  )

  server.delete(
    '/tarefas/:id',
    controller.remover
  )
}

export default tarefaRoutes