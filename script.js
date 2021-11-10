
let submitBtn=document.querySelector('#subBtn')
let loginbtn=  document.querySelector('#login-container')
let otpbtn= document.querySelector('#otp-container')
let otpnum=document.querySelector('#otp')

var number=0;
submitBtn.addEventListener('click',()=>{
  var phoneno = /^\d{10}$/;
  if((document.querySelector('#inputnum').value.match(phoneno)))
  {
  let randomnum= Math.floor(Math.random()*10000);
  number=randomnum;
  alert(randomnum);
 loginbtn.style.display="none"
 otpbtn.style.display='flex'
 document.querySelector('#inputnum').style.border="2px solid green"
 warning.style.display='none';
  }
  else{
    var warning=document.createElement('span')
    warning.innerHTML="Enter Valid Number"
    document.querySelector('#inputnum').style.border="2px solid red"
    warning.style.color='red'
    document.querySelector('#inside-log').appendChild(warning)
  }
})
otpbtn.addEventListener('click',()=>{
if(otpnum.value==number)
{
  console.log(otpnum.value)
  alert("login successful");
  otpbtn.style.display='none'
  wrapper.style.display='block'
}
})
let allMusic = [
  {
    name: "Live While We're Young",
    artist: "One Direction",
    img: "music-1",
    src: "music-1"
  },
  {
    name: "Halo",
    artist: "Beyonce",
    img: "music-2",
    src: "music-2"
  },
  {
    name: "See You Again",
    artist: "Charlie Puth & Wiz khalifa",
    img: "music-3",
    src: "music-3"
  },
  {
    name: "Chellemma",
    artist: "Anirudh & Jonitha",
    img: "music-4",
    src: "music-4"
  },
  {
    name: "Srivalli",
    artist: "Sid Sriram",
    img: "music-5",
    src: "music-5"
  },
  {
    name: "We don't talk anymore",
    artist: "Charlie Puth & Selena Gomez",
    img: "music-6",
    src: "music-6"
  },
  {
    name: "Perfect",
    artist: "Ed Shreeran",
    img: "music-7",
    src: "music-7"
  },
  {
    name: "Closer",
    artist: "The ChainSmokers",
    img: "music-8",
    src: "music-8"
  },
  {
    name: "Faded",
    artist: "Alan Walker",
    img: "music-9",
    src: "music-9"
  },
  {
    name: "Night Changes",
    artist: "One Direction",
    img: "music-10",
    src: "music-10"
  },
  {
    name: "How Long",
    artist: "Charlie Puth",
    img: "music-11",
    src: "music-11"
  },
];
const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
  document.querySelector("#current-song").innerHTML=musicIndex;
  document.querySelector('#total-songs').innerHTML=allMusic.length;
  playingSong(); 
});

function loadMusic(index){
  musicName.innerText = allMusic[index - 1].name;
  musicArtist.innerText = allMusic[index - 1].artist;
  musicImg.src = `img/${allMusic[index - 1].src}.jpg`;
  mainAudio.src = `songs/${allMusic[index - 1].src}.mp3`;
  document.querySelector("#current-song").innerHTML=index;
}

//play music function
function playMusic(){
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

//pause music function
function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

//prev music function
function prevMusic(){
  musicIndex--; //decrement of musicIndex by 1
  //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

//next music function
function nextMusic(){
  musicIndex++; //increment of musicIndex by 1
  //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

// play or pause button event
playPauseBtn.addEventListener("click", ()=>{
  const isMusicPlay = wrapper.classList.contains("paused");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

//prev music button event
prevBtn.addEventListener("click", ()=>{
  prevMusic();
});

//next music button event
nextBtn.addEventListener("click", ()=>{
  nextMusic();
});

// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
  musicDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e)=>{
  let progressWidth = progressArea.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); //calling playMusic function
  playingSong();
});

//change loop, shuffle, repeat icon onclick
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; 
  console.log(getText);//getting this tag innerText
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

//code for what to do after song ended
mainAudio.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextMusic(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; //setting audio current time to 0
      loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusic(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndex = randIndex; //passing randomIndex to musicIndex
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      prevBtn.addEventListener("click", ()=>{
        let shuffleNext=Math.floor((Math.random()*randIndex)+1);
        console.log(shuffleNext);
        loadMusic(shuffleNext);
        playMusic();
        playingSong();
      });
      break;
  }
});
//volume mute and unmute
let muteaudio=document.querySelector("#sound");
muteaudio.addEventListener('click', ()=>{
  let getsound=muteaudio.innerHTML;
  switch(getsound)
  {
  case "volume_up":
   mainAudio.volume=0.5;
    mainAudio.volume.value = 50;
    muteaudio.innerHTML='volume_down'
    break;
  case 'volume_down':
    mainAudio.volume=0;
    mainAudio.volume.value = 0;
    muteaudio.innerHTML='volume_mute'
    break;
  case "volume_mute":
    mainAudio.volume = 1;
    mainAudio.volume.value = 100;
   muteaudio.innerHTML='volume_up'
   break;
}
});
//show music list onclick of music icon
moreMusicBtn.addEventListener("click", ()=>{
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", ()=>{
  moreMusicBtn.click();
 
});

const ulTag = wrapper.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < allMusic.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                <img id="list-img" src="img/${allMusic[i].src}.jpg" alt="LR">
                  <span>${allMusic[i].name}</span>
                  <p id="list-artist">${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

  let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}

//play particular song from the list onclick of li tag
function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

//particular li clicked function
function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //updating current song index with clicked li index
  loadMusic(musicIndex);
  moreMusicBtn.click();
  playMusic();
  playingSong();
}
//tips onclick 
document.querySelector('#feedback').addEventListener('click',()=>{
  document.querySelector('#feedback').style.display='none';
  document.querySelector('#tips').style.display='flex';
})
document.querySelector('#tips-btn').addEventListener('click',()=>{
  document.querySelector('#feedback').style.display='flex';
  document.querySelector('#tips').style.display='none';
})