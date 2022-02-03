import {
  verifyPathExistence,
  getProperties,
} from './api.js';

export function mdLinks(path, option) {
  const promise = new Promise((resolve, reject) => {
    try {
      if (verifyPathExistence(path)) {
        Promise.all(getProperties(path))
          .then((res) => resolve(res.flat()));
      } else if (option.help) {
        resolve(`   Usage:
        mdLinks <path> ------------------------------------------ To have href, text and file
        mdLinks <path> [-validate] or [-v] -------------------- To have href, text, file, status and "ok" message
        mdLinks <path> [-stats] or [-s] ----------------------- To have total and unique links
        mdLinks <path> [-validate] [-stats] or [-v] [-s] ---- To have total, unique and broken links
        mdLinks <path> [-help] or [-h] ------------------------ To see all options`);
      } else resolve("Path does'nt exist.");
    } catch (err) {
      reject(`An error has occurred: ${err.message}`);
    }
  });
  return promise;
}
