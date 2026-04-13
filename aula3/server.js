import Fastify from 'fastify'
import cors from '@fastify/cors'

const server = Fastify()

const PORT = 3000

const tarefas = [
    {id: 1, descricao: "Fazer compras", concluido: false}, 
    {id: 2, descricao: "Lavar o carro", concluido: false},
    {id: 3, descricao: "Estudar Fastify", concluido: true}
]

server.get('/tarefas/resumo', async (request, reply) => {

    const total = tarefas.length

    const concluidas = tarefas.filter(t => t.concluido).length

    const pendentes = total - concluidas

    return reply.send({
        total,
        concluidas,
        pendentes
    })
})

server.get('/tarefas', async (request, reply) => {
    const { busca, concluido } = request.query

    let resultado = tarefas

    if (busca) {
        resultado = resultado.filter(t =>
            t.descricao.toLowerCase().includes(busca.toLowerCase())
        )
    }

    if (concluido !== undefined) {
        const concluidoBoolean = concluido === 'true'

        resultado = resultado.filter(t =>
            t.concluido === concluidoBoolean
        )
    }

    return reply.send(resultado)
})

server.patch('/tarefas/:id', async (request, reply) => {
     const id = Number(request.params.id)
     const index = tarefas.findIndex(t => t.id === id)

       if (index === -1) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

        const tarefaAtualizada = request.body

       tarefas[index] = { ...tarefas[index], ...tarefaAtualizada, id }

    return reply.send(tarefas[index])
})

server.patch('/tarefas/:id/concluir', async (request, reply) => {
    const id = Number(request.params.id)

    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return reply.status(404).send({
            status: 'error',
            message: 'Tarefa não encontrada'
        })
    }

    tarefas[index].concluido = !tarefas[index].concluido

    return reply.send(tarefas[index])
})

server.post('/tarefas', async (request, reply) => {
    const { descricao, concluido } = request.body

    if (!descricao || descricao.trim() === '') {
        return reply.status(400).send({
            status: 'error',
            message: 'A descrição é obrigatória'
        })
    }

    const novoId = tarefas.length > 0 
        ? tarefas[tarefas.length - 1].id + 1 
        : 1

    const novaTarefa = {
        id: novoId,
        descricao,
        concluido: concluido ?? false
    }

    tarefas.push(novaTarefa)

    return reply.status(201).send(novaTarefa)
})

server.delete('/tarefas/:id', async (request, reply) => {

    const id = Number(request.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    // Se o índice for -1, significa que a tarefa não foi encontrada, e respondemos com um status 404 (Not Found) e uma mensagem de erro. O 'return' é crucial para garantir que a função pare de executar após enviar a resposta.
    if (index === -1) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    // O método .splice() é utilizado para remover um item do array. Ele recebe dois argumentos: o índice a partir do qual a remoção deve começar e o número de itens a serem removidos (neste caso, 1).
    tarefas.splice(index, 1)

    // Após a remoção, respondemos com um status 204 (No Content), indicando que a operação foi bem-sucedida, mas não há conteúdo para retornar.
    return reply.status(204).send()
})

// Registramos o plugin de CORS para permitir que qualquer origem acesse nossa API
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

server.setNotFoundHandler((request, reply) => {

  return reply.status(404).send({
    status: 'error',
    message: 'O recurso solicitado não existe nesta API.',
  })

})

// Função para iniciar o servidor. Usamos async/await para lidar com a natureza assíncrona do processo de inicialização do servidor.
const start = async () => {
    // O bloco try/catch é utilizado para lidar com possíveis erros que possam ocorrer durante a inicialização do servidor, como a porta já estar em uso. Se o servidor iniciar com sucesso, ele exibirá uma mensagem no console indicando que está rodando. Caso contrário, o erro será logado e o processo será encerrado com um código de saída 1, indicando que houve uma falha.
    try {
        await server.listen({port: PORT})
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    } catch (erro) {
        console.error(erro)
        process.exit(1)
    }
}

// Chamamos a função start para iniciar o servidor
	start() 