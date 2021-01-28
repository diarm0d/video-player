// Basic action functions
const videoPlayer = document.querySelector('video');
const playButton = document.getElementById('play-button');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const volumeToggle = document.getElementById('volume-toggle');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenButton = document.querySelector('.fullscreen');


function showPlayIcon() {
    playButton.classList.replace('fa-pause','fa-play');
    playButton.setAttribute('title','play');
}

// Play & Pause ----------------------------------- //
function playPauseVideo() {
    if (videoPlayer.paused) {
        playButton.classList.replace('fa-play', 'fa-pause');
        playButton.setAttribute('title','pause');
        videoPlayer.play();
    } else {
        showPlayIcon();
        videoPlayer.pause();
    }
};


// Progress Bar ---------------------------------- //

// Calc display time format
function displayTime(time) {
    const minutes = Math.floor(time / 60 );
    let seconds = Math.floor( time % 60 );
    seconds =  seconds > 9 ? seconds : `0${seconds}` ;
   return `${minutes}:${seconds}`;
}

function updateProgress() {
    progressBar.style.width = `${(videoPlayer.currentTime/ videoPlayer.duration) * 100}%`;
    currentTime.textContent = `${displayTime(videoPlayer.currentTime)} /`;
    duration.textContent = `${displayTime(videoPlayer.duration)}`;
}

// Click to seek within the video
function seekProgressBar(e) {
    const seekProgress = (e.offsetX / progressRange.offsetWidth);
    progressBar.style.width = `${seekProgress * 100}%`;
    videoPlayer.currentTime = seekProgress * videoPlayer.duration;
    
}

// Volume Controls --------------------------- //
function mutePlayer() {
    if (videoPlayer.volume) {
    lastVolume = videoPlayer.volume;
    volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    videoPlayer.muted = true;
    volumeBar.style.width = 0;
    } else {
    console.log('click');
    volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up'); 
    videoPlayer.muted = false;
    volumeBar.style.width = lastVolume;
    }
};

// Volume Bar
function changeVolumeLevel(e) {
    let volumeLevel = (e.offsetX / volumeRange.offsetWidth);
    // Rounding volume
    if (volumeLevel < 0.1) {
        volumeLevel = 0;
    } 
    if (volumeLevel > 0.9) {
        volumeLevel = 1;
    }
    volumeBar.style.width = `${volumeLevel * 100}%`;
    // Change icon level
    volumeIcon.className = '';
    if (volumeLevel > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volumeLevel < 0.7 && volumeLevel > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
     } else if (volumeLevel === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
     }
    }




// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// Event listeners
playButton.addEventListener('click', playPauseVideo);
videoPlayer.addEventListener('click', playPauseVideo);
volumeToggle.addEventListener('click', mutePlayer);
videoPlayer.addEventListener('ended', showPlayIcon);
videoPlayer.addEventListener('timeupdate',updateProgress);
videoPlayer.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', seekProgressBar);
volumeRange.addEventListener('click', changeVolumeLevel);

