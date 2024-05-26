const fs = require('fs');
const path = require('path');

// Paths to copy from
const copyPaths = {
  customTypesPath: path.join(__dirname, 'src/types.ts'),
  prismaTypesPath: path.join(__dirname, 'node_modules/.prisma/client/index.d.ts'),
}

// Paths to copy to
const destinationPath = path.join(__dirname, '../shared/prismaTypes.ts');


console.log('Copying prisma types to shared directory...');

for (const [key, value] of Object.entries(copyPaths)) {
  try {
    console.log(`Copying from ${key}:`, value);
    fs.copyFileSync(value, destinationPath);
  } catch (error) {
    console.error('File copy failed:', error.message);
    process.exit(1);
  }
};

console.log('Types copied to shared directory.');
console.log('Full-stack type safety ftw!');
