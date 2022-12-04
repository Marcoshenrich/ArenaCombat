import GameView from './gameView.js'

const canvas = document.getElementById('canvas1')
const mat = document.getElementById('mat')
const gameview = new GameView(canvas)

const playerDropdown = document.getElementById('player-animations')
const opponentDropdown = document.getElementById('opponent-animations')


opponentDropdown.addEventListener("change", (e) => {
    gameview.opponent.animationState = e.target.value
    gameview.opponent.image.src = gameview.opponent.animations[gameview.opponent.animationState].src
});

playerDropdown.addEventListener("change", (e) => {
    gameview.knight.animationState = e.target.value
    gameview.knight.image.src = gameview.knight.animations[gameview.knight.animationState].src
});

mat.addEventListener("click", (e) => {
    let slot = e.target.parentNode
    if (slot.className === "card-slot") {
        let playerCardId = e.target.id
        gameview.resetAnimationFrames()
        gameview.game.coreGameLoop(playerCardId, slot.id)
    }
});

//2 attack, 1 dmg
//3 attack2, 2 dmg
//4 combo, 4 dmg
//5 roll, negate dmg receipt
