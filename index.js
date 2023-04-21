const fs = require("fs");
const path = require("path");

// Just using the extname() will find the last extension.
// Probably needs to be some conditional logic to tell it to skip if there is no .ptl at the end. Otherwise it will remove .mp3

// This code will read all files in the hardcoded directory and remove the extension

const directory = "/Extension-Test";

function readFilesInDirectory(directoryPath) {
  fs.readdir(path.join(__dirname, directoryPath), (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }
    console.log(`Files in directory: ${directoryPath}`);
    files.forEach((file) => {
      removeExtension(file);
    });
  });
}

const removeExtension = (fileName) => {
  const fileExtension = path.extname(fileName);
  const newFileName = fileName.replace(fileExtension, "");
  renameFile(fileName, newFileName);
};

const renameFile = (fileName, newFileName) => {
  fs.rename(fileName, newFileName, async () => {
    console.log("This is fileName", fileName);
    console.log("This is the new file name", newFileName);
  });
  const oldFilePath = path.join(__dirname, directory, fileName); // specify the current file path
  const newFilePath = path.join(__dirname, directory, newFileName); // specify the new file path

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err}`);
    } else {
      console.log(
        `File has been renamed from ${oldFilePath} to ${newFilePath}`
      );
    }
  });
};

readFilesInDirectory(directory);
// removeExtension(file);

const testFolder = "./tests/";

// fs.readdir(testFolder, (err, files) => {
//   files.forEach((file) => {
//     console.log(file);
//   });
// });
