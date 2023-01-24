

export class Factory {

    constructor(){

    }

    makeDivWithClasses(classes){

        const div = document.createElement("div")

        for(const className of classes){
            div.classList.add(className)
        }

        return div
    }

}



