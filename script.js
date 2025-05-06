// Select DOM elements within the player
const player = document.querySelector('.player');
const video = player.querySelector('.player__video');  // Use the class expected by tests
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const sliders = player.querySelectorAll('.player__slider');

// Toggle play/pause state
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update the play/pause button icon
function updateButton() {
  const icon = video.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

// Skip forward or backward (with clamping for rewind)
function skip() {
  const skipTime = parseFloat(this.dataset.skip);
  // Clamp new time so it doesn't go below 0
  video.currentTime = Math.max(0, video.currentTime + skipTime);
}

// Update video properties from slider controls
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update the progress bar as the video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

// Allow scrubbing by clicking on the progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
sliders.forEach(slider => slider.addEventListener('change', handleRangeUpdate));
sliders.forEach(slider => slider.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
