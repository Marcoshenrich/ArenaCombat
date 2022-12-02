import Knight from './knight.js'
import Opponent from './opponent.js'

export default class Game {
    constructor() { 

    }

    animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        ctx.drawImage(backgroundImage, 0, 0, 1024, 768)
        ctx.drawImage(matImage, -3, 760, 1060, 280)

        //player draw
        let playerPosition = Math.floor(gameFrame / staggerFrames) % playerAnimations[playerState].loc.length
        console.log(playerState);
        let playerFrameX = playerSpriteWidth * playerPosition;
        let playerframeY = playerAnimations[playerState].loc[playerPosition].y
        ctx.drawImage(playerImage, playerFrameX, playerframeY, playerSpriteWidth, playerSpriteHeight, 200, 450, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight * 3.5))

        //opponent draw
        let opponentPosition = Math.floor(gameFrame / staggerFrames) % opponentAnimations[opponentState].loc.length
        let opponentFrameX = opponentSpriteWidth * opponentPosition;
        let opponentframeY = opponentAnimations[opponentState].loc[opponentPosition].y
        ctx.drawImage(opponentImage, opponentFrameX, opponentframeY, opponentSpriteWidth, opponentSpriteHeight, 400, 475, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight * 3.5))

        gameFrame++
        requestAnimationFrame(animate)
    }
}

// export {Game.method1, Game.method2} <- exmaple