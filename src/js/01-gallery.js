// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css'; // Додатковий імпорт стилів

// Отримання посилання на елемент ul.gallery
const galleryList = document.querySelector('.gallery');

// Рендер розмітки галереї
function createMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) => `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
          </a>
        </li>
      `
    )
    .join('');
}

// Вставка створеної розмітки в елемент ul.gallery
galleryList.innerHTML = createMarkup(galleryItems);

// Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', // Використовувати атрибут 'alt' як підпис
  captionDelay: 250, // Затримка перед показом підпису
});

// Рендер галереї при завантаженні сторінки
window.addEventListener('load', () => {
  createMarkup(galleryItems);
});

// Change code below this line

console.log(galleryItems);
