const canvas = document.getElementById('spiralCanvas');
const ctx = canvas.getContext('2d');
const restartBtn = document.getElementById('restartBtn');

let width, height, centerX, centerY, radius;
let step = 0;
let globalRotation = 0;
let animationId;

// Image ke exact pattern jaisa look laane ke liye settings
const totalCircles = 160; // Total ghumne wale circles
const angleIncrement = (Math.PI * 2) / totalCircles;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    centerX = width / 2;
    centerY = height / 2;
    // Screen size ke hisab se perfect circle size
    radius = Math.min(width, height) * 0.21;
}

window.addEventListener('resize', () => {
    resize();
});

function drawFrame() {
    // Dark background clear karein
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(centerX, centerY);
    
    // Jab draw ho jaye (ya draw hote waqt) continuously ghumane ke liye
    ctx.rotate(globalRotation);

    // Ek-ek karke circles draw karna (Turtle graphics effect)
    for (let i = 0; i < step; i++) {
        ctx.save();
        
        // Har circle ko thoda angle rotate karna
        ctx.rotate(i * angleIncrement);
        
        // Rainbow color transition (Red -> Yellow -> Green -> Cyan)
        const hue = (i / totalCircles) * 240; 
        ctx.strokeStyle = `hsl(${hue}, 100%, 55%)`;
        ctx.lineWidth = 1.2;

        // Center se thoda offset circle draw karna taaki spirograph bane
        ctx.beginPath();
        ctx.arc(radius, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
    }

    ctx.restore();

    // Pehle pura pattern draw hoga, phir continuously ghumta rahega
    if (step < totalCircles) {
        step += 1; // Drawing speed
    } else {
        globalRotation += 0.008; // Complete hone ke baad ghumne ki speed
    }

    animationId = requestAnimationFrame(drawFrame);
}

function startAnimation() {
    cancelAnimationFrame(animationId);
    step = 0;
    globalRotation = 0;
    resize();
    drawFrame();
}

restartBtn.addEventListener('click', startAnimation);

// Start on load
startAnimation();