const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }
// Get elements from the DOM
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');            // video element
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const sliders = player.querySelectorAll('.player__slider');

// Function to toggle play/pause
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

// Skip forward or backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update video properties from sliders (volume / playback speed)
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update the progress bar as the video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Allow clicking or dragging on the progress bar to scrub the video
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

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
