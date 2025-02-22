/** custom 2025: */
var lastSentTime = localStorage.getItem('lastSentTime') ? parseInt(localStorage.getItem('lastSentTime')) : 0;
function sendMail() {
    
    var currentTime = new Date().getTime();
    if (currentTime - lastSentTime < 3 * 60 * 1000) {
      alert('Please wait at least 3 minutes before sending another message.');
      return;
    }
    var frommail = document.getElementById('frommail').value;
    var fromname = document.getElementById('fromname').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
  
    // Parameter names must match EmailJS template parameters
    var templateParams = {
      fromemail: frommail,
      fromname: fromname,
      subject: subject,
      message: message
    };
  
    // Send email via EmailJS
    emailjs.send('service_utqf0dw_secret_0', 'template_pb0y8ab_secret0', templateParams)
      .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent successfully!');
          // Update lastSentTime in localStorage
          lastSentTime = currentTime;
          localStorage.setItem('lastSentTime', lastSentTime);
      }, function(error) {
          console.log('FAILED...', error);
          alert('Message failed to send. Please try again later.');
      });
  }

// Datahover links
const hoverElements = document.querySelectorAll('.cnt-text-hover');
let currentIndex = 0;

function rotateText() {
  hoverElements.forEach((el, index) => {
    el.classList.remove('active');
  });

  hoverElements[currentIndex].classList.add('active');
  currentIndex = (currentIndex + 1) % hoverElements.length;
}

setInterval(rotateText, 3000);