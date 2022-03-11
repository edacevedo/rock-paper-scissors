const GAME_OPTIONS = [
    'Rock',
    'Paper',
    'Scissors'
]

function computerPlay() {
    let randomOption = Math.floor(Math.random()*3);

    return GAME_OPTIONS[randomOption];
}

function playRound(playerSelection, computerSelection) {
    let validation = false;

    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    switch (playerSelection) {
        case 'rock':
            validation =  computerSelection == 'paper' ? false : true;
            break;
        case 'paper':
            validation =  computerSelection == 'scissors' ? false : true;
            break;
        case 'scissors':
            validation =  computerSelection == 'rock' ? false: true;
            break;
    }
    

    return validation;
}

function game() {
    let playerSelection,
        computerSelection,
        round = false,
        playerPoints = 0,
        computerPoints = 0;

    for (let index = 0; index < 5; index++) {
        playerSelection = prompt("What is your choice?");
        computerSelection = computerPlay();

        if (playerSelection.toLowerCase() === computerSelection.toLowerCase()) {
            console.log("It's a tie!");
        } else {
            round = playRound(playerSelection, computerSelection)
            if (round) {
                console.log(`You win! ${playerSelection.toUpperCase()} beats ${computerSelection.toUpperCase()}`);
                playerPoints++;
            } else {
                console.log(`You lose! ${computerSelection.toUpperCase()} beats ${playerSelection.toUpperCase()}`);
                computerPoints++;
            }
        }
    }

    if (playerPoints === computerPoints) {
        console.log("End game, It's a tie!");
    } else if (playerPoints > computerPoints) {
        console.log("End game, You win!");
    } else {
        console.log("End game, You lose!");
    }
    
}

game();