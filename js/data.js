import {getRandomNumber, getRandomArrayElement} from './util.js';

const NAMES = [
  'Мария',
  'Юлия',
  'Ксения',
  'Ольга',
  'Светлана',
  'Петр',
  'Иван',
  'Евгений',
  'Сергей',
  'Василий',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Природа без фильтров',
  'Угадайте где это место!',
  'Невероятная красота',
  'Фото как с обложки журнала!',
  'Мой первый опыт в роли фотографа. Оцените кадр)',
  'Фото из отпуска',
  'Здесь замирает сердце!',
  'Постановочное фото',
  'Какой прекрасный день',
  'Неповторимое мгновение!',
];

const PHOTOS_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 1;
const COMMENTS_MAX = 3;

function getCommentsArray() {
  let comments = [];

  for (let i = 0; i < getRandomNumber(COMMENTS_MIN, COMMENTS_MAX); i++) {
    const comment = {
      id: i + getRandomNumber(1, 500),
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    };
    comments.push(comment);
  }
  return comments;
}

function getPhoto(index) {
  const photoDescription = getRandomArrayElement(DESCRIPTIONS);
  const likesCount = getRandomNumber(LIKES_MIN, LIKES_MAX);

  let photo = {
    id: index,
    url: 'photos/' + index + '.jpg',
    description: photoDescription,
    likes: likesCount,
    comments: getCommentsArray(),
  };

  return photo;
}

const getPhotosDescription = function () {
  let photos = [];
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push(getPhoto(i));
  }
  return photos;
}

export { getPhotosDescription };

