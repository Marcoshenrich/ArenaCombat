import Combatant from './combatant.js'
import Deck from './deck.js'

export default class Knight extends Combatant {
    constructor(){
        super()
        
        this.image = new Image()
        this.image.src = '../../dist/art/knight1/_Idle.png'
        this.spriteWidth = 419.5;
        this.spriteHeight = 280;
        this.xPosition = -280
        this.yPosition = 400
        this.sizeCoef = 1

        this.maxHealth = 30
        this.health = this.maxHealth

        this.deckObj = new Deck(this, 14)
        this.deck = this.deckObj.stack
        this.allUniqueCards = this.deckObj.allUniqueCards

        this.animationStates = [
        { name: "idle", frames: 10, src: '../../dist/art/knight1/_Idle.png' },
        { name: "attack", frames: 5, src: '../../dist/art/knight1/_Attack.png' },
        { name: "attack2", frames: 6, src: '../../dist/art/knight1/_Attack2nm.png' },
        { name: "combo", frames: 10, src: '../../dist/art/knight1/_AttackCombonm.png' },
        { name: "death", frames: 10, src: '../../dist/art/knight1/_Death.png' },
        { name: "dead", frames: 1, src: '../../dist/art/knight1/_Dead.png' },
        { name: "roll", frames: 12, src: '../../dist/art/knight1/_Roll.png' },
        { name: "duck", frames: 3, src: '../../dist/art/knight1/_CrouchAll.png' },
        { name: "crouchAttack", frames: 6, src: '../../dist/art/knight1/_CrouchAttack.png' },
        { name: "hit", frames: 6, src: '../../dist/art/knight1/_Hit.png' },
        { name: "run", frames: 10, src: '../../dist/art/knight1/_Run.png' },
        ];

        this.animationFramesSetter()

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



