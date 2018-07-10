const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class File {

    constructor(f) {

        if (typeof f === 'string') {

            this.filepath = path.normalize(f);
            this.absFilepath = path.resolve(f);
            this.filename = path.basename(f);

            if (!fs.existsSync(this.absFilepath)) {
                throw new Error('file not existed');
            }

            let stat = fs.statSync(this.absFilepath);

            if (!stat.isFile()) {
                throw new Error('not a regular file');
            }

            this.size = stat.size;
            this.mtime = stat.mtime;
            this.btime = stat.birthtime;

            this._md5 = '';
            this._sha256 = '';

        } else {

            if (f['filepath'] == undefined) {
                throw new Error('not an available File Json');
            }

            this.filepath = f.filepath;
            this.absFilepath = f.absFilepath;
            this.filename = f.filename;
            this.size = f.size;
            this.mtime = f.mtime;
            this.btime = f.btime;
            this._md5 = this.md5;
            this._sha256 = this._sha256;

        }

    }

    toJson() {

        return {
            filepath: this.filepath,
            absFilepath: this.absFilepath,
            filename: this.filename,
            size: this.size,
            mtime: this.mtime,
            btime: this.btime,
            md5: this._md5,
            sha256: this._sha256
        }

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

};

module.exports = File;
