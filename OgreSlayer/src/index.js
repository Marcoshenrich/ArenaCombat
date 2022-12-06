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
            }, 1500); // this needs to equal the longest animation time. 
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
    console.log(e.clientX);
    console.log(e.clientY );
    if (e.clientX > 800 && e.clientX < 920 && e.clientY > 375 && e.clientY < 580){
        gameview.showNextHover = true
        if (gameview.knight.status["blinded"]) {
            gameview.hoveredCard = gameview.opponent.blindedCard
        } else {
            gameview.hoveredCard = { opponentCard: gameview.opponent.nextMove.id }
        }
    } else {
        gameview.showNextHover = false
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


addEventListener("resize", (event) => { 
    let clientHeight = document.documentElement.clientHeight
    gameview.setHeight(clientHeight)

});

