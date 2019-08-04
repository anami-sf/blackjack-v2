/*----- constants -----*/ 

//const playerHand = 'player-hand'
//const dealerHand = 'dealer-hand'

//var dealerCards = $('#dealer-hand').children().length
//var playerCards = $('#player-hand').children().length

let dealtCard;

const numArr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A' ];
const suitArr = ['H', 'D', 'S', 'C' ];

let cardDeck = [];

const buildCardDeck = (arr1, arr2) => { 
    
    for(const num of arr1){
        for(const suit of arr2){
            const value= (num) => {
                if (typeof num === 'number') {
                    return num 
                } else if (num === 'A') { 
                    return 1
                } else {
                    return 10
                }
            }
            const cardObj = {
                value: value(num), 
                key: `${num}${suit}`,
                img: `images/CardImages/${num}${suit}.jpg`
            };

            cardDeck.push(cardObj);
        }
    }
}

const Initialize = () => {
    buildCardDeck(numArr, suitArr)
    playerHand = []
    dealerHand = []
    turn = true
}

Initialize()

/*----- app's state (variables) -----*/ 
let playerHand, dealerHand, turn;
/*----- cached element references -----*/



/*----- functions -----*/

const render = () => {
    // const imgEl = `<img class="cardImg" src=${dealtCard.img}  alt="jQuery">`
    // $(`#${hand}`).append(imgEl)    
}


const draw = (hand) => {
    const dealtCard = cardDeck.pop()
    return dealtCard
}

const deal = (evt) => {

    const dealtCard = cardDeck.pop()
    
    if (evt.target.id === "hit") {
        playerHand.push(dealtCard)
    } else if (evt.target.id === "stay") {
        dealerHand.push(dealtCard)
    } else {

        playerHand = []
        dealerHand = []
        debugger
        while(playerHand.length < 2) {
            playerHand.push(dealtCard)
            dealerHand.push(dealtCard)
        }
    }
}

/*----- event listeners -----*/ 
$('#control-panel').on('click', deal)






