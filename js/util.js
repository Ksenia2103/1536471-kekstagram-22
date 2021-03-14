const getRandomNumber = function (min, max) {
  if (min < max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
  alert('Минимальное значение не может быть больше максимального!');
}

const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
}

function getRandomArrayElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const isDuplicate = (hashtags) => {
  return new Set(hashtags).size !== hashtags.length;
}

const isValid = (regex, hashtag) => {
  return regex.test(hashtag);
}

export {getRandomNumber, checkStringLength, getRandomArrayElement, isEscEvent, isDuplicate, isValid};
