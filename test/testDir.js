const argv = require('yargs').argv;
const File = require('../src/file');
const path = require('path');
const Dir = require('../src/dir');
const Time = require('./time');

let p = `..${path.sep}`;

console.log('------');
Time.diff();

let d = new Dir(p);
Time.diffp('Constructor:%u', console.log);

console.log(d);

console.log('------');
