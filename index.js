const fs = require('fs');
const path = require('path');

// Function to check if a given path is a file
const isFile = (filePath) => {
  return fs.statSync(filePath).isFile();
};

// Function to move files from one directory to another
const moveFiles = (sourceDir, targetDir) => {
  // Read the source directory
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // Filter out non-text files and folders
    files.forEach((file) => {
      const filePath = path.join(sourceDir, file);

      if (isFile(filePath) && !filePath.endsWith('.txt')) {
        // Construct target file path
        const targetFilePath = path.join(targetDir, file);

        // Move file
        fs.rename(filePath, targetFilePath, (err) => {
          if (err) {
            console.error(`Error moving file ${filePath}:`, err);
          } else {
            console.log(`Moved file ${filePath} to ${targetFilePath}`);
          }
        });
      }
    });
  });
};

// Get source and target directories from command-line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Usage: node moveFiles.js <source directory> <target directory>');
  process.exit(1);
}

const sourceDirectory = args[0];
const targetDirectory = args[1];

moveFiles(sourceDirectory, targetDirectory);