const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const File = require('./file');

class Dir {

    constructor(p) {

        if (typeof p === 'string') {

            this.path = path.normalize(p);
            this.absPath = path.resolve(p);
            this.dirname = path.basename(this.absPath);

            if (!fs.existsSync(this.absPath)) {
                throw new Error('path not existed');
            }

            let stat = fs.statSync(this.absPath);

            this.childrens = new Map();
            this.file = null;
            this.isDirectory = stat.isDirectory();

            if (this.isDirectory) {

                let arr = fs.readdirSync(this.absPath);
                arr.forEach(item => {
                    let child = new Dir(`${this.path}${item}${path.sep}`);
                    this.childrens.set(child.dirname, child);
                })

            } else {

                this.file = new File(p);

            }

        }
        else {

            if (p['filepath'] == undefined) {
                throw new Error('not an available Directory Json');
            }

            this.path = p.path;
            this.absPath = p.absPath;
            this.isDirectory = p.isDirectory;
            this.childrens = new Map();
            this.file = null;

            if (p.isDirectory) {
                p.childrens.forEach(dirJson => {
                    let dir = new Dir(dirJson);
                    this.childrens.set(dir.dirname, dir);
                })
            }
            else {
                this.file = new File(p.file);
            }


        }

    }

    toJson() {

        let res = {

            path: this.path,
            absPath: this.absPath,
            isDirectory: this.isDirectory,
            childrens: [],
            file: {}

        };

        if (this.isDirectory) {

            this.childrens.forEach(value => {
                res.childrens.push(value.toJson());
            })

        } else {

            res.file = this.file.toJson();

        }

        return res;

    }

    update() {

        if (!fs.existsSync(this.path)) {
            return null;
        }

        return new Dir(this.path);
    }

}

module.exports = Dir;
