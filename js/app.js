/*
 * Create a list that holds all of your cards
 */
const deck = document.getElementsByClassName("deck")[0];
let cards = document.getElementsByClassName("card");
let time = 0;
let moves = -1;
let firstClick = true;
let timeInterval;
let openCards = [];
let winnerContainer = document.getElementsByClassName("winner-container")[0];
let close = document.getElementsByClassName("close")[0];
const inActiveStars = document.getElementsByClassName('fa-star-o')
const activeStars = document.getElementsByClassName('fa-star');
winnerContainer.style.display = 'none';

function openCard(card) {
    openCards.push(card);
    if ((openCards.length) && !(openCards.length % 2)) {
        if (openCards[openCards.length - 2].children[0].classList[1] === openCards[openCards.length - 1].children[0].classList[1]) {
            openCards[openCards.length - 2].classList.add("match");
            openCards[openCards.length - 1].classList.add("match");
        } else {
            let tmp1 = openCards.pop();
            let tmp2 = openCards.pop();
            tmp1.classList.add("incorrect");
            tmp2.classList.add("incorrect");
            setTimeout(function() {
                tmp1.className = "card";
                tmp2.className = "card";

            }, 900);


        }
        if (openCards.length === 16) {
            clearInterval(timeInterval);
            winnerContainer.style.display = 'block';

        }

    }
}
document.getElementsByClassName("restart")[0].addEventListener("click", start);
start();

function start() {
    moves = -1;
    time = -1;
    openCards = [];
    let cardsArr = shuffle([...cards]);
    deck.innerHTML = "";
    increaseMoves();
    increaseTime();
    for (let card of cardsArr) {
        card.className = "card";
        deck.append(card)
    }
    [...inActiveStars].forEach(function(e) {
            e.classList.replace("fa-star-o", "fa-star");
    });


}


// console.log(cards);

// console.log(cards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

deck.addEventListener("click", function(e) {
    if (e.target.nodeName === "LI" && e.target.className === "card") {
        if (firstClick) {
            firstClick = false;
            timeInterval = setInterval(increaseTime, 1000);
        }
        increaseMoves();
        e.target.classList.add("open", "show");
        openCard(e.target)
    }
})

function increaseMoves() {
    document.getElementsByClassName("moves")[0].textContent = ++moves;
    document.getElementsByClassName("moves")[1].textContent = moves;
    if (moves === 20 || moves === 30) {
        activeStars[activeStars.length / 2 - 1].classList.replace("fa-star", "fa-star-o");
        activeStars[activeStars.length - 1].classList.replace("fa-star", "fa-star-o");

    }
}

function increaseTime() {
    document.getElementsByClassName("time")[0].textContent = ++time;
    document.getElementsByClassName("time")[1].textContent = time;
}

function playAgain() {
    winnerContainer.style.display = 'none';
    firstClick = true;
    start();
}

close.addEventListener('click', function() {

    winnerContainer.style.display = 'none';

});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */