const iconElement = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

let input = document.getElementById("Search");
let city = "";
let lat = 0.0;
let lon = 0.0;

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) { 
    event.preventDefault();
    city = input.value;
    getSearchWeather(city);
    console.log(city);
  }
});

const weather = {};
weather.temperature = {
  unit: "celsius"
};

const KELVIN = 273;
const api_key = "f84f33ec04c51935d836c17f740ff984"; 

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showerror);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser does not support geolocation</p>";
}

function setPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  getWeather(lat, lon);
}

locationIcon.addEventListener("click", function (event) {
  console.log("Getting location...");
  getWeather(lat, lon);
});

function showerror(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`;
}

// Function to fetch weather data by city name
function getSearchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        notificationElement.style.display = "block";
        notificationElement.innerHTML = `<p>${data.message}</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      notificationElement.style.display = "block";
      notificationElement.innerHTML = "<p>Error fetching weather data.</p>";
    });
}

// Function to fetch weather data by coordinates
function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        notificationElement.style.display = "block";
        notificationElement.innerHTML = `<p>${data.message}</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      notificationElement.style.display = "block";
      notificationElement.innerHTML = "<p>Error fetching weather data.</p>";
    });
}

// Function to display weather data on the page
function displayWeather(data) {
  tempElement.innerHTML = `${Math.round(data.main.temp)}°C`;
  descElement.innerHTML = data.weather[0].description;
  locationElement.innerHTML = data.name;

  // Update weather icon based on weather description (example)
  const weatherIcons = {
    "Clear": "☀️",
    "Clouds": "☁️",
    "Rain": "🌧️",
    "Snow": "❄️",
    "Thunderstorm": "⛈️",
    
  };
  iconElement.innerHTML = weatherIcons[data.weather[0].main] || "❓";

  notificationElement.style.display = "none"; 
}
