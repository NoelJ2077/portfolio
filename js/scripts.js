/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


/* start Custom Javascript */
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width = canvas.parentNode.clientWidth;
canvas.height = canvas.parentNode.clientHeight;

var buffer = document.createElement('canvas');
var bufferCtx = buffer.getContext('2d');
buffer.width = canvas.width;
buffer.height = canvas.height;

var lines = []; // init empty array of lines
var numLines = 250; // adjust this to control the number of lines drawn



for (var i = 0; i < numLines; i++) {
    var line = { // add a new line to the array
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        length: Math.random() * 75,
        speed: 0.2 + Math.random() * 1,
        thickness: Math.random() * 50,
        color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`
    };
    lines.push(line);
}

var lastFrameTime = performance.now();

function draw(currentTime) {
    var elapsedTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    bufferCtx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach(function (line) {
        bufferCtx.beginPath();
        bufferCtx.moveTo(line.x, line.y);
        bufferCtx.lineTo(line.x + line.length * line.dx, line.y + line.length * line.dy);
        bufferCtx.strokeStyle = line.color;
        bufferCtx.lineWidth = line.thickness;
        bufferCtx.lineCap = 'round';
        bufferCtx.lineJoin = 'round';
        bufferCtx.shadowBlur = 20;
        bufferCtx.stroke();

        line.x += line.dx * line.speed * (elapsedTime / (1000 / 60));

        if (line.x - line.length > canvas.width || line.x + line.length < 0 || line.y - line.length > canvas.height || line.y + line.length < 0) {
            line.x = Math.random() * canvas.width;
            line.y = Math.random() * canvas.height;
        }
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(buffer, 0, 0);

    // Make the lines move
    requestAnimationFrame(draw);
}

// call draw() once to start the endless animation
requestAnimationFrame(draw);

/* end Custom Javascript */