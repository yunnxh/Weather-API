// Function to retrieve weather data for a specific city
function getWeather(city) {
    const apiKey = 'c20925545257cec1439f5bfcf3f30ea9'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    // Make a GET request to the API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract the necessary weather information from the API response
        const weather = {
          temperature: data.main.temp,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity
        };
  
        // Display the current weather information in the HTML elements
        const cityHeading = document.querySelector('.current-weather h2');
        const temperature = document.querySelector('.current-weather h6:nth-of-type(1)');
        const wind = document.querySelector('.current-weather h6:nth-of-type(2)');
        const humidity = document.querySelector('.current-weather h6:nth-of-type(3)');
  
        cityHeading.textContent = `${data.name} (${data.sys.country})`;
        temperature.textContent = `Temperature: ${weather.temperature}°C`;
        wind.textContent = `Wind: ${weather.windSpeed} M/S`;
        humidity.textContent = `Humidity: ${weather.humidity}%`;
  
        // Fetch the 5-day forecast for the city
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        return fetch(forecastApiUrl);
      })
      .then(response => response.json())
      .then(forecastData => {
        // Extract the necessary forecast information from the API response
        const forecastItems = forecastData.list.slice(0, 5); // Get the first 5 forecast items
  
        // Display the 5-day forecast information in the HTML elements
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
        // Display an error message if there's an issue with the API request
        console.log('Error:', error);
      });
  }
  
  // Function to handle the search button click
  function handleSearch() {
    const cityInput = document.querySelector('.city-input');
    const city = cityInput.value;
    getWeather(city);
  }
  
  // Load the weather data for the assigned city when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    const assignedCity = 'Ozark'; // Replace with your assigned city
    getWeather(assignedCity);
  });
  
  // Add event listener to the search button
  const searchButton = document.querySelector('.search-btn');
  searchButton.addEventListener('click', handleSearch);
  
