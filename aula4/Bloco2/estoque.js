class Estoque {
  constructor() {
    this.produtos = []
  }

  cadastrar(nome, quantidade) {
    const existe = this.produtos.find(p => p.nome === nome)

    if (existe) {
      console.log("Produto já cadastrado.")
      return
    }

    this.produtos.push({ nome, quantidade })
  }

  entrada(nome, quantidade) {
    const produto = this.produtos.find(p => p.nome === nome)

    if (!produto) {
      console.log("Produto não encontrado.")
      return
    }

    produto.quantidade += quantidade
  }

  saída(nome, quantidade) {
    const produto = this.produtos.find(p => p.nome === nome)

    if (!produto) {
      console.log("Produto não encontrado.")
      return
    }

    if (produto.quantidade < quantidade) {
      console.log("Quantidade insuficiente.")
      return
    }

    produto.quantidade -= quantidade
  }

  exibir() {
    this.produtos.forEach(p => {
      console.log(`${p.nome}: ${p.quantidade} unidades`)
    })
  }
}

// Teste
const estoque = new Estoque()

estoque.cadastrar("Caneta", 20)
estoque.cadastrar("Caderno", 10)

estoque.entrada("Caneta", 10)
estoque.saída("Caderno", 2)

estoque.exibir()