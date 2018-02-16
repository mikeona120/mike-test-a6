 //------- VARIABLES -------//

 /* // timer settings
  var data = {
  "productivity": {
      "minutes": "00",
      "seconds": "00"
    }, 
  "downtime": {
      "minutes": "20",
      "seconds": "00"
    }
}

// var data = require('../../data.json');
  // alert(data.productivity.minutes);
  var productiveTime = document.getElementById('productiveTime');
  var productiveMin = data.productivity.minutes;
  var productiveSec = data.productivity.seconds;
  var timer = document.getElementById('timer');
  var DowntimeMin = data.downtime.minutes; // replace later with downtime sliders
  var DowntimeSec = data.downtime.seconds;

  // check for inactivity
  var isActive;
  var start = 0;
  var end = 0;
  var checkPage, checkEnd, onPage, offPage;
  var elapsed, elapsedSeconds, elapsedMinutes;*/
  


    //------- TIMERS -------//
  /*   // Productivity Timer
    if(productiveTime != null){
      productiveTime.innerHTML = productiveMin + ":" + productiveSec;
      startPTimer();
    }

      // Downtime Timer
      if(timer != null){
        timer.innerHTML = DowntimeMin + ":" + DowntimeSec;
      }

  // start productivity timer from 0
  function startPTimer() {
    var presentTime = document.getElementById('productiveTime').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = parseInt(timeArray[0]);
    var s = checkSecond(parseInt(timeArray[1]) + 1);
    if(s == 59) { 
      s = 00;
      m = m + 1;
    }
    document.getElementById('productiveTime').innerHTML = m + ":" + s;
    
    data.productivity.minutes = m;
data.productivity.seconds = s;
data.downtime.minutes = DowntimeMin.toString();
data.downtime.seconds = DowntimeSec.toString();
   alert(data.productivity.minutes);
    setTimeout(startPTimer, 1000);
  }

  // fix formatting of timers
  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
  }

  // update timers with new values
 function updateTimers() {     // FIX PRODUCTIVITY TIMER VALUES LATER (always increments a little bit, even while off tab)
    productiveMin = parseInt(productiveMin) - elapsedMinutes;
    productiveSec = parseInt(productiveSec) - elapsedSeconds;
    DowntimeMin = parseInt(DowntimeMin) - elapsedMinutes;
    DowntimeSec = parseInt(DowntimeSec) - elapsedSeconds;

  // fix formatting of time
  if (DowntimeSec < 0) {
    DowntimeSec = DowntimeSec + 60;
    DowntimeMin = DowntimeMin - 1;
  } else if (DowntimeSec < 10 && DowntimeSec > 0) {
    DowntimeSec = "0" + DowntimeSec.toString();
  } else if (productiveSec < 0) {
    productiveSec = productiveSec + 60;
    productiveMin = productiveMin - 1;
  } else if (productiveSec < 10 && productiveSec > 0) {
    productiveSec = "0" + productiveSec.toString();
  }

  // set new time values
  if(timer != null) {
    timer.innerHTML = DowntimeMin.toString() + ":" + DowntimeSec.toString();
  } else if (productiveTime != null) {
    productiveTime.innerHTML = productiveMin.toString() + ":" + productiveSec.toString();
    startPTimer();
  }
  } 

  // if downtime is negative, set alarms!!
function checkDowntime() {
  if (DowntimeMin < 0) {
    alert("You've goofed off long enough!");
  }
}*/


function startTimer() { // Jackie's countdown
var presentTime = document.getElementById('timer').innerHTML;
var timeArray = presentTime.split(/[:]+/);
var m = parseInt(timeArray[0]);
var s = parseInt(timeArray[1]);

if(s == 0 && m > 0) { 
  m = m - 1;
  s = 59;
} 
else if(s > 0){
  s -= 1;
}

if (m == 0 && s == 0) {
  printTime(m, s, 'timer');
  playSavedAlarm();
  clearTimeout(timerCountdown);

} else {
  printTime(m, s, 'timer'); 
  timerCountdown = setTimeout(startTimer, 1000);
}
sessionStorage.setItem("downtimeVal", m);
sessionStorage.setItem("downtimeValSecs", s);
}

var pTime = document.getElementById('productiveTime');
if(pTime != null){
	startPTimer();
}

