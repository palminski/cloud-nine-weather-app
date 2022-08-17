//API KEY FROM BCS: 5253d1895ec18b3c6485974e30c75532

// this gets lat and lon coords
const getWeather = function(cityName) {
    const API_KEY = "f5679ff18384584c4ebc83f9054ae558";
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=1&appid="+API_KEY).then(function(response){
        response.json().then(function(data){
            let location = data[0].name;
            let lat = data[0].lat;
            let lon = data[0].lon;
            fetchWeatherInfo(lat,lon,location);
        })
    })
}

//This gets weather data
const fetchWeatherInfo = function(lat,lon,location) {
    const API_KEY = "5253d1895ec18b3c6485974e30c75532";
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,minutely&appid="+API_KEY+"&units=imperial").then(function(response){
        response.json().then(function(data){
            //Todays Weather Data    data.daily[1].dt
            let currentDate = luxon.DateTime.fromSeconds(data.daily[0].dt).toLocaleString();
            let currentTemp = data.daily[0].temp.day;
            let currentWind = data.daily[0].wind_speed;
            let currentHumidity = data.daily[0].humidity;
            let currentUvi = data.daily[0].uvi;
            
            console.log(location);
            console.log(currentDate);
            console.log("Temp "+currentTemp);
            console.log("Wind "+ currentWind);
            console.log("Humidity "+currentHumidity);
            console.log("UVI "+currentUvi);

            //Future Weather Data
            for (let i = 1; i < 6; i++) {
                let Date = luxon.DateTime.fromSeconds(data.daily[i].dt).toLocaleString();
                let Temp = data.daily[i].temp.day;
                let Wind = data.daily[i].wind_speed;
                let Humidity = data.daily[i].humidity;
                let Uvi = data.daily[i].uvi;

                console.log(Date);
                console.log("Temp " + Temp);
                console.log("Wind " + Wind);
                console.log("Humidity " + Humidity);
                console.log("UVI " + Uvi);
            }
        })
    })
}



//fetchWeatherInfoForecastAPI("Eugene");


getWeather("Eugene"); //curently resulting in 401 Unauthorised

