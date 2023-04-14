export class Fps {

    constructor(fps) {
        this.fps = fps
        this.frameTimer = 0
        this.frameInterval = 1000 / this.fps
        this.frames = 0
        this.seconds = 0
        this.frameChanged = false
        this.secondChanged = false
    }

    update(deltaTime) {
        this.frameTimer += deltaTime
        this.frameChanged = false
        this.secondChanged = false

        if (this.frameTimer > this.frameInterval) {
            this.frames++
            this.frameTimer = 0
            this.frameChanged = true
            if (this.frames % this.fps === 0) {
                this.secondChanged = true
                this.seconds++
            }
        }
    }

    hasFrameChanged() {
        return this.frameChanged
    }

    hasSecondChanged() {
        return this.secondChanged
    }

    framesSinceLastRestart() {
        return this.frames
    }

    secondsSinceLastRestart() {
        return  this.seconds
    }

    restart() {
        this.frames = 0
        this.seconds = 0
    }

}