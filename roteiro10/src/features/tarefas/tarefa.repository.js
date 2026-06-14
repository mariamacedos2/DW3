import pool from '../../database/pool.js'

class TarefaRepository {
  async buscarTodos(descricao, concluido) {
    let sql = `
      SELECT *
      FROM tarefas
      WHERE 1=1
    `

    const params = []

    if (descricao) {
      params.push(`%${descricao}%`)
      sql += ` AND descricao ILIKE $${params.length}`
    }

    if (concluido !== undefined) {
      params.push(concluido === 'true')
      sql += ` AND concluido = $${params.length}`
    }

    sql += ' ORDER BY id'

    const resultado = await pool.query(sql, params)

    return resultado.rows
  }

  async buscarPorId(id) {
    const resultado = await pool.query(
      `
      SELECT *
      FROM tarefas
      WHERE id = $1
      `,
      [id]
    )

    return resultado.rows[0] ?? null
  }

  async salvar(tarefa) {
    const resultado = await pool.query(
      `
      INSERT INTO tarefas (descricao, concluido)
      VALUES ($1, $2)
      RETURNING *
      `,
      [tarefa.descricao, tarefa.concluido]
    )

    return resultado.rows[0]
  }

  async atualizar(id, dadosAtualizados) {
    const tarefaAtual = await this.buscarPorId(id)

    if (!tarefaAtual) return null

    const tarefaFinal = {
      ...tarefaAtual,
      ...dadosAtualizados
    }

    const resultado = await pool.query(
      `
      UPDATE tarefas
      SET descricao = $1,
          concluido = $2
      WHERE id = $3
      RETURNING *
      `,
      [
        tarefaFinal.descricao,
        tarefaFinal.concluido,
        id
      ]
    )

    return resultado.rows[0]
  }

  async remover(id) {
    const resultado = await pool.query(
      `
      DELETE FROM tarefas
      WHERE id = $1
      `,
      [id]
    )

    return resultado.rowCount > 0
  }

  async resumo() {
    const resultado = await pool.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE concluido = true) AS concluidas,
        COUNT(*) FILTER (WHERE concluido = false) AS pendentes
      FROM tarefas
    `)

    return resultado.rows[0]
  }
}

export default TarefaRepository