import {
  verifyPathExistence,
  getProperties,
  filterTagsA,
  verifyFileType,
  readDirectory,
  arrMdFilesOfDirectory,
} from './api.js';

export function mdLinks(path, option) {
  const promise = new Promise((resolve, reject) => {
    try {
      if (verifyPathExistence(path)) {
        if (verifyFileType(path) === true) {
          if (filterTagsA(path).length < 1) resolve('The file is not in Markdown format.');
          if (filterTagsA(path)[0].length < 1) resolve('There are no links in the file.');
          (getProperties(path)
            .then((res) => resolve(res))
          );
        }
        if (verifyFileType(path) === false) {
          if (readDirectory(path).length < 1) resolve('The folder has no file.');
          if (arrMdFilesOfDirectory(path).length < 1) resolve('The folder has no Markdown format files.');
          if (filterTagsA(path).reduce((a, b) => a.concat(b)).length < 1) resolve('There are no links in the file of the folder.');
          (getProperties(path)
            .then((res) => resolve(res))
          );
        }
      } else if (option.help) {
        resolve(`   Usage:
        mdLinks <path> ------------------------------------------ To have href, text and file
        mdLinks <path> [--validate] or [--v] -------------------- To have href, text, file, status and "ok" message
        mdLinks <path> [--stats] or [--s] ----------------------- To have total and unique links
        mdLinks <path> [--validate] [--stats] or [--v] [--s] ---- To have total, unique and broken links
        mdLinks <path> [--help] or [--h] ------------------------ To see all options`);
      } else resolve("Path does'nt exist.");
    } catch (err) {
      reject(`An error has occurred: ${err.message}`);
    }
  });
  return promise;
}
