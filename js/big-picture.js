import {isEscEvent} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureCommentList = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const body = document.querySelector('body');
const closeButton = bigPicture.querySelector('.big-picture__cancel');


const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};

const openModalWindow = (element) => {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  showBigPicture(element);
  closeButton.addEventListener('click', closeModalWindow);
  document.addEventListener('keydown', onEscKeydown);
};

const closeModalWindow = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const showBigPicture = (picture) => {
  bigPictureImg.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureDescription.textContent = picture.description;
  bigPictureComments.textContent = picture.comments.length;

  createCommentsList(picture.comments);
};

const createCommentsList = (comments) => {
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const commentsList = document.createDocumentFragment();
  const commentSocialPicture = commentTemplate.querySelector('.social__picture');
  const commentSocialText = commentTemplate.querySelector('.social__text');

  comments.forEach((comment) => {
    const element = commentTemplate.cloneNode(true);

    commentSocialPicture.src = comment.avatar;
    commentSocialPicture.alt = comment.name;
    commentSocialText.textContent = comment.message;

    commentsList.appendChild(element);
  });

  bigPictureCommentList.appendChild(commentsList);
};

export {openModalWindow};
