const timers = [
  { name: 'Dhuhr', time: '13:00' },
  { name: 'Asr', time: '16:45' },
  { name: 'Maghrib', time: '18:45' },
  { name: 'Isha', time: '20:00' },
  { name: 'Fajr', time: '05:00' }
];

const app = new Vue({
  el: '#app',
  data: {
    timers: timers
  },
  created() {
    this.setTimers();
    // setInterval(() => this.updateTimers(), 1000); // Update every 1 second
    setInterval(() => this.updateTimers(), 60 * 1000); // update every 1 minute
  },
  methods: {
    setTimers() {
      timers.forEach(timer => {
        const timeParts = timer.time.split(':');
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        const now = new Date();
        const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

        if (targetTime < now) {
          targetTime.setDate(targetTime.getDate() + 1);
        }

        timer.targetTime = targetTime; // Store the target time in the timer object
      });
    },
    updateTimers() {
      const updatedTimers = this.timers.map(timer => {
        const now = new Date();
        const timeDifference = timer.targetTime - now;
        const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        // Create a shallow copy of the timer object to avoid reactivity issues
        const updatedTimer = Object.assign({}, timer);
        updatedTimer.timeLeft = `${hoursLeft}h ${minutesLeft}m`;
        updatedTimer.scheduledTime = this.formatTime(timer.targetTime);
        return updatedTimer;
      });

      // Update the timers array with the updated timers
      this.timers = updatedTimers;
    },
    formatTime(date) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    playAlarm() {
      const audio = new Audio('clock-alarm.mp3');
      audio.play();
    }
  }
});
