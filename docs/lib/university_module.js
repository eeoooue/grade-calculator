
import { UniversityModuleSubcomponent } from "./university_module_subcomponent.js"

export class UniversityModule {

    constructor(title) {

        this.title = title
        this.curweight = 0
        this.components = []
        this.attainment = 0

        this.moduleContainer = null
        this.moduleGrade = null
        this.userForm = null
        this.graph = null

        this.buildElements()
    }

    addTextbox(message) {

        const textbox = this.makeDivWithClasses(["component-form", "blurb-box"])
        textbox.innerHTML = message
        this.userForm.appendChild(textbox)
    }

    buildElements() {

        this.moduleContainer = this.makeDivWithClasses(["module-container"])

        // title card
        const titleCard = this.makeDivWithClasses(["titlecard"])
        this.moduleContainer.appendChild(titleCard)

        const moduleName = this.makeDivWithClasses(["title-ele", "module-name"])
        moduleName.innerHTML = `<h2>${this.title}</h2>`
        titleCard.appendChild(moduleName)

        this.moduleGrade = this.makeDivWithClasses(["title-ele", "module-grade"])
        this.moduleGrade.innerHTML = `<h2>0%</h2>`
        titleCard.appendChild(this.moduleGrade)

        // assessment scores & visualization
        const contentBox = this.makeDivWithClasses(["content-box"])
        this.moduleContainer.appendChild(contentBox)

        this.userForm = this.makeDivWithClasses(["user-form"])
        contentBox.appendChild(this.userForm)

        this.graph = this.makeDivWithClasses(["grade-graph"])
        contentBox.appendChild(this.graph)
    }

    recalculateAttainment() {

        this.attainment = 0
        for (const component of this.components) {
            this.attainment += (component.getPercentageScore() / 100) * component.weight
        }

        this.moduleGrade.innerHTML = `<h2>${Math.floor(this.attainment)}%</h2>`
    }

    addSubcomponent(title, weight, marks) {

        this.curweight += weight

        const component = new UniversityModuleSubcomponent(this, title, weight, marks)
        this.components.push(component)
        this.graph.appendChild(component.progressBar.container)
        this.userForm.appendChild(component.pairbox)
    }

    makeDivWithClasses(classes) {

        const div = document.createElement("div")
        for (const className of classes) {
            div.classList.add(className)
        }
        return div
    }
}
