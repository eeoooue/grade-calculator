
import { Component } from "./component.js"
import { Factory } from "./factory.js"

export class Module {

    constructor(title) {

        this.title = title
        this.curweight = 0
        this.components = []
        this.attainment = 0
        this.Factory = new Factory()

        this.buildElements()
    }

    addTextbox(message) {

        const textbox = this.Factory.makeDivWithClasses(["component-form", "blurb-box"])
        textbox.innerHTML = message
        this.userForm.appendChild(textbox)
    }

    buildElements() {

        this.graph = this.Factory.makeDivWithClasses(["grade-graph"])

        this.moduleContainer = this.Factory.makeDivWithClasses(["module-container"])

        this.titleCard = this.Factory.makeDivWithClasses(["titlecard"])
        this.moduleContainer.appendChild(this.titleCard)

        this.moduleName = this.Factory.makeDivWithClasses(["title-ele", "module-name"])
        this.moduleName.innerHTML = `<h2>${this.title}</h2>`
        this.titleCard.appendChild(this.moduleName)

        this.moduleGrade = this.Factory.makeDivWithClasses(["title-ele", "module-grade"])
        this.moduleGrade.innerHTML = `<h2>0%</h2>`
        this.titleCard.appendChild(this.moduleGrade)

        this.contentBox = this.Factory.makeDivWithClasses(["content-box"])
        this.moduleContainer.appendChild(this.contentBox)

        this.userForm = this.Factory.makeDivWithClasses(["user-form"])
        this.contentBox.appendChild(this.userForm)

        this.contentBox.appendChild(this.graph)
    }

    recalculateAttainment() {

        this.attainment = 0
        for (const component of this.components) {
            this.attainment += (component.getPercentageScore() / 100) * component.weight
        }

        this.moduleGrade.innerHTML = `<h2>${Math.floor(this.attainment)}%</h2>`
    }

    addComponent(title, weight, marks) {

        this.curweight += weight

        const component = new Component(this, title, weight, marks)
        this.components.push(component)
        this.graph.appendChild(component.progressBar.container)
        this.userForm.appendChild(component.pairbox)
    }
}
