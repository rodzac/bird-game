import { Fps } from './fps.js';

export class Background {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.state = new Day(this)
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

        const inRange = (low, high) => {
            let seconds = this.fps.secondsSinceLastRestart()
            return seconds >= low && seconds < high
        }

        if (this.fps.hasFrameChanged()) {
            this.sunPositionY += this.sunsetSpeed
            this.skyColors = [color("#87CEEB", 0), color("#E0F6FF", 1)]
        }

        if (this.fps.secondsSinceLastRestart() === 40) {
            this.background.updateState(new Sunset(this.background))
        }
    }
}

class Sunset {
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
            // this.skyColors = [color("#87CEEB", 0.33), color("#FFEB2F", 0.66), color("#FD5E52", 1)]
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