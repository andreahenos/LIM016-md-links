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
export const arrMdFile = (route) => {
  if (path.extname(route) === '.md') return route.split(' ');
  return [];
};

export const arrMdFilesOfDirectory = (arrOfFiles) => {
  try {
    const arrOfMdFiles = readDirectory(arrOfFiles).filter((file) => path.extname(file) === '.md');
    return arrOfMdFiles;
  } catch (err) {
    return console.log(`An error has occurred: ${err}`);
  }
};

// get content of md format file
const contentOfMdFiles = (route) => {
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
const convertToHtml = (route) => {
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
export const filterTagsA = (route) => {
  const arrOfHtml = convertToHtml(route);
  return arrOfHtml.map((html) => {
    const dom = new JSDOM(html);
    const tagsA = dom.window.document.querySelectorAll('a');
    return Array.from(tagsA);
  });
};

const httpRequest = (arrOfTags) => {
  const getRequire = arrOfTags.map((tag) => axios.get(tag.href)
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
    })));
  return Promise.allSettled(getRequire);
};

const httpRequestRes = (arrOfTagsA, route) => httpRequest(arrOfTagsA)
  .then((res) => res.map((promiseResult) => ({
    href: promiseResult.value.href,
    text: promiseResult.value.text,
    file: route,
    status: promiseResult.value.status,
    ok: promiseResult.value.message,
  })));

export const getProperties = (route) => {
  const arrOfTagsA = filterTagsA(route);
  if (arrOfTagsA.length === 1) {
    return httpRequestRes(arrOfTagsA[0], route);
  }
  const newArrOfTags = arrOfTagsA.reduce((a, b) => a.concat(b));
  return httpRequestRes(newArrOfTags, route);
};
