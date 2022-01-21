import {
  verifyPathExistence,
  arrOfMdFiles,
} from './api.js';

function mdLinks(path) {
  try {
    if (verifyPathExistence(path)) {
      return arrOfMdFiles(path)
        .then((arrOfFiles) => console.log(arrOfFiles));
    }
    return console.log('1. Path doesnt exist.');
  } catch (err) {
    return console.log('An error has occurred: ', err);
  }
}

mdLinks('./Modelo/Modelo2');
mdLinks('./Modelo/md.md');
// mdLinks('C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Modelo');
