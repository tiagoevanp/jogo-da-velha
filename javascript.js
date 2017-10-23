// Estado da Aplicação
// Aqui vão todas as variáveis que serão modificadas durante o andamento do jogo

const tabuleiro = [
  [ ' ', ' ', ' ' ],
  [ ' ', ' ', ' ' ],
  [ ' ', ' ', ' ' ],
];
let ultimaJogada;

// Lógica da Aplicação
// Aqui vão todas as rotinas que modificam o estado da aplicação SEM efeitos colaterais (mudanças visuais, por exemplo)

const limparTabuleiro = () => {
  tabuleiro[0] = [ ' ', ' ', ' ' ];
  tabuleiro[1] = [ ' ', ' ', ' ' ];
  tabuleiro[2] = [ ' ', ' ', ' ' ];
};

const marcar = (i, j, char) => {
  tabuleiro[i][j] = char;
  ultimaJogada = char;
};

const calcularVencedor = () => {
  // Linha cheia
  for (let i = 0; i <= 2; ++i) {
    if (tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][1] === tabuleiro[i][2] && tabuleiro[i][0] !== ' ') {
      return tabuleiro[i][0];
    }
  }

  // Coluna cheia
  for (let j = 0; j <= 2; ++j) {
    if (tabuleiro[0][j] === tabuleiro[1][j] && tabuleiro[1][j] === tabuleiro[2][j] && tabuleiro[0][j] !== ' ') {
      return tabuleiro[0][j];
    }
  }

  // Diagonal principal cheia
  if (tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2] && tabuleiro[0][0] !== ' ') {
    return tabuleiro[0][0];
  }

  // Diagonal inversa cheia
  if (tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0] && tabuleiro[0][2] !== ' ') {
    return tabuleiro[0][2];
  }

  // Empate
  let preenchidos = 0;

  for (let i = 0; i <= 2; ++i) {
    for (let j = 0; j <= 2; ++j) {
      if (tabuleiro[i][j] !== ' ') {
        ++preenchidos;
      }
    }
  }

  if (preenchidos === 9) {
    return 'empate';
  }

  return 'nenhum';
};

// Apresentação da Aplicação
// Aqui vai tudo responsável por exibir a aplicação para o usuário, bem como reagir às ações dele

window.onload = function () {
  const botoes = [
    document.getElementById('marcar-0-0'),
    document.getElementById('marcar-0-1'),
    document.getElementById('marcar-0-2'),
    document.getElementById('marcar-1-0'),
    document.getElementById('marcar-1-1'),
    document.getElementById('marcar-1-2'),
    document.getElementById('marcar-2-0'),
    document.getElementById('marcar-2-1'),
    document.getElementById('marcar-2-2')
  ];

  const exibirTabuleiro = () => {
      let saida = tabuleiro.map(
      linha => linha.join('|')
      ).join('\n-+-+-\n');

      let vencedor = calcularVencedor();

      if (vencedor !== 'nenhum') {
          saida += '\nVencedor: ' + vencedor;
      }

      document.getElementById('tabuleiro').innerHTML = saida.replace(/ /g, '&nbsp;').replace(/\n/g, '<br />');
  }

  const atualizarBotoes = () => {
    const vencedor = calcularVencedor();
    if (vencedor !== 'nenhum') {
      desabilitarBotoes();
    }
  };

  const criarHandlerParaMarcar = (i, j) => function () {
    marcar(i, j, ultimaJogada === 'x' ? 'o' : 'x');
    exibirTabuleiro();
    calcularVencedor();
    atualizarBotoes();
    this.disabled = true;
  };

  const habilitarBotoes = () => {
    botoes.forEach(botao => {
      botao.disabled = false;
    });
  };

  const desabilitarBotoes = () => {
    botoes.forEach(botao => {
      botao.disabled = true;
    });
  };

  botoes[0].addEventListener('click', criarHandlerParaMarcar(0, 0), false);
  botoes[1].addEventListener('click', criarHandlerParaMarcar(0, 1), false);
  botoes[2].addEventListener('click', criarHandlerParaMarcar(0, 2), false);
  botoes[3].addEventListener('click', criarHandlerParaMarcar(1, 0), false);
  botoes[4].addEventListener('click', criarHandlerParaMarcar(1, 1), false);
  botoes[5].addEventListener('click', criarHandlerParaMarcar(1, 2), false);
  botoes[6].addEventListener('click', criarHandlerParaMarcar(2, 0), false);
  botoes[7].addEventListener('click', criarHandlerParaMarcar(2, 1), false);
  botoes[8].addEventListener('click', criarHandlerParaMarcar(2, 2), false);

  exibirTabuleiro();

  const nj = document.getElementById('nj');

  nj.addEventListener('click', function (){
      limparTabuleiro();
      exibirTabuleiro();
      habilitarBotoes();
  },false);
}
