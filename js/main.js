/*----- constants -----*/ 

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
console.log(cardDeck[0])

//console.log(cardDeck)
/*----- app's state (variables) -----*/ 
/*----- cached element references -----*/

//pop card from deck
//push card into hand

const dealtCard = cardDeck.pop()



/*----- functions -----*/
const hit  = (evt) => {
    const dealtCard = cardDeck.pop()
    $('#player-hand').append(`<img class="cardImg" src=${dealtCard.img} alt="jQuery">`)

    console.log('el', $('#dealer-hand').children().length)
}

/*----- event listeners -----*/ 
$('#hit').on('click', hit)






