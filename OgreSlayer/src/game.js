import Knight from './knight.js'
import Opponent from './opponent.js'

export default class Game {
    constructor() { 
        this.knight = new Knight()
        this.opponent = new Opponent()
        this.setupMat()
    }

    setupMat() {
        let deck = this.knight.deck

        for (let i = 1; i <= 5; i++) {	
            let card = deck[i - 1]
            let slotId = "card-slot" + i
            let slot = document.getElementById(slotId)
            slot.innerHTML += '<img src="' + card.src + '" id="' + card.id + '" + " width="280px" height="280px"/>';

        }

        this.knight.deck = deck.slice(5, deck.length)
    }

    coreGameLoop(playerCardId, slotId) {
        let playedCard = this.knight.allUniqueCards[playerCardId]

        this.knight.attack = playedCard.attack
        this.knight.block = playedCard.attack

        this.opponent.attack = this.opponent.nextMove[0].attack
        this.opponent.block = this.opponent.nextMove[0].block

        this.damageCalc()
        this.cardEffects()

        // if (playedCard.effects) knightTest[knightcard].effects()

        playedCard.animation()
        this.opponent.nextMove[0].animation()
        this.opponent.nextMove.shift()
        this.resolveMatState(slotId)

    }

    damageCalc(){
        if (this.opponent.attack > this.knight.block) this.knight.health -= (this.opponent.attack - this.knight.block)
        if (this.knight.attack > this.opponent.block) this.opponent.health -= (this.knight.attack - this.opponent.block)
    }

    cardEffects() {

    }

    resolveMatState(slotId) {
        let slot = document.getElementById(slotId)
        slot.innerHTML = ""

        if (this.knight.deck.length > 0) {
            let card = this.knight.deck.shift()
            slot.innerHTML = ""
            slot.innerHTML += '<img src="' + card.src + '" id="' + card.id + '" + " width="280px" height="280px"/>';
        }
    }

}

