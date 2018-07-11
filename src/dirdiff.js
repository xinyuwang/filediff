const Dir = require('./dir');
const File = require('./file');

class DirDiff {

    constructor(d1, d2) {
        this.d1 = d1;
        this.d2 = d2;
    }

    test({ name = true, size = true, sha256 = true, md5 = false, btime = true, mtime = true } = {}) {

    }

    tell() {

        let less = [], more = [], diff = [];

        //d1 is a file
        if (this.d1.isDirectory == false) {

            //d2 is also a file
            if (this.d2.isDirectory == false) {

                //just compare and output to diff
                if()

            }


        }


        this.d1.childrens.forEach((val, key, map) => {

            if (this.d2.childrens.has(key)) {

                arr.push(...new DirDiff(val, ))

            }

        });


    }

    static compare(f1, f2) {
        return new FileDiff(f1, f2);
    }

}

module.exports = FileDiff;
