#!/usr/bin/env node

import process from 'process';
import { verifyPathExistence } from './api.js';
import { mdLinks } from './md-links.js';
import {
  totalLinks,
  uniqueLinks,
  brokenLinks,
} from './stats.js';

const args = process.argv;

// Option messages

const helpOption = () => {
  process.stdout.write(`\n> USAGE:
  mdLinks <path> ---------------------------------------- To see the URLs found, their texts in the file, and the path in which they are found.
  mdLinks <path> [-validate] or [-v] -------------------- To see the URLs found, their texts in the file, the path they are found and their status.
  mdLinks <path> [-stats] or [-s] ----------------------- To see the total number of links and the number of unique links.
  mdLinks <path> [-validate] [-stats] or [-v] [-s] ------ To see the total number of links, the number of unique links and the number of broken links.
  mdLinks [-help] or [-h] ------------------------------- To see a list of supported md-links commands.\n`);
  process.exit();
};

const verifyPath = (callback) => {
  if (verifyPathExistence(args[2]) === false) {
    process.stdout.write("\n>  PATH DOESN'T EXIST.\n");
    process.exit();
  } else {
    callback(args[2]);
  }
};

const defaultOption = (arg) => {
  mdLinks(arg, { validate: false })
    .then((res) => {
      if (res.length < 1) {
        process.stdout.write('\n>  NO LINKS TO ANALYZE.\n');
      } else {
        process.stdout.write(res.map((one) => `\n  * Href: ${one.href}\n  * Text: ${one.text}\n  * File: ${one.file}\n________________________________________________________________________\n`).join(' '));
        process.exit();
      }
    })
    .catch((err) => {
      process.stderr.write(err);
      process.exit();
    });
};

const validatetOption = (arg) => {
  mdLinks(arg, { validate: true })
    .then((res) => {
      if (res.length < 1) {
        process.stdout.write('\n>  NO LINKS TO ANALYZE.\n');
      } else {
        process.stdout.write(res.map((one) => `\n  * Href: ${one.href}\n  * Text: ${one.text}\n  * File: ${one.file}\n  * Status: ${one.status}\n  * Ok: ${one.ok}\n________________________________________________________________________\n`).join(' '));
        process.exit();
      }
    })
    .catch((err) => {
      process.stderr.write(err);
      process.exit();
    });
};

const statsOption = (arg) => {
  mdLinks(arg, { stats: true })
    .then((res) => {
      if (res.length < 1) {
        process.stdout.write('\n>  NO LINKS TO ANALYZE.\n');
      } else {
        process.stdout.write(`\n* TOTAL   --->  ${totalLinks(res)}\n* UNIQUE  --->  ${uniqueLinks(res)}\n\n`);
        process.exit();
      }
    })
    .catch((err) => {
      process.stderr.write(err);
      process.exit();
    });
};

const validateAndStatsOption = (arg) => {
  mdLinks(arg, { validate_stats: true })
    .then((res) => {
      if (res.length < 1) {
        process.stdout.write('\n>  NO LINKS TO ANALYZE.\n');
      } else {
        process.stdout.write(`\n* TOTAL   --->  ${totalLinks(res)}\n* UNIQUE  --->  ${uniqueLinks(res)}\n* BROKEN  --->  ${brokenLinks(res)}\n\n`);
        process.exit();
      }
    })
    .catch((err) => {
      process.stderr.write(err);
      process.exit();
    });
};

// answers

switch (args.length) {
  case 3:
    if (args[2] === '-help' || args[2] === '-h') helpOption();
    else verifyPath(defaultOption);
    break;
  case 4:
    if (args[3] === '-validate' || args[3] === '-v') verifyPath(validatetOption);
    else if (args[3] === '-stats' || args[3] === '-s') verifyPath(statsOption);
    else process.stdout.write('\n> NEED HELP? USE: mdLinks [-help] or [-h] to see all supported md-links commands.\n');
    break;
  case 5:
    if ((args[3] === '-validate' && args[4] === '-stats') || (args[3] === '-v' && args[4] === '-s')) verifyPath(validateAndStatsOption);
    else process.stdout.write('\n> NEED HELP? USE: mdLinks [-help] or [-h] to see all supported md-links commands.\n');
    break;
  default:
    process.stdout.write('\n> NEED HELP? USE: mdLinks [-help] or [-h] to see all supported md-links commands.\n');
    break;
}
