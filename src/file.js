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

        this._md5 = '';
        this._sha256 = '';

    }

    get md5() {
        if (this._md5 == '') {
            let buf = fs.readFileSync(this.absFilepath);
            this._md5 = crypto.createHash('md5').update(buf).digest('hex');
        }
        return this._md5;
    }

    get sha256() {
        if (this._sha256 == '') {
            let buf = fs.readFileSync(this.absFilepath);
            this._sha256 = crypto.createHash('sha256').update(buf).digest('hex');
        }
        return this._sha256;
    }

    update() {

        if (!fs.existsSync(this.absFilepath)) {
            return null;
        }

        return new File(this.filepath);
    }

    static open(filepath) {

        if (!fs.existsSync(path.resolve(filepath))) {
            return null;
        }

        return new File(filepath);
    }

};

module.exports = File;
