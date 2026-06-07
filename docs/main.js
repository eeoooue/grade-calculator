
import { UniversityModule } from "./lib/university_module.js"

const courseSelector = document.getElementById("course-selector")
courseSelector.addEventListener("input", (e) => SwapToModule(e.target.value))

PopulateAcademicYearSelector()
SwapToModule("441105")

async function PopulateAcademicYearSelector() {

    const response = await fetch("university_modules.json");
    const modules = await response.json();

    const years = [...new Set(Object.values(modules).map(m => m.academic_year))].sort();

    const yearSelector = document.getElementById("year-selector")
    yearSelector.innerHTML = years.map(y => `<option value="${y}">${y}</option>`).join("")
}





async function SwapToModule(module_id) {

    const courseContainer = document.querySelector(".course-container")
    courseContainer.innerHTML = ""

    const module = await CreateModule(module_id)
    courseContainer.appendChild(module.moduleContainer)
}

async function CreateModule(module_id) {
    const response = await fetch("university_modules.json");
    const modules = await response.json();

    const data = modules[module_id];
    if (!data) return null;

    const module = new UniversityModule(data.title);
    for (const { title, weight, marks } of data.subcomponents) {
        module.addSubcomponent(title, weight, marks);
    }
    return module;
}

