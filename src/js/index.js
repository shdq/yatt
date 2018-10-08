const app = document.getElementById('app');
let div = document.createElement('div');
let p = document.createElement('p');

let duration = 180000;

div.className = 'container';
app.appendChild(div);
p.className = 'timer';
div.appendChild(p);

const startButton = document.createElement('button');
startButton.innerHTML = 'Start';
div.appendChild(startButton);
startButton.addEventListener('click', startTimer);

function startTimer() {
  startButton.style.display = 'none';

  let minutes;
  let timer = setInterval(() => {
    minutes = Math.ceil(duration / (60 * 1000));
  
    if(duration <= 90000) {
      p.innerHTML = duration / 1000;
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
    
    duration = duration - 1000;

  }, 1000);
}