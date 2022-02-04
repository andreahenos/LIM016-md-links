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
  mdLinks [-help] or [-h] ------------------------------- To see the list of options.\n`);
  process.exit();
};

const defaultOption = (arg) => {
  mdLinks(arg, { validate: false })
    .then((res) => {
      process.stdout.write(res.map((one) => `\nHref: ${one.href}\nText: ${one.text}\nFile: ${one.file}\n`).join(' '));
      process.exit();
    })
    .catch((err) => {
      process.stderr.write(err);
      process.exit();
    });
};

const verifyPathAndDefaultOption = () => {
  if (verifyPathExistence(args[2]) === false) {
    process.stdout.write("\n>  PATH DOESN'T EXIST.\n");
    process.exit();
  } else {
    defaultOption(args[2]);
  }
};

const validatetOption = (arg) => {
  mdLinks(arg, { validate: true })
    .then((res) => {
      process.stdout.write(res.map((one) => `\nHref: ${one.href}\nText: ${one.text}\nFile: ${one.file}\nStatus: ${one.status}\nOk: ${one.ok}\n`).join(' '));
      process.exit();
    })
    .catch((err) => {
      process.stderr.write(err);
      process.exit();
    });
};

const statsOption = (arg) => {
  mdLinks(arg, { stats: true })
    .then((res) => {
      process.stdout.write(`\nTotal: ${totalLinks(res)}\nUnique: ${uniqueLinks(res)}\n`);
      process.exit();
    })
    .catch((err) => {
      process.stderr.write(err);
      process.exit();
    });
};

const validateAndStatsOption = (arg) => {
  mdLinks(arg, { stats: true })
    .then((res) => {
      process.stdout.write(`\nTotal: ${totalLinks(res)}\nUnique: ${uniqueLinks(res)}\nBroken: ${brokenLinks(res)}\n`);
      process.exit();
    })
    .catch((err) => {
      process.stderr.write(err);
      process.exit();
    });
};

// answers

switch (args.length) {
  case 3:
    if (args[2] === '-help' || args[2] === '-h') {
      helpOption();
    } else {
      verifyPathAndDefaultOption();
    }
    process.stdout.write('\n> NEED HELP? USE: mdLinks [-help] or [-h] to see all options.\n');
    break;
  case 4:
    if (args[3] === '-validate' || args[3] === '-v') {
      validatetOption(args[2]);
    } else if (args[3] === '-stats' || args[3] === '-s') {
      statsOption(args[2]);
    }
    process.stdout.write('\n> NEED HELP? USE: mdLinks [-help] or [-h] to see all options.\n');
    break;
  case 5:
    if ((args[3] === '-validate' && args[4] === '-stats') || (args[3] === '-v' && args[4] === '-s')) {
      validateAndStatsOption(args[2]);
    }
    process.stdout.write('\n> NEED HELP? USE: mdLinks [-help] or [-h] to see all options.\n');
    break;
  default:
    process.stdout.write('\n> NEED HELP? USE: mdLinks [-help] or [-h] to see all options.\n');
    break;
}
