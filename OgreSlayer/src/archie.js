import Combatant from './combatant.js'

export default class Archie extends Combatant {
    constructor() {
        super()

        this.image = new Image()
        this.image.src = 'art/knight1/_aIdle.png'
        this.spriteWidth = 120;
        this.spriteHeight = 80;
        this.xPosition = 310
        this.yPosition = 358
        this.sizeCoef = 4

        this.animationStates = [
            { name: "idle", frames: 9, src: 'art/knight1/_aIdle.png' },
            { name: "tidle", frames: 9, src: 'art/knight1/_aIdleTurned.png' },
            { name: "death", frames: 10, src: 'art/knight1/_Death.png' },
            { name: "run", frames: 10, src: 'art/knight1/_aRun.png' },
            { name: "turn", frames: 2, src: 'art/knight1/_aTurnAround.png' },
        ];

        this.animationFramesSetter()

    }

    draw(ctx, gameFrame, staggerFrames, heightOffset) {
        let rawPosition = (gameFrame / staggerFrames) % this.animations[this.animationState].loc.length
        let position = Math.floor(rawPosition)


        let frameX = this.spriteWidth * position;
        let frameY = this.animations[this.animationState].loc[position].y
        ctx.drawImage(this.image, frameX, frameY, this.spriteWidth, this.spriteHeight, this.xPosition, this.yPosition - heightOffset, Math.floor(this.spriteWidth * this.sizeCoef), Math.floor(this.spriteHeight * this.sizeCoef))
    }
}
