import Combatant from './combatant.js'

export default class Dummy extends Combatant {
    constructor(spriteWidth, spriteHeight, xPosition, yPosition, sizeCoef) {
        super()

        this.image = new Image()
        this.image.src = 'art/knight1/_aIdle.png'
        this.animationState = "knightIdle"
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.xPosition = xPosition
        this.yPosition = yPosition
        this.sizeCoef = sizeCoef
        this.smash = false

        this.animationStates = [
            { name: "knightIdle", frames: 9, src: 'art/knight1/_aIdle.png' },
            { name: "knightTIdle", frames: 9, src: 'art/knight1/_aIdleTurned.png' },
            { name: "knightDeath", frames: 10, src: 'art/knight1/_aDeath.png' },
            { name: "knightRun", frames: 10, src: 'art/knight1/_aRun.png' },
            { name: "knighTurn", frames: 2, src: 'art/knight1/_aTurnAround.png' },
            { name: "demonLeap", frames: 1, src: 'art/demon/_Leap.png' },
            { name: "demonSmash", frames: 1, src: 'art/demon/_Smash.png' },
            { name: "demonIdle", frames: 6, src: 'art/demon/_Idle.png' },
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

    leap(){
        if (this.xPosition > 300) {
            this.xPosition -= 10
            this.yPosition += 10
        } else {
            this.xPosition = 300
            this.yPosition = 319
            this.smash = true
        }

    }
}
