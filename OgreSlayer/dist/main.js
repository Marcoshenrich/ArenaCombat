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

/***/ "./src/combatant.js":
/*!**************************!*\
  !*** ./src/combatant.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Combatant)\n/* harmony export */ });\nclass Combatant {\n    constructor() {\n        this.animationState = \"idle\"\n        this.animations = [];\n        this.attack = 0\n        this.block = 0\n    }\n\n    animationFramesSetter() {\n        this.animationStates.forEach((spriteState) => {\n            let frames = {\n                loc: [],\n                src: spriteState.src\n            }\n            for (let j = 0; j < spriteState.frames; j++) {\n                let positionX = j * this.spriteWidth;\n                let positionY = 0;\n                frames.loc.push({ x: positionX, y: positionY });\n            }\n            this.animations[spriteState.name] = frames;\n        });\n    }\n\n    draw(ctx, gameFrame, staggerFrames) {\n        let position = Math.floor(gameFrame / staggerFrames) % this.animations[this.animationState].loc.length\n        let frameX = this.spriteWidth * position;\n        let frameY = this.animations[this.animationState].loc[position].y\n        ctx.drawImage(this.image, frameX, frameY, this.spriteWidth, this.spriteHeight, this.xPosition, this.yPosition, Math.floor(this.spriteWidth * 3.5), Math.floor(this.spriteHeight * 3.5))\n    }\n}\n\n//# sourceURL=webpack://jsproj/./src/combatant.js?");

/***/ }),

