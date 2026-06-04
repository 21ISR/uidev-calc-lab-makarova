const display = document.querySelector('.display')
const buttons = document.querySelectorAll('.button');

let currentExpression = '';

function handleButton(button) {
    const value = button.target.textContent;

    if (value === '=') {
        resultCalculate()
    } else if (value === 'AC') {
        clearDisplay()
    } else if (value === '+/-') {
        toggleSign()
    } else if (value === '%') {
        handlePercent()
    } else {
        currentExpression += value
        updateDisplay()
    }

    function updateDisplay() {
        display.textContent = currentExpression || '0'
    }


    function clearDisplay() {
        currentExpression = ''
        updateDisplay()
    }

    function resultCalculate() {
        if (currentExpression.includes('%')) {
            const numbers = currentExpression.split("%")
            const res = (numbers[0] / 100) * numbers[1]

            currentExpression = String(res)
            updateDisplay(currentExpression)
            return;
        }
        let res = currentExpression
            .replace('×', '*')
            .replace('÷', '/')
            .replace('−', '-')

        const result = eval(res)
        currentExpression = String(result)
        updateDisplay(currentExpression)
    }

    function toggleSign() {
        if (currentExpression !== '') {
            resultCalculate()
            currentExpression = String(Number(currentExpression * -1))
            updateDisplay()
        }
    }

    function handlePercent() {
        resultCalculate()

        currentExpression += '%'

        updateDisplay()
    }
};

buttons.forEach(button => {
    button.addEventListener('click', handleButton)
});