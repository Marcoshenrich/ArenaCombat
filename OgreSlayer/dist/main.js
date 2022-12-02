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

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ (() => {

eval("// import Knight from './knight.js'\n\n// export default class Game {\n//     constructor() { \n\n//     }\n\n//     initialize() {\n//         let playerState = \"idle\"\n//         let opponentState = \"idle\"\n//         const mat = document.getElementById('mat')\n\n//         const CANVAS_WIDTH = canvas.width = 1024\n//         const CANVAS_HEIGHT = canvas.height = 1024\n\n//         const backgroundImage = new Image()\n//         backgroundImage.src = 'art/arena.jpg'\n\n//         const matImage = new Image()\n//         matImage.src = 'art/mat.png'\n\n//         let gameFrame = 0;\n//         const staggerFrames = 10;\n//     }\n\n//     animate() {\n//         ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)\n//         ctx.drawImage(backgroundImage, 0, 0, 1024, 768)\n//         ctx.drawImage(matImage, -3, 760, 1060, 280)\n\n//         //player draw\n//         let playerPosition = Math.floor(gameFrame / staggerFrames) % playerAnimations[playerState].loc.length\n//         console.log(playerState);\n//         let playerFrameX = playerSpriteWidth * playerPosition;\n//         let playerframeY = playerAnimations[playerState].loc[playerPosition].y\n//         ctx.drawImage(playerImage, playerFrameX, playerframeY, playerSpriteWidth, playerSpriteHeight, 200, 450, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight * 3.5))\n\n//         //opponent draw\n//         let opponentPosition = Math.floor(gameFrame / staggerFrames) % opponentAnimations[opponentState].loc.length\n//         let opponentFrameX = opponentSpriteWidth * opponentPosition;\n//         let opponentframeY = opponentAnimations[opponentState].loc[opponentPosition].y\n//         ctx.drawImage(opponentImage, opponentFrameX, opponentframeY, opponentSpriteWidth, opponentSpriteHeight, 400, 475, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight * 3.5))\n\n//         gameFrame++\n//         requestAnimationFrame(animate)\n//     }\n// }\n\n// // export {Game.method1, Game.method2} <- exmaple\n\n//# sourceURL=webpack://jsproj/./src/Game.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _knight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knight.js */ \"./src/knight.js\");\n/* harmony import */ var _knight_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_knight_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _opponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./opponent.js */ \"./src/opponent.js\");\n\n\n\nclass Game {\n    constructor() { \n\n    }\n\n    animate() {\n        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)\n        ctx.drawImage(backgroundImage, 0, 0, 1024, 768)\n        ctx.drawImage(matImage, -3, 760, 1060, 280)\n\n        //player draw\n        let playerPosition = Math.floor(gameFrame / staggerFrames) % playerAnimations[playerState].loc.length\n        console.log(playerState);\n        let playerFrameX = playerSpriteWidth * playerPosition;\n        let playerframeY = playerAnimations[playerState].loc[playerPosition].y\n        ctx.drawImage(playerImage, playerFrameX, playerframeY, playerSpriteWidth, playerSpriteHeight, 200, 450, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight * 3.5))\n\n        //opponent draw\n        let opponentPosition = Math.floor(gameFrame / staggerFrames) % opponentAnimations[opponentState].loc.length\n        let opponentFrameX = opponentSpriteWidth * opponentPosition;\n        let opponentframeY = opponentAnimations[opponentState].loc[opponentPosition].y\n        ctx.drawImage(opponentImage, opponentFrameX, opponentframeY, opponentSpriteWidth, opponentSpriteHeight, 400, 475, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight * 3.5))\n\n        gameFrame++\n        requestAnimationFrame(animate)\n    }\n}\n\n// export {Game.method1, Game.method2} <- exmaple\n\n//# sourceURL=webpack://jsproj/./src/game.js?");

/***/ }),

