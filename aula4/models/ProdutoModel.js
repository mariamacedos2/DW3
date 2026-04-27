export default class ProdutoModel {
  #produtos = [
    { id: 1, nome: 'Mouse', preco: 50 },
    { id: 2, nome: 'Teclado', preco: 120 },
    { id: 3, nome: 'Monitor', preco: 900 }
  ]

  #proximoId = 4

  findAll() {
    return this.#produtos
  }

  findById(id) {
    return this.#produtos.find(p => p.id === Number(id))
  }

  create(dados) {
    const novoProduto = {
      id: this.#proximoId++,
      nome: dados.nome,
      preco: dados.preco
    }

    this.#produtos.push(novoProduto)
    return novoProduto
  }

  delete(id) {
    const index = this.#produtos.findIndex(p => p.id === Number(id))

    if (index === -1) return false

    this.#produtos.splice(index, 1)
    return true
  }

  // 🔥 Exercício 6.2
  static validar(dados) {
    const erros = []

    if (!dados || typeof dados !== 'object') {
      return { valido: false, erros: ['Dados inválidos.'] }
    }

    if (!dados.nome || dados.nome.trim() === '') {
      erros.push('Nome é obrigatório.')
    }

    if (
      dados.preco === undefined ||
      typeof dados.preco !== 'number' ||
      dados.preco <= 0
    ) {
      erros.push('Preço deve ser um número maior que 0.')
    }

    if (erros.length > 0) {
      return { valido: false, erros }
    }

    return { valido: true }
  }
}