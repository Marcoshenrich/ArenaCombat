import GameView from './gameView.js'

const canvas = document.getElementById('canvas1')
const mat = document.getElementById('mat')
let clientHeight = document.documentElement.clientHeight
const gameview = new GameView(canvas, clientHeight)

mat.addEventListener("click", (e) => {
    if (!gameview.game.gameOver && !gameview.pauseInputs)  {
        gameview.showNextHover = false
        gameview.pauseInputs = true
        let slot = e.target.parentNode
        if (slot.className === "card-slot") {
            let playerCardId = e.target.id
            gameview.resetAnimationFrames()
            gameview.game.coreGameLoop(playerCardId, slot.id)
            gameview.hoveredCard = null
            setTimeout(() => {
                gameview.pauseInputs = false
            }, 1500);
        }
    }
});

mat.addEventListener("mouseover", (e) => {
    let slot = e.target.parentNode
    if (slot.className === "card-slot") {
        let playerCardId = e.target.id
        let card = gameview.knight.allUniqueCards[playerCardId]

        gameview.knight.block = card.block.call(gameview.game)
        gameview.knight.attack = gameview.knight.statusChecker.call(gameview.knight, card.attack.call(gameview.game), "attack")
        gameview.hoveredCard = {knightCard: playerCardId}
    }
});

mat.addEventListener("mouseout", (e) => {
    gameview.showNextHover = true
    let slot = e.target.parentNode
    if (slot.className === "card-slot") {
        gameview.hoveredCard = null
        if (!gameview.pauseInputs) {
        gameview.knight.attack = 0
        gameview.knight.block = 0
        }
    }
});

canvas.addEventListener("mousemove", (e) => {
    let halfClientMargin = (document.documentElement.clientWidth - gameview.CANVAS_WIDTH)/2
    if (gameview.gameStart === true) {
        if (document.documentElement.clientWidth >= 1000) {
            if (e.clientX > (718 + halfClientMargin) && e.clientX < (840 + halfClientMargin) && e.clientY > (375 - gameview.heightOffset) && e.clientY < (580 - gameview.heightOffset)){
                gameview.showNextHover = true
                if (gameview.knight.status["blinded"]) {
                    gameview.hoveredCard = gameview.opponent.blindedCard
                } else {
                    gameview.hoveredCard = { opponentCard: gameview.opponent.nextMove.id }
                }
            } else {
                gameview.hoveredCard = null
            }
        }
    }      
});

mat.addEventListener("mouseover", (e) => {
    let slot = e.target.parentNode
    if (slot.id === "deck-slot") {
        gameview.showDeckLength = true
        gameview.showNextHover = false
    }
});

mat.addEventListener("mouseout", (e) => {
    let slot = e.target.parentNode
    if (slot.id === "deck-slot") {
        gameview.showDeckLength = false
        gameview.showNextHover = false
    }
});

addEventListener("resize", (e) => { 
    let clientHeight = document.documentElement.clientHeight
    gameview.setHeight(clientHeight)
});


canvas.addEventListener("click", (e) => {
    let halfClientMargin = (document.documentElement.clientWidth - gameview.CANVAS_WIDTH) / 2
    if (e.clientX > (220 + halfClientMargin) && e.clientX < (400 + halfClientMargin) && e.clientY > 320 && e.clientY < 350) {
        gameview.gameStart = true
    } else if (e.clientX > (220 + halfClientMargin) && e.clientX < (425 + halfClientMargin) && e.clientY > 400 && e.clientY < 450) {
        gameview.tutorialStart = true
    }
    if (gameview.tutorialStart) {
        gameview.tutorial.tutorialSeq += 1
        if (gameview.tutorial.tutorialSeq === 5) {
            gameview.gameStart = true
            gameview.tutorialStart = false
        }
    }
});