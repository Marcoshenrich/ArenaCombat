import Combatant from './combatant.js'

export default class Opponent extends Combatant {
    constructor() { 
        super()
        this.image = new Image()
        this.image.src = 'art/demon/_Idle.png'
        this.spriteWidth = 100;
        this.spriteHeight = 80;
        this.xPosition = 400
        this.yPosition = 475
        
        this.allUniqueCards = {}
        this.nextMove = []
        this.nextMoveMaker()

        this.health = 80

        this.animationStates = [
        { name: "idle", frames: 6, src: 'art/demon/_Idle.png' },
        { name: "attack", frames: 5, src: 'art/demon/_Attack.png' },
        { name: "attack2", frames: 6, src: 'art/demon/_Attack2.png' },
        { name: "attack3", frames: 6, src: 'art/demon/_Attack3.png' },
        { name: "hit", frames: 3, src: 'art/demon/_Hit.png' },
        ];

        this.animationFramesSetter()


    }

    nextMoveMaker() {
        const opponentCards = {
            strike: { 
                attack: 8, 
                block: 0, 
                src: "art/opponent_cards/mstrike.png", 
                animation: this.attackAnimation.bind(this),
                effects: ()=>{ }
            },

            rockThrow: {
                attack: 8,
                block: 6,
                src: "art/opponent_cards/mrock_throw.png",
                animation: this.attacktwiceAnimation.bind(this),
                effects: () => { }
            },

            spikes: {
                attack: 12,
                block: 0,
                src: "art/opponent_cards/mspikes.png",
                animation: this.attack2Animation.bind(this),
                effects: () => { }
            },

            blindingFlash: {
                attack: 0,
                block: 0,
                src: "art/opponent_cards/mblinding_flash.png",
                animation: this.attack3Animation.bind(this),
                effects: () => { }
            },

            turtle: {
                attack: 0,
                block: 10,
                src: "art/opponent_cards/mturtle.png",
                animation: this.idleAnimation.bind(this),
                effects: () => { }
            },

            groundPound: {
                attack: 0,
                block: 0,
                src: "art/opponent_cards/mground_pound.png",
                animation: this.attack3Animation.bind(this),
                effects: () => { }
            }
        }

        let allCardNames = Object.keys(opponentCards)

        for (let i = 0; i < allCardNames.length; i++) {	
            let card = opponentCards[allCardNames[i]]
            let img = new Image()
            img.src = card.src
            card.art = img
            this.allUniqueCards[allCardNames[i]] = card
        }
        
        let allUniqueCardkeys = Object.keys(this.allUniqueCards)
        for (let i = 0; i < 100; i++) {	

            let card = this.allUniqueCards[allUniqueCardkeys[allUniqueCardkeys.length * Math.random() << 0]]
            console.log(card);
            this.nextMove.push(card)
        }

       



    }


}

Opponent.prototype.idleAnimation = function () {
    this.animationState = "idle"
    this.image.src = this.animations["idle"].src
}

Opponent.prototype.attackAnimation = function () {
    this.animationState = "attack"
    this.image.src = this.animations["attack"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 830)
}

Opponent.prototype.attacktwiceAnimation = function () {
    this.animationState = "attack"
    this.image.src = this.animations["attack"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 1660)
}

Opponent.prototype.attack2Animation = function () {
    this.animationState = "attack2"
    this.image.src = this.animations["attack2"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 1000)
}


Opponent.prototype.attack3Animation = function () {
    this.animationState = "attack3"
    this.image.src = this.animations["attack3"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 1000)
}


Opponent.prototype.hitAnimation = function () {
    this.animationState = "hit"
    this.image.src = this.animations["hit"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 500)
}









