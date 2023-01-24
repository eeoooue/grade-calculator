
import { Palette } from "./palette.js"

export class Component {

    constructor(parent, title, weight, marks) {

        this.parent = parent
        this.title = title
        this.weight = weight
        this.marks_available = marks
        this.user_score = 0
        this.barColour = new Palette()

        this.buildElements()
    }

    buildElements() {

        this.buildInput()
        this.buildLabel()

        this.pairbox = document.createElement("div")
        this.pairbox.appendChild(this.inputElement)
        this.pairbox.appendChild(this.labelElement)

        this.buildBarBox()
    }

    buildInput() {

        this.inputElement = document.createElement("input")
        this.inputElement.id = this.title
        this.inputElement.type = "range"
        this.inputElement.min = "0"
        this.inputElement.value = "0"
        this.inputElement.max = `${this.marks_available}`
        this.inputElement.addEventListener("input", (e) => this.updateUserScore(e.target.value))
    }

    buildLabel() {

        this.labelElement = document.createElement("label")
        this.labelElement.for = this.title
        this.updateLabelText()
    }

    buildBarBox() {

        this.barBox = document.createElement("div")
        this.barBox.classList.add("grade-bar")
        this.barBox.style.width = `${this.weight}%`

        this.bar = document.createElement("div")
        this.bar.classList.add("bar-progress")
        this.bar.style.height = `${this.getPercentageScore()}%`
        this.barBox.appendChild(this.bar)
    }

    updateBarColour() {

        const percentile = this.getPercentageScore()
        this.barColour.matchPercentage(percentile)
        this.bar.style.backgroundColor = `rgb(${this.barColour.red}, ${this.barColour.green}, ${this.barColour.blue})`
    }

    updateBarProgress() {

        this.bar.style.height = `${this.getPercentageScore()}%`
    }

    updateLabelText() {

        this.labelElement.innerText = `${this.title} mark: ${this.user_score}/${this.marks_available}`
    }

    updateUserScore(x) {

        this.user_score = x
        this.updateLabelText()
        this.updateBarProgress()
        this.updateBarColour()

        this.parent.recalculateAttainment()
    }

    getPercentageWeight() {
        return this.weight
    }

    getPercentageScore() {
        return 100 * this.user_score / this.marks_available
    }
}
