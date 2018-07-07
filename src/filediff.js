﻿"use strict";

import File from "./file";


export default class FileDiff {

    constructor(f1, f2) {
        this.f1 = f1;
        this.f2 = f2;
    }

    test({ size = true, sha256 = true, md5 = false, btime = true, mtime = true } = {}) {

        if (size) {
            if (this.f1.size != this.f2.size) {
                return false;
            }
        }

        if (sha256) {
            if (this.f1.sha256 != this.f2.sha256) {
                return false;
            }
        }

        if (md5) {
            if (this.f1.md5 != this.f2.md5) {
                return false;
            }
        }

        if (btime) {
            if (this.f1.btime != this.f2.btime) {
                return false;
            }
        }

        if (mtime) {
            if (this.f1.mtime != this.f2.mtime) {
                return false;
            }
        }
        
        return true;
    }

    tell() {

        let res = {
            path: [this.f1.filepath, this.f2.filepath],
            absPath: [this.f1.absFilepath, this.f2.absFilepath],
            absPath: [this.f1.absFilepath, this.f2.absFilepath]
        }

    }


    collect({ }) {

        const { glob = '*', regex = '.*', recursive = true, digest = 'sha256', size = [-1, -1] } = cfg;

    }

}

module.exports = FileDiff;
