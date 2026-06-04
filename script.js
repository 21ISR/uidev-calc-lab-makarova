const display = document.querySelector('.display')
const buttons = document.querySelectorAll('.button');

let currentExpression = '';

function handleButton(event){
    const button = event.target;
    const value = button.texContent;
}

if (value === 'AC') {
        clearDisplay();
    } else if (value === '+/-') {
        toggleSign();
    } else if (value === '%') {
        calculatePercent();
    } else if (value === '=') {
        calculateResult();
    } else if (['+', '−', '×', '÷'].includes(value)) {
        addOperator(value);
    } else {
        addNumberOrDecimal(value);
    }
}

function clearDisplay(){
    currentExpression = '';
    display.textContent = '0';
}

function toggleSign() {
    if (currentExpression !== '') {
        calculateResult();
    }
    const currentValue = display.textContent;
    if (currentValue !== '0' && currentValue !== 'Error') {
        if (currentValue.startsWith('-')) {
            display.textContent = currentValue.substring(1);
        } else {
            display.textContent = '-' + currentValue;
        }
        currentExpression = display.textContent;
    }
}

function percent(){
    if (currentExpression !== 'Error'){
        currentExpression = currentValue + '%';
        display.textContent = currentExpression;
    }
}

function addOperator(operator){
    const currentValue = display.textContent;
}

function addNumberOrDecimal(value){
    if (should){
        currentExpression = '';
        display.textContent = '0';
        should = false;
    }
    const currentValue = display.textContent;
}

function calculateResult(){
    if(currentExpression === '')return;
    try{
        let expressionEval = currentExpression;
        if (expressionEval.includes('%')){
            expressionEval = processPercentages(expressionEval):
        }
        expressionEval = expressionEval
        .replace('×', '*')
        .replaceAll('÷', '/')
        .replaceAll('−', '-')
        const result = eval(expressionEval);
    } else {
        const rounded = Math.round(result*1000000000) / 1000000000;
        display.textContent = rounded.toString();
        currentExpression = rounded.toString();
    }
}

function processPercentages