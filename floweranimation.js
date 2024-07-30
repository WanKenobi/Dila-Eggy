const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');
const roses = [];
const colors = ['rgba(255, 105, 180, 0.8)', 'rgba(148, 0, 211, 0.8)'];  // Pink and Purple

// Function to create a rose
function createRose(x, y, petals, maxRadius, color) {
    return { x, y, petals, maxRadius, color, angle: 0 };
}

// Initialize roses
for (let i = 0; i < 6; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const petals = Math.floor(Math.random() * 5) + 10;  // Between 10 and 14 petals
    const maxRadius = Math.random() * 50 + 150;  // Between 150 and 200 radius
    const color = colors[Math.floor(Math.random() * colors.length)];
    roses.push(createRose(x, y, petals, maxRadius, color));
}

// Function to draw a single rose
function drawRose(rose) {
    for (let i = 0; i < rose.petals; i++) {
        let petalAngle = rose.angle + (i * 2 * Math.PI / rose.petals);
        let x = rose.x + Math.cos(petalAngle) * rose.maxRadius * Math.abs(Math.cos(rose.angle));
        let y = rose.y + Math.sin(petalAngle) * rose.maxRadius * Math.abs(Math.cos(rose.angle));

        ctx.beginPath();
        ctx.ellipse(x, y, 30, 15, petalAngle, 0, 2 * Math.PI);
        ctx.fillStyle = rose.color;
        ctx.fill();
        ctx.strokeStyle = rose.color.replace('0.8', '0.9');
        ctx.stroke();
    }
    rose.angle += 0.01;
    if (rose.angle >= 2 * Math.PI) {
        rose.angle = 0;
    }
}

// Animation loop
function drawBouquet() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    roses.forEach(drawRose);
    requestAnimationFrame(drawBouquet);
}

drawBouquet();