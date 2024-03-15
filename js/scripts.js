const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.parentNode.clientWidth;
canvas.height = canvas.parentNode.clientHeight;

const particles = [];
const numParticles = 50; // Control the number of particles

class Particle {
    constructor(){
        this.x = canvas.width * Math.random();
        this.y = canvas.height * Math.random();
        this.size = Math.random() * 8 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'rgba(' + (Math.random()*255).toFixed() + ',' + (Math.random()*255).toFixed() + ',' + (Math.random()*255).toFixed() + ',1)';
        this.shadowColor = 'rgba(' + (Math.random()*255).toFixed() + ',' + (Math.random()*255).toFixed() + ',' + (Math.random()*255).toFixed() + ',1)';
        this.trail = [];
    }
    
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles(){
    for (let i = 0; i < numParticles; i++){
        particles.push(new Particle());
    }
    for (let i = 0; i < particles.length; i++){
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particles[i].color;
                ctx.lineWidth = particles[i].size/10;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }

        if (particles[i].size <= 0.2){
            particles.splice(i, 1);
            i--;
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();

