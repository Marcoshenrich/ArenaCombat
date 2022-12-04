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
