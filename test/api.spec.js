import {
  verifyPathExistence,
  getAbsolutePath,
  verifyFileType,
  arrWithMdFileRoutes,
  objsArrWithRouteAndContent,
  convertToHtml,
  filterTagsA,
  objArrWithRouteAndTagsA,
/*  httpRequest,
  httpRequestRes,
  getProperties, */
} from '../src/api.js';

const arrOfAllMdFiles = [
  'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\md.md',
  'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\Other\\md2.md'];

const arrOfAllMdFilesVacío = [];

const objsArr = [{
  route: 'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\md.md',
  content: '### Prueba de documento con links\r\n'
  + '* [Unique](https://nodejs.org/api/path.html)\r\n'
  + '* [Repeated](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)\r\n'
  + '* [Repeated](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)\r\n'
  + '* [Broken](https://www.marvel.com/moves)',
}, {
  route: 'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\Other\\md2.md',
  content: '### Prueba de documento sin links',
}];

const htmlContent = `<h3 id="prueba-de-documento-con-links">Prueba de documento con links</h3>
<ul>
<li><a href="https://nodejs.org/api/path.html">Unique</a></li>
<li><a href="https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e">Repeated</a></li>
<li><a href="https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e">Repeated</a></li>
<li><a href="https://www.marvel.com/moves">Broken</a></li>
</ul>
`;

const htmlContentWithoutLinks = '<h3 id="prueba-de-documento-sin-links">Prueba de documento sin links</h3>';

const arrOfAllLinks = ['https://nodejs.org/api/path.html', 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e', 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e', 'https://www.marvel.com/moves'];

const NewObjsArr = [{
  route: 'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\md.md',
  content: arrOfAllLinks,
}, {
  route: 'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\Other\\md2.md',
  content: [],
}];

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

  it('Retorna un array vacío si la ruta ingresada no contiene archivos .md', () => {
    const arrOfFiles = arrWithMdFileRoutes('./Carpeta/Other/js.js');
    expect(arrOfFiles).toEqual([]);
  });
});

describe('objsArrWithRouteAndContent', () => {
  it('Retorna un array de objetos con las rutas absolutas de cada archivo .md y su contenido', () => {
    const objsArrResult = objsArrWithRouteAndContent(arrOfAllMdFiles);
    expect(objsArrResult).toEqual(objsArr);
  });

  it('Retorna un array vacío si el array pasado como parametro es vacío', () => {
    const objsArrResult = objsArrWithRouteAndContent(arrOfAllMdFilesVacío);
    expect(objsArrResult).toEqual([]);
  });
});

describe('convertToHtml', () => {
  it('Retorna el contenido de un archivo .md en formato HTML', () => {
    const mdContent = convertToHtml(objsArr[0].content);
    expect(mdContent).toEqual(htmlContent);
  });
});

describe('filterTagsA', () => {
  it('Retorna un array con los tags anchor del contenido ingresado', () => {
    const arrOfTagsAContent = filterTagsA(htmlContent).map((one) => one.toString());
    expect(arrOfTagsAContent).toEqual(arrOfAllLinks);
  });

  it('Retorna un array vacío si el contenido ingresado no tiene tags anchor', () => {
    const arrOfTagsAContent = filterTagsA(htmlContentWithoutLinks);
    expect(arrOfTagsAContent).toEqual([]);
  });
});

describe('objArrWithRouteAndTagsA', () => {
  it('Retorna un array de objetos con las rutas absolutas de cada archivo .md y sus links', () => {
    const objsArrResult = () => {
      let obj = objArrWithRouteAndTagsA('./Carpeta');
      obj = [
        {
          route: obj[0].route,
          content: obj[0].content.map((one) => one.toString()),
        },
        {
          route: obj[1].route,
          content: obj[1].content,
        },
      ];
      return obj;
    };
    expect(objsArrResult()).toEqual(NewObjsArr);
  });
});
