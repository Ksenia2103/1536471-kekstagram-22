const getRandomNumber = function (min, max) {
  if (min < max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
  alert('Минимальное значение не может быть больше максимального!');
}

alert(getRandomNumber(1, 10));

const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('Академия',5);
