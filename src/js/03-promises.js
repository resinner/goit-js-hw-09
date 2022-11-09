import Notiflix from 'notiflix';

const btnRef = document.querySelector('button');
const formRef = document.querySelector('form');
const formInput = document.querySelectorAll('input');
const delayRef = formInput[0];
const stepRef = formInput[1];
const amountRef = formInput[2];

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

formRef.addEventListener('submit', e => {
  const delay = parseInt(delayRef.value);
  const step = parseInt(stepRef.value);
  const amount = parseInt(amountRef.value);
  let amountStep = delay;

  e.preventDefault();

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, amountStep)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅Fulfilled promise ${position} in ${delay}ms`
        );
       
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
         Notiflix.Notify.failure(
           `❌Rejected promise ${position} in ${delay}ms`
         );
      })
      .finally(() => {
        formRef.reset;
        delay = 0;
        step = 0;
        amount = 0;
      }, (amountStep += step));
  }
});
