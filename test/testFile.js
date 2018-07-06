const argv = require('yargs').argv;
const File = require('../src/file');
const Time = require('./time');

let filepath = `./${argv.$0}`;

console.log('------');
Time.diff();

let f = File.open(filepath);
Time.diffp('Constructor:%u', console.log);

let md5 = f.md5;
Time.diffp('MD5:%u', console.log);

let sha256 = f.sha256;
Time.diffp('SHA256:%u', console.log);

console.log('------');
console.log(f);
