import Fastify from "fastify";
import produtoRoutes from "./modules/produtos/produto.routes.js";
import tarefaRoutes from "./features/tarefas/tarefa.route.js";
import { errorHandler } from "./shared/http/error-handler.js";
import pool from "./database/pool.js";

const server = Fastify({
  logger: true
});

server.register(produtoRoutes);
server.register(tarefaRoutes);

server.setErrorHandler(errorHandler);

const start = async () => {
  try {
    await pool.query('SELECT 1')

    console.log("Conectado ao PostgreSQL com sucesso")

    await server.listen({ port: 3000 })

    console.log("Servidor rodando em http://localhost:3000")
  } catch (erro) {
    console.error("Falha ao iniciar aplicação:", erro)
    process.exit(1)
  }
}

start();