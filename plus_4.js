var input = document.getElementsByClassName("place")[0];
var clickbutt;
input.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
   event.preventDefault();
   document.getElementById("bttn").click();
    clickbutt = true;
  }
});



let now = new Date();
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let week_day = day[now.getDay()];
let min = now.getMinutes();
let hr = now.getHours();
let h2 = document.querySelector("#time");
h2.innerHTML = `${week_day} ${hr}:${min}`;
let search = document.querySelector("#bttn");

let wind = document.getElementById("wind");
let prec = document.getElementById("prec");
let huma = document.getElementById("huma");

function formatDate(timestamp){
   let date = new Date(timestamp*1000);
   let day =date.getDay();
   let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
   return days[day];
}

function displayforecast(response){
    let forecast  = response.data.daily;
    let forecastElement = document.querySelector(".half");
    var k=0;
    let forecastHTML = "";
    forecast.forEach(function(forecastday, index){
        if(index>=1 && index<7){
       forecastHTML =
         forecastHTML  +  `<div class="img-container">
        <div id="nme" style="position: absolute;">${formatDate(forecastday.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastday.weather[0].icon}@2x.png" id="clouds" >
        <div id="long"><span id="max">${Math.round(forecastday.temp.max)} &#176;</span>/     <span id="min">    ${Math.round(forecastday.temp.max)}&#176;</span></div>
        <div id="image"></div>
        </div>`;
       
        k++; 
        }
    });
    forecastElement.innerHTML = forecastHTML;
}


function getforecast(coordinates){
    let apikey = "e06d37c769b284a84a2351c1e02078e7";
    let forecastapi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
    axios.get(forecastapi).then(displayforecast);
}


function change(event) {
    event.preventDefault();
    let city = document.querySelector("#place_name").value;
    searchCity(city);
  }
  
  function showTemperature(response) {
    let temperature = document.querySelector(".tt");
    let weather = document.querySelector("#type");
    let a2 = document.querySelector("#city_name");
  
    a2.innerHTML = response.data.name;
    temperature.innerHTML = Math.round(response.data.main.temp);
    console.log(response);
    weather.innerHTML = response.data.weather[0].main;
    huma.innerHTML = response.data.main.humidity;
    console.log(response.data.main.humidity);
    wind.innerHTML = response.data.wind.speed;
    getforecast(response.data.coord);
  }
  
  function searchCity(city) {
    let apikey = "e06d37c769b284a84a2351c1e02078e7";
    let apiurl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apikey +
      "&units=metric";
    axios.get(apiurl).then(showTemperature);
  }
  
  searchCity("Indore");



function far(event) {
    if (clickbutt === true) {
        event.preventDefault();
        let fare = document.querySelector(".tt");
        let temperature = fare.innerHTML;
        let ftemp = 32 + 1.8 * temperature;
        ftemp = Math.round(ftemp);
        fare.innerHTML = ftemp;
        clickbutt = false;
    }
}
let cel = document.querySelector(".tt");
let celsius = cel.innerHTML;

function cels(event) {
    if (clickbutt === false) {
        event.preventDefault();
        let cel = document.querySelector(".tt");
        let celsius = cel.innerHTML;
        console.log(celsius);
        celsius = (celsius - 32) * (5 / 9);
        celsius = Math.round(celsius);
        cel.innerHTML = celsius;
        clickbutt = true;
    }
}
search.addEventListener("click", change);
let farenchange = document.querySelector("#faren");
farenchange.addEventListener("click", far);
let celschange = document.querySelector("#cel");
celschange.addEventListener("click", cels);
