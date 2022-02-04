import process from 'process';
import readline from 'readline';
import { verifyPathExistence } from './api.js';
import { mdLinks } from './md-links.js';
import {
  totalLinks,
  uniqueLinks,
  brokenLinks,
} from './stats.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const args = process.argv;

// Option messages

const helpOption = () => {
  process.stdout.write(`\n> USAGE:
  mdLinks [-help] or [-h] ------------------------------- To see all options
  mdLinks <path> ---------------------------------------- To have href, text and file
  mdLinks <path> [-validate] or [-v] -------------------- To have href, text, file, status and "ok" message
  mdLinks <path> [-stats] or [-s] ----------------------- To have total and unique links
  mdLinks <path> [-validate] [-stats] or [-v] [-s] ------ To have total, unique and broken links\n`);
  rl.close();
  process.exit(0);
};

const defaultOption = (arg) => {
  mdLinks(arg, { validate: false })
    .then((res) => {
      process.stdout.write(res.map((one) => `\nHref: ${one.href}\nText: ${one.text}\nFile: ${one.file}\n`).join(' '));
      rl.close();
      process.exit(0);
    })
    .catch((err) => {
      process.stdout.write(err);
      rl.close();
      process.exit(0);
    });
};

const verifyPathAndDefaultOption = () => {
  if (verifyPathExistence(args[2]) === false) {
    process.stdout.write("\n>  PATH DOESN'T EXIST.\n");
    rl.close();
    process.exit(0);
  } else {
    defaultOption(args[2]);
  }
};

const validatetOption = (arg) => {
  mdLinks(arg, { validate: true })
    .then((res) => {
      process.stdout.write(res.map((one) => `\nHref: ${one.href}\nText: ${one.text}\nFile: ${one.file}\nStatus: ${one.status}\nOk: ${one.ok}\n`).join(' '));
      rl.close();
      process.exit(0);
    })
    .catch((err) => {
      process.stdout.write(err);
      rl.close();
      process.exit(0);
    });
};

const statsOption = (arg) => {
  mdLinks(arg, { stats: true })
    .then((res) => {
      process.stdout.write(`\nTotal: ${totalLinks(res)}\nUnique: ${uniqueLinks(res)}\n`);
      rl.close();
      process.exit(0);
    })
    .catch((err) => {
      process.stdout.write(err);
      rl.close();
      process.exit(0);
    });
};

const validateAndStatsOption = (arg) => {
  mdLinks(arg, { stats: true })
    .then((res) => {
      process.stdout.write(`\nTotal: ${totalLinks(res)}\nUnique: ${uniqueLinks(res)}\nBroken: ${brokenLinks(res)}\n`);
      rl.close();
      process.exit(0);
    })
    .catch((err) => {
      process.stdout.write(err);
      rl.close();
      process.exit(0);
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
    break;
  case 4:
    if (args[3] === '-validate' || args[3] === '-v') {
      validatetOption(args[2]);
    } else if (args[3] === '-stats' || args[3] === '-s') {
      statsOption(args[2]);
    }
    break;
  case 5:
    if ((args[3] === '-validate' && args[4] === '-stats') || (args[3] === '-v' && args[4] === '-s')) {
      validateAndStatsOption(args[2]);
    }
    break;
  default:
    process.stdout.write(helpOption());
    break;
}

/* const args = process.argv;

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
  mdLinks(args[2], { stats: true })
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
} */
