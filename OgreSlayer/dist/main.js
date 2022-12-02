/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _knight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knight.js */ \"./src/knight.js\");\n/* harmony import */ var _opponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./opponent.js */ \"./src/opponent.js\");\n\n\n\nclass Game {\n    constructor() { \n        this.knight = new _knight_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n        this.opponent = new _opponent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\n    }\n\n}\n\n\n\n//# sourceURL=webpack://jsproj/./src/game.js?");

/***/ }),

/***/ "./src/gameView.js":
/*!*************************!*\
  !*** ./src/gameView.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameView)\n/* harmony export */ });\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\n\nclass GameView {\n    constructor(canvas) { \n        this.game = new _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n        this.ctx = canvas.getContext('2d')\n\n        this.CANVAS_WIDTH = canvas.width = 1024\n        this.CANVAS_HEIGHT = canvas.height = 1024\n\n        this.backgroundImage = new Image()\n        this.backgroundImage.src = 'art/arena.jpg'\n\n        this.matImage = new Image()\n        this.matImage.src = 'art/mat.png'\n\n        this.playerState = \"idle\"\n        this.opponentState = \"idle\"\n\n        this.gameFrame = 0;\n        this.staggerFrames = 10;\n\n        this.animate()\n    }\n\n    animate() {\n        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)\n        this.ctx.drawImage(this.backgroundImage, 0, 0, 1024, 768)\n        this.ctx.drawImage(this.matImage, -3, 760, 1060, 280)\n\n        //player draw\n        let playerPosition = Math.floor(this.gameFrame / this.staggerFrames) % this.game.knight.playerAnimations[this.playerState].loc.length\n        let playerFrameX = this.game.knight.playerSpriteWidth * playerPosition;\n        let playerframeY = this.game.knight.playerAnimations[this.playerState].loc[playerPosition].y\n        this.ctx.drawImage(this.game.knight.playerImage, playerFrameX, playerframeY, this.game.knight.playerSpriteWidth, this.game.knight.playerSpriteHeight, 200, 450, Math.floor(this.game.knight.playerSpriteWidth * 3.5), Math.floor(this.game.knight.playerSpriteHeight * 3.5))\n      \n        //opponent draw\n        let opponentPosition = Math.floor(this.gameFrame / this.staggerFrames) % this.game.opponent.opponentAnimations[this.opponentState].loc.length\n        console.log(this.game.opponent.opponentAnimations[this.opponentState].loc)\n        let opponentFrameX = this.game.opponent.opponentSpriteWidth * opponentPosition;\n        let opponentframeY = this.game.opponent.opponentAnimations[this.opponentState].loc[opponentPosition].y\n        this.ctx.drawImage(this.game.opponent.opponentImage, opponentFrameX, opponentframeY, this.game.opponent.opponentSpriteWidth, this.game.opponent.opponentSpriteHeight, 400, 475, Math.floor(this.game.opponent.opponentSpriteWidth * 3.5), Math.floor(this.game.opponent.opponentSpriteHeight * 3.5))\n\n        this.gameFrame++\n        requestAnimationFrame(this.animate.bind(this))\n    }\n}\n\n\n//# sourceURL=webpack://jsproj/./src/gameView.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n/* harmony import */ var _gameView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameView.js */ \"./src/gameView.js\");\n\n\n\nconst canvas = document.getElementById('canvas1')\n\nconst playerDropdown = document.getElementById('player-animations')\nconst opponentDropdown = document.getElementById('opponent-animations')\n\nconst gameview = new _gameView_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvas)\n\n//------------------------------------ Player Sprite\n\n\n\n//------------------------------------ Opponent Sprite\n\n\n\n\n\n\n//# sourceURL=webpack://jsproj/./src/index.js?");

/***/ }),

/***/ "./src/knight.js":
/*!***********************!*\
  !*** ./src/knight.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Knight)\n/* harmony export */ });\nclass Knight {\n    constructor(){\n        this.playerImage = new Image()\n        this.playerImage.src = 'art/knight1/_Idle.png'\n        this.playerSpriteWidth = 120;\n        this.playerSpriteHeight = 80;\n\n        this.playerAnimations = [];\n        this.animationFramesSetter()\n\n\n    }\n\n    animationFramesSetter() {\n        this.playerAnimationStates = [\n            { name: \"idle\", frames: 10, src: 'art/knight1/_Idle.png' },\n            { name: \"attack\", frames: 4, src: 'art/knight1/_Attack.png' },\n            { name: \"attack2\", frames: 6, src: 'art/knight1/_Attack2.png' },\n            { name: \"combo\", frames: 10, src: 'art/knight1/_AttackCombo.png' },\n            { name: \"death\", frames: 10, src: 'art/knight1/_Death.png' },\n            { name: \"roll\", frames: 12, src: 'art/knight1/_Roll.png' },\n        ];\n\n        this.playerAnimationStates.forEach((playerState) => {\n            let frames = {\n                loc: [],\n                src: playerState.src\n            }\n            for (let j = 0; j < playerState.frames; j++) {\n                let positionX = j * this.playerSpriteWidth;\n                let positionY = 0;\n                frames.loc.push({ x: positionX, y: positionY });\n            }\n            this.playerAnimations[playerState.name] = frames;\n        });\n    }\n\n}\n\n\n\n\n\n\n\n    \n\n// playerImage.src = playerAnimations[playerState].src\n\n// playerDropdown.addEventListener(\"change\", (e) => {\n//     // the animation gaps bug is happening because after a few reversions of change, the playerstate in animate stops updating, lockking the length.\n//     //     let playerPosition = Math.floor(gameFrame / staggerFrames) % playerAnimations[playerState].loc.length\n//     // this may stop happening once I break out of the change loop. \n//     playerState = e.target.value\n//     playerImage.src = \"\"\n//     playerImage.src = playerAnimations[playerState].src\n// })\n// }\n\n\n\n//# sourceURL=webpack://jsproj/./src/knight.js?");

/***/ }),

/***/ "./src/opponent.js":
/*!*************************!*\
  !*** ./src/opponent.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Opponent)\n/* harmony export */ });\nclass Opponent {\n    constructor() { \n        this.opponentImage = new Image()\n        this.opponentImage.src = 'art/demon/_Idle.png'\n        this.opponentSpriteWidth = 100;\n        this.opponentSpriteHeight = 80;\n\n        this.opponentAnimations = [];\n        this.animationFramesSetter()\n    }\n\n    animationFramesSetter() {\n        this.opponentAnimationStates = [\n            { name: \"idle\", frames: 6, src: 'art/demon/_Idle.png' },\n            { name: \"attack\", frames: 5, src: 'art/demon/_Attack.png' },\n        ];\n\n        this.opponentAnimationStates.forEach((opponentState) => {\n            let frames = {\n                loc: [],\n                src: opponentState.src\n            }\n            for (let j = 0; j < opponentState.frames; j++) {\n                let positionX = j * this.opponentSpriteWidth;\n                let positionY = 0;\n                frames.loc.push({ x: positionX, y: positionY });\n            }\n            this.opponentAnimations[opponentState.name] = frames;\n        });\n    }\n}\n\n\n\n\n\n\n\n// opponentImage.src = opponentAnimations[opponentState].src\n\n// opponentDropdown.addEventListener(\"change\", (e) => {\n//     opponentState = e.target.value\n//     opponentImage.src = \"\"\n//     opponentImage.src = opponentAnimations[opponentState].src\n// })\n\n\n//# sourceURL=webpack://jsproj/./src/opponent.js?");

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