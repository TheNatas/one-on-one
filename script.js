// PLAYERS

const player1 = {
  name: 'player 1',
  playerElem: document.querySelector('.player--1'),
  totalScoreElem: document.querySelector('#score--1'),
  currentScoreElem: document.querySelector('#current--1'),
  totalScore: 0,
  currentScore: 0
};
const player2 = {
  name: 'player 2',
  playerElem: document.querySelector('.player--2'),
  totalScoreElem: document.querySelector('#score--2'),
  currentScoreElem: document.querySelector('#current--2'),
  totalScore: 0,
  currentScore: 0
};

// ELEMENTS

const diceElem = document.querySelector('.dice');
const winnerElem = document.querySelector('.winner');
const instructions = document.querySelector('.how-to-play');
const overlay = document.querySelector('.overlay');

const btnNew = document.querySelector('.btn--new');
const btnHow = document.querySelector('.btn--how');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnCloseInstructions = document.querySelector('.close-instructions');

// GAME CONTROLS

let currentPlayer = player1;

// FUNCTIONS

const togglePlayer = function(){
  currentPlayer.currentScore = 0;
  currentPlayer.currentScoreElem.textContent = 0;
  currentPlayer = currentPlayer === player1 ? player2 : player1;
  player1.playerElem.classList.toggle('player--active');
  player2.playerElem.classList.toggle('player--active');
};

const rollDice = function(){
  const dice = Math.trunc(Math.random() * 6) + 1;

  diceElem.src = `dice-${dice}.png`;
  diceElem.classList.remove('hidden');

  if (dice !== 1){
    currentPlayer.currentScore += dice;

    currentPlayer.currentScoreElem.textContent = currentPlayer.currentScore;
  }else{
    togglePlayer();
  }
};

const holdScore = function(){
  currentPlayer.totalScore += currentPlayer.currentScore;
  
  currentPlayer.totalScoreElem.textContent = currentPlayer.totalScore;

  if (currentPlayer.totalScore >= 100){
    diceElem.classList.add('hidden');
    currentPlayer.playerElem.classList.add('player--winner');
    currentPlayer.playerElem.classList.remove('player--active');
    gameOver(currentPlayer);
  }else{
    togglePlayer();
  }
};

const gameOver = function(winner){
  btnRoll.removeEventListener('click', rollDice);
  btnHold.removeEventListener('click', holdScore);
  btnRoll.style.cursor = 'not-allowed';
  btnHold.style.cursor = 'not-allowed';

  winnerElem.textContent = `${winner.name} wins!`;
  winnerElem.classList.remove('hidden');

};

const newGame = function(){
  diceElem.classList.add('hidden');
  winnerElem.classList.add('hidden');

  currentPlayer = player1;
  player1.totalScore = 0;
  player1.currentScore = 0;
  player2.totalScore = 0;
  player2.currentScore = 0;

  player1.totalScoreElem.textContent = 0;
  player1.currentScoreElem.textContent = 0;
  player2.totalScoreElem.textContent = 0;
  player2.currentScoreElem.textContent = 0;

  player1.playerElem.classList.remove('player--winner');
  player2.playerElem.classList.remove('player--winner');
  player1.playerElem.classList.add('player--active');

  btnRoll.addEventListener('click', rollDice);
  btnHold.addEventListener('click', holdScore);

  btnRoll.style.cursor = 'pointer';
  btnHold.style.cursor = 'pointer';
};

const displayInstructions = function(){
  overlay.classList.remove('hidden');
  instructions.classList.remove('hidden');

  overlay.addEventListener('click', closeInstructions);
  document.addEventListener('keydown', handleKeyPress);
};

const closeInstructions = function(){
  overlay.classList.add('hidden');
  instructions.classList.add('hidden');

  document.removeEventListener('keydown', handleKeyPress);
};

const handleKeyPress = function(e){
  if (e.key === 'Escape') closeInstructions();
};

// START

newGame();
btnNew.addEventListener('click', newGame);

// INSTRUCTIONS

btnHow.addEventListener('click', displayInstructions);
btnCloseInstructions.addEventListener('click', closeInstructions);