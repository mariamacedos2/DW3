import pool from '../../database/pool.js'

class TarefaRepository {
  async buscarTodos(descricao, concluido) {
    let sql = `
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
      FROM tarefas t
      LEFT JOIN projetos p
        ON p.id = t.projeto_id
      WHERE 1=1
    `

    const params = []

    if (descricao) {
      params.push(`%${descricao}%`)
      sql += ` AND t.descricao ILIKE $${params.length}`
    }

    if (concluido !== undefined) {
      params.push(concluido === 'true')
      sql += ` AND t.concluido = $${params.length}`
    }

    sql += ' ORDER BY t.id'

    const resultado = await pool.query(sql, params)

    return resultado.rows
  }

  async buscarPorId(id) {
    const resultado = await pool.query(
      `
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
      FROM tarefas t
      LEFT JOIN projetos p
        ON p.id = t.projeto_id
      WHERE t.id = $1
      `,
      [id]
    )

    return resultado.rows[0] ?? null
  }

  async salvar(tarefa) {
    const resultado = await pool.query(
      `
      INSERT INTO tarefas (
        descricao,
        concluido,
        projeto_id
      )
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [
        tarefa.descricao,
        tarefa.concluido,
        tarefa.projetoId
      ]
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
          concluido = $2,
          projeto_id = $3
      WHERE id = $4
      RETURNING *
      `,
      [
        tarefaFinal.descricao,
        tarefaFinal.concluido,
        tarefaFinal.projeto_id,
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

  async buscarPorProjeto(projetoId) {
    const resultado = await pool.query(
      `
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
      FROM tarefas t
      INNER JOIN projetos p
        ON p.id = t.projeto_id
      WHERE p.id = $1
      ORDER BY t.id
      `,
      [projetoId]
    )

    return resultado.rows
  }
}

export default TarefaRepository