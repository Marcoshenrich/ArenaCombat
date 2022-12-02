import Game from './Game.js'

export default class GameView {
    constructor(canvas) { 
        this.ctx = canvas.getContext('2d')

        this.CANVAS_WIDTH = canvas.width = 1024
        this.CANVAS_HEIGHT = canvas.height = 1024

        this.backgroundImage = new Image()
        this.backgroundImage.src = 'art/arena.jpg'

        this.matImage = new Image()
        this.matImage.src = 'art/mat.png'

        this.playerState = "idle"
        this.opponentState = "idle"

        this.gameFrame = 0;
        this.staggerFrames = 10;

        this.animate()
    }

    animate() {
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
        this.ctx.drawImage(this.backgroundImage, 0, 0, 1024, 768)
        this.ctx.drawImage(this.matImage, -3, 760, 1060, 280)

        // //player draw
        // let playerPosition = Math.floor(gameFrame / staggerFrames) % playerAnimations[playerState].loc.length
        // console.log(playerState);
        // let playerFrameX = playerSpriteWidth * playerPosition;
        // let playerframeY = playerAnimations[playerState].loc[playerPosition].y
        // ctx.drawImage(playerImage, playerFrameX, playerframeY, playerSpriteWidth, playerSpriteHeight, 200, 450, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight * 3.5))

        // //opponent draw
        // let opponentPosition = Math.floor(gameFrame / staggerFrames) % opponentAnimations[opponentState].loc.length
        // let opponentFrameX = opponentSpriteWidth * opponentPosition;
        // let opponentframeY = opponentAnimations[opponentState].loc[opponentPosition].y
        // ctx.drawImage(opponentImage, opponentFrameX, opponentframeY, opponentSpriteWidth, opponentSpriteHeight, 400, 475, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight * 3.5))

        // gameFrame++
        requestAnimationFrame(this.animate.bind(this))
    }
}
