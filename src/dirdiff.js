const Dir = require('./dir');
const File = require('./file');
const FileDiff = require('./filediff');

class DirDiff {

    constructor(d1, d2) {
        this.d1 = d1;
        this.d2 = d2;
    }

    tell({ name = true, size = true, sha256 = true, md5 = false, btime = true, mtime = true } = {}) {

        let less = [], more = [], diff = [];

        //d1 is a file
        if (this.d1.isDirectory == false) {

            //d2 is also a file
            if (this.d2.isDirectory == false) {

                //just compare and output to diff
                let res = FileDiff.compare(this.d1, this.d2).tell({ name, size, sha256, md5, btime, mtime });
                if (!res.isEqual) {
                    res.f1 = this.d1.file;
                    res.f2 = this.d2.file;
                    diff.push(res);
                }

            }
            else {

                //d2 is a directory
                less.push(this.d2.toJson({ sha256, md5 }));
                more.push(this.d1.file.toJson({ sha256, md5 }));

            }

        }
        else {//d1 is a directory

            //d2 is a file
            if (this.d2.isDirectory == false) {

                less.push(this.d2.file.toJson({ sha256, md5 }));
                more.push(this.d1.toJson({ sha256, md5 }));

            }
            else {

                //d2 is a directory

                this.d1.childrens.forEach((val, key, map) => {

                    if (this.d2.childrens.has(key)) {

                        let { subless, submore, subdiff } = DirDiff.compare(val, this.d2.childrens[key]).tell({ name, size, sha256, md5, btime, mtime });
                        less.push(...subless);
                        more.push(...submore);
                        subdiff.push(...subdiff);

                    }
                    else {

                        more.push(val.toJson({ sha256, md5 }));

                    }

                });

                this.d2.childrens.forEach((val, key, map) => {

                    if (!this.d1.childrens.has(key)) {

                        less.push(val.toJson({ sha256, md5 }));

                    }

                });

            }


        }

        let isEqual = (less.length + more.length + diff.length == 0);

        return { less, more, diff };

    }

    static compare(f1, f2) {
        return new FileDiff(f1, f2);
    }

}

module.exports = FileDiff;
