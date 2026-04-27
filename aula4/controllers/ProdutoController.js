import ProdutoModel from '../models/Produto.Model.js'

export default class ProdutoController {
  constructor() {
    this.model = new ProdutoModel()
  }

  async getAll(req, reply) {
    const produtos = this.model.findAll()
    return reply.send(produtos)
  }

  async getById(req, reply) {
    const { id } = req.params
    const produto = this.model.findById(id)

    if (!produto) {
      return reply.code(404).send({ erro: 'Produto não encontrado' })
    }

    return reply.send(produto)
  }

  async create(req, reply) {
    const resultado = ProdutoModel.validar(req.body)

    if (!resultado.valido) {
      return reply.code(400).send({ erros: resultado.erros })
    }

    const produto = this.model.create(req.body)
    return reply.code(201).send(produto)
  }

  async delete(req, reply) {
    const { id } = req.params
    const removido = this.model.delete(id)

    if (!removido) {
      return reply.code(404).send({ erro: 'Produto não encontrado' })
    }

    return reply.send({ mensagem: 'Produto removido com sucesso' })
  }
}