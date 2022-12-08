import Game from './game.js'
import Crowd from './crowd.js'
import Tutorial from './tutorial.js'
import Dummy from './dummy.js'

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
        
        this.infoDimensions = { infoSquareYOffset: 200, infoSquareXOffset: 274, infoSquareLen: 200, infoSquareHeight: 400 } 
        
        this.backgroundImage = new Image()
        this.backgroundImage.src = 'art/arena.jpg'
        
        this.matImage = new Image()
        this.matImage.src = 'art/mat.png'
        
        this.lossText = new Image()
        this.lossText.src = 'art/youded.png'
        
        this.winText = new Image()
        this.winText.src = 'art/youwin.png'
        
        this.gameStart = false
        this.tutorialStart = false
        this.playIntroAnimation = false
        this.gameFrame = 0;
        this.staggerFrames = 10;
        
        this.hoveredCard = null
        this.showNextHover = true
        this.showDeckLength = false
        
        this.fadeOut = 0
        this.textFadeIn = 1
        
        this.game = new Game(this.crowd)
        this.knight = this.game.knight
        this.opponent = this.game.opponent
        this.dummy = new Dummy(120, 80, 310, 358, 4)
        this.demonDummy = new Dummy(500, 400, 919, -300, 1)

        this.demonDummy.animationState = "demonLeap"
        this.demonDummy.image.src = this.dummy.animations["demonLeap"].src

        this.tutorial = new Tutorial(this.game, this.ctx, this.heightOffset)
        this.titleCard()
        this.introAnimationSeq = 1

        this.shaking = false
        this.shakeX = 0
        this.shakeY = 0
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

    renderIntroAnimation() {
        if (this.introAnimationSeq < 9) {
            this.knight.draw(this.ctx, this.gameFrame, this.staggerFrames, this.heightOffset)
            this.dummy.draw(this.ctx, this.gameFrame, this.staggerFrames, this.heightOffset)
            if (this.introAnimationSeq >= 6) this.demonDummy.draw(this.ctx, this.gameFrame, this.staggerFrames, this.heightOffset)
            console.log(this.introAnimationSeq);
            if (this.introAnimationSeq === 1) {
                if (this.crowd.excitement >= 75) this.crowd.excite(5)
                if (this.knight.xPosition < 200) {
                    this.knight.runForwards()
                    if (this.knight.animationState === "idle"){
                        this.knight.animationQueue.push("run")
                    }
                }  else {
                    this.knight.animationQueue = []
                    this.knight.animationState = "idle"
                    this.knight.image.src = this.knight.animations["idle"].src
                    setTimeout(()=>{
                        this.dummy.animationState = "knightTIdle"
                        this.dummy.image.src = this.dummy.animations["knightTIdle"].src
                        this.introAnimationSeq = 2
                    },1000)
                }        
            } else if (this.introAnimationSeq === 2) {
                this.ctx.fillStyle = 'rgba(225,225,225,0.9)';
                this.ctx.fillRect(400, 418, 330, 45)
                this.ctx.fillStyle = 'rgba(0,0,0,1)';
                this.ctx.font = "26px optima, sans-serif "
                this.ctx.fillText("You ready to die today, kid?", 410, 450, 2000, 200)
                setTimeout(() => {
                    this.introAnimationSeq = 3
                }, 3000)
            } else if (this.introAnimationSeq === 3) {
                this.shakeBackground()
                setTimeout(() => {
                    this.calmBackground()
                    this.introAnimationSeq = 4
                }, 3000)
            } else if (this.introAnimationSeq === 4) {
                    this.ctx.fillStyle = 'rgba(225,225,225,0.9)';
                    this.ctx.fillRect(430, 418, 281, 45)
                    this.ctx.fillStyle = 'rgba(0,0,0,1)';
                    this.ctx.font = "26px optima, sans-serif "
                    this.ctx.fillText("What the hell was that?", 440, 450, 2000, 260)
                    setTimeout(() => {
                        this.introAnimationSeq = 5
                    }, 3000)
            } else if (this.introAnimationSeq === 5) {
                this.shakeBackground()
                setTimeout(() => {
                    this.calmBackground()
                    if (this.introAnimationSeq === 5) this.introAnimationSeq = 6
                }, 3000)
            } else if (this.introAnimationSeq === 6) {
                    this.knight.animationQueue.push("roll")
                    this.introAnimationSeq = 7
            } else if (this.introAnimationSeq === 7) {
                this.demonDummy.leap()
                if (this.demonDummy.smash) {
                    this.crowd.excite(0)
                    this.demonDummy.animationState = "demonSmash"
                    this.demonDummy.image.src = this.demonDummy.animations["demonSmash"].src
                    this.dummy.animationState = "knightDeath"
                    this.dummy.image.src = this.dummy.animations["knightDeath"].src
                    this.shakeBackground()
                    setTimeout(() => {
                        this.introAnimationSeq = 8
                    }, 300)
                }
            } else if (this.introAnimationSeq === 8) {
                setTimeout(()=>{
                    this.calmBackground()
                },300)
                this.gameStart = true
                this.playIntroAnimation = false
                this.introAnimationSeq = 9
            }
            this.gameFrame++
        }   
    }

    titleCard() {
        if (!this.gameStart && !this.tutorialStart && !this.playIntroAnimation) {
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
        } else if (this.playIntroAnimation) {
            this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
            this.renderBackground()
            this.renderCrowd()
            this.renderIntroAnimation()
            requestAnimationFrame(this.titleCard.bind(this))
        } else if (this.gameStart) {
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
            this.ctx.fillText(`${this.knight.deck.length} cards left`, 825, 650 - this.heightOffset)
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
        this.ctx.drawImage(card.art, (this.CANVAS_WIDTH / 2) - 195, (this.CANVAS_HEIGHT / 2) - 450 + this.heightOffset/2, 390, 600)
    }

    renderGameEndScreen() {
        let text;
        let sizeX;
        let sizeY;
        let posX;
        let posY;

        if (this.game.gameLoss) {
            text = this.lossText
            sizeX = 600; sizeY = 300; posX = 200; posY = 150 
        } else {
            text = this.winText
            sizeX = 840; sizeY = 220; posX = 80; posY = 150
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



