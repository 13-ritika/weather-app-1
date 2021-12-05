const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const timezone = document.getElementById('time-zone');

var card=document.getElementById('card');
let country = document.querySelector("#country");
let city = document.querySelector("#city");
let check = document.querySelector("#check");

let tempIcon = document.querySelector("#tempIcon");
let weaCountry = document.querySelector("#weaCountry");
let temperature = document.querySelector("#temperature");
let weaDes = document.querySelector("#weaDes");

let feelslike = document.querySelector("#feelslike");
let humidity = document.querySelector("#humidity");
let longitude = document.querySelector("#longitude");
let latitude = document.querySelector("#latitude");
let temp_max = document.querySelector("#temp_max");
let temp_min = document.querySelector("#temp_min");



const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
setInterval( () => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour%12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeE1.innerHTML= (hoursIn12HrFormat <10? '0'+ hoursIn12HrFormat : hoursIn12HrFormat )+ ':' + (minutes <10 ? '0'+minutes:minutes) +' ' + `<span id="am-pm">${ampm}</span>`
    dateE1.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
},1000);
check.addEventListener("click", ()=> {
    var isValid=true;
    console.log(country.value);
    console.log(city.value);
    if(country.value==="" || city.value===""){
        alert("Enter Valid City/Country");
        isValid=false;
    }
    if(isValid===true){
    const key = `74fdc21ac18ca601e418098244eea12c`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value},${country.value}&lang=en&units=metric&appid=${key}`;
    
    fetch(url).then(response =>{
        return response.json();
    }).then(data =>{
        console.log(data);
        weaCountry.innerHTML = `${data.name}, ${data.sys.country}`;
        temperature.innerHTML = `${data.main.temp}° C`;
        feelslike.innerHTML = "Feels Like: " + `${data.main.feels_like}`;
        humidity.innerHTML = "Humidity: " +`${data.main.humidity}`;
        temp_max.innerHTML = "Max Temp: " +`${data.main.temp_max}`;
        temp_min.innerHTML = "Min Temp: " +`${data.main.temp_min}`;
        let latitude2 = `${data.coord.lat}`;
        let longitude2 = `${data.coord.lon}`;

        data.weather.forEach(items=> {
            weaDes.innerHTML= items.description;

            let iconsForTemp = `http://openweathermap.org/img/wn/${items.icon}@4x.png`;
            tempIcon.src = iconsForTemp; 
        })
        /*console.log(data.coord.lat);
        console.log(data.coord.lon);
        fetch( `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely&units=metric&appid=${key}`).then(respose =>{
            return respose.json();
        }).then(data =>{
            console.log(data);
            let otherDayForecast = ''
        })*/
        card.style.background= "rgb(24, 24, 27,0.6);";  
    })
  }
})