/***/ "./src/deck.js":
/*!*********************!*\
  !*** ./src/deck.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Deck)\n/* harmony export */ });\nclass Deck {\n    constructor(combatant, decksize) { \n        this.combatant = combatant\n        this.stack = []\n        this.allUniqueCards = {}\n        this.deckMaker(decksize)\n        console.log(this.stack)\n    }\n\n\n    deckMaker(decksize) {\n        let infiniteDeck;\n        let cardStats;\n        if (this.combatant.constructor.name === \"Knight\") {\n            cardStats = this.playerCards(this.combatant)\n            infiniteDeck = false\n        } else {\n            cardStats = this.opponentCards(this.combatant)\n            infiniteDeck = true\n        }\n        \n        let allCardNames = Object.keys(cardStats)\n\n        for (let i = 0; i < allCardNames.length; i++) {\n            let card = cardStats[allCardNames[i]]\n            let img = new Image()\n            img.src = card.src\n            card.art = img\n            this.allUniqueCards[allCardNames[i]] = card\n        }\n\n        for (let i = 0; i < decksize; i++) {\n            let card;\n            if (infiniteDeck) {\n                let allUniqueCardkeys = Object.keys(this.allUniqueCards)\n                card = this.allUniqueCards[allUniqueCardkeys[allUniqueCardkeys.length * Math.random() << 0]]\n            } else {\n                card = this.allUniqueCards[allCardNames[i]]\n            }\n            this.stack.push(card)\n        }\n\n        this.shuffleDeck()\n    }\n\n    shuffleDeck() {\n        for (let i = this.stack.length - 1; i > 0; i--) {\n            const j = Math.floor(Math.random() * (i + 1));\n            const temp = this.stack[i];\n            this.stack[i] = this.stack[j];\n            this.stack[j] = temp;\n        }\n    }\n\n    \n\n    playerCards(knight) {\n        return {\n            strike: {\n                id: \"strike\",\n                attack: 3,\n                block: 0,\n                src: \"art/knight_cards/strike.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            defend: {\n                id: \"defend\",\n                attack: 0,\n                block: 5,\n                src: \"art/knight_cards/defend.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            reposition: {\n                id: \"reposition\",\n                attack: 0,\n                block: 2,\n                src: \"art/knight_cards/reposition.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            taunt: {\n                id: \"taunt\",\n                attack: 0,\n                block: 4,\n                src: \"art/knight_cards/taunt.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            parry: {\n                id: \"parry\",\n                attack: 0,\n                block: 0,\n                src: \"art/knight_cards/parry.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            shieldOfFaith: {\n                id: \"shieldOfFaith\",\n                attack: 0,\n                block: 5,\n                src: \"art/knight_cards/shield_of_faith.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            dodge: {\n                id: \"dodge\",\n                attack: 0,\n                block: 0,\n                src: \"art/knight_cards/dodge.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            secondWind: {\n                id: \"secondWind\",\n                attack: 0,\n                block: 8,\n                src: \"art/knight_cards/second_wind.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            feint: {\n                id: \"feint\",\n                attack: 0,\n                block: 0,\n                src: \"art/knight_cards/feint.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            revengeance: {\n                id: \"revengeance\",\n                attack: 0,\n                block: 0,\n                src: \"art/knight_cards/revengeance.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            mightyBlow: {\n                id: \"mightyBlow\",\n                attack: 7,\n                block: 0,\n                src: \"art/knight_cards/mighty_blow.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            forHonor: {\n                id: \"forHonor\",\n                attack: 3,\n                block: 5,\n                src: \"art/knight_cards/for_honor.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            poiseBreak: {\n                id: \"poiseBreak\",\n                attack: 3,\n                block: 5,\n                src: \"art/knight_cards/poise_break.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n            holdTheLine: {\n                id: \"holdTheLine\",\n                attack: 0,\n                block: 10,\n                src: \"art/knight_cards/hold_the_line.png\",\n                animation: knight.attackAnimation.bind(knight),\n                effects: () => { }\n            },\n\n\n        }\n\n    }\n\n    opponentCards(opponent) {\n        return {\n\n            strike: {\n                attack: 8,\n                block: 0,\n                src: \"art/opponent_cards/mstrike.png\",\n                animation: opponent.attackAnimation.bind(opponent),\n                effects: () => { }\n            },\n\n            rockThrow: {\n                attack: 8,\n                block: 6,\n                src: \"art/opponent_cards/mrock_throw.png\",\n                animation: opponent.attacktwiceAnimation.bind(opponent),\n                effects: () => { }\n            },\n\n            spikes: {\n                attack: 12,\n                block: 0,\n                src: \"art/opponent_cards/mspikes.png\",\n                animation: opponent.attack2Animation.bind(opponent),\n                effects: () => { }\n            },\n\n            blindingFlash: {\n                attack: 0,\n                block: 0,\n                src: \"art/opponent_cards/mblinding_flash.png\",\n                animation: opponent.attack3Animation.bind(opponent),\n                effects: () => { }\n            },\n\n            turtle: {\n                attack: 0,\n                block: 10,\n                src: \"art/opponent_cards/mturtle.png\",\n                animation: opponent.idleAnimation.bind(opponent),\n                effects: () => { }\n            },\n\n            groundPound: {\n                attack: 0,\n                block: 0,\n                src: \"art/opponent_cards/mground_pound.png\",\n                animation: opponent.attack3Animation.bind(opponent),\n                effects: () => { }\n            }\n        }\n    }   \n}\n\n//player draws cards\n//player forces opponent to Strike next turn\n//player forces opponent to Block this turn\n//player negates attack and deals damage (if opponent attacked)\n//player negates damage on next turn\n//player negates damage this turn\n//player heals\n//player tracks number of cards in discard pile and increase damage value\n//player forces opponent to take double damage on the following turn\n\n\n//opponent can prevent player from seeing the next move for two turns\n//opponet can destroy cards in player's hands. \n\n//# sourceURL=webpack://jsproj/./src/deck.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _knight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knight.js */ \"./src/knight.js\");\n/* harmony import */ var _opponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./opponent.js */ \"./src/opponent.js\");\n\n\n\nclass Game {\n    constructor() { \n        this.knight = new _knight_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n        this.opponent = new _opponent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\n        this.setupMat()\n    }\n\n    setupMat() {\n        let deck = this.knight.deck\n\n        for (let i = 1; i <= 5; i++) {\t\n            let card = deck[i - 1]\n            let slotId = \"card-slot\" + i\n            let slot = document.getElementById(slotId)\n            slot.innerHTML += '<img src=\"' + card.src + '\" id=\"' + card.id + '\" class=\"card\" + \" width=\"280px\" height=\"280px\"/>';\n\n        }\n\n        this.knight.deck = deck.slice(5, deck.length)\n    }\n\n    coreGameLoop(playerCardId, slotId) {\n        let playedCard = this.knight.allUniqueCards[playerCardId]\n\n        this.knight.attack = playedCard.attack\n        this.knight.block = playedCard.attack\n\n        this.opponent.attack = this.opponent.nextMove[0].attack\n        this.opponent.block = this.opponent.nextMove[0].block\n\n        this.damageCalc()\n        this.cardEffects()\n\n        // if (playedCard.effects) knightTest[knightcard].effects()\n\n        playedCard.animation()\n        this.opponent.nextMove[0].animation()\n        this.opponent.nextMove.shift()\n        this.resolveMatState(slotId)\n\n    }\n\n    damageCalc(){\n        if (this.opponent.attack > this.knight.block) this.knight.health -= (this.opponent.attack - this.knight.block)\n        if (this.knight.attack > this.opponent.block) this.opponent.health -= (this.knight.attack - this.opponent.block)\n    }\n\n    cardEffects() {\n\n    }\n\n    resolveMatState(slotId) {\n        let slot = document.getElementById(slotId)\n        slot.innerHTML = \"\"\n\n        if (this.knight.deck.length > 0) {\n            let card = this.knight.deck.shift()\n            slot.innerHTML = \"\"\n            slot.innerHTML += '<img src=\"' + card.src + '\" id=\"' + card.id + '\" class=\"card\" width=\"280px\" height=\"280px\"/>';\n        }\n    }\n\n}\n\n\n\n//# sourceURL=webpack://jsproj/./src/game.js?");

/***/ }),

