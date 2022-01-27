import {
  verifyPathExistence,
  getProperties,
} from './api.js';

function mdLinks(path) {
  try {
    if (verifyPathExistence(path)) {
      return (getProperties(path));
    }
    return console.log('Path doesnt exist.');
  } catch (err) {
    return console.log('An error has occurred: ', err);
  }
}

mdLinks('./Modelo/md.md')
  .then((res) => console.log(res));
// mdLinks('./Modelo/md2.md');
// mdLinks('./Modelo/md3.md');
// mdLinks('./Modelo/Modelo2');
// mdLinks('./Modelo/Modelo3');
// mdLinks('C:/Users/51960/Desktop/Md-Links/LIM016-md-links/Modelo');
