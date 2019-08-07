//TODO's:
//Tilt cards
//Score board needs to have 3 divs
//TODO: re-factor functions
//TODO: Move play button top and center
//TODO: Style Cards
//TODO: Style Buttons
//TODO: style game status display
//TODO: Add footer
//TODO: Add money
//TODO: Split
//TODO: Double down
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

    var handScore = hand.reduce( (total, card) => {
        return total + card.value
    },0)

    adjustedScore = adjustForAces(handScore)

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

/*----- tilt cards -----*/



// TODO: refactor parameters
const renderCard = (handEl, hand) => {
    $(`#${handEl}`).append(`<img class="cardImg" src=${hand[0].img}  alt="card">`)
    $(`#${handEl}`).append(`<img class="cardImg" src="images/gray_back.jpg"  alt="Card Back">`)

}

const renderHand = (handEl, hand) => {

    let rotation = 0
    let direction = -1
    let zIndex = 1
    let left = 15

    for (card of hand) {
        
        rotation = 2*direction
        //$(`${card.img}`).attr("transform", `rotate(${rotation}deg)`)
        //const cardImgEl = 
        //`${cardImgEl}`
        //"transform:rotate(${rotation}deg);"
        $(`#${handEl}`).append(`<img class="cardImg" src=${card.img}  alt="card" style="transform:rotate(${rotation}deg);zIndex:${zIndex};left:${left}vmin;">`)
        
        zIndex += 1
        left += 7
        direction *= -1
    }
}

/*----- tilt cards -----*/

const isEven = (arr) => {
    if ( (arr.length % 2 === 0)){ return true}
}

/*----- tilt cards -----*/ 

const render = () => {
    
    $(`#dealer-hand`).html("")
    $(`#player-hand`).html("")
    
    renderHand('player-hand', playerHand)
    
    if (stay==true || winner == true){
        renderHand('dealer-hand', dealerHand)
    } else {
        renderCard('dealer-hand', dealerHand)
    }

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
$('#hit2').on('click', handleClick)
$('#stay').on('click', handleClick)





