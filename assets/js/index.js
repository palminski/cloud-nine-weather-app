// const fetchWeatherInfo = function(lat,lon) {
//     const API_KEY = "f5679ff18384584c4ebc83f9054ae558";
//     fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+API_KEY).then(function(response){
//         response.json().then(function(data){
//             console.log(data);
//         })
//     })
// }
// fetchWeatherInfo(44.052151,-123.091187);

const fetchWeatherInfo = function(cityName) {
    const API_KEY = "f5679ff18384584c4ebc83f9054ae558";
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+API_KEY).then(function(response){
        response.json().then(function(data){
            console.log(data);
        })
    })
}
fetchWeatherInfo("Eugene");

