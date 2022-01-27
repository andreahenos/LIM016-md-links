import process from 'process';

const args = process.argv;

if (args.length === 2) {
  console.log('default option');
}

if (args.length === 3 && args[2] === '--validate') {
  console.log('validate option');
}

if (args[2] === '--stats') {
  console.log('stats option');
}

if (args[2] === '--validate' && args[3] === '--stats') {
  console.log('validate and stats option');
}

if (args[2] === '--help') {
  console.log('help option');
}
