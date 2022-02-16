const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}`, err);
            process.exit(1);
        } else {
            console.log('HERE IS THE DATA....', data);
            writeTo(data, out)
        }
    });
}

function webCat(url, out) {
    axios.get(url).then(res => {
        console.log(res.data.slice(0, 150), '...');
        writeTo(res.data, out)
    })
    .catch(err => {
        console.log(`ERROR fetching ${url}`);
    })
}

function writeTo(text, out) {
    // if out is undefined, just output the text to the console
    if (out) {
        fs.writeFile(out, text, 'utf8', err => {
            if (err) {
                console.log('ERROR:', err);
                process.exit(1);
            }
        });
    } else {
        console.log(text)
    }
}

let out;
let text;

if(process.argv[2] === '--out') {
    out = process.argv[3];
    text = process.argv[4];
} else {
    text = process.argv[2];
}

if(text.startsWith('http://') || text.startsWith('https://')) {
    webCat(text, out);
} else {
    cat(text, out);
}

