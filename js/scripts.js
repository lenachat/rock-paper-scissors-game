// read the score from local storage or set default score
let score = JSON.parse(localStorage.getItem('score')) ||
{
    wins: 0,
    losses: 0,
    ties: 0
};

// reset the game score
function reset() {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
    localStorage.setItem('score', JSON.stringify(score));
    displayScore();
    document.querySelector('.result').innerHTML = 'Pick a move';
    document.querySelector('.result').classList.add('blinking-text');
    updateMovesDisplay('', '', 0, 0);
}

// display current score
function displayScore() {
    document.querySelector('.score-overview').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// update moves display
function updateMovesDisplay(playerMove, computerMove, playerWins, computerWins) {
    document.querySelector('.your-move').innerHTML = playerMove ? `<img src="media/images/${playerMove}-emoji.png" class="move-icons">` : '';
    document.querySelector('.your-wins').innerHTML = playerWins;
    document.querySelector('.computer-move').innerHTML = computerMove ? `<img src="media/images/${computerMove}-emoji.png" class="move-icons">` : '';
    document.querySelector('.computer-wins').innerHTML = computerWins;
}

// handle page load
document.addEventListener("DOMContentLoaded", () => {
    displayScore();
    document.querySelector('.result').innerHTML = 'Pick a move';
    document.querySelector('.result').classList.add('blinking-text');
    updateMovesDisplay('', '', score.wins, score.losses);
    document.querySelector('.reset').addEventListener('click', reset);
});

// check if either of the players has 5 points and show modal
function checkGameOver() {
    if (score.wins === 5) {
        showGameOverModal(`You've hit 5 points! <br> You win the game!`);
    } else if (score.losses === 5) {
        showGameOverModal('Computer got 5 points! <br> You lose the game.');
    }
}

// show the modal with the game over message
function showGameOverModal(message) {
    const modal = document.getElementById('gameOverModal');
    document.getElementById('gameOverMessage').innerHTML = message;

    if (message.includes('You win')) {
        launchConfetti();
        const winSound = new Audio('media/sounds/win-sound.mp3');
        winSound.play();
    }

    if (message.includes('You lose')) {
        document.getElementById('dim-effect').style.display = 'block';
        const loseSound = new Audio('media/sounds/lose-sound.mp3');
        loseSound.play();
    }

    setTimeout(() => {
        modal.style.display = 'flex';
    }, 1500);

    // Add event listener to the modal buttons
    document.getElementById('playAgainButton').addEventListener('click', () => {
        reset(); // reset score
        const modal = document.getElementById('gameOverModal');
        modal.style.display = 'none'; // Hide modal

        const dimEffect = document.getElementById('dim-effect');
        if (dimEffect.style.display === 'block') {
            dimEffect.style.display = 'none'; // Hide the overlay
        }
    });
}

function launchConfetti() {
    var duration = 3 * 1000; // 3 Sekunden
    var end = Date.now() + duration;

    // Konfetti aus verschiedenen Winkeln starten
    var interval = setInterval(function () {
        if (Date.now() > end) {
            return clearInterval(interval);
        }

        confetti({
            startVelocity: 20,
            spread: 360,
            ticks: 60,
            zIndex: 1000,
            particleCount: 100,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2 // Start ein wenig über dem Bildschirm
            }
        });
    }, 250);
}

// compare player's move with computer's move
function compareYourMove(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        }
        else if (computerMove === 'paper') {
            result = 'You win !';
        }
        else if (computerMove === 'scissors') {
            result = 'Tie.';
        }
    }

    else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win !';
        }
        else if (computerMove === 'paper') {
            result = 'Tie.';
        }
        else if (computerMove === 'scissors') {
            result = 'You lose.';
        }
    }

    else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win !';
        }
    }

    updateScore(result);
    localStorage.setItem('score', JSON.stringify(score));
    document.querySelector('.result').innerHTML = result;
    document.querySelector('.result').classList.remove('blinking-text');
    displayScore();
    updateMovesDisplay(playerMove, computerMove, score.wins, score.losses);
    checkGameOver();
}

// update score 
function updateScore(result) {
    if (result === 'You win !') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else {
        score.ties += 1;
    }
}

// pick a random move for the computer
function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }
    return computerMove;
}