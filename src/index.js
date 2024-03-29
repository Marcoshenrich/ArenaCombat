import GameView from './gameView.js'

const canvas = document.getElementById('canvas1')
const mat = document.getElementById('mat')
let clientHeight = document.documentElement.clientHeight
let gameview = new GameView(canvas, clientHeight)

const soundButton = document.getElementById('sound-button')


soundButton.addEventListener("click", (e) => {
    e.stopPropagation()
  
    if (soundButton.classList[1] === "sound-on") {
        soundButton.classList.remove("sound-on")
        soundButton.classList.add("sound-off")
        soundButton.innerHTML = `<i class="fa-solid fa-volume-xmark">`
        gameview.sound.muteAllSounds()
    } else {
        soundButton.classList.remove("sound-off")
        soundButton.classList.add("sound-on")
        soundButton.innerHTML = `<i class="fa-solid fa-volume-high">`
        gameview.sound.unmuteAllSounds()
    }

})


mat.addEventListener("click", (e) => {
    if (gameview.pauseInputs) return
    if (!gameview.game.gameOver)  {
        gameview.showNextHover = false
        gameview.pauseInputs = true
        let slot = e.target.parentNode
        if (slot.className === "card-slot full") {
            let playerCardId = e.target.id
            gameview.resetAnimationFrames()
            gameview.game.coreGameLoop(playerCardId, slot.id)
            gameview.hoveredCard = null
        }
        setTimeout(() => {
            gameview.pauseInputs = false
        }, 2000);
    }
});

mat.addEventListener("mouseover", (e) => {
    let slot = e.target.parentNode
    if (slot.className === "card-slot full") {
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

    if (slot.className === "card-slot full") {
        gameview.hoveredCard = null
        gameview.knight.attack = 0
        gameview.knight.block = 0
    }
});

canvas.addEventListener("mousemove", (e) => {
    let halfClientMargin = (document.documentElement.clientWidth - gameview.CANVAS_WIDTH)/2
    if (gameview.gameStart === true) {


        if (gameview.screenSize === "small") {
            if (e.clientX > (659 + halfClientMargin) && e.clientX < (745 + halfClientMargin) && e.clientY > (310 - gameview.heightOffset) && e.clientY < (480 - gameview.heightOffset)) {
                showOpponentCard()
            } else {
                gameview.hoveredCard = null
            }
        } else if (gameview.screenSize === "medium") {
            if (e.clientX > (683 + halfClientMargin) && e.clientX < (780 + halfClientMargin) && e.clientY > (340 - gameview.heightOffset) && e.clientY < (525 - gameview.heightOffset)) {
                showOpponentCard()
            } else {
                gameview.hoveredCard = null
            }
        } else {
            if (e.clientX > (718 + halfClientMargin) && e.clientX < (840 + halfClientMargin) && e.clientY > (375 - gameview.heightOffset) && e.clientY < (580 - gameview.heightOffset)) {
                showOpponentCard()
            } else {
                gameview.hoveredCard = null
            }
        }

    }      
});

const showOpponentCard = () => {
    gameview.showNextHover = true
    if (gameview.knight.status["blinded"]) {
        gameview.hoveredCard = gameview.opponent.blindedCard
    } else {
        gameview.hoveredCard = { opponentCard: gameview.opponent.nextMove.id }
    }
}

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
    gameview.setScreenSize(clientHeight)
});



canvas.addEventListener("click", (e) => {
    e.stopPropagation()
    if (gameview.pauseInputs) return

    if (!gameview.sound.kickOffScore) {
        gameview.sound.kickOffScore = true
        gameview.sound.playScore()
    }
    
    if (gameview.replay) {
        gameview.game.clearMat()
        gameview.sound.endAllSounds()
        gameview = new GameView(canvas, clientHeight)
        return
    }
        
    if (!gameview.gameStart || !gameview.playIntroAnimation) {
        let halfClientMargin = (document.documentElement.clientWidth - gameview.CANVAS_WIDTH) / 2


        if (gameview.screenSize === "small") {
            if (e.clientX > (285 + halfClientMargin) && e.clientX < (418 + halfClientMargin) && e.clientY > 236 && e.clientY < 274) {
                gameview.gameStart = true

            } else if (e.clientX > (285 + halfClientMargin) && e.clientX < (476 + halfClientMargin) && e.clientY > 313 && e.clientY < 344) {
                gameview.tutorialStart = true
            }
        } else if (gameview.screenSize === "medium") {
            if (e.clientX > (250 + halfClientMargin) && e.clientX < (403 + halfClientMargin) && e.clientY > 274 && e.clientY < 310) {
                gameview.gameStart = true
            } else if (e.clientX > (250 + halfClientMargin) && e.clientX < (476 + halfClientMargin) && e.clientY > 360 && e.clientY < 390) {
                gameview.tutorialStart = true
            }
        } else {
            if (e.clientX > (220 + halfClientMargin) && e.clientX < (400 + halfClientMargin) && e.clientY > 320 && e.clientY < 350) {
                gameview.gameStart = true
            } else if (e.clientX > (220 + halfClientMargin) && e.clientX < (425 + halfClientMargin) && e.clientY > 400 && e.clientY < 450) {
                gameview.tutorialStart = true
            }
        }

        if (gameview.tutorialStart && gameview.tutorial.tutorialSeq < 5) {
            gameview.tutorial.tutorialSeq += 1
        } else if (gameview.tutorial.tutorialSeq === 6) {
            gameview.tutorial.tutorialSeq += 1
        } 


    } 
});