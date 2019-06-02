
class Card {


    constructor() {
        this.unicodes = ['🐓', '🍾', '🌄', '🍺', '🚒', '🐓', '🍾', '🐄', '🌄', '🚒', '🍺', '🐄'];
        this.shuffle(this.unicodes);
        this.card1Symbol;
        this.card2Symbol;
        this.numberOfClick = 0;
        this.cardPlace = document.querySelector('.row');
        this.classCard;
        this.numberOfCorrect=0;
        this.numberOfTotalClick = 0;
        this.card1Id;


        for (let i = 0; i < this.unicodes.length; i++) {
            this.creatCard(i, this.unicodes[i]);
        }
    };

    creatCard(i, unicodes) {
        let divCard = document.createElement("div");
        divCard.setAttribute('class', 'col-md-3 colCard');
        divCard.setAttribute('data-symbol', ''+unicodes+'')
        divCard.setAttribute('id', 'card'+i+'');
        let symbolCard = document.createTextNode(unicodes);
        divCard.appendChild(symbolCard);
        this.cardPlace.appendChild(divCard);
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

showNumberOfClics(){
    this.placeTotalClics = document.querySelector('span');
    this.placeTotalClics.innerHTML = this.numberOfTotalClick;
}



play() {
    this.cardsSelected = document.querySelectorAll('.colCard');

    this.cardsSelected.forEach(cardSelected => {
        cardSelected.addEventListener('click', event => {

            //On retourne une carte si : 
            // -la carte que l'on souhaite séléctionner n'est pas déja séléctionné (clique sur la même carte)
            // -la carte que l'on souhaite séléctionner n'est pas déjà été remporté (en vert)
            // -que l'on ne séléctionne pas plus de 2 cartes

            if (this.card1Id!==event.target.id && this.dataSymbolCard !== event.target.dataset.symbol && event.target.className !== "col-lg-3 cardSuccess" && this.numberOfClick < 2) {
                this.returnCard(cardSelected);
                this.numberOfTotalClick++;
                console.log(this.numberOfTotalClick)
            }

            console.log('Le data symbole de la Carte 1  est :'+this.card1+'');
            console.log('Le data symbole de la Carte 2  est :'+this.card2+'');

            if (this.card1 == this.card2) {
                console.log('WINNN');
                this.cardsWinner = document.querySelectorAll('.cardBack[data-symbol ="'+this.card1+'"]');
                this.cardsWinner.forEach(cardWinner => {
                  this.ifWin(cardWinner);
                  console.log(this.numberOfCorrect);
                });

            }

              if (this.numberOfClick== 2 && event.target.className !== ".col-lg-3 cardSuccess") {
                setTimeout(() => {
                    this.cardLoser1 = document.querySelector('.cardBack[data-symbol ="'+this.card1+'"]');
                    this.cardLoser2 = document.querySelector('.cardBack[data-symbol ="'+this.card2+'"]');
                    
                    this.ifWrong(this.cardLoser1);
                    this.ifWrong(this.cardLoser2);
                }, 1000);
            }  

            
             if (this.numberOfCorrect == this.unicodes.length){
                this.winWindow(); 
             }

             this.showNumberOfClics();
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
        cardSelected.className = "col-lg-3 cardBack";
        this.card1 = event.target.dataset.symbol;
        this.card1Id = event.target.id;
        this.numberOfClick = 1;

    };
    selectCard2(cardSelected) {
        cardSelected.className = "col-lg-3 cardBack";
        this.card2 = event.target.dataset.symbol;
        this.numberOfClick = 2;
    }


    ifWin(cardWinner) {
        cardWinner.className = "col-lg-3 cardSuccess";
        this.numberOfClick = 0;
        this.card2 = undefined;
        this.numberOfCorrect+=1;

    };


    ifWrong(cardSelected){
        cardSelected.className = 'col-lg-3 colCard';
        this.numberOfClick = 0;
        this.card1 = undefined;
        this.card2 = undefined;
    }

    winWindow(){
        window.confirm('Vous avez gagné');
        if (confirm ("Vous avez gagné")){
            (location.reload(), false);
        }
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
game.showNumberOfClics();
game.restart();



