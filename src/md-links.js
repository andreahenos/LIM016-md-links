import {
  verifyPathExistence,
  verifyFileType,
  filterTagsA,
  getProperties,
  readDirectory,
  arrMdFilesOfDirectory,
} from './api.js';

function mdLinks(path) {
  const promise = new Promise((resolve, reject) => {
    try {
      if (verifyPathExistence(path)) {
        if (verifyFileType(path) === true) {
          if (filterTagsA(path).length < 1) resolve('The file is not in Markdown format.');
          if (filterTagsA(path)[0].length < 1) resolve('There are no links in the file.');
          (getProperties(path)
            .then((res) => resolve(res))
          );
        }
        if (verifyFileType(path) === false) {
          if (readDirectory(path).length < 1) resolve('The folder has no file.');
          if (arrMdFilesOfDirectory(path).length < 1) resolve('The folder has no Markdown format files.');
          if (filterTagsA(path).reduce((a, b) => a.concat(b)).length < 1) resolve('There are no links in the file of the folder.');
          (getProperties(path)
            .then((res) => resolve(res))
          );
        }
      } else resolve('Path doesnt exist.');
    } catch (err) {
      reject(`An error has occurred: ${err}`);
    }
  });
  return promise;
}

mdLinks('./Modelo/Modelo2').then((res) => console.log(res)).catch((err) => console.log(err));
