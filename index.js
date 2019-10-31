const request = require('request');
const argv = require('yargs').argv;

let apiKey = '155b0f342a2ddc00a1b51f9be9ab4a08';
let city = argv.c || 'Orlando';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

request(url, function(err, respond, body) {
    if(err) {
        console.log('error:', error);
    } else {
        let weather = JSON.parse(body)
        let message = `It's ${((weather.main.temp - 273.15)*9/5 + 32).toFixed(2)} Fahrenheit in ${weather.name}!`;
        let message1 = `City of ${weather.name}, City ID ${weather.id} with Coordinates of (${weather.coord.lon}) Longitude and (${weather.coord.lat}) Latitude
        has temperature of ${((weather.main.temp - 273.15)*9/5 + 32).toFixed(2)} Fahrenheit or ${(weather.main.temp - 273.15).toFixed(2)} Celcius
        Atmospheric pressure at ${weather.main.pressure} hPa, Humidity at ${weather.main.humidity}%
        Wind speed at ${weather.wind.speed} m/s and wind direction at ${weather.wind.deg} degrees`
        console.log(message1);
    }
});
