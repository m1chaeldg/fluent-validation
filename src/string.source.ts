export interface StringSource {
    getStringAsync(): Promise<string>
}

export class StaticStringSource implements StringSource {

    constructor(private message: string) {

    }

    public getStringAsync(): Promise<string> {
        return Promise.resolve(this.message)
    }
}

export class LazyStringSource implements StringSource {

    constructor(private fnLoad: (resourceName: string) => Promise<string>, private resourceName: string) {

    }

    public getStringAsync(): Promise<string> {
        return this.fnLoad(this.resourceName)
    }
}
