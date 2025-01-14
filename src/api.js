import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import axios from 'axios';

// verify path existence
export const verifyPathExistence = (route) => fs.existsSync(route);

// get absolute path
export const getAbsolutePath = (route) => (!path.isAbsolute(route)
  ? path.resolve(route)
  : route);

// verify tipe of file
export const verifyFileType = (route) => fs.statSync(route).isFile();

// get md files
export const arrWithMdFileRoutes = (route) => {
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
export const objsArrWithRouteAndContent = (arrOfFiles) => {
  const obj = arrOfFiles.map((fileRoute) => ({
    route: fileRoute,
    content: fs.readFileSync(fileRoute, 'utf8'),
  }));
  return obj;
};

// convert content to HTML
export const convertToHtml = (content) => {
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
export const objArrWithRouteAndTagsA = (route) => {
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

export const httpRequest = (arrOfTagsA, route) => Promise.all(
  arrOfTagsA.map((tag) => axios.get(tag.href)
    .then((res) => ({
      href: tag.href,
      text: tag.textContent.slice(0, 50),
      file: route,
      status: res.status,
      ok: 'ok',
    }))
    .catch((res) => ({
      href: tag.href,
      text: tag.textContent.slice(0, 50),
      file: route,
      status: res.response.status,
      ok: 'fail',
    }))),
);

export const getProperties = (route) => {
  const justObjWithTagsA = objArrWithRouteAndTagsA(route)
    .filter((objArrOfOneFile) => objArrOfOneFile.content.length > 0);
  return justObjWithTagsA.map((objArrOfOneFile) => {
    const routeOfFile = objArrOfOneFile.route;
    const arrOfTagsA = objArrOfOneFile.content;
    return httpRequest(arrOfTagsA, routeOfFile);
  });
};
