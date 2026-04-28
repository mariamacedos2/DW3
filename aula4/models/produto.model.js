export default class ProdutoModel {
  #produtos = [
    { id: 1, nome: 'Notebook', preco: 3500 },
    { id: 2, nome: 'Mouse', preco: 80 },
    { id: 3, nome: 'Teclado', preco: 200 }
  ]

  #proximoId = 4

  async findAll() {
    return this.#produtos
  }

  async findById(id) {
    return this.#produtos.find(p => p.id === id)
  }

  async create(dados) {
    const novoProduto = {
      id: this.#proximoId++,
      nome: dados.nome,
      preco: dados.preco
    }

    this.#produtos.push(novoProduto)
    return novoProduto
  }

  async delete(id) {
    const index = this.#produtos.findIndex(p => p.id === id)

    if (index === -1) return false

    this.#produtos.splice(index, 1)
    return true
  }

  // validação obrigatória do exercício
  static validar(dados) {
    const erros = []

    if (!dados || typeof dados.nome !== 'string' || dados.nome.trim() === '') {
      erros.push('Nome é obrigatório.')
    }

    if (typeof dados.preco !== 'number' || dados.preco <= 0) {
      erros.push('Preço deve ser maior que 0.')
    }

    return erros.length
      ? { valido: false, erros }
      : { valido: true }
  }
}