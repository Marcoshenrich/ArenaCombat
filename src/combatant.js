export default class Combatant {
    constructor() {
        this.animationState = "idle"
        this.animations = [];
        this.animationQueue = []
        this.attack = 0
        this.block = 0
        this.aniPlaying = false
        this.aniCheckQueue = []
    }


    imgObjectMaker() {
        let allImages = {}
            this.animationStates.forEach((spriteState) => {
                let image = new Image()
                image.src = spriteState.src
                allImages[spriteState.name] = image
            })
        return allImages
    
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
        // if (this.constructor.name === "Knight") console.log(this.animations[this.animationState].loc)
        let rawPosition = (gameFrame / staggerFrames) % this.animations[this.animationState].loc.length
        let position = Math.floor(rawPosition)


        let frameX = this.spriteWidth * position;
        // let frameX = 0
        let frameY = 0
        
        // console.log(this.animationQueue)
        if (this.animationState !== "dead") {
            if (this.animationState !== "idle") {
                this.aniCheckQueue.push(position)
                let unique = this.aniCheckQueue.filter((value, index, self) => { return self.indexOf(value) === index })
                if (unique.length > 1 && this.aniCheckQueue.at(-1) === 0 && this.animationState !== "idle") {
                    this.animationQueueSetter()
                    this.aniCheckQueue = []
                    gameFrame = 0
                }
                
            }
            // console.log(this.animationQueue)
            if (this.animationQueue.length > 0 && this.animationState === "idle") {
                this.animationQueueSetter()
                gameFrame = 0
            }
        }   


        // let debugObj = {
        //     "g / s": gameFrame / staggerFrames,
        //     "modulo": this.animations[this.animationState].loc.length,
        //     "position": position,
        //     "anistate": this.animationState
        // }

        // if (this.constructor.name === "Knight") console.log("position", position)
        // if (this.constructor.name === "Knight") console.log(debugObj)

        ctx.drawImage(this.image, frameX, frameY, this.spriteWidth, this.spriteHeight, this.xPosition, this.yPosition - heightOffset, Math.floor(this.spriteWidth * this.sizeCoef), Math.floor(this.spriteHeight * this.sizeCoef))

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
            // if (this.constructor.name === "Knight") console.log(aniStateName)
            this.animation(aniStateName)
        } 
    }

    animation = function(aniStateName) {
        this.animationState = aniStateName
        this.image = this.allImages[aniStateName]
    }

}



Combatant.prototype.runForwards = function () {
    this.xPosition += 1.12
    this.yPosition = 400
}
