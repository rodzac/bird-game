export class Fps {

    constructor(fps) {
        this.fps = fps
        this.frameTimer = 0
        this.frameInterval = 1000 / this.fps
        this.frames = 0
        this.frameChanged = false
    }

    update(deltaTime) {
        this.frameTimer += deltaTime
    
        if (this.frameTimer > this.frameInterval) {
            this.frames++
            this.frameTimer = 0
            this.frameChanged = true
        } else {
            this.frameChanged = false
        }
    }

    hasFrameChanged() {
        return this.frameChanged
    }

    hasSecondChanged() {
        return this.frames % this.fps === 0
    }

    framesSinceLastRestart() {
        return this.frames
    }

    secondsSinceLastRestart() {
        return  Math.trunc(this.frames / this.fps)
    }

    restart() {
        this.frames = 0
    }

}