/***/ "./src/gameView.js":
/*!*************************!*\
  !*** ./src/gameView.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameView)\n/* harmony export */ });\n/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game.js */ \"./src/Game.js\");\n/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Game_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass GameView {\n    constructor(canvas) { \n        this.ctx = canvas.getContext('2d')\n\n        this.CANVAS_WIDTH = canvas.width = 1024\n        this.CANVAS_HEIGHT = canvas.height = 1024\n\n        this.backgroundImage = new Image()\n        this.backgroundImage.src = 'art/arena.jpg'\n\n        this.matImage = new Image()\n        this.matImage.src = 'art/mat.png'\n\n        this.playerState = \"idle\"\n        this.opponentState = \"idle\"\n\n        this.gameFrame = 0;\n        this.staggerFrames = 10;\n\n        this.animate()\n    }\n\n    animate() {\n        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)\n        this.ctx.drawImage(this.backgroundImage, 0, 0, 1024, 768)\n        this.ctx.drawImage(this.matImage, -3, 760, 1060, 280)\n\n        // //player draw\n        // let playerPosition = Math.floor(gameFrame / staggerFrames) % playerAnimations[playerState].loc.length\n        // console.log(playerState);\n        // let playerFrameX = playerSpriteWidth * playerPosition;\n        // let playerframeY = playerAnimations[playerState].loc[playerPosition].y\n        // ctx.drawImage(playerImage, playerFrameX, playerframeY, playerSpriteWidth, playerSpriteHeight, 200, 450, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight * 3.5))\n\n        // //opponent draw\n        // let opponentPosition = Math.floor(gameFrame / staggerFrames) % opponentAnimations[opponentState].loc.length\n        // let opponentFrameX = opponentSpriteWidth * opponentPosition;\n        // let opponentframeY = opponentAnimations[opponentState].loc[opponentPosition].y\n        // ctx.drawImage(opponentImage, opponentFrameX, opponentframeY, opponentSpriteWidth, opponentSpriteHeight, 400, 475, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight * 3.5))\n\n        // gameFrame++\n        requestAnimationFrame(this.animate.bind(this))\n    }\n}\n\n\n//# sourceURL=webpack://jsproj/./src/gameView.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n/* harmony import */ var _gameView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameView.js */ \"./src/gameView.js\");\n\n\n\nconst canvas = document.getElementById('canvas1')\n\nconst playerDropdown = document.getElementById('player-animations')\nconst opponentDropdown = document.getElementById('opponent-animations')\n\nconst gameview = new _gameView_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvas)\n\n//------------------------------------ Player Sprite\n\n\n\n//------------------------------------ Opponent Sprite\n\n// const opponentAnimations = [];\n// const opponentAnimationStates = [\n//     { name: \"idle\", frames: 6, src: 'art/demon/_Idle.png' },\n//     { name: \"attack\", frames: 5, src: 'art/demon/_Attack.png' },\n// ];\n\n// const opponentImage = new Image()\n// const opponentSpriteWidth = 100;\n// const opponentSpriteHeight = 80;\n\n// opponentAnimationStates.forEach((opponentState) => {\n//     let frames = {\n//         loc: [],\n//         src: opponentState.src\n//     }\n//     for (let j = 0; j < opponentState.frames; j++) {\n//         let positionX = j * opponentSpriteWidth;\n//         let positionY = 0;\n//         frames.loc.push({ x: positionX, y: positionY });\n//     }\n//     opponentAnimations[opponentState.name] = frames;\n// });\n\n// opponentImage.src = opponentAnimations[opponentState].src\n\n// opponentDropdown.addEventListener(\"change\", (e) => {\n//     opponentState = e.target.value\n//     opponentImage.src = \"\"\n//     opponentImage.src = opponentAnimations[opponentState].src\n// })\n\n\n\n\n\n\n// basic implementation:\n// function animate() {\n//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)\n//     // ctx.fillRect(50, 50, 100, 100)\n//      //ctx.drawImage -- takes 9 args / image playerSpriteWidth/ source xstart / s ystart / s-width / s-height / draw to xstart / d ystart / d-width / d-height /\n//     ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)\n//     if (gameFrame % staggerFrames === 0) {\n//     if (frameX < 6) frameX++;\n//     else frameX = 0\n//     }\n\n//     gameFrame++\n//     requestAnimationFrame(animate)\n// }\n// animate()\n\n//# sourceURL=webpack://jsproj/./src/index.js?");

/***/ }),

/***/ "./src/knight.js":
/*!***********************!*\
  !*** ./src/knight.js ***!
  \***********************/
/***/ (() => {

eval("// export default class Knight {\n//     constructor(){}\n\n//     animate() {\n//     }\n\n\n\n//     const playerAnimations = [];\n//     const playerAnimationStates = [\n//         { name: \"idle\", frames: 10, src: 'art/knight1/_Idle.png' },\n//         { name: \"attack\", frames: 4, src: 'art/knight1/_Attack.png' },\n//         { name: \"attack2\", frames: 6, src: 'art/knight1/_Attack2.png' },\n//         { name: \"combo\", frames: 10, src: 'art/knight1/_AttackCombo.png' },\n//         { name: \"death\", frames: 10, src: 'art/knight1/_Death.png' },\n//         { name: \"roll\", frames: 12, src: 'art/knight1/_Roll.png' },\n//     ];\n\n//     const playerImage = new Image()\n//     const playerSpriteWidth = 120;\n//     const playerSpriteHeight = 80;\n\n\n//     playerAnimationStates.forEach((playerState) => {\n//     let frames = {\n//         loc: [],\n//         src: playerState.src\n//     }\n//     for (let j = 0; j < playerState.frames; j++) {\n//         let positionX = j * playerSpriteWidth;\n//         let positionY = 0;\n//         frames.loc.push({ x: positionX, y: positionY });\n//     }\n//     playerAnimations[playerState.name] = frames;\n// });\n\n// playerImage.src = playerAnimations[playerState].src\n\n// playerDropdown.addEventListener(\"change\", (e) => {\n//     // the animation gaps bug is happening because after a few reversions of change, the playerstate in animate stops updating, lockking the length.\n//     //     let playerPosition = Math.floor(gameFrame / staggerFrames) % playerAnimations[playerState].loc.length\n//     // this may stop happening once I break out of the change loop. \n//     playerState = e.target.value\n//     playerImage.src = \"\"\n//     playerImage.src = playerAnimations[playerState].src\n// })\n// }\n\n\n\n//# sourceURL=webpack://jsproj/./src/knight.js?");

/***/ }),

/***/ "./src/opponent.js":
/*!*************************!*\
  !*** ./src/opponent.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Opponent)\n/* harmony export */ });\nclass Opponent {\n    constructor() { }\n}\n\n//# sourceURL=webpack://jsproj/./src/opponent.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;