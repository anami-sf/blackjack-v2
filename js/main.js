/*----- constants -----*/ 

//var dealerCards = $('#dealer-hand').children().length

const numArr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A' ];
const suitArr = ['H', 'D', 'S', 'C' ];

let cardDeck = [];

const buildCardDeck = (arr1, arr2) => { 
 
    //TODO: Move value function outside buildCardDeck

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
let playerHand, playerScore, dealerHand, dealerScore, turn, dealtCard, stay, winner, bust;

/*----- cached element references -----*/



/*----- functions -----*/

const Initialize = () => {
    buildCardDeck(numArr, suitArr)
    playerHand = []
    playerScore = 0
    dealerHand = []
    dealerScore = 0
    turn = true
    stay = false
    bust = false
}

Initialize()

// TODO: refactor parameters
const renderCardImg = (handEl, hand) => {
    for (card of hand) {
        $(`#${handEl}`).append(`<img class="cardImg" src=${card.img}  alt="card">`)
    }
}

const render = () => {
    
    $(`#dealer-hand`).html("")
    $(`#player-hand`).html("")
    
    renderCardImg('player-hand', playerHand)
    renderCardImg('dealer-hand', dealerHand)
}

// TODO: turn into arrow function
function isBust() {
    if (playerScore > 21){
        bust = true
        return true
    }    
}

const getScore = (hand) => {

    var handScore = hand.reduce( (total, card) => {
        return total + card.value
    },0)

    return handScore
}

const draw = () => {
    dealtCard = cardDeck.pop()
    return dealtCard
}

const deal = (evt) => {

    if (evt.target.id === "hit") {
        playerHand.push(draw())
        playerScore = getScore(playerHand)
    } else if (evt.target.id === "stay") {
        stay = true
        while( dealerScore < 18) {
            dealerHand.push(draw()) 
            dealerScore = getScore(dealerHand)        
        }             
    } else {

        playerHand = []
        dealerHand = []

        while(playerHand.length < 2) {
            playerHand.push(draw())
            dealerHand.push(draw())
            playerScore = getScore(playerHand)
            dealerScore = getScore(dealerHand) 
        }
    }
    getStatus()
    render()
}

const getStatus = () => {
    
    isBust()

    if (bust) {
        console.log('Dealer wins')
    } else if (!stay) {
        console.log('Player Turn')
    } else if (stay) {
        checkForWinner()
        console.log('winner: ', winner)
    }
    console.log('playerScore: ', playerScore, ' dealerScore: ', dealerScore)
}

const checkForWinner = () => {
    if ( playerScore === 21 || (playerScore > dealerScore)){
        winner = 'player'
    } else {
        winner = 'dealer'
    }
}

/*----- event listeners -----*/ 
$('#control-panel').on('click', deal)






