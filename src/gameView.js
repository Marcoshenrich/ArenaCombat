import Game from './game.js'
import Crowd from './crowd.js'
import Tutorial from './tutorial.js'
import Sound from './sound.js'

export default class GameView {
    constructor(canvas, clientHeight) { 
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d')
        this.pauseInputs = false

        this.crowd = new Crowd()
        this.crowdArray = this.crowd.crowdArray

        this.MAX_HEIGHT = 708
        this.MIN_HEIGHT = 578
        
        this.CANVAS_WIDTH = this.canvas.width = 950
        this.setHeight(clientHeight)
        this.screenSize;
        this.setScreenSize(clientHeight)
        
        this.infoDimensions = { infoSquareYOffset: 200, infoSquareXOffset: 274, infoSquareLen: 200, infoSquareHeight: 400 } 
        
        this.backgroundImage = new Image()
        this.backgroundImage.src = './dist/art/arena.jpg'
        
        this.matImage = new Image()
        this.matImage.src = './dist/art/mat.png'
        
        this.lossText = new Image()
        this.lossText.src = './dist/art/youded.png'
        
        this.winText = new Image()
        this.winText.src = './dist/art/youwin.png'
        
        this.gameStart = false
        this.tutorialStart = false
        this.gameFrame = 0;
        this.staggerFrames = 14;
        
        this.hoveredCard = null
        this.showNextHover = true
        this.showDeckLength = false
        
        this.fadeOut = 0
        this.textFadeIn = 1

        this.sound = new Sound()
        this.game = new Game(this.crowd, this.sound)

        this.knight = this.game.knight
        this.opponent = this.game.opponent

        this.tutorial = new Tutorial(this.game, this)
        this.titleCard()
        this.introAnimationSeq = 1

        this.shaking = false
        this.shakeX = 0
        this.shakeY = 0

        this.replay = false
    }

    shakeBackground(){
        this.shaking = true
        this.shakeX = Math.floor(Math.random() * 5) - 20
        this.shakeY = Math.floor(Math.random() * 5) - 40
        this.crowd.excite(0)
    }

    calmBackground() {
        if (this.shaking === true) {
            this.shakeX = 0
            this.shakeY = 0
            this.shaking = false
        }
    }

    titleCard() {
        if (!this.gameStart && !this.tutorialStart) {
            this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
            this.renderBackground()
            this.renderCrowd()
            this.renderStartOptions()
            requestAnimationFrame(this.titleCard.bind(this))
        } else if (this.tutorialStart) {
            this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
            this.renderBackground()
            this.renderCrowd()
            this.tutorial.renderTutorial()
            requestAnimationFrame(this.titleCard.bind(this))
        } else if (this.gameStart) {
            this.sound.demonVocalize()
            this.game.setupMat()
            this.game.knight.xPosition = 200
            this.animate()
        }
    }

    renderStartOptions() {
        this.ctx.fillStyle = 'rgba(0,0,0,.9)'
        this.ctx.fillRect(-10, 130, 2000, 120)
        this.ctx.fillRect(-10, 290, 2000, 70)
        this.ctx.fillRect(-10, 390, 2000, 70)
        this.ctx.fillStyle = 'rgba(255,87,51,0.35)'
        this.ctx.fillRect(-10,145, 2000, 90)
        this.ctx.fillRect(-10, 305, 2000, 40)
        this.ctx.fillRect(-10, 405, 2000, 40)

        this.ctx.fillStyle = "crimson"
        this.ctx.font = "130px trattatello, sans-serif "
        this.ctx.fillText("Demon Slayer", 200, 225)
        this.ctx.font = "80px trattatello, sans-serif "
        this.ctx.fillText("start", 260, 350)
        this.ctx.fillText("tutorial", 260, 450)
        
        this.ctx.beginPath();
        this.ctx.moveTo(220, 340);
        this.ctx.lineTo(245, 325);
        this.ctx.lineTo(220, 310);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.moveTo(220, 440);
        this.ctx.lineTo(245, 425);
        this.ctx.lineTo(220, 410);
        this.ctx.fill();

    }

    renderCrowd() {
        for (let i = 0; i < this.crowdArray.length; i++) {
            let section = this.crowdArray[i]["spectArr"]
            for (let j = 0; j < section.length; j++) {	
                let spectator = section[j]
                this.ctx.drawImage(spectator["img"], spectator["xRender"], spectator["yRender"], spectator["sizeX"], spectator["sizeY"])
            }
        }
        this.crowd.jostle()
        this.crowd.updateYImmediate(this.heightOffset)
    }

