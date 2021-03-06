import {isEscEvent} from './util.js';
import {resetSlider, changePictureEffect} from './slider.js';
import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './messages.js';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const uploadFile = document.querySelector('#upload-file');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlValue = imageUploadForm.querySelector('.scale__control--value');
const imageUploadPreview = imageUploadForm.querySelector('.img-upload__preview');
const bodyElement = document.querySelector('body');

let currentValue = DEFAULT_SCALE;

const openForm = () => {
  imageUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  resetSlider();
  changePictureEffect();

  document.addEventListener('keydown', onEscKeydown);
  uploadCancel.addEventListener('click', closeForm);
  scaleControlSmaller.addEventListener('click', onScaleControlSmaller);
  scaleControlBigger.addEventListener('click', onScaleControlBigger);
}

const closeForm = () => {
  imageUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  uploadFile.value = '';
  imageUploadForm.reset();
}

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

const onScaleControlSmaller = () => {
  if (currentValue > MIN_SCALE && currentValue <= MAX_SCALE) {
    currentValue -= SCALE_STEP;
    scaleControlValue.value = `${currentValue}%`;
    imageUploadPreview.style.transform = `scale(${currentValue / 100})`;
  }
}

const onScaleControlBigger = () => {
  if (currentValue >= MIN_SCALE && currentValue < MAX_SCALE) {
    currentValue += SCALE_STEP;
    scaleControlValue.value = `${currentValue}%`;
    imageUploadPreview.style.transform = `scale(${currentValue / 100})`;
  }
}

const submitHandler = (evt) => {
  evt.preventDefault();
  sendData(showSuccessMessage, showErrorMessage, new FormData(evt.target));
  closeForm();
};

uploadFile.addEventListener('click', openForm);
uploadCancel.addEventListener('click', closeForm);
imageUploadForm.addEventListener('submit', submitHandler);
