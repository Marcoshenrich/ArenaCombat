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

