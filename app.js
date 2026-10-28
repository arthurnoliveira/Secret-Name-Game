let listaNumerosSortados = []
let numeroMaximo = 15
let botaoChutar = document.getElementById('chutar')
document.querySelector('.container__input').setAttribute('max', numeroMaximo)
let inputDigitado = document.querySelector('input')
function limparInput() {
  inputDigitado.value = ''
  inputDigitado.focus()
}

function exibirTextoNaTela(tag, texto) {
  let elemento = document.querySelector(tag)
  elemento.textContent = texto

  let botaoFala = document.getElementById(tag === 'h1' ? 'btn-speak-h1' : 'btn-speak-p')
  botaoFala.disabled = !elemento.textContent.trim()
}

function lerTexto(tag) {
  let texto = document.querySelector(tag).textContent.trim()
  if (texto && window.responsiveVoice) {
    window.responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2, pitch: 1, volume: 1 })
  }
}

document.getElementById('btn-speak-h1').addEventListener('click', () => lerTexto('h1'))
document.getElementById('btn-speak-p').addEventListener('click', () => lerTexto('p'))

exibirTextoNaTela('h1', 'Jogo do Número Secreto')
exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`)

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroMaximo) + 1

  if (listaNumerosSortados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio()
  } else {
    listaNumerosSortados.unshift(numeroEscolhido)
    if (listaNumerosSortados.length > 5) {
      listaNumerosSortados.pop()
    }
    return numeroEscolhido
  }
}

// function checkKIck() {
//   console.log(`o botão foi clicado e o valor do input é ${123}`);
// }

let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 0

function btReiniciar() {
  numeroSecreto = gerarNumeroAleatorio()
  tentativas = 0
  exibirTextoNaTela('h1', 'Jogo do Número Secreto')
  exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`)
  limparInput()
  document.getElementById('reiniciar').setAttribute('disabled', true)
  botaoChutar.removeAttribute('disabled')
}

function verificarNumero() {
  let chute = parseInt(document.querySelector('input').value)
  tentativas++
  let frase = tentativas == 1 ? 'tentativa' : 'tentativas'
  if (chute == numeroSecreto) {
    limparInput()
    exibirTextoNaTela('h1', 'Você acertou!')
    exibirTextoNaTela(
      'p',
      `Você descobriu o número secreto que é ${numeroSecreto} em ${tentativas} ${frase}!`
    )
    document.getElementById('reiniciar').removeAttribute('disabled', true)
    botaoChutar.setAttribute('disabled', true)
    btReiniciar
  } else if (chute > numeroSecreto) {
    limparInput()
    exibirTextoNaTela('h1', 'O número secreto é menor!')
    exibirTextoNaTela('p', `Você digitou ${chute}, tente novamente!`)
    document.getElementById('reiniciar').removeAttribute('disabled', true)
  } else {
    limparInput()
    exibirTextoNaTela('h1', 'O número secreto é maior!')
    exibirTextoNaTela('p', `Você digitou ${chute}, tente novamente!`)
    document.getElementById('reiniciar').removeAttribute('disabled', true)
  }
  console.log(listaNumerosSortados)
  console.log(numeroSecreto)
}
