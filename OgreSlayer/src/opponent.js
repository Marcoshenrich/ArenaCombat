export default class Opponent {
    constructor() { 
        this.opponentImage = new Image()
        this.opponentImage.src = 'art/demon/_Idle.png'
        this.opponentSpriteWidth = 100;
        this.opponentSpriteHeight = 80;
        this.health = 80

        this.opponentAnimations = [];
        this.animationFramesSetter()
        this.nextMove = []
        this.nextMoveMaker()
        this.attack = 0
        this.block = 0
    }

    animationFramesSetter() {
        this.opponentAnimationStates = [
            { name: "idle", frames: 6, src: 'art/demon/_Idle.png' },
            { name: "attack", frames: 5, src: 'art/demon/_Attack.png' },
        ];

        this.opponentAnimationStates.forEach((opponentState) => {
            let frames = {
                loc: [],
                src: opponentState.src
            }
            for (let j = 0; j < opponentState.frames; j++) {
                let positionX = j * this.opponentSpriteWidth;
                let positionY = 0;
                frames.loc.push({ x: positionX, y: positionY });
            }
            this.opponentAnimations[opponentState.name] = frames;
        });

     
    }

    nextMoveMaker() {
        const basicCards = {
            strike: { A: 3, B: 0, src: "art/strike.png" },
            defend: { A: 0, B: 5 },
            reposition: { A: 0, B: 2, draw: 2 }
        }

        for (let i = 0; i < 100; i++) {	
            let img = new Image()
            let card = basicCards.strike
            img.src = card.src
            card.art = img
            this.nextMove.push(card)
        }



    }


}






