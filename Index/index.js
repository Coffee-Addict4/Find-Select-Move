const fs = require('fs');
const path = require('path');

// Function to check if a file is an image file
function isImage(filename) {
    const ext = path.extname(filename).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(ext);
}

// Function to move image files to a different folder
function moveImages(sourceDir, destinationDir) {
    fs.readdir(sourceDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const sourceFile = path.join(sourceDir, file);
            const destinationFile = path.join(destinationDir, file);

            if (isImage(file)) {
                fs.rename(sourceFile, destinationFile, err => {
                    if (err) {
                        console.error(`Error moving ${file}:`, err);
                    } else {
                        console.log(`Moved ${file} to ${destinationDir}`);
                    }
                });
            }
        });
    });
}

// Check if command-line arguments are provided
if (process.argv.length < 4) {
    console.error('Usage: node script.js <source_directory> <destination_directory>');
    process.exit(1);
}

// Get source and destination directories from command-line arguments
const sourceDirectory = process.argv[2];
const destinationDirectory = process.argv[3];

// Move image files from source to destination directory
moveImages(C:\Users\jadon\Downloads\TEST\TEST-IMAGe, C:\Users\jadon\Downloads\TEST);