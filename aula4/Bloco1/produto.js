class Produto {
  constructor(nome, preco, estoque) {
    this.nome = nome
    this.preco = preco
    this.estoque = estoque
  }

  disponivel() {
    return this.estoque > 0
  }

  exibir() {
    const status = this.disponivel() ? "Em estoque" : "Fora de estoque"
    console.log(`${this.nome} — R$ ${this.preco.toFixed(2)} — ${status}`)
  }
}

// Teste
const p1 = new Produto("Notebook", 3500, 10)
const p2 = new Produto("Fone de ouvido", 150, 0)

p1.exibir()
p2.exibir()