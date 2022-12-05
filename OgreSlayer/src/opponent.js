import Combatant from './combatant.js'
import Deck from './deck.js'

export default class Opponent extends Combatant {
    constructor() { 
        super()
        this.image = new Image()
        this.image.src = 'art/demon/_Idle.png'
        this.spriteWidth = 100;
        this.spriteHeight = 80;
        this.xPosition = 400
        this.yPosition = 475

        this.deckObj = new Deck(this, 100)
        this.nextMove = this.deckObj.stack
        this.allUniqueCards = this.deckObj.allUniqueCards

        this.maxHealth = 80
        this.health = this.maxHealth
        this.attack = this.nextMove[0].attack
        this.block = this.nextMove[0].block

        this.animationStates = [
        { name: "idle", frames: 6, src: 'art/demon/_Idle.png' },
        { name: "attack", frames: 5, src: 'art/demon/_Attack.png' },
        { name: "attack2", frames: 6, src: 'art/demon/_Attack2.png' },
        { name: "attack3", frames: 6, src: 'art/demon/_Attack3.png' },
        { name: "hit", frames: 3, src: 'art/demon/_Hit.png' },
        ];

        this.animationFramesSetter()

        this.status = {}
        this.blindedCard = new Image()
        this.blindedCard.src = "art/opponent_cards/mblinded.png"
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

Opponent.prototype.attacktwiceAnimation = function () {
    this.animationState = "attack"
    this.image.src = this.animations["attack"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 1660)
}

Opponent.prototype.attack2Animation = function () {
    this.animationState = "attack2"
    this.image.src = this.animations["attack2"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 1000)
}


Opponent.prototype.attack3Animation = function () {
    this.animationState = "attack3"
    this.image.src = this.animations["attack3"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 1000)
}


Opponent.prototype.hitAnimation = function () {
    this.animationState = "hit"
    this.image.src = this.animations["hit"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 500)
}









