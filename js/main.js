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



/*----- app's state (variables) -----*/ 
let playerHand, dealerHand, turn;
/*----- cached element references -----*/



/*----- functions -----*/

const Initialize = () => {
    buildCardDeck(numArr, suitArr)
    playerHand = []
    dealerHand = []
    turn = true
}

Initialize()

const iterate = (handEl, hand) => {
    for (card of hand) {
        $(`#${handEl}`).append(`<img class="cardImg" src=${card.img}  alt="card">`)
    }
}

const render = () => {
    
    $(`#dealer-hand`).html("")
    $(`#player-hand`).html("")
    
    iterate('player-hand', playerHand)
    iterate('dealer-hand', dealerHand)
}


const draw = (hand) => {
    const dealtCard = cardDeck.pop()
    return dealtCard
}

const deal = (evt) => {

    const dealtCard1 = cardDeck.pop()
    const dealtCard2 = cardDeck.pop()
    
    if (evt.target.id === "hit") {
        playerHand.push(dealtCard)
    } else if (evt.target.id === "stay") {
        dealerHand.push(dealtCard)
    } else {

        playerHand = []
        dealerHand = []

        while(playerHand.length < 2) {
            playerHand.push(dealtCard1)
            dealerHand.push(dealtCard2)
        }
    }
    render()
}

/*----- event listeners -----*/ 
$('#control-panel').on('click', deal)






