import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const submitButton = form.querySelector('button[type="submit"]');

// Отримання даних з локального сховища та встановлення їх в поля форми при завантаженні сторінки
function restoreFormState() {
  const formData =
    JSON.parse(localStorage.getItem('feedback-form-state')) || {};
  emailInput.value = formData.email || '';
  messageInput.value = formData.message || '';
}

restoreFormState();

// Функція для збереження даних форми у локальному сховищі
function saveFormState() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// Відстежування події input на формі і збереження даних з певною затримкою в локальному сховищі
form.addEventListener('input', throttle(saveFormState, 500));

// Очищення сховища та виведення даних на консоль при сабміті форми
form.addEventListener('submit', function (event) {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formData);

  // Очищення полів форми
  emailInput.value = '';
  messageInput.value = '';
});
