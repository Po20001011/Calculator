document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    let currentInput = '';
    let firstValue = '';
    let operator = '';
    let shouldResetDisplay = false;


    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                firstValue = '';
                operator = '';
                display.value = '';
            } else if (value === '=') {
                try {
                    currentInput = eval(currentInput).toString();
                    display.value = currentInput;
                } catch {
                    display.value = 'Error';
                }
                shouldResetDisplay = true;
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '' && !shouldResetDisplay) {
                    firstValue = currentInput;
                    operator = value;
                    currentInput += value;
                    display.value = currentInput;
                }
                shouldResetDisplay = false;
            } else {
                if (shouldResetDisplay) {
                    currentInput = '';
                    shouldResetDisplay = false;
                }
                currentInput += value;
                display.value = currentInput;
            }
        });
    });

    document.getElementById('equals').addEventListener('click', () => {
        const operatorIndex = Math.max(currentInput.lastIndexOf('+'), currentInput.lastIndexOf('-'), currentInput.lastIndexOf('*'), currentInput.lastIndexOf('/'));
        const secondValue = currentInput.slice(operatorIndex + 1);

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
                    result = parseFloat(firstValue) / parseFloat(secondValue);
                    break;
            }
            display.value = result;
            currentInput = result.toString();
            operator = '';
            firstValue = '';
            shouldResetDisplay = true;
        }
    });

    document.getElementById('clear').addEventListener('click', () => {
        currentInput = '';
        operator = '';
        firstValue = '';
        display.value = '';
    });

});
// 泡泡動畫
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bubbleCanvas');
    const ctx = canvas.getContext('2d');

    // 設置Canvas尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 泡泡的數量和最大半徑
    const numBubbles = 30;
    const maxRadius = 30;

    // 定義泡泡物件
    const bubbles = [];
    for (let i = 0; i < numBubbles; i++) {
        bubbles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * maxRadius + 5,
            dx: Math.random() * 2 - 1, // 水平速度
            dy: Math.random() * 2 - 1, // 垂直速度
            color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`
        });
    }

    // 繪製泡泡
    function drawBubbles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空畫布

        bubbles.forEach(bubble => {
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            ctx.fillStyle = bubble.color;
            ctx.fill();

            // 更新泡泡位置
            bubble.x += bubble.dx;
            bubble.y += bubble.dy;

            // 如果超出畫布範圍，重新設置位置
            if (bubble.x - bubble.radius > canvas.width) {
                bubble.x = -bubble.radius;
            }
            if (bubble.x + bubble.radius < 0) {
                bubble.x = canvas.width + bubble.radius;
            }
            if (bubble.y - bubble.radius > canvas.height) {
                bubble.y = -bubble.radius;
            }
            if (bubble.y + bubble.radius < 0) {
                bubble.y = canvas.height + bubble.radius;
            }
        });

        requestAnimationFrame(drawBubbles); // 循環繪製
    }

    // 啟動動畫
    drawBubbles();
});
