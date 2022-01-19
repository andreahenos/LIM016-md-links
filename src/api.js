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

// comprobar tipo de ruta
export const verifyPathType = (route) => {
  if (path.isAbsolute(route)) return console.log('2. Path type: Absolute path.');
  return console.log('2. Path type: Relative path.');
};

// convertir ruta relativa a absoluta
export const covertPathTypeToAbsolute = (route) => {
  // console.log('process.cwd(): ', process.cwd());
  console.log('3. Absolute path: ', path.resolve(route));
};

// comprobar tipo de archivo
export const verifyFileType = (route) => {
  fs.lstat(route, (err, stats) => {
    if (err) return console.log('4. An error has occurred.');
    if (stats.isFile()) return console.log('4. Stat: File');
    return console.log('4. Stat: Directory');
  });
};

// leer directorio
export const readDirectory = (route) => {
  fs.readdir(route, (err, files) => {
    if (err) return console.log('5. Files: None (is a file).');
    return console.log('5. Files: ', files);
  });
};

// comprobar extensión
export const getExtension = (route) => {
  // console.log('1. Extention: ', path.parse(route).ext);
  console.log('6. Extension: ', path.extname(route));
};

// leer archivos
export const readFiles = (route) => {
  fs.readFile(route, 'utf8', (err, content) => {
    if (err) return console.log('7. Content file: None (is a directory).');
    return console.log('7. Content file :', content);
  });
};
