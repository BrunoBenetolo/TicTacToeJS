const vetorCasa = document.getElementsByClassName("casa");
const jogadorSelecionado = document.getElementsByClassName("wrp");
const tabuleiro = document.getElementById("wrapper-tab");
const wrpVencedor = document.getElementById("wrappper-vencedor");
const txtVencedor = document.getElementById("txt-vencedor");
const txtPlacarX = document.getElementById("placar-x");
const txtPlacarO = document.getElementById("placar-o");


const desenhoX = '<i class="fas fa-times xis"></i>';
const desenhoO = '<i class="far fa-circle circle"></i>';
const molde = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let matriz = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let jogador = 1;
let ganhador = false;
let vez = 0;//alterar quando mudar para outro jogador, implementar botao para isso;
let placarX = 0, placarO = 0;

const btReset = document.getElementById("bt-reset");
const bt1 = document.getElementById("1");
const bt2 = document.getElementById("2");
const bt3 = document.getElementById("3");
const bt4 = document.getElementById("4");
const bt5 = document.getElementById("5");
const bt6 = document.getElementById("6");
const bt7 = document.getElementById("7");
const bt8 = document.getElementById("8");
const bt9 = document.getElementById("9");

bt1.onclick = () => {
    jogar(0, 0);

}
bt2.onclick = () => {
    jogar(0, 1);


}
bt3.onclick = () => {
    jogar(0, 2);


}
bt4.onclick = () => {
    jogar(1, 0);

}
bt5.onclick = () => {
    jogar(1, 1);


}
bt6.onclick = () => {
    jogar(1, 2);


}
bt7.onclick = () => {
    jogar(2, 0);

}
bt8.onclick = () => {
    jogar(2, 1);


}
bt9.onclick = () => {
    jogar(2, 2);


}
btReset.onclick = event => {
    if (event.detail === 1) {
        reiniciarJogo();
    } else if (event.detail === 2) {
        zerarPlacar();
    }

}

function alternaJogador() {
    ++vez;
    if (vez % 2 === 0) {
        jogador = 1;
        jogadorSelecionado[0].classList.add("select");
        jogadorSelecionado[1].classList.remove("select");
    } else {
        jogador = -1;
        jogadorSelecionado[1].classList.add("select");
        jogadorSelecionado[0].classList.remove("select");
    }
}

function marcarJogada(quemJoga, posicao) {
    if (quemJoga === 1) {
        vetorCasa[posicao - 1].innerHTML += desenhoX;

    } else if (quemJoga === -1) {
        vetorCasa[posicao - 1].innerHTML += desenhoO;

    }
    alternaJogador();
}

function verificaGanhador() {
    let somaLinhas = 0, somaCol = 0, somaDiagonal1 = 0, somaDiagonal2 = 0;
    //linhas
    for (var i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            somaLinhas += matriz[i][j];
            if (i === j) {
                somaDiagonal1 += matriz[i][j];
            }
            if ((i + 1) + (j + 1) == 4) {
                somaDiagonal2 += matriz[i][j];
            }
        }
        if (somaLinhas === 3 || somaLinhas === -3 || somaDiagonal1 === 3 || somaDiagonal1 === -3 || somaDiagonal2 === 3 || somaDiagonal2 === -3) {
            return ganhador = jogador * -1
        }
        else {
            somaLinhas = 0;
            ganhador = 0;
        }
    }
    //colunas
    for (var j = 0; j < 3; j++) {
        for (i = 0; i < 3; i++) {
            somaCol += matriz[i][j];
        }

        if (somaCol === 3 || somaCol === -3) {
            return ganhador = jogador * -1;
        } else {
            somaCol = 0;
            ganhador === 0;
        }
    }
}

function jogar(i, j) {
    if (!matriz[i][j] && !ganhador) {
        matriz[i][j] = jogador;
        marcarJogada(jogador, molde[i][j]);
        let ganhou = verificaGanhador();
        if (ganhou === 1 || ganhou === -1) {
            tabuleiro.style.display = "none";
            wrpVencedor.style.display = "flex";

            if (ganhou === 1) {
                txtVencedor.innerHTML += desenhoX;
                txtPlacarX.innerHTML = "<h2>" + ++placarX + "</h2>";
                jogadorSelecionado[0].classList.remove("select");
                jogadorSelecionado[1].classList.remove("select");
            } else if (ganhou === -1) {
                txtVencedor.innerHTML += desenhoO;
                txtPlacarO.innerHTML = "<h2>" + ++placarO + "</h2>";
                jogadorSelecionado[0].classList.remove("select");
                jogadorSelecionado[1].classList.remove("select");
            }
        } else {
            if (vez === 9) {
                tabuleiro.style.display = "none";
                wrpVencedor.style.display = "flex";
                txtVencedor.innerHTML += desenhoX + desenhoO;
                jogadorSelecionado[0].classList.remove("select");
                jogadorSelecionado[1].classList.remove("select");
            }
        }
    } else return;
}

function reiniciarJogo() {
    tabuleiro.style.display = "flex";
    wrpVencedor.style.display = "none";
    jogadorSelecionado[0].classList.add("select");
    jogadorSelecionado[1].classList.remove("select");
    matriz = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    jogador = 1;
    ganhador = 0;
    vez = 0;
    for (var i = 0; i < vetorCasa.length; i++) {
        vetorCasa[i].innerHTML = "";
    }
    txtVencedor.innerHTML = "";

}
function zerarPlacar() {
    reiniciarJogo();
    txtPlacarX.innerHTML = "<h2>-</h2>";
    txtPlacarO.innerHTML = "<h2>-</h2>";
    doisCliques = 1;
    placarO = 0;
    placarX = 0;
}