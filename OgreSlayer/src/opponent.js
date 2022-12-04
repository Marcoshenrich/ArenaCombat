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
        console.log(this.nextMove);

        this.health = 80

        this.animationStates = [
        { name: "idle", frames: 6, src: 'art/demon/_Idle.png' },
        { name: "attack", frames: 5, src: 'art/demon/_Attack.png' },
        ];

        this.animationFramesSetter()


    }

    nextMoveMaker() {
        const basicCards = {
            strike: { attack: 3, block: 0, src: "art/strike.png" },
            heal: { attack: 0, block: 2, src: "art/heal.png" },
        }

        for (let i = 0; i < 100; i++) {	
            let img = new Image()
            let cards = Object.keys(basicCards)
            let card = basicCards[cards[[cards.length * Math.random() << 0]]]
            img.src = card.src
            card.art = img
            this.nextMove.push(card)
        }
    }


}

Opponent.prototype.idleAnimation = function () {
    this.animationState = "idle"
    this.image.src = this.animations["idle"].src
}

Opponent.prototype.attackAnimation = function () {
    this.animationState = "attack"
    this.image.src = this.animations["attack"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 830)
}






