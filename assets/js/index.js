//API KEY FROM BCS: 5253d1895ec18b3c6485974e30c75532

//Elements Where Data will be displayed
const $city = document.querySelector("#city");
const $todaysDate = document.querySelector("#todays-date");
const $todaysIcon = document.querySelector("#todays-icon");
const $todaysTemp = document.querySelector("#todays-temp");
const $todaysWind = document.querySelector("#todays-wind");
const $todaysHumidity = document.querySelector("#todays-humidity");
const $todaysUVI = document.querySelector("#todays-uvi");
const $forecastCardContainer = document.querySelector("#forcast-card-container");

//Searchdar elements
const $searchForm = document.querySelector("#search-form");
const $searchInput = document.querySelector("#search-input");
const $historyButtonsContainer = document.querySelector("#history-buttons");

let history=[];
if (localStorage.getItem("history")){
    history = JSON.parse(localStorage.getItem("history"))
}


//When Search Form Submitted
const formSubmitHandler = function(event) {
    event.preventDefault();
    let searchTerm = $searchInput.value.trim();
    if (searchTerm) {
        getWeather(searchTerm);
        $searchInput.value="";
    }
    else
    {
        alert("Please Enter a city name");
    }
}

//When a history button is clicked
const buttonClickHandler = function(event) {
    let location = event.target.textContent;
    if (location){
        getWeather(location);
        $searchInput.value="";
    }
}

const updateHistory = function(searchTerm){
    for (let i = 0; i < history.length ; i++){
        if (history[i] === searchTerm){
            history.splice(i,1);
            i = 0;
        }
        
    }
    history.unshift(searchTerm);
    while (history.length > 5) {
        history.pop();
        console.log(history);
    }
    localStorage.setItem("history",JSON.stringify(history));
    updateHistoryButtons();
}

const updateHistoryButtons = function() {
    
    $historyButtonsContainer.innerHTML="";
    for (let i = 0; i < history.length; i++) {
        let $historyButton = document.createElement("button");
        $historyButton.classList = "btn btn-primary w-100 mb-2";
        $historyButton.textContent= history[i];
        $historyButtonsContainer.appendChild($historyButton);
    }
}
// this gets lat and lon coords
const getWeather = function(cityName) {
    const API_KEY = "f5679ff18384584c4ebc83f9054ae558";
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=1&appid="+API_KEY).then(function(response){
        response.json().then(function(data){
            let location = data[0].name;
            let lat = data[0].lat;
            let lon = data[0].lon;
            updateHistory(location);
            fetchWeatherInfo(lat,lon,location);
        })
    })
}

//This gets weather data
const fetchWeatherInfo = function(lat,lon,location) {
    const API_KEY = "5253d1895ec18b3c6485974e30c75532";
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,minutely&appid="+API_KEY+"&units=imperial").then(function(response){
        response.json().then(function(data){
            //Today's Weather Data
            let currentDate = luxon.DateTime.fromSeconds(data.daily[0].dt).toLocaleString();
            let currentIcon = data.daily[0].weather[0].icon;
            let currentTemp = data.daily[0].temp.day;
            let currentWind = data.daily[0].wind_speed;
            let currentHumidity = data.daily[0].humidity;
            let currentUvi = data.daily[0].uvi;

            $city.textContent = location;
            $todaysDate.textContent = currentDate;
            $todaysIcon.setAttribute("src",`https://openweathermap.org/img/wn/${currentIcon}@2x.png`)
            $todaysTemp.textContent = currentTemp;
            $todaysWind.textContent = currentWind;
            $todaysHumidity.textContent =currentHumidity;
            $todaysUVI.textContent = currentUvi;
            
            if (currentUvi < 3) {
                $todaysUVI.classList = "text-success";
            }
            else if (currentUvi < 8) {
                $todaysUVI.classList = "text-warning";
            }
            else {
                $todaysUVI.classList = "text-danger";
            }

            //Forecast Weather Data
            $forecastCardContainer.innerHTML = ("");
    
            for (let i = 1; i < 6; i++) {
                let date = luxon.DateTime.fromSeconds(data.daily[i].dt).toLocaleString();
                let icon = data.daily[i].weather[0].icon;
                let temp = data.daily[i].temp.day;
                let wind = data.daily[i].wind_speed;
                let humidity = data.daily[i].humidity;
                
                let $forecastCard = document.createElement("div");
                let $date = document.createElement("h3");
                let $icon = document.createElement("img");
                let $temp = document.createElement("p");
                let $wind = document.createElement("p");
                let $humidity = document.createElement("p");

                $forecastCard.classList = "forecast-card col";
                $date.textContent = (date);
                $icon.setAttribute("src",`https://openweathermap.org/img/wn/${icon}@2x.png`);
                $icon.setAttribute("alt",`weather icon`);
                $temp.textContent = ("temp: "+temp);
                $wind.textContent = ("wind: "+wind);
                $humidity.textContent = ("humidity: "+humidity);

                $forecastCard.appendChild($date);
                $forecastCard.appendChild($icon);
                $forecastCard.appendChild($temp);
                $forecastCard.appendChild($wind);
                $forecastCard.appendChild($humidity);

                $forecastCardContainer.appendChild($forecastCard);
            }
        })
    })
}

updateHistoryButtons();
$searchForm.addEventListener("submit",formSubmitHandler);
$historyButtonsContainer.addEventListener("click",buttonClickHandler);

