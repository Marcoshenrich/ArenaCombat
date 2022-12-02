/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("\n\nconst canvas = document.getElementById('canvas1')\nconst ctx = canvas.getContext('2d')\nlet playerState = \"idle\"\nconst dropdown = document.getElementById('animations')\n\ndropdown.addEventListener(\"change\", (e) => {\n    playerState = e.target.value\n})\n\nconst CANVAS_WIDTH = canvas.width = 1024\n\nconst CANVAS_HEIGHT = canvas.height = 768\n\nconst backgroundImage = new Image() \nbackgroundImage.src = 'art/arena.jpg'\n\nlet gameFrame = 0;\nconst staggerFrames = 5;\nconst spriteAnimations = [];\nconst animationStates = [\n    { name: \"idle\", frames: 10, src: 'art/knight1/_Idle.png' },\n    { name: \"jump\", frames: 7, src: 'art/knight1/_Idle.png' },\n    { name: \"fall\", frames: 7, src: 'art/knight1/_Idle.png' },\n    { name: \"run\", frames: 9, src: 'art/knight1/_Idle.png' },\n    { name: \"dizzy\", frames: 11, src: 'art/knight1/_Idle.png' },\n    { name: \"sit\", frames: 5, src: 'art/knight1/_Idle.png' },\n    { name: \"roll\", frames: 7, src: 'art/knight1/_Idle.png' },\n    { name: \"bite\", frames: 7, src: 'art/knight1/_Idle.png' },\n    { name: \"ko\", frames: 12, src: 'art/knight1/_Idle.png' },\n    { name: \"getHit\", frames: 4, src: 'art/knight1/_Idle.png' },\n];\n\nconst playerImage = new Image()\nplayerImage.src = animationStates[0].src\nconst spriteWidth = 120;\nconst spriteHeight = 80;\n\n\nanimationStates.forEach((state, i) => {\n    let frames = {\n        loc: [],\n        src: state.src\n    }\n    for (let j = 0; j < state.frames; j++) {\t\n        let positionX = j * spriteWidth;\n        let positionY = i * spriteHeight;\n        frames.loc.push({x: positionX, y: positionY});\n    }\n    spriteAnimations[state.name] = frames;\n});\n\nfunction animate() {\n    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)\n    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length\n\n    let frameX = spriteWidth * position;\n    let frameY = spriteAnimations[playerState].loc[position].y\n    ctx.drawImage(backgroundImage, 00,0,1024,768)\n    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 200, 450, Math.floor(spriteWidth * 3.5), Math.floor(spriteHeight*3.5))\n\n\n\n    gameFrame++\n    requestAnimationFrame(animate)\n}\nanimate()\n\n\n\n\n\n\n// basic implementation:\n// function animate() {\n//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)\n//     // ctx.fillRect(50, 50, 100, 100)\n//      //ctx.drawImage -- takes 9 args / image / source xstart / s ystart / s-width / s-height / draw to xstart / d ystart / d-width / d-height /\n//     ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)\n//     if (gameFrame % staggerFrames === 0) {\n//     if (frameX < 6) frameX++;\n//     else frameX = 0\n//     }\n\n//     gameFrame++\n//     requestAnimationFrame(animate)\n// }\n// animate()\n\n//# sourceURL=webpack://jsproj/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;