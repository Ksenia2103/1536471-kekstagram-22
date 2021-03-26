import {isEscEvent} from './util.js';
import {resetSlider, changePictureEffect} from './slider.js';
import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './messages.js';
import {
  MAX_SCALE,
  MIN_SCALE,
  FILE_TYPES,
  DEFAULT_SCALE,
  SCALE_STEP
} from './constants.js';


const uploadFile = document.querySelector('#upload-file');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlValue = imageUploadForm.querySelector('.scale__control--value');
const imageUploadPreview = imageUploadForm.querySelector('.img-upload__preview');
const bodyElement = document.querySelector('body');
const image = imageUploadPreview.querySelector('.img-upload__preview img');

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

const replaceImage = () => {
  let file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((extension) => {
    return fileName.endsWith(extension);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', function () {
      image.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  openForm();
  replaceImage();
});

uploadFile.addEventListener('click', openForm);
uploadCancel.addEventListener('click', closeForm);
imageUploadForm.addEventListener('submit', submitHandler);
