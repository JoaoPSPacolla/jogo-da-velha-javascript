const jogadorAtual = document.querySelector(".jogadorAtual");

let jogadas; //

let playerX = prompt("Digite o nome do jogador X:");
let playerO = prompt("Digite o nome do jogador O:");

let player = "X";

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

/* Inicio */
function init() {
  jogadas = []; //Aqui, o array de jogadas é resetado toda vez que uma nova jogada começa, assim não fica armazenado jogadas de partidas anteriores

  let name;

  if (player === "X") {
      name = playerX;
  } else {
      name = playerO;
  }

  jogadorAtual.innerHTML = `É A VEZ DE: ${name}`; //Insere embaixo dos quadrados do jogo

  //Esse forEach percorre cada botão (item), limpa o conteúdo HTML nele e CHAMA A FUNÇÃO NEWMOVE quando o evento CLICK acontecer
  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

init(); //Essa chamada ocorre apenas na primeria vez que o site é carregado

/* Função para nova jogada */
function newMove(movi) {
  const index = movi.target.getAttribute("id");
  movi.target.innerHTML = player;
  movi.target.removeEventListener("click", newMove);
  jogadas[index] = player;

  setTimeout(() => {
    check();
  }, [100]);
 
  if(player === "X")
    player = "O"
  else
    player = "X"

  let name;

  if (player === "X") {
      name = playerX;
  } else {
      name = playerO;
  }

  jogadorAtual.innerHTML = `É A VEZ DE: ${name}`;
}

/* Função para checar o estado do jogo */
function check() {
  let jogadorUltimaJogada

  if(player === "X")
    jogadorUltimaJogada = "X"
  else
    jogadorUltimaJogada = "O"

  const items = jogadas
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      let winner = playerLastMove === "X" ? playerX : playerO;
      alert("O JOGADOR '" + winner + "' GANHOU!");
      init();
      return;
    }
  }

  if (jogadas.filter((item) => item).length === 9) {
    alert("DEU EMPATE!");
    init();
    return;
  }
}
