
import { Component } from "./component.js"


export class Module {

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

        const component = new Component(this, title, weight, marks)
        this.components.push(component)
        this.addBarBox(component)
    }
}



