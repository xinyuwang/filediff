const File = require('./file');

class FileDiff {

    constructor(f1, f2) {
        this.f1 = f1;
        this.f2 = f2;
    }

    test({ name = true, size = true, sha256 = true, md5 = false, btime = true, mtime = true } = {}) {

        return tell({ name, size, sha256, md5, btime, mtime }).isEqual;

    }

    tell({ name = true, size = true, sha256 = true, md5 = false, btime = true, mtime = true } = {}) {

        let isEqual = true;
        let diff = {};

        if (name) {
            if (this.f1.filename != this.f2.filename) {
                isEqual = false;
                diff['filename'] = [this.f1.filename, this.f2.filename];
            }
        }

        if (size) {
            if (this.f1.size != this.f2.size) {
                isEqual = false;
                diff['size'] = [this.f1.size, this.f2.size];
            }
        }

        if (sha256) {
            if (this.f1.sha256 != this.f2.sha256) {
                isEqual = false;
                diff['sha256'] = [this.f1.sha256, this.f2.sha256];
            }
        }

        if (md5) {
            if (this.f1.md5 != this.f2.md5) {
                isEqual = false;
                diff['md5'] = [this.f1.md5, this.f2.md5];
            }
        }

        if (btime) {
            if (this.f1.btime != this.f2.btime) {
                isEqual = false;
                diff['btime'] = [this.f1.btime, this.f2.btime];
            }
        }

        if (mtime) {
            if (this.f1.mtime != this.f2.mtime) {
                isEqual = false;
                diff['mtime'] = [this.f1.mtime, this.f2.mtime];
            }
        }

        return {
            isEqual: isEqual,
            diff: diff
        }

    }

    static compare(f1, f2) {
        return new FileDiff(f1, f2);
    }

}

module.exports = FileDiff;
