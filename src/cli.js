import process from 'process';
import { mdLinks } from './md-links.js';
import {
  totalLinks,
  uniqueLinks,
  brokenLinks,
} from './stats.js';

const args = process.argv;

if (args.length === 2) {
  console.log('Please enter a path.');
}

if (args.length === 3) {
  if (args[2] === '-help' || args[2] === '-h') {
    mdLinks(args[2], { help: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  } else {
    mdLinks(args[2], { validate: false })
      .then((res) => {
        if (typeof res !== 'string') {
          console.log(res.map((one) => `---------------------\nHref: ${one.href}\nText: ${one.text}\nFile: ${one.file}\n`).join(' '));
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }
}

if (args.length === 4 && (args[3] === '-validate' || args[3] === '-v')) {
  mdLinks(args[2], { validate: true })
    .then((res) => {
      if (typeof res !== 'string') {
        console.log(res.map((one) => `---------------------\nHref: ${one.href}\nText: ${one.text}\nFile: ${one.file}\nStatus: ${one.status}\nOk: ${one.ok}\n`).join(' '));
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
}

if (args.length === 4 && (args[3] === '-stats' || args[3] === '-s')) {
  mdLinks(args[2], { validate: true })
    .then((res) => {
      if (typeof res !== 'string') {
        console.log(`\nTotal: ${totalLinks(res)}\nUnique: ${uniqueLinks(res)}\n`);
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
}

if (args.length === 5 && ((args[3] === '-validate' && args[4] === '-stats') || (args[3] === '-v' && args[4] === '-s'))) {
  mdLinks(args[2], { validate: true, stats: true })
    .then((res) => {
      if (typeof res !== 'string') {
        console.log(`\nTotal: ${totalLinks(res)}\nUnique: ${uniqueLinks(res)}\nBroken: ${brokenLinks(res)}\n`);
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
}
