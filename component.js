
import { Factory } from "./factory.js"
import { ProgressBar } from "./progress_bar.js"

export class Component {

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

        const factory = new Factory()

        this.inputElement = factory.createInputSlider(this.title, this.marks_available)
        this.inputElement.addEventListener("input", (e) => this.updateUserScore(e.target.value))

        this.labelElement = document.createElement("label")
        this.labelElement.for = this.title

        this.pairbox = factory.makeDivWithClasses(["component-form"])
        this.pairbox.appendChild(this.labelElement)
        this.pairbox.appendChild(this.inputElement)

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
