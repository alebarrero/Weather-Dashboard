let searchInp = document.querySelector('.weather_search');
let image = document.querySelector('.weather_image');
let city = document.querySelector('.weather_city');
let day = document.querySelector('.weather_day');
let temperature = document.querySelector('.weather_temp>.value');
let weatherAPIKey = '7a2ad495383d715575cb01f5d3b3061e';
let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=' + weatherAPIKey; 


let getWeatherByCityName = async (cityString) => {
    let city;
    if(cityString.includes(',')){
        city=cityString.substring(0, cityString.indexOf(',')) + city.String.substring(cityString.lastIndexOf(','))
    } else {
        city= cityString;
    }
    let endpoint =weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    if(response.status !==200){
        alert('City not found!');
        return;
    }
    let weather = await response.json();
    return weather; 
}
let weatherForCity = async (city) => { let weather = await getWeatherByCityName(city);
    if(!weather){
     return;
    }
    let cityID= weather.id;
   updateCurrentWeather(weather);
   let forecast = await getForecastByCityID(cityID);
   updateForecast (forecast);
}
let init= () => {
 weatherForCity('Dubai');

}
init();

searchInp.addEventListener('keydown', async (e) => {
    if(e.keyCode === 13){
        weatherForCity(searchInp.value);
       let weather = await getWeatherByCityName(searchInp.value);
       if(!weather){
        return;
       }
       let cityID= weather.id;
      updateCurrentWeather(weather);
      let forecast = await getForecastByCityID(cityID);
      updateForecast (forecast);
    }
})

let updateCurrentWeather = (data) => {
    city.textContent= data.name + ',' + data.sys.country;
    day.textContent = dayOfWeek();
}
let dayOfWeek = () => {
    return new Date().toLocaleDateString('en-EN', {'weekday':'long'})
}