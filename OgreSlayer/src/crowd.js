export default class Crowd {
    constructor() {
        this.leftImg = new Image()
        this.leftImg.src = 'art/crowd_left.png'
        this.rightImg = new Image()
        this.rightImg.src = 'art/crowd_right.png'
        this.crowdArray = []
        this.excitement = 75
        this.populateSection()
    }

    sectionBoundaries() {

        
        return { 
            farLeft: {
                xLow: 0,
                xHigh: 120,
                yLow: 350,
                yHigh: 415,
                spectArr: [],
                img: this.rightImg,
                size: 38,
                pop: 10
            },
            midLeft: {
                xLow: 240,
                xHigh: 400,
                yLow: 360,
                yHigh: 400,
                spectArr: [],
                img: this.rightImg,
                size: 38,
                pop: 10
            },
            midRight: {
                xLow: 500,
                xHigh: 680,
                yLow: 360,
                yHigh: 400,
                spectArr: [],
                img: this.leftImg,
                size: 38,
                pop: 10
            },
            farRight: {
                xLow: 780,
                xHigh: 900,
                yLow: 350,
                yHigh: 415,
                spectArr: [],
                img: this.leftImg,
                size: 38,
                pop: 10
            },
            midRightBalc: {
                xLow: 500,
                xHigh: 660,
                yLow: 275,
                yHigh: 300,
                spectArr: [],
                img: this.leftImg,
                size: 25,
                pop: 15
            },
            midleftBalc: {
                xLow: 300,
                xHigh: 490,
                yLow: 275,
                yHigh: 300,
                spectArr: [],
                img: this.rightImg,
                size: 25,
                pop: 15
            },
            farleftBalc: {
                xLow: 10,
                xHigh: 300,
                yLow: 260,
                yHigh: 278,
                spectArr: [],
                img: this.rightImg,
                size: 25,
                pop: 15
            },
            farrightBalc: {
                xLow: 600,
                xHigh: 900,
                yLow: 260,
                yHigh: 278,
                spectArr: [],
                img: this.leftImg,
                size: 25,
                pop: 15
            },
            midrightNosebleed: {
                xLow: 400,
                xHigh: 700,
                yLow: 185,
                yHigh: 200,
                spectArr: [],
                img: this.leftImg,
                size: 18,
                pop: 20
            }, 
            midleftNosebleed: {
                xLow: 200,
                xHigh: 500,
                yLow: 185,
                yHigh: 200,
                spectArr: [],
                img: this.rightImg,
                size: 18,
                pop: 20
            }, 
            farleftNosebleed: {
                xLow: 100,
                xHigh: 400,
                yLow: 170,
                yHigh: 180,
                spectArr: [],
                img: this.rightImg,
                size: 18,
                pop: 12
            },
            farrightNosebleed: {
                xLow: 500,
                xHigh: 800,
                yLow: 170,
                yHigh: 180,
                spectArr: [],
                img: this.leftImg,
                size: 18,
                pop: 12
            }, 

            
        }

    }

    populateSection() {
        let allSections = this.sectionBoundaries()
        for (let sectionName in allSections) {
            let section = allSections[sectionName]
            let xRange = section["xHigh"] - section["xLow"]
            let yRange = section["yHigh"] - section["yLow"]
            for (let i = 0; i <= section["pop"]; i++) {
                let dude = { img: section["img"] }
                dude["posX"] = Math.floor(Math.random() * xRange) + section["xLow"]
                dude["posY"] = Math.floor(Math.random() * yRange) + section["yLow"]
                dude["sizeX"] = Math.floor(Math.random() * 10) + section["size"]
                dude["sizeY"] = Math.floor(Math.random() * 10) + section["size"]
                section["spectArr"].push(dude)
            }
            section["spectArr"].sort((a, b) => { return a["posY"] - b["posY"]})
            this.crowdArray.push(section)
        }
      }

    jostle() {
        for (let i = 0; i < this.crowdArray.length; i++) {	
            let section = this.crowdArray[i]["spectArr"]
            let sectionRules = this.crowdArray[i]
            let xHigh = sectionRules["xHigh"]
            let xLow = sectionRules["xLow"]
            let yHigh = sectionRules["yHigh"]
            let yLow = sectionRules["yLow"]

            for (let j = 0; j < section.length; j++) {	
                let stagger = Math.floor(Math.random() * this.excitement)
                if (stagger === 0) {
                let spectator = section[j]
                
                    spectator["posY"] += Math.floor(Math.random() * 3) - 1
                    spectator["posX"] += Math.floor(Math.random() * 3) - 1
                    if (spectator["posY"] > sectionRules["yHigh"]) {
                        spectator["posY"] = yHigh
                    } 
                    if (spectator["posY"] < sectionRules["yLow"]) {
                        spectator["posY"] = yLow
                    }
                    if (spectator["posX"] > sectionRules["xHigh"]) {
                        spectator["posX"] = xHigh
                    }
                    if (spectator["posX"] < sectionRules["xLow"]) {
                        spectator["posX"] = xLow
                    }
       
                    
                }
            }
            section.sort((a, b) => { return a["posY"] - b["posY"] })

       } 
    }



}