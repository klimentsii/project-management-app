import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }
}

getWeather$(weatherIcon, temperature, weatherDescription, wind, humidity, weatherError, city, language) {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=8347508b97f54d3010dc41640bfaf498&units=metric`;
  let res = await fetch(url);
  if (res.status !== 200) {
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    wind.textContent = ``
    humidity.textContent = ``
    if (language === 'ru')
      weatherError.textContent = city.value === ''
        ? `Ошибка! Город не указан !`
        : `Ошибка! Город "${city.value}" не найден !`;

    if (language === 'en')
      weatherError.textContent = city.value === ''
        ? `Error! Nothing to geocode for " !`
        : `Error! city not found for "${city.value}" !`;
  } else {
    weatherError.textContent = ``;
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;

    if (language === 'ru'){
      wind.textContent = `Сокрость ветра: ${Math.floor(data.wind.speed)} м/с`
      humidity.textContent = `Влажность: ${Math.floor(data.main.humidity)} %`
    }
    if (language === 'en') {
      wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`
      humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)} %`
    }
  }
}


https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&appid=f93420917733752d142e1edb13bd9691&units=metric
