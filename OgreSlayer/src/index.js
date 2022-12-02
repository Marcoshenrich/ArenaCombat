import Game from './game.js'
import GameView from './gameView.js'

const canvas = document.getElementById('canvas1')

const playerDropdown = document.getElementById('player-animations')
const opponentDropdown = document.getElementById('opponent-animations')

const gameview = new GameView(canvas)

//------------------------------------ Player Sprite



//------------------------------------ Opponent Sprite

// const opponentAnimations = [];
// const opponentAnimationStates = [
//     { name: "idle", frames: 6, src: 'art/demon/_Idle.png' },
//     { name: "attack", frames: 5, src: 'art/demon/_Attack.png' },
// ];

// const opponentImage = new Image()
// const opponentSpriteWidth = 100;
// const opponentSpriteHeight = 80;

// opponentAnimationStates.forEach((opponentState) => {
//     let frames = {
//         loc: [],
//         src: opponentState.src
//     }
//     for (let j = 0; j < opponentState.frames; j++) {
//         let positionX = j * opponentSpriteWidth;
//         let positionY = 0;
//         frames.loc.push({ x: positionX, y: positionY });
//     }
//     opponentAnimations[opponentState.name] = frames;
// });

// opponentImage.src = opponentAnimations[opponentState].src

// opponentDropdown.addEventListener("change", (e) => {
//     opponentState = e.target.value
//     opponentImage.src = ""
//     opponentImage.src = opponentAnimations[opponentState].src
// })






// basic implementation:
// function animate() {
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
//     // ctx.fillRect(50, 50, 100, 100)
//      //ctx.drawImage -- takes 9 args / image playerSpriteWidth/ source xstart / s ystart / s-width / s-height / draw to xstart / d ystart / d-width / d-height /
//     ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
//     if (gameFrame % staggerFrames === 0) {
//     if (frameX < 6) frameX++;
//     else frameX = 0
//     }

//     gameFrame++
//     requestAnimationFrame(animate)
// }
// animate()