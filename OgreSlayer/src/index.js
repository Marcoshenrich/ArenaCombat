import GameView from './gameView.js'

const canvas = document.getElementById('canvas1')
const mat = document.getElementById('mat')
const gameview = new GameView(canvas)

const playerDropdown = document.getElementById('player-animations')
const opponentDropdown = document.getElementById('opponent-animations')


opponentDropdown.addEventListener("change", (e) => {
    gameview.opponent.animationState = e.target.value
    gameview.opponent.image.src = gameview.opponent.animations[gameview.opponent.animationState].src
})

playerDropdown.addEventListener("change", (e) => {
    gameview.knight.animationState = e.target.value
    gameview.knight.image.src = gameview.knight.animations[gameview.knight.animationState].src
})

mat.addEventListener("click", (e) => {
    // let el = document.getElementById('test')

    if (e.target.className === "card-slot") {
        let slot = e.target
        let num = parseInt(slot.id[slot.id.length - 1])

        gameview.knight.animationState = "attack"
        gameview.knight.image.src = gameview.knight.animations[gameview.knight.animationState].src
   
        setTimeout(() => {
            gameview.opponent.health -= num
            gameview.knight.animationState = "idle"
            gameview.knight.image.src = gameview.knight.animations[gameview.knight.animationState].src
        }, 1000)
    }
})


