export default class Combatant {
    constructor() {
        this.animationState = "idle"
        this.animations = [];
        this.attack = 0
        this.block = 0
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

    draw(ctx, gameFrame, staggerFrames) {
        let position = Math.floor(gameFrame / staggerFrames) % this.animations[this.animationState].loc.length
        let frameX = this.spriteWidth * position;
        let frameY = this.animations[this.animationState].loc[position].y
        ctx.drawImage(this.image, frameX, frameY, this.spriteWidth, this.spriteHeight, this.xPosition, this.yPosition, Math.floor(this.spriteWidth * 3.5), Math.floor(this.spriteHeight * 3.5))
    }

    heal(healVal) {
        if (this.health + healVal > this.maxHealth) {
            this.health = this.maxHealth
        } else {
            this.health += healVal
        }
    }
}