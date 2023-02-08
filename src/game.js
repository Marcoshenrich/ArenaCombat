import Knight from './knight.js'
import Opponent from './opponent.js'

export default class Game {
    constructor(crowd, sound) { 
        this.knight = new Knight()
        this.opponent = new Opponent()
        this.crowd = crowd
        
        this.numCardsDraw = 0
        this.gameOver = false
        this.gameWin = false
        this.gameLoss = false
        this.cardLoss = false

        this.playedCard = null
        this.opponentCard = null
        this.sound = sound
    }
        
    setupMat() {
        let deckSlot = document.getElementById("deck-slot")
        deckSlot.innerHTML += '<img src="' + this.knight.deckObj.fullDeck.src + '" id="deckArt" width="140px" height="200px"/>'
        
        let deck = this.knight.deck
        for (let i = 1; i <= 5; i++) {	
            let card = deck[i - 1]
            let slotId = "card-slot" + i
            let slot = document.getElementById(slotId)
            slot.classList.remove("empty")
            slot.classList.add("full")
            slot.innerHTML += `<img src="${card.src}" id="${card.id}" class="card" width="280px" height="280px"/>`;
        }

        this.knight.deck = deck.slice(5, deck.length)
    }

    clearMat() {
        let deckSlot = document.getElementById("deck-slot")
        deckSlot.innerHTML = ''

        for (let i = 1; i <= 5; i++) {
            let slotId = "card-slot" + i
            let slot = document.getElementById(slotId)
            slot.classList.remove("full")
            slot.classList.add("empty")
            slot.innerHTML = '';
        }
    }

    coreGameLoop(playerCardId, slotId) {
        this.clearCardFromSlot(slotId)
        this.playedCard = this.knight.allUniqueCards[playerCardId]
        this.opponentCard = this.opponent.nextMove[0]
        this.instantCardEffects()
        this.statCalc()
        this.damageCalc()
        this.resolveStatusEffects.call(this.knight, this.knight)
        this.resolveStatusEffects.call(this.opponent, this.opponent)
        this.delayedCardEffects()

        this.knight.animationQueue.push(this.playedCard.animation)
        this.opponent.animationQueue.push(this.opponentCard.animation)

        this.gameEndCheck()
        this.crowd.excite(0)

        if (!(this.gameLoss || this.gameWin )) {
            setTimeout(async () => {
                await this.drawCards()
                this.knight.deckObj.thinDeck.call(this.knight)
                this.opponent.nextMove.shift()
                this.knight.attack = 0
                this.knight.block = 0
                this.opponent.attack = this.opponent.nextMove[0].attack.call(this)
                this.opponent.block = this.opponent.nextMove[0].block.call(this)
                this.playedCard = null
                this.opponentCard = null
            },1100)
        }
        
    }

    statCalc() {
        this.knight.attack = this.knight.statusChecker.call(this.knight, this.playedCard.attack.call(this), "attack")
        this.knight.block = this.playedCard.block.call(this)

        this.opponent.attack = this.opponentCard.attack.call(this)
        this.opponent.block = this.opponentCard.block.call(this)
    }

    gameEndCheck() {
        let i = 0
        while (i === 0) {
            i++
            if (this.knight.health < 1) {
                this.gameLoss = true
                this.sound.demonVocalize()
                this.sound.endAllSounds("loss")
                break
            }
            if (this.opponent.health < 1) {
                this.gameWin = true; 
                this.sound.endAllSounds("win")
                break;
            }
            let emptySlots = this.cardSlotCollector("empty")
            if (emptySlots.length === 5 && this.numCardsDraw === 0) {
                this.gameLoss = true
                this.cardLoss = true
                this.sound.demonVocalize()
                this.sound.endAllSounds("loss")
                break
            }
        }
    }

    damageCalc(){
        let drawACard = false
        if (this.opponent.attack > this.knight.block && !this.knight.status.damageImmune) {
            this.knight.health -= (this.opponent.attack - this.knight.block)
            drawACard = true
        }
        if (this.knight.attack > this.opponent.block) {
            this.opponent.health -= (this.knight.attack - this.opponent.block)
            drawACard = true
        }
        if (drawACard) this.numCardsDraw += 1
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

    instantCardEffects() {
        this.playedCard.instantEffects.call(this)
        this.opponentCard.instantEffects.call(this)
    }

    delayedCardEffects(playedCard, opponentCard) {
        this.playedCard.delayedEffects.call(this)
        this.opponentCard.delayedEffects.call(this)
    }

    clearCardFromSlot(slotId){
        let slot = document.getElementById(slotId)
        slot.classList.remove("full")
        slot.classList.add("empty")
        slot.innerHTML = ""
        this.knight.deckObj.graveyard++
    }

    addCardtoSlot(slotId) {
        let slot = document.getElementById(slotId)
        slot.classList.remove("empty")
        slot.classList.add("full")
        if (this.knight.deck.length > 0) {
            let card = this.knight.deck.shift()
            slot.innerHTML += `<img src="${card.src}" id="${card.id}" class="card" width="280px" height="280px"/>`;
        }
    }

    async drawCards() {
        let emptySlots = this.cardSlotCollector("empty")
        for (let i = emptySlots.length - 1; i >= 0 && this.numCardsDraw > 0; this.numCardsDraw--) {	
            let slotId = emptySlots[Math.abs(i - (emptySlots.length - 1))]
            this.sound.playSound("flipCard")
            await this.delay(500)
            this.addCardtoSlot(slotId) 
            i--
        }
        this.numCardsDraw = 0
    }

    cardSlotCollector(filledOrEmpty) {
        let cardSlots = document.querySelectorAll(".card-slot")
        let slots = []
        for (let i = 0; i < cardSlots.length; i++) {
            let cardslot = cardSlots[i];
            if (filledOrEmpty === "empty") {
                if (!cardslot.firstChild) slots.push(cardslot.id)
            } else {
                if (cardslot.firstChild) slots.push(cardslot.id)
            }
        }
        return slots
    }

    delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

}

