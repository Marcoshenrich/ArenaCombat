export default class Deck {
    constructor(combatant, decksize) { 
        this.combatant = combatant
        this.stack = []
        this.allUniqueCards = {}
        this.deckMaker(decksize)
        this.graveyard = 0
    }


    deckMaker(decksize) {
        let infiniteDeck;
        let cardStats;
        if (this.combatant.constructor.name === "Knight") {
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

        this.shuffleDeck()
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
                attack: function(){return 3},
                block: function () {return 0},
                src: "art/knight_cards/strike.png",
                animation: knight.attackAnimation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            defend: {
                id: "defend",
                attack: function () { return 0 },
                block: function () { return 5 },
                src: "art/knight_cards/defend.png",
                animation: knight.attack2Animation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            reposition: {
                id: "reposition",
                attack: function () { return 0 },
                block: function () { return 2 },
                src: "art/knight_cards/reposition.png",
                animation: knight.duckAnimation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { } //draw a card
            },

            taunt: {
                id: "taunt",
                attack: function () { return 0 },
                block: function () { return 4 },
                src: "art/knight_cards/taunt.png",
                animation: knight.duckAnimation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { } // your opponent must use strike next turn
            },

            parry: {
                id: "parry",
                attack: function () { return 0 },
                block: function () { return 0 },
                src: "art/knight_cards/parry.png",
                animation: knight.comboAnimation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { } // If your opponent attacks this turn, you negate the attack and they take 4 damage.
            },

            shieldOfFaith: {
                id: "shieldOfFaith",
                attack: function () { return 0 },
                block: function () { return 5 },
                src: "art/knight_cards/shield_of_faith.png",
                animation: knight.attack2Animation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { } //You take no damage next turn
            },

            dodge: {
                id: "dodge",
                attack: function () { return 0 },
                block: function () { return 0 },
                src: "art/knight_cards/dodge.png",
                animation: knight.rollAnimation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { } //You take no damage this turn
            },

            secondWind: {
                id: "secondWind",
                attack: function () { return 0 },
                block: function () { return 8 },
                src: "art/knight_cards/second_wind.png",
                animation: knight.duckAnimation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { } //recover 8 health, draw a card
            },

            feint: {
                id: "feint",
                attack: function () { return 0 },
                block: function () { return 0 },
                src: "art/knight_cards/feint.png",
                animation: knight.crouchAttackAnimation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { } //Instead of their action, your opponent turtles this turn.
            },

            revengeance: {
                id: "revengeance",
                attack: function () { return this.knight.deckObj.graveyard * 2 }, // deal damage equal to double the num of cards in discard
                block: function () { return 0 },
                src: "art/knight_cards/revengeance.png",
                animation: knight.comboAnimation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            mightyBlow: {
                id: "mightyBlow",
                attack: function () { return 7 },
                block: function () { return 0 },
                src: "art/knight_cards/mighty_blow.png",
                animation: knight.comboAnimation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            forHonor: {
                id: "forHonor",
                attack: function () { return 3 },
                block: function () { return 5 },
                src: "art/knight_cards/for_honor.png",
                animation: knight.attackAnimation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { } //draws a card
            },

            poiseBreak: {
                id: "poiseBreak",
                attack: function () { return 4 },
                block: function () { return 0 },
                src: "art/knight_cards/poise_break.png",
                animation: knight.crouchAttackAnimation.bind(knight),
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
                src: "art/knight_cards/hold_the_line.png",
                animation: knight.attack2Animation.bind(knight),
                instantEffects: function () { },
                delayedEffects: function () { }
            },


        }

    }

    opponentCards(opponent) {
        return {

            strike: {
                attack: function () { return 8 },
                block: function () { return 0 },
                src: "art/opponent_cards/mstrike.png",
                animation: opponent.attackAnimation.bind(opponent),
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            rockThrow: {
                attack: function () { return 8 },
                block: function () { return 6 },
                src: "art/opponent_cards/mrock_throw.png",
                animation: opponent.attacktwiceAnimation.bind(opponent),
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            spikes: {
                attack: function () { return 12 },
                block: function () { return 0 },
                src: "art/opponent_cards/mspikes.png",
                animation: opponent.attack2Animation.bind(opponent),
                instantEffects: function () { },
                delayedEffects: function () { }
            },

            blindingFlash: {
                attack: function () { return 0 },
                block: function () { return 0 },
                src: "art/opponent_cards/mblinding_flash.png",
                animation: opponent.attack3Animation.bind(opponent), 
                instantEffects: function () { },
                delayedEffects: function () { 
                    this.knight.status["blinded"] = true
                    this.knight.status["ttblinded"] = 2
                } //You cannot see your opponent’s moves for the next two turns
            },

            turtle: {
                attack: function () { return 0 },
                block: function () { return 4 },
                src: "art/opponent_cards/mturtle.png",
                animation: opponent.idleAnimation.bind(opponent),
                instantEffects: function () { 
                    this.opponent.heal.call(this.opponent, 10)
                },
                delayedEffects: function () { }
            },

            groundPound: {
                attack: function () { return 0 },
                block: function () { return 0 },
                src: "art/opponent_cards/mground_pound.png",
                animation: opponent.attack3Animation.bind(opponent),
                instantEffects: function () { },
                delayedEffects: function () { } //Destroy two cards in player’s hand.
            }
        }
    }   
}

//player draws cards
//player forces opponent to Strike next turn
//player forces opponent to Block this turn
//player negates attack and deals damage (if opponent attacked)
//player negates damage on next turn
//player negates damage this turn
//player heals
//player tracks number of cards in discard pile and increase damage value
//player forces opponent to take double damage on the following turn


//opponent can prevent player from seeing the next move for two turns
//opponet can destroy cards in player's hands. 