const synth = window.speechSynthesis || false;

const play = function play(message) {
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance(message);
    synth.speak(msg);
  }
};

const stop = function stop() {
  if ('speechSynthesis' in window) {
    synth.cancel();
  }
};

export { play, stop };
