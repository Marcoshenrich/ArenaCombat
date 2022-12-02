import Game from './game.js'
import GameView from './gameView.js'

const canvas = document.getElementById('canvas1')
const attack = document.getElementById('attack')

const gameview = new GameView(canvas)




const playerDropdown = document.getElementById('player-animations')
const opponentDropdown = document.getElementById('opponent-animations')


opponentDropdown.addEventListener("change", (e) => {
    gameview.opponentState = e.target.value
    gameview.game.opponent.opponentImage.src = ""
    gameview.game.opponent.opponentImage.src = gameview.game.opponent.opponentAnimations[gameview.opponentState].src
})

playerDropdown.addEventListener("change", (e) => {
    gameview.playerState = e.target.value
    gameview.game.knight.playerImage.src = ""
    gameview.game.knight.playerImage.src = gameview.game.knight.playerAnimations[gameview.playerState].src
})

attack.addEventListener("click", (e) => {
    gameview.playerState = "attack"
    gameview.game.knight.playerImage.src = gameview.game.knight.playerAnimations[gameview.playerState].src
    setTimeout(()=>{
        gameview.game.opponent.health -= 3
        gameview.playerState = "idle"
        gameview.game.knight.playerImage.src = gameview.game.knight.playerAnimations[gameview.playerState].src
    },1000)
})



