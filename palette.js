
export class Palette {

    constructor() {

        this.red = 255
        this.green = 0
        this.blue = 64
        this.stage = 0

    }

    matchPercentage(x) {

        const maximum = 255 + 255
        this.stage = Math.ceil(x / 100 * maximum)
        this.updateRedValue()
        this.updateGreenValue()
    }

    updateRedValue() {

        const progress = Math.max(this.stage - 255, 0)
        this.red = 255 - progress
    }

    updateGreenValue() {

        const progress = Math.min(this.stage, 255)
        this.green = progress
    }
}