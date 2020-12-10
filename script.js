var aud2 = document.getElementById("rain");
var sunnyDay = document.getElementById("sunnyDay");
var cricketsSound = document.getElementById("crickets");
var thunderSound = document.getElementById("thunder");
var ominousSound = document.getElementById("ominous");
var startSound = document.getElementById("start");
var synth = window.speechSynthesis;
var voices = [];
var today = new Date();
var day;
var month;
var amORpm;
var hours;

//Function for bringing in the welcome screen
$(function(){
    var welcomeSection = $('.welcome-section'),
    enterButton = welcomeSection.find('.enter-button');
    
    setTimeout(function() {
        welcomeSection.removeClass('content-hidden');
    }, 500);
    
    enterButton.on('click', function(e) {
        startSound.play()
        e.preventDefault();
        welcomeSection.addClass('content-hidden').fadeOut();
        welcomeSpeech(hours, amORpm);
    });                
})();

//Function that displays the time along with the date
function date() {
  //Switch statement that converts the number day to the real day
  switch (new Date().getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case  6:
      day = "Saturday";
  }
  //Switch statement that converts the month number to the real month
  switch (new Date().getMonth()) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case  6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }
  //Switch statement that converts 23 hour days to 12 hour days
  switch (new Date().getHours()) {
    case 0:
      hours = 12;
      break;
    case 1:
      hours = 1;
      break;
    case 2:
      hours = 2;
      break;
    case 3:
      hours = 3;
      break;
    case 4:
      hours = 4;
      break;
    case 5:
      hours = 5;
      break;
    case 6:
      hours = 6;
      break;
    case 7:
      hours = 7;
      break;
    case 8:
      hours = 8;
      break;
    case 9:
      hours = 9;
      break;
    case 10:
      hours = 10;
      break;
    case 11:
      hours = 11;
      break;
    case 12:
      hours = 12;
      break;
    case 13:
      hours = 1;
      break;
    case 14:
      hours = 2;
      break;
    case 15:
      hours = 3;
      break;
    case 16:
      hours = 4;
      break;
    case 17:
      hours = 5;
      break;
    case 18:
      hours = 6;
      break;
    case 19:
      hours = 7;
      break;
    case 20:
      hours = 8;
      break;
    case 21:
      hours = 9;
      break;
    case 22:
      hours = 10;
      break;
    case 23:
      hours = 11;
      break;
  }
  
  if (new Date().getHours() > 11) {
    amORpm = "PM";
  }
  else {
    amORpm = "AM";
  }

  if (new Date().getHours() >= 0) {
    evening();
  }

  if (new Date().getHours() >= 4) {
    overcast();
  }

  if (new Date().getHours() >= 6) {
    sunrise();
  }

  if (new Date().getHours() >= 8) {
    blueSky();
  }

  if (new Date().getHours() >= 17) {
    evening();
  }

  var time = hours + ":" + addZero(new Date().getMinutes());
  document.getElementById("time").innerHTML = time + " " + amORpm;
  document.getElementById("date").innerHTML = day + ", " + month + " " + new Date().getDate();
}

//Function that adds a zero before the minutes if minutes is less than 10
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}


function run() {
  getLocation();
}

//Function that gets the users longitude and latitude
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(weatherAPI);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

//Function that uses the longitude and latitude from getLocation() and calls openWeather API and gets the current weather
function weatherAPI(position) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=7f1759c88a7dded2a4f0d123937ba813')
        .then(response => response.json())
        .then(data => {
            currentTemp = data.main;
            currentLocation = data.name;
            description = data.weather[0];
            wind = data.wind;
            var pressure = currentTemp.pressure;
      
            var pressureHg = (pressure / 3386) * 100;
            var tempHigh = (currentTemp.temp_max)* 9/5 - 459.67;
            var tempLow = (currentTemp.temp_min)* 9/5 - 459.67;
            var tempFahrenheit = (currentTemp.temp) * 9/5 - 459.67;
            var feelsLike = (currentTemp.feels_like) * 9/5 - 459.67;
            var description = description.description;

            document.getElementById("locationP").innerHTML = currentLocation;
            document.getElementById("descriptionP").innerHTML = description.charAt(0).toUpperCase() + description.slice(1);
            document.getElementById("tempP").innerHTML = tempFahrenheit.toFixed(0) + String.fromCharCode(176);
            document.getElementById("hiLoP").innerHTML = "H:" + tempHigh.toFixed(0) + String.fromCharCode(176) + " " + "L:" + tempLow.toFixed(0) + String.fromCharCode(176);
            document.getElementById("wind").innerHTML = "WIND";
            document.getElementById("windSpeed").innerHTML = wind.speed + " mph";
            document.getElementById("feelsLike").innerHTML = "FEELS LIKE";
            document.getElementById("feelsLikeTemp").innerHTML = feelsLike.toFixed(0) +String.fromCharCode(176);
            document.getElementById("humidity").innerHTML = "HUMIDITY";
            document.getElementById("humidityPercent").innerHTML = currentTemp.humidity + "%";
            document.getElementById("pressure").innerHTML = "PRESSURE";
            document.getElementById("pressureAmt").innerHTML = pressureHg.toFixed(2) + " inHg";

            if (new Date().getHours() >= 5 && tempFahrenheit <= 85 && tempFahrenheit >= 60) {
              playSunnyDay();
            }
            if (new Date().getHours() >= 19) {
              playCrickets();
              playOminous();
            }
            if (new Date().getHours() >= 0 && new Date().getHours() <= 4) {
              playCrickets();
              playOminous();
            }

            if (new Date().getHours() >= 7 && tempFahrenheit <= 59) {
              playOminous();
            }

            if (tempFahrenheit >= 0 && tempFahrenheit <= 70) {
              coldWeather();
            }

            if (tempFahrenheit >= 71 && tempFahrenheit <= 90) {
              niceWeather();
            }

            speak(tempFahrenheit, tempHigh, tempLow, description);
        });

}

