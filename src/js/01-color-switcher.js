const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.setAttribute('disabled', true);

let interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
    interval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        startBtn.setAttribute('disabled', true);
         stopBtn.removeAttribute('disabled');
    }, 1000);
});

stopBtn.addEventListener('click', () => {
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);
    clearInterval(interval);
});
