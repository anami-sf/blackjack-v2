/*----- constants -----*/ 

const playerHand = 'player-hand'
const dealerHand = 'dealer-hand'

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
}

Initialize()

/*----- app's state (variables) -----*/ 
/*----- cached element references -----*/


//pop card from deck
//push card into hand

const dealtCard = cardDeck.pop()



/*----- functions -----*/

const draw = (hand) => {
    const dealtCard = cardDeck.pop()
    const imgEl = `<img class="cardImg" src=${dealtCard.img}  alt="jQuery">`

    $(`#${hand}`).append(imgEl)    
}

const deal = (evt) => {
    
    console.log('playerCards', playerCards)

    if (evt.target.getAttribute("id") === "hit") {
        console.log('Cliekd hit')
        draw(playerHand)
    } else if (evt.target.getAttribute("id") === "stay") {
        console.log('Cliekd stay')
        draw(dealerHand)
    } else {

        //TODO: switch logic of loop to go by length of each player's hand. 

        var dealerCards = $('#dealer-hand').children().length
        var playerCards = $('#player-hand').children().length

        numbers = [1,2]
        for(num of numbers) {
            console.log('dealerCards', dealerCards)
            draw(playerHand)
            draw(dealerHand)
        }
    }

}

/*----- event listeners -----*/ 
$('#control-panel').on('click', deal)






