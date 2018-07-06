
class Time {
    constructor(f) {
        if (typeof f !== 'function') {
            throw new Error('[f] should be a function')
        }
        this.func = f;
        this._diff = 0;
    }

    test(...args) {
        let beg = Date.now();
        this.func(...args);
        this._diff = Date.now() - beg;
        return this._diff;
    }

    testp(s = '%u', ...args) {
        let diff = this.test(...args);
        if (typeof s === 'string') {
            return s.replace('%u', diff);
        }
        else if (typeof s === 'function') {
            s(diff);
            return diff;
        }
        else {
            throw new Error("[s] should be a string or function");
        }
    }

    static func(f) {
        return new Time(f);
    }

    static diff() {
        let now = Date.now();

        if (this['_diff']) {
            let diff = now - this['_diff'];
            this['_diff'] = now;
            return diff;
        }
        else {
            this['_diff'] = now;
            return -1;
        }

    }

    static diffp(s = '%u', f) {
        let diff = s.replace('%u', this.diff());
        if (f && typeof f === 'function') {
            f(diff);
        }
        return diff;
    }

}

module.exports = Time;
