// import axios from 'axios';
import {
  verifyPathExistence,
  getAbsolutePath,
  verifyFileType,
  arrWithMdFileRoutes,
  objsArrWithRouteAndContent,
  convertToHtml,
  filterTagsA,
  objArrWithRouteAndTagsA,
  httpRequest,
  getProperties,
} from '../src/api.js';

import {
  arrOfOneMdFile,
  arrOfAllMdFiles,
  objsArr,
  htmlContent,
  arrOfAllLinks,
  NewObjsArr,
  objsArrProperties,
} from './utils.js';

// jest.mock('axios');

describe('verifyPathExistence', () => {
  it('Retorna TRUE si la ruta ingresada existe', () => {
    const bool = verifyPathExistence('./Carpeta');
    expect(bool).toBeTruthy();
  });
  it('Retorna FALSE si la ruta ingresada no existe', () => {
    const bool = verifyPathExistence('./Carpetaaa');
    expect(bool).toBeFalsy();
  });
});

describe('getAbsolutePath', () => {
  it('Retorna la ruta absoluta si la ruta ingresada es relativa', () => {
    const absPath = getAbsolutePath('./Carpeta');
    expect(absPath).toBe('C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta');
  });

  it('Retorna la misma ruta si la ruta ingresada es absoluta', () => {
    const absPath = getAbsolutePath('C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta');
    expect(absPath).toBe('C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta');
  });
});

describe('verifyFileType', () => {
  it('Retorna TRUE si la ruta ingresada es de un archivo', () => {
    const bool = verifyFileType('./Carpeta/md.md');
    expect(bool).toBeTruthy();
  });

  it('Retorna FALSE si la ruta ingresada es de una carpeta', () => {
    const bool = verifyFileType('./Carpeta');
    expect(bool).toBeFalsy();
  });
});

describe('arrWithMdFileRoutes', () => {
  it('Retorna un array con rutas absolutas de los archivos .md que incluye la ruta ingresada', () => {
    const arrOfFiles = arrWithMdFileRoutes('./Carpeta');
    expect(arrOfFiles).toEqual(arrOfAllMdFiles);
  });

  it('Retorna un array con la ruta absoluta del archivo .md ingresado', () => {
    const arrOfFile = arrWithMdFileRoutes('./Carpeta/md.md');
    expect(arrOfFile).toEqual(arrOfOneMdFile);
  });

  it('Retorna un array vacío si la ruta ingresada no contiene archivos .md', () => {
    const arrOfFiles = arrWithMdFileRoutes('./Carpeta/Carpeta2/js.js');
    expect(arrOfFiles).toEqual([]);
  });
});

describe('objsArrWithRouteAndContent', () => {
  it('Retorna un array de objetos con las rutas absolutas de cada archivo .md y su contenido', () => {
    const objsArrResult = objsArrWithRouteAndContent(arrOfAllMdFiles);
    expect(objsArrResult).toEqual(objsArr);
  });

  it('Retorna un array vacío si el array pasado como parametro es vacío', () => {
    const objsArrResult = objsArrWithRouteAndContent(arrWithMdFileRoutes('./Carpeta/Carpeta3'));
    expect(objsArrResult).toEqual([]);
  });
});

describe('convertToHtml', () => {
  it('Retorna el contenido de un archivo .md en formato HTML', () => {
    const mdContent = convertToHtml(objsArr[1].content);
    expect(mdContent).toEqual(htmlContent);
  });
});

describe('filterTagsA', () => {
  it('Retorna un array con los tags anchor del contenido ingresado', () => {
    const arrOfTagsA = filterTagsA(htmlContent).map((one) => one.toString());
    expect(arrOfTagsA).toEqual(arrOfAllLinks);
  });

  it('Retorna un array vacío si el contenido ingresado no tiene tags anchor', () => {
    const arrOfTagsA = filterTagsA(convertToHtml(objsArr[0].content));
    expect(arrOfTagsA).toEqual([]);
  });
});

describe('objArrWithRouteAndTagsA', () => {
  it('Retorna un array de objetos con las rutas absolutas de cada archivo .md y sus links', () => {
    const objsArrResult = () => {
      let obj = objArrWithRouteAndTagsA('./Carpeta');
      obj = [
        {
          route: obj[0].route,
          content: obj[0].content,
        },
        {
          route: obj[1].route,
          content: obj[1].content.map((one) => one.toString()),
        },
      ];
      return obj;
    };
    expect(objsArrResult()).toEqual(NewObjsArr);
  });
});

describe('httpRequest', () => {
  const ruta = 'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\md.md';
  const arrOfLinks = objArrWithRouteAndTagsA('./Carpeta')[1].content;

  it('Retorna un array de objects con las propiedades de los links como resultado', (done) => {
    httpRequest(arrOfLinks, ruta)
      .then((result) => {
        expect(result).toEqual(objsArrProperties);
        done();
      })
      .catch((result) => {
        expect(result).toEqual(objsArrProperties);
        done();
      });
  });
});

describe('getProperties', () => {
  it('Retorna una promesa con un array de objects como resultado', () => {
    const ruta = 'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\md.md';
    Promise.all(getProperties(ruta))
      .then((res) => {
        expect(res.flat()).toEqual(objsArrProperties);
      });
  });
});
