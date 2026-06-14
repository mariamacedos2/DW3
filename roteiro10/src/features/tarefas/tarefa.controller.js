import TarefaService from './tarefa.service.js'

class TarefaController {
  constructor() {
    this.service = new TarefaService()
  }

  listar = async (request, reply) => {
    const { descricao, concluido } = request.query

    const tarefas = await this.service.listar(
      descricao,
      concluido
    )

    return reply.send(tarefas)
  }

  resumo = async (request, reply) => {
    const resultado = await this.service.resumo()

    return reply.send(resultado)
  }

  buscarPorId = async (request, reply) => {
    const tarefa = await this.service.buscarPorId(
      Number(request.params.id)
    )

    if (!tarefa) {
      return reply.status(404).send({
        message: 'Tarefa não encontrada'
      })
    }

    return reply.send(tarefa)
  }

  criar = async (request, reply) => {
    const tarefa = await this.service.criar(request.body)

    return reply.status(201).send(tarefa)
  }

  atualizar = async (request, reply) => {
    const tarefa = await this.service.atualizar(
      Number(request.params.id),
      request.body
    )

    if (!tarefa) {
      return reply.status(404).send({
        message: 'Tarefa não encontrada'
      })
    }

    return reply.send(tarefa)
  }

  remover = async (request, reply) => {
    const removida = await this.service.remover(
      Number(request.params.id)
    )

    if (!removida) {
      return reply.status(404).send({
        message: 'Tarefa não encontrada'
      })
    }

    return reply.status(204).send()
  }
}

export default TarefaController