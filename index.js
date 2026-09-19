const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, 'sample-data.txt');
const OUTPUT = path.join(__dirname, 'sample-copy.txt');

/**
 * PART 1: Load the entire file into memory at once using fs.readFile
 */
function readWholeFile() {
  fs.readFile(INPUT, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log(`readFile: loaded ${data.length} bytes into memory at once`);
  });
}

/**
 * PART 2: Stream the file in chunks using readable and writable streams
 */
function streamFile() {
  const readable = fs.createReadStream(INPUT);
  const writable = fs.createWriteStream(OUTPUT);

  readable.pipe(writable);

  writable.on('finish', () => {
    console.log('stream: finished copying via 64KB chunks (peak memory stays flat)');
  });

  writable.on('error', (err) => {
    console.error('Error writing file stream:', err);
  });
}

/**
 * PART 3: Explanation
 * 
 * Streams are preferable for large files because fs.readFile loads the 
 * entire file into memory at once, meaning memory usage scales directly 
 * with the file size and can easily crash the process. In contrast, streams 
 * move data sequentially in small chunks, allowing peak memory usage to 
 * remain flat and constant no matter how massive the file gets.
 */

// Run automatically
readWholeFile();
streamFile();

module.exports = { readWholeFile, streamFile };