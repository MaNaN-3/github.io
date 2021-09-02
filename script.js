'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let activePlayer;

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const dice = document.querySelector('.dice');

const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let current0;
let current1;

let score0;
let score1;

let playing;
//starting condition
const start = function () {
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0 = 0;
  current1 = 0;
  score1 = 0;
  score0 = 0;
  playing = true;
  current1El.textContent = current1;
  current0El.textContent = current0;
  dice.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
start();
const playerswap = function () {
  if (playing) {
    current0El.textContent = 0;
    current1El.textContent = 0;
    current0 = 0;
    current1 = 0;
    if (player0.classList.contains('player--active')) {
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    } else {
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
    }
  }
};

const wincheck = function (player, score) {
  if (score.textContent >= 100) {
    player.classList.add('player--winner');
    playing = false;
  }
};

const newgame = function () {
  start();
};
const rollDice = function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      if (player0.classList.contains('player--active')) {
        current0 += diceNumber;
        current0El.textContent = current0;
      } else {
        current1 += diceNumber;
        current1El.textContent = current1;
      }
    } else {
      playerswap();
    }
  }
};

const holdscore = function () {
  if (playing) {
    if (player0.classList.contains('player--active')) {
      score0 += current0;
      score0El.textContent = score0;
      current0 = 0;
      current0El.textContent = current0;
      wincheck(player0, score0El);
      playerswap();
    } else {
      score1 += current1;
      score1El.textContent = score1;
      current1 = 0;
      current1El.textContent = current1;
      wincheck(player1, score1El);
      playerswap();
    }
  }
};

if (playing) {
  btnroll.addEventListener('click', rollDice);
  btnhold.addEventListener('click', holdscore);
}

btnNew.addEventListener('click', newgame);
