const GAME_OPTIONS = [
    'Rock',
    'Paper',
    'Scissors'
]

const ICONS = {
    rock: "hand-back-fist",
    paper: "hand",
    scissors: "hand-scissors"
}

const ROUNDS = 5;

let round = 0,
    playerPoints = 0,
    computerPoints = 0,
    playerHistory = [],
    computerHistory = [];

window.onload = function() {
    let userOptions = document.querySelectorAll('.icon');

    userOptions.forEach(element => {
        element.addEventListener("click", onClickUserOption)
    }); 
}

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

function validateRound(computerSelection, playerSelection) {
    let resultMessage = '';

    if (playerSelection.toLowerCase() === computerSelection.toLowerCase()) {
        resultMessage = "It's a tie!";
        playerHistory.push(`${ICONS[playerSelection]} tie`);
        computerHistory.push(`${ICONS[computerSelection]} tie`)
    } else {
        if (playRound(playerSelection, computerSelection)) {
            resultMessage = `You win! ${playerSelection.toUpperCase()} beats ${computerSelection.toUpperCase()}`;
            playerHistory.push(`${ICONS[playerSelection]} win`);
            computerHistory.push(`${ICONS[computerSelection]} lost`)
            playerPoints++;
        } else {
            resultMessage = `You lose! ${computerSelection.toUpperCase()} beats ${playerSelection.toUpperCase()}`
            playerHistory.push(`${ICONS[playerSelection]} lost`);
            computerHistory.push(`${ICONS[computerSelection]} win`)
            computerPoints++;
        }
    }
    
    return resultMessage;
}

function paintChoices(computerSelection, playerSelection) {
    
    document.getElementById("computerChoice").innerHTML = 
    `<i class="fa-solid fa-${ICONS[computerSelection]} dash-icon"></i>`;

    document.getElementById("playerChoice").innerHTML = 
    `<i class="fa-solid fa-${ICONS[playerSelection]} dash-icon"></i>`;
}

function paintHistoricalResults() {
    let  computerIcons = computerHistory.map( item => `<i class="fa-solid fa-${item}"></i>`),
        playerIcons = playerHistory.map(item => `<i class="fa-solid fa-${item}"></i>`);

    document.getElementById("computerHistory").innerHTML = computerIcons.join(" ");
    document.getElementById("playerHistory").innerHTML = playerIcons.join(" ");
}

function validateEndGame() {
    if (round === 5) {
        if (playerPoints === computerPoints) {
            resultMessage = "It's a tie!"
        } else if (playerPoints > computerPoints) {
            resultMessage = "You win!"
        } else {
            resultMessage = "You lose!"
        } 

        swal({
            title: "GAME OVER",
            text: resultMessage,
            icon: "info",
            button: "Try again",
          })
          .then(() => {
            location.reload();
          });
    }
}

function onClickUserOption(params) {
    let playerSelection = params.target.dataset.userOption,
        computerSelection = computerPlay().toLowerCase(),
        resultMessage = validateRound(computerSelection, playerSelection);;

        paintChoices(computerSelection, playerSelection);
        document.getElementById("resultMessage").innerHTML = resultMessage;
        paintHistoricalResults();
        round += 1;
        validateEndGame();
   
}

