import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

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

// get links
const filterTagsA = (html) => {
  const dom = new JSDOM(html);
  const tagsA = dom.window.document.querySelectorAll('a');
  return Array.from(tagsA);
};

export const getStatus = (tag) => {
  const status = fetch(tag.href)
    .then((res) => res.status)
    .catch((err) => `An error has occurred: ${err}`);
  return status;
};

// get properties
/* const getProperties = (html, route) => {
  const arrayOfTagsA = filterTagsA(html);
  const objWithProperties = [];
  arrayOfTagsA.map((tag) => (
    objWithProperties.push({
      href: tag.href,
      text: (tag.textContent).slice(0, 50),
      file: route,
    })
  ));
  return objWithProperties;
}; */

const getProperties = (html, route) => {
  const arrayOfTagsA = filterTagsA(html);
  const properties = arrayOfTagsA.map((tag) => ({
    href: tag.href,
    text: (tag.textContent).slice(0, 50),
    file: route,
    status: fetch(tag.href)
      .then((res) => res.status)
      .catch((err) => `An error has occurred: ${err}`),
    message: fetch(tag.href)
      .then((res) => ((res.status >= 200) && (res.status <= 399) ? 'OK' : 'FAIL'))
      .catch(() => 'FAIL'),
  }));
  return properties;
};

/* const getProperties = (html, route) => {
  const arrayOfTagsA = filterTagsA(html);
  const prop = arrayOfTagsA.map((tag) => (
    new Promise((resolve) => {
      resolve(fetch(tag.href)
        .then((res) => ({
          href: tag.href,
          text: (tag.textContent).slice(0, 50),
          file: route,
          status: res.status,
          message: (res.status >= 200) && (res.status <= 399) ? 'OK' : 'FAIL',
        }))
        .catch((err) => ({
          href: tag.href,
          text: (tag.textContent).slice(0, 50),
          file: route,
          status: `An error has occurred: ${err}`,
          message: 'FAIL',
        })));
    })));
  return Promise.all(prop)
    .then((res) => res);
}; */

export const getPropertiesByFile = (route) => {
  const arrOfhtml = convertToHtml(route);
  return arrOfhtml.map((oneHtml) => getProperties(oneHtml, route));
};
