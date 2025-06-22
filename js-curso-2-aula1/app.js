let numerosSorteados = [];
let numeroLimite = 10;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementos = numerosSorteados.length;
    if (quantidadeElementos == numeroLimite) {
        numerosSorteados = [];
    }
    if (numerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
        let chute = document.querySelector('input');
        chute.value = '';
    }

function reiniciarJogo() {
        numeroSecreto = gerarNumeroAleatorio();
        limparCampo();
        tentativas = 1;
        exibirMensagemInicial();
        document.getElementById('reiniciar').setAttribute('disabled', true);
    }

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensagemInicial();

function verificarChute() {
    chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('p', `Você descobriu o número secreto ${tentativas} ${palavraTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');;
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}! Tente novamente!`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}! Tente novamente!`);
        }
        tentativas++;
        limparCampo();
    }
}