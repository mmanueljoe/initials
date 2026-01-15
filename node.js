// let http = require('http');

// http.createServer(function(request, response){
//     response.writeHead(200, {'Content-Type':'text/html'});
//     response.end('<h1 style="color:#f00; font-size: 10rem; text-align: center;">Hello World!</h2>')
// }).listen(8080);

import v8 from 'v8';


console.log('All arguments: ', process.argv);

console.log('First arguments: ', process.argv[1]);



// env.js
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Custom variable:', process.env.MY_VARIABLE);
console.log('Database URL:', process.env.DATABASE_URL || 'Not set');

// show the v8 engine version used by node.js
console.log(`V8 version: ${process.versions.v8}`);

// info about v8's heap memory usage
const v8 = require('v8');
const heapStats = v8.getCppHeapStatistics();


// file read (non-blocking)
const fs = require('fs');

console.log('Before file read.')

fs.readFile('index.html', 'utf-8', (err, data) => {
    if(err) throw err;

    console.log('File contents: ', data);
});

console.log('After file read');

// file read (blocking)

console.log('Start blocking code');

const data = fs.readFileSync('script.js', 'utf-8');
console.log('Blocking code data: ', data);
console.log('Blocking operation completed');
