class TarefaController {

  constructor(service) {
    this.service = service
  }

  async listar(request, reply) {
  console.log("Controller: listar chamado")

  const tarefas =
    await this.service.listar(request.query)

  return reply.send(tarefas)
}

  async buscar(request, reply) {
    console.log("Controller: buscar chamado")

    const id = Number(request.params.id)

    const tarefa =
      await this.service.buscarPorId(id)

    return reply.send(tarefa)
  }

  async criarTarefa(request, reply) {
    console.log("Controller: criarTarefa chamado")

    const { descricao } = request.body

    const novaTarefa =
      await this.service.criar(descricao)

    return reply.status(201).send(novaTarefa)
  }

  async obterTarefa(request, reply) {
    console.log("Controller: obterTarefa chamado")

    const id = Number(request.params.id)

    const tarefa =
      await this.service.buscarPorId(id)

    return reply.send(tarefa)
  }

  async atualizarTarefa(request, reply) {
    console.log("Controller: atualizarTarefa chamado")

    const id = Number(request.params.id)

    const tarefa =
      await this.service.atualizar(id, request.body)

    return reply.send(tarefa)
  }

  async concluirTarefa(request, reply) {
    console.log("Controller: concluirTarefa chamado")

    const id = Number(request.params.id)

    const tarefa =
      await this.service.alternarConcluido(id)

    return reply.send(tarefa)
  }

  async remover(request, reply) {
    console.log("Controller: remover chamado")

    const id = Number(request.params.id)

    await this.service.remover(id)

    return reply.status(204).send()
  }

  async obterResumo(request, reply) {
    console.log("Controller: obterResumo chamado")

    const resumo =
      await this.service.obterResumo()

    return reply.send(resumo)
  }

  async obterPendentes(request, reply) {
    console.log("Controller: obterPendentes chamado")

    const tarefas =
      await this.service.listarPendentes()

    return reply.send(tarefas)
  }
}

export default TarefaController