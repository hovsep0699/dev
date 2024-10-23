const fs = require('fs');
const constants = require('./constants');

module.exports = (indexFilePath, packageName) => {
  try {
    const data = fs.readFileSync(indexFilePath, 'utf8');

    const ts = new Date().getTime();
    const content = data
      .replace(new RegExp('favicon.ico'), 'favicon.ico?' + ts)
      .replace(new RegExp('app.css'), 'app.css?' + ts)
      .replace(new RegExp('roboto.min.css'), 'roboto.min.css?' + ts)
      .replace(new RegExp('themify-icons.css'), 'themify-icons.css?' + ts)
      .replace(new RegExp('<title></title>'), '<title>' + constants.title[packageName] + '</title>');

    fs.writeFileSync(indexFilePath, content);
  } catch (err) {
    console.error('Error adding timestampts to index.html', err);
    process.exit(1);
  }
};
