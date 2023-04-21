const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const directory = "/Extension-Test";

console.log("home directory", homedir);
console.log(
  "extension test in homedirectory",
  path.join(homedir, "/Users/andrewkleindienst/desktop", directory)
);

// Just using the extname() will find the last extension.
// Probably needs to be some conditional logic to tell it to skip if there is no .ptl at the end. Otherwise it will remove .mp3

// This code will read all files in the hardcoded directory and remove the extension

// This app needs an interface to be able to select the directory you want.

function readFilesInDirectory(directoryPath) {
  //   reads the files in the directory specified
  fs.readdir(path.join(homedir, "/desktop", directoryPath), (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }
    // Filters the files in the directory to only include the ones that have '.ptl' extension
    const newFiles = files.filter((file) => /\.ptl$/.test(file));
    console.log("This is newFiles", newFiles);
    // interates over each file in the array of newFiles and runs removeExtension()
    newFiles.forEach((file) => {
      removeExtension(file);
    });
  });
}

const removeExtension = (fileName) => {
  //   Identifies wha the extension name is for the file
  const fileExtension = path.extname(fileName);
  //   removes the file extension
  const newFileName = fileName.replace(fileExtension, "");
  console.log("in removeExtension", fileExtension, newFileName);
  //   runs the rename function using the old file name and the new file name
  renameFile(fileName, newFileName);
};

const renameFile = (fileName, newFileName) => {
  //   rename function using fs()
  fs.rename(fileName, newFileName, async () => {
    console.log("This is fileName", fileName);
    console.log("This is the new file name", newFileName);
  });
  //   The 'directory' should probably be passed in as a parameter
  const oldFilePath = path.join(homedir, "/desktop", directory, fileName); // specify the current file path
  const newFilePath = path.join(homedir, "/desktop", directory, newFileName); // specify the new file path

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
