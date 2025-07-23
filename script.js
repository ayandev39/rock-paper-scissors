const choices = ['rock', 'paper', 'scissors'];
const buttons = document.querySelectorAll('.choice');
const resultDiv = document.getElementById('result');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const loader = document.getElementById('loader');
const restartBtn = document.getElementById('restart-btn');

let playerScore = 0;
let computerScore = 0;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const playerChoice = button.dataset.choice;
    showLoader();
    setTimeout(() => {
      const computerChoice = getComputerChoice();
      const result = getResult(playerChoice, computerChoice);
      displayResult(result, playerChoice, computerChoice);
      updateScores(result);
      hideLoader();
    }, 1000);
  });
});

restartBtn.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  resultDiv.textContent = '';
  resultDiv.className = 'result';
});

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'win';
  return 'lose';
}

function displayResult(result, player, computer) {
  let message = '';
  resultDiv.className = 'result';

  if (result === 'win') {
    message = `✅ You Win! ${capitalize(player)} beats ${computer}`;
    resultDiv.classList.add('win');
  } else if (result === 'lose') {
    message = `❌ You Lose! ${capitalize(computer)} beats ${player}`;
    resultDiv.classList.add('lose');
  } else {
    message = `🤝 It's a Draw! You both chose ${player}`;
    resultDiv.classList.add('draw');
  }

  resultDiv.textContent = message;
}

function updateScores(result) {
  if (result === 'win') {
    playerScore++;
    playerScoreEl.textContent = playerScore;
  } else if (result === 'lose') {
    computerScore++;
    computerScoreEl.textContent = computerScore;
  }
}

function showLoader() {
  loader.classList.remove('hidden');
  resultDiv.textContent = '';
  resultDiv.className = 'result';
}

function hideLoader() {
  loader.classList.add('hidden');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}