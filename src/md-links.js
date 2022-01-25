import {
  verifyPathExistence,
  getPropertiesByFile,
} from './api.js';

function mdLinks(path) {
  try {
    if (verifyPathExistence(path)) {
      return console.log(getPropertiesByFile(path));
    }
    return console.log('Path doesnt exist.');
  } catch (err) {
    return console.log('An error has occurred: ', err);
  }
}

mdLinks('./Modelo/md.md');
// mdLinks('./Modelo/md2.md');
// mdLinks('./Modelo/md3.md');
// mdLinks('C:/Users/51960/Desktop/Md-Links/LIM016-md-links/Modelo');
