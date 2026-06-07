
import { ProgressBar } from "./progress_bar.js"

export class UniversityModuleSubcomponent {

    constructor(parent, title, weight, marks) {

        this.parent = parent
        this.title = title
        this.weight = weight
        this.marks_available = marks
        this.user_score = 0
        this.progressBar = new ProgressBar(this, this.weight)

        this.buildElements()
        this.updateUserScore(0)
    }

    buildElements() {

        this.inputElement = this.createInputSlider(this.title, this.marks_available)
        this.inputElement.addEventListener("input", (e) => this.updateUserScore(e.target.value))

        this.labelElement = document.createElement("label")
        this.labelElement.for = this.title

        this.pairbox = document.createElement("div")
        this.pairbox.classList.add("component-form")

        this.pairbox.appendChild(this.labelElement)
        this.pairbox.appendChild(this.inputElement)
    }

    createInputSlider(title, max_value) {

        const slider = document.createElement("input")
        slider.id = title
        slider.type = "range"
        slider.min = 0
        slider.value = 0
        slider.max = max_value

        return slider
    }

    getPercentageScore() {

        return 100 * this.user_score / this.marks_available
    }

    updateUserScore(x) {

        this.user_score = x
        this.updateLabelText()
        this.progressBar.refresh()
        this.parent.recalculateAttainment()
    }

    updateLabelText() {

        this.labelElement.innerText = `${this.title}: ${this.user_score}/${this.marks_available}`
    }
}
