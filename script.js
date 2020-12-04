function run() {
    getLocation();
}

function date() {
    var dt = new Date();
    document.getElementById("datetime").innerHTML = dt.toLocaleTimeString();
    
    if (dt.toLocaleTimeString() > "6:00") {
        var x = document.getElementById("pp");
        x.innerHTML = "Good Evening";
    }
}

var x = document.getElementById("lat");
var aud = document.getElementById("rain");

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(weatherAPI);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

function weatherAPI(position) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=7f1759c88a7dded2a4f0d123937ba813')
        .then(response => response.json())
        .then(data => {
            var weather = document.getElementById("weather")
            weather.innerHTML=""
            currentTemp = data.main;

            var tempFahrenheit = (currentTemp.temp) * 9/5 - 459.67;
            var p = document.createElement('p')
            var tNode = document.createTextNode(tempFahrenheit.toFixed(0))
            p.appendChild(tNode)
            weather.appendChild(p)

            if (tempFahrenheit > 40) {
                aud.play();
            }
        })
}
