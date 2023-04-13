import { Background } from "./backgroud.js"

window.addEventListener("load", function() {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    canvas.width = 1200
    canvas.height = 720

    class InputHandler {
        constructor() {
            this.keys = new Set()
            window.addEventListener("keydown", e => {
                if (e.key == "ArrowDown" || e.key == "ArrowUp") {
                    this.keys.add(e.key)
                }
            })
            window.addEventListener("keyup", e => {
                if (e.key == "ArrowDown" || e.key == "ArrowUp") {
                    this.keys.delete(e.key)
                }
            })
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = document.getElementById("player")
            this.width = 200
            this.height = 164
            this.x = 80
            this.y = this.gameHeight - this.height
            this.frame = 0
            this.maxFrames = 5
            this.speed = 3
            this.frameTimer = 0
            this.frameInterval = 1000 / 9
        }

        draw(context) {
            context.drawImage(this.image, this.frame * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
        }

        update(keysPressed, deltaTime) {
            // animation
            if (this.frameTimer > this.frameInterval) {
                if (this.frame < this.maxFrames)    this.frame++
                else                                this.frame = 0    
                
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }

            // x
            // this.x += this.speed

            // y
            if (keysPressed.has("ArrowUp")) {
                this.y -= this.speed
            } else if (keysPressed.has("ArrowDown")) {
                this.y += this.speed + 1
            }
            if (this.y < 0)                     this.y = 0
            else if (this.y + this.height > this.gameHeight)  this.y = this.gameHeight - this.height
        }
    }

    class Cloud {
        constructor(gameWidth, gameHeight, x, y) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = document.getElementById("cloud")
            this.width = 200
            this.height = 92
            this.x = x
            this.y = y
            this.speed = 3
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y)
        }

        update() {
            this.x -= this.speed
            if (this.x < -this.width) {
                this.x = getRandomInt(this.gameWidth, this.gameWidth + 200)
                this.y = getRandomInt(this.height, this.gameHeight - 300)
            }
        }
    }

    class Obstacle {
        constructor(id, width, height, x, y, gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = document.getElementById(id)
            this.width = width
            this.height = height
            this.x = x
            this.y = y
            this.speed = 3
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y)
        }

        update() {
            this.x -= this.speed
            if (this.x < -this.width) {
                // this.x = this.gameWidth
                this.x = getRandomInt(this.gameWidth, 2 * this.gameWidth)
                // this.y = getRandomInt(this.height, this.gameHeight)
                // this.y = canvas.height - 200
            }
        }
    }


    const inputHandler = new InputHandler()
    const background  = new Background(canvas.width, canvas.height)
    const player = new Player(canvas.width, canvas.height)
    const cloud1 = new Cloud(canvas.width, canvas.height, canvas.width + 50, 200)
    const cloud2 = new Cloud(canvas.width, canvas.height, canvas.width + 200, 400)
    const pine = new Obstacle("pine", 250, 320, canvas.width + 200, canvas.height - 200, canvas.width, canvas.height)
    const tree = new Obstacle("tree", 240, 483, canvas.width + 600, canvas.height - 200, canvas.width, canvas.height)
    let lastTime = 0

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        background.draw(ctx)
        background.update(deltaTime)

        cloud1.draw(ctx)
        cloud1.update()

        cloud2.draw(ctx)
        cloud2.update()

        pine.draw(ctx)
        pine.update()

        tree.draw(ctx)
        tree.update()

        player.draw(ctx)
        player.update(inputHandler.keys, deltaTime)

        requestAnimationFrame(animate)
    }
    
    animate(0)


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

});