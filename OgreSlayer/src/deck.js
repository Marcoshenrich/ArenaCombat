export default class Deck {
    constructor(combatant, decksize) { 
        this.combatant = combatant
        this.stack = []
        this.allUniqueCards = {}
        this.deckMaker(decksize)
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
                attack: 3,
                block: 0,
                src: "art/knight_cards/strike.png",
                animation: knight.attackAnimation.bind(knight),
                effects: function () { }
            },

            defend: {
                id: "defend",
                attack: 0,
                block: 5,
                src: "art/knight_cards/defend.png",
                animation: knight.attack2Animation.bind(knight),
                effects: function () { }
            },

            reposition: {
                id: "reposition",
                attack: 0,
                block: 2,
                src: "art/knight_cards/reposition.png",
                animation: knight.duckAnimation.bind(knight),
                effects: function () { }
            },

            taunt: {
                id: "taunt",
                attack: 0,
                block: 4,
                src: "art/knight_cards/taunt.png",
                animation: knight.duckAnimation.bind(knight),
                effects: function () { }
            },

            parry: {
                id: "parry",
                attack: 0,
                block: 0,
                src: "art/knight_cards/parry.png",
                animation: knight.comboAnimation.bind(knight),
                effects: function () { }
            },

            shieldOfFaith: {
                id: "shieldOfFaith",
                attack: 0,
                block: 5,
                src: "art/knight_cards/shield_of_faith.png",
                animation: knight.attack2Animation.bind(knight),
                effects: function () { }
            },

            dodge: {
                id: "dodge",
                attack: 0,
                block: 0,
                src: "art/knight_cards/dodge.png",
                animation: knight.rollAnimation.bind(knight),
                effects: function () { }
            },

            secondWind: {
                id: "secondWind",
                attack: 0,
                block: 8,
                src: "art/knight_cards/second_wind.png",
                animation: knight.duckAnimation.bind(knight),
                effects: function () { }
            },

            feint: {
                id: "feint",
                attack: 0,
                block: 0,
                src: "art/knight_cards/feint.png",
                animation: knight.crouchAttackAnimation.bind(knight),
                effects: function () { }
            },

            revengeance: {
                id: "revengeance",
                attack: 0,
                block: 0,
                src: "art/knight_cards/revengeance.png",
                animation: knight.comboAnimation.bind(knight),
                effects: function () { }
            },

            mightyBlow: {
                id: "mightyBlow",
                attack: 7,
                block: 0,
                src: "art/knight_cards/mighty_blow.png",
                animation: knight.comboAnimation.bind(knight),
                effects: function () { }
            },

            forHonor: {
                id: "forHonor",
                attack: 3,
                block: 5,
                src: "art/knight_cards/for_honor.png",
                animation: knight.attackAnimation.bind(knight),
                effects: function () { }
            },

            poiseBreak: {
                id: "poiseBreak",
                attack: 3,
                block: 5,
                src: "art/knight_cards/poise_break.png",
                animation: knight.crouchAttackAnimation.bind(knight),
                effects: function () { }
            },

            holdTheLine: {
                id: "holdTheLine",
                attack: 0,
                block: 10,
                src: "art/knight_cards/hold_the_line.png",
                animation: knight.attack2Animation.bind(knight),
                effects: function () { }
            },


        }

    }

    opponentCards(opponent) {
        return {

            strike: {
                attack: 8,
                block: 0,
                src: "art/opponent_cards/mstrike.png",
                animation: opponent.attackAnimation.bind(opponent),
                effects: function () { }
            },

            rockThrow: {
                attack: 8,
                block: 6,
                src: "art/opponent_cards/mrock_throw.png",
                animation: opponent.attacktwiceAnimation.bind(opponent),
                effects: function () { }
            },

            spikes: {
                attack: 12,
                block: 0,
                src: "art/opponent_cards/mspikes.png",
                animation: opponent.attack2Animation.bind(opponent),
                effects: function () { }
            },

            blindingFlash: {
                attack: 0,
                block: 0,
                src: "art/opponent_cards/mblinding_flash.png",
                animation: opponent.attack3Animation.bind(opponent),
                effects: function () { 
                    this.knight.status["blinded"] = true
                    this.knight.status["ttblinded"] = 2
                } //You cannot see your opponent’s moves for the next two turns
            },

            turtle: {
                attack: 0,
                block: 4,
                src: "art/opponent_cards/mturtle.png",
                animation: opponent.idleAnimation.bind(opponent),
                effects: function() { 
                    let heal = 10
                    if (this.opponent.health + heal > this.opponent.maxHealth) {
                        this.opponent.health = this.opponent.maxHealth
                    } else {
                        this.opponent.health += 10
                    }
                } //gain 10 health
            },

            groundPound: {
                attack: 0,
                block: 0,
                src: "art/opponent_cards/mground_pound.png",
                animation: opponent.attack3Animation.bind(opponent),
                effects: function () { 
                    
                    
                } //Destroy two cards in player’s hand.
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