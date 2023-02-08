import Combatant from './combatant.js'

export default class Dummy extends Combatant {
    constructor(spriteWidth, spriteHeight, xPosition, yPosition, sizeCoef) {
        super()

        this.image = new Image()
        this.image.src = './dist/art/knight1/aIdle.png'
        this.animationState = "knightIdle"
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.xPosition = xPosition
        this.yPosition = yPosition
        this.sizeCoef = sizeCoef
        this.smash = false

        this.animationStates = [
            { name: "knightIdle", frames: 9, src: './dist/art/knight1/aIdle.png' },
            { name: "knightTIdle", frames: 9, src: './dist/art/knight1/aIdleTurned.png' },
            { name: "knightDeath", frames: 10, src: './dist/art/knight1/aDeath.png' },
            { name: "knightRun", frames: 10, src: './dist/art/knight1/aRun.png' },
            { name: "knighTurn", frames: 2, src: './dist/art/knight1/aTurnAround.png' },
            { name: "demonLeap", frames: 1, src: './dist/art/demon/Leap.png' },
            { name: "demonSmash", frames: 1, src: './dist/art/demon/Smash.png' },
            { name: "demonIdle", frames: 6, src: './dist/art/demon/Idle.png' },
        ];

        this.allImages = this.imgObjectMaker()
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
            this.xPosition -= 8
            this.yPosition += 8

        } else {
            this.xPosition = 300
            this.yPosition = 319
            this.smash = true
        }

    }
}
