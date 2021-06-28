'use strict';

const diceElm = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');


const closeModal = function(){
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

let score,activePlayer,highScore,playing;

//Reseting Game Function
const init = function(){
score=0;
activePlayer= 0;
highScore = [0,0];
playing = true;
diceElm.classList.add('hidden');
document.querySelector('.winning--0').classList.add('hidden');
document.querySelector('.winning--1').classList.add('hidden');
document.getElementById('current--0').textContent=0;
document.getElementById('current--1').textContent=0;
document.getElementById('score--0').textContent=0;
document.getElementById('score--1').textContent=0;
player0.classList.remove('player--winner')
player1.classList.remove('player--winner');
player0.classList.add('player--active');
player1.classList.remove('player--active');
}

//Reseting the Game to Initial State
init();

//Switch Player Function
const switchPlayer= function (){
  document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer ===0 ? 1:0;
    score =0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}
 //When the Roll button is Pressed
document.querySelector('.btn--roll').addEventListener('click', function(){
  if(playing){
  //Create a Random Number
  const dice = Math.trunc((Math.random() *6))+1;
  console.log(dice); 
  
  //Display the Dice 
  diceElm.src = `DiceImg/dice-${dice}.png`;
  diceElm.classList.remove('hidden');

  //Check if the dice is 1
  if (dice!==1){
  //Store the score
  score += dice;

  //Display the score on the active player card
  document.getElementById(`current--${activePlayer}`).textContent = score;

  } 
  else {
    switchPlayer(); 
  }
  }
})

//When the Hold Button Is placed
document.querySelector('.btn--hold').addEventListener('click', function(){
  if(playing){
   highScore[activePlayer] += score;
   document.getElementById(`score--${activePlayer}`).textContent = highScore[activePlayer];

   if (highScore[activePlayer] >= 100) {
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
     
      document.querySelector(`.winning--${activePlayer}`).classList.remove('hidden');
      playing = false;
      
   }
    else {
   switchPlayer();
    }
  }
})

//When The New Game Button Is Pressed 
document.querySelector('.btn--new').addEventListener('click',init);

document.querySelector('.btn--rules').addEventListener('click',function(){
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
})

//Modal Close Button
document.querySelector('.close-modal').addEventListener('click',closeModal);

//Overlay Click Close
document.querySelector('.overlay').addEventListener('click',closeModal);

//New Names Button 
document.querySelector('.btn--names').addEventListener('click',function(){
  const name1 = prompt('Enter Player 1 Name');
  if (name1)
  document.getElementById('name--0').textContent = name1;
  else 
  document.getElementById('name--0').textContent = "Player 1";
  
  const name2 = prompt('Enter Player 2 Name');
  if (name2)
  document.getElementById('name--1').textContent = name2;
  else 
  document.getElementById('name--1').textContent = "Player 2";
})