
//Works but not the correct API (Json data missing UV index)
const fetchWeatherInfoForecastAPI = function(cityName) {
    const API_KEY = "f5679ff18384584c4ebc83f9054ae558";
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+API_KEY+"&units=imperial").then(function(response){
        response.json().then(function(data){
            console.log(data);
        })
    })
}

//This is the API that was linked on the project page. this results in a 401 error
const fetchWeatherInfo = function(cityName) {
    const API_KEY = "f5679ff18384584c4ebc83f9054ae558";
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid="+API_KEY).then(function(response){
        response.json().then(function(data){
            console.log(data);
        })
    })
}



//fetchWeatherInfoForecastAPI("Eugene");


fetchWeatherInfo(); //curently resulting in 401 Unauthorised

