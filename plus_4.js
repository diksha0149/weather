let now = new Date();
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let week_day = day[now.getDay()];
let min = now.getMinutes();
let hr = now.getHours();
let h2 = document.querySelector("#time");
h2.innerHTML = `${week_day} ${hr}:${min}`;
let search = document.querySelector("#bttn");

function change(event) {
    event.preventDefault();
    let city = document.querySelector("#place_name").value;
    
    let a2 = document.querySelector("#city_name");
    a2.innerHTML = city;
    let apikey = "e06d37c769b284a84a2351c1e02078e7";
    let apiurl = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + apikey + "&units=metric";
    function showTemperature(response) {
        let temperature = document.querySelector(".tt");
        let weather = document.querySelector("#type");
        temperature.innerHTML = response.data.main.temp;
        
         weather.innerHTML = response.data.weather[0].main;
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

