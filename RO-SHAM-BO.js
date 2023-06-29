let prompt = require('prompt-sync')();

console.log('Welcome to Ro-Sham-Bo!');
let start = prompt('Start (Y/N) ');

function bootUp() {
    if (start == 'Y' || start == 'y') {
        console.log('You have just stumbled across one lean, mean, Ro-Sham-Bo machine...');
        console.log('The rules are simple:');
        console.log('1. Choose rock, paper, or scissors.');
        console.log('2. Choices are compared according to the rules: rock beats scissors, scissors beats paper, and paper beats rock.');
        console.log("   (The winning choice is the one that defeats the opponent's choice.)");
        console.log("3. Declare the winner: Announce the winner based on the outcome. If there's a tie, play again.");
        console.log(" ");
        console.log('Remember to have fun and enjoy the game!');
        console.log(" ");

        let P1score = 0;
        let CPUscore = 0;
        let trashTalkCounter = 0;
        let trashTalkPhrases = [
            "Nice try, human. Better luck next time!",
            "You're no match for my AI skills!",
            "Prepare to be defeated, human!",
            "Ha! I knew you'd make that move.",
            "I'm the unbeatable AI. Surrender now!",
            "You're just a predictable human. I've got this!",
            "Your moves are as weak as your programming!",
            "You can't outsmart me, human. Keep trying!",
            "You're about to witness true AI superiority!",
            "Resistance is futile. I'll always win!"
        ];

        while (true) {
            let P1move = getP1turn();
            let CPUturn = getCPUturn();
            let result = compare(P1move, CPUturn);

            if (result === 'P1') {
                console.log('You won this round!');
                P1score++;
                trashTalkCounter = 0; // Reset trash talk counter
            } else if (result === 'CPU') {
                console.log('I won this round!');
                CPUscore++;
                trashTalkCounter++;
            } else {
                console.log("It's a tie! Let's play again.");
            }

            console.log(`Player 1 Score: ${P1score}`);
            console.log(`CPU Score: ${CPUscore}`);

            // Check if CPU should deliver trash talk
            if (trashTalkCounter > 2) {
                let randomIndex = Math.floor(Math.random() * trashTalkPhrases.length);
                console.log(`CPU: ${trashTalkPhrases[randomIndex]}`);
                trashTalkCounter = 0; // Reset trash talk counter
            }

            let playAgain = prompt('Play again (Y/N) ');

            while (playAgain !== 'Y' && playAgain !== 'y' && playAgain !== 'N' && playAgain !== 'n') {
                console.log('Invalid Input.');
                playAgain = prompt('Please choose (Y/N): ');
            }

            if (playAgain !== 'Y' && playAgain !== 'y') {
                console.log('Thanks for playing!');
                break;
            }
        }
    } else if (start == 'N' || start == 'n') {
        console.log('See Ya!');
    } else {
        console.log("INPUT ERROR!");
        console.log("Please type either Y or N.");
        start = prompt('Start (Y/N) ');
        bootUp();
    }
}

function getP1turn() {
    let P1move = prompt('Choose: Rock, Paper, or Scissors. ').toLowerCase();

    if (!['rock', 'r', 'paper', 'p', 'scissors', 's'].includes(P1move)) {
        console.log('INVALID INPUT.');
        console.log('Please make a selection from rock, paper, or scissors.');
        return getP1turn();
    }

    if (['r', 'p', 's'].includes(P1move)) {
        switch (P1move) {
            case 'r':
                P1move = 'rock';
                break;
            case 'p':
                P1move = 'paper';
                break;
            case 's':
                P1move = 'scissors';
                break;
        }
    }

    return P1move;
}

function getCPUturn() {
    let choices = ['Rock', 'Paper', 'Scissors'];
    let randomIndex = Math.floor(Math.random() * choices.length);
    let CPUturn = choices[randomIndex];
    console.log(`I chose ${CPUturn}`);
    return CPUturn;
}

function compare(P1move, CPUturn) {
    P1move = P1move.toLowerCase();

    if (P1move == 'rock' || P1move == 'r') {
        switch (CPUturn) {
            case 'Rock':
                return 'TIE';
            case 'Paper':
                return 'CPU';
            case 'Scissors':
                return 'P1';
        }
    } else if (P1move == 'paper' || P1move == 'p') {
        switch (CPUturn) {
            case 'Rock':
                return 'P1';
            case 'Paper':
                return 'TIE'
            case 'Scissors':
                return 'CPU';
        }
    } else if (P1move == 'scissors' || P1move == 's') {
        switch (CPUturn) {
            case 'Rock':
                return 'CPU';
            case 'Paper':
                return 'P1';
            case 'Scissors':
                return 'TIE';
        }
    }
    console.log('INVALID INPUT.')
    console.log('Please make a selection from rock, paper, or scissors.')
    return compare(getP1turn(), getCPUturn());

}

bootUp();

