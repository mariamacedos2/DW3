import Fastify from 'fastify'

// Criamos uma instância do servidor Fastify
const server = Fastify()

// Definimos a porta onde o servidor irá rodar
const PORT = 3000

// Nosso "banco de dados" em memória, onde as tarefas serão armazenadas. Cada tarefa é um objeto com um ID, descrição e status de conclusão.
const tarefas = [
    {id: 1, descricao: "Fazer compras", concluido: false}, 
    {id: 2, descricao: "Lavar o carro", concluido: false},
    {id: 3, descricao: "Estudar Fastify", concluido: true}
]

server.get('/tarefas', async (request, reply) => {
    return reply.send(tarefas)
})

// C: Criar uma nova tarefa (CREATE)
server.post('/tarefas', async (request, reply) => {
    // É no body (corpo) que moram os objetos empacotados pelo front end
    const tarefa = request.body

    // Gerando um ID automaticamente no Backend (simulando um Banco de Dados)
    const novoId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1
    const novaTarefa = { id: novoId, ...tarefa }

    tarefas.push(novaTarefa)

    // Devolver Status 201 é a prática mundial padrão indicando "Recurso Criado com Sucesso"
    return reply.status(201).send(novaTarefa)
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