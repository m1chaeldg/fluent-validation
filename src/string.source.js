"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StaticStringSource {
    constructor(message) {
        this.message = message;
    }
    getStringAsync() {
        return Promise.resolve(this.message);
    }
}
exports.StaticStringSource = StaticStringSource;
class LazyStringSource {
    constructor(fnLoad, resourceName) {
        this.fnLoad = fnLoad;
        this.resourceName = resourceName;
    }
    getStringAsync() {
        return this.fnLoad(this.resourceName);
    }
}
exports.LazyStringSource = LazyStringSource;
