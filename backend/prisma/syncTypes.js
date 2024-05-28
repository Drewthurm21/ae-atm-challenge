const fs = require('fs');
const path = require('path');

function colorText(colorCode, text) {
  return `\x1b[${colorCode}m${text}\x1b[0m`;
}

// Paths to copy from
const copyPaths = {
  customTypesPath: path.join(__dirname, '../src/types.ts'),
  prismaTypesPath: path.join(__dirname, '../node_modules/.prisma/client/index.d.ts'),
}

// Paths to copy to
const destinationPath = path.join(__dirname, '../../shared/prismaTypes.ts');


console.log(colorText('32', 'Copying prisma types to shared directory...'));

for (const [key, value] of Object.entries(copyPaths)) {
  try {
    console.log(colorText('32', `Copying from ${key}:`, value));
    fs.copyFileSync(value, destinationPath);
  } catch (error) {
    console.error(colorText('31', 'File copy failed:', error.message));
    process.exit(1);
  }
};

console.log(colorText('32', 'Types copied to shared directory.'));
console.log(colorText('5', '\n\n\nFresh db setup with full-stack type safety!\n\n'));
