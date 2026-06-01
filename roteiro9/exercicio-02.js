function criarProduto(dados) {
  if (!dados.nome) {
    throw new Error('Nome é obrigatório');
  }

  if (typeof dados.preco !== 'number' || dados.preco <= 0) {
    throw new Error('Preço deve ser um número maior que zero');
  }

  if (
    typeof dados.estoque !== 'number' ||
    !Number.isInteger(dados.estoque) ||
    dados.estoque < 0
  ) {
    throw new Error(
      'Estoque deve ser um número inteiro maior ou igual a zero'
    );
  }

  return {
    nome: dados.nome,
    preco: dados.preco,
    estoque: dados.estoque
  };
}

try {
  const produto = criarProduto({
    nome: 'Teclado',
    preco: 150,
    estoque: 10
  });

  console.log(produto);
} catch (erro) {
  console.log(erro.message);
}

try {
  const produto = criarProduto({
    preco: 150,
    estoque: 10
  });

  console.log(produto);
} catch (erro) {
  console.log(erro.message);
}

try {
  const produto = criarProduto({
    nome: 'Mouse',
    preco: -50,
    estoque: 10
  });

  console.log(produto);
} catch (erro) {
  console.log(erro.message);
}

try {
  const produto = criarProduto({
    nome: 'Monitor',
    preco: 1000,
    estoque: 1.5
  });

  console.log(produto);
} catch (erro) {
  console.log(erro.message);
}