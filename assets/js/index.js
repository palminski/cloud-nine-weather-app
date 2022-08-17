//API KEY FROM BCS: 5253d1895ec18b3c6485974e30c75532

// this gets lat and lon coords
const getWeather = function(cityName) {
    const API_KEY = "f5679ff18384584c4ebc83f9054ae558";
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=1&appid="+API_KEY).then(function(response){
        response.json().then(function(data){
            
            let lat = data[0].lat
            let lon = data[0].lon
            fetchWeatherInfo(lat,lon)
        })
    })
}

//This gets weather data
const fetchWeatherInfo = function(lat,lon) {
    const API_KEY = "5253d1895ec18b3c6485974e30c75532";
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,minutely&appid="+API_KEY+"&units=imperial").then(function(response){
        response.json().then(function(data){
            //Current Weather Data
            let currentDate = data.current.dt;
            let currentTemp = data.current.temp;
            let currentWind = data.current.wind_speed;
            let currentHumidity = data.current.humidity;
            let currentUvi = data.current.uvi;

            console.log(currentDate);
            console.log("Temp "+currentTemp);
            console.log("Wind "+ currentWind);
            console.log("Humidity "+currentHumidity);
            console.log("UVI "+currentUvi);

            //Future Weather Data
            for (let i = 0;)
        })
    })
}



//fetchWeatherInfoForecastAPI("Eugene");


getWeather("Eugene"); //curently resulting in 401 Unauthorised

