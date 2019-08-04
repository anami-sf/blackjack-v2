//TODO: Move play button top and center
//TODO: Add opening image
//TODO: Scramble Deck
//TODO: Render status
//TODO: Click buttons only when appropriate
//TODO: Add footer
//TODO: Make multi-player
//TODO: Add money

/*----- constants -----*/ 

const value= (num) => {
    if (typeof num === 'number') {
        return num 
    } else if (num === 'A') { 
        return 1
    } else {
        return 10
    }
}

const numArr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A' ];
const suitArr = ['H', 'D', 'S', 'C' ];

let cardDeck = [];

const buildCardDeck = (arr1, arr2) => { 
 
    //TODO: Move value function outside buildCardDeck

    for(const num of arr1){
        for(const suit of arr2){
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
let playerHand, playerScore, dealerHand, dealerScore, dealtCard, stay, winner, gameStatus;

/*----- cached element references -----*/

//var dealerCards = $('#dealer-hand').children().length

/*----- functions -----*/

const Initialize = () => {
    buildCardDeck(numArr, suitArr)
    playerHand = []
    playerScore = 0
    dealerHand = []
    dealerScore = 0
    stay = false
    winner = null
}

Initialize()

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
    if ( playerScore === 21 || (stay && (playerScore > dealerScore)) || (dealerScore > 21)){
        winner = 'player'
    } else if(playerScore > 21 || dealerScore > playerScore) {
        winner = 'dealer'
    } else if (stay && playerScore === dealerScore) {
        winner = 'tie'
    } 
}

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

    console.log('playerScore: ', playerScore, ' dealerScore: ', dealerScore)

    if (winner || playerHand >= 21) {
        gameStatus = `Winner: ${winner}\n\nClick \"Play\" to play again.`
        console.log(gameStatus)
    } else {
        gameStatus = "Hit or Stay"
     console.log(gameStatus)
    }
}

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

        Initialize()

        while(playerHand.length < 2) {
            playerHand.push(draw())
            dealerHand.push(draw())
            playerScore = getScore(playerHand)
            dealerScore = getScore(dealerHand) 
        }
    }
    checkForWinner()
    render()
}

/*----- event listeners -----*/ 
$('#control-panel').on('click', handleClick)






