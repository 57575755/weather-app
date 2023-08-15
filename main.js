/* https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} *|
/* dcf5a1e1e5fa1888de50f5a9a0600a62 */
/* https://api.openweathermap.org/data/2.5/weather?q=London&appid=dcf5a1e1e5fa1888de50f5a9a0600a62&units=metric */

const apiKey = "dcf5a1e1e5fa1888de50f5a9a0600a62";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search');
const searchBtn = document.querySelector('.submit');
const weatherIcon = document.querySelector('.current-weather-icon')
const image = document.querySelector('.bg-image')


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404)  {
        document.querySelector('.error').style.display = 'block'

        document.querySelector('.humidity').style.display = 'none'
    document.querySelector('.humidity-icon').style.display = 'none'
        document.querySelector('.wind').style.display = 'none'
        document.querySelector('.wind-icon').style.display = 'none'
        document.querySelector('.current-weather-icon').style.display = 'none'
        document.querySelector('.city').style.display = 'none'
        document.querySelector('.temp').style.display = 'none' 
    } else {
        document.querySelector('.error').style.display = 'none'
        document.querySelector('.wind').style.display = 'block'
    document.querySelector('.wind-icon').style.display = 'block'
    document.querySelector('.current-weather-icon').style.display = 'block'
    document.querySelector('.city').style.display = 'block'
    document.querySelector('.temp').style.display = 'block' 
    document.querySelector('.humidity').style.display = 'block'
    document.querySelector('.humidity-icon').style.display = 'block'
        var data2 = await response.json();
        console.log(data2)

    const date = new Date();
    const timeZone = data2.timezone; 
    const currentTimeInSeconds = Math.floor(date.getTime() / 1000); 
    const newDateInSeconds = currentTimeInSeconds + timeZone;  

    const sunrise = data2.sys.sunrise + timeZone;
    const sunset = data2.sys.sunset + timeZone; 

    const currentTemp = data2.main.temp

    const moreThan0 = (0 < currentTemp)
    
    const isDayTime = (newDateInSeconds >= sunrise && newDateInSeconds <= sunset);

    document.querySelector('.city').innerHTML = data2.name;
    document.querySelector('.temp').innerHTML = Math.round(data2.main.temp) + '&#176C';
    document.querySelector('.wind').innerHTML = data2.wind.speed + 'km/h';
    document.querySelector('.humidity').innerHTML = data2.main.humidity + '%';


    if (data2.weather[0].main == 'Clouds' && isDayTime) {
        weatherIcon.src = 'images/clouds.png'
        image.style.backgroundImage = 'url(photos/sunset.jpg)'
    } else if (data2.weather[0].main == 'Clouds' && !isDayTime) {
        weatherIcon.src = 'images/2.png'
        image.style.backgroundImage = 'url(photos/nightclouds.jpg)';


    } else if (data2.weather[0].main == 'Clear' && isDayTime && moreThan0) {
        weatherIcon.src = 'images/clear.png'
        image.style.backgroundImage = 'url(photos/beach.jpg)';  
    } else if (data2.weather[0].main == 'Clear' && !isDayTime) {
        weatherIcon.src = 'images/1.png'
        image.style.backgroundImage = 'url(photos/sunnynigth.jpg)';
    } else if (data2.weather[0].main == 'Clear' && isDayTime && !moreThan0) {
        weatherIcon.src = 'images/winternight.png'
        image.style.backgroundImage = 'url(photos/winterday.jpg)';
    } else if (data2.weather[0].main == 'Clear' && !isDayTime && !moreThan0) {
        weatherIcon.src = 'images/winternight.png'
        image.style.backgroundImage = 'url(photos/beach.jpg)';


    } else if (data2.weather[0].main == 'Rain' && isDayTime) {
        weatherIcon.src = 'images/rain.png';
        image.style.backgroundImage = 'url(photos/rain2.jpg)'
    } else if (data2.weather[0].main == 'Rain' && !isDayTime) {
        weatherIcon.src = 'images/nightrain.png';
        image.style.backgroundImage = 'url(photos/rain.jpg)';

    } else if (data2.weather[0].main == 'Drizzle' && isDayTime) {
        weatherIcon.src = 'images/drizzle.png';
        image.style.backgroundImage = 'url(photos/drizzle.jpg)';
    } else if (data2.weather[0].main == 'Drizzle' && !isDayTime) {
        weatherIcon.src = 'images/nightdrizzle.png';
        image.style.backgroundImage = 'url(photos/drizzle.jpg)';
    
    } else if (data2.weather[0].main == 'Mist' && isDayTime) {
        weatherIcon.src = 'images/mist.png'
        image.style.backgroundImage = 'url(photos/mist.jpg)';
    } else if (data2.weather[0].main == 'Mist' && !isDayTime) {
            weatherIcon.src = 'images/nightmist.png'
            image.style.backgroundImage = 'url(photos/mist.jpg)';

    }
    else if (data2.weather[0].main == 'Snow' && isDayTime) {
        weatherIcon.src = 'images/snow.png'
        image.style.backgroundImage = 'url(photos/snowatday.jpg)'
    }
    else if (data2.weather[0].main == 'Snow' && !isDayTime) {
        weatherIcon.src = 'images/snow.png'
        image.style.backgroundImage = 'url(photos/snow.jpg)'

    
    }
}
}

searchBtn.addEventListener('click', ()=>{
    event.preventDefault();
    checkWeather(searchBox.value);
}) 
