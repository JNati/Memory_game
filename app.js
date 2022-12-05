let pairs = parseInt(window.location.search.split("?")[1]);
let storage;
const all_cards = ["angular.png","d3.png","evista.png", "jenkins.png", "postcss.png", "react.png", "redux.png", "sass.png", "ts.png", "webpack.png"];
storage = document.getElementsByClassName("cards")[0];
let array = [];

function Game(){

for(let i = 0; i < pairs*2; i++ ){
    
    let li = document.createElement("li");
    li.classList.add("card");
    let div1 = document.createElement("div");
    div1.classList.add("view");
    div1.classList.add("front-view");
    let div2 = document.createElement("div");
    div2.classList.add("view");
    div2.classList.add("back-view");
    let img1 = document.createElement("img");
    let img2 = document.createElement("img");
    img1.src = "cards/panda.png";
    img2.src = "cards/" + all_cards[Math.floor(i/2)];
    li.appendChild(div1);
    li.appendChild(div2);
    div1.appendChild(img1);
    div2.appendChild(img2);
    array.push(li);
    li.addEventListener("click", flipCard);
    
}
}

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let step_counter = 0;
let step_count = document.getElementById("step_counter");
function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        step_counter++;
        step_count.innerHTML = Math.floor(step_counter/2);
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src;
        let cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}
function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == pairs) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}
function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    array.sort(() => Math.random() - 0.5);
}

function createGame(){
    array = [];
    storage.innerHTML = "";
    step_counter = 0;
    step_count.innerHTML = "";
    Game();
    shuffleCard();

    for(let i = 0; i < pairs*2; i++ ){
        storage.appendChild(array[i]);
    }
}
createGame();