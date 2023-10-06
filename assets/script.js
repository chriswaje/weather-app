var apiKey = '7250a43617c69b61b6613477b82988bd';
var citiesListEl = document.querySelector('.cities-list');
var citySearchEl = document.querySelector('.search-city')
var searchBtnEl = document.querySelector('.search-button');
var cityInput = document.querySelector('input');
var currentCity = document.querySelector('.current-city');
var citiesBtnList = JSON.parse(localStorage.getItem('city')) || [];


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


function displayCurrentWeather(data) {
    document.querySelector('.current-city').textContent = data.name;
}

function displayForecast(list) {
    for (i = 7; i < list.length; i += 8) {
        var card = document.createElement('div');
        card.classList.add('future-card');
        var date = document.createElement('h3');
        date.textContent = dayjs.unix(list[i].dt).format('MM/DD/YY');
        var icon = document.createElement('img');
        icon.src = `https://openweathermap.org/img/w/${list[i].weather[0].icon}.png`;
        card.append(date, icon);
        document.querySelector('.future-forecast').append(card);
    }
}


function handleSearchSubmit (e) {
    fetchWeather(citiesBtnList);
    citiesBtnList.push(cityInput.value);
    localStorage.setItem('city', JSON.stringify(citiesBtnList));
    displayCities();
}

function handleCitiesListSubmit (e) {
  if (!e.target.matches ('.cities-Btn')) {
    return
  } 
  fetchWeather(e.target.textContent)
}


searchBtnEl.addEventListener('click', handleSearchSubmit)
citiesListEl.addEventListener('click', handleSearchSubmit )

function displayCities() {

    for (i = 0; i < citiesBtnList.length; i++) {
        var citiesBtn = document.createElement('button');
        citiesBtn.append(citiesBtnList[i]);
        citiesBtn.classList.add('cities-Btn');
        citiesListEl.append(citiesBtn)
    }
}

displayCities();

