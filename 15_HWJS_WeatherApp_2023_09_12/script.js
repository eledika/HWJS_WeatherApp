const API_KEY = "f1c60a8e1f388e1e6bd7400a336d54c8";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const locationInput = document.getElementById("locationInput");
const getWeatherButton = document.getElementById("getWeatherButton");
const weatherContainer = document.getElementById("weatherContainer");

getWeatherButton.addEventListener("click", () => {
    const location = locationInput.value.trim();
    if (location) {
        const apiUrl = `${BASE_URL}?q=${location}&appid=${API_KEY}`;
        fetch(apiUrl)
            .then((res) => res.json())
            // .then((data) => console.log(data))
            .then(
                ({
                    base,
                    name,
                    coord: { lon, lat },
                    main: { temp, feels_like, temp_min, temp_max, pressure },
                    sys: { country },
                    weather: {
                        0: { description },
                    },
                    wind: { speed },
                }) => {
                    const weatherDetails = `
                            Base: ${base}<br>
                            Name: ${name}<br>
                            Lon: ${lon}<br>
                            Lat: ${lat}<br>
                            Base: ${base}<br>
                            Temperature: ${(temp - 273.15).toFixed(1)}<br>
                            Feels like: ${(feels_like - 273.15).toFixed(1)}<br>
                            Temperature minimum: ${(temp_min - 273.15).toFixed(
                                1
                            )}<br>
                            Temperature maximum: ${(temp_max - 273.15).toFixed(
                                1
                            )}<br>
                            Pressure: ${pressure}<br>
                            Country: ${country}<br>
                            Description: ${description}<br>
                            Wind:${speed}<br>
                            `;
                    weatherContainer.innerHTML = weatherDetails;
                    //    weatherContainer.innerText ='';
                    // console.log(
                    // base,
                    // name,
                    // lon,
                    // lat,
                    // (temp - 273.15).toFixed(1),
                    // (feels_like - 273.15).toFixed(1),
                    // country,
                    // description
                    // );
                }
            )
            .catch((err) => console.log(err))
            .finally(console.log("запрос закончен"));
    }
});
