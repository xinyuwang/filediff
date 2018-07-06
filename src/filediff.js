"use strict";

import File from "./file";


export default class FileDiff {

    constructor(f1, f2) {
        this.f1 = f1;
        this.f2 = f2;
    }

    collect({ }) {

        const { glob = '*', regex = '.*', recursive = true, digest = 'sha256', size = [-1, -1] } = cfg;

    }

}

module.exports = FileDiff;
