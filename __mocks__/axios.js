export const get = jest.fn((link) => {
  if (link === 'https://nodejs.org/api/path.html') {
    return Promise.resolve(
      {
        status: 'fulfilled',
        value: {
          href: 'https://nodejs.org/api/path.html',
          text: 'Unique',
          status: 200,
          message: 'ok',
        },
      },
    );
  }

  if (link === 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad') {
    return Promise.resolve(
      {
        status: 'fulfilled',
        value: {
          href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad',
          text: 'Repeated',
          status: 200,
          message: 'ok',
        },
      },
    );
  }

  if (link === 'https://www.marvel.com/moves') {
    return Promise.resolve(
      {
        status: 'fulfilled',
        value: {
          href: 'https://www.marvel.com/moves',
          text: 'Broken',
          status: 404,
          message: 'fail',
        },
      },
    );
  }
});

export default { get };
