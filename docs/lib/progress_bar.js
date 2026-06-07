
import { Palette } from "./palette.js"

export class ProgressBar {

    constructor(parent, weight) {

        this.parent = parent
        this.container = this.createWeightedGradeBar(weight)
        this.progress_bar = this.createProgressBar()
        this.container.appendChild(this.progress_bar)

        this.refresh()
    }

    createWeightedGradeBar(weight) {

        let element = document.createElement("div")
        element = document.createElement("div")
        element.classList.add("grade-bar")
        element.style.width = `${weight}%`
        return element
    }

    createProgressBar() {

        let element = document.createElement("div")
        element.classList.add("bar-progress")
        return element
    }

    refresh() {
        const percentage = this.parent.getPercentageScore()
        this.updateBarHeight(percentage)
        this.updateBarColour(percentage)
    }

    updateBarHeight(percentage) {
        this.progress_bar.style.height = `${percentage}%`
    }

    updateBarColour(percentage) {
        const palette = new Palette()
        palette.matchPercentage(percentage)
        this.progress_bar.style.backgroundColor = `rgb(${palette.red}, ${palette.green}, ${palette.blue})`
    }
}