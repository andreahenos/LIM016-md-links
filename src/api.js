import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

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

// filter md files
const arrMdFiles = (route) => {
  if (path.extname(route) === '.md') return route.split(' ');
  return console.log('It is not an md format file');
};

const arrMdFilesOfDirectory = (arrOfFiles) => {
  try {
    return readDirectory(arrOfFiles).filter((file) => path.extname(file) === '.md');
  } catch (err) {
    return console.log('An error has occurred: ', err);
  }
};

// read files
const readFiles = (arr) => arr.map((file) => fs.readFileSync(file, 'utf8'));

// get content of md format file
export const contentOfMdFiles = (route) => {
  const absolutePath = getAbsolutePath(route);
  try {
    if (verifyFileType(absolutePath) === false) {
      const arrOfFiles = arrMdFilesOfDirectory(absolutePath);
      return readFiles(arrOfFiles);
    }
    const arrOfFiles = arrMdFiles(absolutePath);
    return readFiles(arrOfFiles);
  } catch (err) {
    return console.log('An error has occurred: ', err);
  }
};

// convert content of file in HTMl format
const convertToHtml = (route) => {
  const content = contentOfMdFiles(route);
  const contentInHtml = content.map((oneContent) => marked.parse(oneContent));
  return contentInHtml;
};

// sanitize the output HTML
const satanizeHtml = (route) => {
  const html = convertToHtml(route);
  const dom = new JSDOM(html);
  const DOMPurify = createDOMPurify(dom.window);
  const cleanHtml = html.map((oneFile) => DOMPurify.sanitize(oneFile));
  return cleanHtml;
};

// get anchor elements
/* export const filterLinks = (route) => {
  const promise = new Promise((resolve) => {
    const html = satanizeHtml(route);
    console.log(html);
    const a = html.map((oneHtml) => {
      const dom = new JSDOM(oneHtml);
      const arrayOfTagsA = [];
      const tagsA = dom.window.document.querySelectorAll('a');
      arrayOfTagsA.push(tagsA);
      if (arrayOfTagsA === []) return ('No links to analize.');
      return arrayOfTagsA;
    });
    resolve(a);
  });
  return promise;
}; */

const filterLinks = (html) => {
  // const promise = new Promise((resolve) => {
    console.log(html);
    const dom = new JSDOM(html);
    const tagsA = dom.window.document.querySelectorAll('a');
    const arrayOfTagsA = Array.from(tagsA);
    if (arrayOfTagsA === []) console.log('No links to analize.');
    if (arrayOfTagsA.length === 1) console.log(arrayOfTagsA[0].href);
    return arrayOfTagsA.map((elem) => elem.href);
    // resolve(arrayOfTagsA.map((elem) => elem.href));
  // });
  // return promise;
};

export const b = (route) => {
  const allFileHtml = satanizeHtml(route);
  if (allFileHtml.length === 1) return filterLinks(allFileHtml);
  return allFileHtml.map((doc) => filterLinks(doc));
};
