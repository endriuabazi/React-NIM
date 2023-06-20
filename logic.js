//Here is the converted logic from java to js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let pile;
let regularNim;
let playerName;
let isMoveValidRange;

function main() {
  getGameParameters();
  let playerTurn = true;

  while (true) {
    console.log(`Current player: ${playerTurn ? playerName : '\x1b[31mComputer\x1b[0m'}`);
    printBoard();

    if (isGameOver()) {
      if (playerTurn) {
        console.log('\x1b[31m╔══════════════════╗');
        console.log('║   \x1b[31mYou lost XD!   \x1b[0m║');
        console.log('╚══════════════════╝\x1b[0m');
      } else {
        console.log('\x1b[32m╔══════════════╗');
        console.log('║   \x1b[32mYou won!   \x1b[0m║');
        console.log('╚══════════════╝\x1b[0m');
      }
      break;
    }

    let move;
    if (playerTurn) {
      move = getPlayerMove();
    } else {
      move = getComputerMove();
      console.log(`The computer takes ${move[1]} matches from heap ${move[0] + 1}`);
    }

    if (isMoveValid(move)) {
      pile[move[0]] -= move[1];
      playerTurn = !playerTurn;
    } else {
      console.log('\x1b[31mInvalid move, please try again.\x1b[0m');
    }
  }
}

function printBoard() {
  for (let i = 0; i < pile.length; i++) {
    console.log(`Pile ${i + 1}: ${pile[i] > 0 ? pile[i] : 'Empty'}`);
  }
}

function isGameOver() {
  let totalMatches = 0;
  for (let p of pile) {
    totalMatches += p;
  }

  if (regularNim) {
    return totalMatches === 0;
  } else {
    if (totalMatches === 1) {
      return true;
    }

    let allHeapsEmpty = true;
    let onlyOneMatchLeft = false;
    let nonEmptyHeapsCount = 0;

    for (let i = 0; i < pile.length; i++) {
      if (pile[i] > 0) {
        allHeapsEmpty = false;
        nonEmptyHeapsCount++;
        if (pile[i] === 1) {
          onlyOneMatchLeft = true;
        } else {
          onlyOneMatchLeft = false;
          break;
        }
      }
    }

    let sumIsEven = totalMatches % 2 === 0;
    return allHeapsEmpty || (onlyOneMatchLeft && sumIsEven && nonEmptyHeapsCount % 2 === 0);
  }
}

function isMoveValid(move) {
    const minVal = isMoveValidRange[0];
    const maxVal = isMoveValidRange[1];
  
    if (
      move[0] >= 0 &&
      move[0] < pile.length &&
      move[1] >= 1 &&
      move[1] <= pile[move[0]] &&
      move[0] + 1 >= minVal &&
      move[0] + 1 <= maxVal
    ) {
      return true;
    } else {
      return false;
    }
  }
  
function getPlayerMove() {
  return new Promise((resolve) => {
    rl.question('Enter the pile number (1-3) and the number of matches to take: ', (answer) => {
      const [heap, matches] = answer.split(' ').map(Number);
      resolve([heap - 1, matches]);
    });
  });
}

function getComputerMove() {
  if (regularNim) {
    let nimSum = 0;

    for (let p of pile) {
      nimSum ^= p;
    }

    if (nimSum === 0) {
      let nonEmptyHeapIndex = -1;

      for (let i = 0; i < pile.length; i++) {
        if (pile[i] > 0) {
          nonEmptyHeapIndex = i;
          break;
        }
      }

      if (nonEmptyHeapIndex !== -1) {
        return [nonEmptyHeapIndex, 1];
      }
    } else {
      for (let i = 0; i < pile.length; i++) {
        let xor = pile[i] ^ nimSum;
        if (xor < pile[i]) {
          return [i, pile[i] - xor];
        }
      }
    }
  } else {
    let totalMatches = pile[0] + pile[1] + pile[2];

    if (totalMatches === 1) {
      for (let i = 0; i < pile.length; i++) {
        if (pile[i] > 0) {
          return [i, 1];
        }
      }
    } else {
      for (let i = 0; i < pile.length; i++) {
        for (let j = 1; j <= pile[i]; j++) {
          let newTotalMatches = totalMatches - j;
          let xor = pile[i] ^ j ^ newTotalMatches;

          if (xor === 0) {
            return [i, j];
          }
        }
      }
    }
  }

  for (let i = 0; i < pile.length; i++) {
    if (pile[i] > 0) {
      return [i, 1];
    }
  }

  return [0, 0];
}

function getGameParameters() {
  return new Promise((resolve) => {
    rl.question('Enter your name: ', (name) => {
      playerName = name;
      let validNumberOfPiles = false;

      const askNumberOfPiles = () => {
        rl.question('Enter the number of piles (3, 4, or 5): ', (answer) => {
          const numberOfPiles = Number(answer);

          if (numberOfPiles >= 3 && numberOfPiles <= 5) {
            pile = new Array(numberOfPiles);
            validNumberOfPiles = true;
            resolve();
          } else {
            console.log('Invalid number of piles. Please enter a value between 3 and 5.');
            askNumberOfPiles();
          }
        });
      };

      askNumberOfPiles();

      const askValidRange = () => {
        rl.question(`Enter the range of acceptable values when selecting a pile (1-${pile.length}): `, (answer) => {
          const [minVal, maxVal] = answer.split(' ').map(Number);

          if (minVal >= 1 && maxVal <= pile.length && minVal <= maxVal) {
            isMoveValidRange = [minVal, maxVal];
            resolve();
          } else {
            console.log(`Invalid range of values. Please enter a range between 1-${pile.length}.`);
            askValidRange();
          }
        });
      };

      askValidRange();

      rl.question('Enter the number of elements in each pile (separated by spaces): ', (answer) => {
        const elements = answer.split(' ').map(Number);

        for (let i = 0; i < pile.length; i++) {
          pile[i] = elements[i];
        }

        rl.question('Enter the game type (Regular or Misere): ', (answer) => {
          const gameType = answer.toLowerCase();

          if (gameType === 'regular' || gameType === 'misere') {
            regularNim = gameType === 'regular';
            resolve();
          } else {
            console.log("Invalid game type. Please enter either 'regular' or 'misere'.");
            getGameType();
          }
        });
      });
    });
  });
}

async function main() {
  await getGameParameters();
  let playerTurn = true;

  while (true) {
    console.log(
      'Current player: ' +
        (playerTurn ? '\x1b[34m' + playerName : '\x1b[31mComputer') +
        '\x1b[0m'
    );

    printBoard();

    if (isGameOver()) {
      if (playerTurn) {
        console.log('\x1b[31m╔══════════════════╗');
        console.log('║   \x1b[31mYou lost XD!   \x1b[0m║');
        console.log('╚══════════════════╝\x1b[0m');
      } else {
        console.log('\x1b[32m╔══════════════╗');
        console.log('║   \x1b[32mYou won!   \x1b[0m║');
        console.log('╚══════════════╝\x1b[0m');
      }
      rl.close();
      break;
    }

    let move;

    if (playerTurn) {
      move = await getPlayerMove();
    } else {
      move = getComputerMove();
      console.log('The computer takes ' + move[1] + ' matches from heap ' + (move[0] + 1));
    }

    if (isMoveValid(move)) {
      pile[move[0]] -= move[1];
      playerTurn = !playerTurn;
    } else {
      console.log('\x1b[31mInvalid move, please try again.\x1b[0m');
    }
  }
}

main();
