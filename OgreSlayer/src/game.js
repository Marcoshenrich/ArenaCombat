import Knight from './knight.js'
import Opponent from './opponent.js'

export default class Game {
    constructor() { 
        this.knight = new Knight()
        this.opponent = new Opponent()
    }

    coreGameLoop(knightcard) {
        const knightTest = {
            2: { attack: 1, block: 0, animation: this.knight.attackAnimation.bind(this.knight) },
            3: { attack: 2, block: 0, animation: this.knight.attack2Animation.bind(this.knight) ,
                effects: () => {
                    this.opponent.nextMove[0] = this.opponent.allUniqueCards.heal
                }
            
            },
                
            4: { attack: 4, block: 0, animation: this.knight.comboAnimation.bind(this.knight),
              effects: () => {
                  this.opponent.nextMove[1] = this.opponent.allUniqueCards.strike
                }
            },

            
            5: { attack: 0, block: 0, animation: this.knight.rollAnimation.bind(this.knight),
                    effects: () => {
                        this.opponent.attack = 0
                    }
             }
        }

        this.knight.attack = knightTest[knightcard].attack
        this.knight.block = knightTest[knightcard].attack

        this.opponent.attack = this.opponent.nextMove[0].attack
        this.opponent.block = this.opponent.nextMove[0].block

        this.damageCalc()
        this.cardEffects()

        if (knightTest[knightcard].effects) knightTest[knightcard].effects()

        knightTest[knightcard].animation()
        this.opponent.nextMove[0].animation()
        this.opponent.nextMove.shift()

    }

    damageCalc(){
        if (this.opponent.attack > this.knight.block) this.knight.health -= (this.opponent.attack - this.knight.block)
        if (this.knight.attack > this.opponent.block) this.opponent.health -= (this.knight.attack - this.opponent.block)
    }

    cardEffects() {

    }

}

