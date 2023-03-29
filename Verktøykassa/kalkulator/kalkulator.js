class calculator {
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
     }
}

clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
}

delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

appendNumber(number) {
    if (number == '.' && this.currentOperand.includes('.')) return //for å kun kunne legge til ett komma
    this.currentOperand = this.currentOperand.toString() + number.toString()

}

chooseOperation(operation) {
    if(this.currentOperand === '') return
    if (this.previousOperand !== ''){
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

Compute(){
    let compututation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
            compututation = prev + current
            break
        case '-':
            compututation = prev - current
            break
        case '*':
            compututation = prev * current
            break
        case '÷':
            compututation = prev / current
            break
        default: 
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ' '
}

updateDisplay(){
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innertext = this.previousOperand

}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator= new calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()

    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',() =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()

    })
})

equalsButton.addEventListener('click',button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button =>{
    calculator.delete()
    calculator.updateDisplay()
})



