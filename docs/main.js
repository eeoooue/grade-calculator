
import { Module } from "./lib/module.js"

const courseSelector = document.getElementById("course-selector")
courseSelector.addEventListener("input", (e) => SwapToModule(e.target.value))

SwapToModule("441105")

function SwapToModule(module_id) {

    const courseContainer = document.querySelector(".course-container")
    courseContainer.innerHTML = ""

    const module = CreateModule(module_id)
    courseContainer.appendChild(module.moduleContainer)
}

function CreateModule(module_id) {

    switch (module_id) {

        // addComponent(Title, Weight, Marks)

        case "441101":
            const module441101 = new Module("Programming Portfolio")
            module441101.addTextbox("Trimester 1")
            module441101.addSubcomponent("Summative Assessments 1-8", 30, 30)
            module441101.addSubcomponent("Practical Exam", 25, 7)

            module441101.addTextbox("Trimester 2")
            module441101.addSubcomponent("Summative Assessments 9-14", 20, 20)
            module441101.addSubcomponent("Capstone Project", 25, 50)
            return module441101

        case "441102":
            const module441102 = new Module("Architectures, Operating Systems & the Cloud")
            module441102.addTextbox("This module is entirely assessed using your lab report.")
            module441102.addTextbox("For each lab section:<br> - Task completion (7 marks)<br> - Discussion observations (3 marks)")
            module441102.addSubcomponent("Report Structure & Presentation", 10, 10)
            module441102.addSubcomponent("Lab Sections: Task Completion", 63, 63)
            module441102.addSubcomponent("Lab Sections: Discussion & Observations", 27, 27)
            return module441102

        case "441104":
            const module441104 = new Module("Computational Thinking")
            module441104.addSubcomponent("Assessment A", 15, 15)
            module441104.addSubcomponent("Assessment B", 20, 20)
            module441104.addSubcomponent("Assessment C", 15, 15)
            module441104.addSubcomponent("Assessment D", 20, 20)
            module441104.addSubcomponent("Assessment E", 20, 20)
            module441104.addSubcomponent("Assessment F", 10, 10)
            return module441104

        case "441105":
            const module441105 = new Module("Algorithms & Data Structures")
            module441105.addSubcomponent("Coursework", 60, 100)
            module441105.addSubcomponent("Exam", 40, 50)
            return module441105

        case "441108":
            const module441108 = new Module("Professional Development")
            module441108.addSubcomponent("Written Portfolio", 30, 50)
            module441108.addSubcomponent("Sector Quizzes A", 15, 25)
            module441108.addSubcomponent("Sector Quizzes B", 15, 25)
            module441108.addSubcomponent("Team Design Project", 40, 100)
            return module441108
    }
}