/***/ "./src/gameView.js":
/*!*************************!*\
  !*** ./src/gameView.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameView)\n/* harmony export */ });\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\n\nclass GameView {\n    constructor(canvas) { \n        this.ctx = canvas.getContext('2d')\n\n        this.CANVAS_WIDTH = canvas.width = 1024\n        this.CANVAS_HEIGHT = canvas.height = 760\n        this.infoDimensions = { infoSquareYOffset: 200, infoSquareXOffset: 274, infoSquareLen: 200, infoSquareHeight: 400 } \n\n        this.backgroundImage = new Image()\n        this.backgroundImage.src = 'art/arena.jpg'\n\n        this.matImage = new Image()\n        this.matImage.src = 'art/mat.png'\n\n        this.game = new _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n        this.knight = this.game.knight\n        this.opponent = this.game.opponent\n\n        this.gameFrame = 0;\n        this.staggerFrames = 10;\n\n        this.animate()\n\n        this.hoveredCard = null\n        this.showNextHover = true\n    }\n\n    animate() {\n        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)\n        this.renderBackground()\n        this.renderText()\n        this.opponent.draw(this.ctx, this.gameFrame, this.staggerFrames)\n        this.knight.draw(this.ctx,this.gameFrame, this.staggerFrames)\n        this.gameFrame++\n\n        if (this.hoveredCard && this.showNextHover) this.renderHoveredCard(this.hoveredCard)\n\n        requestAnimationFrame(this.animate.bind(this))\n\n        \n    }\n\n    renderBackground() {\n        this.ctx.drawImage(this.backgroundImage, 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)\n       \n        this.ctx.fillStyle = 'rgba(225,225,225,0.9)';\n        const opponentInfoSquare = this.ctx.fillRect((this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset), this.infoDimensions.infoSquareYOffset, this.infoDimensions.infoSquareLen, this.infoDimensions.infoSquareHeight)\n       \n        let opponentMove = this.game.opponent.nextMove[0].art \n        this.ctx.drawImage(opponentMove, (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 10, this.infoDimensions.infoSquareYOffset + 120, 180, 280)\n\n        const playerInfoSquare = this.ctx.fillRect((this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen), this.infoDimensions.infoSquareYOffset, this.infoDimensions.infoSquareLen, this.infoDimensions.infoSquareHeight)\n    }\n\n    renderText() {\n        this.ctx.fillStyle = 'rgba(0,0,0,1)';\n        this.ctx.font = \"bold 20px verdana, sans-serif \"\n        this.ctx.fillText(\"Monster Health\", (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 14, this.infoDimensions.infoSquareYOffset + 40)\n        this.ctx.fillText(`Atk: ${this.opponent.attack} Blk: ${this.opponent.block} `, (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) +30, this.infoDimensions.infoSquareYOffset + 110)\n\n        this.ctx.fillText(\"Move\", (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 65, this.infoDimensions.infoSquareYOffset + 140)\n        this.ctx.fillText(this.opponent.health, (this.CANVAS_WIDTH - this.infoDimensions.infoSquareXOffset) + 80, this.infoDimensions.infoSquareYOffset + 80)\n\n        this.ctx.fillText(\"Knight Health\", (this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen) + 21, this.infoDimensions.infoSquareYOffset + 40)\n        this.ctx.fillText(`Atk: ${this.knight.attack} Blk: ${this.knight.block} `, (this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen) + 30, this.infoDimensions.infoSquareYOffset + 110)\n        this.ctx.fillText(this.game.knight.health, (this.infoDimensions.infoSquareXOffset - this.infoDimensions.infoSquareLen) + 81, this.infoDimensions.infoSquareYOffset + 80)\n    }\n\n    resetAnimationFrames() {\n        this.gameFrame = 0;\n    }\n\n    renderHoveredCard(playerCardId) {\n        let card = this.knight.allUniqueCards[playerCardId]\n        this.ctx.drawImage(card.art, (this.CANVAS_WIDTH / 2) - (390 / 2), (this.CANVAS_HEIGHT / 2) - (800/2), 390, 600)\n\n    }\n\n}\n\n\n\n\n\n//# sourceURL=webpack://jsproj/./src/gameView.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameView.js */ \"./src/gameView.js\");\n\n\nconst canvas = document.getElementById('canvas1')\nconst mat = document.getElementById('mat')\nconst gameview = new _gameView_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas)\n\nconst playerDropdown = document.getElementById('player-animations')\nconst opponentDropdown = document.getElementById('opponent-animations')\n\nmat.addEventListener(\"click\", (e) => {\n    gameview.showNextHover = false\n    let slot = e.target.parentNode\n    if (slot.className === \"card-slot\") {\n        let playerCardId = e.target.id\n        gameview.resetAnimationFrames()\n        gameview.game.coreGameLoop(playerCardId, slot.id)\n        gameview.hoveredCard = null\n    }\n});\n\nmat.addEventListener(\"mouseover\", (e) => {\n    let slot = e.target.parentNode\n    if (slot.className === \"card-slot\") {\n        let playerCardId = e.target.id\n        let card = gameview.knight.allUniqueCards[playerCardId]\n\n        gameview.knight.block = card.block\n        gameview.knight.attack = card.attack\n\n        gameview.hoveredCard = playerCardId\n    }\n});\n\nmat.addEventListener(\"mouseout\", (e) => {\n    gameview.showNextHover = true\n    let slot = e.target.parentNode\n    if (slot.className === \"card-slot\") {\n        gameview.hoveredCard = null\n        gameview.knight.block = 0\n        gameview.knight.attack = 0\n    }\n});\n\n\n//# sourceURL=webpack://jsproj/./src/index.js?");

/***/ }),

