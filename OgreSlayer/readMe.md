## Overview

Demon slayer is a simplified arena combat simulator featuring cards as the primary vehicle for play. This game was designed and implemented in one week using vanilla JavaScript, HTML5, and CSS. No outside libraries were used. It features dynamic sprite animations, procedural game logic, interactive rendering, and an intro cinematic.

## Features
* Randomly generated decks for player and opponent
* Cards with unique and interactive effects
* Card selection and rendering effects for easier reading
* Various animations that play each turn
* Crowd that responds to the player's actions
* Intro cinematic
* Death and Victory cinematics

## How to Play
* Single player experience
* Each turn, the player selects a card by clicking on it. 
* The player and opponent's cards are resolved simultaneously. 
* You can only draw a card when you deal combat damage to the opponent. 
* Get your opponent to 0 health. 
* Refresh the page to play again!

## Implementation

### Animation Queue
* The Animation Queue was set up inside the shared combatant parent class. These shared functions dynamically set the animation states for both characters. They accept an animation string (eg "attack", "roll") that is stored in the card and sent to the animation queue by the core gameloop. 

* The core logic in combatant.draw() manages gameframes and tells the program which square of the sprite sheet should be rendered. Sprite sheets are 0 indexed, and the .draw() function stores the rendered frames in an array. A loop is considered complete once the first and laster value of the array is 0, and any other number is present in the array. This triggers the next animation in the queue to play. 

* This ensures that regardless of animation speed (affected by computer speed), each animation will complete before the next one plays. 

```javascript
  //inside combatant
    animationQueueSetter() {
        if (this.animationQueue.length === 0) {
            this.animation("idle")
        } else {
            let aniStateName = this.animationQueue.shift()
            this.animation(aniStateName)
        } 
    }

    animation = function(aniStateName) {
        this.animationState = aniStateName
        this.image.src = this.animations[aniStateName].src
    }
    // inside combatant.draw()
    this.aniCheckQueue.push(position)
                let unique = this.aniCheckQueue.filter((value, index, self) => { return self.indexOf(value) === index })
                if (unique.length > 1 && this.aniCheckQueue.at(-1) === 0 && this.animationState !== "idle") {
                    this.animationQueueSetter()
                    this.aniCheckQueue = []
                }
  
```