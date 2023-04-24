import { Fps } from './fps.js';

export class Background {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        // this.state = new Day(this)
        // this.state = new Night(this)
        this.state = new SunRising(this)
    }

    draw(context) {
        this.state.draw(context)
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
        context.fillStyle = gradient
        context.fillRect(0,  0, this.background.gameWidth, this.background.gameHeight)
        // return gradient
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
        context.fillStyle = gradient
        context.fillRect(0,  0, this.background.gameWidth, this.background.gameHeight)
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
        context.fillStyle = gradient
        context.fillRect(0,  0, this.background.gameWidth, this.background.gameHeight)
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
        context.fillStyle = gradient
        context.fillRect(0,  0, this.background.gameWidth, this.background.gameHeight)
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
            } else {
                this.background.updateState(new NightStars(this.background))
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

class NightStars {
    constructor(background) {
        this.background = background
        this.fps = new Fps(9)
        this.image = document.getElementById("stars")
        this.alpha = 0.0
        this.x = 0
    }

    draw(context) {
        context.globalAlpha = this.alpha
        context.drawImage(this.image, this.x, 0, this.background.gameWidth, this.background.gameHeight, 0, 0, 1334, 721)

        // reset alpha to other layers
        context.globalAlpha = 1
    }

    update(deltaTime) {
        this.fps.update(deltaTime)
        if (this.fps.hasFrameChanged() && this.fps.framesSinceLastRestart() % 7 == 0) {
            this.x += 1
        }
        
        if (this.fps.hasSecondChanged()) {
            console.log(this.fps.secondsSinceLastRestart(), this.alpha)
            if (this.fps.secondsSinceLastRestart() <= 15) {
                this.alpha += 0.07
            } else if (this.fps.secondsInRange(30, 50)) {
                this.alpha -= 0.05
            } else if (this.fps.secondsSinceLastRestart() === 50) {
                this.background.updateState(new SunRising(this.background))
            }
        }
    }
}

class SunRising {
    constructor(background) {
        this.background = background
        this.fps = new Fps(9)
        this.sunPositionY = 0
        this.skyColors = []
        this.lightPosition = 0
        this.blueSky = {
            red: 0,
            green: 0,
            blue: 0,
        }
        // end state
        // red: 135,
        // green: 206,
        // blue: 235,
    }

    draw(context) {
        // console.log(this)
        let gradient = context.createLinearGradient(0, this.background.gameHeight + this.sunPositionY, this.background.gameWidth, 0)
        this.skyColors.forEach((current) => {
            gradient.addColorStop(current.ratio, current.color)
        })
        context.fillStyle = gradient
        context.fillRect(0,  0, this.background.gameWidth, this.background.gameHeight)
    }

    update(deltaTime) {
        this.fps.update(deltaTime)
        if (this.fps.hasSecondChanged() || this.fps.frames === 0) {
            console.log(this.fps.secondsSinceLastRestart())
            if (this.fps.secondsSinceLastRestart() < 20) {
                this.skyColors = [this.blueSkyColor(0)]
                this.blueSky.red += 1
                this.blueSky.green += 3
                this.blueSky.blue += 5
            } else if (this.fps.secondsSinceLastRestart() < 60) {
                this.skyColors = [{color: "#E0F6FF", ratio: 0}, this.blueSkyColor(this.lightPosition)]
                this.sunPositionY -= 2
                this.blueSky.red += 1
                this.blueSky.green += 3
                this.blueSky.blue += 7
                this.lightPosition += 0.019
            } else {
                this.background.updateState(new Day(this.background))
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