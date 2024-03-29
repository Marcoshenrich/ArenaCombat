export default class Sound {
    constructor() {
        this.allSounds = this.allSoundsObj()
        this.volume = .5
        this.kickOffScore = false
        this.demonSpeechKeyArr = this.demonSpeechMaker()
        this.demonSpeechTracker = 0
        this.timeOutSoundTrackerArr = []
    }

    allSoundsObj() {
        return {
            soundTrack: { clip: new Audio("./dist/sounds/soundtrack/mainTrack.mp3"), volumePreset: .2},
            loopTrack: { clip: new Audio("./dist/sounds/soundtrack/loopTrack.mp3"), volumePreset: .2},
            gameWin: { clip: new Audio("./dist/sounds/soundtrack/gameWin.mp3"), volumePreset: .2 },
            gameLoss: { clip: new Audio("./dist/sounds/soundtrack/gameLoss.mp3"), volumePreset: .1 },

            earthquake: { clip: new Audio("./dist/sounds/soundEffects/earthquake.mp3"), volumePreset: .5},

            demonFearTheDark: { clip: new Audio("./dist/sounds/soundEffects/monsters/demonFearTheDark.wav"), volumePreset: .3},
            demonIAmYourMaster: { clip: new Audio("./dist/sounds/soundEffects/monsters/demonIAmYourMaster.wav"), volumePreset: null},
            demonYouWillObey: { clip: new Audio("./dist/sounds/soundEffects/monsters/demonYouWillObey.wav"), volumePreset: null},
            demonYouBelongToMe: { clip: new Audio("./dist/sounds/soundEffects/monsters/demonYouBelongToMe.wav"), volumePreset: null},
            
            flipCard: { clip: new Audio("./dist/sounds/soundEffects/flip-card.mp3"), volumePreset: null },
            flipCard2: { clip: new Audio("./dist/sounds/soundEffects/flip-card.mp3"), volumePreset: null }

        }
    }

    demonVocalize() {
        this.playSound(this.demonSpeechKeyArr[this.demonSpeechTracker])
        this.demonSpeechTracker = (this.demonSpeechTracker + 1) % this.demonSpeechKeyArr.length
    }

    demonSpeechMaker() {
        let allDemonSpeech = [
            "demonIAmYourMaster",
            "demonFearTheDark",
            "demonYouWillObey",
            "demonYouBelongToMe"
            ]

        for (let i = allDemonSpeech.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = allDemonSpeech[i];
            allDemonSpeech[i] = allDemonSpeech[j];
            allDemonSpeech[j] = temp;
        }

        return allDemonSpeech
    }


    playSound(audiokey) {
        this.allSounds[audiokey].clip.volume = this.volume === 0 ? this.volume : this.allSounds[audiokey].volumePreset || this.volume
        if (audiokey === "flipCard") {
            if (!this.allSounds[audiokey].clip.paused) {
                this.playSound("flipCard2")
                return
            }
        }
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

    endAllTimeOuts() {
        this.timeOutSoundTrackerArr.forEach((timeoutId)=>{
            clearTimeout(timeoutId)
        })
    }

    playScore() {
        this.playSound("soundTrack")
        this.kickOffScore = true
        let timeoutId = setTimeout(() => {
            this.loopScore()
        }, 190000)
        this.timeOutSoundTrackerArr.push(timeoutId)
    }

    loopScore() {
        this.playSound("loopTrack")
        let timeoutId = setTimeout(() => {
            this.loopScore()
        }, 150000)
        this.timeOutSoundTrackerArr.push(timeoutId)

    }

    async endAllSounds(winBool) {
        let allPlayingSounds = []
        Object.values(this.allSounds).forEach((soundObj) => {
            if (!soundObj.clip.paused) allPlayingSounds.push(soundObj.clip)
        })

        this.endAllTimeOuts()
        await this.volumeFader(allPlayingSounds)
        if (winBool === "win") {
            this.playSound("gameWin")
        } else if (winBool === "loss") {
            this.playSound("gameLoss")
        }
    }

    async volumeFader(audioClipArr) {
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

        return "x"
    }



}