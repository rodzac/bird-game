import { Fps } from './fps.js';

export class Background {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        // this.state = new Day(this)
        this.state = new Night(this)
    }

    draw(context) {
        context.fillStyle = this.state.draw(context)
        context.fillRect(0,  0, this.gameWidth, this.gameHeight)
    }

    update(deltaTime) {
        this.state.update(deltaTime)
    }

    updateState(state) {
        this.state = state
    }
}

class AlmostSunSet {
    constructor(background) {
        this.background = background
        this.fps = new Fps(9)
        this.sunPositionY = 360
        this.sunsetSpeed = 1;
        this.skyColors = []
        this.blueSky = {
            red: 135 - 75,
            green: 206 - 45,
            blue: 235 - 15,
        }
    }

    draw(context) {
        let gradient = context.createLinearGradient(this.background.gameWidth - this.sunPositionY, this.background.gameHeight / 2, this.background.gameWidth, this.sunPositionY)
        this.skyColors.forEach((current) => {
            gradient.addColorStop(current.ratio, current.color)
        })
        return gradient
    }

    update(deltaTime) {
        this.fps.update(deltaTime)

        const color = (color, ratio) => {
            return {color, ratio}
        }

        if (this.fps.hasFrameChanged()) {
            this.sunPositionY += this.sunsetSpeed
            if (this.fps.hasSecondChanged()) {
                this.blueSky.red -= 5
                this.blueSky.green -= 3
                this.blueSky.blue -= 1
            }
            this.skyColors = [this.blueSkyColor(0), color("#E0F6FF", 1)]
        }

        if (this.fps.secondsSinceLastRestart() === 5) {
            console.log(this.sunPositionY)
            console.log(this.blueSkyColor(0))
            this.background.updateState(new Sunset(this.background))
        }
    }

    blueSkyColor(ratio) {
        return {
            color: `rgb(${this.blueSky.red}, ${this.blueSky.green}, ${this.blueSky.blue})`,
            ratio
        }
    }
}

class Day {
    constructor(background) {
        this.background = background
        this.fps = new Fps(9)
        this.sunPositionY = 0
        this.sunsetSpeed = 1;
        this.skyColors = []
        this.blueSky = {
            red: 135,
            green: 206,
            blue: 235,
        }
    }

    draw(context) {
        let gradient = context.createLinearGradient(this.background.gameWidth - this.sunPositionY, this.background.gameHeight / 2, this.background.gameWidth, this.sunPositionY)
        this.skyColors.forEach((current) => {
            gradient.addColorStop(current.ratio, current.color)
        })
        return gradient
    }

    update(deltaTime) {
        this.fps.update(deltaTime)

        const color = (color, ratio) => {
            return {color, ratio}
        }

        if (this.fps.hasFrameChanged()) {
            this.sunPositionY += this.sunsetSpeed
            if (this.fps.secondsSinceLastRestart() < 25) {
                this.skyColors = [color("#87CEEB", 0), color("#E0F6FF", 1)]
            } else {
                if (this.fps.hasSecondChanged()) {
                    this.blueSky.red -= 5
                    this.blueSky.green -= 3
                    this.blueSky.blue -= 1
                }
                this.skyColors = [this.blueSkyColor(0), color("#E0F6FF", 1)]
            }
        }

        if (this.fps.secondsSinceLastRestart() === 45) {
            this.background.updateState(new Sunset(this.background))
        }
    }

    blueSkyColor(ratio) {
        return {
            color: `rgb(${this.blueSky.red}, ${this.blueSky.green}, ${this.blueSky.blue})`,
            ratio
        }
    }
}

class Sunset {
    constructor(background) {
        this.background = background
        this.fps = new Fps(9)
        this.sunPositionY = 405
        this.skyColors = []
        this.lightPosition = 0
        this.blueSky = {
            red: 35,
            green: 146,
            blue: 215,
        }
    }

    draw(context) {
        let gradient = context.createLinearGradient(this.background.gameWidth - this.sunPositionY, this.background.gameHeight / 2, this.background.gameWidth, this.sunPositionY)
        this.skyColors.forEach((current) => {
            gradient.addColorStop(current.ratio, current.color)
        })
        return gradient
    }

    update(deltaTime) {
        this.fps.update(deltaTime)

        if (this.fps.hasFrameChanged()) {
            if (this.fps.secondsSinceLastRestart() < 6) {
                this.sunPositionY += 11
            }
        }

        if (this.fps.hasSecondChanged() || this.fps.frames === 0) {
            const color = (color, ratio) => {
                return {color, ratio}
            }
    
            if (this.fps.secondsSinceLastRestart() < 6) {
                this.skyColors = [this.blueSkyColor(0), color("#E0F6FF", 1)]
            } else if (this.fps.secondsSinceLastRestart() < 55) {
                this.skyColors = [this.blueSkyColor(this.lightPosition), color("#E0F6FF", 1)]
                this.sunPositionY -= 2
                this.blueSky.red -= 7
                this.blueSky.green -= 4
                this.blueSky.blue -= 3
                this.lightPosition += 0.019
            } else {
                this.background.updateState(new Night(this.background))
            }
        }
        // end state
        // {"fps": 9, "frameTimer": 33.13999999995576, "frameInterval": 111.11111111111111, "frames": 2152, "frameChanged": false, "secondChanged": false }
        // sunPositionY: 890
        // lightPosition: 0.7480000000000006
        // { "color": "rgb(-301, -46, 71)", "ratio": 0.9120000000000005 }
        // { color: "#E0F6FF", ratio: 1 }
    }

