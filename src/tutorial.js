import Dummy from './dummy.js'


export default class Tutorial {
    constructor(game, gameview) {
        this.game = game
        this.gameview = gameview
        this.panelDrop = 0
        this.knight = new Image()
        this.knight.src = './dist/art/knight1/Idle.png'
        this.leading = 38
        this.archibald = new Image()
        this.archibald.src = './dist/art/knight1/archie.png'
        this.playerCard = new Image()
        this.playerCard.src = './dist/art/knight_cards/strike.png'
        this.opponentCard = new Image()
        this.opponentCard.src = './dist/art/knight_cards/reposition.png'
        this.tutorialSeq = 0
        this.introAnimationSeq = 1
        this.introAnimationComplete = false

        this.dummy = new Dummy(120, 80, 310, 358, 4)
        this.demonDummy = new Dummy(500, 400, 919, -300, 1)

        this.demonDummy.animationState = "demonLeap"
        this.demonDummy.image.src = this.dummy.animations["demonLeap"].src
    }

    renderTutorial() {
        if (this.tutorialSeq === 1) {
            this.renderTutorialPanel1()
        } else if (this.tutorialSeq === 2) {
            this.renderTutorialPanel2()
        } else if (this.tutorialSeq === 3) {
            this.renderTutorialPanel3()
        } else if (this.tutorialSeq === 4) {
            this.renderTutorialPanel4()
        } else if (this.tutorialSeq === 5) {
            this.renderIntroAnimation()
        } else if (this.tutorialSeq === 6) {
            this.renderTutorialPanel5()
        } else if (this.tutorialSeq === 7) {
            this.gameview.tutorialStart = false
            this.gameview.gameStart = true
        } 
    }


    renderIntroAnimation() {
        if (this.introAnimationSeq < 9) {
            this.game.knight.draw(this.gameview.ctx, this.gameview.gameFrame, this.gameview.staggerFrames, this.gameview.heightOffset)
            this.dummy.draw(this.gameview.ctx, this.gameview.gameFrame, this.gameview.staggerFrames, this.gameview.heightOffset)
            if (this.introAnimationSeq >= 6) this.demonDummy.draw(this.gameview.ctx, this.gameview.gameFrame, this.gameview.staggerFrames, this.gameview.heightOffset)
            if (this.introAnimationSeq === 1) {
                if (this.gameview.crowd.excitement >= 75) this.gameview.crowd.excite(5)
                if (this.game.knight.xPosition < 200) {
                    this.game.knight.runForwards()
                    this.game.knight.animationQueue.push("run")
                    
                } else {
                    this.game.knight.animationQueue = []
                    this.game.knight.animationState = "idle"
                    this.game.knight.image.src = this.game.knight.animations["idle"].src
                    setTimeout(() => {
                        if (this.introAnimationSeq === 1) {
                            this.gameview.sound.playSound("earthquake")
                            this.introAnimationSeq = 2
                        }
                        this.dummy.animationState = "knightTIdle"
                        this.dummy.image.src = this.dummy.animations["knightTIdle"].src
                    }, 1000)
                }
            } else if (this.introAnimationSeq === 2) {
                this.gameview.ctx.fillStyle = 'rgba(225,225,225,0.9)';
                this.gameview.ctx.fillRect(400, 418, 330, 45)
                this.gameview.ctx.fillStyle = 'rgba(0,0,0,1)';
                this.gameview.ctx.font = "26px optima, sans-serif "
                this.gameview.ctx.fillText("You ready to die today, kid?", 410, 450, 2000, 200)
                setTimeout(() => {
                    if (this.introAnimationSeq === 2) {
                        this.introAnimationSeq = 3
                    }
                }, 2000)
            } else if (this.introAnimationSeq === 3) {
                this.gameview.shakeBackground()
                setTimeout(() => {
                    if (this.introAnimationSeq === 3) {
                        this.introAnimationSeq = 4
                        this.gameview.sound.demonVocalize()

                    }
                }, 3000)
            } else if (this.introAnimationSeq === 4) {
                this.gameview.shakeBackground()
                this.gameview.ctx.fillStyle = 'rgba(225,225,225,0.9)';
                this.gameview.ctx.fillRect(430, 418, 281, 45)
                this.gameview.ctx.fillStyle = 'rgba(0,0,0,1)';
                this.gameview.ctx.font = "26px optima, sans-serif "
                this.gameview.ctx.fillText("What the hell is that?", 440, 450, 2000, 260)
                setTimeout(() => {
                    if (this.introAnimationSeq === 4) {
                        this.introAnimationSeq = 5
                    }
                }, 1500)
            } else if (this.introAnimationSeq === 5) {
                this.gameview.shakeBackground()
                setTimeout(() => {
                    if (this.introAnimationSeq === 5) this.introAnimationSeq = 6
                }, 1000)
            } else if (this.introAnimationSeq === 6) {
                this.gameview.shakeBackground()
                if (this.introAnimationSeq === 6) {
                    this.introAnimationSeq = 7
                }
            } else if (this.introAnimationSeq === 7) {
                this.demonDummy.leap()
                if (this.demonDummy.smash) {
                    this.gameview.crowd.excite(0)
                    this.demonDummy.animationState = "demonSmash"
                    this.demonDummy.image.src = this.demonDummy.animations["demonSmash"].src
                    this.dummy.animationState = "knightDeath"
                    this.dummy.image.src = this.dummy.animations["knightDeath"].src
                    this.gameview.shakeBackground()
                    setTimeout(() => {
                        this.introAnimationSeq = 8
                        this.gameview.calmBackground()
                    }, 300)
                }
            } else if (this.introAnimationSeq === 8) {
                this.introAnimationSeq = 9
                this.tutorialSeq = 6
                this.introAnimationComplete = true

            }
            this.gameview.gameFrame++
        }
    }





