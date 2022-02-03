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

// get md files
const arrWithMdFileRoutes = (route) => {
  if (verifyFileType(route)) {
    const absRoute = getAbsolutePath(route);
    if (path.extname(absRoute) === '.md') return absRoute.split(' ');
    return [];
  }
  const directoryContent = fs.readdirSync(route);
  const allRoutes = directoryContent.map((file) => {
    const absPath = getAbsolutePath(path.join(route, file));
    if (verifyFileType(absPath)) return absPath;
    return arrWithMdFileRoutes(absPath);
  }).flat();
  return allRoutes.filter((oneRoute) => path.extname(oneRoute) === '.md');
};

// get content of files
const objsArrWithRouteAndContent = (arrOfFiles) => {
  const obj = arrOfFiles.map((fileRoute) => ({
    route: fileRoute,
    content: fs.readFileSync(fileRoute, 'utf8'),
  }));
  return obj;
};

// convert content to HTML
const convertToHtml = (content) => {
  const fileInHTML = marked.parse(content);
  const dom = new JSDOM(fileInHTML);
  const DOMPurify = createDOMPurify(dom.window);
  return DOMPurify.sanitize(fileInHTML);
};

// filter anchor tags
export const filterTagsA = (htmlContent) => {
  const dom = new JSDOM(htmlContent);
  const tagsA = dom.window.document.querySelectorAll('a');
  return Array.from(tagsA);
};

// convert to html and filter anchor tags
const objArrWithRouteAndTagsA = (route) => {
  const arrWithFiles = arrWithMdFileRoutes(route);
  const changeContentToTagsA = objsArrWithRouteAndContent(arrWithFiles).map((objOneFile) => {
    const objOfOneFile = objOneFile;
    const contentInHTML = convertToHtml(objOneFile.content);
    const arrOfTagsA = filterTagsA(contentInHTML);
    objOfOneFile.content = arrOfTagsA;
    return objOneFile;
  });
  return changeContentToTagsA;
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

const httpRequestRes = (arrOfTagsA, routeOfFile) => httpRequest(arrOfTagsA)
  .then((res) => res.map((promiseResult) => ({
    href: promiseResult.value.href,
    text: promiseResult.value.text,
    file: routeOfFile,
    status: promiseResult.value.status,
    ok: promiseResult.value.message,
  })));

export const getProperties = (route) => {
  const justObjWithTagsA = objArrWithRouteAndTagsA(route)
    .filter((objArrOfOneFile) => objArrOfOneFile.content.length > 1);
  return justObjWithTagsA.map((objArrOfOneFile) => {
    const routeOfFile = objArrOfOneFile.route;
    const arrOfTagsA = objArrOfOneFile.content;
    return httpRequestRes(arrOfTagsA, routeOfFile);
  });
};