// should we track total productivity? total downtime?
function startPTimer() {
  var presentTime = document.getElementById('productiveTime').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = parseInt(timeArray[0]); // change string minute to integer
  var s = parseInt(timeArray[1]) + 1;
  //hit 59 m =+1
  if(s == 60) { 
    m += 1;
    s = 0;
  }
  
  // Saves the productive time
  // TODO: fix so value is gotten from storage before the first time it is saved 
  if(s > 1){
	sessionStorage.setItem("pTimeVal", m);
	sessionStorage.setItem("pTimeValSecs", s);
}
printTime(m, s, 'productiveTime'); 
pTimerCountdown = setTimeout(startPTimer, 1000);
}


// countdown timer
var timer = document.getElementById('timer');

// links downtime slider to downtime timer
function updateTimeRange(val) {
  document.getElementById("downtime").innerHTML = val;
  sessionStorage.setItem("downtimeVal", val);
  sessionStorage.setItem("downtimeValSecs", "00");
}

if(timer != null){
  timer.innerHTML = sessionStorage.getItem("downtimeVal") + ":" + sessionStorage.getItem("downtimeValSecs");
}
if(pTime != null){
  var storedPTimeVal = sessionStorage.getItem("pTimeVal");
  var storedPTimeValSecs = sessionStorage.getItem("pTimeValSecs");
  if(storedPTimeVal != null && storedPTimeValSecs != null){
   printTime(storedPTimeVal, storedPTimeValSecs, 'productiveTime');
 }
 else{
   pTime.innerHTML = "00:00"
 }
}

function printTime(m, s, element) {
  document.getElementById(element).innerHTML = checkTimeDigit(m) + ":" + checkTimeDigit(s);
}		

