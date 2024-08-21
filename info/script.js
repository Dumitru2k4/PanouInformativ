

async function updateDateTime() {
  try {
    // Fetch date and time from the World Time API
    const response = await fetch('https://timeapi.io/api/time/current/zone?timeZone=Europe%2FChisinau');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const now = new Date(data.dateTime);

    // Update date
    const dateElement = document.getElementById("date");
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    dateElement.innerText = `${formattedDay}/${formattedMonth}/${year}`;

    // Update time
    const timeElement = document.getElementById("time");
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedHour = hour < 10 ? "0" + hour : hour;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    timeElement.innerText = `${formattedHour}:${formattedMinutes}:${formattedSeconds}`;
  } catch (error) {
    console.error('Failed to fetch date and time:', error);
  }
}
//wheather
document.addEventListener('DOMContentLoaded', function () {
  const API_KEY = 'f97a2b0c39aa943e3c6f287fe852584e';
  const CITY = 'Chisinau';

  const weatherInfo = document.getElementById('weather-info');

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const temperature = Math.round(data.main.temp - 273.15);
      weatherInfo.innerHTML = `
          <p>${data.name} ${temperature}°C </p> 
        `;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      weatherInfo.textContent = 'Failed to fetch weather data';
    });
});



// Initial call to update date and time
updateDateTime();

// Update date and time every second
setInterval(updateDateTime, 1000);
