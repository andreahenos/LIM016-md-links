import process from 'process';

const args = process.argv;

if (args.length === 2) {
  console.log('ingrese un path');
}

if (args.length === 3) {
  console.log('default option');
}

if (args.length === 4 && args[3] === '--validate') {
  console.log('validate option');
}

if (args.length === 4 && args[3] === '--stats') {
  console.log('stats option');
}

if (args.length === 5 && ((args[3] === '--validate' && args[4] === '--stats') || (args[3] === '--stats' && args[4] === '--validate'))) {
  console.log('validate and stats option');
}

if (args.length === 4 && args[3] === '--help') {
  console.log('help option');
}
