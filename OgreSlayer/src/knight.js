import Combatant from './combatant.js'

export default class Knight extends Combatant {
    constructor(){
        super()
        this.image = new Image()
        this.image.src = 'art/knight1/_Idle.png'
        this.spriteWidth = 120;
        this.spriteHeight = 80;
        this.xPosition = 200
        this.yPosition = 450

        this.health = 30
        this.deck = []

        this.animationStates = [
        { name: "idle", frames: 10, src: 'art/knight1/_Idle.png' },
        { name: "attack", frames: 4, src: 'art/knight1/_Attack.png' },
        { name: "attack2", frames: 6, src: 'art/knight1/_Attack2.png' },
        { name: "combo", frames: 10, src: 'art/knight1/_AttackCombo.png' },
        { name: "death", frames: 10, src: 'art/knight1/_Death.png' },
        { name: "roll", frames: 12, src: 'art/knight1/_Roll.png' },
        ];

        this.animationFramesSetter()
    }

    nextMoveMaker() {
        const playerCards = {
            strike: {
                attack: 3,
                block: 0,
                src: "art/knight_cards/strike.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            defend: {
                attack: 0,
                block: 5,
                src: "art/knight_cards/defend.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            reposition: {
                attack: 0,
                block: 2,
                src: "art/knight_cards/reposition.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            taunt: {
                attack: 0,
                block: 4,
                src: "art/knight_cards/taunt.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            parry: {
                attack: 0,
                block: 0,
                src: "art/knight_cards/parry.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            shieldOfFaith: {
                attack: 0,
                block: 5,
                src: "art/knight_cards/shield_of_faith.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            dodge: {
                attack: 0,
                block: 0,
                src: "art/knight_cards/dodge.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            secondWind: {
                attack: 0,
                block: 8,
                src: "art/knight_cards/second_wind.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            feint: {
                attack: 0,
                block: 0,
                src: "art/knight_cards/feint.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            revengeance: {
                attack: 0,
                block: 0,
                src: "art/knight_cards/revengeance.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            mightyBlow: {
                attack: 7,
                block: 0,
                src: "art/knight_cards/mighty_blow.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            forHonor: {
                attack: 3,
                block: 5,
                src: "art/knight_cards/for_honor.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            poiseBreak: {
                attack: 3,
                block: 5,
                src: "art/knight_cards/poise_break.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            holdTheLine: {
                attack: 0,
                block: 10,
                src: "art/knight_cards/hold_the_line.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            
        }

        let allCardNames = Object.keys(playerCards)

        for (let i = 0; i < allCardNames.length; i++) {
            let card = playerCards[allCardNames[i]]
            let img = new Image()
            img.src = card.src
            card.art = img
            this.allUniqueCards[allCardNames[i]] = card
        }

        for (let i = 0; i < allCardNames.length; i++) {
            let card = this.allUniqueCards[allCardNames[i]]
            this.deck.push(card)
        }





    }
}

Knight.prototype.idleAnimation = function () {
    this.animationState = "idle"
    this.image.src = this.animations["idle"].src
}

Knight.prototype.attackAnimation = function() {
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
        this.idleAnimation()
    }, 1650)
}

Knight.prototype.rollAnimation = function () {
    this.animationState = "roll"
    this.image.src = this.animations["roll"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 1830)
}
