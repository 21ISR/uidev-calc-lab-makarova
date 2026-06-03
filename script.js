const display = document.querySelector('.display')
const buttons = document.querySelectorAll('button')

let currentExpression = ''

function handleButton(button) {
    const value = button.target.textContent;
}

if (value === '='){
    resultCal()
} else if (value === 'AC'){
    clearCal()
} else if (value === '+/-'){
    Toggle()
} else if (value === '%'){
    handle()
} else {
    currentExpression += value
    update()
}

function update(){
    display.textContent = currentExpression || '0'
}

function resultCal(){
    let 
}

function clearCal(){
    
}