import Combatant from './combatant.js'
import Deck from './deck.js'

export default class Knight extends Combatant {
    constructor(){
        super()
        this.name = "Knight"
        this.image = new Image()
        this.image.src = './dist/art/knight1/Idle.png'
        this.spriteWidth = 419.5;
        this.spriteHeight = 280;
        this.xPosition = -280
        this.yPosition = 400
        this.sizeCoef = 1

        this.maxHealth = 20
        this.health = this.maxHealth

        this.deckObj = new Deck(this, 15)
        this.deck = this.deckObj.stack
        this.allUniqueCards = this.deckObj.allUniqueCards

        this.animationStates = [
        { name: "idle", frames: 10, src: './dist/art/knight1/Idle.png' },
        { name: "attack", frames: 5, src: './dist/art/knight1/Attack.png' },
        { name: "attack2", frames: 6, src: './dist/art/knight1/Attack2nm.png' },
        { name: "combo", frames: 10, src: './dist/art/knight1/AttackCombonm.png' },
        { name: "death", frames: 9, src: './dist/art/knight1/Death.png' },
        { name: "dead", frames: 1, src: './dist/art/knight1/Dead.png' },
        { name: "roll", frames: 12, src: './dist/art/knight1/Roll.png' },
        { name: "duck", frames: 3, src: './dist/art/knight1/CrouchAll.png' },
        { name: "crouchAttack", frames: 6, src: './dist/art/knight1/CrouchAttack.png' },
        { name: "hit", frames: 6, src: './dist/art/knight1/Hit.png' },
        { name: "run", frames: 10, src: './dist/art/knight1/Run.png' },
        ];

        this.animationFramesSetter()
        this.allImages = this.imgObjectMaker()

        this.status = {
            blinded: false,
            ttblinded: 0,
            rrblinded: "Blinded",
            opponentPoiseBroken: false,
            ttopponentPoiseBroken: 0,
            rropponentPoiseBroken: "Double damage",
            damageImmune: false,
            ttdamageImmune: 0,
            rrdamageImmune: "Damage immune"
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