/***/ "./src/knight.js":
/*!***********************!*\
  !*** ./src/knight.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Knight)\n/* harmony export */ });\n/* harmony import */ var _combatant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./combatant.js */ \"./src/combatant.js\");\n/* harmony import */ var _deck_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deck.js */ \"./src/deck.js\");\n\n\n\nclass Knight extends _combatant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(){\n        super()\n        this.image = new Image()\n        this.image.src = 'art/knight1/_Idle.png'\n        this.spriteWidth = 120;\n        this.spriteHeight = 80;\n        this.xPosition = 200\n        this.yPosition = 450\n\n        this.health = 30\n\n        this.deckObj = new _deck_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this, 14)\n        this.deck = this.deckObj.stack\n        this.allUniqueCards = this.deckObj.allUniqueCards\n\n        this.animationStates = [\n        { name: \"idle\", frames: 10, src: 'art/knight1/_Idle.png' },\n        { name: \"attack\", frames: 4, src: 'art/knight1/_Attack.png' },\n        { name: \"attack2\", frames: 6, src: 'art/knight1/_Attack2.png' },\n        { name: \"combo\", frames: 10, src: 'art/knight1/_AttackCombo.png' },\n        { name: \"death\", frames: 10, src: 'art/knight1/_Death.png' },\n        { name: \"roll\", frames: 12, src: 'art/knight1/_Roll.png' },\n        ];\n\n        this.animationFramesSetter()\n    }\n\n\n}\n\nKnight.prototype.idleAnimation = function () {\n    this.animationState = \"idle\"\n    this.image.src = this.animations[\"idle\"].src\n}\n\nKnight.prototype.attackAnimation = function() {\n    this.animationState = \"attack\"\n    this.image.src = this.animations[\"attack\"].src\n\n    setTimeout(() => {\n        this.idleAnimation()\n    }, 830)\n}\n\nKnight.prototype.attack2Animation = function () {\n    this.animationState = \"attack2\"\n    this.image.src = this.animations[\"attack2\"].src\n\n    setTimeout(() => {\n        this.idleAnimation()\n    }, 1000)\n}\n\nKnight.prototype.comboAnimation = function () {\n    this.animationState = \"combo\"\n    this.image.src = this.animations[\"combo\"].src\n\n    setTimeout(() => {\n        this.idleAnimation()\n    }, 1650)\n}\n\nKnight.prototype.deathAnimation = function () {\n    this.animationState = \"death\"\n    this.image.src = this.animations[\"death\"].src\n\n    setTimeout(() => {\n        this.idleAnimation()\n    }, 1650)\n}\n\nKnight.prototype.rollAnimation = function () {\n    this.animationState = \"roll\"\n    this.image.src = this.animations[\"roll\"].src\n\n    setTimeout(() => {\n        this.idleAnimation()\n    }, 1830)\n}\n\n\n//# sourceURL=webpack://jsproj/./src/knight.js?");

