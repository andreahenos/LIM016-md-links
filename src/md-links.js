import {
  verifyPathExistence,
  verifyFileType,
  filterTagsA,
  getProperties,
  readDirectory,
  arrMdFilesOfDirectory,
} from './api.js';

function mdLinks(path) {
  try {
    if (verifyPathExistence(path)) {
      if (verifyFileType(path) === true) {
        if (filterTagsA(path).length < 1) return console.log('The file is not in Markdown format.');
        if (filterTagsA(path)[0].length < 1) return console.log('There are no links in the file.');
        return (getProperties(path)
          .then((res) => console.log(res))
        );
      }
      if (readDirectory(path).length < 1) return console.log('The folder has no file.');
      if (arrMdFilesOfDirectory(path).length < 1) return console.log('The folder has no Markdown format files.');
      return (getProperties(path)
        .then((res) => {
          if (res.length < 1) return console.log('There are no links in the file of the folder.');
          return console.log(res);
        })
      );
    }
    return console.log('Path doesnt exist.');
  } catch (err) {
    return console.log('An error has occurred: ', err);
  }
}

mdLinks('./Modelo/Modelo5');
