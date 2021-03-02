import {getPhotosDescription} from './data.js';
import {openModalWindow} from './big-picture.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureDescription = getPhotosDescription();

const pictureFragment = document.createDocumentFragment();

pictureDescription.forEach((description) => {
  const pictureItem = pictureTemplate.cloneNode(true);

  pictureItem.querySelector('.picture__img').src = description.url;
  pictureItem.querySelector('.picture__likes').textContent = description.likes;
  pictureItem.querySelector('.picture__comments').textContent = description.comments.length;
  pictureFragment.appendChild(pictureItem);

  pictureItem.addEventListener('click', (evt) => {
    evt.preventDefault();

    openModalWindow(pictureItem);
  });
});

pictureList.appendChild(pictureFragment);
