const GRAYSCALE_MIN = 0;
const GRAYSCALE_MAX = 1;
const GRAYSCALE_STEP = 0.1;
const SEPIA_MIN = 0;
const SEPIA_MAX = 1;
const SEPIA_STEP = 0.1;
const INVERT_MIN = 0;
const INVERT_MAX = 100;
const INVERT_STEP = 1;
const BLUR_MIN = 0;
const BLUR_MAX = 3;
const BLUR_STEP = 0.1;
const BRIGHTNESS_MIN = 1;
const BRIGHTNESS_MAX = 3;
const BRIGHTNESS_STEP = 0.1;

const effectValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const effectLevel = document.querySelector('.effect-level');


const createSlider = (min, max, step, effectValue) => {
  effectLevel.classList.remove('hidden');
  // eslint-disable-next-line no-undef
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  applyEffect(effectValue);
}

const destroySlider = () => {
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }
  effectLevel.classList.add('hidden');
};

const resetSlider = () => {
  imageUploadPreview.style.filter = 'none';
  effectLevel.classList.add('hidden');
}

const applyEffect = (effect) => {
  effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    switch (effect) {
      case 'chrome':
        imageUploadPreview.style.filter = `grayscale(${values[handle]})`;
        break;
      case 'sepia':
        imageUploadPreview.style.filter = `sepia(${values[handle]})`;
        break;
      case 'marvin':
        imageUploadPreview.style.filter = `invert(${values[handle]})`;
        break;
      case 'phobos':
        imageUploadPreview.style.filter = `blur(${values[handle]})`;
        break;
      case 'heat':
        imageUploadPreview.style.filter = `brightness(${values[handle]})`;
        break;
      case 'none':
        imageUploadPreview.style.filter = 'none';
        destroySlider();
        break;
    }

    effectValue.value = values[handle];
  });
};

const changePictureEffect = () => {
  effectList.addEventListener('change', (evt) => {
    if (evt.target.matches('.effects__radio')) {
      destroySlider();

      const effectValue = evt.target.value;

      switch (effectValue) {
        case 'chrome':
          createSlider(GRAYSCALE_MIN, GRAYSCALE_MAX, GRAYSCALE_STEP, effectValue);
          break;
        case 'sepia':
          createSlider(SEPIA_MIN, SEPIA_MAX, SEPIA_STEP, effectValue);
          break;
        case 'marvin':
          createSlider(INVERT_MIN, INVERT_MAX, INVERT_STEP, effectValue);
          break;
        case 'phobos':
          createSlider(BLUR_MIN, BLUR_MAX, BLUR_STEP, effectValue);
          break;
        case 'heat':
          createSlider(BRIGHTNESS_MIN, BRIGHTNESS_MAX, BRIGHTNESS_STEP, effectValue);
          break;
        case 'none':
          createSlider(0, 1, 1, effectValue);
          break;
      }

      imageUploadPreview.classList.add(`effects__preview--${effectValue}`);
    }
  });
};

export {resetSlider,changePictureEffect};
