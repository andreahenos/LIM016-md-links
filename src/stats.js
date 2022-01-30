// get total number of links
export const totalLinks = (arrOfProperties) => arrOfProperties.length;

// get unique links
export const uniqueLinks = (arrOfProperties) => {
  const arrOfLinks = arrOfProperties.map((ofOneFile) => ofOneFile.href);
  const setLinks = new Set(arrOfLinks);
  const result = [...setLinks];
  return result.length;
};

// get broken links
export const brokenLinks = (arrOfProperties) => {
  const arrOfBrokenLinks = arrOfProperties.filter((ofOneFile) => ofOneFile.ok === 'fail' && (ofOneFile.status < 200 || ofOneFile.status > 400));
  return arrOfBrokenLinks.length;
};
