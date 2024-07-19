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
    document.querySelector('.score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// update moves display
function updateMovesDisplay(playerMove, computerMove, playerWins, computerWins) {
    document.querySelector('.your-move').innerHTML = playerMove ? `<img src="images/${playerMove}-emoji.png" class="move-icons">` : '';
    document.querySelector('.your-wins').innerHTML = playerWins;
    document.querySelector('.computer-move').innerHTML = computerMove ? `<img src="images/${computerMove}-emoji.png" class="move-icons">` : '';
    document.querySelector('.computer-wins').innerHTML = computerWins;
}

// Handle page load
document.addEventListener("DOMContentLoaded", () => {
    displayScore();
    document.querySelector('.result').innerHTML = 'Pick a move';
    document.querySelector('.result').classList.add('blinking-text');
    updateMovesDisplay('', '', score.wins, score.losses);
    document.querySelector('.reset').addEventListener('click', reset);
});

// event listerners for move buttons
document.querySelector('.rock-button').addEventListener('click', () => {
    compareYourMove('rock');
});

document.querySelector('.paper-button').addEventListener('click', () => {
    compareYourMove('paper');
});

document.querySelector('.scissors-button').addEventListener('click', () => {
    compareYourMove('scissors');
});

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