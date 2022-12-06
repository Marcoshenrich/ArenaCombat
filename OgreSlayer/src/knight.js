import Combatant from './combatant.js'
import Deck from './deck.js'

export default class Knight extends Combatant {
    constructor(){
        super()
        this.image = new Image()
        this.image.src = 'art/knight1/_Idle.png'
        this.spriteWidth = 120;
        this.spriteHeight = 80;
        this.xPosition = 210
        this.yPosition = 450
        this.sizeCoef = 3.5
        this.animationTripper = 0

        this.maxHealth = 1
        this.health = this.maxHealth

        this.deckObj = new Deck(this, 14)
        this.deck = this.deckObj.stack
        this.allUniqueCards = this.deckObj.allUniqueCards

        this.animationStates = [
        { name: "idle", frames: 10, src: 'art/knight1/_Idle.png' },
        { name: "attack", frames: 4, src: 'art/knight1/_Attack.png' },
        { name: "attack2", frames: 6, src: 'art/knight1/_Attack2nm.png' },
        { name: "combo", frames: 10, src: 'art/knight1/_AttackCombonm.png' },
        { name: "death", frames: 10, src: 'art/knight1/_Death.png' },
        { name: "dead", frames: 1, src: 'art/knight1/_Dead.png' },
        { name: "roll", frames: 12, src: 'art/knight1/_Roll.png' },
        { name: "duck", frames: 3, src: 'art/knight1/_CrouchAll.png' },
        { name: "crouchAttack", frames: 6, src: 'art/knight1/_CrouchAttack.png' },
        { name: "hit", frames: 6, src: 'art/knight1/Hit.png' },
        ];

        this.animationFramesSetter()

        this.status = {
            blinded: false,
            ttblinded: 0,
            opponentPoiseBroken: false,
            ttopponentPoiseBroken: 0,
            damageImmune: false,
            ttdamageImmune: 0
        }
    }

    framesFinder (aniStateName) {
        for (let frameObj in this.animationStates) {
            if (frameObj[aniStateName]) return frameObj["frames"]
        }
    }


}


Knight.prototype.statusChecker = function (unModValue, stat) {
    switch (stat) {
        case "attack":
            if (this.status["opponentPoiseBroken"]) return unModValue * 2
        default:
            return unModValue
    }
}

Knight.prototype.idleAnimation = function () {
    this.animationState = "idle"
    this.image.src = this.animations["idle"].src
}

Knight.prototype.attackAnimation = function() {
    // this.animationTripper = this.framesFinder(aniStateName)
    this.animationState = "attack"
    this.image.src = this.animations["attack"].src





    setTimeout(() => {
        this.idleAnimation()
    }, 830)
}

Knight.prototype.attack2Animation = function () {
    this.animationState = "attack2"
    this.image.src = this.animations["attack2"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 1000)
}

Knight.prototype.comboAnimation = function () {
    this.animationState = "combo"
    this.image.src = this.animations["combo"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 1650)
}

Knight.prototype.deathAnimation = function () {
    this.animationState = "death"
    this.image.src = this.animations["death"].src

    setTimeout(() => {
        this.deadAnimation()
    }, 1650)
}

Knight.prototype.deadAnimation = function () {
    this.animationState = "dead"
    this.image.src = this.animations["dead"].src
}

Knight.prototype.rollAnimation = function () {
    this.animationState = "roll"
    this.image.src = this.animations["roll"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 1830)
}

Knight.prototype.duckAnimation = function () {
    this.animationState = "duck"
    this.image.src = this.animations["duck"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 650)
}

Knight.prototype.crouchAttackAnimation = function () {
    this.animationState = "crouchAttack"
    this.image.src = this.animations["crouchAttack"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 1000)
}
