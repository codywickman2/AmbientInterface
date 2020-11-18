function weatherAPI() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Fresno,us&appid=7f1759c88a7dded2a4f0d123937ba813')
        .then(response => response.json())
        .then(data => {
            var weather = document.getElementById("weather")
            weather.innerHTML=""
            currentTemp = data.main;

            var tempFahrenheit = (currentTemp.temp) * 9/5 - 459.67
            var p = document.createElement('p')
            var tNode = document.createTextNode(tempFahrenheit.toFixed(1))
            p.appendChild(tNode)
            weather.appendChild(p)

            if (currentTemp.humidity > 50) {
                var sound = document.getElementById("rain");
                sound.play()
            }
        })

}
