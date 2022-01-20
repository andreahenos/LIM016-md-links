import {
  verifyPathExistence,
  getAbsolutePath,
  verifyFileType,
  readDirectory,
  getExtension,
  readFiles,
} from './api.js';

function mdLinks(path) {
  try {
    if (verifyPathExistence(path)) {
      console.log('1. Path exist.');
      getAbsolutePath(path);
      verifyFileType(path)
        .then((verifyMessage) => {
          console.log(verifyMessage);
          if (verifyMessage === '3. Stat: Directory') {
            readDirectory(path)
              .then((files) => {
                const getMdFiles = files.filter((file) => getExtension(file) === '.md');
                if (getMdFiles === []) console.log('There are no md files.');
                console.log(getMdFiles);
                readFiles('C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Modelo\\prueba.js');
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log('1. Path does not exist.');
    }
  } catch (err) {
    console.log('1. An error has occurred: ', err);
  }
}

mdLinks('./Modelo');
// mdLinks('./Modelo/prueba2.md');
// mdLinks('C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Modelo\\prueba.js');
