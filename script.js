

class Palette {

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



class Module {

    constructor(title) {

        this.title = title
        this.curweight = 0
        this.components = []
        this.attainment = 0

        this.buildGraphBox()
    }

    buildAll() {

        this.buildModuleCard()
    }

    buildModuleCard() {

        this.moduleContainer = document.createElement("div")
        this.moduleContainer.classList.add("module-container")

        this.titleCard = document.createElement("div")
        this.titleCard.classList.add("titlecard")
        this.moduleContainer.appendChild(this.titleCard)

        this.moduleName = document.createElement("div")
        this.moduleName.classList.add("title-ele")
        this.moduleName.classList.add("module-name")
        this.moduleName.innerHTML = `<h2>${this.title}</h2>`
        this.titleCard.appendChild(this.moduleName)

        this.moduleGrade = document.createElement("div")
        this.moduleGrade.classList.add("module-grade")
        this.moduleGrade.classList.add("title-ele")
        this.moduleGrade.innerHTML = `<h2>0%</h2>`
        this.titleCard.appendChild(this.moduleGrade)

        this.contentBox = document.createElement("div")
        this.contentBox.classList.add("content-box")
        this.moduleContainer.appendChild(this.contentBox)

        this.userForm = document.createElement("div")
        this.userForm.classList.add("user-form")
        this.contentBox.appendChild(this.userForm)

        this.buildGraph()
    }


    buildGraph() {

        this.contentBox.appendChild(this.graph)

        for (const component of this.components) {

            const pairbox = component.pairbox
            this.userForm.appendChild(pairbox)
        }
    }

    buildGraphBox() {

        this.graph = document.createElement("div")
        this.graph.classList.add("grade-graph")
    }

    addBarBox(component) {

        this.graph.appendChild(component.barBox)
    }

    recalculateAttainment() {

        this.attainment = 0
        for (const component of this.components) {
            const percentage = component.getPercentageScore()
            const weight = component.getPercentageWeight()
            this.attainment += (percentage * weight) / 100
        }

        this.moduleGrade.innerHTML = `<h2>${Math.ceil(this.attainment)}%</h2>`
    }

    addComponent(title, weight, marks) {

        this.curweight += weight

        const component = new Component(title, weight, marks)
        this.components.push(component)
        this.addBarBox(component)
    }
}


class Component {

    constructor(title, weight, marks) {

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

        for (const module of AllModules) {
            module.recalculateAttainment()
        }
    }

    getPercentageWeight() {
        return this.weight
    }

    getPercentageScore() {
        return 100 * this.user_score / this.marks_available
    }
}

const courseContainer = document.querySelector(".course-container")
const AllModules = new Set()

const DSAModule = new Module("Algorithms and Data Structures")
DSAModule.addComponent("Coursework", 60, 100)
DSAModule.addComponent("Exam", 40, 50)
DSAModule.buildAll()
AllModules.add(DSAModule)

courseContainer.appendChild(DSAModule.moduleContainer)


const PPF = new Module("Programming Portfolio")
PPF.addComponent("Lab Book", 50, 50)
PPF.addComponent("Practical Exam", 25, 7)
PPF.addComponent("Capstone Project", 25, 50)
PPF.buildAll()
AllModules.add(PPF)

courseContainer.appendChild(PPF.moduleContainer)


const CT = new Module("Computational Thinking")
CT.addComponent("Assessment A", 15, 15)
CT.addComponent("Assessment B", 20, 20)
CT.addComponent("Assessment C", 15, 15)
CT.addComponent("Assessment D", 20, 20)
CT.addComponent("Assessment E", 20, 20)
CT.addComponent("Assessment F", 10, 10)

CT.buildAll()
AllModules.add(CT)

courseContainer.appendChild(CT.moduleContainer)

