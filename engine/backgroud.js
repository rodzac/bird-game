export class Background {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.sunPositionY = 0
        this.sunPositionX = this.gameWidth / 2
        this.sunsetSpeed = 5;
        this.frameTimer = 0
        this.fps = 9
        this.frameInterval = 1000 / this.fps
        // this.state = 'day'      // day, sunset, night, sunrising
        this.state = new Sunset(this)
        this.framesSinceLastStateChange = 0
        this.skyColors = []
    }

    draw(context) {
        // let gradient = null
        // if (this.state === "day") {
        //     gradient = context.createLinearGradient(this.gameWidth - this.sunPositionY, this.gameHeight / 2, this.gameWidth, this.sunPositionY)
        //     console.log(`(${this.gameWidth - this.sunPositionY}, ${this.gameHeight / 2}), (${this.gameWidth}, ${this.sunPositionY})`)
        //     gradient.addColorStop(0, "#87CEEB")
        //     gradient.addColorStop(1, "#E0F6FF")
        // } else if (this.state === "sunset") {


        //     // gradient = context.createLinearGradient(this.gameWidth / 2, this.gameHeight + this.sunPositionY -100, this.gameWidth / 2, this.gameHeight)
        //     // // let colorRatio = 1 / this.skyColors.length
        //     // this.skyColors.forEach((current) => {
        //     //     // gradient.addColorStop(colorRatio + (i * colorRatio), color)
        //     //     console.log(current)
        //     //     gradient.addColorStop(current.ratio, current.color)
        //     // })
            
        //     // } else if (this.state === "night") {
        // //     gradient.addColorStop(0, "#87CEEB")
        // //     gradient.addColorStop(1, "#E0F6FF")
        // // } else if (this.state === "sunrising") {
        // //     gradient.addColorStop(0, "#87CEEB")
        // //     gradient.addColorStop(1, "#E0F6FF")
        // }

        context.fillStyle = this.state.draw(context)
        context.fillRect(0,  0, this.gameWidth, this.gameHeight)
    }

    update(deltaTime) {           
        // if (this.frameTimer > this.frameInterval) {
        //     if (this.state === "day") {
        //         this.sunPositionY += this.sunsetSpeed
        //     } else if (this.state === "sunset") {
        //         // if (this.framesSinceLastStateChange < 15 *this.fps) this.sunPositionY -= 1
        //         // else                                                this.sunPositionY += 1
        //         this.sunPositionY -= 1
        //     }

        //     // if (this.state === "sunset") {
        //     //     this.sunPositionX -= 5
        //     // }

        //     this.frameTimer = 0
        //     this.framesSinceLastStateChange++
        //     // console.log(this.state, this.sunPosition, this.framesSinceLastStateChange)
        // } else {
        //     this.frameTimer += deltaTime
        // }

        // let previousState = this.state
        // if (this.state === "day" && this.framesSinceLastStateChange === 100) {
        //     this.state = "sunset"
        // } else if (this.state === "sunset" && this.framesSinceLastStateChange === 30 * this.fps) {
        //     this.state = "night"
        // } else if (this.state === "night" && this.framesSinceLastStateChange === 100) {
        //     this.state = "sunrising"
        // } else if (this.state === "sunrising" && this.framesSinceLastStateChange === 20 * this.fps) {
        //     this.state = "day"
        // }

        // if (previousState !== this.state) {
        //     this.framesSinceLastStateChange = 0
        // }

       
        // if (this.state === "sunset") {
            this.state.update(deltaTime)
            // if (this.framesSinceLastStateChange < 4 * this.fps)            this.skyColors = ["#87CEEB", "#E0F6FF", "#FFEB2F"]
            // else if (this.framesSinceLastStateChange === 6 * this.fps)     this.skyColors = ["#87CEEB", "#E0F6FF", "#FFEB2F", " #FFD90E"]
            // else if (this.framesSinceLastStateChange === 8 * this.fps)     this.skyColors = ["#87CEEB", "#E0F6FF", "#FFEB2F", " #FFD90E", "#F5BD1F"]
            // else if (this.framesSinceLastStateChange === 10 * this.fps)     this.skyColors = ["#87CEEB", "#E0F6FF", "#FFEB2F", " #FFD90E", "#F5BD1F", "#FF9E05"]
            // else if (this.framesSinceLastStateChange === 12 * this.fps)    this.skyColors = ["#87CEEB", "#E0F6FF", "#FFEB2F", " #FFD90E", "#F5BD1F", "#FF9E05", "#FD7654"]
            // else if (this.framesSinceLastStateChange === 14 * this.fps)    this.skyColors = ["#87CEEB", "#E0F6FF", "#FFEB2F", " #FFD90E", "#F5BD1F", "#FF9E05", "#FD7654", "#FD5E52"]
            // else if (this.framesSinceLastStateChange === 16 * this.fps)    this.skyColors = ["#E0F6FF", "#FFEB2F", " #FFD90E", "#F5BD1F", "#FF9E05", "#FD7654", "#FD5E52"]
            // else if (this.framesSinceLastStateChange === 18 * this.fps)    this.skyColors = ["#FFEB2F", " #FFD90E", "#F5BD1F", "#FF9E05", "#FD7654", "#FD5E52"]
            
        // }
    }
}

class Sunset {
    constructor(background) {
        this.background = background;
        this.sunPositionY = 0
        // this.sunPositionX = this.gameWidth / 2
        this.sunsetSpeed = 5;
        this.frameTimer = 0
        this.fps = 9
        this.frameInterval = 1000 / this.fps
        // this.state = 'day'      // day, sunset, night, sunrising
        this.state = "sunset"
        this.framesSinceLastStateChange = 0
        this.skyColors = []
        this.blueSky = {
            red: 135,
            green: 206,
            blue: 235,
        }
    }

    draw(context) {
        // console.log(`width b: ${this.background.gameWidth}, e: ${this.background.gameWidth}`)
        // console.log(`height b: ${this.background.gameHeight + this.sunPositionY - 100}, e: ${this.background.gameHeight}`)
        let gradient = context.createLinearGradient(this.background.gameWidth, this.background.gameHeight + this.sunPositionY - 100, this.background.gameWidth, this.background.gameHeight)
        // let colorRatio = 1 / this.skyColors.length
        this.skyColors.forEach((current) => {
            gradient.addColorStop(current.ratio, current.color)
        })

        return gradient
    }

    update(deltaTime) {
        const color = (color, ratio) => {
            return {color, ratio}
        }

        const inRange = (low, high) => {
            return this.framesSinceLastStateChange >= (low * this.fps) && this.framesSinceLastStateChange < (high * this.fps)
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

        this.frameTimer += deltaTime
        if (this.frameTimer > this.frameInterval) {
            this.framesSinceLastStateChange++
            this.frameTimer = 0
        }

        if (this.framesSinceLastStateChange % 9 === 0) {
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