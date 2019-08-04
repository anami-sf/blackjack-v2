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



// TODO: turn into arrow 

const draw = () => {
    dealtCard = cardDeck.pop()
    return dealtCard
}

const getScore = (hand) => {

    var handScore = hand.reduce( (total, card) => {
        return total + card.value
    },0)

    return handScore
}

function isBust() {
    if (playerScore <= 21){
        return false
    } else {
        return true
    }
}

const checkForWinner = () => {
    if ( playerScore === 21 || (playerScore > dealerScore)){
        winner = 'player'
    } else {
        winner = 'dealer'
    }
}

const getStatus = () => {

    if (isBust()) {
        console.log('Dealer wins')
    } else if (!stay) {
        console.log('Player Turn')
    } else if (stay) {
        checkForWinner()
        console.log('winner: ', winner)
    }
    console.log('playerScore: ', playerScore, ' dealerScore: ', dealerScore)
}

const render = () => {
    
    $(`#dealer-hand`).html("")
    $(`#player-hand`).html("")
    
    renderCardImg('player-hand', playerHand)
    renderCardImg('dealer-hand', dealerHand)
}

// const deal = (hand, handScore) => {
//     console.log('deal')
//     hand.push(draw())
//     const score = getScore(hand)
//     handScore = score
//     debugger
// }

const handleClick = (evt) => {

    if (evt.target.id === "hit") {
        playerHand.push(draw())
        playerScore = getScore(playerHand)
        //deal(playerHand, playerScore)
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

/*----- event listeners -----*/ 
$('#control-panel').on('click', handleClick)






