

import { Module } from "./module.js"

const courseContainer = document.querySelector(".course-container")

const DSAModule = new Module("Algorithms and Data Structures")
DSAModule.addComponent("Coursework", 60, 100)
DSAModule.addComponent("Exam", 40, 50)
courseContainer.appendChild(DSAModule.moduleContainer)


const PPF = new Module("Programming Portfolio")
PPF.addComponent("Lab Book", 50, 50)
PPF.addComponent("Practical Exam", 25, 7)
PPF.addComponent("Capstone Project", 25, 50)
courseContainer.appendChild(PPF.moduleContainer)


const CT = new Module("Computational Thinking")
CT.addComponent("Assessment A", 15, 15)
CT.addComponent("Assessment B", 20, 20)
CT.addComponent("Assessment C", 15, 15)
CT.addComponent("Assessment D", 20, 20)
CT.addComponent("Assessment E", 20, 20)
CT.addComponent("Assessment F", 10, 10)
courseContainer.appendChild(CT.moduleContainer)

