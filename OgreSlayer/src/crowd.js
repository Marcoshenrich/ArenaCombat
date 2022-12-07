export default class Crowd {
    constructor() {
        this.leftImg = new Image()
        this.leftImg.src = 'art/crowd_left.png'
        this.rightImg = new Image()
        this.rightImg.src = 'art/crowd_right.png'
        this.crowdArray = []
        this.populateLower()
    }

    populateLower() {
        let crowdSection = []
        for (let i = 0; i <= 10; i++) {	
            let rightSpect = { img: this.rightImg }
            rightSpect["posY"] = Math.floor(Math.random() * 75) + 325
            rightSpect["posX"] = Math.floor(Math.random() * 130) - 10
            rightSpect["sizeX"] = Math.floor(Math.random() * 10) + 38
            rightSpect["sizeY"] = Math.floor(Math.random() * 10) + 38
            crowdSection.push(rightSpect)
        }
        crowdSection.sort((a, b) => { return a["posY"] - b["posY"]})
        this.crowdArray.push(crowdSection)
      
    }

    jostle() {
        for (let i = 0; i < this.crowdArray.length; i++) {	
            let section = this.crowdArray[i]
            for (let j = 0; j < section.length; j++) {	
                let spectator = section[j]
                spectator["posY"] += Math.floor(Math.random() * 3) - 1
                spectator["posX"] += Math.floor(Math.random() * 3) - 1
            }

       } 
    }



}