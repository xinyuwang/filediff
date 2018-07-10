const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class Dir {

    constructor(p) {

        this.path = p;
        this.absPath = path.resolve(f);

        if (!fs.existsSync(this.absPath)) {
            throw new Error('path not existed');
        }

        let stat = fs.statSync(this.absFilepath);

        this.childrens = [];

        this.isDirectory = stat.isDirectory();

        if (this.isDirectory) {



        } else {



        }

        



    }

}