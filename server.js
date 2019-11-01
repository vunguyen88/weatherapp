const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = '155b0f342a2ddc00a1b51f9be9ab4a08';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

//access all of the static files within the ‘public’ folder

app.get('/', function(req, res) {
    res.render('index', {weather: null, error:null});
})

app.post('/', function(req, res) {
    // res.render('index');
    // console.log(req.body.city, req.body.country)
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    request(url, function (err, respond, body) {
        if(err) {
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined) {
                res.render('index', {weather: null, error: 'Error, please try again'})
            } else {
                let weatherText = `City of ${weather.name}, City ID ${weather.id} with Coordinates of (${weather.coord.lon}) Longitude and (${weather.coord.lat}) Latitude
                                    has temperature of ${((weather.main.temp - 273.15)*9/5 + 32).toFixed(2)} Fahrenheit or ${(weather.main.temp - 273.15).toFixed(2)} Celcius
                                    Atmospheric pressure at ${weather.main.pressure} hPa, Humidity at ${weather.main.humidity}%
                                    Wind speed at ${weather.wind.speed} m/s and wind direction at ${weather.wind.deg} degrees`
                res.render('index', {weather: weatherText, error: null});
            }
        }
    })
})

app.listen(3000, function() {
    console.log("server's running on port 3000");
})






// const request = require('request');
// const argv = require('yargs').argv;

// let apiKey = '155b0f342a2ddc00a1b51f9be9ab4a08';
// let city = argv.c || 'Orlando';
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

// request(url, function(err, respond, body) {
//     if(err) {
//         console.log('error:', error);
//     } else {
//         let weather = JSON.parse(body)
//         let message = `It's ${((weather.main.temp - 273.15)*9/5 + 32).toFixed(2)} Fahrenheit in ${weather.name}!`;
//         let message1 = `City of ${weather.name}, City ID ${weather.id} with Coordinates of (${weather.coord.lon}) Longitude and (${weather.coord.lat}) Latitude
//         has temperature of ${((weather.main.temp - 273.15)*9/5 + 32).toFixed(2)} Fahrenheit or ${(weather.main.temp - 273.15).toFixed(2)} Celcius
//         Atmospheric pressure at ${weather.main.pressure} hPa, Humidity at ${weather.main.humidity}%
//         Wind speed at ${weather.wind.speed} m/s and wind direction at ${weather.wind.deg} degrees`
//         console.log(message1);
//     }
// });
