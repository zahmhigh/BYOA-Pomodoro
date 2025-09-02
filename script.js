class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.totalTime = 25 * 60;
        this.isRunning = false;
        this.interval = null;
        this.sessions = 0;
        this.totalMinutes = 0;
        this.currentMode = 'focus';
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }

    initializeElements() {
        this.timeDisplay = document.getElementById('time');
        this.timerLabel = document.getElementById('timer-label');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.modeBtns = document.querySelectorAll('.mode-btn');
        this.sessionsDisplay = document.getElementById('sessions');
        this.totalTimeDisplay = document.getElementById('total-time');
        this.notification = document.getElementById('notification');
        this.notificationText = document.getElementById('notification-text');
        this.notificationClose = document.getElementById('notification-close');
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        this.modeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchMode(btn));
        });

        this.notificationClose.addEventListener('click', () => this.hideNotification());
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            
            this.interval = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.complete();
                }
            }, 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            clearInterval(this.interval);
        }
    }

    reset() {
        this.pause();
        this.timeLeft = this.totalTime;
        this.updateDisplay();
    }

    switchMode(btn) {
        // Remove active class from all buttons
        this.modeBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get new time and mode
        const newTime = parseInt(btn.dataset.time) * 60;
        const newMode = btn.dataset.mode;
        
        // Update timer state
        this.totalTime = newTime;
        this.timeLeft = newTime;
        this.currentMode = newMode;
        
        // Update label
        this.updateTimerLabel();
        
        // Reset timer
        this.reset();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.timeDisplay.textContent = timeString;
        
        // Update browser tab title with current timer time
        document.title = `${timeString} - Pomodoro Timer`;
    }

    updateTimerLabel() {
        const labels = {
            'focus': 'Focus Time',
            'short-break': 'Short Break',
            'long-break': 'Long Break'
        };
        this.timerLabel.textContent = labels[this.currentMode];
    }

    complete() {
        this.pause();
        
        // Add session if it was a focus session
        if (this.currentMode === 'focus') {
            this.sessions++;
            this.totalMinutes += this.totalTime / 60;
            this.updateStats();
        }
        
        // Show notification
        this.showNotification();
        
        // Play notification sound if supported
        this.playNotificationSound();
        
        // Add completion animation
        this.timeDisplay.classList.add('timer-complete');
        setTimeout(() => {
            this.timeDisplay.classList.remove('timer-complete');
        }, 500);
    }

    showNotification() {
        const messages = {
            'focus': 'Focus session completed! Time for a break.',
            'short-break': 'Short break completed! Ready to focus?',
            'long-break': 'Long break completed! Ready to focus?'
        };
        
        this.notificationText.textContent = messages[this.currentMode];
        this.notification.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideNotification();
        }, 5000);
    }

    hideNotification() {
        this.notification.classList.remove('show');
    }

    playNotificationSound() {
        // Create a simple notification sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio notification not supported');
        }
    }

    updateStats() {
        this.sessionsDisplay.textContent = this.sessions;
        this.totalTimeDisplay.textContent = `${Math.round(this.totalMinutes)}m`;
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});

// Request notification permission when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}); 