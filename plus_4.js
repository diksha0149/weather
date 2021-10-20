var images = ['15.jpg', '16.jpg', '17.jpg', '18.jpg'];
var name1 = ["abcd", "bcde", "efgh", "ijkl"];
var i = 0;
function slideshow() {

    document.getElementById('image').src = images[i];
    document.getElementById('nme').innerHTML = name1[i];
    if (i < images.length - 1) {
        i++;
    }
    else {
        i = 0;
    }
    setTimeout('nme',2050);
    setTimeout("slideshow()", 2000);
}

window.onload = slideshow;


let now = new Date();
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let week_day = day[now.getDay()];
let min = now.getMinutes();
let hr = now.getHours();
let h2 = document.querySelector("#time");
h2.innerHTML = `${week_day} ${hr}:${min}`;
let search = document.querySelector("#bttn");
let clouds = document.getElementById("clouds");
let wind = document.getElementById("wind");
let prec = document.getElementById("prec");
let huma = document.getElementById("huma");

function dailyforecast(response){
      console.log( response.data.weather[0].main);
    //  let x = response.data.weather[0].main;
    //   if(x=="Clear"){
    //     image.setAttribute("src", `clearsky.jpg`);
    //   }
    //   else  if(x=="Haze"){
    //     image.setAttribute("src", `haze.jpg`);
    //   }
    //   else  if(x=="Cloud"){
    //     image.setAttribute("src", `clouds.jpg`);
    //   }
    //   else  if(x=="Rain"){
    //     image.setAttribute("src", `rain.jpg`);
    //   }
    //   else  if(x=="Thunderstorm"){
    //     image.setAttribute("src", `16.jpg`);
    //   }
    //   else  if(x=="Snow"){
    //     image.setAttribute("src", `snow.jpg`);
    //   }

}

function getforecast(response){
    let lon=response.data.coord.lon;
    let lat=response.data.coord.lat;
    let apikey = "e06d37c769b284a84a2351c1e02078e7";
    let forecastapi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
    axios.get(forecastapi).then(dailyforecast);
}


function change(event) {
    event.preventDefault();
    let city = document.querySelector("#place_name").value;
    city = city.toUpperCase();
    let a2 = document.querySelector("#city_name");
    a2.innerHTML = city;
    let apikey = "e06d37c769b284a84a2351c1e02078e7";
    let apiurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=metric";
    function showTemperature(response) {
        let temperature = document.querySelector(".tt");
        let weather = document.querySelector("#type");
        let imgicon = response.data.weather[0].icon;
        // clouds.setAttribute("src", `http://openweathermap.org/img/wn/${imgicon}@2x.png`);
        temperature.innerHTML = Math.round(response.data.main.temp);
        console.log(response);
        weather.innerHTML = response.data.weather[0].main;
        huma.innerHTML = response.data.main.humidity;
        console.log(response.data.main.humidity);
        wind.innerHTML = response.data.wind.speed;
        getforecast(response);
       
    }
    axios.get(apiurl).then(showTemperature);
}

let clickbutt = true;

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