    renderTutorialPanel1() {
        let startLine = 140
        this.gameview.ctx.fillStyle = 'rgba(225,225,225,0.9)';
        this.gameview.ctx.fillRect(150, 75, 650, this.panelDrop)
        if (this.panelDrop < 400) this.panelDrop += 6.5
        if (this.panelDrop >= 400) {
            this.gameview.ctx.drawImage(this.knight, 0, 0, 419.5, 280, 275, 170, 419.5, 280 )
            this.gameview.ctx.fillStyle = 'rgba(0,0,0,1)';
            this.gameview.ctx.font = "26px optima, sans-serif "
            this.gameview.ctx.fillText("You are", 200, startLine, 2000, 200)
            this.gameview.ctx.font = "bold 26px optima, sans-serif "
            this.gameview.ctx.fillText("Solaire", 293, startLine, 2000, 200)
            this.gameview.ctx.font = "26px optima, sans-serif "
            this.gameview.ctx.fillText(", a stalwart knight seeking to", 370, startLine, 2000, 200)
            this.gameview.ctx.fillText("prove your worth against the mightiest champions", 200, startLine += this.leading, 2000, 200)
            this.gameview.ctx.fillText("of the land. You have come to the Queen\’s ", 200, startLine += this.leading, 2000, 200)
            this.gameview.ctx.fillText("tournament at Dragonstone Arena to battle for ", 200, startLine += this.leading, 2000, 200)
            this.gameview.ctx.fillText("fame and fortune. ", 200, startLine += this.leading, 2000, 200)
        }
    }

    renderTutorialPanel2() {
        let startLine = 140
        this.gameview.ctx.fillStyle = 'rgba(225,225,225,0.9)';
        this.gameview.ctx.fillRect(150, 75, 650, 400)
        this.gameview.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.gameview.ctx.font = "26px optima, sans-serif"
        this.gameview.ctx.fillText("Unfortunately, your first opponent is Sir Archibald,", 200, startLine, 2000, 200)
        this.gameview.ctx.fillText("a powerful and deadly knight.", 200, startLine += this.leading, 2000, 200)
        this.gameview.ctx.fillText("Defeat is pretty much certain.", 200, startLine += (this.leading*2), 2000, 200)
        this.gameview.ctx.drawImage(this.archibald, 0, 0, 120, 100, 235, 170, 120 * 3.5, 100 * 3.5)
    }

    renderTutorialPanel3() {
        let startLine = 140
        this.gameview.ctx.fillStyle = 'rgba(225,225,225,0.9)';
        this.gameview.ctx.fillRect(150, 75, 650, 500)
        this.gameview.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.gameview.ctx.font = "bold 26px optima, sans-serif"
        this.gameview.ctx.fillText("Core Mechanics", 200, startLine, 2000, 200)
        this.gameview.ctx.font = "26px optima, sans-serif"
        this.gameview.ctx.fillText("The cards represent the moves you can make,", 200, startLine += this.leading, 2000, 200)
        this.gameview.ctx.fillText("click on a card to play it.", 200, startLine += this.leading, 2000, 200)
        this.gameview.ctx.fillText("Your opponent plays their cards at the same time.", 200, startLine += this.leading, 2000, 200)
        this.gameview.ctx.drawImage(this.playerCard, 340, 245, 130, 200)
        this.gameview.ctx.drawImage(this.opponentCard, 480, 245, 130, 200)
        this.gameview.ctx.fillText("To deal damage, your attack must be higher than", 200, startLine += (this.leading * 2) + 140, 2000, 200)
        this.gameview.ctx.fillText("your opponent\’s block.", 200, startLine += this.leading, 2000, 200)
    }

    renderTutorialPanel4() {
        let startLine = 140
        this.gameview.ctx.fillStyle = 'rgba(225,225,225,0.9)';
        this.gameview.ctx.fillRect(150, 75, 650, 500)
        this.gameview.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.gameview.ctx.font = "bold 26px optima, sans-serif"
        this.gameview.ctx.fillText("Core Mechanics", 200, startLine, 2000, 200)
        this.gameview.ctx.font = "26px optima, sans-serif"
        this.gameview.ctx.fillText("You draw one card whenever you deal or", 200, startLine += this.leading, 2000, 200)
        this.gameview.ctx.fillText("receive damage.", 200, startLine += this.leading, 2000, 200)
        this.gameview.ctx.fillText("Watch out! You die if you run out of cards.", 200, startLine += (this.leading * 2), 2000, 200)
    }

    renderTutorialPanel5() {
        let startLine = 140
        this.gameview.ctx.fillStyle = 'rgba(225,225,225,0.9)';
        this.gameview.ctx.fillRect(150, 75, 650, 500)
        this.gameview.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.gameview.ctx.font = "bold 26px optima, sans-serif"
        this.gameview.ctx.fillText("OH NO!", 200, startLine, 2000, 200)
        this.gameview.ctx.font = "26px optima, sans-serif"
        this.gameview.ctx.fillText("A terrible demon has invaded the arena", 200, startLine += this.leading, 2000, 200)
        this.gameview.ctx.fillText("Stop him before it's too late!", 200, startLine += this.leading, 2000, 200)
        this.gameview.ctx.fillText("Watch out - this fight is totally unfair.", 200, startLine += (this.leading * 2), 2000, 200)
        this.gameview.ctx.fillText("Blame the terrible game designers.", 200, startLine += this.leading, 2000, 200)

    }






}