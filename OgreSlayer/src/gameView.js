import Game from './game.js'

export default class GameView {
    constructor(canvas) { 
        this.ctx = canvas.getContext('2d')
        this.pauseInputs = false

        this.CANVAS_WIDTH = canvas.width = 1024
        this.CANVAS_HEIGHT = canvas.height = 760
        this.infoDimensions = { infoSquareYOffset: 200, infoSquareXOffset: 274, infoSquareLen: 200, infoSquareHeight: 400 } 

        this.backgroundImage = new Image()
        this.backgroundImage.src = 'art/arena.jpg'

        this.matImage = new Image()
        this.matImage.src = 'art/mat.png'

        this.lossText = new Image()
        this.lossText.src = 'art/youded.png'

        this.game = new Game()
        this.knight = this.game.knight
        this.opponent = this.game.opponent

        this.gameFrame = 0;
        this.staggerFrames = 10;

        this.animate()

        this.hoveredCard = null
        this.showNextHover = true
        this.fadeOut = 0
        this.textFadeIn = 1
    }

    animate() {
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
        this.renderBackground()
        this.renderText()
        this.opponent.draw(this.ctx, this.gameFrame, this.staggerFrames)
        this.knight.draw(this.ctx,this.gameFrame, this.staggerFrames)
        this.gameFrame++

        if (this.hoveredCard && this.showNextHover) this.renderHoveredCard(this.hoveredCard)

        requestAnimationFrame(this.animate.bind(this))

        
    }

    renderBackground() {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
       
        this.ctx.fillStyle = 'rgba(225,225,225,0.9)';
        const opponentInfoSquare = this.ctx.fillRect((this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset), this.infoDimensions.infoSquareYOffset, this.infoDimensions.infoSquareLen, this.infoDimensions.infoSquareHeight)
       
        let opponentMove;
        if (this.knight.status["blinded"]) {
            opponentMove = this.opponent.blindedCard.art
        } else {
            opponentMove = this.opponent.nextMove[0].art  
        }
        this.ctx.drawImage(opponentMove, (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 10, this.infoDimensions.infoSquareYOffset + 120, 180, 280)

        const playerInfoSquare = this.ctx.fillRect((this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen), this.infoDimensions.infoSquareYOffset, this.infoDimensions.infoSquareLen, this.infoDimensions.infoSquareHeight)
        if (this.game.gameLoss) this.renderGameLossScreen()
    }

    renderText() {
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.font = "bold 20px verdana, sans-serif "
        this.ctx.fillText("Monster Health", (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 14, this.infoDimensions.infoSquareYOffset + 40)
        this.ctx.fillText(`Atk: ${this.opponent.attack} Blk: ${this.opponent.block} `, (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) +30, this.infoDimensions.infoSquareYOffset + 110)

        this.ctx.fillText("Move", (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 65, this.infoDimensions.infoSquareYOffset + 140)
        this.ctx.fillText(this.opponent.health, (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 80, this.infoDimensions.infoSquareYOffset + 80)

        this.ctx.fillText("Knight Health", (this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen) + 21, this.infoDimensions.infoSquareYOffset + 40)
        this.ctx.fillText(`Atk: ${this.knight.attack} Blk: ${this.knight.block} `, (this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen) + 30, this.infoDimensions.infoSquareYOffset + 110)
        this.ctx.fillText(this.game.knight.health, (this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen) + 81, this.infoDimensions.infoSquareYOffset + 80)
    }

    resetAnimationFrames() {
        this.gameFrame = 0;
    }

    renderHoveredCard(cardIdObj) {
        let card;
        if (cardIdObj["knightCard"]) {
            card = this.knight.allUniqueCards[cardIdObj["knightCard"]]
        } else if (this.knight.status["blinded"]) {
            card = this.opponent.blindedCard
        } else {
            card = this.opponent.nextMove[0]
        }
        this.ctx.drawImage(card.art, (this.CANVAS_WIDTH / 2) - (390 / 2), (this.CANVAS_HEIGHT / 2) - (800/2), 390, 600)
    }

    renderGameLossScreen() {
        this.fadeOut += .01
        this.ctx.fillStyle = `rgba(0,0,0,${this.fadeOut})`;
        this.ctx.fillRect(0,0,this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
        if (this.fadeOut > 1) {
            this.textFadeIn -= .01
            this.ctx.fillStyle = `rgba(0,0,0,${this.textFadeIn})`;
            this.ctx.drawImage(this.lossText, 200, 150, 600,300)
            this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
        }
    }


}



