var apiKey = '7250a43617c69b61b6613477b82988bd';
var citiesListEl = document.querySelector('.cities-list');
var citySearchEl = document.querySelector('.search-city')
var searchBtnEl = document.querySelector('.search-button');
var cityInput = document.querySelector('input');
var citiesBtnList = JSON.parse(localStorage.getItem('city')) || [];


fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${apiKey}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })







searchBtnEl.addEventListener('click', function (event) {
    event.preventDefault();
    citiesBtnList.push(cityInput.value);
    localStorage.setItem('city', JSON.stringify(citiesBtnList));
    location.reload();
})


function displayCities() {

    for (i = 0; i < citiesBtnList.length; i++) {
        var citiesBtn = document.createElement('button');
        citiesBtn.append(citiesBtnList[i]);
        citiesListEl.append(citiesBtn)
    }
}

displayCities();