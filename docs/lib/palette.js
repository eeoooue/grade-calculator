
export class Palette {

    constructor() {

        this.red = 255
        this.green = 0
        this.blue = 64
    }

    matchPercentage(x) {

        const stage = Math.ceil(x / 100 * 512)
        this.updateRedValue(stage)
        this.updateGreenValue(stage)
    }

    updateRedValue(stage) {

        const progress = Math.max(stage - 255, 0)
        this.red = 255 - progress
    }

    updateGreenValue(stage) {

        const progress = Math.min(stage, 255)
        this.green = progress
    }
}