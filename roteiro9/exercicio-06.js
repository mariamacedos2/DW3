function processarPagamento(valor) {
  if (valor <= 0) {
    throw new Error('Valor inválido');
  }

  return 'Pagamento aprovado';
}

// TESTES (fora da função)

try {
  console.log(processarPagamento(100));
} catch (erro) {
  console.log(erro.message);
}

try {
  console.log(processarPagamento(0));
} catch (erro) {
  console.log(erro.message);
}

try {
  console.log(processarPagamento(-10));
} catch (erro) {
  console.log(erro.message);
}