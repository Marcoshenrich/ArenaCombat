

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
let playerState = "idle"
const dropdown = document.getElementById('animations')

dropdown.addEventListener("change", (e) => {
    playerState = e.target.value
})

const CANVAS_WIDTH = canvas.width = 1024

const CANVAS_HEIGHT = canvas.height = 768

const backgroundImage = new Image() 
backgroundImage.src = 'art/arena.jpg'

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
    { name: "idle", frames: 10, src: 'art/knight1/_Idle.png' },
    { name: "jump", frames: 7, src: 'art/knight1/_Idle.png' },
    { name: "fall", frames: 7, src: 'art/knight1/_Idle.png' },
    { name: "run", frames: 9, src: 'art/knight1/_Idle.png' },
    { name: "dizzy", frames: 11, src: 'art/knight1/_Idle.png' },
    { name: "sit", frames: 5, src: 'art/knight1/_Idle.png' },
    { name: "roll", frames: 7, src: 'art/knight1/_Idle.png' },
    { name: "bite", frames: 7, src: 'art/knight1/_Idle.png' },
    { name: "ko", frames: 12, src: 'art/knight1/_Idle.png' },
    { name: "getHit", frames: 4, src: 'art/knight1/_Idle.png' },
];

const playerImage = new Image()
playerImage.src = animationStates[0].src
const spriteWidth = 120;
const spriteHeight = 80;


animationStates.forEach((state, i) => {
    let frames = {
        loc: [],
        src: state.src
    }
    for (let j = 0; j < state.frames; j++) {	
        let positionX = j * spriteWidth;
        let positionY = i * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length

    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y
    ctx.drawImage(backgroundImage, 00,0,1024,768)
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 200, 450, Math.floor(spriteWidth * 3.5), Math.floor(spriteHeight*3.5))



    gameFrame++
    requestAnimationFrame(animate)
}
animate()






// basic implementation:
// function animate() {
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
//     // ctx.fillRect(50, 50, 100, 100)
//      //ctx.drawImage -- takes 9 args / image / source xstart / s ystart / s-width / s-height / draw to xstart / d ystart / d-width / d-height /
//     ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
//     if (gameFrame % staggerFrames === 0) {
//     if (frameX < 6) frameX++;
//     else frameX = 0
//     }

//     gameFrame++
//     requestAnimationFrame(animate)
// }
// animate()