PopulateVoices();

if(speechSynthesis !== undefined){
  speechSynthesis.onvoiceschanged = PopulateVoices;
}

//Function that takes the weather parameters and tells the user the current weather conditions 
function speak(tempFahrenheit, tempHigh, tempLow, description) {
  var timeOfDay = new Date().getHours();
  var toSpeak;

  if (timeOfDay >= 0) {
    toSpeak = new SpeechSynthesisUtterance("It is " + description + "currently. The weather right now is " + tempFahrenheit.toFixed(0) + "degrees, with the high today being" + tempHigh.toFixed(0) + "degrees and a low of" + tempLow.toFixed(0) + "degrees");
  }
  if (timeOfDay >= 12) {
    toSpeak = new SpeechSynthesisUtterance("The weather right now is " + tempFahrenheit.toFixed(0) + "degrees, with the high today being" + tempHigh.toFixed(0) + "degrees and a low of" + tempLow.toFixed(0) + "degrees");
  }
  if (timeOfDay >= 18) {
    toSpeak = new SpeechSynthesisUtterance("It is " + description + "currently. The weather right now is " + tempFahrenheit.toFixed(0) + "degrees");
  }
  
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

function sunrise() {
    document.body.style.backgroundImage = "url('sunrise.jpg')";
}

function sunset() {
  document.body.style.backgroundImage = "url('sunset.jpg')";
}

function evening() {
  document.body.style.backgroundImage = "url('evening.jpg')";
}

function blueSky() {
  document.body.style.backgroundImage = "url('blueSky.jpg')";
}

function overcast() {
  document.body.style.backgroundImage = "url('overcast.jpg')";
}

function playSunnyDay() {
  sunnyDay.play();
}

function playCrickets() {
  cricketsSound.play();
}

function playThunder() {
  thunderSound.play();
}

function playOminous() {
  ominousSound.play();
}


//Function that welcomes the user to the Ambient Interface
function welcomeSpeech() {
  var timeOfDay = new Date().getHours();
  var toSpeak;

  if (timeOfDay >= 0) {
    toSpeak = new SpeechSynthesisUtterance("Good morning, I am Jarvis, please click the Get Weather button and I will tell you the weather conditions for the day");
  }
  if (timeOfDay >=12) {
    toSpeak = new SpeechSynthesisUtterance("Good afternoon, I am Jarvis, please click the get weather button and I will tell you the weather conditions for the day");
  }
  if (timeOfDay >= 18) {
    toSpeak = new SpeechSynthesisUtterance("Good evening, I am Jarvis, please click the get weather button and I will tell you the weather conditions tonight");
  }
  
  var selectedVoiceName = "Google UK English Female";
    
  voices.forEach((voice)=>{
    if(voice.name === selectedVoiceName){
    toSpeak.voice = voice;
    }
  });
    synth.speak(toSpeak);
};

function coldWeather() {
  var toSpeak = new SpeechSynthesisUtterance("You may want a jacket.");
  var selectedVoiceName = "Google UK English Female";

  voices.forEach((voice)=>{
    if(voice.name === selectedVoiceName){
    toSpeak.voice = voice;
    }
  });
  synth.speak(toSpeak);
}

function niceWeather() {
  var toSpeak = new SpeechSynthesisUtterance("It is a beautiful day.");
  var selectedVoiceName = "Google UK English Female";

  voices.forEach((voice)=>{
    if(voice.name === selectedVoiceName){
    toSpeak.voice = voice;
    }
  });
  synth.speak(toSpeak);
}

function playRain() {
  aud2.play();
}
