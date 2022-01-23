import {
  verifyPathExistence,
  b,
} from './api.js';

function mdLinks(path) {
  try {
    if (verifyPathExistence(path)) {
      return console.log(b(path));
        // .then((res) => console.log(res));
    }
    return console.log('1. Path doesnt exist.');
  } catch (err) {
    return console.log('An error has occurred: ', err);
  }
}

mdLinks('./Modelo');
// mdLinks('./Modelo/md2.md');
// mdLinks('C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Modelo');
