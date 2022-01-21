import fs from 'fs';
import path from 'path';

// comprobar validez
export const verifyPathExistence = (route) => fs.existsSync(route);

// ver tipo de path y convertir
const getAbsolutePath = (route) => (!path.isAbsolute(route)
  ? path.resolve(route)
  : route);

// comprobar tipo de archivo
const verifyFileType = (route) => fs.statSync(route).isFile();

// leer directorio
const readDirectory = (route) => {
  const arrOfFiles = fs.readdirSync(route);
  return arrOfFiles.map((file) => getAbsolutePath(path.join(route, file)));
};

// filter md files
const arrMdFiles = (route) => {
  if (path.extname(route) === '.md') return route.split(' ');
  return console.log('It is not an md format file');
};

const arrMdFilesOfDirectory = (arrOfFiles) => {
  try {
    return readDirectory(arrOfFiles).filter((file) => path.extname(file) === '.md');
  } catch (err) {
    return console.log('An error has occurred: ', err);
  }
};

// leer archivos
export const readFiles = (arr) => arr.forEach((file) => fs.readFileSync(file, 'utf8'));

// get array of md format file
export const arrOfMdFiles = (route) => {
  const promise = new Promise((resolve) => {
    const absolutePath = getAbsolutePath(route);
    try {
      if (verifyFileType(absolutePath) === false) {
        resolve(arrMdFilesOfDirectory(absolutePath));
      } else {
        resolve(arrMdFiles(absolutePath));
      }
    } catch (err) {
      console.log('An error has occurred: ', err);
    }
  });
  return promise;
};