/***/ }),

/***/ "./src/opponent.js":
/*!*************************!*\
  !*** ./src/opponent.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Opponent)\n/* harmony export */ });\n/* harmony import */ var _combatant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./combatant.js */ \"./src/combatant.js\");\n/* harmony import */ var _deck_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deck.js */ \"./src/deck.js\");\n\n\n\nclass Opponent extends _combatant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor() { \n        super()\n        this.image = new Image()\n        this.image.src = 'art/demon/_Idle.png'\n        this.spriteWidth = 100;\n        this.spriteHeight = 80;\n        this.xPosition = 400\n        this.yPosition = 475\n        \n        // this.nextMove = []\n        // this.nextMoveMaker()\n\n        this.deckObj = new _deck_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this, 100)\n        this.nextMove = this.deckObj.stack\n        this.allUniqueCards = this.deckObj.allUniqueCards\n\n        this.health = 80\n\n        this.animationStates = [\n        { name: \"idle\", frames: 6, src: 'art/demon/_Idle.png' },\n        { name: \"attack\", frames: 5, src: 'art/demon/_Attack.png' },\n        { name: \"attack2\", frames: 6, src: 'art/demon/_Attack2.png' },\n        { name: \"attack3\", frames: 6, src: 'art/demon/_Attack3.png' },\n        { name: \"hit\", frames: 3, src: 'art/demon/_Hit.png' },\n        ];\n\n        this.animationFramesSetter()\n\n\n    }\n\n\n\n\n}\n\nOpponent.prototype.idleAnimation = function () {\n    this.animationState = \"idle\"\n    this.image.src = this.animations[\"idle\"].src\n}\n\nOpponent.prototype.attackAnimation = function () {\n    this.animationState = \"attack\"\n    this.image.src = this.animations[\"attack\"].src\n\n    setTimeout(() => {\n        this.idleAnimation()\n    }, 830)\n}\n\nOpponent.prototype.attacktwiceAnimation = function () {\n    this.animationState = \"attack\"\n    this.image.src = this.animations[\"attack\"].src\n\n    setTimeout(() => {\n        this.idleAnimation()\n    }, 1660)\n}\n\nOpponent.prototype.attack2Animation = function () {\n    this.animationState = \"attack2\"\n    this.image.src = this.animations[\"attack2\"].src\n\n    setTimeout(() => {\n        this.idleAnimation()\n    }, 1000)\n}\n\n\nOpponent.prototype.attack3Animation = function () {\n    this.animationState = \"attack3\"\n    this.image.src = this.animations[\"attack3\"].src\n\n    setTimeout(() => {\n        this.idleAnimation()\n    }, 1000)\n}\n\n\nOpponent.prototype.hitAnimation = function () {\n    this.animationState = \"hit\"\n    this.image.src = this.animations[\"hit\"].src\n\n    setTimeout(() => {\n        this.idleAnimation()\n    }, 500)\n}\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://jsproj/./src/opponent.js?");

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