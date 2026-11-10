(() => {
  const machine = document.querySelector('.typewriter');
  if (!machine) return;

  const keyboard = machine.querySelector('.typewriter-keys');
  for (const letters of ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']) {
    const row = document.createElement('span');
    row.className = 'typewriter-keyrow';
    for (const letter of letters) {
      const key = document.createElement('span');
      key.className = 'typewriter-key';
      key.dataset.letter = letter;
      key.textContent = letter;
      row.appendChild(key);
    }
    keyboard.appendChild(row);
  }

  const output = machine.querySelector('.typewriter-text');
  const carriage = machine.querySelector('.typewriter-carriage');
  const paper = machine.querySelector('.typewriter-paper');
  const strike = machine.querySelector('.typewriter-strike');
  const keys = [...machine.querySelectorAll('.typewriter-key')];
  const phrase = 'Clear writing for\ncomplex ideas.';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer;
  let pulse;
  let index = 0;

  function releaseKeys() {
    strike.style.opacity = '0';
    keys.forEach((key) => key.classList.remove('is-pressed'));
  }

  function finish() {
    clearTimeout(timer);
    clearTimeout(pulse);
    releaseKeys();
    carriage.classList.remove('is-returning');
    output.textContent = phrase;
  }

  function typeNext() {
    if (index >= phrase.length) return finish();
    output.textContent = phrase.slice(0, ++index);
    const letter = phrase[index - 1].toUpperCase();
    if (letter === '\n') {
      releaseKeys();
      carriage.classList.add('is-returning');
      carriage.style.setProperty('--carriage-offset', '0px');
      paper.style.setProperty('--paper-feed', '-10px');
      timer = setTimeout(() => {
        carriage.classList.remove('is-returning');
        typeNext();
      }, 420);
      return;
    }
    const column = phrase.slice(0, index).split('\n').pop().length;
    keys.forEach((key) => key.classList.toggle('is-pressed', key.dataset.letter === letter));
    carriage.style.setProperty('--carriage-offset', `${-column * 0.6}px`);
    strike.style.opacity = '1';
    pulse = setTimeout(releaseKeys, 60);
    timer = setTimeout(typeNext, 115);
  }

  function replay() {
    clearTimeout(timer);
    clearTimeout(pulse);
    releaseKeys();
    index = 0;
    carriage.classList.remove('is-returning');
    carriage.style.setProperty('--carriage-offset', '0px');
    paper.style.setProperty('--paper-feed', '0px');
    if (motion.matches) return finish();
    output.textContent = '';
    typeNext();
  }

  machine.addEventListener('click', replay);
  motion.addEventListener('change', () => { if (motion.matches) finish(); });
  window.addEventListener('pagehide', finish);
  if (!motion.matches) timer = setTimeout(replay, 700);
})();
