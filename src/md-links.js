import {
  verifyPathExistence,
  getPropiedades,
} from './api.js';

function mdLinks(path) {
  try {
    if (verifyPathExistence(path)) {
      return getPropiedades(path)
        .then((res) => console.log(res));
    }
    return console.log('Path doesnt exist.');
  } catch (err) {
    return console.log('An error has occurred: ', err);
  }
}

// mdLinks('./Modelo/md.md');
mdLinks('./Modelo');
// mdLinks('./Modelo/Modelo3');
// mdLinks('C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Modelo');
