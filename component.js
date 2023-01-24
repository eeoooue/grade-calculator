
import { Palette } from "./palette.js"
import { Factory } from "./factory.js"

export class Component {

    constructor(parent, title, weight, marks) {

        this.parent = parent
        this.title = title
        this.weight = weight
        this.marks_available = marks
        this.user_score = 0
        this.barColour = new Palette()
        this.factory = new Factory()

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

        this.inputElement = this.factory.createInputSlider(this.title, this.marks_available)
        this.inputElement.addEventListener("input", (e) => this.updateUserScore(e.target.value))
    }

    buildLabel() {

        this.labelElement = document.createElement("label")
        this.labelElement.for = this.title
        this.updateLabelText()
    }

    buildBarBox() {

        this.barBox = this.factory.makeDivWithClasses(["grade-bar"])
        this.barBox.style.width = `${this.weight}%`

        this.bar = this.factory.makeDivWithClasses(["bar-progress"])
        this.bar.style.height = `${this.getPercentageScore()}%`
        this.barBox.appendChild(this.bar)
    }

    getPercentageScore() {
        return 100 * this.user_score / this.marks_available
    }

    updateUserScore(x) {

        this.user_score = x
        this.updateLabelText()
        this.updateBarProgress()
        this.updateBarColour()

        this.parent.recalculateAttainment()
    }

    updateLabelText() {

        this.labelElement.innerText = `${this.title} mark: ${this.user_score}/${this.marks_available}`
    }

    updateBarProgress() {

        this.bar.style.height = `${this.getPercentageScore()}%`
    }

    updateBarColour() {

        const percentile = this.getPercentageScore()
        this.barColour.matchPercentage(percentile)
        this.bar.style.backgroundColor = `rgb(${this.barColour.red}, ${this.barColour.green}, ${this.barColour.blue})`
    }
    
}
