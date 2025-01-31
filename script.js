const apiKey = "cf15254968cd30ba6025d4385b1b6e46";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");
const diffCity= document.querySelector(".weather-button")

const weatherGradients = {
    'clear': 'linear-gradient(135deg, #fde047, #f59e0b)',
    'clouds': 'linear-gradient(135deg, #94a3b8, #64748b)',
    'rain': 'linear-gradient(135deg, #6366f1, #3b82f6)',
    'drizzle': 'linear-gradient(135deg, #60a5fa, #3b82f6)',
    'snow': 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
    'mist': 'linear-gradient(135deg, #cbd5e1, #94a3b8)',
    'fog': 'linear-gradient(135deg, #cbd5e1, #94a3b8)'
};

const checkWeather = async (city) => {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.floor(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

    // Set Weather Icon based on API response
    const weatherCondition = data.weather[0].main.toLowerCase();

    if (weatherCondition === "clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (weatherCondition === "clear") {
      weatherIcon.src = "images/clear.png";
    } else if (weatherCondition === "rain") {
      weatherIcon.src = "images/rain.png";
    } else if (weatherCondition === "drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (weatherCondition === "snow") {
      weatherIcon.src = "images/snow.png";
    } else if (weatherCondition === "mist") {
      weatherIcon.src = "images/mist.png";
    } else {
      weatherIcon.src = "images/clear.png"; 
    }
    card.style.background = weatherGradients[weatherCondition]
  } catch (error) {
    alert("City not found. Please enter a valid city name.");
  }
};

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
  
  