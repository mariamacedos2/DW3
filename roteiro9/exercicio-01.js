function dividir(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Os valores devem ser números');
  }

  if (b === 0) {
    throw new Error('Não é possível dividir por zero');
  }

  return a / b;
}

try {
  const resultado = dividir(10, 2);
  console.log(resultado);
} catch (erro) {
  console.log(erro.message);
}

try {
  const resultado = dividir(10, 0);
  console.log(resultado);
} catch (erro) {
  console.log(erro.message);
}

try {
  const resultado = dividir('10', 2);
  console.log(resultado);
} catch (erro) {
  console.log(erro.message);
}