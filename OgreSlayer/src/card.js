class Card {
    constructor(){}

    basicCards = {
        strike: { A: 3, B: 0 },
        defend: { A: 0, B: 5 },
        reposition: { A: 0, B: 2, draw: 2}
    }

    knightCards = {
        taunt: { A: 0, B: 4 }, //crouch animation
        parry: { A: 0, B: 0 }, //attack animation
        shieldOfFaith: { A: 0, B: 5 },
        dodge: { A: 0, B: 0 }, //roll animation
        secondWind: { A: 0, B: 8 },
        feint: { A: 0, B: 0 }, //attack animation
        revengeance: { A: 0, B: 0 }, //attack animation
    }

    weaponCards = {
        mightyBlow: { A: 7, B: 0 }, //attack animation
        forHonor: { A: 3, B: 5 }, //attack animation
        poiseBreak: { A: 4, B: 0 }, //attack animation
        holdTheLine: { A: 0, B: 10 }
    }

    monsterCards = {
        strike: { A: 8, B: 0 },
        rockThrow: { A: 8, B: 6 },
        spikes: { A: 10, B: 0 },
        blidningFlash: { A: 0, B: 0 },
        turle: { A: 0, B: 0 },
    }


}

export default Card;

//player draws cards
//player forces opponent to Strike next turn
//player forces opponent to Block this turn
//player negates attack and deals damage (if opponent attacked)
//player negates damage on next turn
//player negates damage this turn
//player heals
//player tracks number of cards in discard pile and increase damage value
//player forces opponent to take double damage on the following turn


//opponent can prevent player from seeing the next move for two turns
//opponet can destroy cards in player's hands. 