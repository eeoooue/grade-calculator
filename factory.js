
export class Factory {

    makeDivWithClasses(classes) {

        const div = document.createElement("div")
        for (const className of classes) {
            div.classList.add(className)
        }
        return div
    }

    createInputSlider(title, max_value) {

        const slider = document.createElement("input")
        slider.id = title
        slider.type = "range"
        slider.min = 0
        slider.value = 0
        slider.max = max_value

        return slider
    }
}
