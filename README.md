# Extension-Editor

![License Badge](https://img.shields.io/github/license/andykb9b13/Extension-Editor)

## Description

This is a CLI app that utilizes inquirer to remove an unwanted extension from files in a directory. This app's specific function is to remove a '.ptl' extension that was added to a user's music collection mp3s when they were archiving them many years ago. The file names simply need to be edited to remove the '.ptl' extension but the time it would take to do this for 30,000+ files was unreasonable. At the moment this app only removes the .ptl extension from files that are located in the desktop or documents folder of a user's machine.

This application will only look for files that have a .ptl extension and will ignore files with other extensions.

## Table of Contents

1. [Installing Dependencies](#installing-dependencies)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [Testing](#testing)
5. [Reporting Errors](#reporting-errors)
6. [License](#license)
7. [Questions](#questions)

## Installing Dependencies

inquirer^ 8.2.4

```
npm install
```

## Usage

This is a command line application so the user must initiate the app using the following command from inside the directory of this app:

```
node index.js
```

The user will be asked to input a directory name. This should be the root directory of where the files are located that need the extension removed. The application runs a recursive function that will search all directories nested within the root directory. The directory should be inputted using the following format:

```
Test-Directory
```

_NOTE_ Do not include `/` at the beginning of the name or after the name. Just the name.

The user will then be asked to input a location and this will be either the user's `/desktop` or `/documents`

## Contributing

This project has a relatively limited scope since it was constructed for an incredibly specific purpose but there are potential other uses for it. Please feel free to contribute.

## Testing

There are currently no tests for the app

## Reporting Errors

Please report all errors to andy.kleindienst@gmail.com

## License

MIT License

## Questions

For any questions regarding this project, please send correspondence to andy.kleindienst@gmail.com.

Please visit my profile on [GitHub](https://github.com/andykb9b13).
