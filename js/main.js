/*----- Generate Deck  -----*/ 

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

const updateGame = (evt) => {

    checkForWinner()
    renderGame()
}

// ----------- Update game status and Scores -------- //

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

    const adjustedScore = adjustForAces(handScore)

    if (hand === playerHand) {
        playerScore = adjustedScore
    } else if (hand === dealerHand) {
        dealerScore = adjustedScore
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

// --------- Rendering Functions -------------- //

/////HELPER FUNCTIONS/////

const clearGameTable = () => {
    $(`#dealer-hand`).html("")
    $(`#player-hand`).html("")
    $('#winner').html("")
    $('#dealerScore').html("")
    //TODO: chnage name of winner element
}

const renderHand = (handEl, hand) => {

    let rotation = 2
    let zIndex = 1
    let left = 8

    for (card of hand) {
    
        $(`#${handEl}`).append(`<img class="cardImg" src=${card.img}  alt="card" style="transform:rotate(${rotation}deg);zIndex:${zIndex};left:${left}vmin;">`)
        
        zIndex += 1
        left += 7
        rotation *= -1
    }
}

const renderHandWithHiddenCard = (handEl, hand) => {

    $(`#${handEl}`).append(`<img class="cardImg" src="images/gray_back.jpg"  alt="Card Back" style="transform:rotate(-2deg);zIndex:1;left:4vmin;">`)
    $(`#${handEl}`).append(`<img class="cardImg" src=${hand[0].img}  alt="card" style="transform:rotate(2deg);zIndex:2;left:11vmin">`)
}

const renderDealerHand = () => {
    console.log(winner)
    if (stay==true || winner != null){
        renderHand('dealer-hand', dealerHand)
    } else {
        renderHandWithHiddenCard('dealer-hand', dealerHand)
    }
}

const displayStatus = () => {
    if ((stay && winner) || dealerScore === 21 || playerScore > 21) {
        gameStatus = "Game Over"
        
    } else {
        gameStatus = "Hit or Stay"
    }
    $('#game-status').html(`${gameStatus}`)
}

const displayScores = () => {
    $('#score').html(`Player: ${playerScore}`)
    if (stay==true || winner != null){
        $('#dealerScore').html(`Dealer: ${dealerScore}`)
    }
    
}

const createWinnerMessage = () => {
    var message
    if (winner === 'player') {
        message = `You Win!!!`
    } else if (winner === 'dealer') {
        message = `Dealer Wins :(`
    } else if (winner === 'tie') {
        message = `It's a tie -_-`
    }
    return message
}

const displayWinner = () => {
    if (winner != null) {
        $('#winner').html(`${createWinnerMessage()}`)
    }  
}
/////HELPER FUNCTIONS/////

const renderGame = () => {  
    clearGameTable()  
    renderHand('player-hand', playerHand)
    renderDealerHand()
    displayStatus()
    displayScores()   
    displayWinner()
}

// --------- Deal Hands ----------------//

/////HELPER FUNCTIONS/////
const drawCard = () => {
    return cardDeck.pop()
}

const dealCard = (hand) => {
    hand.push(drawCard())
    getScore(hand)
}
/////HELPER FUNCTIONS/////

const dealOpeningHands = () => {
    Initialize()
    play = true

    while(playerHand.length < 2) {
        dealCard(playerHand)
        dealCard(dealerHand)
    }
    checkForWinner()
    renderGame()
}

const dealToPlayer = () => {
    if ((stay == false) && (winner == null)) {
        dealCard(playerHand)
    }
    checkForWinner()
    renderGame()
}
  
const dealToDealer = () => {
    if ((stay == false) && (winner == null)) {
        stay = true
        while( dealerScore < 18) {
            dealCard(dealerHand)
        }
    checkForWinner()
    renderGame()
    }
}

/*----- event listeners -----*/ 

//$('.controlBtn').on('click', updateGame)

$('#play').on('click', dealOpeningHands)
$('#hit').on('click', dealToPlayer)
$('#stay').on('click', dealToDealer)


