const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const File = require('./file');

class Dir {

    constructor(p) {

        if (typeof p === 'string') {

            this.path = p;
            this.absPath = path.resolve(p);

            if (!fs.existsSync(this.absPath)) {
                throw new Error('path not existed');
            }

            let stat = fs.statSync(this.absPath);

            this.childrens = [];
            this.file = null;
            this.isDirectory = stat.isDirectory();

            if (this.isDirectory) {

                let arr = fs.readdirSync(this.absPath);
                arr.forEach(item => {
                    this.childrens.push(new Dir(`${this.path}${item}${path.sep}`));
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
            this.childrens = [];
            this.file = null;

            if (p.isDirectory) {
                p.childrens.forEach(dir => {
                    this.childrens.push(new Dir(dir));
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

            this.childrens.forEach(dir => {
                res.childrens.push(dir.toJson());
            })

        } else {

            res.file = this.file.toJson();

        }

    }

    update() {

        if (!fs.existsSync(this.path)) {
            return null;
        }

        return new Dir(this.path);
    }

}

module.exports = Dir;
