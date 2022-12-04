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
        ];

        this.animationFramesSetter()


    }

    nextMoveMaker() {
        const basicCards = {
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
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            spikes: {
                attack: 12,
                block: 0,
                src: "art/opponent_cards/mspikes.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            blindingFlash: {
                attack: 0,
                block: 0,
                src: "art/opponent_cards/mblinding_flash.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            turtle: {
                attack: 0,
                block: 10,
                src: "art/opponent_cards/mturtle.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            },

            groundPound: {
                attack: 0,
                block: 0,
                src: "art/opponent_cards/mground_pound.png",
                animation: this.attackAnimation.bind(this),
                effects: () => { }
            }
        }

        let allCardNames = Object.keys(basicCards)

        for (let i = 0; i < allCardNames.length; i++) {	
            let card = basicCards[allCardNames[i]]
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

Opponent.prototype.attack2Animation = function () {
    this.animationState = "attack"
    this.image.src = this.animations["attack"].src

    setTimeout(() => {
        this.idleAnimation()
    }, 1660)
}






