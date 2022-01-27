import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import axios from 'axios';

// verify path existence
export const verifyPathExistence = (route) => fs.existsSync(route);

// get absolute path
const getAbsolutePath = (route) => (!path.isAbsolute(route)
  ? path.resolve(route)
  : route);

// verify tipe of file
const verifyFileType = (route) => fs.statSync(route).isFile();

// read directory
const readDirectory = (route) => {
  const arrOfFiles = fs.readdirSync(route);
  return arrOfFiles.map((file) => getAbsolutePath(path.join(route, file)));
};

// read files
const readFiles = (arr) => arr.map((file) => fs.readFileSync(file, 'utf8'));

// filter md files
const arrMdFile = (route) => {
  if (path.extname(route) === '.md') return route.split(' ');
  return console.log('It is not an md format file');
};

const arrMdFilesOfDirectory = (arrOfFiles) => {
  try {
    return readDirectory(arrOfFiles).filter((file) => path.extname(file) === '.md');
  } catch (err) {
    return console.log(`An error has occurred: ${err}`);
  }
};

// get content of md format file
export const contentOfMdFiles = (route) => {
  const absolutePath = getAbsolutePath(route);
  try {
    if (verifyFileType(absolutePath) === false) {
      const arrOfFiles = arrMdFilesOfDirectory(absolutePath);
      return readFiles(arrOfFiles);
    }
    const arrOfFiles = arrMdFile(absolutePath);
    return readFiles(arrOfFiles);
  } catch (err) {
    return console.log(`An error has occurred: ${err}`);
  }
};

// convert content of file in HTMl format
export const convertToHtml = (route) => {
  const arrContent = contentOfMdFiles(route);
  const arrContentInHtml = arrContent.map((oneContent) => marked.parse(oneContent));
  const cleanHtml = arrContentInHtml.map((oneFile) => {
    const dom = new JSDOM(oneFile);
    const DOMPurify = createDOMPurify(dom.window);
    return DOMPurify.sanitize(oneFile);
  });
  return cleanHtml;
};

// get tags 'a'
export const filterTagsA = (html) => {
  const dom = new JSDOM(html);
  const tagsA = dom.window.document.querySelectorAll('a');
  return Array.from(tagsA);
};

/* export const filterTagsAA = (route) => {
  const arrOfHtml = convertToHtml(route);
  arrOfHtml.map((html) => {
    const dom = new JSDOM(html);
    const tagsA = dom.window.document.querySelectorAll('a');
    return console.log('AQUI', Array.from(tagsA));
  });
}; */

// get properties
const propertiesObj = (tag, route) => {
  const properties = {
    href: tag.href,
    text: (tag.textContent).slice(0, 50),
    file: route,
  };
  return properties;
};

export const httpRequest = (arrOfTags) => {
  const getRequire = arrOfTags.map((tag) => axios.get(tag.href)
    .then((res) => ({
      status: res.status,
    })));

  return Promise.allSettled(getRequire);
};

const httpRequestRes = (arrOfTagsA) => httpRequest(arrOfTagsA)
  .then((res) => res.map((promiseResult) => {
    if (promiseResult.status === 'fulfilled') {
      return {
        status: promiseResult.value.status,
        ok: 'ok',
      };
    }
    return {
      status: promiseResult.reason.response.status,
      ok: 'fail',
    };
  }));

export const getProperties = (route) => {
  const arrOfHtml = convertToHtml(route);
  return arrOfHtml.map((html) => {
    const arrOfTagsA = filterTagsA(html);
    if (arrOfTagsA.length === 0) return console.log('No hay links que analizar');
    console.log(arrOfTagsA.map((tag) => propertiesObj(tag, route)));
    return httpRequestRes(arrOfTagsA);
  });
};

// filterTagsAA('./Modelo/md2.md');
