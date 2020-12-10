var aud2 = document.getElementById("rain");
var btnSpeak = document.querySelector('#center');
var synth = window.speechSynthesis;
var voices = [];

$(function(){
    var welcomeSection = $('.welcome-section'),
    enterButton = welcomeSection.find('.enter-button');
    
    setTimeout(function() {
        welcomeSection.removeClass('content-hidden');
    }, 500);
    
    enterButton.on('click', function(e) {
        document.getElementById("start").play()
        e.preventDefault();
        welcomeSection.addClass('content-hidden').fadeOut();
    });
                
                
})();

function run() {
    getLocation();
}

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

            speak(tempFahrenheit);
        });

}

if(speechSynthesis !== undefined){
    speechSynthesis.onvoiceschanged = PopulateVoices;
}

function speak(tempFahrenheit) {
    var toSpeak = new SpeechSynthesisUtterance("The weather right now is " + tempFahrenheit.toFixed(0) + "degrees");
    var selectedVoiceName = "Google UK English Female";
    voices.forEach((voice)=>{
        if(voice.name === selectedVoiceName){
            toSpeak.voice = voice;
        }
    });
    synth.speak(toSpeak);
    
};

function PopulateVoices(){
    voices = synth.getVoices();
}
