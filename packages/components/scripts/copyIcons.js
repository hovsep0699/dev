const fs = require('fs-extra');
const path = require('path');

try {
  fs.copySync(
    path.join(__dirname, '..', 'src', 'icons'),
    path.join(__dirname, '..', 'dist', 'icons')
  );
} catch (err) {
  console.error('Error copying icons', err);
  process.exit(1);
}
