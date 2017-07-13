"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadResource(lang) {
    let json = require(__dirname + `/resources.${lang}.json`);
    return (key) => {
        if (json.hasOwnProperty(key)) {
            return json[key];
        }
        return key;
    };
}
exports.loadResource = loadResource;
function loadResourceAsync(lang) {
    let func = loadResource(lang);
    return (key) => {
        return Promise.resolve(func(key));
    };
}
exports.loadResourceAsync = loadResourceAsync;
