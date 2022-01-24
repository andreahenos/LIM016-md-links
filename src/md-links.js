import {
  verifyPathExistence,
  getPropertiesByFile,
} from './api.js';

function mdLinks(path) {
  try {
    if (verifyPathExistence(path)) {
      return getPropertiesByFile(path)
        .then((res) => console.log(res));
    }
    return console.log('Path doesnt exist.');
  } catch (err) {
    return console.log('An error has occurred: ', err);
  }
}

// mdLinks('./Modelo/md2.md');
// mdLinks('./Modelo');
mdLinks('./Modelo');
// mdLinks('C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Modelo');
