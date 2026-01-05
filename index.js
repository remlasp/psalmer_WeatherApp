// References to DOM elements
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "e5e6939bf22b083b71ca216a0a5a0bc8"; // API key

// Listen for the form submission
weatherForm.addEventListener("submit", async event => {
    event.preventDefault(); // Prevent default page refresh when submitting the form

    const city = cityInput.value; // to get the input value
    
    if (city) {
        try {
            // Fetch weather data from API
            const weatherData = await getWeatherData(city);
            
            // Display the weather information
            displayWeatherInfo(weatherData);
        } catch (error) {
            // Handle errors (e.g., city not found)
            console.error(error);
            displayError(error);
        }
    } else {
        // If input is empty, show an error
        displayError("Please Enter a City");
    }
});

// to fetch data in openweather
async function getWeatherData(city) {
    // Construct API URL with city and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    // Fetch the data from the API
    const response = await fetch(apiUrl);
    
    // If the response is not OK (e.g., 404), throw an error
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    // Convert the response body from JSON to JavaScript object
    return await response.json();
}

// Function to display weather information on the page
function displayWeatherInfo(data) {
    // Destructure the API response to extract required values
    const { 
        name: city, 
        main: { temp, humidity }, 
        weather: [{ description, id }] 
    } = data;

    // Clear previous content
    card.textContent = "";
    card.style.display = "flex";

    // Create DOM elements for each piece of information
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // Set content for each element
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}°F`;
    humidityDisplay.textContent = `humidity: ${humidity}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // Add classes for styling
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // Append elements to the card container
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

// Function to return an emoji based on the weather condition ID
function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "🌨"; // Thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return "🌨"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌨"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄"; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return "🌫"; // Atmosphere (fog, mist, etc.)
        case (weatherId === 800):
            return "🌞"; // Clear sky
        case (weatherId >= 801 && weatherId < 810):
            return "☁"; // Clouds
        default:
            return "unknown"; // Unknown weather
    }
}

// Function to display error messages
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    // Clear previous content and show error
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
