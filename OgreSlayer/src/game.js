import Knight from './knight.js'
import Opponent from './opponent.js'

export default class Game {
    constructor() { 
        this.knight = new Knight()
        this.opponent = new Opponent()
    }

    coreGameLoop(knightcard) {
        // const knightTest = {
        //     2: { attack: 1, block: 0, animation: this.knight.attackAnimation },
        //     3: { attack: 2, block: 0, animation: this.knight.attack2Animation },
        //     4: { attack: 4, block: 0, animation: this.knight.comboAnimation },
        //     5: { attack: 0, block: 0, animation: this.knight.rollAnimation }
        // }

        // this.knight.attack = knightTest[knightcard].attack
        // this.knight.block = knightTest[knightcard].attack

        // this.opponent.attack = this.opponent.nextmove[0].attack
        // this.opponent.block = this.opponent.nextmove[0].block

        // if (this.opponent.attack > this.knight.block) this.knight.health -= (this.opponent.attack - this.knight.block)
        // if (this.knight.attack > this.opponent.block) this.opponent.health -= (this.knight.attack - this.opponent.block)

        // knightTest[knightcard].animation()
        // this.opponent.nextmove[0].animation()
        // this.opponent.nextmove.shift()

    }

}

