var apiKey = '7250a43617c69b61b6613477b82988bd';
var citiesListEl = document.querySelector('.cities-list');
var citySearchEl = document.querySelector('.search-city')
var searchBtnEl = document.querySelector('.search-button');
var cityInput = document.querySelector('input');
var currentCity = document.querySelector('.current-city');
var currentDisplay = document.querySelector('.current-forecast');
var futureDisplay = document.querySelector('.future-forecast')
var citiesBtnList = JSON.parse(localStorage.getItem('city')) || [];


// function to fetch weather by city name and then by longitude/latitude
function fetchWeather (city) {
fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        displayCurrentWeather(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data5) {
            console.log(data5);
            displayForecast(data5.list)
        })
    })
}


// function to display the current weather using first fetch request
function displayCurrentWeather(data) {
    document.querySelector('.current-city').textContent = data.name;
    var card = document.createElement('div');
    card.classList.add('current-card');
    var icon = document.createElement('img');
    icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    var temp = document.createElement('p');
    temp.textContent = `Temp: ${data.main.temp}`;
    var wind = document.createElement('p');
    wind.textContent = `Wind: ${data.wind.speed}`;
    var humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    card.append(icon, temp, wind, humidity);
    document.querySelector('.current-cast').append(card);

}

// function to display the forecast for next 5 days using second fetch request
function displayForecast(list) {
    for (i = 7; i < list.length; i += 8) {
        var card = document.createElement('div');
        card.classList.add('future-card');
        var date = document.createElement('h3');
        date.textContent = dayjs.unix(list[i].dt).format('MM/DD/YY');
        var icon = document.createElement('img');
        icon.src = `https://openweathermap.org/img/w/${list[i].weather[0].icon}.png`;
        var temp = document.createElement('p');
        temp.textContent = `Temp: ${list[i].main.temp}`;
        var wind = document.createElement('p');
        wind.textContent = `Wind: ${list[i].wind.speed}`;
        var humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${list[i].main.humidity}%`;
        card.append(date, icon, temp, wind, humidity);
        document.querySelector('.future-forecast').append(card);
    }
}

// displays the current weather of last searched city
function handleSearchSubmit (e) {
    document.querySelector('.current-cast').setHTML('');
    document.querySelector('.future-forecast').setHTML('');
    citiesBtnList.push(cityInput.value);
    localStorage.setItem('city', JSON.stringify(citiesBtnList));
    fetchWeather(cityInput.value);
    cityInput.value = '';
}


searchBtnEl.addEventListener('click', handleSearchSubmit);


