import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// Функція для збереження часу відтворення у локальному сховищі
function saveCurrentTime(time) {
  localStorage.setItem('videoplayer-current-time', time);
}

// Функція для встановлення часу відтворення плеєра зі збереженої позиції
function restoreCurrentTime() {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    player.setCurrentTime(parseFloat(currentTime));
  }
}

// Відстежування події timeupdate плеєра з використанням throttle
player.on(
  'timeupdate',
  throttle(function (data) {
    saveCurrentTime(data.seconds);
  }, 1000)
); // Оновлення не частіше, ніж раз на секунду (1000 мс)

// Відновлення часу відтворення при завантаженні сторінки
window.addEventListener('load', function () {
  restoreCurrentTime();
});