    blueSkyColor(ratio) {
        return {
            color: `rgb(${this.blueSky.red}, ${this.blueSky.green}, ${this.blueSky.blue})`,
            ratio
        }
    }
}

class Night {
    constructor(background) {
        this.background = background
        this.fps = new Fps(9)
        this.sunPositionY = 890
        this.skyColors = []
        this.lightPosition = 0.912
        this.blueSky = {
            red: 0,
            green: 0,
            blue: 71,
        }
    }

    draw(context) {
        let gradient = context.createLinearGradient(this.background.gameWidth - this.sunPositionY, this.background.gameHeight / 2, this.background.gameWidth, this.sunPositionY)
        this.skyColors.forEach((current) => {
            gradient.addColorStop(current.ratio, current.color)
        })
        return gradient
    }

    update(deltaTime) {
        this.fps.update(deltaTime)
        if (this.fps.hasSecondChanged() || this.fps.frames === 0) {   
            if (this.fps.secondsSinceLastRestart() < 16) {
                this.skyColors = [this.blueSkyColor(this.lightPosition), {color: "#E0F6FF", ratio: 1}]
                if (this.fps.secondsSinceLastRestart() % 2 === 0) {
                    this.sunPositionY -= 2
                    this.blueSky.blue -= 5
                }
            }
        }
    }

    blueSkyColor(ratio) {
        return {
            color: `rgb(${this.blueSky.red}, ${this.blueSky.green}, ${this.blueSky.blue})`,
            ratio
        }
    }
}

class SunRising {
    constructor(background) {
        this.background = background
        this.fps = new Fps(9)
        this.sunPositionY = 0
        this.skyColors = []
        this.blueSky = {
            red: 135,
            green: 206,
            blue: 235,
        }
    }

    draw(context) {
        let gradient = context.createLinearGradient(this.background.gameWidth, this.background.gameHeight + this.sunPositionY - 100, this.background.gameWidth, this.background.gameHeight)
        this.skyColors.forEach((current) => {
            gradient.addColorStop(current.ratio, current.color)
        })
        return gradient
    }

    update(deltaTime) {
        this.fps.update(deltaTime)

        const color = (color, ratio) => {
            return {color, ratio}
        }

        const inRange = (low, high) => {
            let seconds = this.fps.secondsSinceLastRestart()
            return seconds >= low && seconds < high
        }

        if (inRange(0, 20)) {
            console.log("state 1")
            this.skyColors = [this.blueSkyColor(0.15), color("#FFEB2F", 0.3), color("#FFD90E", 0.45), color("#F5BD1F", 0.6), color("#FF9E05", 0.75), color("#FD7654", 0.9), color("#FD5E52", 1)]
        } else if (inRange(20, 30) ){
            console.log("state 2")
            this.skyColors = [this.blueSkyColor(0.15), color("#FFEB2F", 0.3), color("#FFD90E", 0.45), color("#F5BD1F", 0.6), color("#FF9E05", 0.75), color("#FD7654", 0.9), color("#FFE373", 1)]
        }

        // } else if (inRange(15, 30)) {
        //     this.skyColors = [color("#87CEEB", 0.25), color("#FFEB2F", 0.35), color("#FFD90E", 0.5), color("#F5BD1F", 0.7), color("#FF9E05", 0.8), color("#FD7654", 0.95), color("#FD5E52", 1)]
        //     // this.skyColors = ["#87CEEB", "#FD5E53", "#FC9C54", "#FFE373"]
        // } else if (this.framesSinceLastStateChange === 18 * this.fps) {
        //     this.skyColors = ["#4B3D60", "#87CEEB", "#FD5E53", "#FC9C54", "#FFE373"]
        // } else if (this.framesSinceLastStateChange === 20 * this.fps) {
        //     this.skyColors = ["#152852", "#4B3D60", "#87CEEB", "#FD5E53", "#FC9C54", "#FFE373"]
        // } else if (this.framesSinceLastStateChange === 22 * this.fps) {
        //     this.skyColors = ["#08183A", "#152852", "#4B3D60", "#87CEEB", "#FD5E53", "#FC9C54", "#FFE373"]
        // } else if (this.framesSinceLastStateChange > 24 * this.fps) {
        //     this.skyColors = ["#08183A", "#152852", "#4B3D60", "#FD5E53", "#FC9C54", "#FFE373"]
        // }

        if (this.fps.hasSecondChanged()) {
            this.sunPositionY -= 1
            this.blueSky.red -= 20
            this.blueSky.green -= 10
            this.blueSky.blue -= 3
        }
    }

    blueSkyColor(ratio) {
        return {
            color: `rgb(${this.blueSky.red}, ${this.blueSky.green}, ${this.blueSky.blue})`,
            ratio
        }
    }
}