document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('playButton');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const words = document.querySelectorAll('.word');
    
    const audio = new Audio('Audio/fried-chicken-salad-audio.mp3');
    let isPlaying = false;

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateProgress() {
        progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
        currentTimeEl.textContent = formatTime(audio.currentTime);
        highlightCurrentWord();
    }

    function highlightCurrentWord() {
        const progressPercent = (audio.currentTime / audio.duration);
        const wordIndex = Math.floor(progressPercent * words.length);
        words.forEach((word, index) => {
            word.classList.remove('current-word');
            if (index === wordIndex) {
                word.classList.add('current-word');
                word.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        audio.currentTime = (clickX / width) * audio.duration;
    }

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playBtn.textContent = '▶ Play Recipe';
        } else {
            audio.play();
            playBtn.textContent = '❚❚ Pause';
        }
        isPlaying = !isPlaying;
    }

    playBtn.addEventListener('click', togglePlay);
    progressContainer.addEventListener('click', setProgress);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶ Play Recipe';
        isPlaying = false;
    });
    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });
});