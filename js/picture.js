import {openModalWindow} from './big-picture.js';

const clearPictures = () => {
  const pictureList = document.querySelector('.pictures');
  const pictures = pictureList.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
};

const renderPictures = (pictures) => {
  const pictureList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;

  const pictureFragment = document.createDocumentFragment();

  pictures.forEach((description) => {
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

  clearPictures();
  pictureList.appendChild(pictureFragment);
};

export {renderPictures};
