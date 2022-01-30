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
export const verifyFileType = (route) => fs.statSync(route).isFile();

// read directory
export const readDirectory = (route) => {
  const arrOfFiles = fs.readdirSync(route);
  return arrOfFiles.map((file) => getAbsolutePath(path.join(route, file)));
};

// read files
const readFiles = (arr) => arr.map((file) => fs.readFileSync(file, 'utf8'));

// filter md files
const arrMdFile = (route) => {
  if (path.extname(route) === '.md') return route.split(' ');
  return [];
};

export const arrMdFilesOfDirectory = (arrOfFiles) => {
  try {
    const arrOfMdFiles = readDirectory(arrOfFiles).filter((file) => path.extname(file) === '.md');
    return arrOfMdFiles;
  } catch (err) {
    return console.log(err.message);
  }
};

// get content of md format file
const contentOfMdFiles = (route) => {
  const absolutePath = getAbsolutePath(route);
  try {
    if (verifyFileType(absolutePath) === false) {
      const arrOfMdFiles = arrMdFilesOfDirectory(absolutePath);
      return readFiles(arrOfMdFiles);
    }
    const arrOfMdFiles = arrMdFile(absolutePath);
    return readFiles(arrOfMdFiles);
  } catch (err) {
    return console.log(err.message);
  }
};

// convert content of file in HTMl format
const convertToHtml = (route) => {
  const arrOfContent = contentOfMdFiles(route);
  const arrOfContentInHtml = arrOfContent.map((oneContent) => marked.parse(oneContent));
  const arrOfSanitizedHtmls = arrOfContentInHtml.map((oneFile) => {
    const dom = new JSDOM(oneFile);
    const DOMPurify = createDOMPurify(dom.window);
    return DOMPurify.sanitize(oneFile);
  });
  return arrOfSanitizedHtmls;
};

// get tags 'a'
export const filterTagsA = (route) => {
  const arrOfHtmls = convertToHtml(route);
  const arrOfTagsA = arrOfHtmls.map((html) => {
    const dom = new JSDOM(html);
    const tagsA = dom.window.document.querySelectorAll('a');
    return Array.from(tagsA);
  });
  return arrOfTagsA;
};

// http request
const httpRequest = (arrOfTagsA) => Promise.allSettled(arrOfTagsA.map((tag) => axios.get(tag.href)
  .then((res) => ({
    href: tag.href,
    text: tag.textContent.slice(0, 50),
    status: res.status,
    message: 'ok',
  }))
  .catch((res) => ({
    href: tag.href,
    text: tag.textContent.slice(0, 50),
    status: res.response.status,
    message: 'fail',
  }))));

const httpRequestRes = (arrOfTagsA, route) => httpRequest(arrOfTagsA)
  .then((res) => res.map((promiseResult) => ({
    href: promiseResult.value.href,
    text: promiseResult.value.text,
    file: route,
    status: promiseResult.value.status,
    ok: promiseResult.value.message,
  })));

// get properties
export const getProperties = (route) => {
  const arrOfTagsA = filterTagsA(route);
  if (arrOfTagsA.length === 1) {
    return httpRequestRes(arrOfTagsA[0], route);
  }
  const newArrOfTags = arrOfTagsA.reduce((a, b) => a.concat(b));
  return httpRequestRes(newArrOfTags, route);
};
