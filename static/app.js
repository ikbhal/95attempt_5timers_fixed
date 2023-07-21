const timers = [
    { name: 'Dhuhr', time: '1:00 PM' },
    { name: 'Asr', time: '4:45 PM' },
    { name: 'Maghrib', time: '6:45 PM' },
    { name: 'Isha', time: '8:00 PM' },
    { name: 'Fajr', time: '9:00 PM' }
  ];
  
  const app = new Vue({
    el: '#app',
    data: {
      timers: timers
    },
    created() {
      this.setTimers();
    },
    methods: {
      setTimers() {
        timers.forEach(timer => {
          const timeParts = timer.time.split(':');
          const hours = parseInt(timeParts[0]);
          const minutes = parseInt(timeParts[1]);
          const now = new Date();
          const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  
          if (targetTime > now) {
            const timeDifference = targetTime - now;
            setTimeout(() => this.playAlarm(), timeDifference);
          }
        });
      },
      playAlarm() {
        const audio = new Audio('clock-alarm.mp3');
        audio.play();
      }
    }
  });
  