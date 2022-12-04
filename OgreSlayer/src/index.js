import GameView from './gameView.js'

const canvas = document.getElementById('canvas1')
const mat = document.getElementById('mat')
const gameview = new GameView(canvas)

const playerDropdown = document.getElementById('player-animations')
const opponentDropdown = document.getElementById('opponent-animations')



mat.addEventListener("click", (e) => {
    if (!gameview.pauseInputs) {
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

        gameview.knight.block = card.block
        gameview.knight.attack = card.attack

        gameview.hoveredCard = playerCardId
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
