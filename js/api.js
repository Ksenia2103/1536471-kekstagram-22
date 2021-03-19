const API_URL = 'https://22.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(`${API_URL}/data`, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(API_URL, {
    method: 'POST',
    credentials: 'same-origin',
    body: body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

let pictures = {};

const getPicturesData = () => {
  return pictures;
};

const setPicturesData = (data) => {
  pictures = data;
};

export {getData, sendData, getPicturesData, setPicturesData};

