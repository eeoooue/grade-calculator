
import { UniversityModule } from "./lib/university_module.js"

const MODULE_SELECTOR_ID = "module-selector"
const ACADEMIC_YEAR_SELECTOR_ID = "year-selector"

init()

async function init() {
    await PopulateAcademicYearSelector()
    await PopulateModuleSelector()
    ResetSelectedModule()

    const courseSelector = document.getElementById(MODULE_SELECTOR_ID)
    courseSelector.addEventListener("input", (e) => SwapToModule(e.target.value))

    const yearSelector = document.getElementById(ACADEMIC_YEAR_SELECTOR_ID)
    yearSelector.addEventListener("input", (e) => UpdateModuleSelection())
}

function ResetSelectedModule(){

    const courseSelector = document.getElementById(MODULE_SELECTOR_ID)
    SwapToModule(courseSelector.value)
}

async function UpdateModuleSelection(){
    await PopulateModuleSelector()
    ResetSelectedModule()
}

async function PopulateAcademicYearSelector() {

    const response = await fetch("university_modules.json");
    const modules = await response.json();

    const years = [...new Set(Object.values(modules).map(m => m.academic_year))].sort();

    const yearSelector = document.getElementById(ACADEMIC_YEAR_SELECTOR_ID)
    yearSelector.innerHTML = years.map(y => `<option value="${y}">${y}</option>`).join("")
}

async function PopulateModuleSelector() {

    const response = await fetch("university_modules.json");
    const modules = await response.json();

    const yearSelector = document.getElementById(ACADEMIC_YEAR_SELECTOR_ID)
    const selectedAcademicYear = yearSelector.value

    const courseSelector = document.getElementById(MODULE_SELECTOR_ID)
    courseSelector.innerHTML = Object.entries(modules)
        .filter(([id, m]) => m.academic_year === selectedAcademicYear)
        .map(([id, m]) => `<option value="${id}">${m.title}</option>`)
        .join("")
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

