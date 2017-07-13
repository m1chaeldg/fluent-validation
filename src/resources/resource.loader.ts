export function loadResource(lang: string): (key: string) => string {
    let json = require(__dirname + `/resources.${lang}.json`);
    return (key): string => {
        if (json.hasOwnProperty(key))
            return json[key]
        return key;
    }
}

export function loadResourceAsync(lang: string): (key: string) => Promise<string> {
    let func = loadResource(lang);

    return (key): Promise<string> => {
        return Promise.resolve(func(key));
    }
}