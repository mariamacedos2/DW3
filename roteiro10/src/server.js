import Fastify from "fastify";
import produtoRoutes from "./modules/produtos/produto.routes.js";
import { errorHandler } from "./shared/http/error-handler.js";
import client from "./database/client.js";

const server = Fastify({
  logger: true
});

server.register(produtoRoutes);

server.setErrorHandler(errorHandler);

server.get("/laboratorio/tarefas-db", async (request, reply) => {
  const resultado = await client.query(`
    SELECT id, descricao, concluido, criada_em
    FROM tarefas
    ORDER BY id
  `);

  return reply.send(resultado.rows);
});

server.get("/laboratorio/tarefas-concluidas", async (request, reply) => {
  const resultado = await client.query(`
    SELECT *
    FROM tarefas
    WHERE concluido = true
    ORDER BY id
  `)

  return reply.send(resultado.rows)
})

server.post("/laboratorio/tarefas-db", async (request, reply) => {
  const { descricao } = request.body

  if (!descricao || descricao.trim() === "") {
    return reply.status(400).send({
      status: "error",
      message: "A descrição da tarefa é obrigatória"
    })
  }

  const resultado = await client.query(
    `
      INSERT INTO tarefas (descricao)
      VALUES ($1)
      RETURNING id, descricao, concluido, criada_em
    `,
    [descricao.trim()]
  )

  return reply.status(201).send(resultado.rows[0])
})

server.post("/laboratorio/tarefas-db-concluida", async (request, reply) => {
  const { descricao, concluido } = request.body

  const resultado = await client.query(
    `
      INSERT INTO tarefas (descricao, concluido)
      VALUES ($1, $2)
      RETURNING *
    `,
    [descricao, concluido]
  )

  return reply.status(201).send(resultado.rows[0])
})

const start = async () => {
  try {
    await client.connect();

    console.log("Conectado ao PostgreSQL com sucesso");

    await server.listen({ port: 3000 });

    console.log("Servidor rodando em http://localhost:3000");
  } catch (erro) {
    console.error("Falha ao iniciar aplicação:", erro);
    process.exit(1);
  }
};

start();