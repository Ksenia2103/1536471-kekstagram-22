import {isEscEvent} from './util.js';

const main = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessage = errorTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');
const successMessage = successTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');

const onEscKeydownErrorMessage = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onClickErrorMessage = (evt) => {
  if (evt.target !== errorTemplate) {
    closeErrorMessage();
  }
};

const closeErrorMessage = () => {
  errorMessage.remove();
  errorButton.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onEscKeydownErrorMessage);
  errorMessage.removeEventListener('click', onClickErrorMessage);
};

const showErrorMessage = () => {
  main.appendChild(errorMessage);

  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onEscKeydownErrorMessage);
  errorMessage.addEventListener('click', onClickErrorMessage);
}

const onEscKeydownSuccessMessage = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onClickSuccessMessage = (evt) => {
  if (evt.target !== successTemplate) {
    closeSuccessMessage();
  }
};

const closeSuccessMessage = () => {
  successMessage.remove();
  successButton.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onEscKeydownSuccessMessage);
  successMessage.removeEventListener('click', onClickSuccessMessage);
};

const showSuccessMessage = () => {
  main.appendChild(successMessage);

  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onEscKeydownSuccessMessage);
  successMessage.addEventListener('click', onClickSuccessMessage);
}

const showAlert = (message) => {
  const alertElement = document.createElement('div');
  alertElement.classList.add('alert-message');
  alertElement.textContent = message;
  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, 3000);
}

export {showErrorMessage, showSuccessMessage, showAlert};
