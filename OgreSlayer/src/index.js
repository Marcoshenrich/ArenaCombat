import Game from './game.js'

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
let playerState = "idle"
let opponentState = "idle"
const mat = document.getElementById('mat')
const playerDropdown = document.getElementById('player-animations')
const opponentDropdown = document.getElementById('opponent-animations')

const CANVAS_WIDTH = canvas.width = 1024
const CANVAS_HEIGHT = canvas.height = 1024

const backgroundImage = new Image() 
backgroundImage.src = 'art/arena.jpg'

const matImage = new Image()
matImage.src = 'art/mat.png'

let gameFrame = 0;
const staggerFrames = 10;

//------------------------------------ Player Sprite

const playerAnimations = [];
const playerAnimationStates = [
    { name: "idle", frames: 10, src: 'art/knight1/_Idle.png' },
    { name: "attack", frames: 4, src: 'art/knight1/_Attack.png' },
    { name: "attack2", frames: 6, src: 'art/knight1/_Attack2.png' },
    { name: "combo", frames: 10, src: 'art/knight1/_AttackCombo.png' },
    { name: "death", frames: 10, src: 'art/knight1/_Death.png' },
    { name: "roll", frames: 12, src: 'art/knight1/_Roll.png' },
];

const playerImage = new Image()
const playerSpriteWidth = 120;
const playerSpriteHeight = 80;


playerAnimationStates.forEach((playerState) => {
    let frames = {
        loc: [],
        src: playerState.src
    }
    for (let j = 0; j < playerState.frames; j++) {	
        let positionX = j * playerSpriteWidth;
        let positionY = 0;
        frames.loc.push({x: positionX, y: positionY});
    }
    playerAnimations[playerState.name] = frames;
});

playerImage.src = playerAnimations[playerState].src

playerDropdown.addEventListener("change", (e) => {
    // the animation gaps bug is happening because after a few reversions of change, the playerstate in animate stops updating, lockking the length.
    //     let playerPosition = Math.floor(gameFrame / staggerFrames) % playerAnimations[playerState].loc.length
    // this may stop happening once I break out of the change loop. 
    playerState = e.target.value
    playerImage.src = ""
    playerImage.src = playerAnimations[playerState].src
})


//------------------------------------ Opponent Sprite

const opponentAnimations = [];
const opponentAnimationStates = [
    { name: "idle", frames: 6, src: 'art/demon/_Idle.png' },
    { name: "attack", frames: 5, src: 'art/demon/_Attack.png' },
];

const opponentImage = new Image()
const opponentSpriteWidth = 100;
const opponentSpriteHeight = 80;

opponentAnimationStates.forEach((opponentState) => {
    let frames = {
        loc: [],
        src: opponentState.src
    }
    for (let j = 0; j < opponentState.frames; j++) {
        let positionX = j * opponentSpriteWidth;
        let positionY = 0;
        frames.loc.push({ x: positionX, y: positionY });
    }
    opponentAnimations[opponentState.name] = frames;
});

opponentImage.src = opponentAnimations[opponentState].src

opponentDropdown.addEventListener("change", (e) => {
    opponentState = e.target.value
    opponentImage.src = ""
    opponentImage.src = opponentAnimations[opponentState].src
})



function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.drawImage(backgroundImage, 0,0,1024,768)
    ctx.drawImage(matImage, -3, 760, 1060, 280)
    
    
    //player draw
    let playerPosition = Math.floor(gameFrame / staggerFrames) % playerAnimations[playerState].loc.length
    console.log(playerState);
    let playerFrameX = playerSpriteWidth * playerPosition;
    let playerframeY = playerAnimations[playerState].loc[playerPosition].y
    ctx.drawImage(playerImage, playerFrameX, playerframeY, playerSpriteWidth, playerSpriteHeight, 200, 450, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight*3.5))

    //opponent draw
    let opponentPosition = Math.floor(gameFrame / staggerFrames) % opponentAnimations[opponentState].loc.length
    let opponentFrameX = opponentSpriteWidth * opponentPosition;
    let opponentframeY = opponentAnimations[opponentState].loc[opponentPosition].y
    ctx.drawImage(opponentImage, opponentFrameX, opponentframeY, opponentSpriteWidth, opponentSpriteHeight, 400, 475, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight * 3.5))

    gameFrame++
    requestAnimationFrame(animate)
}
animate()






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