import {isEscEvent} from './util.js';
import {VISIBLE_COMMENTS_COUNT} from './constants.js';

let arrayComments = {};
let commentStep;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureCommentList = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureVisibleCommentsCount = bigPicture.querySelector('.visible-comments-count');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentSocialPicture = commentTemplate.querySelector('.social__picture');
const commentSocialText = commentTemplate.querySelector('.social__text');

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

const createCommentsList = (picture) => {
  arrayComments = picture.comments;
  bigPictureCommentList.textContent = '';
  commentStep = 0;
  uploadComments();

  if (arrayComments.length <= VISIBLE_COMMENTS_COUNT) {
    if (!commentsLoader.classList.contains('hidden')) {
      commentsLoader.classList.add('hidden');
    }
  } else {
    commentsLoader.addEventListener('click', uploadComments);

    if (commentsLoader.classList.contains('hidden')) {
      commentsLoader.classList.remove('hidden');
    }
  }
};

const showBigPicture = (picture) => {
  bigPictureImg.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureDescription.textContent = picture.description;
  bigPictureComments.textContent = picture.comments.length;

  createCommentsList(picture);
};

const renderComment = (comment) => {
  const element = commentTemplate.cloneNode(true);

  commentSocialPicture.src = comment.avatar;
  commentSocialPicture.alt = comment.name;
  commentSocialText.textContent = comment.message;
  return element;
};

const renderComments = (comments) => {
  const commentsPartList = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentsPartList.appendChild(renderComment(comment));
  });
  bigPictureCommentList.appendChild(commentsPartList);
};

const uploadComments = () => {
  const commentStartValue = commentStep * VISIBLE_COMMENTS_COUNT;
  commentStep++;
  const commentEndValue = commentStep * VISIBLE_COMMENTS_COUNT;

  const commentsPart = arrayComments.slice(commentStartValue, commentEndValue);
  bigPictureVisibleCommentsCount.textContent = commentEndValue;
  renderComments(commentsPart);

  if (commentEndValue >= arrayComments.length) {
    bigPictureVisibleCommentsCount.textContent = arrayComments.length;
    commentsLoader.removeEventListener('click', uploadComments);
    if (!commentsLoader.classList.contains('hidden')) {
      commentsLoader.classList.add('hidden');
    }
  }
};

export {openModalWindow};
