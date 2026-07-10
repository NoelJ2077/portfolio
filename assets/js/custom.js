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

// Wetter-Today Upgrade 
const weatherTempEl = document.getElementById('weatherTemp');
const weatherDescEl = document.getElementById('weatherDesc');
const weatherDateEl = document.getElementById('weatherDate');
const weatherRangeEl = document.getElementById('weatherRange');
const weatherHumidityEl = document.getElementById('weatherHumidity');
const weatherDewpointEl = document.getElementById('weatherDewpoint');
const weatherWindEl = document.getElementById('weatherWind');
const weatherUvEl = document.getElementById('weatherUv');

if (weatherTempEl && weatherDescEl) {
  fetch('https://api.open-meteo.com/v1/forecast?latitude=47.53&longitude=8.30&current=temperature_2m,relative_humidity_2m,apparent_temperature,dew_point_2m,wind_speed_10m,uv_index&daily=temperature_2m_max,temperature_2m_min&timezone=Europe/Zurich')
    .then((response) => {
      if (!response.ok) throw new Error('Weather request failed');
      return response.json();
    })
    .then((data) => {
      const current = data.current || {};
      const daily = data.daily || {};
      const temp = current.temperature_2m;
      const code = current.weather_code;
      const min = daily.temperature_2m_min?.[0];
      const max = daily.temperature_2m_max?.[0];
      weatherTempEl.textContent = `Currently: ${Math.round(temp)}°C`;
      weatherDescEl.textContent = getWeatherDescription(code);
      weatherDateEl.textContent = formatSwissDate(new Date());
      weatherRangeEl.textContent = `Min ${Math.round(min)}° / Max ${Math.round(max)}°`;
      weatherHumidityEl.textContent = `Humidity ${Math.round(current.relative_humidity_2m)}%`;
      weatherDewpointEl.textContent = `Dew point ${Math.round(current.dew_point_2m)}°`;
      weatherWindEl.textContent = `Wind ${Math.round(current.wind_speed_10m)} km/h`;
      weatherUvEl.textContent = `UV ${Number(current.uv_index || 0).toFixed(1)}`;
    })
    .catch(() => {
      weatherTempEl.textContent = '—';
      weatherDescEl.textContent = 'Weather unavailable';
      weatherDateEl.textContent = formatSwissDate(new Date());
      weatherRangeEl.textContent = 'Min / Max';
      weatherHumidityEl.textContent = 'Humidity';
      weatherDewpointEl.textContent = 'Dew point';
      weatherWindEl.textContent = 'Wind';
      weatherUvEl.textContent = 'UV';
    });
}

function formatSwissDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function getWeatherDescription(code) {
  const map = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with hail'
  };

  return map[code] || '';
}

// CV Page new Darkmode (default: True)
const panelThemeToggle = document.getElementById('panelThemeToggle');
const aboutPanel = document.querySelector('.about-panel');

if (panelThemeToggle && aboutPanel) {
  const savedTheme = localStorage.getItem('aboutPanelTheme');
  const shouldStartDark = savedTheme !== 'light';

  if (shouldStartDark) {
    aboutPanel.classList.add('about-panel-dark');
    panelThemeToggle.setAttribute('aria-pressed', 'true');
    panelThemeToggle.innerHTML = '<i class="bi bi-sun-fill me-2"></i><span>Light panel</span>';
  }

  panelThemeToggle.addEventListener('click', () => {
    const isDark = aboutPanel.classList.toggle('about-panel-dark');
    panelThemeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');

    if (isDark) {
      panelThemeToggle.innerHTML = '<i class="bi bi-sun-fill me-2"></i><span>Light panel</span>';
      localStorage.setItem('aboutPanelTheme', 'dark');
    } else {
      panelThemeToggle.innerHTML = '<i class="bi bi-moon-fill me-2"></i><span>Dark panel</span>';
      localStorage.removeItem('aboutPanelTheme');
    }
  });
}
