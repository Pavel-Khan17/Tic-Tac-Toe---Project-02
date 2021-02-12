// defining class to add
const crossClass = "cross";
const circleClass = "circle";
let circleTurn;
//defult vabe true thake

// cell gula query korar jonno, class diyeo kora jaito kintu eikhane atribute diye kora
const cellElements = document.querySelectorAll("[data-cell]");
const winningMassageText = document.getElementById("winningMassageText");
// hover dewar jonno and kar turn bujar jonno id diye oi div take dortesi
const gameBoard = document.getElementById("gameBoard");
const winningMassage = document.getElementById("winningMassage");
const playAgain = document.getElementById("playAgain");
const restartButton = document.getElementById("restartButton");
const whoseTurn = document.getElementById("whoseTurn");
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

playAgain.addEventListener("click", startGame);

restartButton.addEventListener("click", () => {
  location.reload();
});

function startGame() {
  cellElements.forEach((cell) => {
    cell.classList.remove(crossClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener("click", handleClick);
    // jehetu sob data cell gula array akare asbe tai array method use kora hoise protita cell er modde event listener lagano hoise once : true dewa hoise jate ekbar kaj kore just
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMassage.classList.add("show");
}

// jekono ekta cell click hoile ei function run hobe eita event listener er modde dewa hoise
function handleClick(event) {
  // jeikhane click event kaj kortese sei cell ( div) ta newar jonno
  const cellClicked = event.target;
  // kar turn seita bujar jonno
  const currentClass = circleTurn ? circleClass : crossClass;
  // place Mark
  placeMark(cellClicked, currentClass);
  // Check For Win
  if (checkWin(currentClass)) {
    // oi khane winning combinationer modde jekono ekta ( 3tay current clss thakbe )mile jabe tokhn eikhane asbe
    endGame(false);
  } else if (isDraw()) {
    // Check For Draw
    endGame(true);
  } else {
    // Switch Turns
    swapTurn();
    setHoverClass();
  }
}

// mark place korar jonno ..
function placeMark(cellClicked, currentClass) {
  cellClicked.classList.add(currentClass);
}
// to Switch Turn eikhne ese ultay jabe
function swapTurn() {
  circleTurn = !circleTurn;
}

function setHoverClass() {
  // prothome jei class gula ache remove korbe then
  gameBoard.classList.remove("turn-cricle");
  gameBoard.classList.remove("turn-cross");
  // class add korbe
  if (circleTurn) {
    gameBoard.classList.add("turn-cricle");
    whoseTurn.innerText = "Cricle Turn";
  } else {
    gameBoard.classList.add("turn-cross");
    whoseTurn.innerText = "Cross Turn";
  }
}

function endGame(draw) {
  if (draw) {
    winningMassageText.innerText = "It's a DRAW";
  } else {
    winningMassageText.innerText = `${
      circleTurn ? "Circle's" : "Cross's"
    } WINs!`;
  }
  winningMassage.classList.remove("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(crossClass) ||
      cell.classList.contains(circleClass)
    );
  });
}

function checkWin(currentClass) {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
