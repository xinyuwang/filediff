"use strict";

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class File {

    constructor(filepath) {

        this.filepath = filepath;
        this.absFilepath = path.resolve(filepath);

        if (!fs.existsSync(this.absFilepath)) {
            throw new Error('file not existed');
        }

        let stat = fs.statSync(this.absFilepath);

        if (!stat.isFile()) {
            throw new Error('not a regular file');
        }

        this.size = stat.size;
        this.mtime = stat.mtime;
        this.birthtime = stat.birthtime;

        this.md5 = '';
        this.sha256 = '';

    }

    md5() {
        if (this.md5 != '') {
            let buf = fs.readFileSync(this.absFilepath);
            this.md5 = this.crypto.createHash('md5').update(buf).digest('hex');
        }
        return this.md5;
    }

    sha256() {
        if (this.sha256 != '') {
            let buf = fs.readFileSync(this.absFilepath);
            this.sha256 = this.crypto.createHash('sha256').update(buf).digest('hex');
        }
        return this.sha256;
    }

    collect(cfg) {

        const { glob = '*', regex = '.*', recursive = true, digest = 'sha256', size = [-1, -1] } = cfg;

    }

};

module.exports = File;
