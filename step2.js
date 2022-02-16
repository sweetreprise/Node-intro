const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}`, err);
            process.kill(1);
        } else {
            console.log('HERE IS THE DATA....', data);
        }
    });
}

function webCat(url) {
    axios.get(url).then(res => {
        console.log(res.data.slice(0, 150), '...');
    })
    .catch(err => {
        console.log(`ERROR fetching ${url}`, `STATUS CODE: ${err.response.status}`);
    })
}

const text = process.argv[2]

if(text.startsWith('http://') || text.startsWith('https://')) {
    webCat(text);
} else {
    cat(text);
}

