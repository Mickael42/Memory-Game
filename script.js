
class Card {


    constructor() {
        this.unicodes = ['🐓', '🍾', '🇫🇷', '🚒', '🐓', '🍾', '🇫🇷','🚒'];
        this.shuffle(this.unicodes);
        this.card1;
        this.card2;
        this.numberOfClick = 0;
        this.idSelectedCard;
        this.signCard;


        for (let i = 0; i < this.unicodes.length; i++) {

            this.creatCard(i, this.unicodes[i]);
        }
    };

    creatCard(i, unicodes) {
        this.cardContainer = document.write('<div class="cardCont" id ="card' + i + '" name="' + unicodes + '">' + unicodes + '</div>');
    };

    shuffle(array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    };

    play() {
        this.cardsSelected = document.querySelectorAll('.cardCont');
        this.cardsSelected.forEach(cardSelected => {
            cardSelected.addEventListener('click', event => {

                if (this.idSelectedCard !== event.target.id) {
                    this.returnCard(cardSelected);
                    console.log(event.target.innerHTML);

                    if (this.signCard == event.target.innerHTML) {
                        let cardsWinner = document.getElementsByName(this.signCard);
                        this.ifWin(cardsWinner);
                    }

                    this.idSelectedCard = event.target.id;
                    this.signCard = event.target.innerHTML;
                    this.numberOfClick++;
                    
                    setTimeout(() => {
                        this.ifWrong(cardSelected);
                    }, 1000);

                }
            });
        });

    }

    returnCard(cardSelected) {

        if (this.numberOfClick <= 1) {
            this.selectCard1(cardSelected);
        } else {
            this.selectCard2(cardSelected);
        }

    }
    selectCard1(cardSelected) {

        cardSelected.className = 'cardBack';
        this.card1 = event.target.innerHTML;
        this.numberOfClick = 1;

    };


    selectCard2(cardSelected) {
        //selection carte 2
        cardSelected.className = 'cardBack';
        this.card2 = event.target.innerHTML;
        this.numberOfClick = 0;
    }


    ifWin(cardsWinner) {
        cardsWinner.forEach(cardWinner => {
            cardWinner.style.backgroundColor = "green";
        });

    }

    ifWrong(cardSelected){
        cardSelected.className='cardCont';
    }
}

let game = new Card();
game.play()



