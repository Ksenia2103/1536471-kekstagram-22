import {isEscEvent, isDuplicate, isValid} from './util.js';

const RE_HASHTAG = /^#[A-Za-zа-яА-Я0-9]{1,19}$/;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_AMOUNT = 5;
const MAX_COMMENT_LENGTH = 140;

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

  hashtagsArray.forEach((hashtag) => {
    if (hashtag.charAt(0) !== '#') {
      textHashtags.setCustomValidity('Каждый хэш-тег должен начинаться с символа #');
    } else if (!isValid(RE_HASHTAG, hashtag)) {
      textHashtags.setCustomValidity('Xэш-тег должен состоять только из букв и чисел');
    } else if (hashtag.length < MIN_HASHTAG_LENGTH) {
      textHashtags.setCustomValidity('Xэш-тег не может состоять только из одной #');
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      textHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    } else {
      textHashtags.setCustomValidity('');
    }
    textHashtags.reportValidity();
    return;
  });
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
