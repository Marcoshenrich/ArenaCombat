export default class Deck {
    constructor(combatant, decksize) { 
        this.combatant = combatant
        this.stack = []
        this.allUniqueCards = {}
        this.deckMaker(decksize)
        this.graveyard = 0

        this.fullDeck = new Image()
        this.fullDeck.src = "./dist/art/deck/full_deck.png"

        this.halfDeck = new Image()
        this.halfDeck.src = "./dist/art/deck/half_deck.png"

        this.emptyDeck = new Image()
        this.emptyDeck.src = "./dist/art/deck/empty_deck.png"
    }


    deckMaker(decksize) {
        let infiniteDeck;
        let cardStats;
        
        if (this.combatant.name === "Knight") {
            cardStats = this.playerCards(this.combatant)
            infiniteDeck = false
        } else {
            cardStats = this.opponentCards(this.combatant)
            infiniteDeck = true
        }
        let allCardNames = Object.keys(cardStats)

        for (let i = 0; i < allCardNames.length; i++) {
            let card = cardStats[allCardNames[i]]
            let img = new Image()
            img.src = card.src
            card.art = img
            this.allUniqueCards[allCardNames[i]] = card
        }

        for (let i = 0; i < decksize; i++) {
            let card;
            if (infiniteDeck) {
                let allUniqueCardkeys = Object.keys(this.allUniqueCards)
                card = this.allUniqueCards[allUniqueCardkeys[allUniqueCardkeys.length * Math.random() << 0]]
            } else {
                card = this.allUniqueCards[allCardNames[i]]
            }
            this.stack.push(card)
        }

        if (!infiniteDeck) {
            this.shuffleDeck()
        } else {
            this.pruneDeck()
        }
    }

    pruneDeck() {
        let resetStack = []
        let bF = this.allUniqueCards["blindingFlash"]
        let gP = this.allUniqueCards["groundPound"]
        let interval;

        for (let i = 0; i < this.stack.length - 3; i++) {	
            let card = this.stack[i]
            if (interval && card === bF) {
                interval--
                continue
            } else {
                if (card === bF) interval = 3
                resetStack.push(card)
            }
        }

        for (let i = 0; i < resetStack.length - 3; i++) {
            let card = resetStack[i]
            if (interval && card === gP) {
                interval--
                continue
            } else {
                if (card === gP) interval = 3
                this.stack.unshift(card)
            }
        }
    }

    shuffleDeck() {
        for (let i = this.stack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.stack[i];
            this.stack[i] = this.stack[j];
            this.stack[j] = temp;
        }
    }

    playerCards(knight) {
        
        return {
            strike: {
                id: "strike",
                attack: function() { return 4 },
                block: function () { return 0 },
                src: "./dist/art/knight_cards/strike.png",
                animation: "attack",
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            defend: {
                id: "defend",
                attack: function () { return 0 },
                block: function () { return 5 },
                src: "./dist/art/knight_cards/defend.png",
                animation: "attack2",
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            reposition: {
                id: "reposition",
                attack: function () { return 0 },
                block: function () { return 2 },
                src: "./dist/art/knight_cards/reposition.png",
                animation: "duck",
                instantEffects: function () { },
                delayedEffects: function () { 
                    this.numCardsDraw += 1 
                } // draw a card
            },

            taunt: {
                id: "taunt",
                attack: function () { return 0 },
                block: function () { return 4 },
                src: "./dist/art/knight_cards/taunt.png",
                animation: "duck",
                instantEffects: function () { },
                delayedEffects: function () { 
                    this.opponent.nextMove[1] = this.opponent.allUniqueCards["strike"]
                } // your opponent must use strike next turn
            },

            parry: {
                id: "parry",
                attack: function () { return 0 },
                block: function () { return 0 },
                src: "./dist/art/knight_cards/parry.png",
                animation: "combo",
                instantEffects: function () {},
                delayedEffects: function () { 
                    if (this.opponentCard.attack) {
                        this.opponent.health -= 4
              
                        this.knight.heal(this.opponentCard.attack())
                    }
                } // If your opponent attacks this turn, you negate the attack and they take 4 damage.
            },

            shieldShatter: {
                id: "shieldShatter",
                attack: function () { return 0 },
                block: function () { return 0 },
                src: "./dist/art/knight_cards/shield_shatter.png",
                animation: "attack2",
                instantEffects: function () {
                    this.opponent.health -= (this.opponentCard.block() * 2)
                    this.numCardsDraw += 1
                },
                delayedEffects: function () {
                } // deal damage equal to twice your opponent's block
            },

            shieldOfFaith: {
                id: "shieldOfFaith",
                attack: function () { return 0 },
                block: function () { return 5 },
                src: "./dist/art/knight_cards/shield_of_faith.png",
                animation: "attack2",
                instantEffects: function () { },
                delayedEffects: function () { 
                    this.knight.status["damageImmune"] = true
                    this.knight.status["ttdamageImmune"] = 1
                } //You take no damage next turn
            },

            dodge: {
                id: "dodge",
                attack: function () { return 0 },
                block: function () { return 0 },
                src: "./dist/art/knight_cards/dodge.png",
                animation:  "roll",
                instantEffects: function () { 
                    this.knight.status["damageImmune"] = true
                    this.knight.status["ttdamageImmune"] = 1
                },
                delayedEffects: function () { 
                    // if (this.opponent.attack > this.knight.block) this.knight.health += (this.opponent.attack - this.knight.block)
                } //You take no damage this turn
            },

            secondWind: {
                id: "secondWind",
                attack: function () { return 0 },
                block: function () { return 8 },
                src: "./dist/art/knight_cards/second_wind.png",
                animation: "duck",
                instantEffects: function () { 
                    this.knight.heal(8)
                },
                delayedEffects: function () { 
                    this.numCardsDraw += 1 
                } //recover 8 health, draw a card
            },

            feint: {
                id: "feint",
                attack: function () { return 0 },
                block: function () { return 0 },
                src: "./dist/art/knight_cards/feint.png",
                animation: "crouchAttack",
                instantEffects: function () { 
                    this.opponentCard = this.opponent.allUniqueCards["turtle"]
                },
                delayedEffects: function () { } //Instead of their action, your opponent turtles this turn.
            },

            revengeance: {
                id: "revengeance",
                attack: function () { return (this.knight.deckObj.graveyard * 2) + 2 }, // deal damage equal to double the num of cards in discard
                block: function () { return 0 },
                src: "./dist/art/knight_cards/revengeance.png",
                animation: "combo",
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            mightyBlow: {
                id: "mightyBlow",
                attack: function () { return 8 },
                block: function () { return 0 },
                src: "./dist/art/knight_cards/mighty_blow.png",
                animation: "combo",
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            forHonor: {
                id: "forHonor",
                attack: function () { return 3 },
                block: function () { return 5 },
                src: "./dist/art/knight_cards/for_honor.png",
                animation: "attack",
                instantEffects: function () { },
                delayedEffects: function () { 
                    this.numCardsDraw += 1 
                } //draws a card
            },

            poiseBreak: {
                id: "poiseBreak",
                attack: function () { return 4 },
                block: function () { return 0 },
                src: "./dist/art/knight_cards/poise_break.png",
                animation: "crouchAttack",
                instantEffects: function () { },
                delayedEffects: function () { 
                    this.knight.status["opponentPoiseBroken"] = true
                    this.knight.status["ttopponentPoiseBroken"] = 1
                } // your opponent takes double damage next turn
            },

            holdTheLine: {
                id: "holdTheLine",
                attack: function () { return 0 },
                block: function () { return 10 },
                src: "./dist/art/knight_cards/hold_the_line.png",
                animation: "attack2",
                instantEffects: function () { },
                delayedEffects: function () { }
            },


        }

    }

    opponentCards(opponent) {
        return {

            strike: {
                id: "strike",
                attack: function () { return 6 },
                block: function () { return 0 },
                src: "./dist/art/opponent_cards/mstrike.png",
                animation: "attack",
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            rockThrow: {
                id: "rockThrow",
                attack: function () { return 8 },
                block: function () { return 6 },
                src: "./dist/art/opponent_cards/mrock_throw.png",
                animation: "attack",
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            spikes: {
                id: "spikes",
                attack: function () { return 12 },
                block: function () { return 0 },
                src: "./dist/art/opponent_cards/mspikes.png",
                animation: "attack2",
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            blindingFlash: {
                id: "blindingFlash",
                attack: function () { return 0 },
                block: function () { return 0 },
                src: "./dist/art/opponent_cards/mblinding_flash.png",
                animation: "flash",
                instantEffects: function () { },
                delayedEffects: function () { 
                    this.knight.status["blinded"] = true
                    this.knight.status["ttblinded"] = 2
                } //You cannot see your opponent’s moves for the next two turns
            },

            turtle: {
                id: "turtle",
                attack: function () { return 0 },
                block: function () { return 4 },
                src: "./dist/art/opponent_cards/mturtle.png",
                animation: "idle",
                instantEffects: function () { 
                    this.opponent.heal(4)
                },
                delayedEffects: function () { }
            },

            groundPound: {
                id: "groundPound",
                attack: function () { return 0 },
                block: function () { return 0 },
                src: "./dist/art/opponent_cards/mground_pound.png",
                animation: "attack3",
                instantEffects: function () { },
                delayedEffects: function () { 
                    let filledSlots = this.cardSlotCollector("filled")

                    if (filledSlots.length) {
                        for (let i = 1; i === 1 && filledSlots.length > 0; i++) {
                            let index = Math.floor(Math.random() * (filledSlots.length));
                            let slotId = filledSlots.splice(index,1)
                            this.clearCardFromSlot(slotId)
                            this.knight.deckObj.graveyard--
                        }
                    }
                } //Destroy a card in player’s hand.
            }
        }
    }   
    thinDeck() {
        let deckSlot = document.getElementById("deck-slot")
        if (this.deck.length === 0) {
            deckSlot.innerHTML = '<img src="./dist/art/deck/rune.png" id="deckArt" width="160px" height="260px"/>'
        } else if (this.deck.length < 3) {
            deckSlot.innerHTML = '<img src="' + this.deckObj.emptyDeck.src + '" id="deckArt" width="140px" height="200px"/>'
        } else if (this.deck.length < 6) {
            deckSlot.innerHTML = '<img src="' + this.deckObj.halfDeck.src + '" id="deckArt" width="140px" height="200px"/>'
        }
    }  
}


