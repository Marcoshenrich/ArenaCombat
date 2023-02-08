export default class Sounds {
    constructor() {
        this.allSounds = this.allSoundsObj()
    }

    allSoundsObj() {
        return {
            soundTrack : new Audio("./dist/sounds/soundtrack/soundTrack.mp3"),
            loopTrack: new Audio("./dist/sounds/soundtrack/loopTrack.mp3"),

            earthquake: new Audio("./dist/sounds/soundEffects/earthquake.mp3"),

            demonFearTheDark: new Audio("./dist/sounds/soundEffects/monsters/demonFearTheDark.wav"),
            demonIAmYourMaster: new Audio("./dist/sounds/soundEffects/monsters/demonIAmYourMaster.wav"),
            demonYouWillObey: new Audio("./dist/sounds/soundEffects/monsters/demonYouWillObey.wav"),
            demonYouBelongToMe: new Audio("./dist/sounds/soundEffects/monsters/demonYouBelongToMe.wav"),
            
            flipCard: new Audio("./dist/sounds/soundEffects/flip-card.mp3")
        }
    }

    endAllSounds() {
        let recurseVolumeBool = false
        this.soundsArray.forEach((soundObj) => {
            if (soundObj.soundClip.volume > 0) {
                recurseVolumeBool = true
                soundObj.soundClip.volume = ((soundObj.soundClip.volume * 100) - 1) / 100 //this is because -=.01 caused floats :/
            }
        })
        if (recurseVolumeBool) {
            setTimeout(() => {
                this.endAllSounds()
            }, 100)
        }
        if (!recurseVolumeBool) {
            this.soundsArray = []
        }
    }

    playScore() {
        this.playSound("./dist/sounds/soundtrack/soundTrack.mp3", .2)
        this.kickOffScore = true
        setTimeout(() => {
            this.loopScore()
        }, 190000)
    }

    loopScore() {
        this.playSound("./dist/sounds/soundtrack/loopTrack.mp3", .2)
        setTimeout(() => {
            this.loopScore()
        }, 150000)
    }

    playSound(audioPath, volume) {

        let soundClip = new Audio(audioPath)
        soundClip.volume = volume || this.volume
        soundClip.play()
        this.soundsArray.push({ soundClip, volume })
    }

    muteAllSounds() {
        this.volume = 0
        this.soundsArray.forEach((soundObj) => {
            soundObj.soundClip.volume = 0
        })
    }

    playAllSounds() {
        this.volume = .5
        this.soundsArray.forEach((soundObj) => {
            soundObj.soundClip.volume = soundObj["volume"] || .5
        })
    }

}