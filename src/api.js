import fs from 'fs';
import path from 'path';

// comprobar validez
export const verifyPathExistence = (route) => fs.existsSync(route);

// ver tipo de path y convertir
const getAbsolutePath = (route) => (!path.isAbsolute(route)
  ? path.resolve(route)
  : route);

// comprobar tipo de archivo
const verifyFileType = (route) => {
  const promise = new Promise((resolve, reject) => {
    fs.lstat(route, (err, stats) => {
      if (err) reject(err);
      resolve(stats.isFile());
    });
  });
  return promise;
};

// leer directorio
const readDirectory = (route) => {
  const promise = new Promise((resolve, reject) => {
    fs.readdir(route, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
  return promise;
};

// comprobar extensión
const getExtension = (route) => path.extname(route);

// leer archivos
export const readFiles = (route) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(route, 'utf8', (err, content) => {
      if (err) reject(err);
      resolve(content);
    });
  });
  return promise;
};

// obtener archivos md
export const getMdFiles = (route) => {
  const absolutePath = getAbsolutePath(route);

  verifyFileType(absolutePath)
    .then((res) => {
      if (res) {
        if (getExtension(absolutePath) === '.md') return console.log(absolutePath.split(' '));
        return console.log('It is not an md format file');
      }
      readDirectory(absolutePath)
        .then((files) => {
          const searchMdFiles = files.filter((file) => getExtension(file) === '.md');
          if (files === [] || searchMdFiles === []) return ('There are no files with md format.');
          const convertAbsolute = searchMdFiles.map((file) => getAbsolutePath(file));
          return console.log(convertAbsolute);
        })
        .catch((err) => console.log('An error has occurred: ', err));
      return 'Obtained md file paths';
    })
    .catch((err) => console.log('An error has occurred: ', err));
};
