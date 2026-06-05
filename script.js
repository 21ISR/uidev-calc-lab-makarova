const display = document.querySelector('.display')
const buttons = document.querySelectorAll('.button');

let currentExpression = '';
let resetDisplay = false;

function handleButton(event){
    const button = event.target;
    const value = button.textContent; 
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
    display.textContent = '0'
    resetDisplay = false;
}

function toggleSign() {
    if (currentExpression !== '' && !['+', '−', '×', '÷'].includes(currentExpression.slice(-1))) {
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
        shouldResetDisplay = true; 
    }
}

function calcPercent(){
    if (currentExpression === '' || currentExpression === 'Error') return;
    try {
        let tempExpr = currentExpression
        .replaceAll('×', '*')
        .replaceAll('÷', '/')
        .replaceAll('−', '-');
        let result = eval(tempExpr);
        currentExpression = String(result) + '%';
        isplay.textContent = currentExpression;
        shouldResetDisplay = false; // Разрешаем дописывать следующее число
    } catch (e) {
        display.textContent = 'Error';
    }
}

function addOperator(operator){
    const last = currentExpression.slice(-1);
    if (['+', '−', '×', '÷'].includes(lastChar)){
        currentExpression = currentExpression.slice(0, -1) + operator;
    } else{
        currentExpression += operator;
    }
    display.textContent = currentExpression;
    resetDisplay = false;
}

function addNumberOrDecimal(value) {
    if (shouldResetDisplay) {
        currentExpression = '';
        display.textContent = '0';
        shouldResetDisplay = false;
    }
    const currentValue = display.textContent;
    if (value === '.') {
        const parts = currentExpression.split(/[\+\−\×\÷]/);
        const currentNumberPart = parts[parts.length - 1];
        if (currentNumberPart.includes('.')) return;
    }
    if (currentValue === '0' && value !== '.') {
        currentExpression = value;
    } else {
        currentExpression += value;
    }
    
    display.textContent = currentExpression;
}

function calculateResult(){
 if (currentExpression === '') return;
    try {
        let expressionEval = currentExpression;
        if (expressionEval.includes('%')) {
            expressionEval = processPercentages(expressionEval);
        }
        expressionEval = expressionEval
            .replaceAll('×', '*')
            .replaceAll('÷', '/')
            .replaceAll('−', '-');

        const result = eval(expressionEval);
        const rounded = Math.round(result * 1000000000) / 1000000000;
        display.textContent = rounded.toString();
        currentExpression = rounded.toString();
        shouldResetDisplay = true; 
    } catch (e) {
        display.textContent = 'Error';
        currentExpression = '';
    }
}

function processPercentages(str){
    const parts = str.split('%');
    if (parts.length === 2 && parts [0] != '' && parts[1] !== ''){
        const num1 = parseFloat(part[0]);
        const num2 = parseFloat(parts[1]);
        return String((num1/100)*num2);
    }
    return str.replace('&', '');
}