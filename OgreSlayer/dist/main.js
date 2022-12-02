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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _knight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knight.js */ \"./src/knight.js\");\n/* harmony import */ var _knight_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_knight_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass Game {\n\n}\n\n// export {Game.method1, Game.method2} <- exmaple\n\n//# sourceURL=webpack://jsproj/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('canvas1')\nconst ctx = canvas.getContext('2d')\nlet playerState = \"idle\"\nlet opponentState = \"idle\"\nconst mat = document.getElementById('mat')\nconst playerDropdown = document.getElementById('player-animations')\nconst opponentDropdown = document.getElementById('opponent-animations')\n\nconst CANVAS_WIDTH = canvas.width = 1024\nconst CANVAS_HEIGHT = canvas.height = 1024\n\nconst backgroundImage = new Image() \nbackgroundImage.src = 'art/arena.jpg'\n\nconst matImage = new Image()\nmatImage.src = 'art/mat.png'\n\nlet gameFrame = 0;\nconst staggerFrames = 10;\n\n//------------------------------------ Player Sprite\n\nconst playerAnimations = [];\nconst playerAnimationStates = [\n    { name: \"idle\", frames: 10, src: 'art/knight1/_Idle.png' },\n    { name: \"attack\", frames: 4, src: 'art/knight1/_Attack.png' },\n    { name: \"attack2\", frames: 6, src: 'art/knight1/_Attack2.png' },\n    { name: \"combo\", frames: 10, src: 'art/knight1/_AttackCombo.png' },\n    { name: \"death\", frames: 10, src: 'art/knight1/_Death.png' },\n    { name: \"roll\", frames: 12, src: 'art/knight1/_Roll.png' },\n];\n\nconst playerImage = new Image()\nconst playerSpriteWidth = 120;\nconst playerSpriteHeight = 80;\n\n\nplayerAnimationStates.forEach((playerState) => {\n    let frames = {\n        loc: [],\n        src: playerState.src\n    }\n    for (let j = 0; j < playerState.frames; j++) {\t\n        let positionX = j * playerSpriteWidth;\n        let positionY = 0;\n        frames.loc.push({x: positionX, y: positionY});\n    }\n    playerAnimations[playerState.name] = frames;\n});\n\nplayerImage.src = playerAnimations[playerState].src\n\nplayerDropdown.addEventListener(\"change\", (e) => {\n    // the animation gaps bug is happening because after a few reversions of change, the playerstate in animate stops updating, lockking the length.\n    //     let playerPosition = Math.floor(gameFrame / staggerFrames) % playerAnimations[playerState].loc.length\n    // this may stop happening once I break out of the change loop. \n    playerState = e.target.value\n    playerImage.src = \"\"\n    playerImage.src = playerAnimations[playerState].src\n})\n\n\n//------------------------------------ Opponent Sprite\n\nconst opponentAnimations = [];\nconst opponentAnimationStates = [\n    { name: \"idle\", frames: 6, src: 'art/demon/_Idle.png' },\n    { name: \"attack\", frames: 5, src: 'art/demon/_Attack.png' },\n];\n\nconst opponentImage = new Image()\nconst opponentSpriteWidth = 100;\nconst opponentSpriteHeight = 80;\n\nopponentAnimationStates.forEach((opponentState) => {\n    let frames = {\n        loc: [],\n        src: opponentState.src\n    }\n    for (let j = 0; j < opponentState.frames; j++) {\n        let positionX = j * opponentSpriteWidth;\n        let positionY = 0;\n        frames.loc.push({ x: positionX, y: positionY });\n    }\n    opponentAnimations[opponentState.name] = frames;\n});\n\nopponentImage.src = opponentAnimations[opponentState].src\n\nopponentDropdown.addEventListener(\"change\", (e) => {\n    opponentState = e.target.value\n    opponentImage.src = \"\"\n    opponentImage.src = opponentAnimations[opponentState].src\n})\n\n\n\nfunction animate() {\n    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)\n    ctx.drawImage(backgroundImage, 0,0,1024,768)\n    ctx.drawImage(matImage, -3, 760, 1060, 280)\n    \n    \n    //player draw\n    let playerPosition = Math.floor(gameFrame / staggerFrames) % playerAnimations[playerState].loc.length\n    console.log(playerState);\n    let playerFrameX = playerSpriteWidth * playerPosition;\n    let playerframeY = playerAnimations[playerState].loc[playerPosition].y\n    ctx.drawImage(playerImage, playerFrameX, playerframeY, playerSpriteWidth, playerSpriteHeight, 200, 450, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight*3.5))\n\n    //opponent draw\n    let opponentPosition = Math.floor(gameFrame / staggerFrames) % opponentAnimations[opponentState].loc.length\n    let opponentFrameX = opponentSpriteWidth * opponentPosition;\n    let opponentframeY = opponentAnimations[opponentState].loc[opponentPosition].y\n    ctx.drawImage(opponentImage, opponentFrameX, opponentframeY, opponentSpriteWidth, opponentSpriteHeight, 400, 475, Math.floor(playerSpriteWidth * 3.5), Math.floor(playerSpriteHeight * 3.5))\n\n    gameFrame++\n    requestAnimationFrame(animate)\n}\nanimate()\n\n\n\n\n\n\n// basic implementation:\n// function animate() {\n//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)\n//     // ctx.fillRect(50, 50, 100, 100)\n//      //ctx.drawImage -- takes 9 args / image playerSpriteWidth/ source xstart / s ystart / s-width / s-height / draw to xstart / d ystart / d-width / d-height /\n//     ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)\n//     if (gameFrame % staggerFrames === 0) {\n//     if (frameX < 6) frameX++;\n//     else frameX = 0\n//     }\n\n//     gameFrame++\n//     requestAnimationFrame(animate)\n// }\n// animate()\n\n//# sourceURL=webpack://jsproj/./src/index.js?");

/***/ }),

/***/ "./src/knight.js":
/*!***********************!*\
  !*** ./src/knight.js ***!
  \***********************/
/***/ (() => {

eval("class Knight {\n    constructor(){}\n}\n\n\n\n//# sourceURL=webpack://jsproj/./src/knight.js?");

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