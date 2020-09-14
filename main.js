class Calculator{

    constructor(previousOperandElement, currentOperandElement){
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){        
        if (number === "." && this.currentOperand.includes(".")) {
            return;
        }
        this.currentOperand += number;
    }

    chooseOperation(operation){
        if (this.currentOperand === "") {
            return;
        }
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
        console.log(operation);
    }

    compute(){
        let computation;
        const prevOp = parseFloat(this.previousOperand);
        const currOp = parseFloat(this.currentOperand);
        if (isNaN(prevOp) || isNaN(currOp)) {
            return;
        }
        switch(this.operation){
            case '+':
                computation = prevOp + currOp;
                break;
            case '-':
                    computation = prevOp - currOp;
                break; 
            case '/':
                    computation = prevOp / currOp;
                break; 
             case '*':
                    computation = prevOp * currOp;
                break;
            default:
                return; 
                     
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    updateDisplay(){
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText = this.previousOperand + " " + this.operation;
        }
        else{
            this.previousOperandElement.innerText = "";
        }
    }

}

const numberButtons = document.querySelectorAll(".calc-btn-number")
const operationsButtons = document.querySelectorAll(".calc-btn-operation")
const equalsButton = document.querySelector(".calc-btn-equals")
const deleteButton = document.querySelector(".calc-btn-del")
const clearButton = document.querySelector(".calc-btn-clear")
const previousOperandElement = document.querySelector(".previous-op");
const currentOperandElement = document.querySelector(".current-op");

var calculator = new Calculator(previousOperandElement, currentOperandElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    })
})

clearButton.addEventListener("click", () => {
      calculator.clear();
      calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

operationsButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  })

  