// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('input#datetime-picker');
const clockfaceDay = document.querySelector('span[data-days]');
const clockfaceHours = document.querySelector('span[data-hours]');
const clockfaceMinutes = document.querySelector('span[data-minutes]');
const clockfaceSeconds = document.querySelector('span[data-seconds]');
const timerDiv = document.querySelector('.timer');
const timerFields = document.querySelectorAll('.field');
const timerValue = document.querySelectorAll('.value');
console.log(timerValue);

timerDiv.classList.add("timer-position");

timerFields[0].classList.add('field-position');
timerFields[1].classList.add('field-position');
timerFields[2].classList.add('field-position');
timerFields[3].classList.add('field-position');

timerValue[0].classList.add('field-value');
timerValue[1].classList.add('field-value');
timerValue[2].classList.add('field-value');
timerValue[3].classList.add('field-value');

let setTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
        // window.alert('Please choose a date in the future');
Notify.failure('Please choose a date in the future');

      startBtn.setAttribute('disabled', true);
      return;
    }
    startBtn.removeAttribute('disabled');
    setTime = selectedDates[0];

    return setTime;
  },
};

startBtn.setAttribute('disabled', true);

startBtn.addEventListener('click', () => {
    timer.start();
    startBtn.setAttribute('disabled', true);
});

flatpickr(input, options);

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = setTime - currentTime;
      const time = this.convertMs(deltaTime);

      if (deltaTime <= 0) {
        this.stop();
        return;
      }

      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
      startBtn.setAttribute('disabled', true);
    //   this.onTick(0);
    this.isActive = false;
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({ onTick: updateClockFace });

function updateClockFace({ days, hours, minutes, seconds }) {
  clockfaceDay.textContent = `${days}`;
  clockfaceHours.textContent = `${hours}`;
  clockfaceMinutes.textContent = `${minutes}`;
  clockfaceSeconds.textContent = `${seconds}`;
}

// const timer = {
//   intervalId: null,
//   isActive: false,
//   start() {
//     if (this.isActive) {
//       return;
//     }

//     const startTime = setTime;
//     this.isActive = true;
//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = setTime - currentTime;
//       const time = convertMs(deltaTime);

//       updateClockFace(time);

//       //   console.log(`${days}:${hours}:${minutes}:${seconds}`);
//     }, 1000);
//   },

//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//   },
// };

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// function updateClockFace({ days, hours, minutes, seconds }) {
//   clockfaceDay.textContent = `${days}`;
//   clockfaceHours.textContent = `${hours}`;
//   clockfaceMinutes.textContent = `${minutes}`;
//   clockfaceSeconds.textContent = `${seconds}`;
// }