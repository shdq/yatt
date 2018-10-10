const app = document.getElementById('app');
let div = document.createElement('div');
let p = document.createElement('p');

let duration = 140000;
div.className = 'container';
app.appendChild(div);
p.className = 'timer';
div.appendChild(p);

let bar = document.createElement('div');
bar.className = 'progress-bar';
document.body.appendChild(bar);
let barWidth;
duration % 60000 != 0 ? barWidth = (duration % 60000 / 1000) / (60 / 100) : barWidth = 100 / 60; // precalculation of % of progress bar width for time with seconds

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