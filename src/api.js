import fs from 'fs';
import path from 'path';

// comprobar validez
export const verifyPathExistence = (route) => fs.existsSync(route);

/*
// comprobar validez
export const verifyPathExistence = (route) => {
  const promise = new Promise((resolve, reject) => {
    fs.access(route, fs.F_OK, (err) => {
      if (err) return reject('1. Path does not exist.');
      // console.log('1. Path does not exist.');
      return resolve('1. Path exist.');
    });
  });
  return promise;
}; */

/*
// comprobar validez
export const verifyPathExistence = (route) => {
  fs.access(route, fs.F_OK, (err) => {
    if (err) return false;
    // console.log('1. Path does not exist.');
    return console.log('1. Path exist');
  });
}; */

// ver tipo de path y convertir
export const getAbsolutePath = (route) => (!path.isAbsolute(route)
  ? console.log('2. File: ', path.resolve(route))
  : console.log('2. File: ', route));

// comprobar tipo de archivo
export const verifyFileType = (route) => {
  const promise = new Promise((resolve, reject) => {
    fs.lstat(route, (err, stats) => {
      if (err) reject('3. An error has occurred: ', err);
      const verify = !stats.isFile() ? '3. Stat: Directory' : '3. Stat: File';
      resolve(verify);
    });
  });
  return promise;
};

// leer directorio
export const readDirectory = (route) => {
  const promise = new Promise((resolve, reject) => {
    fs.readdir(route, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
  return promise;
};

// comprobar extensión
export const getExtension = (route) => path.extname(route);

// leer archivos
export const readFiles = (route) => {
  fs.readFile(route, 'utf8', (err, content) => {
    if (err) return console.log(err);
    return console.log(content);
  });
};
