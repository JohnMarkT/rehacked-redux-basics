import 'isomorphic-fetch';
import {ENVIRONMENT} from '../constants/environment';
import {USER} from '../constants/endpoints';

export function login(email, password) {
  return new Promise(
    (resolve, reject) => {
      var url = ENVIRONMENT.API_PATH + USER.LOGIN;

      var payload = {
        email: email,
        password: password
      };

      var options = {
        method: 'POST',
        body: JSON.stringify(payload)
      };

      return fetch(url, options)
        .then(response => {
          return checkStatus(response);
        })
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          return resolve(responseJson);
        })
        .catch(error => {
          return reject(error);
        });
    });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return response.text()
      .then(responseObj => {
        var response = JSON.parse(responseObj);
        throw new Error(response.message);
      });
  }
}
