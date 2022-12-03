import Combatant from './combatant.js'

export default class Opponent extends Combatant {
    constructor() { 
        super()
        this.image = new Image()
        this.image.src = 'art/demon/_Idle.png'
        this.spriteWidth = 100;
        this.spriteHeight = 80;
        this.xPosition = 400
        this.yPosition = 475
        
        this.nextMove = []
        this.nextMoveMaker()

        this.health = 80

        this.animationStates = [
        { name: "idle", frames: 6, src: 'art/demon/_Idle.png' },
        { name: "attack", frames: 5, src: 'art/demon/_Attack.png' },
        ];

        this.animationFramesSetter()


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






