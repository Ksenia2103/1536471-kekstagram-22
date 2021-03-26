import {isEscEvent, isDuplicate, isValid} from './util.js';
import {
  RE_HASHTAG,
  MAX_HASHTAG_LENGTH,
  MIN_HASHTAG_LENGTH,
  MAX_HASHTAG_AMOUNT,
  MAX_COMMENT_LENGTH
} from './constants.js';

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

textHashtags.addEventListener('input', () => {
  const hashtagsArray = textHashtags.value.toLowerCase().split(' ');

  textHashtags.setCustomValidity('');
  textHashtags.classList.toggle('text__hashtags--error', false);

  if (isDuplicate(hashtagsArray)) {
    textHashtags.classList.toggle('text__hashtags--error', true);
    textHashtags.setCustomValidity('Нельзя указывать одинаковые хэш-теги');
    textHashtags.reportValidity();
    return;
  }

  if (hashtagsArray.length > MAX_HASHTAG_AMOUNT) {
    textHashtags.classList.toggle('text__hashtags--error', true);
    textHashtags.setCustomValidity('Нельзя указать больше 5 хэш-тегов');
    textHashtags.reportValidity();
    return;
  }

  let message = '';
  for (let hashtag of hashtagsArray) {
    if (hashtag.length < MIN_HASHTAG_LENGTH && hashtag[0] === '#') {
      message = 'Xэш-тег не может состоять только из одной #';
      break;
    } else if (hashtag[0] !== '#') {
      message = 'Каждый хэш-тег должен начинаться с символа #';
      break;
    } else if (!isValid(RE_HASHTAG, hashtag)) {
      message = 'Xэш-тег должен состоять только из букв и чисел, а также не может содержать пробелы';
      break;
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      message = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
    }
  }
  textHashtags.setCustomValidity(message);
  textHashtags.reportValidity();
});

textDescription.addEventListener('input', () => {
  if (textDescription.value.length > MAX_COMMENT_LENGTH) {
    textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  }
  textDescription.reportValidity();
});

textHashtags.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});
