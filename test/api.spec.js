import {
  verifyPathExistence,
/*   getAbsolutePath,
  verifyFileType,
  arrWithMdFileRoutes,
  objsArrWithRouteAndContent,
  convertToHtml,
  filterTagsA,
  objArrWithRouteAndTagsA,
  httpRequest,
  httpRequestRes,
  getProperties, */
} from '../src/api.js';

describe('verifyPathExistence', () => {
  it('verifyPathExistence retorna TRUE si la ruta ingresada existe', () => {
    const result = verifyPathExistence('./Prueba');
    expect(result).toBe(true);
  });
  it('verifyPathExistence retorna FALSE si la ruta ingresada no existe', () => {
    const result = verifyPathExistence('./Pruebaaa');
    expect(result).toBe(false);
  });
});
