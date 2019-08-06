//TODO: Toggle opening image
//TODO: Move play button top and center
//TODO: Style Cards
//TODO: Style Buttons
//TODO: style game status display
//TODO: Add footer
//TODO: re-factor functions
//TODO: Make multi-player
//TODO: Add money

/*----- constants -----*/ 

const value= (num) => {
    if (typeof num === 'number') {
        return num 
    } else if (num === 'A') { 
        return 11
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
    return cardDeck
}


/*----- app's state (variables) -----*/ 
let playerHand, playerScore, dealerHand, dealerScore, aceCount, dealtCard, play, stay, winner, gameStatus;

/*----- cached element references -----*/

//var dealerCards = $('#dealer-hand').children().length

/*----- functions -----*/

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


const Initialize = () => {
    shuffle(buildCardDeck(numArr, suitArr))
    playerHand = []
    playerScore = 0
    dealerHand = []
    dealerScore = 0
    aceCount = 0
    play = false
    stay = false
    winner = null
}

Initialize()

const draw = () => {
    dealtCard = cardDeck.pop()
    return dealtCard
}

const countAces =  (hand) => {
    var acesArr = hand.filter((card) => {
        return card.value === 11
    })
    return acesArr.length
}

const adjustForAces = (score) => {
    
    let adjustedScore = score
    
    while(adjustedScore > 21 && aceCount > 0){
        adjustedScore -= 10
        aceCount -= 1
    }
    return adjustedScore  
}

const getScore = (hand) => {

    aceCount = countAces(hand)
    //debugger

    var handScore = hand.reduce( (total, card) => {
        return total + card.value
    },0)
    adjustedScore = adjustForAces(handScore)
    //debugger

    return adjustedScore
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
    } else if(playerScore > 21 || (stay && (dealerScore > playerScore))) {
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

    if ((stay && winner) || dealerScore === 21 || playerScore > 21) {
        gameStatus = `Winner: ${winner}\n\nClick \"Play\" to play again.`
        console.log(gameStatus)
        
    } else {
        gameStatus = "Hit or Stay"
     console.log(gameStatus)
    }
    $('#score').html(`Player: ${playerScore} Dealer: ${dealerScore}`)
    $('#game-status').html(`${gameStatus}`)
    console.log('winner: ', winner)

}

const handleClick = (evt) => {
    //debugger
    if ((evt.target.id === "hit") && (stay == false) && (winner == null)) {
        playerHand.push(draw())
        playerScore = getScore(playerHand)
    } else if ((evt.target.id === "stay") && stay == false) {
        stay = true
        while( dealerScore < 18) {
            dealerHand.push(draw()) 
            dealerScore = getScore(dealerHand)        
        }             
    } else if (evt.target.id === "play") {

        Initialize()
        play = true

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






