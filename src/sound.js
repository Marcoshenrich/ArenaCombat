export default class Sound {
    constructor() {
        this.allSounds = this.allSoundsObj()
        this.volume = .5
        this.kickOffScore = false
    }

    allSoundsObj() {
        return {
            soundTrack : { clip: new Audio("./dist/sounds/soundtrack/soundTrack.mp3"), volumePreset: .2},
            loopTrack: { clip: new Audio("./dist/sounds/soundtrack/loopTrack.mp3"), volumePreset: .2},

            earthquake: { clip: new Audio("./dist/sounds/soundEffects/earthquake.mp3"), volumePreset: .5},

            demonFearTheDark: { clip: new Audio("./dist/sounds/soundEffects/monsters/demonFearTheDark.wav"), volumePreset: null},
            demonIAmYourMaster: { clip: new Audio("./dist/sounds/soundEffects/monsters/demonIAmYourMaster.wav"), volumePreset: null},
            demonYouWillObey: { clip: new Audio("./dist/sounds/soundEffects/monsters/demonYouWillObey.wav"), volumePreset: null},
            demonYouBelongToMe: { clip: new Audio("./dist/sounds/soundEffects/monsters/demonYouBelongToMe.wav"), volumePreset: null},
            
            flipCard: { clip: new Audio("./dist/sounds/soundEffects/flip-card.mp3"), volumePreset: null }
        }
    }


    playSound(audiokey) {
        this.allSounds[audiokey].clip.volume = this.volume === 0 ? this.volume : this.allSounds[audiokey].volumePreset || this.volume
        this.allSounds[audiokey].clip.play()
    }


    muteAllSounds() {
        this.volume = 0
        Object.values(this.allSounds).forEach((soundObj) => {
            soundObj.clip.volume = 0
        })
    }

    unmuteAllSounds() {
        this.volume = .5
        Object.values(this.allSounds).forEach((soundObj) => {
            soundObj.clip.volume = soundObj.volumePreset || this.volume
        })
    }



    playScore() {
        this.playSound("soundTrack", .2)
        this.kickOffScore = true
        setTimeout(() => {
            this.loopScore()
        }, 190000)
    }

    loopScore() {
        this.playSound("loopTrack", .2)
        setTimeout(() => {
            this.loopScore()
        }, 150000)
    }


    endAllSounds() {
        let allPlayingSounds = []
        Object.values(this.allSounds).forEach((soundObj) => {
            if (!soundObj.clip.paused) allPlayingSounds.push(soundObj.clip)
        })

        this.volumeFader(allPlayingSounds)
    }

    volumeFader(audioClipArr) {
        let recurseVolumeBool = false

        audioClipArr.forEach((audioClip) => {
            try {
                if (audioClip.volume > 0) {
                    recurseVolumeBool = true
                    audioClip.volume = ((audioClip.volume * 100) - 1) / 100 //this is because -=.01 caused floats :/
                }
            }
            catch {
                audioClip.pause()
                audioClip.volume = 0
            }
        })

        if (recurseVolumeBool) {
            setTimeout(() => {
                this.volumeFader(audioClipArr)
            }, 100)
        }
    }



}