const argv = require('yargs').argv;
const File = require('../src/file');


let filepath = `./${argv.$0}`;
let f = new File(filepath);

console.log(f.size);


