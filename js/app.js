/*
 * list that holds all of the cards
 */
    let cards = [
        "fa-diamond",
        "fa-diamond",
        "fa-paper-plane-o",
        "fa-paper-plane-o",
        "fa-anchor",
        "fa-anchor",
        "fa-bolt",
        "fa-bolt",
        "fa-cube",
        "fa-cube",
        "fa-leaf",
        "fa-leaf",
        "fa-bicycle",
        "fa-bicycle",
        "fa-bomb",
        "fa-bomb"
    ];

//open card list. keeps track of the revealed cards the players sees.
let openCards = [];
//keeps track of the player moves;
let moveCount = 0;
let starCount = 5;
//Used to keep track of time
let sec = 181;
let time = null

//hide Star
function hideStar(star){
    document.querySelector("#"+ star).style.display = "none";
}

//return Stars
let showStars = ()=> {
    let starsArray = ["firstStar","secondStar","thirdStar","fourthStar","fifthStar"];
    for(let i =0; i < starsArray.length; i++){
        document.querySelector("#"+ starsArray[i]).removeAttribute('style');
    }
    
}

//Timer 
let timer = () => {
    if(sec === 180){
    time = setInterval(function(){
        document.querySelector('.timerDisplay').innerHTML= sec + " Seconds Left";
        runTheClock();
        sec--;
        if (sec < 0) {
            clearInterval(time);
            //Loses the game
            lost();
        }
    }, 1000);
    }
}

//Upate Stars
let updateStars = () => {
    if(moveCount > 30 && moveCount < 40 && starCount === 5){
        starCount = 4;
        hideStar("firstStar");
    }
    else if(moveCount > 40 && moveCount < 50 && starCount === 4){
        starCount = 3;
        hideStar("secondStar");
    }
    else if(moveCount > 50 && moveCount < 60 && starCount === 3){
        starCount = 2;
        hideStar("thirdStar");
    }
    else if(moveCount > 60 && moveCount < 70 && starCount === 2){
        starCount = 1;
        hideStar("fourthStar");
    }
    else if(moveCount > 70 && starCount === 1){
        hideStar("fifthStar");
        starCount = 0;
        lost();
    }else{
        return;
    }
}

//Updates the players moves
let updateMessages = () => {
    moveCount++;
    let moves = document.querySelector(".moves");
    moves.innerHTML = moveCount;
}

//Resets Move Count
let resetMoveCount = () => {
    moveCount = 0;
    starCount = 5;
    clearInterval(time);
    sec = 181;
    //Clear time in HTMl
    document.querySelector('.timerDisplay').innerHTML= sec + " Seconds";
    let moves = document.querySelector(".moves");
    moves.innerHTML = moveCount;
    //reset clock
    resetClock();
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }

//My Custom Function was created with inpiration from other users who commented around the original function provided: http://stackoverflow.com/a/2450976
function shuffle(array){
    let j = 0;
    let temp = "";
    for(let i =0; i < array.length; i++){
        j = Math.floor( Math.random() * (i + 1) );
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
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

 //You lose Function
 let lost = () => {
        clearInterval(time);
        swal({
            title: "You Lost!", 
            text: "You lost all your Star!", 
            icon: "warning",
            buttons: "Play Again!"  
        }).then((restartGame) => {
            if(restartGame){
                restartStart();
            }
        });
}

 //Checks for win
 let checkForWin = () => {
        if(document.querySelector(".deck").querySelectorAll(".match").length === document.querySelector(".deck").children.length){
            clearInterval(time);
            swal({
                title: "You got a " + starCount + " Star Win!", 
                text: "It took you " + (moveCount + 1)+ " many moves and " + (180 - sec - 1) + " seconds!", 
                icon: "success",
                buttons: "Play Again!"  
            }).then((restartGame) => {
                if(restartGame){
                    restartStart();
                }
            });
        }
 }


let createMatch = () => {
    openCards[0].classList.add("match");
    openCards[1].classList.add("match");
    openCards.length = 0; 
}

let cardMatchCheck = () => {
    if((openCards[0].querySelector(".fa").classList[1] === openCards[1].querySelector(".fa").classList[1]) && (openCards[0] != openCards[1])){
        createMatch(); 
    }else{
        openCards[0].classList.remove("show");
        openCards.shift();
    } 
    checkForWin();  
} 

function showCard(element) {
    if(openCards.length > 0){
     openCards[0].classList.remove("show");
     openCards[0].classList.remove("open");
    }
     element.classList.add("show");
     element.classList.add("open");
     openCards.push(element);
     if(openCards.length >= 2){
        cardMatchCheck();
     } 
 }

function addClicks(element) {
    element.addEventListener('click', function() {
        if(sec === 181){
            sec = 180;
            timer();
        }
        showCard(element);
        updateMessages();
        updateStars();
    });
}

///FUnction removes all children of an element
function destroyChildren(element){
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

///allows for the game to start and restart

let restartStart = () => {
    clearInterval(time);
    resetMoveCount();
    showStars();
    destroyChildren(document.querySelector(".deck"))
    cards = shuffle(cards);
    for(let i = 0; i <cards.length; i++){
        const newLi = document.createElement('li');
        newLi.classList.add("card");
        //newLi.classList.add("match");

        const newI = document.createElement('i');
        newI.classList.add("fa");
        newI.classList.add(cards[i]);
        
        newLi.appendChild(newI);
        addClicks(newLi); 
        document.querySelector(".deck").appendChild(newLi);
    }
}


 //Sets up game when everything is ready
document.addEventListener('DOMContentLoaded', function () {
    restartStart();
});