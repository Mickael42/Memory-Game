
class Card {


    constructor() {
        this.unicodes = ['🐓', '🍾', '🇫🇷', '🍺', '🚒', '🐓', '🍾', '🐄', '🇫🇷', '🚒', '🍺', '🐄'];
        this.shuffle(this.unicodes);
        this.card1;
        this.card2;
        this.numberOfClick = 0;
        this.idSelectedCard;
        this.signCard;
        this.cardPlace = document.querySelector('.row');
        this.classCard;


        for (let i = 0; i < this.unicodes.length; i++) {
            this.creatCard(i, this.unicodes[i]);
        }
    };

    creatCard(i, unicodes) {
        this.cardPlace.innerHTML += '<div class="col-lg-3 colCard" name="rowCard' + unicodes + '" ><div class="cardCont" id ="card' + i + '" name="' + unicodes + '">' + unicodes + '</div></div>';
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
            if (this.idSelectedCard !== event.target.id && event.target.className !== "cardSuccess" && this.numberOfClick < 2) {
                this.returnCard(cardSelected);

            }
            if (this.card1 == this.card2) {
                this.cardsWinner = document.getElementsByName(this.card1);
                this.cardsWinner.forEach(cardWinner => {
                    this.ifWin(cardWinner);
                });

            }
            this.idSelectedCard = event.target.id;
            this.signCard = event.target.innerHTML;

            if (event.target.className !== "cardSuccess") {
                setTimeout(() => {
                    this.ifWrong(cardSelected);
                }, 1500);
            }
        }
        );
    });
}

    returnCard(cardSelected) {

        if (this.numberOfClick < 1) {
            this.selectCard1(cardSelected);
        } else if (this.numberOfClick = 1) {
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
        this.numberOfClick = 2;
    }


    ifWin(cardWinner) {
        cardWinner.className = "cardSuccess";
        this.numberOfClick = 0;
        this.card1 = "";
        this.card2 = "";
        /* cardWinner.style.backgroundColor = "green";  */
    };


    ifWrong(cardSelected){
        cardSelected.className = 'cardCont';
        this.numberOfClick = 0;
        this.card1 = "";
        this.card2 = "";
    }

    reloadGame(){
        let refresh = document.querySelector('button');
        refresh.addEventListener('click', location.reload(), false)
    };


    restart(){
        this.button = document.querySelector('button');
        this.button.addEventListener('click', event => {
            this.reloadGame();
        })
    }
}





let game = new Card();
game.play()
game.restart();



