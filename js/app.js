/*
 * Create a list that holds all of your cards
 */
const deck = document.getElementsByClassName("deck")[0];
let cards = document.getElementsByClassName("card");
let moves = -1;

let openCards = [];

function openCard(card) {
    openCards.push(card);
    if ((openCards.length) && !(openCards.length % 2)) {
        console.log('inif')
        if (openCards[openCards.length - 2].children[0].classList[1] === openCards[openCards.length - 1].children[0].classList[1]) {
            openCards[openCards.length - 2].classList.add("match");
            openCards[openCards.length - 1].classList.add("match");
        } else {
        	let tmp1 = openCards.pop();
            let tmp2 = openCards.pop();
            setTimeout(function() {
                tmp1.className = "card";
                tmp2.className = "card";

            }, 1000);


        }
        if(openCards.length === 16){
        	console.log('finished');
        }

    }
}

    let cardsArr = shuffle([...cards]);
    deck.innerHTML = "";
    increaseMoves();
    for (let card of cardsArr) {
        card.className = "card";
        deck.append(card)
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
        	increaseMoves();
            e.target.classList.add("open", "show");
            openCard(e.target)
        }
    })

    function increaseMoves () {
    	document.getElementsByClassName("moves")[0].textContent = ++moves ;
    	
    }


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