const fs = require('fs');
const path = require('path');

// Accept source and destination directories as command line arguments
const [, , sourceDirectory, destinationDirectory] = process.argv;

// Function to move folders and zip files
function moveFiles(sourceDir, destDir) {
    // Read the contents of the source directory
    fs.readdir(sourceDir, (err, files) => {
        if (err) {
            console.error('Error reading source directory:', err);
            return;
        }

        // Iterate through each file in the source directory
        files.forEach(file => {
            const sourcePath = path.join(sourceDir, file);
            const destPath = path.join(destDir, file);

            // Check if the file is a directory
            fs.stat(sourcePath, (err, stats) => {
                if (err) {
                    console.error('Error checking file stats:', err);
                    return;
                }

                // If the file is a directory, move it
                if (stats.isDirectory()) {
                    fs.rename(sourcePath, destPath, err => {
                        if (err) {
                            console.error('Error moving directory:', err);
                            return;
                        }
                        console.log(`Moved directory: ${sourcePath} to ${destPath}`);
                    });
                }

                // If the file is a zip file, move it
                else if (file.endsWith('.zip')) {
                    fs.rename(sourcePath, destPath, err => {
                        if (err) {
                            console.error('Error moving zip file:', err);
                            return;
                        }
                        console.log(`Moved zip file: ${sourcePath} to ${destPath}`);
                    });
                }
            });
        });
    });
}

// Check if source and destination directories are provided
if (!sourceDirectory || !destinationDirectory) {
    console.error('Usage: node moveFiles.js <source_directory> <destination_directory>');
    process.exit(1);
}

// Create destination directory if it does not exist
fs.mkdir(destinationDirectory, { recursive: true }, err => {
    if (err) {
        console.error('Error creating destination directory:', err);
        return;
    }

    // Move files from source to destination
    moveFiles(sourceDirectory, destinationDirectory);
});