let timeLeft;
let timerId = null;
let isWorkTime = true;

const WORK_TIME = 25 * 60;  // 25 minutes in seconds
const BREAK_TIME = 5 * 60;  // 5 minutes in seconds

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
                statusText.textContent = isWorkTime ? 'Pomodoro baby!' : 'Break Time';
                updateDisplay();
                new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

/**
 * Resets the timer to its initial state
 * - Stops any running timer by clearing the interval
 * - Sets timerId back to null to indicate timer is stopped
 * - Sets isWorkTime to true to restart with work period
 * - Resets timeLeft to full work period duration
 * - Updates status message to initial state
 * - Resets start/pause button text to 'Start'
 * - Updates the timer display with new values
 */
function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    statusText.textContent = 'Pomodoro baby!';
    startPauseButton.textContent = 'Start';
    updateDisplay();
}

/**
 * Updates the timer display and document title with current time
 * - Calculates minutes and seconds from timeLeft
 * - Formats time as MM:SS with leading zeros
 * - Updates the timer display element with formatted time
 * - Updates the browser tab title to show current timer status
 */
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    timerDisplay.textContent = timeString;
    
    document.title = `${timeString} - Pomodoro Timer`;
}

// Initialize
timeLeft = WORK_TIME;
updateDisplay();

// Event listeners
startPauseButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
        startPauseButton.textContent = 'Pause';
    } else {
        pauseTimer();
        startPauseButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', resetTimer); 