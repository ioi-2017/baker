function openMarkdownFile(path) {
  const fs = require('fs');
  if (!path) {
    const { dialog } = require('electron');
    const paths = dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }],
    });
    if (paths && paths.length === 1) {
      path = paths[0];
    }
  }
  if (path) {
    return { path, text: fs.readFileSync(path, 'utf-8') };
  }
  return null;
}

function saveMarkdownFile(path, text) {
  const fs = require('fs');
  fs.writeFileSync(path, text);
}

module.exports = {
  openMarkdownFile,
  saveMarkdownFile,
};
