import Game from './game.js'

export default class GameView {
    constructor(canvas) { 
        this.game = new Game()
        this.ctx = canvas.getContext('2d')

        this.CANVAS_WIDTH = canvas.width = 1024
        this.CANVAS_HEIGHT = canvas.height = 760

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
        this.renderBackground()
        this.renderText()

        //opponent draw
        let opponentPosition = Math.floor(this.gameFrame / this.staggerFrames) % this.game.opponent.opponentAnimations[this.opponentState].loc.length
        let opponentFrameX = this.game.opponent.opponentSpriteWidth * opponentPosition;
        let opponentframeY = this.game.opponent.opponentAnimations[this.opponentState].loc[opponentPosition].y
        this.ctx.drawImage(this.game.opponent.opponentImage, opponentFrameX, opponentframeY, this.game.opponent.opponentSpriteWidth, this.game.opponent.opponentSpriteHeight, 400, 475, Math.floor(this.game.opponent.opponentSpriteWidth * 3.5), Math.floor(this.game.opponent.opponentSpriteHeight * 3.5))

        //player draw
        let playerPosition = Math.floor(this.gameFrame / this.staggerFrames) % this.game.knight.playerAnimations[this.playerState].loc.length
        let playerFrameX = this.game.knight.playerSpriteWidth * playerPosition;
        let playerframeY = this.game.knight.playerAnimations[this.playerState].loc[playerPosition].y
        this.ctx.drawImage(this.game.knight.playerImage, playerFrameX, playerframeY, this.game.knight.playerSpriteWidth, this.game.knight.playerSpriteHeight, 200, 450, Math.floor(this.game.knight.playerSpriteWidth * 3.5), Math.floor(this.game.knight.playerSpriteHeight * 3.5))
    

        this.gameFrame++
        requestAnimationFrame(this.animate.bind(this))
    }

    renderBackground() {
        this.ctx.drawImage(this.backgroundImage, 0, 0, 1024, 768)

        this.ctx.fillStyle = 'rgba(225,225,225,0.9)';
        this.ctx.fillRect(750, 200, 200, 400)
       
        let opponentMove = this.game.opponent.nextMove[0].art 
        this.ctx.drawImage(opponentMove, 780, 350, 120, 200)

        this.ctx.fillRect(90, 200, 200, 400)


    }

    renderText() {
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.font = "bold 20px verdana, sans-serif "
        this.ctx.fillText("Monster Health", 765, 240)
        this.ctx.fillText("Move", 810, 335)
        this.ctx.fillText(this.game.opponent.health, 830, 300)

        this.ctx.fillText("Knight Health", 110, 240)
        this.ctx.fillText(this.game.knight.health, 175, 300)
    }

}



