import fs from 'fs';

// comprobar valides
export const verifyFileExistence = (route) => {
  fs.access(route, fs.F_OK, (err) => {
    if (err) return console.log('1. Path does not exist.');
    return console.log('1. Path exist');
  });
};

// comprobar tipo de archivo
export const verifyFileType = (route) => {
  fs.lstat(route, (err, stats) => {
    if (err) return console.log('2. Ha ocurrido un error.');
    if (stats.isFile()) return console.log('2. Stats: Is a file');
    return console.log('2. Stats: Is a directory');
  });
};

// leer directorios
export const readDirectory = (route) => {
  fs.readdir(route, (err, files) => {
    if (err) return console.log('3. Files: None (is a file).');
    return console.log('3. Files: ', files);
  });
};

// leer archivos
export const readFiles = (route) => {
  fs.readFile(route, 'utf8', (err, content) => {
    if (err) return console.log('4. Content file: None (is a directory).');
    return console.log('4. Content file :', content);
  });
};
