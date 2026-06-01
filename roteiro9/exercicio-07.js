class ValidationError extends Error {
  constructor(message, details = []) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

function validarAluno(aluno) {
  const erros = [];

  if (!aluno.nome) {
    erros.push('Nome é obrigatório');
  }

  if (!aluno.email || !aluno.email.includes('@')) {
    erros.push('Email inválido');
  }

  if (typeof aluno.idade !== 'number' || aluno.idade < 16) {
    erros.push('Idade deve ser número e maior ou igual a 16');
  }

  if (erros.length > 0) {
    throw new ValidationError('Erro de validação', erros);
  }

  return true;
}

try {
  console.log(validarAluno({
    nome: 'Ana',
    email: 'ana@email.com',
    idade: 20
  }));
} catch (erro) {
  console.log(erro.message);
  console.log(erro.details);
}

try {
  console.log(validarAluno({
    nome: '',
    email: 'email-invalido',
    idade: 10
  }));
} catch (erro) {
  console.log(erro.name);
  console.log(erro.message);
  console.log(erro.details);
}