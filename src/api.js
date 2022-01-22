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
export const satanizeHtml = (route) => {
  const promise = new Promise((resolve) => {
    const html = convertToHtml(route);
    const dom = new JSDOM(html);
    const DOMPurify = createDOMPurify(dom.window);
    const cleanHtml = html.map((oneFile) => DOMPurify.sanitize(oneFile));
    resolve(cleanHtml);
  });
  return promise;
};
