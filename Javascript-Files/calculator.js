let buffer = '0';

let previousOperator;

const screen = document.querySelector('.main-screen');

const object = [{name: 'bhavya', age: '27'},  {name: 'Rajesh', age: '28'}];

console.log(object);

object[0].name = 'gagan';

console.log(object);

document.querySelector('.calc-buttons').addEventListener('click', function(event) {
    console.log("here");
    buttonClick(event.target.innerText);
});


function buttonClick (value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
}

function handleSymbol(value) {
    switch(value) {
        case 'C':
            buffer = '0';
            previousOperator = '';
            rerender();
            break;
        case '←':
            removeLastDigitFromBuffer();
            rerender();
            break;
        case '+':
            previousOperator = '+';
            break;
        case '-':
            previousOperator = '-';
            break;
        case 'x':
            previousOperator = 'x';
            break;
        case '÷':
            previousOperator = '÷';
            break;
        case '=':
            previousOperator = null;
            rerender();
            break;
    }
}

function removeLastDigitFromBuffer() {
    if (buffer.length === 1) {
        buffer = '0';
    } else {
        buffer = buffer.substr(0, buffer.length-1);
    }
}

function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
        rerender();
    } else {
        if (previousOperator) {
            buffer = executeArithmetic(buffer, value);
        } else {
            buffer = buffer + value;
            rerender();
        }
    }
}

function executeArithmetic(buffer, value) {
    if (previousOperator === '+') {
        return (parseInt(buffer) + parseInt(value)).toString();
    } else if (previousOperator === '-') {
        return (parseInt(buffer) - parseInt(value)).toString();
    } else if (previousOperator === 'x') {
        return (parseInt(buffer) * parseInt(value)).toString();
    } else {
        return (parseInt(buffer) / parseInt(value)).toString();
    }
    previousOperator='';
}

function rerender() {
    screen.innerText = buffer;
}