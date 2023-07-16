function getWeather(city) {
    const apiKey = 'c20925545257cec1439f5bfcf3f30ea9';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {

        const weather = {
          temperature: data.main.temp,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity
        };
 
        const cityHeading = document.querySelector('.current-weather h2');
        const temperature = document.querySelector('.current-weather h6:nth-of-type(1)');
        const wind = document.querySelector('.current-weather h6:nth-of-type(2)');
        const humidity = document.querySelector('.current-weather h6:nth-of-type(3)');
  
        cityHeading.textContent = `${data.name} (${data.sys.country})`;
        temperature.textContent = `Temperature: ${weather.temperature}°C`;
        wind.textContent = `Wind: ${weather.windSpeed} M/S`;
        humidity.textContent = `Humidity: ${weather.humidity}%`;

        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        return fetch(forecastApiUrl);
      })
      .then(response => response.json())
      .then(forecastData => {

        const forecastItems = forecastData.list.slice(0, 5); 

        const weatherCards = document.querySelector('.weather-cards');
        weatherCards.innerHTML = '';
  
        forecastItems.forEach(item => {
          const forecastCard = document.createElement('li');
          forecastCard.classList.add('card');
          forecastCard.innerHTML = `
            <h3>${item.dt_txt.split(' ')[0]}</h3>
            <h6>Temp: ${item.main.temp}°C</h6>
            <h6>Wind: ${item.wind.speed} M/S</h6>
            <h6>Humidity: ${item.main.humidity}%</h6>
          `;
          weatherCards.appendChild(forecastCard);
        });
      })
      .catch(error => {

        console.log('Error:', error);
      });
  }

  function handleSearch() {
    const cityInput = document.querySelector('.city-input');
    const city = cityInput.value;
    getWeather(city);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const assignedCity = 'Ozark'; 
    getWeather(assignedCity);
  });

  const searchButton = document.querySelector('.search-btn');
  searchButton.addEventListener('click', handleSearch);
  
