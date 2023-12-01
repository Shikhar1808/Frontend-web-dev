const playpause = document.querySelector(".play_pause")
const video = document.querySelector("video")
const theater = document.querySelector(".theater")
const minibtn = document.querySelector(".miniplayer")
const fullbtn = document.querySelector(".fullscreen")
const mutebtn = document.querySelector(".mute")
const scrollbtn = document.querySelector(".scroll")
const videocontainer = document.querySelector(".container")
const ctime = document.querySelector(".currenttime")
const ttime = document.querySelector(".totaltime")

playpause.addEventListener("click", toggleplay)
video.addEventListener("click",toggleplay)

function toggleplay() {
    video.paused ? video.play() : video.pause()
}

video.addEventListener("play",() =>{
    videocontainer.classList.remove("paused")
})
video.addEventListener("pause",() =>{
    videocontainer.classList.add("paused")
})

theater.addEventListener("click",toggletheater)
// minibtn.addEventListener("click",togglemini)
fullbtn.addEventListener("click",togglefull)

function toggletheater(){
    videocontainer.classList.toggle("theater")
}
function togglemini(){

}
function togglefull() {
    if (document.fullscreenElement == null) {
      videocontainer.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
}
document.addEventListener("fullscreenchange",() => {
    videocontainer.classList.toggle("fullscreen", document.fullscreenElement)
})

document.addEventListener("keydown",e => {
    switch (e.key.toLowerCase()) {
        case "k":
            toggleplay()
            break
        case "t":
            toggletheater()
            break
    }
})


mutebtn.addEventListener("click", toggleMute)
scrollbtn.addEventListener("input", e => {
  video.volume = e.target.value
  video.muted = e.target.value === 0
})

function toggleMute() {
  video.muted = !video.muted;
}

video.addEventListener("volumechange", () => {
  scrollbtn.value = video.volume
  let volumeLevel
  if (video.muted || video.volume === 0) {
    scrollbtn.value = 0
    volumeLevel = "muted"
  } else if (video.volume >= 0.5) {
    volumeLevel = "high"
  } else {
    volumeLevel = "low"
  }

  videocontainer.dataset.volumeLevel = volumeLevel
})


video.addEventListener("loadeddata", () =>{
    ttime.textContent = tduration(video.duration)
})
const leadingzero=new Intl.NumberFormat(undefined,{minimumIntegerDigits:2})
function tduration(time){
    const ss=Math.floor(time%60)
    const ms=Math.floor(time/60)%60
    const hs=Math.floor(time/3600)
    if(hs===0){
        return`${ms}:${leadingzero.format(ss)}`
    }
    else{
        return`${hs}:${leadingzero.format(ms)}:${leadingzero.format(ss)}}`
    }
}
video.addEventListener("timeupdate",() =>{
    ctime.textContent=tduration(video.currentTime)
})