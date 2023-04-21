const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();
const inquirer = require("inquirer");

let mainFilePath = "";

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
    const directoryPath = answers.directoryPath;
    const location = answers.location;
    console.log("Selected directory:", directoryPath);
    mainFilePath = path.join(homedir, location, directoryPath);
    console.log("filePath", mainFilePath);
    // readFilesInDirectory(location, selectedDirectoryPath);
    findFilesWithExtension(mainFilePath, ".ptl");
  })
  .catch((err) => {
    console.error(err);
  });

// Function to find files with a particular extension
function findFilesWithExtension(startPath, extension) {
  console.log("in findFilesWithExtension function");
  // Check if the start path is a directory
  if (!fs.existsSync(startPath) || !fs.lstatSync(startPath).isDirectory()) {
    throw new Error("Provided start path is not a valid directory");
  }

  // Array to store matching files
  const matchingFiles = [];

  // Recursive function to search for files with the desired extension
  async function findFilesRecursively(dir) {
    console.log("in findFilesRecursively function");
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      console.log("file", file);
      const filePath = path.join(dir, file);
      console.log("FilePath", filePath);
      const stat = fs.lstatSync(filePath);
      if (stat.isDirectory()) {
        findFilesRecursively(filePath); // Recursively search subdirectories
      } else if (path.extname(file) === extension) {
        matchingFiles.push(filePath); // Add matching file to the array
        console.log("matchingFiles", matchingFiles);
        removeExtension(matchingFiles);
      }
    });
  }

  findFilesRecursively(startPath); // Start the recursive search
  //   console.log("matchingFiles", matchingFiles);

  return matchingFiles;
}

const removeExtension = async (matchingFiles) => {
  console.log("in removeExtension function");
  matchingFiles.forEach((file) => {
    //   Identifies wha the extension name is for the file
    const fileExtension = path.extname(file);
    //   removes the file extension
    const newFileName = file.replace(fileExtension, "");
    console.log("in removeExtension", fileExtension, newFileName);
    //   runs the rename function using the old file name and the new file name
    renameFile(file, newFileName);
  });
};

const renameFile = (fileName, newFileName) => {
  //   rename function using fs()
  fs.rename(fileName, newFileName, async () => {
    console.log("This is fileName", fileName);
    console.log("This is the new file name", newFileName);
  });
  //   The 'directory' should probably be passed in as a parameter
  const oldFilePath = path.join(fileName); // specify the current file path
  const newFilePath = path.join(newFileName); // specify the new file path

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

// findFilesWithExtension(mainFilePath, ".ptl");

// readFilesInDirectory(directory);
