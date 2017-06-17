let filePath = null;
let fileText = null;
let fileCallback = null;

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
    filePath = path;
    fileText = fs.readFileSync(path, 'utf-8');
    return true;
  }
  return false;
}

function saveMarkdownFile() {
  if (filePath) {
    const fs = require('fs');
    fs.writeFileSync(filePath, fileText);
    return true;
  }
  return false;
}

function setFileText(text) {
  fileText = text;
  setTimeout(() => {
    if (fileCallback) {
      fileCallback(fileText);
    }
  }, 0);
  setTimeout(saveMarkdownFile, 0);
}

function getFileText() {
  return fileText;
}

function setFileTextListener(callback) {
  fileCallback = callback;
}

module.exports = {
  openMarkdownFile,
  saveMarkdownFile,
  setFileText,
  setFileTextListener,
  getFileText,
};
