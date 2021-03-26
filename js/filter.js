import _ from 'lodash';
import {getPicturesData} from './api.js';
import {renderPictures} from './picture.js';
import {RENDER_DELAY, RANDOM_PICTURE_COUNT} from './constants.js';

const imageFilters = document.querySelector('.img-filters');
const imageFiltersForm = imageFilters.querySelector('.img-filters__form');
const imageFilterButtons = imageFilters.querySelectorAll('.img-filters__button');
const defaultFilterButton = imageFiltersForm.querySelector('#filter-default');
const randomFilterButton = imageFiltersForm.querySelector('#filter-random');
const discussedFilterButton = imageFiltersForm.querySelector('#filter-discussed');

const sortRandom = (array) => {
  const randomArray = array.slice();
  for (let i = randomArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = randomArray[i];
    randomArray[i] = randomArray[j];
    randomArray[j] = temp;
  }
  return randomArray;
};

const sortByComments = (array) => {
  return array.slice().sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
};

const resetFilter = () => {
  imageFilterButtons.forEach((button) => {
    if (button.classList.contains('img-filters__button--active')) {
      button.classList.remove('img-filters__button--active');
    }
  });
};

const updatePictures = (pictures, button) => {
  resetFilter();
  button.classList.add('img-filters__button--active');
  renderPictures(pictures);
};

const defaultFilterHandler = () => {
  const pictures = getPicturesData();
  updatePictures(pictures, defaultFilterButton);
};

const randomFilterHandler = () => {
  const pictures = getPicturesData();
  const randomSortedPictures = sortRandom(pictures);
  const filterPictures = randomSortedPictures.slice(0, RANDOM_PICTURE_COUNT);

  updatePictures(filterPictures, randomFilterButton);
};

const discussedFilterHandler = () => {
  const pictures = getPicturesData();
  const discussSortedPictures = sortByComments(pictures);

  updatePictures(discussSortedPictures, discussedFilterButton);
};


const setFilter = () => {
  imageFilters.classList.remove('img-filters--inactive');

  defaultFilterButton.addEventListener('click', _.debounce(defaultFilterHandler, RENDER_DELAY));
  randomFilterButton.addEventListener('click', _.debounce(randomFilterHandler, RENDER_DELAY));
  discussedFilterButton.addEventListener('click', _.debounce(discussedFilterHandler, RENDER_DELAY));
};

export {setFilter};
