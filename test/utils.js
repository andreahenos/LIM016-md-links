export const arrOfOneMdFile = ['C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\md.md'];

export const arrOfAllMdFiles = [
  'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\Carpeta2\\md2.md',
  'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\md.md'];

export const objsArr = [
  {
    route: 'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\Carpeta2\\md2.md',
    content: '### Prueba de documento sin links',
  },
  {
    route: 'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\md.md',
    content: '### Prueba de documento con links\r\n'
  + '* [Unique](https://nodejs.org/api/path.html)\r\n'
  + '* [Repeated](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)\r\n'
  + '* [Repeated](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)\r\n'
  + '* [Broken](https://www.marvel.com/moves)',
  },
];

export const htmlContent = `<h3 id="prueba-de-documento-con-links">Prueba de documento con links</h3>
<ul>
<li><a href="https://nodejs.org/api/path.html">Unique</a></li>
<li><a href="https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e">Repeated</a></li>
<li><a href="https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e">Repeated</a></li>
<li><a href="https://www.marvel.com/moves">Broken</a></li>
</ul>
`;

export const arrOfAllLinks = ['https://nodejs.org/api/path.html', 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e', 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e', 'https://www.marvel.com/moves'];

export const NewObjsArr = [{
  route: 'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\Carpeta2\\md2.md',
  content: [],
},
{
  route: 'C:\\Users\\51960\\Desktop\\Md-Links\\LIM016-md-links\\Carpeta\\md.md',
  content: arrOfAllLinks,
},
];
