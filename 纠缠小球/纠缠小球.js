const canvas = document.getElementById('canvas');
const speedSlider = document.getElementById('speedSlider');
const sizeSlider = document.getElementById('sizeSlider');
const numSlider = document.getElementById('numSlider');

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
const numBalls = parseInt(numSlider.value);

function createBall() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: parseInt(sizeSlider.value),
        color: getRandomColor(),
        speedX: (Math.random() - 0.5) * 10,
        speedY: (Math.random() - 0.5) * 10
    };
}

function updateBalls() {
    const newNumBalls = parseInt(numSlider.value);
    balls.length = newNumBalls;
    for (let i = 0; i < newNumBalls; i++) {
        if (!balls[i]) {
            balls[i] = createBall();
        }
    }
}

updateBalls();

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
}

speedSlider.addEventListener('input', function() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].speedX = (Math.random() - 0.5) * parseInt(speedSlider.value);
        balls[i].speedY = (Math.random() - 0.5) * parseInt(speedSlider.value);
    }
});

sizeSlider.addEventListener('input', function() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].radius = parseInt(sizeSlider.value);
    }
});

numSlider.addEventListener('input', updateBalls);

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];

        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
            ball.speedX = -ball.speedX;
        }

        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.speedY = -ball.speedY;
        }

        for (let j = i + 1; j < balls.length; j++) {
            const otherBall = balls[j];
            const distance = Math.sqrt((ball.x - otherBall.x) ** 2 + (ball.y - otherBall.y) ** 2);

            if (distance < ball.radius + otherBall.radius) {
                ctx.beginPath();
                ctx.moveTo(ball.x, ball.y);
                ctx.lineTo(otherBall.x, otherBall.y);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.lineWidth = 2;
                ctx.stroke();
                ball.color = getRandomColor();
            }
        }

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0; 
    }

    requestAnimationFrame(animate);
}

animate();
