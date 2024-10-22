const fs = require('fs-extra');
const path = require('path');

const buildToCopy = 'distate';
const legacyPublicFolder = '/home/dev/projects/diflow.multi_6_3/public';

fs.copy(path.join(__dirname, '..', 'build', buildToCopy), legacyPublicFolder)
  .then(() => console.log('Uploaded'))
  .catch(err => console.error('Error uploading to legacy', err));
