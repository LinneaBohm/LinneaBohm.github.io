class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1); //gjør den om til en streng, fjerner det bakerste tallet en av gangen
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return; //for å kun kunne legge til ett komma
        this.currentOperand = this.currentOperand.toString() + number.toString(); //dersom det er komma, ikke skriv den ut med mindre det kommer ett nytt tall. da gjøres dne til en sttring og legger til tall bakserst
    }

    chooseOperation(operation) { 
        if (this.currentOperand === '') return; //hvis current operand/det som skjer nå, ikke er noe, ikke gjør noe
        if (this.previousOperand !== '') { //hvis den er noe annet enn ingenting, kjør compute
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);  //gjør om tekst til tall, string er tekst
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;  //hvis det ikke er et tall, gjør ingenting
        switch (this.operation) { //en type if løkke, når pluss gjør dette fram til break. Uten break, gjør den alle
            case '+':
                computation = prev + current; //forrige tallet pluss det nye tallet osv
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:  //du trykket ikke på noen gyldig knapp, returner ingenting
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const floatNumber = parseFloat(number);
        if (isNaN(floatNumber)) return '';
        return floatNumber.toLocaleString('en');
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});


const logofigur = document.getElementById('logofigur');

