export async function atualizarTarefa(request, reply) {
  console.log('Controller: atualizarTarefa chamado')

  const id = Number(request.params.id)
  const index = tarefas.findIndex(t => t.id === id)

  if (index === -1) {
    return reply.status(404).send({
      status: 'error',
      message: 'Tarefa não encontrada'
    })
  }

  const tarefaAtualizada = request.body
  tarefas[index] = { ...tarefas[index], ...tarefaAtualizada, id }

  return reply.send(tarefas[index])
}