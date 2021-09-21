/*jshint esversion: 6 */

const deck = document.getElementsByClassName("deck")[0];
let cards = document.getElementsByClassName("card");
let time = 0;
let moves = -1;
let firstClick = true;
let timeInterval;
let openCards = [];
let winnerContainer = document.getElementsByClassName("winner-container")[0];
let katkota = document.querySelector(".katkota");
let pass = document.getElementById("pass");
let closeLabel = document.getElementsByClassName("close")[0];
const inActiveStars = document.getElementsByClassName("fa-star-o");
const activeStars = document.getElementsByClassName("fa-star");
const regularStars = document.getElementsByClassName("stars")[1];

const ayahStars = document.getElementsByClassName("ayah-stars")[0];

winnerContainer.style.display = "none";

function openCard(card) {
  //opens the card and check if it's a match
  openCards.push(card);
  if (openCards.length && openCards.length % 2 === 0) {
    if (
      openCards[openCards.length - 2].children[0].classList[1] ===
      openCards[openCards.length - 1].children[0].classList[1]
    ) {
      openCards[openCards.length - 2].classList.add("match");
      openCards[openCards.length - 1].classList.add("match");
    } else {
      let tmp1 = openCards.pop();
      let tmp2 = openCards.pop();
      tmp1.classList.add("incorrect");
      tmp2.classList.add("incorrect");
      setTimeout(function () {
        tmp1.className = "card";
        tmp2.className = "card";
      }, 900);
    }
    // every time card is is opened check if the game has ended
    if (openCards.length === 16) {
      clearInterval(timeInterval);
      // display the winning modal
      winnerContainer.style.display = "block";
    }
  }
}
// add click listener to restart button
document
  .getElementsByClassName("restart")[0]
  .addEventListener("click", playAgain);
start();

// resetting everything and start the game
function start() {
  clearInterval(timeInterval);
  moves = -1;
  time = -1;
  openCards = [];
  let cardsArr = shuffle([...cards]);
  deck.innerHTML = "";
  increaseMoves();
  increaseTime();
  for (let card of cardsArr) {
    card.className = "card";
    deck.append(card);
  }
  [...inActiveStars].forEach(function (e) {
    e.classList.replace("fa-star-o", "fa-star");
  });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// add click listener to cards only
deck.addEventListener("click", function (e) {
  if (e.target.nodeName === "LI" && e.target.className === "card") {
    if (firstClick) {
      firstClick = false;
      timeInterval = setInterval(increaseTime, 1000);
    }
    increaseMoves();
    e.target.classList.add("open", "show");
    openCard(e.target);
  }
});

// increase moves on click on card
function increaseMoves() {
  document.getElementsByClassName("moves")[0].textContent = ++moves;
  document.getElementsByClassName("moves")[1].textContent = moves;
  if (moves === 20 || moves === 30) {
    activeStars[activeStars.length / 2 - 1].classList.replace(
      "fa-star",
      "fa-star-o"
    );
    activeStars[activeStars.length - 1].classList.replace(
      "fa-star",
      "fa-star-o"
    );
  }
}

// timer functionality
function increaseTime() {
  document.getElementsByClassName("time")[0].textContent = ++time;
  document.getElementsByClassName("time")[1].textContent = time;
}

// restart the game functionality
function playAgain() {
  winnerContainer.style.display = "none";
  firstClick = true;
  start();
}
function qousa() {
  if (pass.value == "w7shtny ya Karim") {
    katkota.style.display = "block";
    regularStars.style.display = "none";
    ayahStars.style.display = "inline-block";
  }
}

// close the modal on click on close label
closeLabel.addEventListener("click", function () {
  winnerContainer.style.display = "none";
  katkota.style.display = "none";
});
