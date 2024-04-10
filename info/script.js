


function updateDateTime() {
    //afisare data
    var now = new Date();
    var dateElement = document.getElementById("date");
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    if(day<9){day="0"+day}
    if (month<9){month="0"+month}
    dateElement.innerText = day + '/' + month + '/' + year;

    //afisare ora
    var timeElement = document.getElementById("time");
    var hour = now.getHours();
    var minutes = now.getMinutes(); //
    var seconds = now.getSeconds();
    if(seconds<10){seconds="0"+seconds}
    if(minutes<10){minutes="0"+minutes}
    if(hour<10){hour="0"+hour}
    timeElement.innerText = hour + ':' + minutes + ':' + seconds;
    
    
  }
//wheather
  document.addEventListener('DOMContentLoaded', function() {
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
