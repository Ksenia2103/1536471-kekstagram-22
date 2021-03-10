import {isEscEvent} from './util.js';
import {resetSlider,changePictureEffect} from './slider.js';

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
  document.addEventListener('keydown', onEscKeydown);
  uploadCancel.addEventListener('click', closeForm);
  resetSlider();
  scaleControlSmaller.addEventListener('click', onScaleControlSmaller);
  scaleControlBigger.addEventListener('click', onScaleControlBigger);
  changePictureEffect();
}

const closeForm = () => {
  imageUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  uploadFile.value = '';
}

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

const onScaleControlSmaller = () => {
  if (currentValue > MIN_SCALE && currentValue <= MAX_SCALE) {
    currentValue -=  SCALE_STEP;
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

uploadFile.addEventListener('click', openForm);
uploadCancel.addEventListener('click', closeForm);
