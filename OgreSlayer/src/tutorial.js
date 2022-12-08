export default class Tutorial {
    constructor(game, ctx, heightOffset) {
        this.ctx = ctx
        this.heightOffset = heightOffset
        this.game = game
        this.panelDrop = 0
        this.knight = new Image()
        this.knight.src = 'art/knight1/_Idle.png'
        this.leading = 38
        this.archibald = new Image()
        this.archibald.src = 'art/knight1/archie.png'
        this.playerCard = new Image()
        this.playerCard.src = 'art/knight_cards/strike.png'
        this.opponentCard = new Image()
        this.opponentCard.src = 'art/knight_cards/reposition.png'
        this.tutorialSeq = 0
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
        } 
    }

    renderTutorialPanel1() {
        let startLine = 140
        this.ctx.fillStyle = 'rgba(225,225,225,0.9)';
        this.ctx.fillRect(150, 75, 650, this.panelDrop)
        if (this.panelDrop < 400) this.panelDrop += 6.5
        if (this.panelDrop >= 400) {
            this.ctx.drawImage(this.knight, 0, 0, 419.5, 280, 275, 170, 419.5, 280 )
            this.ctx.fillStyle = 'rgba(0,0,0,1)';
            this.ctx.font = "26px optima, sans-serif "
            this.ctx.fillText("You are", 200, startLine, 2000, 200)
            this.ctx.font = "bold 26px optima, sans-serif "
            this.ctx.fillText("Solaire", 293, startLine, 2000, 200)
            this.ctx.font = "26px optima, sans-serif "
            this.ctx.fillText(", a stalwart knight seeking to", 370, startLine, 2000, 200)
            this.ctx.fillText("prove your worth against the mightiest champions", 200, startLine += this.leading, 2000, 200)
            this.ctx.fillText("of the land. You have come to the Queen\’s ", 200, startLine += this.leading, 2000, 200)
            this.ctx.fillText("tournament at Dragonstone Arena to battle for ", 200, startLine += this.leading, 2000, 200)
            this.ctx.fillText("fame and fortune. ", 200, startLine += this.leading, 2000, 200)
        }
    }

    renderTutorialPanel2() {
        let startLine = 140
        this.ctx.fillStyle = 'rgba(225,225,225,0.9)';
        this.ctx.fillRect(150, 75, 650, 400)
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.font = "26px optima, sans-serif"
        this.ctx.fillText("Unfortunately, your first opponent is Sir Archibald,", 200, startLine, 2000, 200)
        this.ctx.fillText("a powerful and deadly knight.", 200, startLine += this.leading, 2000, 200)
        this.ctx.fillText("Defeat is pretty much certain.", 200, startLine += (this.leading*2), 2000, 200)
        this.ctx.drawImage(this.archibald, 0, 0, 120, 100, 235, 170, 120 * 3.5, 100 * 3.5)
    }

    renderTutorialPanel3() {
        let startLine = 140
        this.ctx.fillStyle = 'rgba(225,225,225,0.9)';
        this.ctx.fillRect(150, 75, 650, 500)
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.font = "bold 26px optima, sans-serif"
        this.ctx.fillText("Core Mechanics", 200, startLine, 2000, 200)
        this.ctx.font = "26px optima, sans-serif"
        this.ctx.fillText("The cards represent the moves you can make,", 200, startLine += this.leading, 2000, 200)
        this.ctx.fillText("click on a card to play it.", 200, startLine += this.leading, 2000, 200)
        this.ctx.fillText("Your opponent plays their cards at the same time.", 200, startLine += this.leading, 2000, 200)
        this.ctx.drawImage(this.playerCard, 340, 245, 130, 200)
        this.ctx.drawImage(this.opponentCard, 480, 245, 130, 200)
        this.ctx.fillText("To deal damage, your attack must be higher than", 200, startLine += (this.leading * 2) + 140, 2000, 200)
        this.ctx.fillText("your opponent\’s block.", 200, startLine += this.leading, 2000, 200)
    }

    renderTutorialPanel4() {
        let startLine = 140
        this.ctx.fillStyle = 'rgba(225,225,225,0.9)';
        this.ctx.fillRect(150, 75, 650, 500)
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.font = "bold 26px optima, sans-serif"
        this.ctx.fillText("Core Mechanics", 200, startLine, 2000, 200)
        this.ctx.font = "26px optima, sans-serif"
        this.ctx.fillText("You draw a card whenever you deal damage.", 200, startLine += this.leading, 2000, 200)
        this.ctx.fillText("Watch out! You die if you run out of cards.", 200, startLine += this.leading, 2000, 200)
    }




}