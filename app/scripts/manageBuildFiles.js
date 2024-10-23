const fs = require('fs-extra');
const path = require('path');
const addTimestamps = require('./addTimestamps');

const args = process.argv;

const packageName = args[2];
const buildPath = path.join(__dirname, '..', 'build');
const prodBuildPath = path.join(__dirname, '..', '..', '..', 'build', packageName);
const indexFilePath = `${buildPath}/index.html`;

try {
  fs.removeSync(prodBuildPath);
  fs.ensureDirSync(prodBuildPath);

  fs.moveSync(`${buildPath}/static`, `${prodBuildPath}/static`);

  addTimestamps(indexFilePath, packageName);
  fs.moveSync(indexFilePath, `${prodBuildPath}/index.html`);

  fs.removeSync(buildPath);
} catch (err) {
  console.error('Error managing build files', err);
  process.exit(1);
}
