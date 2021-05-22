// promise版本的文件系统
const fs = require("fs").promises;

const fileHelper = {
  readFile(path) {
    return fs.readFile(path, { encoding: "utf-8" });
  },
  writeFile(path, content) {
    return fs.writeFile(path, content);
  },
  renameFile(path, newPath) {
    return fs.rename(path, newPath);
  },
  deleteFile(path) {
    return fs.unlink(path);
  },
};

export default fileHelper;
