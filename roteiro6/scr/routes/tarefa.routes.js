// @file: src/routes/tarefa.routes.js

export default async function tarefaRoutes(server, options) {

  const { controller } = options

  // LISTAR TAREFAS
  server.get('/tarefas', async (request, reply) => {

    console.log("Routes: GET /tarefas chamada")

    return controller.listar(request, reply)
  })

  // CRIAR TAREFA
  server.post('/tarefas', async (request, reply) => {

    console.log("Routes: POST /tarefas chamada")

    return controller.criarTarefa(request, reply)
  })

  // RESUMO
  server.get('/tarefas/resumo', async (request, reply) => {

    console.log("Routes: GET /tarefas/resumo chamada")

    return controller.obterResumo(request, reply)
  })

  // PENDENTES
  server.get('/tarefas/pendentes', async (request, reply) => {

    console.log("Routes: GET /tarefas/pendentes chamada")

    return controller.obterPendentes(request, reply)
  })

  // BUSCAR POR ID
  server.get('/tarefas/:id', async (request, reply) => {

    console.log("Routes: GET /tarefas/:id chamada")

    return controller.obterTarefa(request, reply)
  })

  // ATUALIZAR
  server.patch('/tarefas/:id', async (request, reply) => {

    console.log("Routes: PATCH /tarefas/:id chamada")

    return controller.atualizarTarefa(request, reply)
  })

  // CONCLUIR
  server.patch('/tarefas/:id/concluir', async (request, reply) => {

    console.log("Routes: PATCH /tarefas/:id/concluir chamada")

    return controller.concluirTarefa(request, reply)
  })

  // REMOVER
  server.delete('/tarefas/:id', async (request, reply) => {

    console.log("Routes: DELETE /tarefas/:id chamada")

    return controller.remover(request, reply)
  })
}