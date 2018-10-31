/**
 * Registering service worker for offline features
 */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
  .then(registration => navigator.serviceWorker.ready)
  .then(registration => {
    console.log('Registration successful, scope is:', registration.scope)
  })
  .catch(error => console.log('Service worker registration failed, error:', error));
}

const app = document.getElementById('app');
let div = document.createElement('div');
let p = document.createElement('p');

let select = document.createElement('select');
select.className = 'select';
let option;
for(let i = 1; i <= 30; i++) {
  option = document.createElement('option');
  option.innerHTML = `${i} minutes`;
  option.value = i * 60000;
  if(i === 3) option.setAttribute('selected', '');
  select.appendChild(option);
}
div.appendChild(select);

let duration = 0;
div.className = 'container';
app.appendChild(div);
p.className = 'timer';
div.appendChild(p);

let bar = document.createElement('div');
bar.className = 'progress-bar';
document.body.appendChild(bar);
let barWidth;
duration % 60000 != 0 ? barWidth = 100 - ((duration % 60000 / 1000) / (60 / 100)) : barWidth = 100 / 60; // precalculation of % of progress bar width for time with seconds

const startButton = document.createElement('button');
startButton.className = 'start-button';
startButton.innerHTML = 'Start';
div.appendChild(startButton);
startButton.addEventListener('click', startTimer);

const delayedStartButton = document.createElement('button');
delayedStartButton.className = 'start-button';
delayedStartButton.innerHTML = 'Start in 10 sec';
div.appendChild(delayedStartButton);

let message = document.createElement('p');

delayedStartButton.addEventListener('click', () => {
  hideElements();
  
  message.style.color = '#fff';
  message.style.fontSize = '2rem';
  let timeout = 9;
  let countdown = setInterval(() => {
    message.innerHTML = `Timer starts in ${timeout} sec...`;
    if(timeout == 0) {
      clearInterval(countdown);
    }
    timeout = timeout - 1;
  }, 1000);

  div.appendChild(message);

  setTimeout(startTimer, 10000);
});

let isHidden = false;

function hideElements() {
  startButton.style.display = 'none';
  delayedStartButton.style.display = 'none';

  let logo = document.getElementsByClassName('logo')[0];
  logo.style.display = 'none';

  let select = document.getElementsByTagName('select')[0];
  select.style.display = 'none';

  isHidden = true;
}

function startTimer() {

  if (!isHidden) hideElements();

  message.style.display = 'none';

  duration = select.value;

  let minutes;
  let timer = setInterval(() => {
    minutes = Math.ceil(duration / (60 * 1000));
  
    if(duration <= 90000) {
      p.innerHTML = duration / 1000;
      bar.style.display = 'none';
    } else {
      p.innerHTML = minutes;
    }
    
    if(duration == 0) {
      clearInterval(timer);
      p.style.fontSize = '8vw';
      p.style.lineHeight = '100vh';
      div.style.backgroundColor = '#cc4d4d';
      p.innerHTML = 'You are out of time.';
    }

    if(barWidth >= 100) {
      barWidth = 0;
    }
    bar.style.width = `${barWidth}%`;
    barWidth += 100 / 60;

    duration = duration - 1000;

  }, 1000);
}