function checkTimeDigit(time) {
  if (time < 10 && time >= 0) {time = "0" + time}; // add zero in front of numbers < 10
  if (time < 0) {time = "59"};
  return time;
}

    //------- CHECK ACTIVE/INACTIVE -------//

    var isActive;
    // set isActive status
    window.onfocus = function () { 
      isActive = true; 
    }; 
    window.onblur = function () { 
      isActive = false; 
    }; 

  // check if user is off tab
  offPage = function () { 
    console.log(window.isActive ? 'active' : 'inactive'); 
    // implement start of timer when user is inactive
    if ( isActive == false ) {
      start = Date.now();
      //alert("Productivity paused");
      clearTimeout(pTimerCountdown);
      startTimer();
      checkEnd = setInterval(onPage, 1000);
      clearInterval(checkPage);
    } 
  }

  // check if user has come back to tab
  onPage = function () { 
    if ( start > 0 && isActive) {
      end = Date.now();
      clearTimeout(timerCountdown);
      startPTimer();
    elapsed = (end - start) / 1000; // number of seconds away from tab
    elapsedMinutes = Math.floor(elapsed / 60);
    elapsedSeconds = Math.floor(elapsed % 60);
    // alert("Welcome back! You spent " + elapsedMinutes + " minutes and " + elapsedSeconds + " seconds off-task!");

    // update timers
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = parseInt(timeArray[0]);
    var s = parseInt(timeArray[1]);
    /**m = m - elapsedMinutes;
    s = s - elapsedSeconds;
    if(s < 0) { 
      m -= 1;
      s += 60;
    }

    printTime(m, s, 'timer');**/
    sessionStorage.setItem("downtimeVal", m);
    sessionStorage.setItem("downtimeValSecs", s);
    
    // restart checking for inactive/active tab
    clearInterval(checkEnd);
    checkPage = setInterval(offPage, 1000); 
  }
}

  // start cycle of checking for inactivity
  if(timer != null){
   checkPage = setInterval(offPage, 1000); 
 }


    //------- HELP POP-UPS -------//
    function helpStart() {
      alert("Every time you go off-task, SoundTrack will alert you at decreasing" +
        " intervals to help you stay productive and focused. To get started, simply" +
        " choose your favorite soundscape and customize the alert for your current task!");
    }

    function helpListen() {
      alert("In this screen, you can see how productive you are and how much time" +
        " you have left for your breaks. Change your current soundscape by swiping or" +
        " clicking the slider. You can customize alerts in Alert Settings at the bottom.");
    }

    function helpSettings() {
      alert("In the settings, you can change your alert sound, how much break time " +
        "you want to give yourself, and the volume of the alerts. Be as productive " +
        "as you want!");
    }

    //------- SOUNDS -----------//

    //first page sound javascript
    //soundscape
    var fallingRain = new Audio();
    var forestMorning = new Audio();
    var burningLogs = new Audio();
    var whiteNoise = new Audio();
    fallingRain.src = "../sounds/fallingRain.mp3";
    forestMorning.src = "../sounds/forestMorning.mp3";
    burningLogs.src = "../sounds/burningLogs.mp3";
    whiteNoise.src = "../sounds/whiteNoise.mp3" ;

    //alert sound
    var foghorn = new Audio();
    var beeping = new Audio();
    var siren = new Audio();
    var bells = new Audio();
    foghorn.src = "../sounds/foghorn.mp3";
    beeping.src = "../sounds/beeping.mp3";
    siren.src = "../sounds/siren.mp3";
    bells.src = "../sounds/bells.mp3";
    
    function playSavedSoundscape(){
      var soundscape = localStorage.getItem("soundscape");
      console.log (soundscape);
      soundEffect(soundscape);
    }
    function playSavedAlarm(){
      var alarmSound = localStorage.getItem("alarm");
      console.log (alarmSound);
      soundEffect(alarmSound);
    }
    function soundEffect(num)
    {
      // if audio is playing, pause it first
      if (!fallingRain.paused || !forestMorning.paused || !burningLogs.paused || !whiteNoise.paused || !foghorn.paused || !beeping.paused || !siren.paused || !bells.paused) {
        fallingRain.pause();
        forestMorning.pause();
        burningLogs.pause();
        whiteNoise.pause();
        foghorn.pause();
        beeping.pause();
        siren.pause();
        bells.pause();
        console.log ("paused");
      }
	  // Save the soundscape or alarm selection
	  if(num >= 1 && num <= 4){
      localStorage.setItem("soundscape", num);
    }
    else{
      localStorage.setItem("alarm", num);
    }
      //play the song is clicked
      if (num == 1) {
        console.log("hi");
        fallingRain.play();
      }
      else if (num == 2) {
        console.log("hi2");
        forestMorning.play();
      }
      else if (num == 3){
        console.log("hi3");
        burningLogs.play();
      }
      else if(num == 4){
        console.log("hi4");
        whiteNoise.play();
      }
      else if(num == 5){
        console.log("hi4");
        foghorn.play();
      }
      else if(num == 6){
        console.log("hi4");
        beeping.play();
      }
      else if(num == 7){
        console.log("hi4");
        siren.play();
      }
      else if(num == 8){
        console.log("hi4");
        bells.play();
      }

      
      //show which song is selected
      var div1 = document.getElementById("div1");
      if(div1 != null){
        div1.innerHTML = "You selected "+num;
      }
    }


//Scrolling for Soundscape
$(function(){
  var isDown = false, currentX = 0, currentY = 0;

  $('#scroll1').mousemove(function(event){
    if(isDown === true){
     //$('#scroll1').scrollTop($('#scroll1').scrollTop() + (currentY - event.pageY)); 
     $('#scroll1').scrollLeft($('#scroll1').scrollLeft() + (currentX - event.pageX));
     currentY = event.pageY;
     currentX = event.pageX;
   }
 });
  
  $('#scroll1').mousedown(function(event){
    isDown = true;
    currentY = event.pageY;
    currentX = event.pageX;
  });
  
  $('#scroll1').mouseup(function(){
    isDown = false;
  });


})

//Scrolling for Alert sound
$(function(){
  var isDown = false, currentX = 0, currentY = 0;
  $('#scroll2').mousemove(function(event){
    if(isDown === true){
     //$('#scroll2').scrollTop($('#scroll2').scrollTop() + (currentY - event.pageY)); 
     $('#scroll2').scrollLeft($('#scroll2').scrollLeft() + (currentX - event.pageX));
     currentY = event.pageY;
     currentX = event.pageX;

   }
 });
  
  $('#scroll2').mousedown(function(event){
    isDown = true;
    currentY = event.pageY;
    currentX = event.pageX;
  });
  
  $('#scroll2').mouseup(function(){
    isDown = false;
  });
})

$('.scape').click( function() {
  $('.scape').removeClass( "active" );
  $( this ).addClass( "active" );
});

$('.alarm').click( function() {
  $('.alarm').removeClass( "active" );
  $( this ).addClass( "active" );
});

