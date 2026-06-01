async function buscarPedido(id) {
  if (id === undefined || id === null) {
    throw new Error('ID do pedido é obrigatório');
  }

  const pedido = await new Promise((resolve) => {
    setTimeout(() => {
      if (id !== 1) {
        resolve(null);
      } else {
        resolve({ id: 1, total: 150 });
      }
    }, 1000);
  });

  if (!pedido) {
    throw new Error('Pedido não encontrado');
  }

  return pedido;
}

async function executar() {
  try {
    const pedido = await buscarPedido(1);
    console.log(pedido);
  } catch (erro) {
    console.log(erro.message);
  }

  try {
    const pedido = await buscarPedido(99);
    console.log(pedido);
  } catch (erro) {
    console.log(erro.message);
  }

  try {
    const pedido = await buscarPedido();
    console.log(pedido);
  } catch (erro) {
    console.log(erro.message);
  }
}

executar();