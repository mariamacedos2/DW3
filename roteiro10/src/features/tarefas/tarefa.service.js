import TarefaRepository from './tarefa.repository.js'

class TarefaService {
  constructor() {
    this.repository = new TarefaRepository()
  }

  async listar(descricao, concluido) {
    return this.repository.buscarTodos(
      descricao,
      concluido
    )
  }

  async buscarPorId(id) {
    return this.repository.buscarPorId(id)
  }

  async criar(dados) {
    return this.repository.salvar({
      descricao: dados.descricao,
      concluido: false
    })
  }

  async atualizar(id, dados) {
    return this.repository.atualizar(id, dados)
  }

  async remover(id) {
    return this.repository.remover(id)
  }

  async resumo() {
    return this.repository.resumo()
  }
}

export default TarefaService