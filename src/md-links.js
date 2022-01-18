import {
  verifyFileExistence,
  verifyFileType,
  readDirectory,
  readFiles,
} from './api.js';

function mdLinks(route) {
  verifyFileExistence(route);
  verifyFileType(route);
  readDirectory(route);
  readFiles(route);
}

mdLinks('./Modelo');
