import {
  verifyPathExistence,
  getMdFiles,
} from './api.js';

function mdLinks(path) {
  try {
    if (verifyPathExistence(path)) return getMdFiles(path);
    return console.log('Path does not exist.');
  } catch (err) {
    return console.log('An error has occurred: ', err);
  }
}

mdLinks('./Modelo');
mdLinks('./Modelo/prueba2.md');
mdLinks('C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Modelo');
