import {
  getProperties,
} from './api.js';

export function mdLinks(path, option) {
  const promise = new Promise((resolve, reject) => {
    try {
      if (option) {
        Promise.all(getProperties(path))
          .then((res) => {
            resolve(res.flat());
          });
      }
    } catch (err) {
      reject(`\n> AN ERROR HAS OCURRED:  ${err.message}\n`);
    }
  });
  return promise;
}
