
class Module {

    constructor(title){

        this.title = title
        this.curweight = 0
        this.components = []
        this.attainment = 0

        this.graph = this.buildGraphBox()
    }

    buildGraphBox(){

        const graphbox = document.createElement("div")
        graphbox.classList.add("grade-graph")

        return graphbox
    }

    addBarBox(component){

        this.graph.appendChild(component.barBox)
    }


    updateAttainment(){

        const attainmentLabel = document.querySelector(".module-grade")
        attainmentLabel.innerHTML = `<h2>${Math.ceil(this.attainment)}%</h2>`
    }

    recalculateAttainment(){

        this.attainment = 0
        for(const component of this.components){
            const percentage = component.getPercentageScore()
            const weight = component.getPercentageWeight()
            this.attainment += (percentage * weight) / 100
        }

        console.log(`your attainment is ${this.attainment}%`)
        this.updateAttainment()
    }

    addComponent(title, weight, marks){

        this.curweight += weight

        const component = new Component(title, weight, marks)
        this.components.push(component)
        this.addBarBox(component)
    }

    updateComponent(title, mark){

        for(const component of this.components){
            if(component.title == title){
                component.updateUserScore(mark)
            }
        }

        this.recalculateAttainment()
    }
}

class Component {

    constructor(title, weight, marks){

        this.title = title
        this.weight = weight
        this.marks_available = marks
        this.user_score = 0

        this.buildElements()
    }

    buildElements(){

        this.buildInput()
        this.buildLabel()

        this.pairbox = document.createElement("div")
        this.pairbox.appendChild(this.inputElement)
        this.pairbox.appendChild(this.labelElement)

        this.buildBarBox()
    }

    buildBarBox(){

        this.barBox = document.createElement("div")
        this.barBox.classList.add("grade-bar")
        this.barBox.style.width = `${this.weight}%`

        this.bar = document.createElement("div")
        this.bar.classList.add("bar-progress")
        this.bar.style.height =  `${this.getPercentageScore()}%`
        this.barBox.appendChild(this.bar)
    }


    buildInput(){

        this.inputElement = document.createElement("input")
        this.inputElement.id = this.title
        this.inputElement.type = "range"
        this.inputElement.min = "0"
        this.inputElement.max = `${this.marks_available}`
        this.inputElement.addEventListener("input", (e) => this.updateUserScore(e.target.value))
    }

    buildLabel(){

        this.labelElement = document.createElement("label")
        this.labelElement.for = this.title
        this.updateLabelText()
    }

    updateBarProgress(){

        this.bar.style.height =  `${this.getPercentageScore()}%`

    }


    updateLabelText(){

        this.labelElement.innerText = `${this.title} mark: ${this.user_score}/${this.marks_available}`
    }

    updateUserScore(x){
        this.user_score = x
        this.updateLabelText()
        this.updateBarProgress()

        DSAModule.recalculateAttainment()
    }

    getPercentageWeight(){
        return this.weight
    }

    getPercentageScore(){
        return 100 * this.user_score / this.marks_available
    }

}


const DSAModule = new Module("Algorithms and Data Structures")
DSAModule.addComponent("Coursework", 60, 100)
DSAModule.addComponent("Exam", 40, 50)


buildGraph(DSAModule)


function buildGraph(module){



    const contentBox = document.querySelector(".content-box")

    contentBox.appendChild(module.graph)

    const formarea = document.querySelector(".user-form")

    for(const component of module.components){

        const pairbox = component.pairbox
        formarea.appendChild(pairbox)

    }

}



function updateLabel(e) {

    const max = +e.target.max
    const min = +e.target.min

    const value = +e.target.value
    const label = e.target.nextElementSibling

    label.innerHTML = `mark: ${value}/${max}`
}

