const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentExpression = '';

function handleButton(event) {
    const value = event.target.textContent;
    
    console.log('Нажата кнопка:', value); // Для отладки

    if (value === '=') {
        resultCal();
    } else if (value === 'AC' || value === 'C') {
        clearCal();
    } else if (value === '+/-') {
        toggleSign();
    } else if (value === '%') {
        handlePercent();
    } else {
        currentExpression += value;
        update();
    }
}

function update() {
    display.textContent = currentExpression || '0';
}

function resultCal() {
    try {
        let expression = currentExpression
            .replaceAll('×', '*')
            .replaceAll('÷', '/')
            .replaceAll('−', '-');
        
        const result = eval(expression);
        if (!isFinite(result)) {
            display.textContent = 'Error';
            currentExpression = '';
        } else {

            const roundedResult = Math.round(result * 1000000000) / 1000000000;
            currentExpression = String(roundedResult);
            update();
        }
    } catch (error) {
        console.error('Ошибка вычисления:', error);
        display.textContent = 'Error';
        currentExpression = '';
    }
}

function clearCal() {
    currentExpression = '';
    update();
}

function toggleSign() {
    if (currentExpression !== '') {
        resultCal();
        
        if (display.textContent !== 'Error') {
            const currentValue = display.textContent;
            if (currentValue.startsWith('-')) {
                currentExpression = currentValue.slice(1);
            } else {
                currentExpression = '-' + currentValue;
            }
            
            update();
        }
    }
}

function handlePercent() {
    if (currentExpression !== '') {
        resultCal();
        
        if (display.textContent !== 'Error') {
            const currentValue = display.textContent;
            
            currentExpression = currentValue + '%';
            update();
        }
    }
}

buttons.forEach(button => {
    button.addEventListener('click', handleButton);
});