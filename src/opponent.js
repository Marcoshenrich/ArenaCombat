import Combatant from './combatant.js'
import Deck from './deck.js'

export default class Opponent extends Combatant {
    constructor() { 
        super()
        this.image = new Image()
        this.image.src = '../../dist/art/demon/_Idle.png'
        this.spriteWidth = 500;
        this.spriteHeight = 400;
        this.sizeCoef = 1
        this.xPosition = 300
        this.yPosition = 319
        this.animationTripper = -1
        this.animationQueue = []

        this.deckObj = new Deck(this, 100)
        this.nextMove = this.deckObj.stack
        this.allUniqueCards = this.deckObj.allUniqueCards

        this.maxHealth = 30
        this.health = this.maxHealth
        this.attack = this.nextMove[0].attack.call(this)
        this.block = this.nextMove[0].block.call(this)

        this.animationStates = [
        { name: "idle", frames: 6, src: '../../dist/art/demon/_Idle.png' },
        { name: "attack", frames: 5, src: '../../dist/art/demon/_Attack.png' },
        { name: "attack2", frames: 6, src: '../../dist/art/demon/_Attack2.png' },
        { name: "attack3", frames: 6, src: '../../dist/art/demon/_Attack3.png' },
        { name: "hit", frames: 3, src: '../../dist/art/demon/_Hit.png' },
        { name: "death", frames: 4, src: '../../dist/art/demon/_Death.png' },
        { name: "dead", frames: 1, src: '../../dist/art/demon/_Dead.png' },
        { name: "flash", frames: 6, src: '../../dist/art/demon/_Flash.png' },
        ];

        this.animationFramesSetter()

        this.blindedCard = { }
        this.blindedCard["art"] = new Image()
        this.blindedCard.art.src = "../../dist/art/opponent_cards/mblinded.png"

        this.status = { }
    }




}

Opponent.prototype.animation = function (aniStateName) {
    this.animationState = aniStateName
    this.image.src = this.animations[aniStateName].src
    this.animationTripper = this.framesFinder(aniStateName)
}





