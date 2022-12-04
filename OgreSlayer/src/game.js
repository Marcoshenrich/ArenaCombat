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
            slot.innerHTML += '<img src="' + card.src + '" id="' + card.id + '" class="card" + " width="280px" height="280px"/>';

        }

        this.knight.deck = deck.slice(5, deck.length)
    }

    coreGameLoop(playerCardId, slotId) {
        this.clearCardFromSlot(slotId)

        let playedCard = this.knight.allUniqueCards[playerCardId]
        let opponentCard = this.opponent.nextMove[0]

        this.knight.attack = playedCard.attack
        this.knight.block = playedCard.block

        this.opponent.attack = opponentCard.attack
        this.opponent.block = opponentCard.block

        this.damageCalc()
        this.cardEffects(playedCard, opponentCard)

        playedCard.animation()
        opponentCard.animation()
        setTimeout(() => {
            this.addCardtoSlot(slotId)
            this.opponent.nextMove.shift()
            this.knight.attack = 0
            this.knight.block = 0
            this.opponent.attack = this.opponent.nextMove[0].attack
            this.opponent.block = this.opponent.nextMove[0].block
        },1100) //should match the pause interval in indexlisteners
    }

    damageCalc(){
        if (this.opponent.attack > this.knight.block) this.knight.health -= (this.opponent.attack - this.knight.block)
        if (this.knight.attack > this.opponent.block) this.opponent.health -= (this.knight.attack - this.opponent.block)
    }

    cardEffects(playedCard, opponentCard) {
        console.log(playedCard.effects);
        console.log(opponentCard.effects);
        console.log(this);
        playedCard.effects.call(this)
        opponentCard.effects.call(this)
    }

    clearCardFromSlot(slotId){
        let slot = document.getElementById(slotId)
        slot.innerHTML = ""
    }

    addCardtoSlot(slotId) {
        let slot = document.getElementById(slotId)
        if (this.knight.deck.length > 0) {
            let card = this.knight.deck.shift()
            slot.innerHTML += '<img src="' + card.src + '" id="' + card.id + '" class="card" width="280px" height="280px"/>';
        }
    }

}

