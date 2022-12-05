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
        
        this.instantCardEffects(playedCard, opponentCard)

        this.knight.attack = this.knight.statusChecker.call(this.knight, playedCard.attack.call(this), "attack")
        this.knight.block = playedCard.block.call(this)

        this.opponent.attack = opponentCard.attack.call(this)
        this.opponent.block = opponentCard.block.call(this)

        this.damageCalc()
        
        this.resolveStatusEffects.call(this.knight, this.knight)
        this.resolveStatusEffects.call(this.opponent, this.opponent)
        
        this.delayedCardEffects(playedCard, opponentCard)

        playedCard.animation()
        opponentCard.animation()
        setTimeout(() => {
            this.addCardtoSlot(slotId)
            this.opponent.nextMove.shift()
            this.knight.attack = 0
            this.knight.block = 0
            this.opponent.attack = this.opponent.nextMove[0].attack.call(this)
            this.opponent.block = this.opponent.nextMove[0].block.call(this)
        },1100) //should match the pause interval in indexlisteners
    }

    damageCalc(){

        if (this.opponent.attack > this.knight.block) this.knight.health -= (this.opponent.attack - this.knight.block)
        if (this.knight.attack > this.opponent.block) this.opponent.health -= (this.knight.attack - this.opponent.block)
    }

    resolveStatusEffects() {
        let statuses = Object.keys(this.status)
        for (let i = 0; i < statuses.length; i++) {	
            let statusTimerKey = statuses[i]

            if (statusTimerKey.slice(0, 2) === "tt" && this.status[statusTimerKey] > 0) {
                let actualStatusKey = statusTimerKey.slice(2)
                this.status[statusTimerKey] -= 1
                if (this.status[statusTimerKey] === 0) {
                    this.status[actualStatusKey] = false
                }
            }
        }
    }

    instantCardEffects(playedCard, opponentCard) {
        playedCard.instantEffects.call(this)
        opponentCard.instantEffects.call(this)
    }

    delayedCardEffects(playedCard, opponentCard) {
        playedCard.delayedEffects.call(this)
        opponentCard.delayedEffects.call(this)
    }

    clearCardFromSlot(slotId){
        let slot = document.getElementById(slotId)
        slot.innerHTML = ""
        this.knight.deckObj.graveyard++
    }

    addCardtoSlot(slotId) {
        let slot = document.getElementById(slotId)
        if (this.knight.deck.length > 0) {
            let card = this.knight.deck.shift()
            slot.innerHTML += '<img src="' + card.src + '" id="' + card.id + '" class="card" width="280px" height="280px"/>';
        }
    }

}

