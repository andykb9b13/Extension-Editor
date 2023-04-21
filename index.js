const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();
const inquirer = require("inquirer");

// Show the directory prompt
inquirer
  .prompt([
    {
      type: "input",
      name: "directoryPath",
      message: "Select a directory:",
      validate: function (input) {
        // Validate that the input is a valid directory path
        // You can customize the validation logic here
        return !!input.trim() || "Please enter a valid directory path";
      },
    },
    {
      type: "list",
      name: "location",
      message: "select the location of the directory",
      choices: ["/desktop", "/documents"],
    },
  ])
  .then((answers) => {
    // answers.directoryPath contains the selected directory path
    const selectedDirectoryPath = answers.directoryPath;
    const location = answers.location;
    console.log("Selected directory:", selectedDirectoryPath);
    // Use the selected directory path for further operations
    // ...
    readFilesInDirectory(location, selectedDirectoryPath);
  })
  .catch((err) => {
    console.error(err);
  });

// console.log("home directory", homedir);
// console.log(
//   "extension test in homedirectory",
//   path.join(homedir, "/Users/andrewkleindienst/desktop", directory)
// );

function readFilesInDirectory(location, directoryPath) {
  //   reads the files in the directory specified
  const filePath = path.join(homedir, location, directoryPath);
  console.log("This is filePath", filePath);

  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }
    // Filters the files in the directory to only include the ones that have '.ptl' extension
    const newFiles = files.filter((file) => /\.ptl$/.test(file));
    console.log("This is newFiles", newFiles);
    // interates over each file in the array of newFiles and runs removeExtension()
    newFiles.forEach((file) => {
      removeExtension(location, directoryPath, file);
    });
  });
}

const removeExtension = (location, directoryPath, fileName) => {
  //   Identifies wha the extension name is for the file
  const fileExtension = path.extname(fileName);
  //   removes the file extension
  const newFileName = fileName.replace(fileExtension, "");
  console.log("in removeExtension", fileExtension, newFileName);
  //   runs the rename function using the old file name and the new file name
  renameFile(location, directoryPath, fileName, newFileName);
};

const renameFile = (location, directoryPath, fileName, newFileName) => {
  //   rename function using fs()
  fs.rename(fileName, newFileName, async () => {
    console.log("This is fileName", fileName);
    console.log("This is the new file name", newFileName);
  });
  //   The 'directory' should probably be passed in as a parameter
  const oldFilePath = path.join(homedir, location, directoryPath, fileName); // specify the current file path
  const newFilePath = path.join(homedir, location, directoryPath, newFileName); // specify the new file path

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

// readFilesInDirectory(directory);
