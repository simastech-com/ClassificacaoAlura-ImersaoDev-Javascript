class Jogador {
    constructor(nome, imagem) {
        this.nome = nome;
        this.imagem = imagem;
        this.vitorias = 0;
        this.derrotas = 0;
        this.empates = 0;
        this.pontos = calcularPontos;
        this.resetar = resetarPontos;

        function calcularPontos() {
            return this.vitorias * 3 + this.empates;
        }

        function resetarPontos() {
            this.vitorias = 0;
            this.derrotas = 0;
            this.empates = 0;
        }
    }
}

var jogadores = [];

function adicionarJogador() {
    var elementoNomeJogador = document.getElementById("nomeJogador");
    var nomeJogador = elementoNomeJogador.value;

    var elementoImagemJogador = document.getElementById("linkImagemJogador");
    var linkImagemJogador = elementoImagemJogador.value;

    if (nomeJogador == "") {
        alert("Informe o nome do jogador!");
        return;
    }

    if (linkImagemJogador == "") {
        alert("Informe a imagem do jogador!");
        return;
    }

    nomeJogador = nomeJogador.toUpperCase();

    if (jogadores.length > 0) {
        for (var i = 0; i < jogadores.length; i++) {
            if (jogadores[i].nome == nomeJogador) {
                alert("Cada jogador deve ter um nome único!");
                return;
            }
        }
    }

    var jogador = new Jogador(nomeJogador, linkImagemJogador);
    jogadores.push(jogador);

    elementoNomeJogador.value = "";
    elementoImagemJogador.value = "";
    exibirJogadores();
}

function tratarNomeJogador(id) {
    var auxNome = id.split("_");
    return auxNome[1];
}

function excluirJogador(id) {
    var nomeJogador = tratarNomeJogador(id);

    for (var i = 0; i < jogadores.length; i++) {
        if (jogadores[i].nome == nomeJogador) {
            jogadores.splice(i, 1);
            break;
        }
    }

    exibirJogadores();
}

function adicionarVitoria(id) {
    var nomeJogador = tratarNomeJogador(id)
    for (var i = 0; i < jogadores.length; i++) {
        if (jogadores[i].nome == nomeJogador) {
            jogadores[i].vitorias++;
            break;
        }
    }

    exibirJogadores();
}

function adicionarEmpate() {
    for (var i = 0; i < jogadores.length; i++) {
        jogadores[i].empates++;
    }

    exibirJogadores();
}

function adicionarDerrota(id) {
    var nomeJogador = tratarNomeJogador(id)
    for (var i = 0; i < jogadores.length; i++) {
        if (jogadores[i].nome == nomeJogador) {
            jogadores[i].derrotas++;
            break;
        }
    }

    exibirJogadores();
}

function limparPontuacao() {
    jogadores.forEach(element => {
        element.resetar();
    });
    exibirJogadores();
}

function limparJogadores() {
    jogadores.splice(0, jogadores.length);
    exibirJogadores();
}

function exibirJogadores() {
    var elementoTabelaJogadores = document.getElementById("tabelaJogadores")

    var html = "";
    for (var i = 0; i < jogadores.length; i++) {
        html += `<tr>
                    <td><img src="${jogadores[i].imagem}"></td>
                    <td>${jogadores[i].nome}</td>
                    <td>${jogadores[i].vitorias}</td>
                    <td>${jogadores[i].empates}</td>
                    <td>${jogadores[i].derrotas}</td>
                    <td>${jogadores[i].pontos()}</td>
                    <td><button onClick="adicionarVitoria(${"'jogador_" + jogadores[i].nome + "'"})">Vitória</button></td>
                    <td><button onClick="adicionarDerrota(${"'jogador_" + jogadores[i].nome + "'"})">Derrota</button></td>
                    <td><button onClick="excluirJogador(${"'jogador_" + jogadores[i].nome + "'"})">Excluir</button></td>
                </tr>`;
    }

    elementoTabelaJogadores.innerHTML = html;
}