
import { Module } from "./module.js"

const courseSelector = document.getElementById("course-selector")
courseSelector.addEventListener("input", (e) => SwapToModule(e.target.value))

SwapToModule("441105")

function SwapToModule(module_id){    

    console.log("hello")

    const courseContainer = document.querySelector(".course-container")
    courseContainer.innerHTML = ""

    const module = CreateModule(module_id)

    courseContainer.appendChild(module.moduleContainer)
}

function CreateModule(module_id){

    switch(module_id){

        case "441105":
            const module441105 = new Module("Algorithms and Data Structures")
            module441105.addComponent("Coursework", 60, 100)
            module441105.addComponent("Exam", 40, 50)
            return module441105

        case "441101":
            const module441101 = new Module("Programming Portfolio")
            module441101.addComponent("Lab Book", 50, 50)
            module441101.addComponent("Practical Exam", 25, 7)
            module441101.addComponent("Capstone Project", 25, 50)
            return module441101

        case "441104":
            const module441104 = new Module("Computational Thinking")
            module441104.addComponent("Assessment A", 15, 15)
            module441104.addComponent("Assessment B", 20, 20)
            module441104.addComponent("Assessment C", 15, 15)
            module441104.addComponent("Assessment D", 20, 20)
            module441104.addComponent("Assessment E", 20, 20)
            module441104.addComponent("Assessment F", 10, 10)
            return module441104
    }
}


