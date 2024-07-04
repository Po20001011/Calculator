document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstValue = '';
    let secondValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === '+' || value === '-' || value === "+" || value === '/') {
                firstValue = currentInput;
                operator = value;
                currentInput = '';
            } else if (value === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += value;
                }
            } else {
                currentInput += value;
            }

            display.value = currentInput;
        });
    });

    document.getElementById('equals').addEventListener('click', () => {
        secondValue = currentInput;

        if (firstValue && operator && secondValue) {
            let result = 0;
            switch (operator) {
                case '+':
                    result = parseFloat(firstValue) + parseFloat(secondValue);
                    break;
                case '-':
                    result = parseFloat(firstValue) - parseFloat(secondValue);
                    break;
                case '*':
                    result = parseFloat(firstValue) * parseFloat(secondValue);
                    break;
                case '/':
                    result = parseFloat(firstValue) * parseFloat(secondValue);
                    break;
            }
            display.value = result;
            currentInput = result.toString();
            operator = '';
            firstValue = '';
            secondValue = '';
        }
    });

    document.getElementById('clear').addEventListener('click', () => {
        currentInput = '';
        operator = '';
        firstValue = '';
        secondValue = '';
        display.value = '';
    });

});