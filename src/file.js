const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class File {

    constructor(filepath) {

        this.filepath = path.resolve(filepath);

    }

    collect(cfg) {

        const { glob = "*", regex = ".*", recursive = true, digest = "sha256", size = [-1, -1] } = cfg;



    }



    static diff(src, dst) {


        
    }


    _p(msg) {

    }


};
