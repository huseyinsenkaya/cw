const words = ["eat", "seat", "tea", "set", "east"];
const maxWords = 5;
const boardSize = 20;
const cols = boardSize;
const rows = boardSize;
let board = [];


function create() {
  shuffle(words);
  sortWordsLength(words);
  createEmptyBoard();
  placeFirstWord();



  let count = 1;
  while (words.length > 0 && count < maxWords) {
    word = words.pop();
    let isFit = false;
    for (let i = 0; i < word.length; i++) {
      for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
          if (board[x][y] === word[i]) {
            let placement = canPlace(word, x, y, i);
            if (placement && !isFit) {
              if (placement.ok) {
                isFit = place(
                  word,
                  { x: placement.x, y: placement.y },
                  placement.direction
                );
                count++;
              }
            }
          }
        }
      }
    }
  }

  printBoard();
}

function canPlace(word, x, y, index) {
  let around = {
    top: false,
    bottom: false,
    left: false,
    right: false,
  };

  // check edge
  if (x < 0 || x > boardSize - 1 || y < 0 || y > boardSize - 1) {
    return false;
  }

  // check top and right
  if (board[x - 1][y] !== "*" && board[x][y + 1] !== "*") {
    return { ok: false };
  }

  // check bottom and left
  if (board[x + 1][y] !== "*" && board[x][y - 1] !== "*") {
    return { ok: false };
  }

  // write horizontal
  if (board[x - 1][y] !== "*" || board[x + 1][y] !== "*") {
    if (board[x][y - 1] === "*") {
      around.left = true;
    }
    for (let i = 1; i < word.length; i++) {
      if (board[x][y + i] === "*") {
        around.right = true;
      }
    }
  }

  // write vertical
  if (board[x][y - 1] !== "*" || board[x][y + 1] !== "*") {
    if (board[x - 1][y] === "*") {
      around.top = true;
    }
    for (let i = 1; i < word.length; i++) {
      if (board[x + i][y] === "*") {
        if (board[x + i][y - 1] === "*" && board[x + i][y + 1] === "*") {
          around.bottom = true;
        }
      }
    }
  }

  // set word to right
  if (around.right) {
    return { ok: true, x: x, y: y - index, direction: "HORIZONTAL" };
  }

  // set word to bottom
  if (around.bottom) {
    return { ok: true, x: x - index, y: y, direction: "VERTICAL" };
  }
}

function createEmptyBoard() {
  for (let i = 0; i < rows; i++) {
    board[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      board[i][j] = "*";
    }
  }
}

function printBoard() {
  console.table(board);
}

function place(word, { x, y }, direction) {
  if (direction == "HORIZONTAL") {
    if (word.length + y <= boardSize) {
      for (let i = 0; i < word.length; i++) {
        board[x][y + i] = word[i];
      }
      return true;
    }
  } else if (direction == "VERTICAL") {
    if (word.length + x <= boardSize) {
      for (let i = 0; i < word.length; i++) {
        board[x + i][y] = word[i];
      }
      return true;
    }
  }
  return false;
}

function shuffle(words) {
  let i = words.length;
  while (i) {
    let random = Math.random() * i--;
    const j = Math.floor(random);
    [words[i], words[j]] = [words[j], words[i]];
  }
  return words;
}

function getRandomDirection() {
  // let direction = Math.floor(Math.random() * 2);
  // if (direction === 0) {
  //   return "HORIZONTAL";
  // } else {
  //   return "VERTICAL";
  // }

  return "HORIZONTAL";
}

function getRandomCoords() {
  //let x = Math.floor(Math.random() * boardSize);
  //let y = Math.floor(Math.random() * boardSize);

  let x = 5;
  let y = 5;

  return { x, y };
}

function placeFirstWord() {
  word = words.pop();
  let flag = false;
  while (!flag) {
    flag = place(word, getRandomCoords(), getRandomDirection());
    if (flag) {
      break;
    }
  }
}

function sortWordsLength(words) {
  words.sort((a, b) => {
    return a.length - b.length;
  });
}


create();
