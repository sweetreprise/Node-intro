const fs = require('fs');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}`, err)
            process.kill(1)
        } else {
            console.log('HERE IS THE DATA....', data)
        }
    });
}

cat(process.argv[2]);