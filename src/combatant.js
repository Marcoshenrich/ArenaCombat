export default class Combatant {
    constructor() {
        this.animationState = "idle"
        this.animations = [];
        this.animationQueue = []
        this.animationTripper = -1
        this.attack = 0
        this.block = 0
        this.aniPlaying = false
        this.aniCheckQueue = []
    }

    animationFramesSetter() {
        this.animationStates.forEach((spriteState) => {
            let frames = {
                loc: [],
                src: spriteState.src
            }
            for (let j = 0; j < spriteState.frames; j++) {
                let positionX = j * this.spriteWidth;
                let positionY = 0;
                frames.loc.push({ x: positionX, y: positionY });
            }
            this.animations[spriteState.name] = frames;
        });
    }

    draw(ctx, gameFrame, staggerFrames, heightOffset) {

        let rawPosition = (gameFrame / staggerFrames) % this.animations[this.animationState].loc.length
        let position = Math.floor(rawPosition)
        if (this.constructor.name === "Knight") console.log(this.spriteWidth * position)
        let frameX = this.spriteWidth * position;
        let frameY = 0
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.xPosition, this.yPosition - heightOffset, Math.floor(this.spriteWidth * this.sizeCoef), Math.floor(this.spriteHeight * this.sizeCoef))

        if (this.animationState !== "dead") {
            if (this.animationState !== "idle") {
                this.aniCheckQueue.push(position)
                let unique = this.aniCheckQueue.filter((value, index, self) => { return self.indexOf(value) === index })
                if (unique.length > 1 && this.aniCheckQueue.at(-1) === 0 && this.animationState !== "idle") {
                    this.animationQueueSetter()
                    this.aniCheckQueue = []
                    position = 0
                    gameFrame = 0
                }
            
            }
            // console.log(this.animationQueue)
            if (this.animationQueue.length > 0 && this.animationState === "idle") {
                this.animationQueueSetter()
                position = 0
                gameFrame = 0
            }
        }   

    }

    heal(healVal) {
        if (this.health + healVal > this.maxHealth) {
            this.health = this.maxHealth
        } else {
            this.health += healVal
        }
    }

    animationQueueSetter() {
        if (this.animationQueue.length === 0) {
            this.animation("idle")
        } else {
            let aniStateName = this.animationQueue.shift()
            if (this.constructor.name === "Knight") console.log(aniStateName)
            this.animation(aniStateName)
        } 
    }

    framesFinder(aniStateName) {
        for (let i in this.animationStates) {
            let frameObj = this.animationStates[i]
            if (frameObj["name"] === aniStateName) return frameObj["frames"]
        }
    }

    animation = function(aniStateName) {
        this.animationState = aniStateName
        this.image.src = this.animations[aniStateName].src
    }

}



Combatant.prototype.runForwards = function () {
    this.xPosition += 1.12
    this.yPosition = 400
}
