// export default class Knight {
//     constructor(){}

//     animate() {
//     }



//     const playerAnimations = [];
//     const playerAnimationStates = [
//         { name: "idle", frames: 10, src: 'art/knight1/_Idle.png' },
//         { name: "attack", frames: 4, src: 'art/knight1/_Attack.png' },
//         { name: "attack2", frames: 6, src: 'art/knight1/_Attack2.png' },
//         { name: "combo", frames: 10, src: 'art/knight1/_AttackCombo.png' },
//         { name: "death", frames: 10, src: 'art/knight1/_Death.png' },
//         { name: "roll", frames: 12, src: 'art/knight1/_Roll.png' },
//     ];

//     const playerImage = new Image()
//     const playerSpriteWidth = 120;
//     const playerSpriteHeight = 80;


//     playerAnimationStates.forEach((playerState) => {
//     let frames = {
//         loc: [],
//         src: playerState.src
//     }
//     for (let j = 0; j < playerState.frames; j++) {
//         let positionX = j * playerSpriteWidth;
//         let positionY = 0;
//         frames.loc.push({ x: positionX, y: positionY });
//     }
//     playerAnimations[playerState.name] = frames;
// });

// playerImage.src = playerAnimations[playerState].src

// playerDropdown.addEventListener("change", (e) => {
//     // the animation gaps bug is happening because after a few reversions of change, the playerstate in animate stops updating, lockking the length.
//     //     let playerPosition = Math.floor(gameFrame / staggerFrames) % playerAnimations[playerState].loc.length
//     // this may stop happening once I break out of the change loop. 
//     playerState = e.target.value
//     playerImage.src = ""
//     playerImage.src = playerAnimations[playerState].src
// })
// }

