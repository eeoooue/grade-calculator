
import { Factory } from "./factory.js"
import { Palette } from "./palette.js"

export class ProgressBar {

    constructor(parent, weight){

        this.parent = parent
        this.palette = new Palette()

        const factory = new Factory()
        this.container = factory.makeDivWithClasses(["grade-bar"])
        this.container.style.width = `${weight}%`

        this.bar = factory.makeDivWithClasses(["bar-progress"])
        this.container.appendChild(this.bar)

        this.refresh()
    }

    refresh() {

        const percentage = this.parent.getPercentageScore()

        this.palette.matchPercentage(percentage)
        this.bar.style.height = `${percentage}%`
        this.bar.style.backgroundColor = `rgb(${this.palette.red}, ${this.palette.green}, ${this.palette.blue})`
    }
}