    animate() {
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
        this.renderBackground()
        this.renderCrowd()
        if (this.game.gameLoss || this.game.gameWin) this.renderGameEndScreen()
        if (!this.game.gameOver) {
            this.renderInfoSquares()
            this.renderText()
            if (this.hoveredCard && this.showNextHover) this.renderHoveredCard(this.hoveredCard)
        }
        this.renderCharacters()
        this.endScreenAnimations()
        this.gameFrame++


        requestAnimationFrame(this.animate.bind(this))
    }

    renderBackground() {
        this.ctx.drawImage(this.backgroundImage, 0, this.heightOffset + 60, 1024 + this.shakeY, this.CANVAS_HEIGHT + this.shakeX, 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
    }

    renderInfoSquares() {
        this.ctx.fillStyle = 'rgba(225,225,225,0.9)';
        const opponentInfoSquare = this.ctx.fillRect((this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset), this.infoDimensions.infoSquareYOffset - this.heightOffset, this.infoDimensions.infoSquareLen, this.infoDimensions.infoSquareHeight)

        let opponentMove;
        if (this.knight.status["blinded"]) {
            opponentMove = this.opponent.blindedCard.art
        } else {
            opponentMove = this.opponent.nextMove[0].art
        }
        this.ctx.drawImage(opponentMove, (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 10, this.infoDimensions.infoSquareYOffset + 120 - this.heightOffset, 180, 280)

        const playerInfoSquare = this.ctx.fillRect((this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen), this.infoDimensions.infoSquareYOffset - this.heightOffset, this.infoDimensions.infoSquareLen, this.infoDimensions.infoSquareHeight)
    }

    renderText() {
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.font = "26px optima, sans-serif "
        this.ctx.fillText("Monster Health", (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 14, this.infoDimensions.infoSquareYOffset + 40 - this.heightOffset)

        if (this.knight.status["blinded"]) {
            this.ctx.fillText("Atk: ? Blk: ? ", (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 30, this.infoDimensions.infoSquareYOffset + 110 - this.heightOffset)
            this.ctx.fillText("?", (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 90, this.infoDimensions.infoSquareYOffset + 75 - this.heightOffset)
        } else {
            this.ctx.fillText(`Atk: ${this.opponent.attack} Blk: ${this.opponent.block} `, (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 30, this.infoDimensions.infoSquareYOffset + 110 - this.heightOffset)
            this.ctx.fillText(this.opponent.health, (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 90, this.infoDimensions.infoSquareYOffset + 75 - this.heightOffset)
        }

        this.ctx.fillText("Move", (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 65, this.infoDimensions.infoSquareYOffset + 150 - this.heightOffset)

        this.ctx.fillText("Knight Health", (this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen) + 21, this.infoDimensions.infoSquareYOffset + 40 - this.heightOffset)
        this.ctx.fillText(`Atk: ${this.knight.attack} Blk: ${this.knight.block} `, (this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen) + 30, this.infoDimensions.infoSquareYOffset + 110 - this.heightOffset)
        this.ctx.fillText(this.game.knight.health, (this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen) + 81, this.infoDimensions.infoSquareYOffset + 75 - this.heightOffset)
        
        let activeKnightStatus = []
        for (let statusName in this.knight.status) {
            if (statusName.slice(0, 2) === "tt" || statusName.slice(0, 2) === "rr") {
                continue
            }
            if (this.knight.status[statusName]) {
                activeKnightStatus.push(statusName)
            }
        }

        let baseline = 160
        if (activeKnightStatus.length) {
            this.ctx.font = "21px optima, sans-serif "

            this.ctx.fillText("Status", (this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen) + 30, this.infoDimensions.infoSquareYOffset + 160 - this.heightOffset)
            for (let i = 0; i < activeKnightStatus.length; i++) {	
                baseline += 30
                let status = this.knight.status["rr" + activeKnightStatus[i]]
                this.ctx.fillText(`${status}`, (this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen) + 30, this.infoDimensions.infoSquareYOffset + baseline - this.heightOffset)

            }
        }


        if (this.showDeckLength) {
            this.ctx.fillText(`${this.knight.deck.length} cards left`, 800, 650 - this.heightOffset)
            this.ctx.beginPath();
            this.ctx.moveTo(850, 660 - this.heightOffset);
            this.ctx.lineTo(870, 680 - this.heightOffset);
            this.ctx.lineTo(890, 660 - this.heightOffset);
            this.ctx.fill();
        }
    }

    renderCharacters(){
        this.opponent.draw(this.ctx, this.gameFrame, this.staggerFrames, this.heightOffset)
        this.knight.draw(this.ctx, this.gameFrame, this.staggerFrames, this.heightOffset)

    }

    endScreenAnimations() {
        if (this.game.gameLoss && this.game.gameWin && !this.game.gameOver) {
            this.staggerFrames = 30
            this.game.gameOver = true
            this.resetAnimationFrames()
            this.knight.animationQueue.push("death")
            this.opponent.animationQueue.push("death")
            this.knight.animationQueue.push("dead")
            this.opponent.animationQueue.push("dead")
        }
        if (this.game.gameLoss && !this.game.gameOver) {
            this.staggerFrames = 30
            this.game.gameOver = true
            this.resetAnimationFrames()
            this.knight.animationQueue.push("death")
            this.knight.animationQueue.push("dead")
        }
        if (this.game.gameWin && !this.game.gameOver) {
            this.staggerFrames = 30
            this.game.gameOver = true
            this.resetAnimationFrames()
            this.opponent.animationQueue.push("death")
            this.opponent.animationQueue.push("dead")
        }
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

        let xCardSize;
        let yCardSize;
        let xOffset;

        if (this.screenSize === "small" || this.screenSize === "medium") {
            xCardSize = 306
            yCardSize = 470
            xOffset = 150
        } else {
            xCardSize = 390
            yCardSize = 600
            xOffset = 195
          
        }
        this.ctx.drawImage(card.art, (this.CANVAS_WIDTH / 2) - xOffset, (this.CANVAS_HEIGHT / 2) - 400 + this.heightOffset / 2, xCardSize, yCardSize)
    }

    renderGameEndScreen() {
        let text;
        let sizeX;
        let sizeY;
        let posX;
        let posY;

        if (this.game.gameLoss) {
            text = this.lossText
            sizeX = 600; sizeY = 300; posX = 170; posY = 150 
        } else {
            text = this.winText
            sizeX = 840; sizeY = 220; posX = 60; posY = 150
        }

        this.fadeOut += .01
        this.ctx.fillStyle = `rgba(0,0,0,${this.fadeOut})`;
        this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)

        if (this.fadeOut > 1) {
            this.textFadeIn -= .01
            this.ctx.fillStyle = `rgba(0,0,0,${this.textFadeIn})`;
            this.ctx.drawImage(text, posX, posY - this.heightOffset, sizeX, sizeY)
            this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
        }

        if (this.fadeOut > 1 && this.textFadeIn < 0 && !this.replay) {
            this.replay = true
        }

        if (this.fadeOut > 1 && this.textFadeIn < 0) {
            this.ctx.fillStyle = `rgba(197,65,20,1)`
            this.ctx.beginPath();
            this.ctx.moveTo(350, 410 - this.heightOffset);
            this.ctx.lineTo(350, 450 - this.heightOffset);
            this.ctx.lineTo(370, 430 - this.heightOffset);
            this.ctx.fill();
            this.ctx.font = "26px optima, sans-serif "
            this.ctx.fillText("Play Again?", (this.CANVAS_WIDTH - 560), 440 - this.heightOffset)
            if (this.game.cardLoss) this.ctx.fillText("You lose if you run out of cards", (this.CANVAS_WIDTH - 650), 200 - this.heightOffset)
        }

    }


    setScreenSize(clientHeight) {
        
        if (clientHeight < 650) {
            document.body.style.zoom = "75%";
            this.screenSize = "small"
        } else if (clientHeight < 775 ) {
            document.body.style.zoom = "85%";
            this.screenSize = "medium"
        } else {
            document.body.style.zoom = "100%";
            this.screenSize = "large"
        }
    }

    setHeight(clientHeight) {
        let height;
        if (clientHeight > 950) {
            height = this.MAX_HEIGHT
            this.heightOffset = 0
        } else if (clientHeight < 820) {
            height = this.MIN_HEIGHT
            this.heightOffset = 130
        } else {
            height = clientHeight - 244
            this.heightOffset = 950 - clientHeight
        }
        this.crowd.updateYImmediate(this.heightOffset)
        this.CANVAS_HEIGHT = this.canvas.height = height
    }


}



