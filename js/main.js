import {getData} from './api.js';
import {renderPictures} from './picture.js';
import {showAlert} from './messages.js';
import './upload.js';
import './slider.js';
import './form-validation.js';

getData((pictures) => {renderPictures(pictures)}, showAlert);
