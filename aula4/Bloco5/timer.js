class Timer {
  constructor(nome) {
    this.nome = nome
    this.segundos = 0
  }

  iniciar() {
    setInterval(() => {
      this.segundos++
      console.log(`${this.nome}: ${this.segundos}s`)
    }, 1000)
  }
}

// TESTE
const t = new Timer('Cronômetro')
t.iniciar()

//1. Qual é o erro e por que ele acontece?
//O erro ocorre porque a função passada ao setInterval é uma função tradicional, que possui seu próprio this. Como essa função é executada fora do contexto da classe, o this deixa de apontar para o objeto Timer, fazendo com que this.segundos e this.nome não funcionem corretamente.

//2. Corrija o código usando arrow function.
//iniciar() {
//  setInterval(() => {
//    this.segundos++
//    console.log(`${this.nome}: ${this.segundos}s`)
//  }, 1000)
//}

//3. O que muda no comportamento do this ao usar arrow function?
//Ao utilizar uma arrow function, o this não é recriado. Em vez disso, ele herda o valor do contexto onde foi definido, que neste caso é o objeto da classe Timer. Dessa forma, o this continua apontando corretamente para o objeto, permitindo acessar seus atributos.