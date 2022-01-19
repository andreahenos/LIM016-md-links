import {
  verifyPathExistence,
  verifyPathType,
  /* covertPathTypeToAbsolute,
  verifyFileType,
  readDirectory,
  getExtension,
  readFiles, */
} from './api.js';

function mdLinks(path) {
  try {
    if (verifyPathExistence(path)) {
      console.log('1. Path exist.');
      verifyPathType(path);
    } else {
      console.log('1. Path does not exist.');
    }
  } catch (err) {
    console.log('1. An error has occurred.', err);
  }

  /* verifyPathExistence(path)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err)); */

  /*
  covertPathTypeToAbsolute(path);
  verifyFileType(path);
  readDirectory(path);
  getExtension(path);
  readFiles(path);
  */
}

// mdLinks('./Modelo');
mdLinks('C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Modelo');
